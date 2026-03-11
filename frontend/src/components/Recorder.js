import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Recorder = ({ question, setAnalytics, stopSignal }) => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sessionEmotionsRef = useRef([]);
  const stoppedRef = useRef(false);

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const API_URL = "http://127.0.0.1:8000";

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // -----------------------------
  // START CAMERA + AUDIO
  // -----------------------------

  const startMedia = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();

    } catch (error) {

      console.error("Camera/Mic permission error:", error);

    }
  };

  // -----------------------------
  // STOP CAMERA
  // -----------------------------

  const stopMedia = () => {

    if (streamRef.current) {

      streamRef.current.getTracks().forEach(track => track.stop());

      streamRef.current = null;

    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // -----------------------------
  // START RECORDING
  // -----------------------------

  const startRecording = async () => {

    sessionEmotionsRef.current = [];

    stoppedRef.current = false;

    setSecondsElapsed(0);

    await startMedia();

    // Emotion detection every second

    intervalRef.current = setInterval(async () => {

      if (!videoRef.current || !canvasRef.current) return;

      if (videoRef.current.readyState !== 4) return;

      const context = canvasRef.current.getContext("2d");

      context.drawImage(videoRef.current, 0, 0, 224, 224);

      canvasRef.current.toBlob(async (blob) => {

        if (!blob) return;

        try {

          const formData = new FormData();

          formData.append("file", blob);

          const response = await axios.post(
            `${API_URL}/predict-frame`,
            formData
          );

          const emotion = response.data.emotion;

          sessionEmotionsRef.current.push(emotion);

        } catch (error) {

          console.error("Emotion detection error:", error);

        }

      });

    }, 1000);

    // Timer

    timerRef.current = setInterval(() => {

      setSecondsElapsed(prev => prev + 1);

    }, 1000);
  };

  // -----------------------------
  // STOP RECORDING
  // -----------------------------

  const stopRecording = () => {

    if (stoppedRef.current) return;

    stoppedRef.current = true;

    clearInterval(intervalRef.current);

    clearInterval(timerRef.current);

    const recorder = mediaRecorderRef.current;

    if (!recorder) {

      stopMedia();

      return;

    }

    recorder.onstop = async () => {

      try {

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm"
        });

        const formData = new FormData();

        formData.append("file", audioBlob, "interview.webm");

        // Speech analysis

        const speechResponse = await axios.post(
          `${API_URL}/analyze-audio`,
          formData
        );

        // Emotion aggregation

        const emotionResponse = await axios.post(
          `${API_URL}/aggregate-emotions`,
          sessionEmotionsRef.current
        );

        const result = {

          question: question,

          transcript: speechResponse.data.transcript,

          speech: speechResponse.data,

          emotions: emotionResponse.data

        };

        setAnalytics(prev => {

          if (!prev) {
            prev = { answers: [] };
          }

        return {

    distribution: emotionResponse.data.distribution,
    confidence_score: emotionResponse.data.confidence_score,

    speech: speechResponse.data,

    answers: [
      ...prev.answers,
      result
    ]

  };

});

      } catch (error) {

        console.error("Final analysis error:", error);

      }

      stopMedia();

    };

    if (recorder.state !== "inactive") {

      recorder.stop();

    }
  };

  // -----------------------------
  // AUTO START
  // -----------------------------

  useEffect(() => {

    startRecording();

  }, []);

  // -----------------------------
  // STOP WHEN SUBMITTED
  // -----------------------------

  useEffect(() => {

    if (stopSignal === true) {

      stopRecording();

    }

  }, [stopSignal]);

  // -----------------------------
  // CLEANUP
  // -----------------------------

  useEffect(() => {

    return () => {

      stopMedia();

      clearInterval(intervalRef.current);

      clearInterval(timerRef.current);

    };

  }, []);

  return (

    <div style={{ width: "100%" }}>

      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "#1e1e1e",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative"
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        {/* Recording Indicator */}

        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "18px",
            display: "flex",
            gap: "6px",
            fontSize: "12px",
            backgroundColor: "rgba(0,0,0,0.55)",
            padding: "5px 10px",
            borderRadius: "6px"
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              animation: "blink 1s infinite"
            }}
          />
          <span style={{ color: "#f87171" }}>Recording</span>
        </div>

        {/* Timer */}

        <div
          style={{
            position: "absolute",
            bottom: "18px",
            right: "22px",
            color: "#ef4444",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          {formatTime(secondsElapsed)}
        </div>

      </div>

      <canvas
        ref={canvasRef}
        width="224"
        height="224"
        style={{ display: "none" }}
      />

      <style>
        {`
        @keyframes blink {
          0% { opacity: 1 }
          50% { opacity: 0.3 }
          100% { opacity: 1 }
        }
        `}
      </style>

    </div>
  );
};

export default Recorder;