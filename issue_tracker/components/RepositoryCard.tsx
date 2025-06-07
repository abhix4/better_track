import { useSubscribeToRepo } from "@/hooks/useRepositories";
import { Button } from "./ui/button";


interface RepositoryCardProps {
    name:string,
    owner:string
    username:string
}

export default function RepositoryCard({name,owner,username}:RepositoryCardProps){

    const {mutate,isSuccess,isPending,isError} = useSubscribeToRepo()

    const handleAddition = () =>{
        mutate({
            name:name,
            owner:owner,
            username:username
        })
    }

    return (
        <div className="border rounded-lg border-black/15 px-2 py-3 flex justify-between items-center">
            <h1>{owner}/{name}</h1>
            <Button className="cursor-pointer" onClick={handleAddition}>Add</Button>
        </div>
    )
}