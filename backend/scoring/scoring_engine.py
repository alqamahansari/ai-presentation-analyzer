def compute_scores(emotion_distribution, words_per_minute, filler_words, language_score):

    positive = emotion_distribution.get("Happy", 0) + emotion_distribution.get("Surprise", 0)
    negative = (
        emotion_distribution.get("Sad", 0)
        + emotion_distribution.get("Angry", 0)
        + emotion_distribution.get("Fear", 0)
        + emotion_distribution.get("Disgust", 0)
    )

    emotion_score = max(0, min(100, positive - negative + 50))


    if 110 <= words_per_minute <= 150:
        speed_score = 100
    elif 90 <= words_per_minute < 110 or 150 < words_per_minute <= 170:
        speed_score = 75
    else:
        speed_score = 50

    filler_penalty = filler_words * 3
    speech_score = max(0, speed_score - filler_penalty)


    language_score = max(0, min(100, language_score))


    final_score = round(
        (emotion_score * 0.4) +
        (speech_score * 0.3) +
        (language_score * 0.3),
        2
    )

    feedback = []

    if emotion_score < 60:
        feedback.append("Try to maintain more positive facial expressions.")

    if speech_score < 60:
        feedback.append("Improve speech fluency and reduce filler words.")

    if words_per_minute < 100:
        feedback.append("Speak slightly faster to maintain audience engagement.")

    if words_per_minute > 170:
        feedback.append("Slow down your speech for better clarity.")

    if language_score < 70:
        feedback.append("Use more varied vocabulary in your presentation.")

    if not feedback:
        feedback.append("Excellent presentation performance.")


    return {
        "emotion_score": round(emotion_score, 2),
        "speech_score": round(speech_score, 2),
        "language_score": round(language_score, 2),
        "final_score": final_score,
        "feedback": feedback
    }