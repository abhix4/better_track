import { getLatestNotifications, getNotifications } from '@/lib/api/notifications';
import { useQuery } from '@tanstack/react-query';


export function useNotifications(username:string) {
  return useQuery<any>({
    queryKey: ['notifications',username],
    queryFn:  () => getNotifications(username),
    staleTime: 1000 * 60 * 5, // 5 mins,
    enabled:!!username
  });
}

export function useLatestNotifications(username:string,lastNotificationId:number) {
    return useQuery<any>({
      queryKey: ['notifications',username],
      queryFn:  () => getLatestNotifications(username,lastNotificationId),
      staleTime: 1000 * 60 * 5, // 5 mins,
      enabled:!!username
    });
}
  