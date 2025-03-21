import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export const pokeApi = {
  getPokemons: async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
  },

  getPokemonById: async (id: number): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },

  getPokemonByName: async (name: string): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  },
  getTypes: async (): Promise<TypeListResponse> => {
    const response = await axios.get(`${BASE_URL}/type`);
    return response.data;
  },
}; 