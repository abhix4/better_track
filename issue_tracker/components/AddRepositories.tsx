"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"

import {z} from 'zod'
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import RepositoryCard from "./RepositoryCard"
import { useState } from "react"
import { useCreateRepo } from "@/hooks/useRepositories"
  

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    owner:z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
  })
   
interface AddRepositoriesProps{
    username:string
}

export default function AddRepositories({username}:AddRepositoriesProps){
    
    const [name,setName] = useState<string>()
    const [owner,setOwner] = useState<string>()
    const [isRepo , setIsRepo] = useState(false)
    const { mutate, isError, isSuccess, isPending } = useCreateRepo();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          owner:""
        },
    })
     
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setName(values.name)
    setOwner(values.owner)
    mutate({
        name:values.name,
        owner:values.owner,
        username:username
    })

    setIsRepo(true)
    console.log(values)
    }
    
    return (
        <div>
            <Dialog>
            <DialogTrigger className="bg-black text-white rounded-lg px-3 py-1 h-fit cursor-pointer">Create</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add a repository</DialogTitle>
               
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap-2">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>name</FormLabel>
                        <FormControl>
                            <Input placeholder="formbricks" {...field} className="focus:outline-none"/>
                        </FormControl>
                        <FormDescription>
                            This is the repository name
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>owner</FormLabel>
                        <FormControl>
                            <Input placeholder="formbricksHq" {...field} className="focus:outline-none"/>
                        </FormControl>
                        <FormDescription>
                            This is the organisation's name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>
                    <Button type="submit">Search</Button>
                </form>
                </Form>
            
              {
                isPending &&  <div>Loading ...</div>
              }
              {
                isSuccess && <RepositoryCard name={name || ""} owner={owner || ""} username={username}/> 
              }
            </DialogContent>
            </Dialog>

        </div>
    )
}