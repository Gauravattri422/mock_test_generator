import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import Loader from "../components/Loader";
import { generateMCQs } from "../utils/openai";

export default function TestPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [paused, setPaused] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  // Load config from localStorage
  useEffect(() => {
    const cfg = localStorage.getItem("mockConfig");
    if (!cfg) {
      alert("No test config found. Redirecting to home.");
      navigate("/");
      return;
    }
    try {
      const parsed = JSON.parse(cfg);
      setConfig(parsed);
    } catch (err) {
      console.error("Error parsing config:", err);
      navigate("/");
    }
  }, [navigate]);

  // Fetch questions using generateMCQs
  useEffect(() => {
    if (!config) return;

    async function fetchQuestions() {
      setLoading(true);
      try {
        const rawQuestions = await generateMCQs(config);

        console.log("Raw questions from generateMCQs:", rawQuestions);

        // If generateMCQs returns an array, set directly
        if (Array.isArray(rawQuestions)) {
          setQuestions(rawQuestions);
        } else {
          // Otherwise parse JSON string
          const parsed = JSON.parse(rawQuestions);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            throw new Error("Parsed questions are empty or invalid.");
          }
          setQuestions(parsed);
        }
      } catch (err) {
        console.error("Failed to load questions:", err);
        alert("Failed to load questions. Try again.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [config, navigate]);

  function setAnswerForCurrent(ans) {
    setAnswers((prev) => ({ ...prev, [currentIndex]: ans }));
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  }

  function prevQuestion() {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  }

  function submitTest() {
    const resultData = { answers, questions, config };
    localStorage.setItem("mockResult", JSON.stringify(resultData));
    navigate("/result");
  }

  if (loading) return <Loader />;

  if (timeExpired) {
    alert("Time is up! Submitting test.");
    submitTest();
    return null;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container py-4">
        <h4>❌ Failed to load questions. Please try again.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          🔄 Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded shadow bg-light">
        <Timer
          durationMinutes={config.duration}
          paused={paused}
          onExpire={() => setTimeExpired(true)}
        />
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-warning"
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button className="btn btn-outline-danger" onClick={submitTest}>
            🛑 Submit
          </button>
        </div>
      </div>

      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        userAnswer={answers[currentIndex] || []}
        setUserAnswer={setAnswerForCurrent}
        type={config.type}
      />

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
