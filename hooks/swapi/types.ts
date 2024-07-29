export interface PagedResults<T> {
  count: number;
  next?: string;
  previous: string;
  results: T[];
}

export interface Resource {
  url: string;
  id: string;
  created: string;
  edited: string;
}

export interface Character extends Resource {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
}
