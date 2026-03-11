from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from collections import Counter

from audio_module.audio_nlp import analyze_speech
from scoring.scoring_engine import compute_scores

app = FastAPI()


# -----------------------------
# CORS CONFIG
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# LOAD EMOTION MODEL
# -----------------------------

model = None

@app.on_event("startup")
def startup_event():
    global model
    from emotion_model.predict import load_model
    print("Loading emotion model...")
    model = load_model()
    print("Emotion model loaded.")


# -----------------------------
# EMOTION PREDICTION
# -----------------------------

@app.post("/predict-frame")
async def predict_frame(file: UploadFile = File(...)):

    temp_image = "temp.jpg"

    try:

        with open(temp_image, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        from emotion_model.predict import predict_emotion
        result = predict_emotion(temp_image, model)

        return result

    finally:
        if os.path.exists(temp_image):
            os.remove(temp_image)


# -----------------------------
# EMOTION AGGREGATION
# -----------------------------

@app.post("/aggregate-emotions")
async def aggregate_emotions(emotions: list[str]):

    if not emotions:
        return {
            "distribution": {},
            "confidence_score": 0
        }

    counts = Counter(emotions)
    total = sum(counts.values())

    distribution = {
        emotion: round((count / total) * 100, 2)
        for emotion, count in counts.items()
    }

    positivity = distribution.get("Happy", 0) + distribution.get("Surprise", 0)

    negativity = (
        distribution.get("Sad", 0)
        + distribution.get("Angry", 0)
        + distribution.get("Fear", 0)
        + distribution.get("Disgust", 0)
    )

    confidence_score = max(0, min(100, positivity - negativity + 50))

    return {
        "distribution": distribution,
        "confidence_score": round(confidence_score, 2)
    }


# -----------------------------
# AUDIO ANALYSIS
# -----------------------------

@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):

    audio_path = "temp_audio.wav"

    try:

        with open(audio_path, "wb") as f:
            f.write(await file.read())

        speech_results = analyze_speech(audio_path)

        return speech_results

    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)


# -----------------------------
# FINAL AI SCORING
# -----------------------------

@app.post("/final-analysis")
async def final_analysis(data: dict):

    emotion_distribution = data.get("emotion_distribution", {})
    speech = data.get("speech", {})

    words_per_minute = speech.get("words_per_minute", 0)
    filler_words = speech.get("filler_words", 0)
    language_score = speech.get("language_score", 0)

    result = compute_scores(
        emotion_distribution,
        words_per_minute,
        filler_words,
        language_score
    )

    return result


# -----------------------------
# CONNECTION TEST
# -----------------------------

@app.get("/test-connection")
def test_connection():
    print("Frontend connected successfully")
    return {
        "message": "Backend working"
    }