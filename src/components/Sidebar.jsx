

import { Link } from "react-router-dom";
import SidebarRoutes from "./SidebarRoutes";
import Logo from "./Logo";
const Sidebar = () => {
  return (
    <div className="d-flex flex-column border-end bg-white shadow-sm overflow-auto h-100 p-4">
      <div className="mb-4">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-grow-1">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
