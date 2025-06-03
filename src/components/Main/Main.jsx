import React, { useContext, useRef, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import WebCamFeed from "../WebCamFeed";
import PdfSummarizer from "../PdfSummarizer";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat,
    handleMicInput,
    setUploadedImage,
    styledImageUrl,
    handlePdfFile,
  } = useContext(Context);

  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [sketchTriggered, setSketchTriggered] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPdfSummary, setShowPdfSummary] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);

  // SECTION: Trigger sketch/image-style transformation
  useEffect(() => {
    if (
      imageFile &&
      input.toLowerCase().includes("sketch") &&
      !sketchTriggered &&
      !loading &&
      typeof onSent === "function"
    ) {
      onSent(input);
      setSketchTriggered(true);
    }
  }, [imageFile, input, sketchTriggered, loading, onSent]);

  // SECTION: Image file upload (Gallery icon)

  const handleGalleryClick = () => {
    if (!input.trim()) {
      alert("Please enter a prompt first (e.g., 'Convert to sketch style')");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setUploadedImage?.(file);
      setSketchTriggered(false);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSendClick = () => {
    if (!input.trim() && !imageFile) {
      alert("Type a prompt or upload an image to continue.");
      return;
    }
    onSent?.(input.trim());
    setSketchTriggered(true);
  };

  const handleWebcamToggle = () => {
    setShowWebcam((prev) => !prev);
  };

  const handlePdfSummarizer = () => {
    pdfInputRef.current?.click();
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedPdf(file);
      setShowPdfSummary(true);
      handlePdfFile?.(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // SECTION: Drag & Drop PDF support
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedPdf(file);
      setShowPdfSummary(true);
      handlePdfFile?.(file);
    } else {
      alert("Please drop a valid PDF file.");
    }
  };

  const promptCards = [
    {
      text: "Suggest beautiful places to see on an upcoming road trip",
      icon: assets.compass_icon,
    },
    {
      text: "Briefly summarize this topic: urban planning",
      icon: assets.bulb_icon,
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: assets.message_icon,
    },
    {
      text: "Improve the readability of the following code",
      icon: assets.code_icon,
    },
  ];

  return (
    <div className="main" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="nav">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt="User Icon"
          onClick={newChat}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="main-container">
        {showWebcam ? (
          <WebCamFeed closeWebcam={() => setShowWebcam(false)} />
        ) : !showResult && !styledImageUrl ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {promptCards.map((c, i) => (
                <div className="card" key={i} onClick={() => setInput(c.text)}>
                  <p>{c.text}</p>
                  <img src={c.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : styledImageUrl ? (
          <div className="styled-image-result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <img
                  src={styledImageUrl}
                  alt="Stylized Result"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </div>
          </div>
        ) : showPdfSummary && uploadedPdf ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>PDF Summary</p>
            </div>
            <div className="result-data">
              <img src={assets.document_icon} alt="PDF Icon" />
              <PdfSummarizer pdfFile={uploadedPdf} />
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder={
                imageFile
                  ? "Prompt (e.g., convert to sketch style)"
                  : "Enter a prompt here"
              }
              disabled={loading}
            />

            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              {/* Hidden Inputs */}
              <input
                type="file"
                accept="application/pdf"
                ref={pdfInputRef}
                style={{ display: "none" }}
                onChange={handlePdfUpload}
              />
              {/* Action Icons */}
              <img
                src={assets.document_icon}
                alt="Upload PDF"
                onClick={handlePdfSummarizer}
              />
              <img
                src={assets.gallery_icon}
                alt="Upload from Gallery"
                onClick={handleGalleryClick}
              />
              <img
                src={assets.camera_icon}
                alt="Open Webcam"
                onClick={handleWebcamToggle}
              />
              <img
                src={assets.mic_icon}
                alt="Voice Input"
                onClick={handleMicInput}
              />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSendClick}
              />
            </div>
          </div>

          {loading && <p className="response-text">⏳ Generating response…</p>}
          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check its responses.
          </p>

          {showPdfSummary && uploadedPdf && (
            <PdfSummarizer pdfFile={uploadedPdf} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
