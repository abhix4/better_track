import { getIssues, getLastIssue } from "./github";
import { getPrisma } from "./db";
import { Context } from "hono";
import { Env } from ".";


// TO CREATE A REPO
export const createRepo = async (c: Context)=> {
    const prisma = getPrisma(c.env.DATABASE_URL!);

    try {
        const { name, owner } = await c.req.json();
        const repoExists = await prisma.repo.findFirst({
            where: { name, owner }
        });

        if (!repoExists) {
            const lastIssue: any = await getLastIssue(name, owner,c.env);
            const repo = await prisma.repo.create({
                data: {
                    name,
                    owner,
                    lastIssueId: lastIssue.id,
                    lastIssueUpdatedAt: lastIssue.lastIssueUpdatedAt
                }
            });
            return c.json({ repo });
        }
        return c.json({ repoExists });
    } catch (error) {
       return c.json({ error: "Internal Server Error" }, 500);
    }
}

// TO GET A REPO
export const getARepo = async (c: Context)=>{
        const prisma = getPrisma(c.env.DATABASE_URL!);

    try {
        const { id } = await c.req.json();
        const repo = await prisma.repo.findFirst({ where: { id } });
        return c.json({ message: 'repo found', repo });
    } catch (error) {
 return c.json({ error: "Internal Server Error" }, 500);
    }
}

// TO GET ALL REPO
export const getAllRepo = async(c: Context)=> {
       const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { username } = await c.req.json();
        const repos = await prisma.user.findUnique({
            where: { username },
            include: { subRepos: true }
        });
        return c.json({ repos: repos?.subRepos });
    } catch (error) {
       return c.json({ error: "Internal Server Error" }, 500);
    }
}

// TO DELETE A REPO 
export const deleteARepo = async(c: Context)=>{
     const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { id } = await c.req.json();
        await prisma.repo.delete({ where: { id } });
        return c.json({ message: 'repo deleted' });
    } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500);
    }
}

// TO SUBSCRIBE A REPO
export const subscribeRepo = async(c: Context) =>{
       const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { name, owner, username } = await c.req.json();
        const repo = await prisma.repo.findFirst({ where: { name, owner } });
        const user = await prisma.user.findFirst({ where: { username } });

        if (repo && user) {
            await prisma.repo.update({
                where: { id: repo.id },
                data: { subscribers: { connect: { username } } }
            });
            return c.json({ message: "subscribed" });
        }
        if (!user) return c.json({ message: "user not found !!" });
        return c.json({ message: "repo not found" });
    } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500);
    }
}

// TO UNSUBSCRIBE A REPO
export const  unsubscribeRepo = async(c: Context) =>{
      const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { name, owner, username } = await c.req.json();
        const repo = await prisma.repo.findFirst({ where: { name, owner } });
        if (repo) {
            await prisma.repo.update({
                where: { id: repo.id },
                data: { subscribers: { disconnect: { username } } }
            });
        }
        return c.json({ message: "unsubscribed" });
    } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500);
    }
}

// GET THE LAST ISSUE ID
export const getLastIssueId = async(name: string, owner: string , env: Env['Bindings']) => {
     const prisma = getPrisma(env.DATABASE_URL!);
    try {
        const repo = await prisma.repo.findFirst({ where: { name, owner } });
        return {
            lastIssueId: repo?.lastIssueId,
            lastIssueUpdatedAt: repo?.lastIssueUpdatedAt
        };
    } catch (error) {
        return { error}
    }
}

// GET DEMO ISSUES
export const getdemoIssues = async (c: Context) => {
        const prisma = getPrisma(c.env.DATABASE_URL!);
    try {
        const { name, owner } = await c.req.json();
        const issues = await getIssues(name, owner, c.env);
        return c.json({ issues });
    } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500);
    }
}
