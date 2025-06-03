import { createContext, useState, useEffect, useRef } from "react";
import runGemini from "../config/gemini"; // Adjust the path as needed

export const Context = createContext();

let recognition = null;
if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";
}

export const ContextProvider = ({ children }) => {
  // ------------------ STATE ------------------
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  // ✅ Ghibli image stylization related states
  const [uploadedImage, setUploadedImage] = useState(null); // File object
  const [styledImageUrl, setStyledImageUrl] = useState(""); // Base64 URL for frontend
  const [imagePrompt, setImagePrompt] = useState(""); // Prompt like "Ghibli style"

  const [fileUploaded, setFileUploaded] = useState(false); // Optional flag
  const [result, setResult] = useState(null); // Optional result

  const isRecognizingRef = useRef(false); // Ref for mic tracking

  // ------------------ NEW CHAT ------------------
  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setResultData("");
    setStyledImageUrl("");
    setUploadedImage(null);
    setImagePrompt("");
    setShowResult(false);
    setLoading(false);
  };

  // ------------------ MIC INPUT ------------------
  const handleMicInput = () => {
    if (!recognition) {
      alert("❌ Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecognizingRef.current) {
      recognition.stop();
      return;
    }

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      alert("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("❌ Speech recognition error: " + event.error);
      isRecognizingRef.current = false;
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
    };

    recognition.start();
  };

  // ------------------ HANDLE TEXT PROMPT ------------------
  const onSent = async (promptText) => {
    const prompt = promptText || input.trim();

    // ✅ Edge case: if user enters nothing
    if (!prompt && !uploadedImage) {
      alert("⚠️ Please enter a prompt or upload an image.");
      return;
    }

    // If image uploaded, store prompt and skip Gemini call
    if (uploadedImage) {
      setImagePrompt(prompt);
      setInput("");
      return;
    }

    try {
      setLoading(true);
      setShowResult(true);
      setResultData("");
      setStyledImageUrl("");

      const response = await runGemini(prompt);

      const formatted = response
        .split("**")
        .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .replace(/\*/g, "<br/>");

      setRecentPrompt(prompt);
      setPrevPrompts((prev) =>
        prev.includes(prompt) ? prev : [prompt, ...prev]
      );
      setResultData(formatted);
      setInput("");
    } catch (err) {
      console.error("Error running Gemini:", err);
      alert("❌ Error processing prompt.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ USE EFFECT: Stylize Image ------------------
  useEffect(() => {
    const stylizeImage = async () => {
      if (!uploadedImage || !imagePrompt.trim()) return;

      try {
        setLoading(true);
        setShowResult(true);
        setResultData("");
        setStyledImageUrl("");

        const formData = new FormData();
        formData.append("file", uploadedImage);
        formData.append("prompt", imagePrompt);

        // ✅ BACKEND: Make sure this endpoint exists in FastAPI
        const res = await fetch("http://localhost:8000/stylize/", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Stylize API failed.");

        const data = await res.json();

        if (data.image_base64) {
          const base64 = `data:image/png;base64,${data.image_base64}`;
          setStyledImageUrl(base64);
          console.log("✅ Stylized image received.");
        } else {
          throw new Error("Invalid response from backend.");
        }
      } catch (err) {
        console.error("Stylization error:", err);
        alert("❌ Failed to stylize image.");
      } finally {
        setUploadedImage(null); // reset image
        setImagePrompt(""); // reset prompt
        setLoading(false);
      }
    };

    stylizeImage();
  }, [uploadedImage, imagePrompt]);

  // ------------------ CONTEXT VALUE ------------------
  return (
    <Context.Provider
      value={{
        input,
        setInput,
        onSent,
        handleMicInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        loading,
        resultData,
        newChat,
        // ✅ Ghibli Image Stylization
        uploadedImage,
        setUploadedImage,
        styledImageUrl,
        setStyledImageUrl,
        imagePrompt,
        setImagePrompt,

        // Optional extras
        fileUploaded,
        setFileUploaded,
        result,
        setResult,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
