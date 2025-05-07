import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setIsLoading } = useLoading();
  const [show, setShow] = useState(false);
  const { storeTokenInLS, API, userdata, isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log(user, userdata);
        setUser({ email: "", password: "" });
        const res_data = await response.json();
        console.log(res_data.token);
        storeTokenInLS(res_data.token);
        toast.success("Logged in Successfully");
        window.location.href = "/";
      } else {
        const err_data = await response.json();
        toast.warn(
          err_data.extraDetails ? err_data.extraDetails : err_data.message
        );
      }
    } catch (error) {
      console.log("response error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav flex flex-col md:flex-row items-center justify-center p-6 overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* Page heading - visible only on mobile */}
        <h1 className="text-4xl font-righteous tracking-wider mb-8 md:hidden">
          Login
        </h1>

        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="login.svg"
            alt="Login illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Page heading - visible only on desktop */}
          <h1 className="hidden md:block text-4xl font-righteous tracking-wider mb-8">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'}`}
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'} border focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            <div className="mb-8 relative">
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'} border focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <div
                className="absolute right-3 top-[42px] cursor-pointer text-xl"
                onClick={() => setShow(!show)}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
