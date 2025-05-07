import roadmap from "../assets/json/roadmap.json";
import skills from "../assets/json/skillbasedRoadmaps.json";
import { useTheme } from "../context/ThemeContext";

const Roadmap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Role-based Roadmaps */}
        <div className="mb-16">
          <h2 className="text-4xl font-righteous tracking-wider text-center mb-10">
            Role Based Roadmaps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmap.map((item) => (
              <div
                key={item.roadmap_name}
                className={`p-6 rounded-lg shadow-lg flex flex-col justify-between ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <p className="text-xl font-medium mb-4">{item.roadmap_name}</p>
                <a
                  href={item.roadmap_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-end py-2 px-6 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Skill-based Roadmaps */}
        <div>
          <h2 className="text-4xl font-righteous tracking-wider text-center mb-10">
            Skill Based Roadmaps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((item) => (
              <div
                key={item.skill_name}
                className={`p-6 rounded-lg shadow-lg flex flex-col justify-between ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <h3 className="text-xl font-medium mb-4">{item.skill_name}</h3>
                <a
                  href={item.skill_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-end py-2 px-6 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;


