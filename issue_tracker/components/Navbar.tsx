"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

export default function Navbar(){
    const path = usePathname()
    const router = useRouter()
    const segment = path ? path.split('/') : []
    const username = segment[2] || ''
    const tab = segment[3] || ''



    
    return (
        <div className="flex flex-col gap-4 px-4 pt-2 border rounded-lg mt-6">
           <div className="flex justify-between">
           <Image
           src='/issue.png'
           width={40}
           height={40}
           className="rounded-full overflow-hidden"
           alt="logo"
           />
           <Button onClick={() => signOut()}>Logout</Button>
           </div>
           <div className="flex gap-4">
            <div className={`cursor-pointer transition-all duration-100 ease-in ${tab === 'repositories' && 'border-b-2 border-black'} ` } onClick={ () => router.push(`/space/${username}/repositories`)} >Repositories</div>
            {/* <div className={`cursor-pointer transition-all duration-100 ease-in ${tab === 'subscriptions' && 'border-b-2 border-black'} ` } onClick={ () => router.push(`/space/${username}/subscriptions`)} >Subscriptions</div> */}
            <div className={`cursor-pointer transition-all duration-100 ease-in ${tab === 'notifications' && 'border-b-2  border-black'} ` } onClick={ () => router.push(`/space/${username}/notifications`)} >Notifications</div>
           </div>
        </div>
    )
}