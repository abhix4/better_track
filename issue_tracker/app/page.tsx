"use client"
import LandingNav from "@/components/LandingNav";
import { useRouter } from "next/navigation";


// to be added - 
// next auth 
// tanstack query
export default function Home() {
  const router = useRouter()
  return (
   <div className="max-w-[1000px] mx-auto flex items-center h-screen">
    {/* <LandingNav/> */}
    <div className="flex items-center justify-center flex-col gap-10 bg-[url('/gradii.png')] bg-cover bg-center w-full h-4/5 rounded-2xl">
      <p className="text-5xl text-center">
      A better way to track your favourite repositories.
      </p>

      <button
      className="bg-black text-white text-lg rounded-4xl px-4 py-2 cursor-pointer"
      onClick={() => router.push('/login')}
      >
      Get Started
      </button>
    </div>
   </div>
  );
}
