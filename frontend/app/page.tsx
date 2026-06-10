"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Topic {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  status: string;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading topics...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Cybersecurity Topics
      </h1>

      <div className="space-y-4">
        {topics.map((topic) => (
          <Link
            href={`/topics/${topic.id}`}
            key={topic.id}
            className="block border rounded-lg p-4 shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold">
              {topic.title}
            </h2>

            <p>
              <strong>Category:</strong> {topic.category}
            </p>

            <p>
              <strong>Difficulty:</strong> {topic.difficulty}
            </p>

            <p>
              <strong>Status:</strong> {topic.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}