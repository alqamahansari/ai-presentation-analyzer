import os
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

import whisper
import nltk
import re

from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Load models
model = whisper.load_model("tiny")
sentiment_analyzer = SentimentIntensityAnalyzer()
lemmatizer = WordNetLemmatizer()

# Download resources if missing
nltk.download("punkt", quiet=True)
nltk.download("wordnet", quiet=True)
nltk.download("omw-1.4", quiet=True)


FILLER_WORDS = ["um", "uh", "like", "you know", "so", "actually"]

STRONG_WORDS = [
    "analyze","evaluate","implement","optimize",
    "improve","develop","demonstrate","achieve",
    "enhance","propose","efficient","significant"
]


# -----------------------------
# TEXT CLEANING
# -----------------------------

def clean_transcript(text):

    text = text.strip()

    # remove repeated spaces
    text = re.sub(r"\s+", " ", text)

    # capitalize first letter
    if len(text) > 0:
        text = text[0].upper() + text[1:]

    return text


# -----------------------------
# NLP PREPROCESSING
# -----------------------------

def preprocess_text(text):

    tokens = word_tokenize(text.lower())

    # lemmatization
    lemmas = [lemmatizer.lemmatize(word) for word in tokens]

    return lemmas


# -----------------------------
# MAIN ANALYSIS FUNCTION
# -----------------------------

def analyze_speech(audio_path):

    # Speech recognition
    result = model.transcribe(audio_path)

    transcript = result.get("text", "").strip()

    transcript = clean_transcript(transcript)

    if transcript == "":
        return {
            "transcript": "",
            "words_per_minute": 0,
            "filler_words": 0,
            "sentiment_score": 0,
            "clarity_score": 0,
            "vocabulary_score": 0,
            "avg_sentence_length": 0,
            "strong_words": 0,
            "language_score": 0
        }

    # NLP processing
    words = preprocess_text(transcript)

    sentences = sent_tokenize(transcript)

    total_words = len(words)

    # -----------------------------
    # FILLER WORD DETECTION
    # -----------------------------

    filler_count = sum(1 for word in words if word in FILLER_WORDS)

    # -----------------------------
    # SPEECH SPEED
    # -----------------------------

    duration = result["segments"][-1]["end"] if result.get("segments") else 1

    wpm = (total_words / duration) * 60 if duration > 0 else 0

    # -----------------------------
    # SENTIMENT ANALYSIS
    # -----------------------------

    sentiment = sentiment_analyzer.polarity_scores(transcript)

    sentiment_label = "Neutral"

    if sentiment["compound"] >= 0.3:
        sentiment_label = "Positive"
    elif sentiment["compound"] <= -0.3:
        sentiment_label = "Negative"

    # -----------------------------
    # CLARITY SCORE
    # -----------------------------

    clarity_score = max(0, 100 - filler_count * 5)

    # -----------------------------
    # VOCABULARY RICHNESS
    # -----------------------------

    unique_words = len(set(words))

    vocabulary_score = (
        round((unique_words / total_words) * 100, 2)
        if total_words > 0 else 0
    )

    # -----------------------------
    # SENTENCE STRUCTURE
    # -----------------------------

    avg_sentence_length = (
        round(total_words / len(sentences), 2)
        if len(sentences) > 0 else 0
    )

    # -----------------------------
    # STRONG WORD DETECTION
    # -----------------------------

    strong_word_count = sum(1 for word in words if word in STRONG_WORDS)

    # -----------------------------
    # FINAL LANGUAGE SCORE
    # -----------------------------

    language_score = max(
        0,
        min(
            100,
            60
            + strong_word_count * 4
            + vocabulary_score * 0.2
            - filler_count * 3
        )
    )

    return {

        "transcript": transcript,

        "words_per_minute": round(wpm, 2),
        "filler_words": filler_count,

        "sentiment_score": sentiment_label,

        "clarity_score": clarity_score,

        "vocabulary_score": vocabulary_score,
        "avg_sentence_length": avg_sentence_length,
        "strong_words": strong_word_count,

        "language_score": round(language_score, 2)
    }