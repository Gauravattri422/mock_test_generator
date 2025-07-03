import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsPanel from "../components/SettingsPanel";

export default function HomePage() {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
  topics: "",
  type: "single",
  marking: {
    correctSingle: 5,
    incorrectSingle: -2,
    unattempted: 0,
    correctMultiFull: 5,
    correctMultiPartial: 3,
    incorrectMulti: -3,
  },
  difficulty: "medium",
  questionCount: 10,
  duration: 30,
});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function startTest() {
    console.log("Saving test config to localStorage:", formData);
    localStorage.setItem("mockConfig", JSON.stringify(formData));
    console.log("Navigating to /test page");
    navigate("/test");
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">📝 Create Your Mock Test</h2>
      <div className="row g-3">
        <SettingsPanel formData={formData} handleChange={handleChange} />
        <div className="col-12">
          <button className="btn btn-primary mt-3" onClick={startTest}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}



