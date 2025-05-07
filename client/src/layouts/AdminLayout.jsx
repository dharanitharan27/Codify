import React from "react";
import { Navigate, Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

function AdminLayout() {
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!userdata.isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="flex flex-col md:flex-row min-h-screen-minus-nav">
        {/* Sidebar */}
        <div className={`w-full md:w-64 md:min-h-screen-minus-nav ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-4 md:p-6`}>
          <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive
                    ? `bg-primary text-white`
                    : `${isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'}`
                  }
                `}
              >
                <FaUser className="text-lg" />
                <span className="font-medium">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/contacts"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive
                    ? `bg-primary text-white`
                    : `${isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'}`
                  }
                `}
              >
                <MdFeedback className="text-lg" />
                <span className="font-medium">Feedbacks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/courses"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive
                    ? `bg-primary text-white`
                    : `${isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'}`
                  }
                `}
              >
                <BiSolidBook className="text-lg" />
                <span className="font-medium">Courses</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
