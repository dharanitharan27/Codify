import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(sectionRef.current, { scale: 0.9, opacity: 0 });
    gsap.to(sectionRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:py-24 sm:px-6 relative"
      data-aos="zoom-in"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          className="
            relative rounded-2xl sm:rounded-3xl p-6 sm:p-16 
            bg-gradient-to-br from-primary via-secondary to-accent
            border shadow-2xl overflow-hidden text-white
            transform hover:scale-[1.02] transition-transform duration-500
          "
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-white/30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-white/30 animate-pulse animation-delay-500"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-white/20 animate-pulse animation-delay-1000"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-3xl sm:text-4xl animate-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-16 sm:w-16 text-white/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-2xl sm:text-3xl animate-float animation-delay-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-12 sm:w-12 text-white/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 mb-6 sm:mb-8 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                🚀 Limited Time Offer
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight drop-shadow-lg">
              Ready to Start Your
              <span className="block text-yellow-300 font-bold animate-pulse drop-shadow-lg">
                Learning Journey?
              </span>
            </h2>

            <p className="text-base sm:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-3xl mx-auto text-white leading-relaxed drop-shadow-md font-medium">
              Join thousands of successful learners and transform your career
              today with our comprehensive learning platform
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/courses"
                className="group py-3 sm:py-4 px-6 sm:px-10 bg-white text-primary font-semibold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
              >
                <span>Browse Courses</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                to="/signup"
                className="group py-3 sm:py-4 px-6 sm:px-10 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
              >
                <span>Sign Up Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:scale-110 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100-2h3.586l-1.293-1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/30">
              <p className="text-xs sm:text-sm text-white font-semibold mb-4 sm:mb-6 drop-shadow-sm">
                Trusted by developers worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-white font-medium drop-shadow-sm">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white font-medium drop-shadow-sm">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold">
                    Premium
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white font-medium drop-shadow-sm">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold">
                    Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
