import { useTheme } from "../../context/ThemeContext";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      quote:
        "The courses here transformed my career path. The practical approach to learning made all the difference.",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      company: "TechCorp Inc.",
    },
    {
      quote:
        "I went from knowing nothing about coding to landing my dream job in just 6 months. The structured learning path was exactly what I needed.",
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      quote:
        "The community support and expert guidance helped me overcome every challenge. Best learning investment I've made!",
      name: "Emma Rodriguez",
      role: "Backend Engineer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      company: "Digital Solutions",
    },
    {
      quote:
        "The interactive coding challenges pushed me to think differently. Now I solve complex problems with confidence.",
      name: "Alex Thompson",
      role: "Software Architect",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      company: "Innovation Labs",
    },
    {
      quote:
        "The mentorship program was invaluable. Real-world insights from industry experts made all the difference.",
      name: "Priya Patel",
      role: "Mobile Developer",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      company: "AppTech Solutions",
    },
    {
      quote:
        "From a complete beginner to deploying my first full-stack application. The journey has been incredible!",
      name: "James Wilson",
      role: "Junior Developer",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      company: "WebFlow Systems",
    },
    {
      quote:
        "The project-based learning approach helped me build a strong portfolio. Landed my first tech job within weeks!",
      name: "Sofia Martinez",
      role: "Cloud Engineer",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
      rating: 5,
      company: "CloudScale Inc.",
    },
  ];

  // ✅ Animate entire section fade-up
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const content = scrollContainer.firstElementChild;
    const scrollSpeed = 0.5;
    let animationFrameId;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= content.offsetWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const TestimonialCard = ({ testimonial, isDuplicate = false }) => (
    <div
      className={`
        flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] 
        h-[380px] sm:h-[420px] md:h-[450px] 
        group relative p-6 sm:p-8 rounded-2xl
        ${
          isDark
            ? "bg-dark-bg-secondary border-dark-border"
            : "bg-light-bg-secondary border-light-border"
        }
        border shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl
        flex flex-col justify-between
        ${
          isDark
            ? "hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
            : "hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
        }
      `}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
        <svg
          className="w-full h-full text-primary"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>

      {/* Quote Icon */}
      <div className="relative z-10 mb-4 sm:mb-6">
        <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FaQuoteLeft className="text-primary text-lg sm:text-xl md:text-2xl group-hover:text-secondary transition-colors duration-300" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3 sm:mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
        ))}
      </div>

      {/* Quote */}
      <p
        className={`italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base ${
          isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
        } group-hover:text-primary transition-colors duration-300`}
      >
        "{testimonial.quote}"
      </p>

      {/* Author Info */}
      <div className="mt-auto flex items-center">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-gradient-to-r from-primary to-secondary p-0.5 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <svg
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="ml-3 sm:ml-4">
          <h4
            className={`font-bold text-base sm:text-lg ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            } group-hover:text-primary transition-colors duration-300`}
          >
            {testimonial.name}
          </h4>
          <p
            className={`text-xs sm:text-sm ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            } mb-1`}
          >
            {testimonial.role}
          </p>
          <p className="text-xs text-primary font-medium">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* Success Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-[10px] sm:text-xs rounded-full font-medium">
          Success Story
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 md:py-24 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Students Say
            </span>
          </h2>
          <p
            className={`text-sm sm:text-lg ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            } max-w-md sm:max-w-2xl mx-auto`}
          >
            Real stories from real developers who transformed their careers with
            Codify
          </p>
        </div>

        {/* Scrolling Container */}
        <div ref={scrollRef} className="overflow-hidden relative w-full">
          <div className="flex gap-4 sm:gap-6 md:gap-8 w-fit">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`duplicate-${index}`}
                testimonial={testimonial}
                isDuplicate={true}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p
            className={`text-sm sm:text-lg ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            } mb-4 sm:mb-6`}
          >
            Ready to join our success stories?
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white py-2 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
