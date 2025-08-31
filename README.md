
# Drowsiness detection system

Driving is never as easy as it looks, and the same can be said for safety. Majority of the road accidents 
that occur are avoidable, but due to the lack of initiative by the drivers as well as the authorities, we see 
accidents happen on a highly regular basis.So What would be the possible solution?
-> Answer : The Personalized drowiness detection system is a solution on detection the drowsiness of drivers using machine learning and give them the real time alerts about their drosiness levels.
So , This projects provides the real time alerts along with the option to take rest by showing hotels , motels , restaurants as well as medical facilities.

![App Screenshot](https://i.postimg.cc/tRm0hQ2Q/506shots-so.png)


## Project Design

![App Screenshot](https://i.postimg.cc/BndgY9j6/sys.jpg)


## Tech Stack 

**Frontend :** NextJS, React, TailwindCSS , websocket , leaflet.js , Typescript .

**Server :** Node, Express , Fastapi , mongodb , Typescript , jwt auth.

**ML model :** YOLO-11.


![App Screenshot](https://i.postimg.cc/kXyB4krH/Picture1.png )![App Screenshot](https://i.postimg.cc/029yLc60/Picture2.png)


## Features

✅ Feature 1 : Different levels of alerts.

![App Screenshot](https://i.postimg.cc/GpqBKm4x/Screenshot-247.png)

✅ Feature 2 : Live map section.

![App Screenshot](https://i.postimg.cc/DZSqbXxX/Screenshot-244.png)

✅ Feature 3 : Cross platform

![App Screenshot](https://i.postimg.cc/4ybnK4Rc/521shots-so.png)

✅ Feature 4 : Drosiness analysis & history


## Installation

Install assignment with npm

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

```
Frontend Installation
```bash
cd Client
npm install  
npm start     # Runs on http://localhost:3000

```
Backend Installation
```bash
cd backend
npm install
nodemon index.ts  
```
Model Running
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
 
```

## Optimizations

Performed some best optimizations of Reactjs and typescript like useful state management , api handling , sharing accurate co-ordinates in map as live locations of users and fastened response time of alerts to match team expectations.

![App Screenshot](https://i.postimg.cc/L4VqqwLm/Screenshot-251.png)

![App Screenshot](https://i.postimg.cc/vBtmVx10/Screenshot-252.png)


