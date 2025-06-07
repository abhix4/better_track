// hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRepository, getRepositories, subscribeRepository, unsubscribeRepository } from '@/lib/api/repositories';


export function useGetRepos(username:string) {
  return useQuery<any>({
    queryKey: ['repositories',username],
    queryFn:  () => getRepositories(username),
    staleTime: 1000 * 60 * 5, // 5 mins,
    enabled:!!username
  });
}



export function useSubscribeToRepo() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ username, name , owner }: { username: string;  name: string; owner:string }) =>
        subscribeRepository(username, name,owner),
  
      onSuccess: (_, { username, name , owner }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['subscription', username, name, owner] });
        queryClient.invalidateQueries({ queryKey: ['repositories', username] });
      },
    });
}

export function useCreateRepo() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ name, owner}: { name: string; owner: string, username:string }) =>
        createRepository(name, owner),
  
      onSuccess: (_, { username }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['repositories', username] });
      },
    });
}


export function useUnsubscribeToRepo() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ username, name, owner }: { username: string; name: string; owner:string }) =>
        unsubscribeRepository(username, name,owner),
  
      onSuccess: (_, { username, name, owner }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['subscription', username, name , owner] });
        queryClient.invalidateQueries({ queryKey: ['repositories', username] });
      },
    });
}
  