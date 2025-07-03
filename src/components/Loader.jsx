import React from "react";

export default function Loader() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 1050,
      }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "4rem", height: "4rem", borderWidth: "0.4em" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="fw-semibold fs-5 text-primary">Just a moment...</div>
      </div>
    </div>
  );
}



