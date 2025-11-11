// middleware.js
module.exports = (req, res, next) => {
  // Khi phản hồi là từ `GET /users`
  if (req.method === 'GET' && req.path.startsWith('/users')) {
    const oldSend = res.send;
    res.send = function (body) {
      try {
        const data = JSON.parse(body);

        // Loại bỏ trường password nếu là danh sách hoặc 1 object
        const sanitize = (user) => {
          const { password, ...safeUser } = user;
          return safeUser;
        };

        const sanitizedData = Array.isArray(data)
          ? data.map(sanitize)
          : sanitize(data);

        oldSend.call(this, JSON.stringify(sanitizedData));
      } catch (err) {
        oldSend.call(this, body); // fallback nếu JSON.parse thất bại
      }
    };
  }

  next();
};
