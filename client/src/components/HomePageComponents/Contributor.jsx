import React, { useState } from 'react';
import { Github, BookOpen, Code, Heart, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

export default function CodifyLearningComponent() {
  const [showMotivation, setShowMotivation] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navigate = useNavigate()

  const handleViewRepo = () => {
    window.open('https://github.com/Roshansuthar1105/Codify', '_blank');
  };

  const handleGithubGuide = () => {
    navigate("/contributorGuide")
  };

  return (
    <section className={`py-20 px-4 ${
      isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
    }`}>
      <div
        className={`
          max-w-5xl mx-auto rounded-2xl p-12 border shadow-xl relative overflow-hidden ${
            isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'
          }
        `}
      >
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary"></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold ${
                isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
              }`}>
                <span className="text-primary">Codify</span>Learning Platform
              </h1>
            </div>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Empowering the next generation of developers with expert-led tutorials and hands-on projects.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleViewRepo}
              className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border ${
                isDark 
                  ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border hover:bg-dark-bg-tertiary/80' 
                  : 'bg-light-bg-tertiary text-light-text-primary border-light-border hover:bg-light-bg-tertiary/80'
              }`}
            >
              <Github className="h-5 w-5 mr-2" />
              View Repository
            </button>
            
            <button
              onClick={handleGithubGuide}
              className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              GitHub Guide
            </button>
          </div>

          {/* Motivation Toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowMotivation(!showMotivation)}
              className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 flex items-center mx-auto"
            >
              <Heart className="h-4 w-4 mr-2" />
              {showMotivation ? 'Hide' : 'Show'} Contributor Motivation
            </button>
          </div>

          {/* Motivational Content */}
          {showMotivation && (
            <div className={`rounded-lg p-6 shadow-inner border-l-4 border-primary transition-all duration-300 ${
              isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h2 className={`text-xl font-bold ${
                  isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>
                  Join Our Mission!
                </h2>
              </div>
              
              <div className={`space-y-4 ${
                isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                <p className="leading-relaxed">
                  <strong className={isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                    Every line of code you contribute shapes the future of learning.
                  </strong> 
                  When you contribute to CodifyLearning, you're not just writing code – you're building bridges 
                  to knowledge for developers around the world.
                </p>
                
                <p className="leading-relaxed">
                  Think about it: that tutorial you improve today might be the breakthrough moment for someone 
                  learning to code in a different timezone. That bug you fix could remove a barrier that's been 
                  frustrating learners for weeks. Your documentation update might be exactly what transforms 
                  confusion into clarity for hundreds of aspiring developers.
                </p>
                
                <div className={`p-4 rounded-lg border-l-4 border-primary ${
                  isDark ? 'bg-dark-bg-primary/50' : 'bg-light-bg-primary/50'
                }`}>
                  <p className={`font-medium mb-2 ${
                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }`}>
                    Why Your Contribution Matters:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>You're democratizing quality education in tech</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Every improvement multiplies across our global community</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>You gain experience while making a meaningful impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>You become part of a network of passionate educators and developers</span>
                    </li>
                  </ul>
                </div>
                
                <p className={`leading-relaxed font-medium ${
                  isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                }`}>
                  Remember: You don't need to be perfect to contribute. You just need to care. 
                  Whether it's fixing a typo, improving a code example, or adding a new feature – 
                  every contribution is valuable. We're all learning together, and your unique perspective 
                  adds something special to our platform.
                </p>
                
                <div className={`flex items-center justify-center mt-6 p-4 rounded-lg ${
                  isDark ? 'bg-primary/10' : 'bg-primary/10'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className={`font-medium ${
                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }`}>
                    Join thousands of contributors making learning accessible to everyone!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className={`text-center mt-8 pt-6 border-t ${
            isDark ? 'border-dark-border' : 'border-light-border'
          }`}>
            <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
              Ready to make an impact? Start with small contributions and grow into a core maintainer.
            </p>
            <p className={`text-sm mt-2 ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Together, we're building the future of developer education. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}