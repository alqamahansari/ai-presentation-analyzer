import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


/* Card Component */

const Card = ({ title, children }) => (
  <div
    style={{
      background: "#F9FAFB",
      border: "1px solid #E5E7EB",
      borderRadius: "10px",
      padding: "16px",
      color: "#374151",
      height: "100%",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    }}
  >
    <div
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "12px",
        paddingBottom: "6px",
        borderBottom: "1px solid #E5E7EB"
      }}
    >
      {title}
    </div>

    {children}
  </div>
);


export default function Dashboard({ analytics }) {

  if (!analytics) return <p>Loading...</p>;

  const { distribution, confidence_score, speech, answers } = analytics;

  const labels = Object.keys(distribution || {});
  const values = Object.values(distribution || {});

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
        maxWidth: "1400px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Inter, system-ui"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "18px",
          color: "#111827",
          fontSize: "30px"
        }}
      >
        Interview Analysis Report
      </h1>


      {/* MAIN GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px"
        }}
      >

        {/* CONFIDENCE */}

        <Card title="Confidence Score">

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "110px"
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: "700",
                color: "#2563EB"
              }}
            >
              {confidence_score}%
            </div>
          </div>

        </Card>


        {/* SPEECH */}

        <Card title="Speech Analysis">

          <p><strong>Words / Minute:</strong> {speech?.words_per_minute}</p>
          <p><strong>Filler Words:</strong> {speech?.filler_words}</p>
          <p><strong>Clarity Score:</strong> {speech?.clarity_score}%</p>
          <p><strong>Sentiment:</strong> {speech?.sentiment_score}</p>

        </Card>


        {/* EMOTIONS */}

        <Card title="Emotion Distribution">

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >

            {/* PIE */}

            <div style={{ width: "170px" }}>
              <Pie
                data={data}
                options={{
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </div>


            {/* LEGEND */}

            <div style={{ fontSize: "14px" }}>
              {labels.map((label, index) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "6px"
                  }}
                >

                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        data.datasets[0].backgroundColor[index],
                      borderRadius: "3px",
                      marginRight: "8px"
                    }}
                  />

                  <span style={{ marginRight: "6px", fontWeight: "500" }}>
                    {label}
                  </span>

                  <span>{values[index]}%</span>

                </div>
              ))}
            </div>

          </div>

        </Card>


        {/* LANGUAGE */}

        <Card title="Language Quality">

          <p><strong>Vocabulary Score:</strong> {speech?.vocabulary_score}%</p>
          <p><strong>Grammar Errors:</strong> {speech?.grammar_errors}</p>
          <p><strong>Sentence Length:</strong> {speech?.avg_sentence_length}</p>
          <p><strong>Strong Words Used:</strong> {speech?.strong_words}</p>

        </Card>

      </div>


      {/* QUESTION-WISE TRANSCRIPTS */}

      <div style={{ marginTop: "16px" }}>

        <Card title="Interview Transcripts">

          <div
            style={{
              maxHeight: "180px",
              overflowY: "auto",
              fontSize: "14px"
            }}
          >

            {answers && answers.length > 0 ? (

              answers.map((item, index) => (

                <div
                  key={index}
                  style={{
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #E5E7EB"
                  }}
                >

                  <div
                    style={{
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}
                  >
                    Q{index + 1}: {item.question}
                  </div>

                  <div style={{ color: "#374151" }}>
                    {item.transcript}
                  </div>

                </div>

              ))

            ) : (

              <p>No transcript available.</p>

            )}

          </div>

        </Card>

      </div>

    </div>
  );
}