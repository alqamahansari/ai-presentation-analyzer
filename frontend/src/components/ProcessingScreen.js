import React from "react";

export default function ProcessingScreen() {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Inter, system-ui",
        background: "#ffffff"
      }}
    >

      <h2 style={{ marginBottom: "25px", color: "#111827" }}>
        Analyzing your interview...
      </h2>

      <div
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid #E5E7EB",
          borderTop: "6px solid #2563EB",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />

      <p
        style={{
          marginTop: "20px",
          color: "#6B7280",
          fontSize: "15px"
        }}
      >
        Emotion Recognition • Speech Analysis • Language Evaluation
      </p>

      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>

    </div>

  );
}