"use client"
import RepositoriesTable from "@/components/RepositoriesTable";

export default function SubscriptionsPage(){
    return (
        <div  className="border rounded-lg px-2 py-4  mt-6">
         
        <div className="w-[98%] mx-auto">
        <h1 className="text-2xl font-semibold">
        Subscriptions
        </h1>
        <p className="mb-8">Overview of all your subscriptions.</p>
        </div>
   

        <div className="w-[98%] mx-auto">
            {/* <RepositoriesTable/> */}
        </div>

    </div>
    )
}