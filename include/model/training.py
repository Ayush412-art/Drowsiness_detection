from ultralytics import YOLO

model = YOLO("yolo11s.yaml")  # Load a pretrained YOLOv11 model
model.train(data = "/home/adityasanyal1996/Drowsiness_detection/datasets/Drowsy_1/data.yaml", epochs = 5)



