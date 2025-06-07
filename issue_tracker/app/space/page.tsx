"use client"

import { login } from "@/lib/api/user"
import { useSession } from "next-auth/react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SpacePage(){
    const { data: session, status } = useSession()
    const username = session?.user?.name
   
    const router = useRouter()
    const path = usePathname()

    const handleLogin = async () => {
        await login(
            username || '',
            session?.user?.email || '',
            session?.user?.image || ''
        )
    }

    useEffect(() => {
       handleLogin()
    },[])
    
    
    
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        redirect("/login");
        return null;
    }

    if(session){
        router.push(`${path}/${username}/repositories`)
    }
}