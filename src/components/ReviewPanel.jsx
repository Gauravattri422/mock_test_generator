import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";

export default function ReviewPanel({ questions, answers, config }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!questions || questions.length === 0) {
    return <div>No questions to review.</div>;
  }

  const question = questions[currentIndex];
  const userAns = answers[currentIndex] || [];
  const correctAns = question.correctAnswers || [];
  const isMulti = config.type === "multi";

  function arraysEqualIgnoringOrder(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  }

  const isUnattempted = userAns.length === 0;
  let isCorrect = false;
  if (!isUnattempted) {
    if (isMulti) {
      isCorrect = arraysEqualIgnoringOrder(userAns, correctAns);
    } else {
      isCorrect = userAns[0] === correctAns[0];
    }
  }

  const getOptionClass = (option) => {
    const userSelected = userAns.includes(option);
    const isCorrectOption = correctAns.includes(option);

    if (userSelected && isCorrectOption) return "bg-success text-white";
    if (userSelected && !isCorrectOption) return "bg-danger text-white";
    if (!userSelected && isCorrectOption) {
      if (isUnattempted || !isCorrect) return "bg-success-subtle";
    }
    return "";
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5>
        Review Question {currentIndex + 1} of {questions.length}
      </h5>

      <MathJax dynamic>
        <p className="fw-bold">{question.questionText}</p>
      </MathJax>

      <div className="list-group mb-4">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`list-group-item ${getOptionClass(option)}`}
            style={{ cursor: "default" }}
          >
            <MathJax dynamic>{option}</MathJax>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          ← Previous
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
