import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { type Character, type PagedResults } from './types';

export default function useSwapiCharacters() {
  return useQuery<Character[], Error>({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_SWAPI_BASE_URL + 'people/');
      const data = await response.json();

      if ('results' in data) {
        return data as Character[];
      }

      return [] as Character[];
    },
  });
}

export function useInfiniteSwapiCharacters() {
  return useInfiniteQuery<PagedResults<Character[]>, Error>({
    queryKey: ['characters'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(pageParam as string);
      const data = (await response.json()) as PagedResults<Character[]>;
      return data;
    },
    initialPageParam: 'https://swapi.py4e.com/api/people/?page=1',
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
  });
}
