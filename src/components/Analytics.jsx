import React from "react";

export default function Analytics({
  topicAccuracy,
  correct = 0,
  incorrect = 0,
  unattempted = 0,
}) {
  // Convert topicAccuracy object to array
  const topicAccuracyArray = Object.entries(topicAccuracy).map(
    ([topic, accuracy]) => ({
      topic,
      accuracy: parseFloat(accuracy),
    })
  );

  const totalAttempted = correct + incorrect;
  const overallPercentage = totalAttempted > 0 ? (correct / totalAttempted) * 100 : 0;

  let overallPerformanceMessage = "";
  let overallPerformanceClass = "";

  if (overallPercentage >= 80) {
    overallPerformanceMessage = "Excellent!";
    overallPerformanceClass = "text-success";
  } else if (overallPercentage >= 60) {
    overallPerformanceMessage = "Good job!";
    overallPerformanceClass = "text-primary";
  } else if (totalAttempted > 0) {
    overallPerformanceMessage = "Keep practicing!";
    overallPerformanceClass = "text-warning";
  } else {
    overallPerformanceMessage = "No questions attempted yet.";
    overallPerformanceClass = "text-muted";
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Quiz Analytics Dashboard</h2>

      <div className="card shadow-sm mb-5">
        <div className="card-body text-center">
          <h4 className="card-title mb-3">Overall Performance 🧮</h4>
          <p className="lead fs-2 mb-0">
            <span className={`fw-bold ${overallPerformanceClass}`}>
              {overallPercentage.toFixed(1)}% Correct
            </span>
          </p>
          <p className="text-muted">{overallPerformanceMessage}</p>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-success-subtle rounded">
                <h5 className="mb-1 text-success">Correct</h5>
                <p className="fs-4 fw-bold text-success">{correct}</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-danger-subtle rounded">
                <h5 className="mb-1 text-danger">Incorrect</h5>
                <p className="fs-4 fw-bold text-danger">{incorrect}</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-secondary-subtle rounded">
                <h5 className="mb-1 text-secondary">Unattempted</h5>
                <p className="fs-4 fw-bold text-secondary">{unattempted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Topic-wise Accuracy 📈</h4>
          {topicAccuracyArray.length > 0 ? (
            <ul className="list-group list-group-flush">
              {topicAccuracyArray.map((data, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center py-3"
                >
                  <span className="lead text-dark">{data.topic}</span>
                  <span
                    className={`badge rounded-pill fs-6 px-3 py-2 ${
                      data.accuracy >= 70
                        ? "bg-success"
                        : data.accuracy >= 40
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {data.accuracy.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">
              No topic data available yet. Complete some quizzes!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


