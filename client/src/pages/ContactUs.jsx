import React from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { useLoading } from "../components/loadingContext";

function ContactUs() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    message: "",
  });
  const { userdata, API } = useAuth();
  const { isLoggedIn } = useAuth();
  const [isUser, setisUser] = useState(true);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (isUser && userdata) {
    setUser({
      email: userdata.email,
      username: userdata.username,
      message: ""
    })
    setisUser(false);
  }

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
      const response = await fetch(
        `${API}/contact`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        }
      );
      const data = await response.json()
      if (data.extraDetails) {
        toast.error(data.extraDetails);
      } else {
        toast.success("Message sent successfully");
        setUser({
          ...user,
          message: ""
        })
      }
    } catch (error) {
      console.log("message not sent: ", error);
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
          Contact Us
        </h1>

        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="contact.png"
            alt="Contact illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Page heading - visible only on desktop */}
          <h1 className="hidden md:block text-4xl font-righteous tracking-wider mb-8">
            Contact Us
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
                placeholder="Enter your username"
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

            <div className="mb-8">
              <label
                htmlFor="message"
                className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Enter your message"
                value={user.message}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'} border focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
