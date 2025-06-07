import {  Hono } from 'hono'
import { Octokit } from "octokit";
import { getLastIssueId } from "./repo";
import { Env } from '.';




export const getIssues = async (name:string,owner:string,env: Env['Bindings'] ) => {
    const octokit = new Octokit({
    auth: env.GITHUB_TOKEN
})


    try {
        const lastIssue: any = await getLastIssueId(name,owner,env)
        console.log("lastIssue in the repo :",lastIssue)

        const res = await octokit.request('GET /repos/{owner}/{repo}/issues',{
            owner: owner,
            repo: name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
            sort: 'created',
            direction: 'desc',
           })
        
        const issues = res.data.filter((issue:any) => !issue.pull_request)
        // console.log(issues)
        const newIssues = []
        console.log("real last issue id:",issues[0].id)
            
        if (issues.length > 0) {
            const lastUpdated = new Date(lastIssue?.lastIssueUpdatedAt);
            console.log("inside loop ",lastUpdated)
            for (const issue of issues) {
                const created = new Date(issue.created_at);
                console.log("created_at", created)
                if (created > lastUpdated) {
                    newIssues.push(issue);
                } else {
                    break; // assuming issues are sorted newest -> oldest
                }
            }
        }
        
        console.log("got the new issues", newIssues)
        // console.log(newIssues)
        return newIssues;

    } catch (error) {
        return error;
    }
   
}

export const getRepo=  async (name:string, owner:string,env: Env['Bindings']) => {
    const octokit = new Octokit({
    auth: env.GITHUB_TOKEN
})


   try {
        const res = await octokit.request('GET /repos/{owner}/{repo}',{
            owner: owner,
            repo: name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
           })
        
        const repo = res.data;
        return repo;
    } catch (error) {
        return error;
    }
   
}

export const getLastIssue =  async (name:string, owner:string,env: Env['Bindings']) => {
    const octokit = new Octokit({
    auth: env.GITHUB_TOKEN
})


  try {
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues',{
            owner: owner,
            repo: name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
           })
        
        const issues = res.data.filter((issue:any) => !issue.pull_request)
 
        const id = issues[0].id.toString();
        const lastIssueUpdatedAt = issues[0].updated_at
        return {
            id,
            lastIssueUpdatedAt
        };

    } catch (error) {
        return error;
    }
}

