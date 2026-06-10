import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)


def format_topic_context(topic):
    notes_text = ""

    if topic.notes:
        for note in topic.notes:
            notes_text += f"""
Note Title: {note.title}
Confidence Level: {note.confidence_level}/5
Content: {note.content}
"""
    else:
        notes_text = "No notes have been added for this topic yet."

    return f"""
Cybersecurity Topic:
Title: {topic.title}
Category: {topic.category}
Difficulty: {topic.difficulty}
Status: {topic.status}

Saved Notes:
{notes_text}
"""


def ask_claude(system_prompt: str, user_prompt: str):
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        system=system_prompt,
        messages=[
            {"role": "user", "content": user_prompt}
        ],
    )

    return response.content[0].text