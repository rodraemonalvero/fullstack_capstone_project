# AI Cyber Learning Tracker

## Overview

AI Cyber Learning Tracker is a full-stack web application designed to help cybersecurity students organize study topics, track learning progress, store notes, and use AI assistance for explanations and quiz generation.

The application combines a FastAPI backend, PostgreSQL database, Next.js frontend, Docker containers, and Anthropic Claude AI.

---

## Features

### Topic Management

* Create cybersecurity topics
* View all topics
* Update topics
* Delete topics
* Mark topics as completed

### Notes Management

* Create learning notes
* Associate notes with cybersecurity topics
* Track confidence levels for study notes

### AI Cyber Coach

* Explain cybersecurity concepts using Claude AI
* Generate cybersecurity quizzes
* Provide learning assistance for study topics

### Database

* PostgreSQL relational database
* Topics and Notes relationship
* Persistent data storage

### DevOps

* Dockerized frontend
* Dockerized backend
* Docker Compose deployment

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

### AI

* Anthropic Claude API

### Deployment

* Docker
* Docker Compose

---

## Project Structure

capstoneproject/

* frontend/
* backend/
* docker-compose.yml
* README.md

---

## Running Locally

### Backend

```bash
cd backend
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Running with Docker

```bash
docker compose up --build
```

Frontend:

http://localhost:3000

Backend API Docs:

http://localhost:8000/docs

---

## API Endpoints

### Topics

GET /topics

POST /topics

PUT /topics/{id}

DELETE /topics/{id}

### Notes

GET /notes

POST /notes

PUT /notes/{id}

DELETE /notes/{id}

### AI

POST /ai/explain

POST /ai/quiz

---

## Example Use Case

A cybersecurity student creates a topic called Network Security, adds notes about firewalls, asks Claude AI to explain firewall concepts, and generates quizzes for self-study.

---

## Author

Rod Raemon Alvero

Graduate Student – Computer Science
