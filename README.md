# AI Presentation Performance Analyzer

## Multimodal AI System for Evaluating Human Presentation Skills

An **AI-powered presentation evaluation system** that analyzes a speaker’s performance using a **multimodal artificial intelligence approach** combining:

- Computer Vision
- Speech Processing
- Natural Language Processing (NLP)

The system captures **webcam video** and **microphone audio** during a presentation and automatically evaluates multiple aspects of communication performance.

It analyzes:

- **Facial emotions** to measure confidence and engagement
- **Speech delivery** to evaluate fluency, speaking speed, and filler words
- **Language quality** to measure vocabulary richness and sentiment

All results are integrated into an **AI-driven presentation analytics dashboard** that provides objective feedback on presentation skills.

# Features

- Real-time **Facial Emotion Recognition**
- **Speech-to-Text transcription** using Whisper
- **Words-per-minute (WPM)** speaking speed analysis
- **Filler word detection**
- **Vocabulary richness evaluation**
- **Sentiment analysis of speech**
- **Emotion distribution visualization**
- **Presentation confidence score estimation**
- **Speech analytics dashboard**

# AI Modules

## 1. Emotion Recognition (Computer Vision)

A **Convolutional Neural Network (CNN)** processes facial expressions captured from webcam frames to detect emotional states during the presentation.

These emotions are aggregated to estimate the speaker’s **overall presentation confidence**.


## 2. Speech Delivery Analysis (Audio AI)

Audio from the presentation is transcribed using **OpenAI Whisper**.

The system evaluates:

- **Speaking speed (Words Per Minute)**
- **Filler word frequency**
- **Speech fluency**

These metrics provide insights into the **clarity and pacing of speech delivery**.


## 3. Language Quality Evaluation (NLP)

Natural Language Processing techniques are applied to the transcribed speech to measure linguistic quality through:

- **Vocabulary richness**
- **Sentence complexity**
- **Sentiment analysis**

This helps determine how effectively the speaker communicates ideas.


## 4. Multimodal Performance Evaluation

Outputs from the **vision**, **speech**, and **language** modules are combined to produce a unified metric called the:

### Presentation Confidence Score

This score reflects the overall effectiveness of the presentation.


# Technology Stack

## Frontend

- React.js  
- Chart.js  
- Axios  

## Backend

- FastAPI  
- PyTorch  
- OpenAI Whisper  
- NLTK  
- VaderSentiment  


# Project Structure
```
ai-presentation-analyzer
│
├── backend
│ ├── app.py
│ ├── requirements.txt
│ ├── emotion_model/
│ ├── audio_module/
│ └── scoring/
│
├── frontend
│ ├── package.json
│ └── src/
│ └── components/
│
├── docs
│
├── screenshots
│
└── README.md
```

# System Architecture
```
Camera + Microphone
        │
        ▼
   Data Capture Layer
        │
 ┌──────┴─────────┐
 ▼                ▼
Emotion Model   Speech Model
    (CNN)         (Whisper)
 ▼                ▼
Emotion Metrics   NLP Metrics
        │
        ▼
Multimodal Evaluation Engine
        │
        ▼
AI Presentation Analytics Dashboard
```


# Example Output Metrics

The system generates several performance indicators, including:

- Words Per Minute (WPM)
- Filler Word Count
- Vocabulary Richness Score
- Sentiment Score
- Emotion Distribution
- Language Quality Score
- Presentation Confidence Score

These metrics help users understand **strengths and weaknesses in their presentation delivery**.

# Keywords

Artificial Intelligence  
Multimodal AI  
Computer Vision  
Speech Analysis  
Natural Language Processing  
Presentation Analytics  
Human Behavior Analysis  

# Author

**Mohammad Alquamah Ansari**  
B.Sc. Artificial Intelligence  

GitHub:  
https://github.com/alqamahansari