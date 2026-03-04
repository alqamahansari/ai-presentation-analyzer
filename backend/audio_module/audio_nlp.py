import os
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

import whisper
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

model = whisper.load_model("base")
sentiment_analyzer = SentimentIntensityAnalyzer()

FILLER_WORDS = ["um", "uh", "like", "you know", "so", "actually"]

STRONG_WORDS = [
    "analyze","evaluate","implement","optimize",
    "improve","develop","demonstrate","achieve",
    "enhance","propose","efficient","significant"
]


def analyze_speech(audio_path):

    result = model.transcribe(audio_path)
    transcript = result["text"]

    words = word_tokenize(transcript.lower())
    sentences = sent_tokenize(transcript)

    total_words = len(words)

    filler_count = sum(words.count(word) for word in FILLER_WORDS)

    duration = result["segments"][-1]["end"] if result["segments"] else 1
    wpm = (total_words / duration) * 60 if duration > 0 else 0

    sentiment = sentiment_analyzer.polarity_scores(transcript)

    clarity_score = max(0, 100 - filler_count * 5)

    unique_words = len(set(words))
    vocabulary_score = (
        round((unique_words / total_words) * 100, 2)
        if total_words > 0 else 0
    )

    avg_sentence_length = (
        round(total_words / len(sentences), 2)
        if len(sentences) > 0 else 0
    )

    strong_word_count = sum(word in STRONG_WORDS for word in words)

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
        "sentiment_score": sentiment["compound"],
        "clarity_score": clarity_score,

        "vocabulary_score": vocabulary_score,
        "avg_sentence_length": avg_sentence_length,
        "strong_words": strong_word_count,
        "language_score": round(language_score, 2)
    }