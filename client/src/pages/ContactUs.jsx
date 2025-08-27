import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { useLoading } from "../components/loadingContext";
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function ContactUs() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    message: "",
  });
  const { userdata, API } = useAuth();
  const [isUser, setisUser] = useState(true);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isUser && userdata) {
      setUser({
        email: userdata.email,
        username: userdata.username,
        message: ""
      });
      setisUser(false);
    }
  }, [userdata, isUser]);

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
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden z-10 ${
      isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'
    }`}>
      {/* Animated background pattern */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] opacity-30 ${
        isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
      }`}></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl -z-5"></div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Page heading for all screen sizes */}
        <h1 className="text-4xl md:text-5xl font-righteous text-center tracking-wider mb-8 md:mb-12">
          <span className="text-primary">Get in</span> Touch
        </h1>
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left side - Content and Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">We'd love to hear from you!</h2>
              <p className={`mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Have questions about our courses or need assistance? 
                Our team is here to help you on your learning journey.
              </p>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <span>support@codify.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <FaUser className="text-primary" />
                  </div>
                  <span>Mon-Fri: 9AM to 5PM</span>
                </div>
              </div>
            </div>
            
            <img
              src="contact.png"
              alt="Contact illustration"
              className="relative max-w-md sm:w-full hidden md:block mx-auto md:mx-0 drop-shadow-xl animate-float"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`w-full max-w-md mx-auto p-8 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl border ${
                isDark 
                  ? 'bg-dark-bg-secondary/90 border-dark-border' 
                  : 'bg-light-bg-secondary/90 border-light-border'
              }`}
            >
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-primary" />
                    Username
                  </div>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl shadow-sm ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300`}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-primary" />
                    Email
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl shadow-sm ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300`}
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  <div className="flex items-center">
                    <FaCommentAlt className="mr-2 text-primary" />
                    Message
                  </div>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Enter your message"
                  value={user.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-xl shadow-sm ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 resize-none transition-all duration-300`}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary-dark transition-all duration-300 flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;