import {
    useEffect,
    useState
} from "react";

import type {
    EvolutionChainLink,
    PokemonEvolutionItem
} from "../types/pokemon";

import {
    fetchEvolutionChain,
    fetchPokemon
} from "../services/pokemonApi";


export function usePokemonEvolution(
    evolutionUrl: string | undefined
) {

    const [evolutions, setEvolutions] =
        useState<PokemonEvolutionItem[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {

        // Sem URL não existe evolução para buscar
        if (!evolutionUrl) {
            return;
        }


        // Depois da verificação sabemos que a URL existe
        const evolutionChainUrl = evolutionUrl;


        const controller =
            new AbortController();

        const signal =
            controller.signal;


        async function loadEvolution() {

            try {

                setLoading(true);

                setError(null);

                setEvolutions([]);


                // Busca a cadeia de evolução
                const data =
                    await fetchEvolutionChain(
                        evolutionChainUrl,
                        signal
                    );


                const evolutionNames: string[] =
                    [];


                // Percorre a cadeia e pega os nomes
                function getEvolutionNames(
                    chain: EvolutionChainLink
                ) {

                    evolutionNames.push(
                        chain.species.name
                    );


                    chain.evolves_to.forEach(
                        (nextEvolution) =>
                            getEvolutionNames(
                                nextEvolution
                            )
                    );

                }


                getEvolutionNames(
                    data.chain
                );


                // Busca os dados de cada evolução
                const pokemonData =
                    await Promise.all(

                        evolutionNames.map(
                            (name) =>
                                fetchPokemon(
                                    name,
                                    signal
                                )
                        )

                    );


                const evolutionItems:
                    PokemonEvolutionItem[] =
                    pokemonData.map(
                        (pokemon) => ({

                            id: pokemon.id,

                            name: pokemon.name,

                            image:
                                pokemon
                                    .sprites
                                    .other[
                                        "official-artwork"
                                    ]
                                    .front_default

                        })
                    );


                setEvolutions(
                    evolutionItems
                );

            } catch (error) {

                // Ignora requisições canceladas
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }


                console.error(error);

                setEvolutions([]);

                setError(
                    "Não foi possível carregar as evoluções."
                );

            } finally {

                if (!signal.aborted) {
                    setLoading(false);
                }

            }

        }


        loadEvolution();


        // Cancela a requisição ao trocar de Pokémon
        return () => {

            controller.abort();

        };

    }, [evolutionUrl]);


    return {
        evolutions,
        loading,
        error
    };

}