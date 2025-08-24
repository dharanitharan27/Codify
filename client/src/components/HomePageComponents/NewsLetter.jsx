import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaPaperPlane } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLetter = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 px-4" data-aos="fade-right">
      <div
        className={`
          max-w-5xl mx-auto rounded-2xl p-12 ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
          border shadow-xl relative overflow-hidden
        `}
      >
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary"></div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Stay Updated with <span className="text-primary">Latest Courses</span>
          </h2>

          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            Subscribe to our newsletter and never miss new courses and learning opportunities
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`
                flex-grow px-4 py-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'}
                border focus:outline-none focus:ring-2 focus:ring-primary
              `}
            />

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;