'use client';
import About_page from './components/About_page';
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';
import Cards from './components/Cards';
import Pricing_data from './components/Pricing_data';
import Footer from './components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />

   
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 px-4">
        <div className="flex flex-col gap-6">
          <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-black leading-snug">
            Stay Awake, Stay Safe:{' '}
            <span className="text-purple-500">
              Real-Time Drowsiness Detection
            </span>{' '}
            for Smarter Driving
          </p>

          <p className="text-gray-600 font-sans text-sm sm:text-base">
            Drowsiness Detection System is an AI-powered safety solution
            designed to monitor and detect signs of driver fatigue in real-time
            using facial analysis. By tracking eye movement, blinking rate, and
            head position, the system can instantly alert the driver when signs
            of drowsiness are detected—helping prevent accidents caused by
            inattention or microsleep episodes.
          </p>

          <div className="flex justify-start">
            <button
              onClick={() => router.push('/feature')}
              className="cursor-pointer py-3 px-6 bg-purple-500 text-white hover:bg-purple-700 transition duration-200 rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="w-full">
          <img
            src={'bg_png.png'}
            alt="png_img"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>

      
      <About_page />

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90%] mx-auto my-12 px-4">
        <Cards
          title="Eye Tracking"
          description="Advanced algorithms to track eye movements and blinking patterns to detect signs of drowsiness."
        />
        <Cards
          title="Real-time Alerts"
          description="Immediate audio and visual alerts warn drivers when signs of fatigue are detected, helping them stay alert or know when to take a break."
        />
        <Cards
          title="Integration Ready"
          description="Our system can integrate with vehicle systems to automatically adjust temperature, audio, or even engage autonomous safety features."
        />
      </div>

      
      <Pricing_data />

  
      <Footer />
    </>
  );
}
