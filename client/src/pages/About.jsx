import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { FaUsers, FaLaptopCode, FaGraduationCap, FaChalkboardTeacher, FaAward, FaHandshake } from "react-icons/fa";

function About() {
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('story');

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former Google engineer with 15+ years of experience in software development and education.",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Chen",
      role: "Lead Instructor",
      bio: "Full stack developer with a passion for teaching and 10+ years of industry experience.",
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      name: "Emma Rodriguez",
      role: "Content Director",
      bio: "Computer Science PhD with expertise in curriculum development and educational technology.",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      bio: "Former Amazon engineer specializing in scalable architecture and cloud computing.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  // Stats data
  const stats = [
    { icon: <FaUsers />, value: "10,000+", label: "Active Students" },
    { icon: <FaLaptopCode />, value: "200+", label: "Courses" },
    { icon: <FaGraduationCap />, value: "95%", label: "Completion Rate" },
    { icon: <FaChalkboardTeacher />, value: "50+", label: "Expert Instructors" }
  ];

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:50px_50px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Hero section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-righteous tracking-wider mb-6 animate-fadeIn">
            Welcome <span className="text-primary">{userdata.username ? userdata.username.toUpperCase() : "to Codify"}</span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} animate-fadeIn animation-delay-200`}>
            We're on a mission to transform coding education and make technology skills accessible to everyone.
          </p>
        </div>

        {/* Introduction section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 animate-fadeIn animation-delay-300">
            <div className="relative">
              <img
                src="aboutus.png"
                alt="About Codify"
                className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="w-full md:w-1/2 animate-fadeIn animation-delay-400">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Your Gateway to <span className="text-primary">Tech Excellence</span>
            </h2>

            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Welcome to Codify, your digital gateway to comprehensive
              computer science education. Dive into HTML, CSS, JS, Java, C, C++,
              Django, app development, web development, and more. Our platform is a
              knowledge hub, empowering learners with the skills needed in the dynamic
              tech landscape.
            </p>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              From foundational concepts to advanced techniques,
              Codify ensures clarity in every lesson. Immerse yourself in a
              supportive community, with expertly curated resources and tutorials.
              Whether you're a novice or a seasoned coder, our goal is to foster your
              growth. Join us on a journey of continuous learning, where education
              meets innovation at Codify.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`p-10 rounded-2xl mb-20 ${isDark ? 'bg-dark-bg-secondary/50' : 'bg-light-bg-secondary/50'} backdrop-blur-sm border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fadeIn"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="text-primary text-3xl mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('story')}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg ${
                activeTab === 'story'
                  ? 'text-primary border-b-2 border-primary'
                  : `${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'}`
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg ${
                activeTab === 'mission'
                  ? 'text-primary border-b-2 border-primary'
                  : `${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'}`
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg ${
                activeTab === 'team'
                  ? 'text-primary border-b-2 border-primary'
                  : `${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'}`
              }`}
            >
              Our Team
            </button>
          </div>

          {/* Tab Content */}
          <div className={`p-8 rounded-lg ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-lg animate-fadeIn`}>
            {activeTab === 'story' && (
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Story</h3>
                <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  Codify began in 2018 when a group of passionate educators and industry professionals recognized a gap in coding education. Traditional learning methods weren't keeping pace with the rapidly evolving tech landscape, leaving many aspiring developers struggling to gain relevant skills.
                </p>
                <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  Our founders set out to create a platform that combines theoretical knowledge with practical application, making coding education accessible, engaging, and aligned with industry needs. What started as a small collection of web development courses has grown into a comprehensive learning ecosystem covering the full spectrum of programming disciplines.
                </p>
                <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  Today, Codify serves learners in over 150 countries, partnering with leading tech companies to ensure our curriculum remains cutting-edge and our graduates are job-ready.
                </p>
              </div>
            )}

            {activeTab === 'mission' && (
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission & Values</h3>
                <p className={`mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  At Codify, our mission is to democratize coding education and empower individuals to thrive in the digital economy, regardless of their background or prior experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
                    <div className="flex items-center mb-2">
                      <FaAward className="text-primary mr-2" />
                      <h4 className="text-lg font-semibold">Excellence</h4>
                    </div>
                    <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      We're committed to delivering the highest quality educational content and continuously improving our platform based on student feedback and industry developments.
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
                    <div className="flex items-center mb-2">
                      <FaHandshake className="text-primary mr-2" />
                      <h4 className="text-lg font-semibold">Inclusivity</h4>
                    </div>
                    <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      We believe everyone should have access to quality coding education, and we design our platform to accommodate diverse learning styles and backgrounds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Meet Our Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} text-center`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary"
                      />
                      <h4 className="text-lg font-semibold">{member.name}</h4>
                      <p className="text-primary text-sm mb-2">{member.role}</p>
                      <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* What We Offer */}
          <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-transform duration-300 hover:-translate-y-2`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">What We Offer</h3>
            <ul className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} space-y-3`}>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Comprehensive programming courses from beginner to advanced levels</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Interactive coding exercises and real-world projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Expert-led tutorials and detailed documentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Supportive community of learners and mentors</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Regular updates with latest programming trends</span>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-transform duration-300 hover:-translate-y-2`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">Technologies We Cover</h3>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Java', 'C++', 'Django', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Angular', 'Vue.js', 'Flutter'].map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-dark-bg-tertiary text-primary' : 'bg-light-bg-tertiary text-primary'} hover:bg-primary hover:text-white transition-colors cursor-pointer`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Join Us */}
          <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-transform duration-300 hover:-translate-y-2`}>
            <h3 className="text-2xl font-semibold text-primary mb-4">Join Our Community</h3>
            <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
              Become part of our growing community of learners and start your coding journey today. Get access to:
            </p>
            <ul className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} space-y-2 mb-6`}>
              <li>• Discussion forums with peers and mentors</li>
              <li>• Live coding sessions and workshops</li>
              <li>• Networking opportunities with industry professionals</li>
              <li>• Job placement assistance and career guidance</li>
            </ul>
            <Link
              to="/signup"
              className="block w-full py-3 text-center bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
