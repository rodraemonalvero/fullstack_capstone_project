from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db

from ai_service import format_topic_context, ask_claude

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Cyber Learning Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Cyber Learning Tracker API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/topics", response_model=schemas.CyberTopic)
def create_topic(topic: schemas.CyberTopicCreate, db: Session = Depends(get_db)):
    db_topic = models.CyberTopic(**topic.model_dump())
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic


@app.get("/topics", response_model=list[schemas.CyberTopic])
def get_topics(db: Session = Depends(get_db)):
    return db.query(models.CyberTopic).all()


@app.get("/topics/{topic_id}", response_model=schemas.CyberTopic)
def get_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(models.CyberTopic).filter(models.CyberTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic


@app.put("/topics/{topic_id}", response_model=schemas.CyberTopic)
def update_topic(
    topic_id: int,
    topic_update: schemas.CyberTopicUpdate,
    db: Session = Depends(get_db)
):
    topic = db.query(models.CyberTopic).filter(models.CyberTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    for key, value in topic_update.model_dump(exclude_unset=True).items():
        setattr(topic, key, value)

    db.commit()
    db.refresh(topic)
    return topic


@app.delete("/topics/{topic_id}")
def delete_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(models.CyberTopic).filter(models.CyberTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    db.delete(topic)
    db.commit()
    return {"message": "Topic deleted successfully"}


@app.post("/notes", response_model=schemas.CyberNote)
def create_note(note: schemas.CyberNoteCreate, db: Session = Depends(get_db)):
    topic = db.query(models.CyberTopic).filter(models.CyberTopic.id == note.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    db_note = models.CyberNote(**note.model_dump())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


@app.get("/notes", response_model=list[schemas.CyberNote])
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.CyberNote).all()


@app.get("/notes/{note_id}", response_model=schemas.CyberNote)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.CyberNote).filter(models.CyberNote.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@app.put("/notes/{note_id}", response_model=schemas.CyberNote)
def update_note(
    note_id: int,
    note_update: schemas.CyberNoteUpdate,
    db: Session = Depends(get_db)
):
    note = db.query(models.CyberNote).filter(models.CyberNote.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    for key, value in note_update.model_dump(exclude_unset=True).items():
        setattr(note, key, value)

    db.commit()
    db.refresh(note)
    return note


@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.CyberNote).filter(models.CyberNote.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}


@app.post("/ai/explain")
def ai_explain_topic(request: schemas.AIRequest, db: Session = Depends(get_db)):
    topic = db.query(models.CyberTopic).filter(
        models.CyberTopic.id == request.topic_id
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    context = format_topic_context(topic)

    system_prompt = """
You are an AI cybersecurity tutor for students preparing for SOC analyst and cybersecurity analyst roles.
Use the user's saved topic and notes as your main source of context.
Explain concepts clearly, simply, and practically.
Do not say you are using hidden reasoning.
"""

    user_prompt = f"""
Use this saved cybersecurity learning data:

{context}

User question:
{request.question or "Explain this topic clearly for a beginner cybersecurity student."}
"""

    answer = ask_claude(system_prompt, user_prompt)

    return {
        "topic_id": topic.id,
        "topic_title": topic.title,
        "ai_response": answer
    }


@app.post("/ai/quiz")
def ai_generate_quiz(request: schemas.AIRequest, db: Session = Depends(get_db)):
    topic = db.query(models.CyberTopic).filter(
        models.CyberTopic.id == request.topic_id
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    context = format_topic_context(topic)

    system_prompt = """
You are an AI quiz generator for cybersecurity students.
Create practical SOC analyst style quiz questions based on the user's saved topic and notes.
Include answers after the questions.
Keep the quiz clear and useful for studying.
"""

    user_prompt = f"""
Generate a 5-question quiz using this saved cybersecurity learning data:

{context}

Focus on beginner to intermediate SOC analyst knowledge.
"""

    quiz = ask_claude(system_prompt, user_prompt)

    return {
        "topic_id": topic.id,
        "topic_title": topic.title,
        "quiz": quiz
    }