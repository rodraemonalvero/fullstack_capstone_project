"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
  confidence_level: number;
}

interface Topic {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  status: string;
  notes: Note[];
}

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/topics/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
        setLoading(false);
      });
  }, [id]);

  async function markCompleted() {
    await fetch(`http://127.0.0.1:8000/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Completed",
      }),
    });

    router.refresh();
    window.location.reload();
  }

  async function deleteTopic() {
    const confirmed = confirm(
      "Are you sure you want to delete this topic?"
    );

    if (!confirmed) return;

    await fetch(`http://127.0.0.1:8000/topics/${id}`, {
      method: "DELETE",
    });

    router.push("/topics");
  }

  if (loading) {
    return <p>Loading topic...</p>;
  }

  if (!topic) {
    return <p>Topic not found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {topic.title}
      </h1>

      <p>
        <strong>Category:</strong> {topic.category}
      </p>

      <p>
        <strong>Difficulty:</strong> {topic.difficulty}
      </p>

      <p className="mb-6">
        <strong>Status:</strong> {topic.status}
      </p>

      <div className="flex gap-3 mb-6">
        <Link
          href={`/topics/${id}/edit`}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Edit Topic
        </Link>

        <button
          onClick={markCompleted}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Mark as Completed
        </button>

        <button
          onClick={deleteTopic}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Topic
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-3">
        Notes
      </h2>

      <div className="space-y-3">
        {topic.notes.map((note) => (
          <div
            key={note.id}
            className="border rounded p-3"
          >
            <h3 className="font-bold">
              {note.title}
            </h3>

            <p>{note.content}</p>

            <p>
              Confidence Level: {note.confidence_level}/5
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}