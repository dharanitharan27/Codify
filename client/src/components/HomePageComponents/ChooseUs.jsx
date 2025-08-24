import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ChooseUs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const benefits = [
    {
      icon: "🎯",
      title: "Industry-Relevant Content",
      description: "Courses designed to match current industry demands"
    },
    {
      icon: "💡",
      title: "Project-Based Learning",
      description: "Build real-world projects for your portfolio"
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "Join a thriving community of learners and mentors"
    },
    {
      icon: "📈",
      title: "Career Growth",
      description: "Get the skills needed for career advancement"
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 px-4" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Why Choose <span className="text-primary">Our Platform</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className={`
                p-8 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                flex flex-col items-center text-center
              `}
            >
              <div className="text-4xl mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                {benefit.icon}
              </div>

              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                {benefit.title}
              </h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChooseUs;