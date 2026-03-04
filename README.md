# AI Presentation Performance Analyzer

### A Multimodal AI System for Evaluating Human Presentation Skills

An AI-powered system that evaluates presentation performance using
**Computer Vision**, **Speech Processing**, and **Natural Language
Processing (NLP)**.

The system captures webcam video and microphone audio during a
presentation and analyzes:

-   Facial emotions (confidence & engagement)
-   Speech delivery (speed, fluency, filler words)
-   Language quality (vocabulary richness, clarity, sentiment)

The results are combined into an **AI-powered presentation analytics
dashboard**.

------------------------------------------------------------------------

## Features

• Real‑time facial emotion recognition\
• Speech transcription using Whisper\
• Words-per-minute analysis\
• Filler word detection\
• Vocabulary richness evaluation\
• Sentiment analysis of speech\
• Emotion distribution visualization\
• Confidence score estimation\
• Speech analytics dashboard

------------------------------------------------------------------------

## AI Modules

### 1. Emotion Recognition (Computer Vision)

A convolutional neural network analyzes facial expressions from webcam
frames to detect emotional states during the presentation.

### 2. Speech Delivery Analysis (Audio AI)

Audio is transcribed using Whisper and analyzed to compute: - Speaking
speed (Words per Minute) - Filler word frequency - Speech fluency

### 3. Language Quality Evaluation (NLP)

Natural Language Processing techniques measure: - Vocabulary richness -
Sentence complexity - Sentiment of the speech

### 4. Multimodal Performance Evaluation

Results from the vision, speech, and language modules are combined to
produce a **presentation confidence score**.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React.js
-   Chart.js
-   Axios

### Backend

-   FastAPI
-   PyTorch
-   OpenAI Whisper
-   NLTK
-   VaderSentiment

------------------------------------------------------------------------

## Project Structure

ai-presentation-analyzer │ ├── backend │ ├── app.py │ ├──
requirements.txt │ ├── emotion_model/ │ ├── audio_module/ │ └── scoring/
│ ├── frontend │ ├── package.json │ └── src/ │ └── components/ │ ├──
docs │ └── screenshots/ │ └── README.md

------------------------------------------------------------------------

## System Architecture

Camera + Microphone\
│\
▼\
Data Capture Layer\
│\
┌──────┴─────────┐\
▼ ▼\
Emotion Model Speech Model\
(CNN) (Whisper)\
▼ ▼\
Emotion Metrics NLP Metrics\
│\
▼\
Multimodal Evaluation Engine\
│\
▼\
AI Presentation Dashboard

------------------------------------------------------------------------

## Example Output

Emotion Distribution\
Confidence Score\
Speech Analysis\
Language Quality Metrics

Example metrics include:

-   Words Per Minute
-   Filler Word Count
-   Vocabulary Score
-   Sentiment Score
-   Language Quality Score

------------------------------------------------------------------------

## Keywords

Artificial Intelligence\
Multimodal AI\
Computer Vision\
Speech Analysis\
Natural Language Processing\
Presentation Analytics\
Human Behavior Analysis

------------------------------------------------------------------------

## Author

Mohammad Alquamah Ansari\
B.Sc. Artificial Intelligence

GitHub: https://github.com/alqamahansari
