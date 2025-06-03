/*
import React, { useEffect, useRef, useState } from 'react';

const WebcamFeed = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let stream;

    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('❌ Camera access denied or not available.');
        console.error('Error accessing webcam:', err);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <h2>📸 Live Webcam Feed</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ borderRadius: '10px', border: '2px solid #ccc', marginTop: '1rem' }}
      />
    </div>
  );
};

export default WebcamFeed;
*/




/*
import React, { useEffect, useRef, useState } from 'react';
//import axios from 'axios';

const WebcamFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [sketchImage, setSketchImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let stream;

    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('❌ Camera access denied or not available.');
        console.error('Error accessing webcam:', err);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "capture.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prompt", ""); // empty prompt indicates camera capture

      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/stylize/", formData);
        const base64Image = response.data.image_base64;
        setSketchImage(`data:image/png;base64,${base64Image}`);
      } catch (err) {
        console.error("❌ Error sending image:", err);
        setError("Failed to process image.");
      } finally {
        setLoading(false);
      }
    }, "image/png",0.8);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <h2>📸 Live Webcam Feed</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ borderRadius: '10px', border: '2px solid #ccc' }}
      />
      <br />
      <button
        onClick={captureAndSend}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ✨ Capture & Sketch
      </button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {loading && <p>⏳ Processing image...</p>}

      {sketchImage && (
        <div style={{ marginTop: '2rem' }}>
          <h3>🎨 Sketch Result</h3>
          <img
            src={sketchImage}
            alt="Sketch Result"
            style={{ maxWidth: '90%', borderRadius: '10px', border: '2px solid #666' }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;

*/






import React, { useEffect, useRef, useState } from 'react';

const WebcamFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [sketchImage, setSketchImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let stream;

    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('❌ Camera access denied or not available.');
        console.error('Error accessing webcam:', err);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "capture.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prompt", ""); // Prompt left empty for live capture

      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/stylize/", {
          method: "POST",
          body: formData
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setSketchImage(`data:image/png;base64,${data.image_base64}`);
      } catch (err) {
        console.error("❌ Error sending image:", err);
        setError("Failed to process image.");
      } finally {
        setLoading(false);
      }
    }, "image/png", 0.8);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <h2>📸 Live Webcam Feed</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ borderRadius: '10px', border: '2px solid #ccc' }}
      />
      <br />
      <button
        onClick={captureAndSend}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ✨ Capture & Sketch
      </button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {loading && <p>⏳ Processing image...</p>}

      {sketchImage && (
        <div style={{ marginTop: '2rem' }}>
          <h3>🎨 Sketch Result</h3>
          <img
            src={sketchImage}
            alt="Sketch Result"
            style={{ maxWidth: '90%', borderRadius: '10px', border: '2px solid #666' }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;




