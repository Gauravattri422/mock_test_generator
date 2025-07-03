import React, { useEffect, useState } from "react";
import { MathJax } from "better-react-mathjax";

export default function QuestionCard({
  question,
  index,
  total,
  userAnswer,
  setUserAnswer,
  type,
}) {
  const [selected, setSelected] = useState(userAnswer || []);

  useEffect(() => {
    setSelected(userAnswer || []);
  }, [question, userAnswer]);

  const handleOptionChange = (option) => {
    if (type === "single") {
      setSelected([option]);
      setUserAnswer([option]);
    } else {
      const isSelected = selected.includes(option);
      const newSelected = isSelected
        ? selected.filter((o) => o !== option)
        : [...selected, option];
      setSelected(newSelected);
      setUserAnswer(newSelected);
    }
  };

  if (!question || !question.questionText || !question.options) {
    return <div className="alert alert-danger">Invalid question format.</div>;
  }

  return (
    <div className="card shadow-sm mb-4 p-4">
      <h5>
        Question {index + 1} of {total}
      </h5>
      <MathJax dynamic>
        <p className="fw-bold mt-2">{question.questionText}</p>
      </MathJax>

      <div className="mt-3">
        {question.options.map((option, i) => (
          <div className="form-check mb-2" key={i}>
            <input
              className="form-check-input"
              type={type === "single" ? "radio" : "checkbox"}
              name={`question-${index}`}
              value={option}
              checked={selected.includes(option)}
              onChange={() => handleOptionChange(option)}
              id={`q-${index}-opt-${i}`}
            />
            <label className="form-check-label" htmlFor={`q-${index}-opt-${i}`}>
              <MathJax dynamic>{option}</MathJax>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}



