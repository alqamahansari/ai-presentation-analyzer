import { useState, useEffect } from "react";
import Recorder from "./Recorder";
import questions from "../data/questions";

export default function InterviewScreen({ finishInterview }) {

  const [index, setIndex] = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [stopSignal, setStopSignal] = useState(false);

  const QUESTION_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const lastQuestion = index === questions.length - 1;

  const progress = ((index + 1) / questions.length) * 100;

  // Timer

  useEffect(() => {

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft]);

  // Next Question

  const nextQuestion = () => {

    if (lastQuestion) {

      // STOP CAMERA + MIC
      setStopSignal(true);

      // Go to result page after small delay
      setTimeout(() => {
        finishInterview(analytics);
      }, 1500);

    } else {

      setIndex(index + 1);
      setTimeLeft(QUESTION_TIME);

    }

  };

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui"
      }}
    >

      <div
        style={{
          width: "900px",
          background: "#F3F4F6",
          padding: "45px",
          borderRadius: "12px",
          border: "1px solid #D1D5DB"
        }}
      >

        {/* Progress */}

        <div
          style={{
            height: "8px",
            background: "#E5E7EB",
            borderRadius: "6px",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#2563EB"
            }}
          />

        </div>

        {/* Question Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            color: "#6B7280"
          }}
        >

          <span>
            Question {index + 1} / {questions.length}
          </span>

          <span>
            {formatTime(timeLeft)}
          </span>

        </div>

        {/* Question */}

        <h2
          style={{
            color: "#111827",
            fontSize: "26px",
            marginBottom: "25px"
          }}
        >
          {questions[index]}
        </h2>

        {/* Recorder */}

        <Recorder
          setAnalytics={setAnalytics}
          stopSignal={stopSignal}
        />

        {/* Button */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px"
          }}
        >

          <button
            onClick={nextQuestion}
            style={{
              padding: "14px 36px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: lastQuestion ? "#EF4444" : "#2563EB",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {lastQuestion ? "Submit Interview" : "Next Question"}
          </button>

        </div>

      </div>

    </div>
  );
}