import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Card = ({ title, children }) => (
  <div
    style={{
      background: "#F3F4F6",
      border: "1px solid #D1D5DB",
      borderRadius: "10px",
      padding: "20px",
      height: "100%"
    }}
  >
    <h3
      style={{
        marginBottom: "15px",
        fontSize: "16px",
        color: "#111827"
      }}
    >
      {title}
    </h3>

    {children}
  </div>
);

export default function Dashboard({ analytics }) {

  if (!analytics) {
    return <p>Loading results...</p>;
  }

  const { distribution, confidence_score, speech } = analytics;

  const labels = Object.keys(distribution);
  const values = Object.values(distribution);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#2563EB",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4"
        ]
      }
    ]
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "40px",
        fontFamily: "Inter, system-ui"
      }}
    >

      {/* Title */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "#111827"
        }}
      >
        Interview Analysis Report
      </h1>

      {/* Confidence Score */}

      <Card title="Confidence Score">

        <div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            textAlign: "center",
            color: "#2563EB"
          }}
        >
          {confidence_score}%
        </div>

      </Card>

      {/* Middle Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {/* Emotion Chart */}

        <Card title="Emotion Distribution">

          <Pie data={data} />

        </Card>

        {/* Speech Analysis */}

        <Card title="Speech Analysis">

          <p><strong>Words / Minute:</strong> {speech?.words_per_minute}</p>
          <p><strong>Filler Words:</strong> {speech?.filler_words}</p>
          <p><strong>Clarity Score:</strong> {speech?.clarity_score}%</p>
          <p><strong>Sentiment:</strong> {speech?.sentiment_score}</p>

        </Card>

      </div>

      {/* Language Quality */}

      <div style={{ marginTop: "20px" }}>

        <Card title="Language Quality">

          <p><strong>Vocabulary Score:</strong> {speech?.vocabulary_score}%</p>
          <p><strong>Grammar Errors:</strong> {speech?.grammar_errors}</p>
          <p><strong>Sentence Length:</strong> {speech?.avg_sentence_length}</p>
          <p><strong>Strong Words Used:</strong> {speech?.strong_words}</p>

        </Card>

      </div>

    </div>
  );
}