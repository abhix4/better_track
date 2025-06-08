"use client"
import LandingNav from "@/components/LandingNav";
import Image from "next/image";
import { useRouter } from "next/navigation";


// to be added - 
// next auth 
// tanstack query
export default function Home() {
  const router = useRouter()
  return (
   <div className=" mx-auto flex items-center h-screen justify-center relative">
    <div className="w-[80%] h-screen absolute border-r border-l z-0">

    </div>
    <div className="w-full h-3/4 absolute border-t border-b z-0">

    </div>
    {/* <LandingNav/> */}
    <div className="flex items-center justify-center flex-col gap-10  bg-cover bg-center w-[80%] h-3/4 z-5">
      <Image 
      src="/fire.gif"
      width={40}
      height={40}
      alt="fire" />
      <p className="text-2xl md:text-5xl text-center max-w-[600px]">
      A better way to track your favourite <span className="italic">repositories</span>.
      </p>


      <div className="w-[150px] h-[70px] relative">
      <button
        className="text-black text-lg w-[80%] h-[60%] cursor-pointer mt-8 hover:bg-black/5 z-10 absolute top-3 left-4 transition-all duration-300 ease-in-out"
        onClick={() => router.push('/login')}
      >
        Get Started
      </button>
      <div className=" w-[80%] h-full absolute top-[50%] left-4 border-r border-l z-0 overflow-hidden">

      </div>
        <div className=" w-full h-[60%] absolute left-0  top-[65%]  border-t border-b z-0 overflow-hidden">

      </div>
      </div>
      
    </div>
   </div>
  );
}
