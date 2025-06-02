"use client";

import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkedAlt, FaHistory } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

const videoConstraints = {
  height: 250,
  width: 260,
  facingMode: "user",
};

function Feature() {
  const [videoStatus, setVideoStatus] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const statusRef = useRef<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const [status, setStatus] = useState("");
  const [yellowTriggers, setYellowTriggers] = useState(0);
  const [alertLevel, setAlertLevel] = useState<"green" | "yellow" | "red">("green");
  const [hasAlerted, setHasAlerted] = useState(false);

  const startCamera = () => {
    setVideoStatus(true);
    console.log("Camera started");

    socketRef.current = new WebSocket("ws://localhost:8000/ws");

    socketRef.current.onopen = () => {
      console.log("websocket connected");
    };

    socketRef.current.onmessage = async (e) => {
      try {
        const jsonData = JSON.parse(e.data);
        const receivedStatus = jsonData.value;
        console.log("status:", receivedStatus);
        setStatus(receivedStatus);
        statusRef.current.push(receivedStatus);
      } catch (err) {
        console.log("error occurred:", err);
      }
    };

    socketRef.current.onerror = (err) => {
      console.log("Error occurred:", err);
    };

    socketRef.current.onclose = () => {
      console.log("socket disconnected");
    };
  };

  const stopCamera = () => {
    setVideoStatus(false);

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log("connection stopped!");
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }

<<<<<<< HEAD

=======
    // Reset
>>>>>>> 952c746 (changed the page.tsx as well as the detections script)
    statusRef.current = [];
    setYellowTriggers(0);
    setAlertLevel("green");
    setHasAlerted(false);
  };

  useEffect(() => {
    if (videoStatus && socketRef.current && webcamRef.current) {
      intervalRef.current = setInterval(() => {
        if (webcamRef.current != null) {
          const screenshot = webcamRef.current.getScreenshot();
          if (socketRef.current?.readyState === WebSocket.OPEN && screenshot) {
            const baseData = screenshot.split(",")[1];
            const binaryString = window.atob(baseData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            socketRef.current.send(bytes);
          }
        }
      }, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [videoStatus]);
<<<<<<< HEAD
useEffect(() => {
  if (!videoStatus) return;
=======
      }, 1000);



=======

 useEffect(() => {
   //if (!videoStatus) return;
>>>>>>> 952c746 (changed the page.tsx as well as the detections script)
  const interval = setInterval(() => {
    const recentStatuses = statusRef.current.slice(-5);
    const drowsy = recentStatuses.filter((s) => s === "drowsy").length;
    const awake = recentStatuses.filter((s) => s === "awake").length;

<<<<<<< HEAD
    if (drowsy >= 2 || drowsy >= awake) {
      if (yellowTriggers >= 5) {
        if (!hasAlerted) {
          setAlertLevel("red");
          setHasAlerted(true);

          const strongBuzzer = new Audio('/sound1.mp3');
          strongBuzzer.play();
          alert("Drowsiness threshold exceeded! RED ALERT!");

         
          setTimeout(() => {
            setHasAlerted(false);
            setYellowTriggers(0); 
          }, 5000);
        }
      } else {
        setAlertLevel("yellow");
        setYellowTriggers((prev) => prev + 1);
        const softBuzzer = new Audio("/sound2.mp3");
        softBuzzer.play();

        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        alertTimeoutRef.current = setTimeout(() => {
          if (alertLevel === "yellow") {
            setAlertLevel("green");
          }
=======
    if (drowsy >= 3 || drowsy >= awake) {
      if (!hasAlerted) {
        setAlertLevel("red");
        alert("Drowsiness threshold exceeded!");
        setHasAlerted(true);
      } else {
        setAlertLevel("yellow");

        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        alertTimeoutRef.current = setTimeout(() => {
          setAlertLevel((current) => (current === "yellow" ? "green" : current));
>>>>>>> 952c746 (changed the page.tsx as well as the detections script)
        }, 1500);
      }
    } else {
      if (alertLevel !== "red") {
        setAlertLevel("green");
        setYellowTriggers(0);
        setHasAlerted(false); // reset red alert eligibility
      }
    }

    statusRef.current = [];
<<<<<<< HEAD
  }, 5000);

  return () => clearInterval(interval);
}, [videoStatus, yellowTriggers, hasAlerted, alertLevel]);



  return (
  <>
    <div className="w-full flex justify-around items-center bg-gray-100 border-b-4 h-16 border-solid flex-wrap md:flex-nowrap">
      <div
        onClick={() => router.push("/map")}
        className="text-black font-medium hover:scale-110 cursor-pointer px-3 flex flex-col items-center"
      >
        <FaMapMarkedAlt size={24} className="text-gray-700" />
        <h2 className="text-sm">Map</h2>
      </div>
      <div className="text-black cursor-pointer hover:scale-110 font-medium px-3 flex flex-col items-center">
        <FaHistory size={24} className="text-gray-700" />
        <h2 className="text-sm">Track</h2>
      </div>
      <div className="text-black cursor-pointer hover:scale-110 font-medium px-3 flex flex-col items-center">
        <IoMdHelpCircleOutline size={24} className="text-gray-700" />
        <h2 className="text-sm">Help</h2>
      </div>
    </div>

   
    <section className="w-[90%] mx-auto">
     
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-white">
        <div
          className={`py-2 px-4 rounded-3xl text-sm sm:text-base ${
            alertLevel === "red" ? "bg-red-500 animate-pulse" : "bg-red-800"
          }`}
        >
          Danger
=======
  }, 2000);

  return () => clearInterval(interval);
}, [alertLevel, hasAlerted]);


  return (
    <>
      <div className="w-full flex justify-around bg-gray-100 border-b-4 h-14 border-solid">
        <div
          onClick={() => router.push("/map")}
          className="text-black font-medium hover:scale-110 cursor-pointer px-3"
        >
          <FaMapMarkedAlt size={30} className="text-gray-700" />
          <h2>Map</h2>
>>>>>>> 952c746 (changed the page.tsx as well as the detections script)
        </div>
        <div
          className={`py-2 px-4 rounded-3xl text-sm sm:text-base ${
            alertLevel === "yellow" ? "bg-yellow-300 animate-pulse" : "bg-yellow-800"
          }`}
        >
          Warning
        </div>
        <div
          className={`py-2 px-4 rounded-3xl text-sm sm:text-base ${
            alertLevel === "green" ? "bg-green-500 animate-pulse" : "bg-green-800"
          }`}
        >
          Normal
        </div>
      </div>

     
      <div className="mx-auto mt-8 w-full max-w-[90%] sm:max-w-md md:max-w-lg bg-black rounded-xl overflow-hidden">
        {videoStatus && (
          <Webcam
            audio={false}
            className="w-full h-auto"
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
          />
        )}
      </div>

      
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={startCamera}
          disabled={videoStatus}
          className={`py-2 px-5 rounded-3xl text-white ${
            videoStatus ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Start Camera
        </button>
        <button
          onClick={stopCamera}
          disabled={!videoStatus}
          className={`py-2 px-5 rounded-3xl text-white ${
            !videoStatus ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Stop Camera
        </button>
      </div>
    </section>
  </>
);

<<<<<<< HEAD
=======
        <div className="flex justify-center mt-2.5 gap-x-2">
          <button
            onClick={startCamera}
            disabled={videoStatus}
            className={`py-3 px-4 rounded-3xl ${
              videoStatus ? "bg-red-300 cursor-not-allowed" : "bg-red-600"
            }`}
          >
            Start Camera
          </button>
          <button
            onClick={stopCamera}
            disabled={!videoStatus}
            className={`py-3 px-4 rounded-3xl ${
              !videoStatus ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
            }`}
          >
            Stop Camera
          </button>
        </div>
      </section>
    </>
  );
>>>>>>> 952c746 (changed the page.tsx as well as the detections script)
}

export default Feature;