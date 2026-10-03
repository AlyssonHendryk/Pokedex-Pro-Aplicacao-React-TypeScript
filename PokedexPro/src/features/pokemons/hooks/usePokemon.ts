import { useEffect, useState } from "react";

import type { Pokemon } from "../types/pokemon";

import {
    fetchPokemon,
    fetchPokemonListWithDetails,
    fetchPokemonsByType
} from "../services/pokemonApi";

import {
    useDebounce
} from "../../../hooks/useDebounce";


const POKEMON_PER_PAGE = 20;


export function usePokemon(
    search: string,
    type: string
) {

    const [pokemons, setPokemons] =
        useState<Pokemon[]>([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState<string | null>(null);


    const [page, setPage] =
        useState(1);


    // Quantidade total de páginas
    const [totalPages, setTotalPages] =
        useState(1);


    const debouncedSearch =
        useDebounce(search, 400);


    useEffect(() => {

        const controller =
            new AbortController();


        const signal =
            controller.signal;


        async function loadPokemons() {

            try {

                setLoading(true);

                setError(null);


                // Se tiver uma pesquisa
                // por nome ou ID
                if (debouncedSearch.trim()) {

                    const searchValue =
                        debouncedSearch
                            .trim()
                            .toLowerCase();


                    const pokemon =
                        await fetchPokemon(
                            searchValue,
                            signal
                        );


                    setPokemons([
                        pokemon
                    ]);


                    return;

                }


                // Se tiver um tipo selecionado
                if (type) {

                    const data =
                        await fetchPokemonsByType(
                            type,
                            signal
                        );


                    setPokemons(
                        data
                    );


                    return;

                }


                // Calcula o offset
                // usando a página atual
                const offset =
                    (page - 1) *
                    POKEMON_PER_PAGE;


                // Busca os Pokémon e
                // a quantidade total
                const data =
                    await fetchPokemonListWithDetails(
                        POKEMON_PER_PAGE,
                        offset,
                        signal
                    );


                setPokemons(
                    data.pokemons
                );


                // Calcula quantas páginas
                // existem no total
                const pages =
                    Math.ceil(
                        data.count /
                        POKEMON_PER_PAGE
                    );


                setTotalPages(
                    pages
                );


            } catch (error) {

                // Ignora erro causado pelo
                // cancelamento da requisição
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {

                    return;

                }


                console.error(
                    error
                );


                setPokemons([]);


                if (
                    debouncedSearch.trim()
                ) {

                    setError(
                        "Nenhum Pokémon encontrado."
                    );

                } else {

                    setError(
                        "Não foi possível carregar os Pokémon."
                    );

                }


            } finally {

                // Evita alterar o loading
                // de uma requisição cancelada
                if (!signal.aborted) {

                    setLoading(
                        false
                    );

                }

            }

        }


        loadPokemons();


        // Cancela a requisição anterior
        // quando os valores mudarem
        return () => {

            controller.abort();

        };


    }, [
        page,
        debouncedSearch,
        type
    ]);


    // Avança somente se ainda
    // existir uma próxima página
    function nextPage() {

        setPage(
            (currentPage) =>
                Math.min(
                    currentPage + 1,
                    totalPages
                )
        );

    }


    // Volta somente até a página 1
    function previousPage() {

        setPage(
            (currentPage) =>
                Math.max(
                    1,
                    currentPage - 1
                )
        );

    }


    return {

        pokemons,

        loading,

        error,

        page,

        totalPages,

        nextPage,

        previousPage

    };

}