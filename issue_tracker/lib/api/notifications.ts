import axios from 'axios'
import { toast } from 'sonner';
const BASE_URL = "https://bfbb6ed4-test-worker.as8998013.workers.dev";

// get repos subscribed by the user 
export async function getLatestNotifications(username:string,lastNotificationId:number):Promise<any>{
  
    const { data }: any = await axios.post(`${BASE_URL}user/notification/new`, {
        username: username,
        lastNotificationId:lastNotificationId
    });
    return data;
}

export async function getNotifications(username:string):Promise<any>{
   try {
     const {data} = await axios.post(`${BASE_URL}/user/notification`,{
        username:username,
       
    })
    return data;
   } catch (error) {
    toast.error("failed to fetch notifications")
   }
}
