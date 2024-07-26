import { useQuery } from '@tanstack/react-query';
import { Character } from './types';

export default function useSwapiCharacters() {
  return useQuery<Character[], Error>({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_SWAPI_BASE_URL + 'people/');
      const data = await response.json();

      if ('results' in data) {
        return data.results as Character[];
      }

      return [] as Character[];
    },
  });
}
