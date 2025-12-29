import { useState } from "react";

export default function LessonAI() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/.netlify/functions/generateLesson", {
      method: "POST",
      body: JSON.stringify({
        grade: "6",
        subject: "Giáo dục công dân",
        title: "An toàn giao thông",
        requirement: "Soạn theo hướng phát triển năng lực",
      }),
    });

    const data = await res.json();
    setResult(data.content);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🤖 Soạn bài AI</h1>

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Đang soạn..." : "Soạn bài"}
      </button>

      <pre className="whitespace-pre-wrap mt-4 bg-gray-100 p-4 rounded">
        {result}
      </pre>
    </div>
  );
}
