import React from "react";

export default function ResultPanel({ score, maxScore }) {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5>Overall Score</h5>
      <p>
        {score} out of {maxScore} correct (
        {((score / maxScore) * 100).toFixed(2)}%)
      </p>
    </div>
  );
}
