import React from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";

function About() {
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Page heading */}
        <h1 className="text-4xl md:text-5xl font-righteous tracking-wider text-center mb-12">
          Welcome {userdata.username ? userdata.username.toUpperCase() : "to Codify"}
        </h1>

        {/* Introduction section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2">
            <img
              src="aboutus.png"
              alt="About Codify"
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Text */}
          <div className="w-full md:w-1/2">
            <p className={`text-lg leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Welcome to Codify, your digital gateway to comprehensive
              computer science education. Dive into HTML, CSS, JS, Java, C, C++,
              Django, app development, web development, and more. Our platform is a
              knowledge hub, empowering learners with the skills needed in the dynamic
              tech landscape. From foundational concepts to advanced techniques,
              Codify ensures clarity in every lesson. Immerse yourself in a
              supportive community, with expertly curated resources and tutorials.
              Whether you're a novice or a seasoned coder, our goal is to foster your
              growth. Join us on a journey of continuous learning, where education
              meets innovation at Codify.
            </p>
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <div className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'}`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Mission</h3>
            <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
              At Codify, our mission is to make quality programming education accessible to everyone.
              We believe in empowering individuals with the skills and knowledge needed to thrive in
              the digital age through interactive learning experiences and comprehensive resources.
            </p>
          </div>

          {/* What We Offer */}
          <div className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'}`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">What We Offer</h3>
            <ul className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} space-y-2 list-disc pl-5`}>
              <li>Comprehensive programming courses from beginner to advanced levels</li>
              <li>Interactive coding exercises and real-world projects</li>
              <li>Expert-led tutorials and detailed documentation</li>
              <li>Supportive community of learners and mentors</li>
              <li>Regular updates with latest programming trends and technologies</li>
            </ul>
          </div>

          {/* Technologies */}
          <div className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'}`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">Technologies We Cover</h3>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Java', 'C++', 'Django', 'Node.js', 'Mobile Development'].map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-dark-bg-tertiary text-primary' : 'bg-light-bg-tertiary text-primary'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
