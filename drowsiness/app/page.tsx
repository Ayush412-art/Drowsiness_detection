
'use client'
import About_page from "./components/About_page";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import Cards from "./components/Cards";
export default function Home() {

  const router = useRouter();
  return (
    <>
    <Navbar />
    <div className="max-w-[80%] grid grid-cols-2 items-center gap-x-2  mx-auto">

          <div className="flex-col" >

              <p className="text-5xl font-sans font-medium text-black   ">
              Stay Awake, Stay Safe: <span className="text-purple-500">Real-Time Drowsiness Detection</span> for Smarter Driving
              </p>

              <p className="text-gray-600 mt-3.5 font-sans">
              Drowsiness Detection System is an AI-powered safety solution designed to monitor and detect signs of driver fatigue in real-time using facial analysis.
               By tracking eye movement, blinking rate, and head position, the system can instantly alert the driver when signs of drowsiness are detected—helping prevent accidents caused by inattention or microsleep episodes.
              </p>

            { /* started button   */ }

              <div className="flex justify-center mt-4">
              <button onClick={()=>router.push("/feature")} className=" cursor-pointer py-3 px-4 items-center bg-purple-400 rounded-3xl">Get started</button>

              </div>
          </div>
          <div>
            <img  src={"bg_png.png"} alt="png_img"></img>
          </div>
    </div>
          <About_page />

          <div className="grid grid-cols-3 max-w-[80%] mx-auto m-12">
          <Cards  title="Eye tracking" description="advance algorithms to track eye movements and blinking patterns to detect signs of drowsiness."/>
          <Cards  title="Real-time Alerts" description="Immediate audio and visual alerts warn 
          drivers when signs of fatique are detected , helping them stay alert or know when to take a break"/>
          <Cards  title="Integration Ready" description="Our system can integrate with vehicle 
          systems to automatically adjust temperture , audio , or even engage autonomous safety features"/>
          </div>
    </>
  );
}
