import React from "react";

const QuestionPanel = ({ question, index, total }) => {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #243041",
        marginBottom: "12px"
      }}
    >
      <strong>Question {index + 1} of {total}</strong>

      <p style={{ marginTop: "6px" }}>{question}</p>
    </div>
  );
};

export default QuestionPanel;