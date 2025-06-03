import cv2
import numpy as np

def apply_ghibli_style(image_bytes: bytes) -> bytes:
    """
    Applies a beautiful anime/Ghibli-style effect to the image using OpenCV.
    Returns stylized image as PNG bytes.
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("❌ Failed to decode image.")

    # Resize to uniform size
    img = cv2.resize(img, (384, 384))

    # Smooth watercolor effect
    smooth = cv2.bilateralFilter(img, 9, sigmaColor=75, sigmaSpace=75)  #7, 100, 100

    # Brightness boost
    bright = cv2.convertScaleAbs(smooth, alpha=1.3, beta=25)

    # Edge sketch
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.medianBlur(gray, 7) #GaussianBlue(5,5),0
    edges = cv2.adaptiveThreshold(blur, 255,
                                   cv2.ADAPTIVE_THRESH_MEAN_C,
                                   cv2.THRESH_BINARY, blockSize=9, C=2)
    edges_colored = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
   # edges = cv2.dilate(edges, np.ones((2, 2), np.uint8))

    # Combine colors with edges
    cartoon = cv2.bitwise_and(bright, edges_colored)


    data = np.float32(smooth).reshape((-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
    k = 8  # number of colors
    _, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    result = center[label.flatten()]
    result = result.reshape(img.shape)

    # Encode image
    success, buffer = cv2.imencode(".png", cartoon)
    if not success:
        raise ValueError("❌ Failed to encode output image.")

    return buffer.tobytes()



