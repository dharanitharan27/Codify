import React from "react";

const pythonBasics = [
  {
    id: 1,
    title: "Introduction to Python",
    content: [
      "Python is a high-level, interpreted programming language created by Guido van Rossum.",
      "It emphasizes code readability and uses indentation instead of curly braces.",
      "It is widely used in web development, data science, automation, AI, and more."
    ],
    code: `# Your first Python program
print("Hello, Python!")`
  },
  {
    id: 2,
    title: "Variables & Data Types",
    content: [
      "Variables are containers for storing data values.",
      "You don’t need to declare a type explicitly; Python infers it.",
      "Common types: int, float, string, boolean."
    ],
    code: `x = 10        # integer
y = 3.14      # float
name = "Alex" # string
is_active = True  # boolean

print(type(x), type(name))`
  },
  {
    id: 3,
    title: "Operators",
    content: [
      "Operators perform operations on variables and values.",
      "Arithmetic (+, -, *, /, %), Comparison (==, !=, >, <), Logical (and, or, not)."
    ],
    code: `a, b = 5, 2
print(a + b)      # 7
print(a ** b)     # 25
print(a > b and b > 0)  # True`
  },
  {
    id: 4,
    title: "Conditional Statements",
    content: [
      "`if`, `elif`, and `else` control decision-making.",
      "They let you execute blocks of code based on conditions."
    ],
    code: `age = 18
if age >= 18:
    print("You are an adult")
elif age > 13:
    print("You are a teenager")
else:
    print("You are a child")`
  },
  {
    id: 5,
    title: "Loops",
    content: [
      "`for` loops iterate over sequences (lists, strings, ranges).",
      "`while` loops run until a condition is false."
    ],
    code: `for i in range(3):
    print("For loop:", i)

count = 2
while count >= 0:
    print("While loop:", count)
    count -= 1`
  },
  {
    id: 6,
    title: "Functions",
    content: [
      "Functions group reusable blocks of code.",
      "They can take parameters and return values."
    ],
    code: `def greet(name):
    return f"Hello, {name}"

print(greet("Alice"))
print(greet("Bob"))`
  },
  {
    id: 7,
    title: "Lists",
    content: [
      "Lists are ordered, mutable collections of items.",
      "They allow duplicates and can contain multiple data types."
    ],
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
fruits.append("orange")
print(fruits)`
  },
  {
    id: 8,
    title: "Dictionaries",
    content: [
      "Dictionaries store data in key-value pairs.",
      "They are unordered, mutable, and do not allow duplicate keys."
    ],
    code: `student = {"name": "John", "age": 21}
print(student["name"])  # John
student["age"] = 22
print(student)`
  },
  {
    id: 9,
    title: "Tuples & Sets",
    content: [
      "Tuple → Ordered, immutable collection (good for fixed data).",
      "Set → Unordered collection of unique items (removes duplicates)."
    ],
    code: `point = (10, 20)
print(point[0])  # 10

unique_numbers = {1, 2, 2, 3}
print(unique_numbers)  # {1, 2, 3}`
  },
  {
    id: 10,
    title: "Strings",
    content: [
      "Strings are sequences of characters enclosed in quotes.",
      "They support slicing, concatenation, and methods like upper(), lower()."
    ],
    code: `text = "Hello World"
print(text.upper())       # HELLO WORLD
print(text.replace("World", "Python"))
print(text[0:5])          # Hello`
  },
  {
    id: 11,
    title: "String Formatting",
    content: [
      "Python provides multiple ways to format strings: f-strings, format(), concatenation."
    ],
    code: `name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")`
  },
  {
    id: 12,
    title: "Input & Output",
    content: [
      "`input()` reads user input as a string.",
      "`print()` outputs values to the console."
    ],
    code: `name = input("Enter your name: ")
print("Hello,", name)`
  },
  {
    id: 13,
    title: "Type Casting",
    content: [
      "Convert between data types using int(), float(), str().",
      "Useful when working with user input or mixed data."
    ],
    code: `x = "10"
y = int(x)
print(y + 5)  # 15`
  },
  {
    id: 14,
    title: "List Comprehension",
    content: [
      "A concise way to create lists with a single line of code."
    ],
    code: `numbers = [x**2 for x in range(5)]
print(numbers)  # [0, 1, 4, 9, 16]`
  },
  {
    id: 15,
    title: "Nested Loops",
    content: [
      "A loop inside another loop.",
      "Commonly used in working with 2D data (matrices, grids)."
    ],
    code: `for i in range(3):
    for j in range(2):
        print(i, j)`
  },
  {
    id: 16,
    title: "Break & Continue",
    content: [
      "`break` exits the loop immediately.",
      "`continue` skips to the next iteration."
    ],
    code: `for num in range(5):
    if num == 3:
        continue
    if num == 4:
        break
    print(num)`
  },
  {
    id: 17,
    title: "Exception Handling",
    content: [
      "Exceptions are errors detected during execution.",
      "Use try-except blocks to handle errors gracefully."
    ],
    code: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`
  },
  {
    id: 18,
    title: "Modules & Imports",
    content: [
      "Modules are files containing Python code (functions, classes).",
      "You can import built-in or custom modules."
    ],
    code: `import math
print(math.sqrt(16))`
  },
  {
    id: 19,
    title: "File Handling",
    content: [
      "Use `open()` to read and write files.",
      "Always close files or use `with` (context manager)."
    ],
    code: `with open("sample.txt", "w") as f:
    f.write("Hello, File!")

with open("sample.txt", "r") as f:
    print(f.read())`
  },
  {
    id: 20,
    title: "Classes & Objects",
    content: [
      "Python is object-oriented: everything is an object.",
      "Classes define blueprints, objects are instances."
    ],
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(self.name, "says Woof!")

dog = Dog("Buddy")
dog.bark()`
  },
  {
    id: 21,
    title: "Inheritance",
    content: [
      "Inheritance lets one class derive properties from another.",
      "Promotes code reuse and extensibility."
    ],
    code: `class Animal:
    def speak(self):
        print("Animal sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

Dog().speak()`
  },
  {
    id: 22,
    title: "Built-in Functions",
    content: [
      "Python has many built-ins: len(), type(), range(), sorted(), sum(), max(), min()."
    ],
    code: `nums = [3, 7, 1]
print(len(nums))      # 3
print(sorted(nums))   # [1, 3, 7]`
  },
  {
    id: 23,
    title: "Lambda Functions",
    content: [
      "Anonymous functions defined with `lambda` keyword.",
      "Used for short operations without defining full functions."
    ],
    code: `square = lambda x: x**2
print(square(5))`
  },
  {
    id: 24,
    title: "Map, Filter, Reduce",
    content: [
      "`map()` applies a function to all items.",
      "`filter()` selects items based on condition.",
      "`reduce()` combines items into a single value."
    ],
    code: `nums = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))
from functools import reduce
total = reduce(lambda a, b: a + b, nums)
print(squared, evens, total)`
  },
  {
    id: 25,
    title: "Summary",
    content: [
      "Python basics cover syntax, control flow, functions, data structures, OOP, and error handling.",
      "Mastering these concepts gives you the foundation to explore advanced topics like frameworks, APIs, and data science."
    ]
  }
];

const PythonNotes = () => (
  <div className="python-notes-container">
    <h1 className="python-notes-title">Python Basics</h1>
    {pythonBasics.map(note => (
      <div key={note.id} className="python-note-card">
        <h2 className="python-note-title">{note.title}</h2>
        {note.content && Array.isArray(note.content) ? (
          <ul className="python-note-list">
            {note.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : note.content ? (
          <p className="python-note-content">{note.content}</p>
        ) : null}
        {note.code && (
          <pre className="python-note-code"><code>{note.code}</code></pre>
        )}
      </div>
    ))}
    <style>{`
      .python-notes-container {
        max-width: 800px;
        margin: 40px auto;
        padding: 32px 16px;
        background: #101014;
        color: #f3f3f3;
        border-radius: 18px;
        box-shadow: 0 4px 32px 0 #000a, 0 1.5px 4px 0 #0002;
      }
      .python-notes-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 32px;
        color: #4fdd8c;
        text-align: center;
        letter-spacing: 1px;
      }
      .python-note-card {
        background: #181824;
        border-radius: 12px;
        margin-bottom: 28px;
        padding: 24px 20px 18px 20px;
        box-shadow: 0 2px 8px 0 #0003;
        transition: box-shadow 0.2s;
      }
      .python-note-card:hover {
        box-shadow: 0 4px 16px 0 #4fdd8c44;
      }
      .python-note-title {
        font-size: 1.35rem;
        font-weight: 600;
        color: #4fdd8c;
        margin-bottom: 10px;
      }
      .python-note-content {
        font-size: 1.08rem;
        margin-bottom: 8px;
        color: #e0e6f0;
      }
      .python-note-list {
        margin: 0 0 8px 18px;
        padding: 0;
        color: #e0e6f0;
        font-size: 1.08rem;
      }
      .python-note-list li {
        margin-bottom: 4px;
        list-style: disc inside;
      }
      .python-note-code {
        background: #232336;
        color: #b5ffda;
        font-size: 1.02rem;
        padding: 14px 16px;
        border-radius: 8px;
        margin-top: 8px;
        overflow-x: auto;
        font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
        border: 1px solid #2a2a3a;
        box-shadow: 0 1px 4px 0 #0002;
      }
      @media (max-width: 600px) {
        .python-notes-container {
          padding: 10px 2vw;
        }
        .python-note-card {
          padding: 12px 6px 10px 6px;
        }
        .python-notes-title {
          font-size: 2rem;
        }
      }
    `}</style>
  </div>
);

export default PythonNotes;
