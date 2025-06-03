import React, { useState, useContext } from "react";
import { Context } from "../context/Context";

const PdfSummarizer = () => {
  const { setFileUploaded, setResult } = useContext(Context);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hideBackground, setHideBackground] = useState(false); // ✅ New state to hide background

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("⚠️ No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("❌ Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setSummary("");
      setFileUploaded(true);

      const res = await fetch("http://localhost:8000/summarize-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch summary.");
      }

      const data = await res.json();

      if (data.success && data.summary) {
        setSummary(data.summary);
        setResult(data.summary);
        setHideBackground(true); // ✅ Hide background on success
      } else {
        setError("⚠️ Failed to summarize the PDF. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Error uploading or processing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-summarizer">
      <h2>📄 Upload PDF for Summarization</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="pdf-input"
        style={{ marginBottom: "1rem" }}
      />

      {loading && <p>⏳ Summarizing PDF, please wait...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && (
        <div className="chat-container">
          <div className="message user">
            <h3>📝 Summary:</h3>
          </div>
          <div
            className="message bot"
            style={{
              whiteSpace: "pre-wrap",
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            <p>{summary}</p>
          </div>
        </div>
      )}

      {/* Conditional class for hiding background */}
      {hideBackground && (
        <style>
          {`
            .greet,
            .cards,
            .search-box,
            .bottom-info {
              display: none !important
            }
          `}
        </style>
      )}
    </div>
  );
};

export default PdfSummarizer;
