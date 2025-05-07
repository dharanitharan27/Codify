import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // State to track which FAQ item is open
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and browse our course catalog. You can start with any course that interests you!"
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, all our courses are self-paced. Learn at your own convenience and schedule."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes! You'll receive a verified certificate for each course you complete, which you can share on your resume and LinkedIn profile."
    },
    {
      question: "What kind of support is available?",
      answer: "We offer community forums, direct mentor support, and regular Q&A sessions to help you succeed in your learning journey."
    },
    {
      question: "Are there any prerequisites?",
      answer: "Most beginner courses have no prerequisites. For advanced courses, recommended prerequisites are clearly listed in the course description."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`
                rounded-lg overflow-hidden border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                shadow-md transition-all duration-300
              `}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`
                  w-full p-5 text-left flex justify-between items-center
                  ${isDark ? 'text-dark-text-primary hover:bg-dark-bg-tertiary' : 'text-light-text-primary hover:bg-light-bg-tertiary'}
                  transition-colors duration-300
                `}
              >
                <span className="font-medium text-lg">{item.question}</span>
                <FaChevronDown
                  className={`
                    text-primary transition-transform duration-300
                    ${openItem === index ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${openItem === index ? 'max-h-40' : 'max-h-0'}
                `}
              >
                <p className={`p-5 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;