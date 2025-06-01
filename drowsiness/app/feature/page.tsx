"use client"
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
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
  const [status, setStatus] = useState("");

  const router = useRouter();

  const [drowsyCount, setDrowsyCount] = useState(0);
  const [yellowTriggers, setYellowTriggers] = useState(0);
  const [alertLevel, setAlertLevel] = useState<"green" | "yellow" | "red">("green");

  const statusRef = useRef<string[]>([]); 
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
  };

  const ScreenshotsHandler = () => {
    let final_interval: any;
    if (videoStatus && socketRef.current && webcamRef.current) {
      final_interval = setInterval(() => {
        if (webcamRef.current != null) {
          const screen_images = webcamRef.current.getScreenshot();
          if (socketRef.current?.readyState === WebSocket.OPEN && screen_images) {
            const base_data = screen_images.split(",")[1];
            const binaryString = window.atob(base_data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            socketRef.current.send(bytes);
          }
        }
      }, 3000);
    }
    return () => clearInterval(final_interval);
  };

  useEffect(() => {
    const stop = ScreenshotsHandler();
    return () => stop && stop();
  }, [videoStatus]);


 useEffect(() => {
  const interval = setInterval(() => {
    const recentStatuses = statusRef.current.slice(-5);
    const drowsy = recentStatuses.filter((s) => s === "drowsy").length;
    const awake = recentStatuses.filter((s) => s === "awake").length;

    if (drowsy > awake) {
      
      setYellowTriggers((prev) => {
        const newCount = prev + 1;

        if (newCount >= 5) {
          setAlertLevel("red");
          alert("  Drowsiness threshold exceeded!");
        } else {
          setAlertLevel("yellow");

         
          setTimeout(() => {
            setAlertLevel((current) => current === "yellow" ? "green" : current);
          }, 3000);
        }

        return newCount;
      });
    } else {
     
      if (alertLevel !== "red") {
        setAlertLevel("green");
      }
    }
    statusRef.current = [];
  }, 15000);

  return () => clearInterval(interval);
}, []);


  return (
    <>
      <div className="w-full flex justify-around bg-gray-100 border-b-4 h-14 border-solid">
        <div onClick={() => router.push("/map")} className="text-black font-medium hover:scale-110 cursor-pointer px-3">
          <FaMapMarkedAlt size={30} className="text-gray-700" />
          <h2>Map</h2>
        </div>
        <div className="text-black cursor-pointer hover:scale-110 font-medium px-3">
          <FaHistory size={30} className="text-gray-700" />
          <h2>Track</h2>
        </div>
        <div className="text-black cursor-pointer hover:scale-110 font-medium px-3">
          <IoMdHelpCircleOutline size={30} className="text-gray-700" />
          <h2>Help</h2>
        </div>
      </div>

      <section className="w-[80%] mx-auto">
        <div className="flex gap-5 justify-center md:m-3 m-2 text-white">
          <div
            className={`py-3 px-4 rounded-3xl ${
              alertLevel === "red" ? "bg-red-500 animate-pulse" : "bg-red-800"
            }`}
          >
            Danger
          </div>
          <div
            className={`py-3 px-4 rounded-3xl ${
              alertLevel === "yellow" ? "bg-yellow-300 animate-pulse" : "bg-yellow-800"
            }`}
          >
            Warning
          </div>
          <div
            className={`py-3 px-4 rounded-3xl ${
              alertLevel === "green" ? "bg-green-500 animate-pulse" : "bg-green-800"
            }`}
          >
            Normal
          </div>
        </div>

        <div className="mx-auto h-[550px] w-[560px] bg-black grid items-center justify-center gap-y-3 mt-12">
          {videoStatus && (
            <Webcam
              audio={false}
              height={550}
              width={560}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
            />
          )}
        </div>

        <div className="flex justify-center mt-2.5 gap-x-2">
          <button onClick={startCamera} className="py-3 px-4 rounded-3xl bg-red-600">
            Start Camera
          </button>
          <button onClick={stopCamera} className="py-3 px-4 rounded-3xl bg-blue-500">
            Stop Camera
          </button>
        </div>
      </section>
    </>
  );
}

export default Feature;
