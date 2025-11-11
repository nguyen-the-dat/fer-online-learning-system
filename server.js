import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcryptjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "lib/db.json"));

const rules = auth.rewriter({});

app.db = router.db;

app.use(cors());
app.use(jsonServer.bodyParser);

app.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/register") {
    const defaultFields = {
      profilePicture: "https://i.pravatar.cc",
      bio: "",
      phone: "",
      socialMedia: "",
    };
    req.body = {
      ...defaultFields,
      ...req.body,
    };
  }
  next();
});

app.use((req, res, next) => {
  const shouldSanitize =
    (req.method === "GET" && req.path.startsWith("/users")) ||
    (req.method === "PATCH" && req.path.startsWith("/users/"));

  if (shouldSanitize) {
    const originalSend = res.send;
    res.send = function (body) {
      try {
        const data = JSON.parse(body);

        const sanitize = (user) => {
          const { password, ...safeUser } = user;
          return safeUser;
        };

        const sanitized = Array.isArray(data)
          ? data.map(sanitize)
          : sanitize(data);

        return originalSend.call(this, JSON.stringify(sanitized));
      } catch (e) {
        return originalSend.call(this, body);
      }
    };
  }

  if (req.method === "PATCH" && req.path.startsWith("/users/")) {
    delete req.body.password;
  }

  next();
});


app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // ✅ Tìm user từ db.json
  const user = router.db.get('users').find({ email }).value();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // ✅ Kiểm tra mật khẩu cũ
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  // ✅ Mã hóa mật khẩu mới
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // ✅ Cập nhật vào db.json
  router.db
    .get('users')
    .find({ email })
    .assign({ password: hashedPassword })
    .write();

  return res.json({ success: true, message: "Password changed successfully" });
});

app.use(rules);
app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log("✅ JSON Server with Auth running at http://localhost:3001");
});
