import type {
    Pokemon,
    PokemonListResponse,
    PokemonTypeListResponse,
    PokemonTypeResponse,
    PokemonSpecies,
    EvolutionChainResponse
} from "../types/pokemon";


const BASE_URL = "https://pokeapi.co/api/v2";


// Busca um Pokémon pelo nome ou ID
export async function fetchPokemon(
    nameOrId: string | number,
    signal?: AbortSignal
): Promise<Pokemon> {

    const response = await fetch(
        `${BASE_URL}/pokemon/${nameOrId}`,
        { signal }
    );


    if (!response.ok) {

        throw new Error(
            "Pokémon não encontrado"
        );

    }


    return response.json();

}


// Busca a lista de Pokémon
export async function fetchPokemonList(
    limit = 20,
    offset = 0,
    signal?: AbortSignal
): Promise<PokemonListResponse> {

    const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
        { signal }
    );


    if (!response.ok) {

        throw new Error(
            "Erro ao carregar a lista de Pokémon"
        );

    }


    return response.json();

}


// Busca a lista e depois pega os detalhes de cada Pokémon
export async function fetchPokemonListWithDetails(
    limit = 20,
    offset = 0,
    signal?: AbortSignal
): Promise<{
    pokemons: Pokemon[];
    count: number;
}> {

    const list =
        await fetchPokemonList(
            limit,
            offset,
            signal
        );


    const pokemonPromises =
        list.results.map(
            (pokemon) =>
                fetchPokemon(
                    pokemon.name,
                    signal
                )
        );


    const pokemons =
        await Promise.all(
            pokemonPromises
        );


    // Retorna os Pokémon e também
    // a quantidade total da API
    return {
        pokemons,
        count: list.count
    };

}


// Busca todos os tipos disponíveis
export async function fetchPokemonTypes():
    Promise<PokemonTypeListResponse> {

    const response = await fetch(
        `${BASE_URL}/type`
    );


    if (!response.ok) {

        throw new Error(
            "Erro ao carregar os tipos de Pokémon"
        );

    }


    return response.json();

}


// Busca os Pokémon do tipo escolhido
export async function fetchPokemonsByType(
    type: string,
    signal?: AbortSignal
): Promise<Pokemon[]> {

    const response = await fetch(
        `${BASE_URL}/type/${type}`,
        { signal }
    );


    if (!response.ok) {

        throw new Error(
            "Erro ao carregar Pokémon por tipo"
        );

    }


    const data: PokemonTypeResponse =
        await response.json();


    // Limita em 20 para não fazer
    // muitas requisições de uma vez
    const pokemonPromises =
        data.pokemon
            .slice(0, 20)
            .map(
                ({ pokemon }) =>
                    fetchPokemon(
                        pokemon.name,
                        signal
                    )
            );


    return Promise.all(
        pokemonPromises
    );

}


// Busca informações extras da espécie
export async function fetchPokemonSpecies(
    nameOrId: string | number,
    signal?: AbortSignal
): Promise<PokemonSpecies> {

    const response = await fetch(
        `${BASE_URL}/pokemon-species/${nameOrId}`,
        { signal }
    );


    if (!response.ok) {

        throw new Error(
            "Erro ao carregar informações da espécie"
        );

    }


    return response.json();

}


// Busca a cadeia de evolução usando a URL da espécie
export async function fetchEvolutionChain(
    evolutionUrl: string,
    signal?: AbortSignal
): Promise<EvolutionChainResponse> {

    const response = await fetch(
        evolutionUrl,
        { signal }
    );


    if (!response.ok) {

        throw new Error(
            "Erro ao carregar a evolução do Pokémon"
        );

    }


    return response.json();

}