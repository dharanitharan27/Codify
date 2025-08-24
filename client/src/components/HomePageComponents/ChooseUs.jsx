import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ChooseUs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

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
    if (!cardsRef.current.length) return;

    gsap.set(cardsRef.current, { y: 60, opacity: 0 });

    gsap.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2, // 👈 one after another
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);


  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Why Choose <span className="text-primary">Our Platform</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
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