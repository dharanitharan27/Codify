import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

function LogOut() {
  const { LogoutUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Show a small delay for better UX
        setTimeout(() => {
          LogoutUser();
          toast.success("Logged out successfully");
          setIsLoggingOut(false);
        }, 1500);
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("There was an issue logging out");
        setIsLoggingOut(false);
      }
    };

    performLogout();
  }, [LogoutUser]);

  if (!isLoggingOut) {
    return <Navigate to='/login' />;
  }

  return (
    <div className={`min-h-screen-minus-nav flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}>
      <div className={`max-w-md w-full p-8 rounded-xl shadow-lg text-center ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border`}>
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Logging Out
        </h2>
        <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
          Please wait while we securely log you out...
        </p>
      </div>
    </div>
  );
}

export default LogOut;
