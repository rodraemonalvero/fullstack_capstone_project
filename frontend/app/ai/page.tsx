"use client";

import { useState } from "react";

export default function AIPage() {
  const [topicId, setTopicId] = useState("1");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExplain() {
    setLoading(true);
    setResponse("");

    const res = await fetch("http://127.0.0.1:8000/ai/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_id: Number(topicId),
        question,
      }),
    });

    const data = await res.json();

    setResponse(data.ai_response);
    setLoading(false);
  }

  async function handleQuiz() {
    setLoading(true);
    setResponse("");

    const res = await fetch("http://127.0.0.1:8000/ai/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_id: Number(topicId),
      }),
    });

    const data = await res.json();

    setResponse(data.quiz);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        AI Cyber Coach
      </h1>

      <div className="space-y-4 max-w-2xl">
        <input
          className="border p-2 w-full"
          placeholder="Topic ID"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          rows={4}
          placeholder="Ask a cybersecurity question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={handleExplain}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Ask Claude
          </button>

          <button
            onClick={handleQuiz}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Generate Quiz
          </button>
        </div>

        {loading && <p>Claude is thinking...</p>}

        {response && (
          <div className="border rounded p-4 whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}