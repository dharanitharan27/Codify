import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`
      ${isDark ? 'bg-dark-bg-secondary text-dark-text-primary' : 'bg-light-bg-secondary text-light-text-primary'}
      py-12 pb-8 border-t-2 ${isDark ? 'border-dark-border' : 'border-light-border'}
    `}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-8">
        {/* About Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-primary text-2xl font-playwrite-gb">Codify</h3>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed text-justify`}>
            Learn to code with expert-led tutorials and hands-on projects. Join our community of developers today.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-righteous tracking-wider text-xl">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/"
                className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} hover:text-primary transition-colors`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} hover:text-primary transition-colors`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/roadmap"
                className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} hover:text-primary transition-colors`}
              >
                Roadmaps
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} hover:text-primary transition-colors`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} hover:text-primary transition-colors`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Learning Paths */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-righteous tracking-wider text-xl">Learning Paths</h4>
          <ul className="flex flex-col gap-2">
            <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Frontend Development
            </li>
            <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Backend Development
            </li>
            <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Full Stack Development
            </li>
            <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Mobile Development
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-righteous tracking-wider text-xl">Connect With Us</h4>
          <div className="flex gap-4">
            <a
              href="https://github.com/Roshansuthar1105"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-[#181717] transition-colors`}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/roshansuthar/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-[#0077b5] transition-colors`}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/roshansuthar1105"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-[#1da1f2] transition-colors`}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-[#ff0000] transition-colors`}
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/roshansuthar1105/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-[#c32aa3] transition-colors`}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`text-center mt-8 pt-6 border-t ${isDark ? 'border-dark-border/30' : 'border-light-border/30'}`}>
        <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-sm font-playwrite-gb`}>
          &copy; {new Date().getFullYear()} Codify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
