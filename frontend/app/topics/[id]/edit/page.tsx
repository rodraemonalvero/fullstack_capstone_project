"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTopicPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/topics/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setCategory(data.category);
        setDifficulty(data.difficulty);
        setStatus(data.status);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`http://127.0.0.1:8000/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        difficulty,
        status,
      }),
    });

    router.push(`/topics/${id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Edit Topic
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}