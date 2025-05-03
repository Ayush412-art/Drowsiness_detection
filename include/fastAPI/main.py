from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import base64 # You might need this if sending base64 encoded images
import cv2 # Example for image processing/detection
import numpy as np # Example for image processing/detection
import asyncio # For async operations if needed
from ultralytics import YOLO

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket connection accepted.")
    try:
        while True:
            # Receive data as bytes (assuming binary image data)
            data = await websocket.receive_bytes()
            print(f"Received message with {len(data)} bytes.")

            # --- Image Processing and Detection ---
            try:
                # Example: Decode the image (assuming JPEG or PNG bytes)
                # You might need to use a library like OpenCV or Pillow
                # For OpenCV:
                nparr = np.frombuffer(data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                if img is not None:
                    # Perform your real-time detection on the 'img' frame here
                    # detection_results = perform_detection(img)
                    print("Successfully decoded image frame. Perform detection...")

                    model = YOLO("/home/adityasanyal1996/Drowsiness_detection/runs/detect/train5/weights/best.pt")
                    results = model.predict(img)
                    # Replace with your actual detection logic

                    # Example: Send a response back (e.g., detection results as JSON)
                    # await websocket.send_json({"status": "processed", "detections": detection_results})

                else:
                    print("Could not decode image frame.")
                    # Optionally send an error back
                    # await websocket.send_text("Error: Could not decode image frame")

            except Exception as e:
                print(f"Error during image processing: {e}")
                # Optionally send an error back
                # await websocket.send_text(f"Error processing image: {e}")
            # --- End Image Processing and Detection ---

    except WebSocketDisconnect:
        print("WebSocket connection disconnected.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        # You might want to close the connection gracefully here
        # await websocket.close()


# To run this FastAPI application:
# 1. Save the code as a Python file (e.g., main_ws.py)
# 2. Make sure you have FastAPI, uvicorn, and potentially OpenCV (`pip install fastapi uvicorn python-multipart opencv-python numpy`)
# 3. Run from your terminal: `uvicorn main_ws:app --reload`