from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class CyberNoteBase(BaseModel):
    title: str
    content: str
    confidence_level: int = 3


class CyberNoteCreate(CyberNoteBase):
    topic_id: int


class CyberNoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    confidence_level: Optional[int] = None


class CyberNote(CyberNoteBase):
    id: int
    topic_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CyberTopicBase(BaseModel):
    title: str
    category: str
    difficulty: str
    status: str = "learning"


class CyberTopicCreate(CyberTopicBase):
    pass


class CyberTopicUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    difficulty: Optional[str] = None
    status: Optional[str] = None


class CyberTopic(CyberTopicBase):
    id: int
    created_at: datetime
    notes: List[CyberNote] = []

    class Config:
        from_attributes = True


class AIRequest(BaseModel):
    topic_id: int
    question: Optional[str] = None