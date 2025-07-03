Here's the cleaned-up `README.md` file with **all emojis removed**, and formatted properly for a public GitHub repository:

---

````markdown
# Mock Test Generator using OpenAI

An intelligent, interactive, and customizable mock test generator built using **React** and **OpenAI/Gemini API**.  
Design your own tests based on topic, difficulty, question type, and more — perfect for quick practice and skill evaluation.

---

## Features

- Custom Test Creation  
  - Choose topics (e.g., React, DSA, Math)
  - Select difficulty: Easy / Medium / Hard
  - Question types: Single / Multiple correct
  - Enable or disable negative marking
  - Choose number of questions and test duration

- AI-Powered Question Generation  
  - Questions are dynamically generated using the selected API (recommended: Gemini)
  - Math & LaTeX supported using MathJax

- Interactive Test Interface  
  - Real-time timer with pause/resume
  - Answer navigation and tracking
  - Auto submission on timeout

- Smart Result Page  
  - Total score and percentage breakdown
  - Topic-wise accuracy analytics
  - Performance classification (Excellent / Good / Practice more)
  - Full question review with correct and incorrect answers highlighted

---

## Demo Screenshots

![Test Setup](screenshots/screenshot-1.png)
![Test Window](screenshots/screenshot-2.png)
![Result Page](screenshots/screenshot-3.png)
![Review Panel](screenshots/screenshot-4.png)

*(Replace the above paths with your actual screenshot file names)*

---

## Tech Stack

- **Frontend**: React, Bootstrap, MathJax
- **API**: Gemini / OpenAI (via `generateMCQs()` utility)
- **Routing**: React Router
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: Bootstrap 5 and custom CSS

---

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/mock-test-generator.git
   cd mock-test-generator
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your API key:

   ```
   VITE_API_KEY=your_gemini_or_chatgpt_api_key
   ```

4. **Start the App**

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
mock-test-generator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── styles/
│   └── App.jsx
├── .env
└── README.md
```

---

## License

This project is open source and free to use under the MIT License.

```



   
