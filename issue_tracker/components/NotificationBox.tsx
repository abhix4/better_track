import { CircleArrowOutUpRight } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";


type Notification = {
    id:number,
    title: string;
    repo: string;
    owner: String
    issueId: number
    created_at: String

}

type NotificationBoxProps = {
    notifications: Notification[]
}

export default function NotificationsBox({notifications}:NotificationBoxProps){

    const notificationsData = notifications?.slice().reverse();
    return (
        <div className="w-[98%] mx-auto border rounded-lg  py-4 mt-8">

            {
            notificationsData?.map((notification: Notification, index: number) =>  
                <div className={`flex  py-3 px-4 justify-between items-start ${( notifications.length > 1 && index !== notifications.length - 1) && "border-b"}`} key={notification.id}>
                <div>
                <p className="text-sm">{notification.title}</p>
                <p className="text-xs">{notification.repo}</p>
                </div>
                <a href={`https://github.com/${notification.owner}/${notification.repo}/issues/${notification.issueId}`} target="_blank" rel="noopener noreferrer">
                    <CircleArrowOutUpRight size={14} className="cursor-pointer" />
                </a>
            </div>)
            }
        </div>
    )
}