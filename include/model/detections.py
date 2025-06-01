from ultralytics import YOLO

model = YOLO("/home/adityasanyal1996/Drowsiness_detection/runs/detect/train21/weights/best.pt")  # Load a pretrained YOLOv11 model
results = model.predict("/home/adityasanyal1996/Drowsiness_detection/include/datasets/Drowsy_1/test/images/69_jpg.rf.e4ece8db1259cb1acce6250869089ad3.jpg")  # Predict on an image

# Process the results to get detected class names
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
        print(f"- {label}")
else:
    print("\nNo objects detected in the image.")