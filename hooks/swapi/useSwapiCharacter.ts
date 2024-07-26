import { useQuery } from '@tanstack/react-query';
import { Character } from './types';

export default function useSwapiCharacter(id: string) {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_SWAPI_BASE_URL + 'people/' + id);
      const data = await response.json();
      return data as Character;
    },
  });
}
