import axios from 'axios'

export async function login(username:string,email:string,image:string){
    const {data} = await axios.post("https://c6b73fb1-test-worker.as8998013.workers.dev/login",{
        username:username,
        email:email,
        image:image
    })
    return data;
}

export async function deleteUser(username:string){
    const {data} = await axios.post('https://c6b73fb1-test-worker.as8998013.workers.dev/user/delete',{
        username:username
    })
}