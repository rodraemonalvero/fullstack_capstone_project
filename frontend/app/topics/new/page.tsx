"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewTopicPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await fetch(
      "http://127.0.0.1:8000/topics",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          difficulty,
          status: "Learning",
        }),
      }
    );

    router.push("/topics");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Create New Topic
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg"
      >
        <input
          className="border p-2 w-full"
          placeholder="Topic Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Difficulty"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Topic
        </button>
      </form>
    </div>
  );
}