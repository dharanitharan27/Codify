import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaChevronRight, FaChartLine } from "react-icons/fa";
import { MdFeedback, MdDashboard } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

function AdminLayout() {
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  if (!(userdata.isAdmin || userdata.isReadOnlyAdmin)) {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" />
  }

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark opacity-20' : 'bg-grid-pattern-light opacity-30'}`}></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-5"></div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)]">
        {/* Sidebar */}
        <div className={`w-full md:w-64 md:min-h-[calc(100vh-100px)] ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} shadow-xl transition-all duration-300`}>
          {/* Admin header */}
          <div className={`p-6 border-b ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
            <h2 className="text-2xl font-righteous flex items-center gap-2">
              <MdDashboard className="text-primary" />
              <span>Admin Panel</span>
            </h2>
            <p className={`mt-1 text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Manage your platform
            </p>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
              <li>
                <NavLink
                  to="/"
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
                  <FaHome className="text-lg" />
                  <span className="font-medium">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
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
                  <FaChartLine className="text-lg" />
                  <span className="font-medium">Dashboard</span>
                </NavLink>
              </li>
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

            {/* Admin info */}
            <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} hidden md:block`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  {userdata.username ? userdata.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <p className="font-medium">{userdata.username || 'Admin User'}</p>
                  <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className={`cursor-pointer hover:text-primary ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} `} onClick={()=>navigate("/admin") } >Admin</span>
            <FaChevronRight className="text-xs text-primary" />
            <span className="font-medium">Dashboard</span>
          </div>

          {/* Content */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;