"use client"

import AddRepositories from "@/components/AddRepositories";
import RepositoriesTable from "@/components/RepositoriesTable";
import { useGetRepos } from "@/hooks/useRepositories";
import { usePathname } from "next/navigation";

export default function RepositoriesPage(){
    const path = usePathname()
    const segment = path ? path.split('/') : []
    const username = segment[2] || '';


    const {data, isError , isLoading, isSuccess} = useGetRepos(username)
    console.log(data?.repos)

    return (
        <div  className="border rounded-lg  py-4 mt-6">
         
           <div className="flex justify-between mb-10 w-[96%] mx-auto ">
            <div>
            <h1 className="text-2xl font-semibold">
            Repositories
            </h1>
            <p>Overview of all subscribed your repositories.</p>
            </div>
            <AddRepositories username={username}/>
           </div>

            {isLoading ? <p className="text-center text-black/40 text-sm">Loading...</p> :
            <div className="w-[96%] mx-auto">
                <RepositoriesTable repos={data?.repos} username={username}/>
            </div>
            }
        </div>
    )
}