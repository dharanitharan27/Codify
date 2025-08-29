import React from 'react';

const JS_FUNDAMENTALS = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    content:
      "JavaScript is a versatile, high-level programming language primarily used for web development to add interactivity and dynamic behavior to web pages."
  },
  {
    id: 2,
    title: "Variables & Data Types",
    content: [
      "Variables store data values. Use let, const, or var to declare variables.",
      "Data types: string, number, boolean, null, undefined, object, symbol."
    ],
    code: `let name = "Alice"; // string\nconst age = 25; // number\nlet isStudent = true; // boolean`
  },
  {
    id: 3,
    title: "Operators",
    content: [
      "+, -, *, /, %, ++, -- (Arithmetic)",
      "=, +=, -=, *=, /= (Assignment)",
      ">, <, >=, <=, ==, ===, !=, !== (Comparison)",
      "&&, ||, ! (Logical)"
    ]
  },
  {
    id: 4,
    title: "Control Structures",
    content: [
      "if, else if, else",
      "switch",
      "for, while, do...while loops"
    ],
    code: `if (age > 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}`
  },
  {
    id: 5,
    title: "Functions",
    content: [
      "Reusable blocks of code.",
      "Can be declared using function keyword or as arrow functions."
    ],
    code: `function greet(name) {\n  return 'Hello, ' + name;\n}\n\nconst add = (a, b) => a + b;`
  },
  {
    id: 6,
    title: "Arrays & Objects",
    content: [
      "Arrays store ordered lists of values.",
      "Objects store key-value pairs."
    ],
    code: `let colors = ['red', 'green', 'blue'];\nlet person = { name: 'Alice', age: 25 };`
  },
  {
    id: 7,
    title: "DOM Manipulation",
    content: [
      "JavaScript can interact with and modify the HTML DOM.",
      "Use document.getElementById, querySelector, etc."
    ],
    code: `document.getElementById('demo').textContent = 'Hello JS!';`
  },
  {
    id: 8,
    title: "Events",
    content: [
      "Respond to user actions like clicks, keypresses, etc.",
      "Use addEventListener to handle events."
    ],
    code: `button.addEventListener('click', function() {\n  alert('Button clicked!');\n});`
  },
  {
    id: 9,
    title: "ES6+ Features",
    content: [
      "let & const, arrow functions, template literals, destructuring, spread/rest, classes, modules, promises, async/await."
    ],
    code: `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);`
  },
  {
    id: 10,
    title: "Template Literals",
    content: [
      "Template literals allow embedding expressions in strings.",
      "Use backticks (\`) instead of quotes."
    ],
    code: "const name = 'Alice';\nconsole.log(`Hello, ${name}!`);"
  },
  {
    id: 11,
    title: "Destructuring",
    content: [
      "Destructuring allows easy extraction of array or object values."
    ],
    code: `const [a, b] = [1, 2];\nconst { name, age } = { name: 'Bob', age: 30 };`
  },
  {
    id: 12,
    title: "Spread & Rest Operators",
    content: [
      "Spread (...) expands elements of arrays/objects.",
      "Rest collects multiple arguments into one array."
    ],
    code: `const arr = [1, 2, 3];\nconst newArr = [...arr, 4];\n\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b);\n}`
  },
  {
    id: 13,
    title: "Classes",
    content: [
      "Classes provide a blueprint for creating objects."
    ],
    code: `class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return 'Hello ' + this.name;\n  }\n}\n\nconst p = new Person('Alice');`
  },
  {
    id: 14,
    title: "Modules",
    content: [
      "Modules allow code splitting and reusability.",
      "Use export and import."
    ],
    code: `// math.js\nexport const add = (a, b) => a + b;\n\n// app.js\nimport { add } from './math.js';`
  },
  {
    id: 15,
    title: "Promises",
    content: [
      "Promises handle asynchronous tasks and represent future values."
    ],
    code: `const fetchData = () => new Promise((resolve) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});`
  },
  {
    id: 16,
    title: "Async / Await",
    content: [
      "Async/await makes asynchronous code easier to read and write."
    ],
    code: `async function getData() {\n  const data = await fetchData();\n  console.log(data);\n}`
  },
  {
    id: 17,
    title: "Error Handling",
    content: [
      "Use try...catch for handling exceptions."
    ],
    code: `try {\n  throw new Error('Something went wrong');\n} catch (e) {\n  console.error(e.message);\n}`
  },
  {
    id: 18,
    title: "Set & Map",
    content: [
      "Set: Stores unique values.",
      "Map: Stores key-value pairs with any key type."
    ],
    code: `const mySet = new Set([1, 2, 2]);\nconst myMap = new Map([['a', 1], ['b', 2]]);`
  },
  {
    id: 19,
    title: "JSON",
    content: [
      "JSON is used for data exchange between client & server."
    ],
    code: `const obj = { name: 'Alice' };\nconst str = JSON.stringify(obj);\nconst parsed = JSON.parse(str);`
  },
  {
    id: 20,
    title: "Timers",
    content: [
      "Use setTimeout and setInterval for delayed or repeated actions."
    ],
    code: `setTimeout(() => console.log('Hello after 1s'), 1000);\nsetInterval(() => console.log('Tick'), 1000);`
  },
  {
    id: 21,
    title: "LocalStorage & SessionStorage",
    content: [
      "Store data in the browser for persistence."
    ],
    code: `localStorage.setItem('user', 'Alice');\nconsole.log(localStorage.getItem('user'));`
  },
  {
    id: 22,
    title: "Fetch API",
    content: [
      "Fetch API is used for HTTP requests."
    ],
    code: `fetch('https://api.example.com')\n  .then(res => res.json())\n  .then(data => console.log(data));`
  },
  {
    id: 23,
    title: "Event Loop",
    content: [
      "Event loop handles asynchronous callbacks and ensures non-blocking execution."
    ]
  },
  {
    id: 24,
    title: "Summary",
    content:
      "JavaScript is essential for modern web development. Mastering its fundamentals, ES6+ features, and async concepts is key to building interactive apps."
  }
];

const JavaScriptFundamentals = () => {
  return (
    <div className="js-fundamentals-container">
      <header className="js-header">
        <h1 className="js-title">JavaScript Fundamentals</h1>
        <p className="js-subtitle">A comprehensive guide to JavaScript concepts and syntax</p>
      </header>
      <div className="js-content">
        {JS_FUNDAMENTALS.length === 0 ? (
          <div style={{color: '#ff6b6b', textAlign: 'center', fontSize: '1.2rem', marginTop: '40px'}}>No notes available.</div>
        ) : (
          JS_FUNDAMENTALS.map(note => (
            <div key={note.id} className="js-card">
              <div className="js-card-header">
                <h2 className="js-card-title">{note.title}</h2>
              </div>
              <div className="js-card-content">
                {note.content && Array.isArray(note.content) ? (
                  <ul className="js-card-list">
                    {note.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : note.content ? (
                  <p className="js-card-text">{note.content}</p>
                ) : null}
                {note.code && (
                  <pre className="js-card-code">
                    <code>{note.code}</code>
                  </pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .js-fundamentals-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          color: #f5f5f5;
          min-height: 100vh;
        }
        
        .js-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .js-title {
          font-size: 2.8rem;
          margin: 0 0 10px 0;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 800;
        }
        
        .js-subtitle {
          font-size: 1.2rem;
          color: #d1d1d1;
          margin: 0;
        }
        
        .js-content {
          display: grid;
          gap: 20px;
        }
        
        .js-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .js-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .js-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease;
        }
        
        .js-card-header:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        
        .js-card-title {
          margin: 0;
          font-size: 1.4rem;
          color: #4ecdc4;
          font-weight: 600;
        }
        
        .js-card-toggle {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6b6b;
        }
        
        .js-card-content {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .js-card-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0 0 15px 0;
          color: #e0e0e0;
        }
        
        .js-card-list {
          padding-left: 20px;
          margin: 0 0 15px 0;
        }
        
        .js-card-list li {
          margin-bottom: 8px;
          line-height: 1.5;
          color: #e0e0e0;
        }
        
        .js-card-code {
          background: rgba(0, 0, 0, 0.3);
          padding: 15px;
          border-radius: 8px;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 15px 0 0 0;
        }
        
        .js-card-code code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.95rem;
          color: #ffd93d;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .js-fundamentals-container {
            padding: 15px;
          }
          
          .js-title {
            font-size: 2.2rem;
          }
          
          .js-card-header {
            padding: 15px;
          }
          
          .js-card-title {
            font-size: 1.2rem;
          }
          
          .js-card-content {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default JavaScriptFundamentals;
