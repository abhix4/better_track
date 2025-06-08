"use client"

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Login(){
    const {data: session } = useSession()
    const router = useRouter()

    if(session){
        redirect('/space')
    }

    if(!session)
    return (
        <div className="flex flex-col md:flex-row w-full h-screen">
            <div className="w-full md:w-2/5 h-1/3 md:h-full border-r border-black/10 flex items-center justify-center p-8">
                <div>
                <h1 className="font-semibold text-3xl">Track your fav repository</h1>
                <p className="">
                Monitor issues for the subscribed ones
                </p>
                </div>
            </div>

            <div className="w-full md:w-3/5  flex items-center justify-center p-8 bg-black/1 h-2/3 md:h-full ">
               


                <div className="border border-black/10 p-12 flex flex-col items-center bg-white">
                <h1 className="text-3xl font-medium ">Sign in</h1>
                <p>Get started now.</p>
                <button className=" cursor-pointer bg-black/6 hover:bg-black/20 text-black  p-3 text-sm mt-4 transition-all duration-300 ease-in-out " onClick={() => signIn("github",{ callbackUrl: "/space" })}>Sign in with GitHub</button>
                </div>
            </div>

        </div>
    )
}