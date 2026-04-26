"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  async function analyze() {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    setResult("🔍 Analysiere...");

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial", textAlign: "center" }}>
      <h1>📦 Reselling AI</h1>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={analyze}>Analysieren</button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}
