import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultPanel from "../components/ResultPanel";
import Analytics from "../components/Analytics";
import ReviewPanel from "../components/ReviewPanel"; // ✅ Add this import

export default function ResultPage() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [topicAccuracy, setTopicAccuracy] = useState({});
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [unattempted, setUnattempted] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("mockResult");
    if (!stored) {
      navigate("/");
      return;
    }
    try {
      setResultData(JSON.parse(stored));
    } catch (err) {
      console.error("Error loading result:", err);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!resultData) return;

    let totalScore = 0;
    let maxPossibleScore = 0;
    let correctCount = 0, incorrectCount = 0, unattemptedCount = 0;

    const marking = resultData.config.marking;
    const isMulti = resultData.config.type === "multi";
    const topicWise = {};
    const topics = resultData.config.topics.split(",").map((t) => t.trim().toLowerCase());

    for (let i = 0; i < resultData.questions.length; i++) {
      const q = resultData.questions[i];
      const userAns = resultData.answers[i] || [];
      const correctAns = q.correctAnswers || [];

      let qScore = 0;
      maxPossibleScore += isMulti ? marking.correctMultiFull : marking.correctSingle;

      if (userAns.length === 0) {
        qScore = marking.unattempted;
        unattemptedCount++;
      } else if (isMulti) {
        const isFullyCorrect = arraysEqualIgnoringOrder(userAns, correctAns);
        const isPartiallyCorrect = userAns.every(ans => correctAns.includes(ans));
        const hasWrong = userAns.some(ans => !correctAns.includes(ans));

        if (isFullyCorrect) {
          qScore = marking.correctMultiFull;
          correctCount++;
        } else if (!hasWrong && isPartiallyCorrect) {
          qScore = marking.correctMultiPartial;
          correctCount++;
        } else {
          qScore = marking.incorrectMulti;
          incorrectCount++;
        }
      } else {
        if (userAns[0] === correctAns[0]) {
          qScore = marking.correctSingle;
          correctCount++;
        } else {
          qScore = marking.incorrectSingle;
          incorrectCount++;
        }
      }

      totalScore += qScore;

      topics.forEach((topic) => {
        if (!topicWise[topic]) topicWise[topic] = { correct: 0, total: 0 };
        topicWise[topic].total++;
        if (qScore > 0) topicWise[topic].correct++;
      });
    }

    setScore(totalScore);
    setMaxScore(maxPossibleScore);
    setCorrect(correctCount);
    setIncorrect(incorrectCount);
    setUnattempted(unattemptedCount);

    const topicAcc = {};
    for (const t in topicWise) {
      topicAcc[t] = ((topicWise[t].correct / topicWise[t].total) * 100).toFixed(1);
    }
    setTopicAccuracy(topicAcc);
  }, [resultData]);

  function arraysEqualIgnoringOrder(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  }

  if (!resultData) {
    return <div className="container py-5">Loading results...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">📊 Test Results</h2>

      <ResultPanel score={score} maxScore={maxScore} />

      <Analytics
        topicAccuracy={topicAccuracy}
        correct={correct}
        incorrect={incorrect}
        unattempted={unattempted}
      />

      {/* ✅ Add the ReviewPanel component here */}
      <ReviewPanel
        questions={resultData.questions}
        answers={resultData.answers}
        config={resultData.config}
      />

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          🔄 Retake Test
        </button>
      </div>
    </div>
  );
}

