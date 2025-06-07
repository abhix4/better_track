import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { useUnsubscribeToRepo } from "@/hooks/useRepositories"


interface Repositories{
    id:number,
    name:string,
    owner:string,
    lastIssueId:string,
    lastIssueUpdatedAt:string
}

interface RepositoriesTableProps{
    repos: Repositories[],
    username:string
}


export default function RepositoriesTable({repos,username}:RepositoriesTableProps){

    const {mutate, isError,isPending} = useUnsubscribeToRepo()

    const toDate = (issueDate:string) => {
        const date = new Date(issueDate)
        return date;
    }

    return (
        <div>
            <Table>
            <TableCaption>Thats all 🎉</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="text-left">Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last issue id</TableHead>
                <TableHead className="text-right">Last updated at</TableHead>
                <TableHead className="text-right"></TableHead>
                
                </TableRow>
            </TableHeader>

            <TableBody>
            {
                repos?.map((repo:Repositories) =>   <TableRow key={repo.id}>
                <TableCell className="font-medium text-left">{repo.name}</TableCell>
                <TableCell>{repo.owner}</TableCell>
                <TableCell className="">{repo.lastIssueId}</TableCell>
                <TableCell className="text-right">{toDate(repo.lastIssueUpdatedAt).toLocaleDateString()}</TableCell>
                
                <DropdownMenu>
                <TableCell className="text-right cursor-pointer"><DropdownMenuTrigger><EllipsisVertical size={12}/></DropdownMenuTrigger></TableCell>       
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => mutate({owner:repo.owner,name:repo.name,username:username})}>Unsubscribe</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                </TableRow>)
            }

            </TableBody>
            
            </Table>

        </div>
    )
}