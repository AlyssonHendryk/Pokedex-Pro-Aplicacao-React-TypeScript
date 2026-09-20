import type {
  Pokemon,
  PokemonListResponse,
  PokemonTypeListResponse,
  PokemonTypeResponse
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemon(
  nameOrId: string | number
): Promise<Pokemon> {

  const response = await fetch(
    `${BASE_URL}/pokemon/${nameOrId}`
  );

  if (!response.ok) {
    throw new Error("Pokémon não encontrado");
  }

  return response.json();
}


export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {

  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar a lista de Pokémon");
  }

  return response.json();
}


export async function fetchPokemonListWithDetails(
  limit = 20,
  offset = 0
): Promise<Pokemon[]> {

  const list = await fetchPokemonList(limit, offset);

  const pokemonPromises = list.results.map((pokemon) =>
    fetchPokemon(pokemon.name)
  );

  return Promise.all(pokemonPromises);
}


 // Busca todos os tipos disponíveis na PokeAPI.

export async function fetchPokemonTypes(): Promise<PokemonTypeListResponse> {
  const response = await fetch(
    `${BASE_URL}/type`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar os tipos de Pokémon");
  }

  return response.json();
}



 // Busca os Pokémon pertencentes a determinado tipo.

export async function fetchPokemonsByType(
  type: string
): Promise<Pokemon[]> {

  const response = await fetch(
    `${BASE_URL}/type/${type}`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar Pokémon por tipo");
  }

  const data: PokemonTypeResponse =
    await response.json();


  const pokemonPromises = data.pokemon
    .slice(0, 20)
    .map(({ pokemon }) =>
      fetchPokemon(pokemon.name)
    );


  return Promise.all(pokemonPromises);
}