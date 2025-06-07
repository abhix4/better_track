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
        <div className="flex w-full h-screen">
            <div className="w-2/5 border-r border-black/10 flex items-center justify-center p-8">
                <div>
                <h1 className="font-semibold text-3xl">Open Source Monitoring Service</h1>
                <p className="">
                Monitor your website or API and create your own status page within a couple of minutes. Want to know how it works?
                </p>
                </div>
            </div>

            <div className="w-3/5  flex items-center justify-center p-8 ">
                <div className="border border-black/10 rounded-lg p-12 flex flex-col items-center ">
                <h1 className="text-3xl font-medium ">sign in</h1>
                <p>Get started now.</p>
                <button className=" cursor-pointer bg-black text-white p-3 rounded-lg mt-4" onClick={() => signIn("github",{ callbackUrl: "/space" })}>Sign in with GitHub</button>
                </div>
            </div>

        </div>
    )
}