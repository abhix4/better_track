
import { Context } from "hono";
import { getPrisma } from "./db";


export async function login(c:Context){
        const prisma = getPrisma(process.env.DATABASE_URL!);
    try {
        const {email,username,image} = await c.req.json();
        const user = await prisma.user.findFirst({
            where:{
                email:email,
                username:username
            }
        })

        if(!user){
            const newUser = await prisma.user.create({
                data:{
                    email:email,
                    username:username,
                    image:image
                }
            })
            return c.json({
                newUser
            })
        }
    } catch (error) {
    return c.json({error})
    }

}

export async function signup(c:Context){
     const prisma = getPrisma(process.env.DATABASE_URL!);
    try {
        const {image , username, email,} = await c.req.json();
        const user = await prisma.user.findFirst({
            where:{
                email:email,             
            }
        })

        if(!user){

            const newUser = await prisma.user.create({
                data:{
                    username:username,
                    email:email,
                    image:image
                }
            })
            return c.json({
                newUser
            })
        }
        return c.json({
            message:"user already exists"
        })
    } catch (error) {
        return c.json({error: error})
    }

}

