from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class CyberTopic(Base):
    __tablename__ = "cyber_topics"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    status = Column(String, default="learning")
    created_at = Column(DateTime, default=datetime.utcnow)

    notes = relationship(
        "CyberNote",
        back_populates="topic",
        cascade="all, delete"
    )


class CyberNote(Base):
    __tablename__ = "cyber_notes"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("cyber_topics.id"))

    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)

    confidence_level = Column(Integer, default=3)

    created_at = Column(DateTime, default=datetime.utcnow)

    topic = relationship(
        "CyberTopic",
        back_populates="notes"
    )