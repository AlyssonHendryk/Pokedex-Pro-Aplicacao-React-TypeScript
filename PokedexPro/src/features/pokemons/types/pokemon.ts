export interface Pokemon {
    id: number;
    name: string;

    height: number;
    weight: number;

    sprites: {
        front_default: string | null;

        other: {
            ["official-artwork"]: {
                front_default: string | null;
            };
        };
    };

    types: {
        type: {
            name: string;
        };
    }[];

    abilities: {
        ability: {
            name: string;
        };
    }[];

    stats: {
        base_stat: number;

        stat: {
            name: string;
        };
    }[];
}


export interface PokemonListItem {
    name: string;
    url: string;
}


export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}


export interface PokemonType {
    name: string;
    url: string;
}


export interface PokemonTypeListResponse {
    results: PokemonType[];
}


export interface PokemonTypeResponse {
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        };
    }[];
}


// Informações das descrições que vêm da API
export interface PokemonFlavorText {
    flavor_text: string;

    language: {
        name: string;
        url: string;
    };

    version: {
        name: string;
        url: string;
    };
}


// Informações extras da espécie
export interface PokemonSpecies {
    id: number;
    name: string;

    flavor_text_entries: PokemonFlavorText[];

    evolution_chain: {
        url: string;
    };
}


// Cada etapa da evolução pode ter outras evoluções dentro dela
export interface EvolutionChainLink {
    species: {
        name: string;
        url: string;
    };

    evolves_to: EvolutionChainLink[];
}


// Resposta da cadeia de evolução
export interface EvolutionChainResponse {
    id: number;

    chain: EvolutionChainLink;
}


// Informações que vamos mostrar na tela de evolução
export interface PokemonEvolutionItem {
    id: number;
    name: string;
    image: string | null;
}