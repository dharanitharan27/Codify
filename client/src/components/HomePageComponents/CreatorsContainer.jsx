import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useTheme } from "../../context/ThemeContext";

const CreatorsContainer = ({ count }) => {
  const { coursesData } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Filter unique creators
  const topCreators = [...new Map(coursesData.map(course => [course.creator_name, course])).values()];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {/* Map through unique creators */}
      {topCreators.slice(0, count-1).map((course, index) => (
        <div
          key={index}
          className={`
            flex flex-col items-center p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
            border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
          `}
        >
          <div className="relative mb-4 w-24 h-24 overflow-hidden rounded-full border-4 border-primary">
            <img
              src={course.creator_image}
              alt={course.creator_name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            {course.creator_name}
          </h3>

          <a
            href={course.creator_youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto py-2 px-4 rounded-full text-white bg-youtube hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            View Channel
          </a>
        </div>
      ))}

      {/* "And Many More" card */}
      <div
        className={`
          flex flex-col items-center p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
          border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
        `}
      >
        <div className="relative mb-4 w-24 h-24 overflow-hidden rounded-full border-4 border-primary flex items-center justify-center">
          <img
            src="favicon.png"
            alt="Logo Codify"
            className="w-16 h-16 object-contain"
          />
        </div>

        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          And Many More
        </h3>

        <Link
          to="/courses"
          className="mt-auto py-2 px-4 rounded-full text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default CreatorsContainer;