import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { storeTokenInLS, API } = useAuth();
  const { setIsLoading } = useLoading();
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
      const response = await fetch(`${API}/api/v1/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Registration successfully :)");
        window.location.href = "/";
      } else {
        setErrMessage(res_data);
        toast.warn(
          errMessage.extraDetails ? errMessage.extraDetails : errMessage.message
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
          Registration
        </h1>

        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="signup.svg"
            alt="Signup illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Page heading - visible only on desktop */}
          <h1 className="hidden md:block text-4xl font-righteous tracking-wider mb-8">
            Registration
          </h1>

          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'}`}
          >
            <div className="mb-5">
              <label
                htmlFor="username"
                className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your name"
                value={user.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'} border focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            <div className="mb-5">
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

            <div className="mb-5">
              <label
                htmlFor="phone"
                className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                required
                placeholder="Enter your phone"
                value={user.phone}
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
                onClick={() => {
                  const passwordInput = document.getElementById('password');
                  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
                  setShow(!show);
                }}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
