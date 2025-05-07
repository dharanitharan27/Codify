import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { FaCheckCircle, FaCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CourseModules = ({ courseId, modules, progress, onModuleComplete }) => {
  const { API, userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');
  const [expandedModule, setExpandedModule] = useState(null);
  
  // Toggle module expansion
  const toggleModule = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };
  
  // Mark module as complete
  const markModuleComplete = async (moduleId, moduleName, isComplete) => {
    if (!courseId || !userdata?._id) return;
    
    try {
      const response = await fetch(`${API}/progress/${courseId}/module`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId,
          moduleName,
          completed: !isComplete // Toggle completion status
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Call the callback to update parent components
        if (onModuleComplete) {
          onModuleComplete(data.progress);
        }
      }
    } catch (error) {
      console.error('Error updating module progress:', error);
    }
  };
  
  // Check if a module is completed
  const isModuleCompleted = (moduleId) => {
    if (!progress || !progress.modules) return false;
    
    const module = progress.modules.find(m => m.moduleId === moduleId);
    return module ? module.completed : false;
  };
  
  // Sample modules if none provided
  const defaultModules = [
    {
      id: 'module1',
      name: 'Introduction to the Course',
      topics: ['Course Overview', 'Setting Up Your Environment', 'Basic Concepts']
    },
    {
      id: 'module2',
      name: 'Core Fundamentals',
      topics: ['Key Principles', 'Common Patterns', 'Best Practices']
    },
    {
      id: 'module3',
      name: 'Advanced Techniques',
      topics: ['Performance Optimization', 'Error Handling', 'Real-world Applications']
    },
    {
      id: 'module4',
      name: 'Project Implementation',
      topics: ['Planning Your Project', 'Building the Core Features', 'Testing and Deployment']
    }
  ];
  
  const displayModules = modules || defaultModules;
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-4`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
        Course Modules
      </h3>
      
      <div className="space-y-3">
        {displayModules.map((module) => {
          const completed = isModuleCompleted(module.id);
          
          return (
            <div 
              key={module.id}
              className={`border rounded-lg overflow-hidden ${isDark ? 'border-dark-border' : 'border-light-border'}`}
            >
              <div 
                className={`flex justify-between items-center p-3 cursor-pointer ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'}`}
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markModuleComplete(module.id, module.name, completed);
                    }}
                    className={`text-lg ${completed ? 'text-green-500' : isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                  >
                    {completed ? <FaCheckCircle /> : <FaCircle className="text-gray-400" />}
                  </button>
                  
                  <span className={`font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    {module.name}
                  </span>
                </div>
                
                <div className="text-primary">
                  {expandedModule === module.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedModule === module.id && (
                <div className={`p-3 border-t ${isDark ? 'border-dark-border bg-dark-bg-tertiary' : 'border-light-border bg-light-bg-tertiary'}`}>
                  <ul className="space-y-2 pl-8">
                    {module.topics.map((topic, index) => (
                      <li 
                        key={index}
                        className={`list-disc ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseModules;
