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
  const [counter , setCounter] = useState(0);
  const [status , Setstatus] = useState("")

  const startCamera = () =>{
      setvideoStatus(true);

      console.log("Camera started");

      socketRef.current = new WebSocket("ws://localhost:8000/ws");
      
      socketRef.current.onopen = () =>{
        console.log("websocket connected")
      }
      socketRef.current.onmessage = async(e) =>{
        try{
          const jsonData = JSON.parse(e.data);
          console.log("Received data : " , jsonData.value);
          Setstatus(jsonData.value);
        }
        catch(err){
          console.log("error occured : " , err)
        }
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

  // function for taking screenshots per second ! 
  const ScreenshotsHandler = () =>{
      let final_interval : any;
    if(videoStatus && socketRef.current && webcamRef.current){
       
      final_interval = setInterval(() => {

                      if(webcamRef.current != null){
                        const screen_images = webcamRef.current.getScreenshot();

                        if(socketRef.current?.readyState == WebSocket.OPEN && screen_images ){

                          const base_data =  screen_images.split(',')[1]; 
                          const binaryString = window.atob(base_data);
                          const len = binaryString.length;
                          const bytes = new Uint8Array(len)

                            for (let i = 0; i < len; i++) {
                              bytes[i] = binaryString.charCodeAt(i);
                            }

                          socketRef.current.send(bytes);
                        }

                      }

      }, 5000);


    }
    () => clearInterval(final_interval)

  }
  // function that contains logic of different alerts!!
  const Alert_handler = () =>{
        let count = 0;
        let yellowAlertCount = 0;
        if(status === "drowsy")
          count = count + 1;

        if(count > 5){
          alert("Yellow alert");
          yellowAlertCount = yellowAlertCount + 1
        }
        console.log(yellowAlertCount);

  }


  useEffect(()=>{
      ScreenshotsHandler();
  } , [videoStatus])

  useEffect(() => {
      Alert_handler();
  } , [status])
  

  return (
    <>
    <div className="w-full bg-gray-300 h-12 "></div>

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
