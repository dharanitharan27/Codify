import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CallToAction = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="py-20 px-4">
      <div
        className={`
          max-w-6xl mx-auto rounded-2xl p-12 bg-gradient-to-br from-primary/90 to-primary-dark
          border shadow-xl relative overflow-hidden text-white
        `}
      >
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your <span className="text-white underline decoration-2 underline-offset-4">Learning Journey?</span>
          </h2>

          <p className="text-lg mb-10 max-w-2xl mx-auto text-white/90">
            Join thousands of successful learners and transform your career today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="py-3 px-8 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Browse Courses
            </Link>

            <Link
              to="/signup"
              className="py-3 px-8 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;