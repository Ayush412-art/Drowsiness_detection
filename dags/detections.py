from ultralytics import YOLO

model = YOLO("/home/adityasanyal1996/Drowsiness_detection/runs/detect/train5/weights/best.pt")  # Load a pretrained YOLOv11 model
results = model(0, show =True) 

for result in results:
    boxes = result.boxes  # get boxes
    classes = result.names