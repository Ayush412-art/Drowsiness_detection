 "use client"
import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";


const videoConstraints = {
    height : 250,
    width : 260,
    facingMode : 'user'
};
function feature() {
  const [videoStatus , setvideoStatus] = useState(false);
  const  webcamRef = useRef<Webcam | null>(null);
  const socketRef  = useRef<WebSocket | null>(null);
  const [drowsyCount  , setDrowsyCount] = useState(0);
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

      }, 1000);


    }
    () => clearInterval(final_interval)

  }
  // function that contains logic of different alerts!!
  const Alert_handler = () =>{
       
        if(status === "drowsy"){
            setDrowsyCount((prev : number) : any => {
              let current  = prev + 1;
              
              if(current > 5 && current < 10){
                alert("drowsiness detected")
              }
              else if(current > 10){
                alert("red alert !!")
                current = 0;
              }
              else {}
                return current;
        })
      }
        else {
            setDrowsyCount(0);
      }
      

  }


  useEffect(()=>{
      ScreenshotsHandler();
  } , [videoStatus])

  useEffect(() => {
      Alert_handler();
  } , [status])
  

  return (
    <>
    <div className="w-full flex justify-around bg-gray-100 border-b-4 h-14 border-solid">
            <div className="text-black font-medium hover:scale-110 cursor-pointer px-3">
                <FaMapMarkedAlt size={30} className="text-gray-700" />
                <h2>Map</h2>
            </div>

             <div className="text-black cursor-pointer hover:scale-110 font-medium px-3">
                < FaHistory size={30} className="text-gray-700  " />
                <h2>Track</h2>
            </div>

             <div className="text-black cursor-pointer hover:scale-110  font-medium  px-3">
                <IoMdHelpCircleOutline size={30} className="text-gray-700" />
                <h2>Help</h2>
            </div>
    </div>


    <section  className="w-[80%] mx-auto">
      <div className="flex gap-5 justify-center md:m-3 m-2 text-white">
            <div className="bg-red-700 py-3 px-4 rounded-3xl hover:bg-red-500 hover:scale-105 ">Danger</div>
            <div className="bg-yellow-700 py-3 px-4 rounded-3xl">Warning</div>
            <div className="bg-green-700 py-3 px-4 rounded-3xl">Normal</div>
      </div>

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

    
    </section>
    </>
  )
}

export default feature;
