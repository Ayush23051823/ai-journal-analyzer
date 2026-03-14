# AI Journal Analyzer

## Overview

AI Journal Analyzer is a full-stack journaling web application that allows users to write daily journal entries and analyze them using AI. The system extracts emotions and keywords from journal entries and provides insights into user mood patterns over time.

This project demonstrates full-stack development with AI integration, REST API design, and database storage.

The application consists of a **React frontend**, **Node.js + Express backend**, and a **SQLite database** for storing journal entries.

---

## Features

* Create and store journal entries
* Analyze journal text using AI to detect emotions and keywords
* Retrieve previous journal entries
* Generate insights based on past entries
* Simple and clean user interface
* REST API backend architecture

---

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite

### AI Integration

* OpenAI API (or mock analysis)

---

## Project Structure

```
ai-journal-analyzer
│
├── src                # React frontend
│
├── server             # Express backend
│   ├── index.js
│   └── database.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

## API Endpoints

### Create Journal Entry

```
POST /api/journal
```

Request body

```
{
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}
```

This endpoint saves a journal entry in the database.

---

### Get Journal Entries

```
GET /api/journal/:userId
```

Returns all journal entries for the specified user.

---

### Analyze Journal Entry

```
POST /api/journal/analyze
```

Request

```
{
  "text": "I felt calm today after listening to the rain."
}
```

Response

```
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation while reflecting on nature."
}
```

---

### Insights API

```
GET /api/journal/insights/:userId
```

Example Response

```
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus", "nature", "rain"]
}
```

This endpoint generates insights based on the user's journal entries.

---

## How to Run the Project

### Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/ai-journal-analyzer.git
```

### Install Dependencies

Frontend

```
npm install
```

Backend

```
cd server
npm install
```

---

### Run Backend Server

```
node index.js
```

Server runs on:

```
http://localhost:5000
```

---

### Run Frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## System Architecture

```
Frontend (React)
      |
      | REST API
      v
Backend (Node.js + Express)
      |
      v
Database (SQLite)
      |
      v
AI Analysis Service
```

---

## Scalability Considerations

To scale the system for a large number of users:

* Use a load balancer for distributing requests
* Replace SQLite with PostgreSQL or a distributed database
* Deploy backend services using containerization
* Implement caching for repeated AI analysis

---

## Reducing LLM Cost

* Cache previous AI analysis results
* Use smaller or optimized language models
* Analyze entries only when necessary
* Store processed insights instead of recomputing them

---

## Data Security

Journal data is sensitive. Security improvements include:

* HTTPS encryption
* Authentication and user access control
* Database encryption
* Secure API key storage using environment variables

---

## Future Improvements

* Emotion visualization charts
* User authentication
* Real-time AI streaming responses
* Deployment on cloud platforms
* Advanced mood tracking analytics

---

## Author

Ayush Kumar
