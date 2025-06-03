
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import PyPDF2 
import io
from transformers import pipeline
import numpy as np
import cv2
import base64

app = FastAPI()

# Enable CORS for frontend access (development only — replace "*" with your domain in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Hugging Face summarizer model
summarizer = pipeline("summarization", model="Falconsai/text_summarization")
#sshleifer/distilbart-cnn-12-6
#Falconsai/text_summarization
# ----- Image Stylization -----
def pencil_sketch_filled(image_bytes: bytes) -> bytes:
    """Apply a bold, stylized pencil sketch effect to an image."""
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("❌ Image decoding failed.")

    img = cv2.resize(img, (384, 384))

    # Convert to grayscale and apply sketch transformation
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    inverted = 255 - gray
    blurred = cv2.GaussianBlur(inverted, (21, 21), 0)
    sketch = cv2.divide(gray, 255 - blurred, scale=256)

    # Add edges and boldness
    edges = cv2.Canny(gray, 50, 150)
    edges = cv2.dilate(edges, np.ones((2, 2), np.uint8), iterations=1)

    # Add soft shading
    shading = cv2.bilateralFilter(gray, 7, 50, 50)
    shading = cv2.medianBlur(shading, 7)
    shading = cv2.equalizeHist(shading)

    # Combine sketch and edges
    sketch_final = cv2.subtract(shading, edges)
    sketch_final = cv2.normalize(sketch_final, None, 0, 255, cv2.NORM_MINMAX)
    sketch_bgr = cv2.cvtColor(sketch_final, cv2.COLOR_GRAY2BGR)

    # Encode result to PNG format
    success, buffer = cv2.imencode(".png", sketch_bgr)
    if not success:
        raise ValueError("❌ Failed to encode sketch image.")

    return buffer.tobytes()

@app.post("/stylize/")
async def stylize(file: UploadFile = File(...), prompt: str = Form("")):
    """
    Accepts an uploaded image and returns a stylized sketch as a base64 string.
    Prompt is not currently used but kept for future enhancements (e.g., Ghibli-style keyword filtering).
    """
    try:
        contents = await file.read()
        stylized_image = pencil_sketch_filled(contents)
        base64_image = base64.b64encode(stylized_image).decode("utf-8")

        return JSONResponse(
            content={
                "success": True,
                "image_base64": base64_image,
                "message": "✅ Image stylized successfully!"
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": f"❌ Failed to process image: {str(e)}"
            }
        )
    
# ----- PDF Summarization -----
@app.post("/summarize-pdf/")
async def summarize_pdf(file: UploadFile = File(...)):
    """
    Summarizes the content of a PDF file using a Hugging Face transformer model.
    """
    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""

        if not text.strip():
            return JSONResponse(status_code=400, content={"success": False, "error": "Empty or unreadable PDF."})
        
# Chunk and summarize
        chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
        summaries = [summarizer(chunk, max_length=100, min_length=30, do_sample=False)[0]["summary_text"] for chunk in chunks]

        return JSONResponse(content={
            "success": True,
            "summary": " ".join(summaries)
        })

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": f"❌ Failed to summarize PDF: {str(e)}"}
        )