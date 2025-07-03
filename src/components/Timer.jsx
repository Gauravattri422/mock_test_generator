import React, { useEffect, useState, useRef } from "react";

export default function Timer({ durationMinutes, onExpire, paused }) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec <= 1) {
          clearInterval(intervalRef.current);
          onExpire();
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [paused, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div
      className={`timer badge fs-5 px-3 py-2 ${
        secondsLeft <= 600 ? "bg-danger text-white" : "bg-primary text-white"
      }`}
      title={secondsLeft <= 600 ? "Less than 10 minutes remaining!" : ""}
      style={{ cursor: secondsLeft <= 600 ? "help" : "default" }}
    >
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

