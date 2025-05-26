import { useTheme } from "../../context/ThemeContext";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonials = [
    {
      quote: "The courses here transformed my career path. The practical approach to learning made all the difference.",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "I went from knowing nothing about coding to landing my dream job in just 6 months. The structured learning path was exactly what I needed.",
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      quote: "The community support and expert guidance helped me overcome every challenge. Best learning investment I've made!",
      name: "Emma Rodriguez",
      role: "Backend Engineer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          What Our <span className="text-primary">Students Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                group p-8 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                flex flex-col
              `}
            >
              <FaQuoteLeft className="text-primary/30 text-4xl mb-4 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />

              <p className={`italic mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                "{testimonial.quote}"
              </p>

              <div className="mt-auto flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;