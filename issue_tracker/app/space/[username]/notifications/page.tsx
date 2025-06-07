"use client"
import NotificationsBox from "@/components/NotificationBox";
import { useNotifications } from "@/hooks/useNotifications";
import { usePathname } from "next/navigation";

export default function NotificationsPage(){
    const path = usePathname()
    const segment = path ? path.split('/') : []
    const username = segment[2] || '';
    const {data ,isLoading, isError, isPending} = useNotifications(username)
    console.log(data)
    return (
        <div className="border rounded-lg px-2 py-4  mt-6 h-[80vh] overflow-y-scroll" >
          <div className="w-[98%] m-auto">
            <h1 className="text-2xl  font-semibold">
            Notifications
            </h1>
            <p>Overview of all your notifications.</p>
          </div>
          {
            isLoading ? <p className="text-center text-black/40 text-sm">Loading...</p> :  <NotificationsBox notifications={data} />
          }
         
        </div>
    )
}