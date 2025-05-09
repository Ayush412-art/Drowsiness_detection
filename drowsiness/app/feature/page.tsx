 "use client"
import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import { useRef } from "react";
const videoConstraints = {
    height : 250,
    width : 260,
    facingMode : 'user'
};
function feature() {
  const [videoStatus , setvideoStatus] = useState(false);
  const  webcamRef = useRef<Webcam | null>(null);
  const socketRef  = useRef<WebSocket | null>(null);

  const startCamera = () =>{
      setvideoStatus(true);

      console.log("Camera started");

      socketRef.current = new WebSocket("ws://localhost:8080");
      
      socketRef.current.onopen = () =>{
        console.log("websocket connected")
      }
      socketRef.current.onmessage = (e) =>{
          console.log("Data received" , e.data)
      }
      socketRef.current.onerror = (err) =>{
          console.log("Error occured : " , err);
      }
      socketRef.current.onclose = () => {
          console.log("socket disconnected ");
      }
  } 

  const stopCamera = () =>{
      setvideoStatus(false);
      // stopping the websocket connection
      if(socketRef.current){
          socketRef.current.close();
          socketRef.current = null;
          console.log("connection stopped!");
      }

  }

  // function for taking screenshots per 4 seconds ! 



  const ScreenshotsHandler = () =>{
      let final_interval : any;
    if(videoStatus && socketRef.current && webcamRef.current){
       
      final_interval = setInterval(() => {

                      if(webcamRef.current != null){
                        const screen_images = webcamRef.current.getScreenshot();

                        if(socketRef.current?.readyState == WebSocket.OPEN && screen_images )
                              socketRef.current.send(screen_images);
                      }

      }, 4000);


    }
    () => clearInterval(final_interval)

  }


  useEffect(()=>{
      ScreenshotsHandler();
  } , [videoStatus])
  

  return (
    <>
    <div  className="w-[80%] mx-auto">
    <div className="mx-auto h-[550px] w-[560px] bg-black grid items-center justify-center gap-y-3 mt-12">
        
         {videoStatus && <Webcam 
          audio = {false}
          height={550}
          width={560}
          ref={webcamRef}
          videoConstraints = {videoConstraints}
          screenshotFormat="image/jpeg"
          />}

    </div>
          <div className="flex justify-center mt-2.5 gap-x-2">
            <button onClick={() => startCamera()} className="py-3 px-4 rounded-3xl bg-red-600 " > start camera</button>
            <button onClick={()=> stopCamera()} className="py-3 px-4 rounded-3xl bg-blue-500 ">stop camera</button>

          </div>

    </div>
    </>
  )
}

export default feature;
