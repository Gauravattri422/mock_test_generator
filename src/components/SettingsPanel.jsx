import React from "react";

export default function SettingsPanel({ formData, handleChange }) {
  // Custom handler for nested marking fields
  function handleMarkingChange(e) {
    const { name, value } = e.target;
    const numValue = Number(value);
    formData.marking[name] = isNaN(numValue) ? 0 : numValue;
    // Since this is a nested object, we manually update it
    handleChange({
      target: {
        name: "marking",
        value: { ...formData.marking },
      },
    });
  }

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">Topics (comma separated)</label>
        <input
          type="text"
          name="topics"
          className="form-control"
          value={formData.topics}
          onChange={handleChange}
          placeholder="e.g. React, JavaScript, CSS"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Question Type</label>
        <select
          name="type"
          className="form-select"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="single">Single Correct</option>
          <option value="multi">Multiple Correct</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Difficulty</label>
        <select
          name="difficulty"
          className="form-select"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Number of Questions</label>
        <input
          type="number"
          name="questionCount"
          min="5"
          max="30"
          className="form-control"
          value={formData.questionCount}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Duration (minutes)</label>
        <select
          name="duration"
          className="form-select"
          value={formData.duration}
          onChange={handleChange}
        >
          <option value={30}>30 min</option>
          <option value={60}>60 min</option>
          <option value={90}>90 min</option>
        </select>
      </div>

      {/* Negative Marking config inputs */}
      <div className="col-12 mt-4">
        <h5>Scoring Configuration (Negative Marking)</h5>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Correct Single Answer</label>
            <input
              type="number"
              name="correctSingle"
              className="form-control"
              value={formData.marking.correctSingle}
              onChange={handleMarkingChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Incorrect Single Answer</label>
            <input
              type="number"
              name="incorrectSingle"
              className="form-control"
              value={formData.marking.incorrectSingle}
              onChange={handleMarkingChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Unattempted</label>
            <input
              type="number"
              name="unattempted"
              className="form-control"
              value={formData.marking.unattempted}
              onChange={handleMarkingChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Correct Multi Full</label>
            <input
              type="number"
              name="correctMultiFull"
              className="form-control"
              value={formData.marking.correctMultiFull}
              onChange={handleMarkingChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Correct Multi Partial</label>
            <input
              type="number"
              name="correctMultiPartial"
              className="form-control"
              value={formData.marking.correctMultiPartial}
              onChange={handleMarkingChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Incorrect Multi</label>
            <input
              type="number"
              name="incorrectMulti"
              className="form-control"
              value={formData.marking.incorrectMulti}
              onChange={handleMarkingChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

