import axios from 'axios'

// Use the same base URL for all requests
const BASE_URL = "https://bfbb6ed4-test-worker.as8998013.workers.dev";

// get repos subscribed by the user 
export async function getRepositories(username: string): Promise<any> {
   try {
     const { data }: any = await axios.post(`${BASE_URL}/repos`, {
        username: username
    },{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false, // set to true only if cookies are needed
  });
    return data;
   } catch (error) {
    console.log(error);
    throw error; // Re-throw so React Query can handle it properly
   }
}

export async function createRepository(name: string, owner: string): Promise<any> {
    const { data } = await axios.post(`${BASE_URL}/repo/create`, {
        name: name,
        owner: owner
    });
    return data;
}

export async function subscribeRepository(username: string, name: string, owner: string): Promise<any> {
    const { data } = await axios.post(`${BASE_URL}/repo/subscribe`, {
        username: username,
        name: name,
        owner: owner
    });
    return data;
}

export async function unsubscribeRepository(username: string, name: string, owner: string): Promise<any> {
    const { data } = await axios.post(`${BASE_URL}/repo/unsubscribe`, {
        username: username,
        name: name,
        owner: owner
    });
    return data;
}