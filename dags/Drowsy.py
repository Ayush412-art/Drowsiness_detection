from airflow.decorators import dag, task
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import base64 # You might need this if sending base64 encoded images
import cv2 # Example for image processing/detection
import numpy as np # Example for image processing/detection 
from ultralytics import YOLO    
from fastapi.middleware.cors import CORSMiddleware



@dag(
    start_date=datetime(2025, 1, 1),
    schedule = None,
    catchup = False,
)
def pipeline():
    @task
    def train_model():

        model = YOLO("yolo11s.yaml")
        model.train(data = "/home/adityasanyal1996/Drowsiness_detection/datasets/Drowsy_1/data.yaml", epochs = 3)
        
    @task
    def convert_to_API():
        

        app = FastAPI()

        app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],  # Replace with your Next.js origin
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

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
        
                                    model = YOLO("/home/adityasanyal1996/Drowsiness_detection/runs/detect/train21/weights/best.pt")
                                    results = model.predict(img)
        
                                    detected_labels = set() # Use a set to store unique labels
        
                                    for result in results:
                                        # result.boxes contains information about detected objects (bounding boxes, classes, confidences)
                                        # Iterate through each detected bounding box
                                        for box in result.boxes:
                                            # box.cls contains the predicted class ID (as a tensor or int)
                                            class_id = int(box.cls)
                                    
                                            # model.names maps class IDs to class names
                                            if class_id in model.names:
                                                label = model.names[class_id]
                                                detected_labels.add(label) # Add the detected label to the set
                                            else:
                                                 print(f"Warning: Detected unknown class ID: {class_id}")
                                    
                                    
                                    # Print the names of the detected classes
                                    if detected_labels:
                                        print("\nDetected object classes:")
                                        # Convert the set to a list and sort for consistent output
                                        for label in sorted(list(detected_labels)):
                                            await websocket.send_text(f"{label}")
        
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

        
    task_1 = train_model()
    task_2 = convert_to_API()
    task_1 >> task_2


pipeline()


