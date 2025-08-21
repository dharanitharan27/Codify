import { motion } from "framer-motion";
import roadmap from "../assets/json/roadmap.json";
import skills from "../assets/json/skillbasedRoadmaps.json";
import { useTheme } from "../context/ThemeContext";

const Roadmap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Animation variants - all based on page load, not scroll
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Staggered section animations
  const rolesSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.4
      }
    }
  };

  const skillsSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 0.4
      }
    }
  };

  const ctaSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Enhanced Background with gradient overlay */}
      <motion.div 
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Enhanced Header Section */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <div className="inline-block">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Learning Roadmaps
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
            ></motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
          >
            Discover comprehensive learning paths designed to guide your journey from beginner to expert in various roles and skills.
          </motion.p>
        </motion.div>

        {/* Enhanced Role-based Roadmaps */}
        <motion.section 
          variants={rolesSectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-24"
        >
          <motion.div 
            variants={sectionHeaderVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3 }}
            className="flex items-center justify-center mb-12"
          >
            <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-righteous tracking-wider px-8 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Role Based Roadmaps
            </h2>
            <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {roadmap.map((item, index) => (
              <motion.div
                key={item.roadmap_name}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
              >
                {/* Animated border on right and bottom */}
                <motion.div 
                  className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                  whileHover={{ 
                    width: "3px",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                  whileHover={{ 
                    height: "3px",
                    transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                  }}
                />
                
                {/* Role icon with enhanced animation */}
                <motion.div 
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl">
                    {item.icon || "⚡"}
                  </span>
                </motion.div>

                <div className="flex-1 relative z-10">
                  <h3 className={`text-xl lg:text-2xl font-semibold mb-3 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                    {item.roadmap_name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
                    Master the skills needed for this role with our comprehensive learning path.
                  </p>
                </div>

                <motion.a
                  href={item.roadmap_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative z-10 inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Explore Path
                  <motion.svg 
                    variants={iconVariants}
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Skill-based Roadmaps */}
        <motion.section
          variants={skillsSectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={sectionHeaderVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.9 }}
            className="flex items-center justify-center mb-12"
          >
            <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
            <h2 className={`text-3xl md:text-4xl font-righteous tracking-wider px-8 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Skill Based Roadmaps
            </h2>
            <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {skills.map((item, index) => (
              <motion.div
                key={item.roadmap_name}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl  ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
              >
                {/* Animated border on right and bottom */}
                <motion.div 
                  className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                  whileHover={{ 
                    width: "3px",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                  whileHover={{ 
                    height: "3px",
                    transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                  }}
                />
                
                {/* Role icon with enhanced animation */}
                <motion.div 
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl">
                    {item.icon || "⚡"}
                  </span>
                </motion.div>

                <div className="flex-1 relative z-10">
                  <h3 className={`text-xl lg:text-2xl font-semibold mb-3 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                    {item.roadmap_name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
                    Master the skills needed for this role with our comprehensive learning path.
                  </p>
                </div>

                <motion.a
                  href={item.roadmap_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative z-10 inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Explore Path
                  <motion.svg 
                    variants={iconVariants}
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          variants={ctaSectionVariants}
          initial="hidden"
          animate="visible"
          className={`mt-24 text-center p-12 rounded-3xl ${isDark ? 'bg-gradient-to-r from-dark-bg-secondary to-dark-bg-secondary border border-dark-border' : 'bg-gradient-to-r from-light-bg-secondary to-light-bg-secondary border border-light-border'}`}
        >
          <h3 className={`text-2xl md:text-3xl font-righteous mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Ready to Start Your Learning Journey?
          </h3>
          <p className={`text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-2xl mx-auto`}>
            Choose a roadmap that aligns with your career goals and start building the skills that will define your future in tech.
          </p>
        </motion.section>
      </div>
    </div>
  );
}

export default Roadmap;