import { useEffect, useState } from "react";

import type { Pokemon } from "../types/pokemon";

import {
  fetchPokemon,
  fetchPokemonListWithDetails,
  fetchPokemonsByType
} from "../services/pokemonApi";

import { useDebounce } from "../../../hooks/useDebounce";


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


  const debouncedSearch =
    useDebounce(search, 400);


  useEffect(() => {

    async function loadPokemons() {

      try {

        setLoading(true);
        setError(null);


        // Se tiver uma pesquisa por nome ou ID
        if (debouncedSearch.trim()) {

          const searchValue =
            debouncedSearch
              .trim()
              .toLowerCase();


          const pokemon =
            await fetchPokemon(searchValue);


          setPokemons([pokemon]);

          return;
        }


        // Se tiver um tipo selecionado
        if (type) {

          const data =
            await fetchPokemonsByType(type);


          setPokemons(data);

          return;
        }


        // senão a lista vai carregar normalmente
        const offset =
          (page - 1) * POKEMON_PER_PAGE;


        const data =
          await fetchPokemonListWithDetails(
            POKEMON_PER_PAGE,
            offset
          );


        setPokemons(data);


      } catch (error) {

        console.error(error);

        setPokemons([]);


        if (debouncedSearch.trim()) {

          setError(
            "Nenhum Pokémon encontrado."
          );

        } else {

          setError(
            "Não foi possível carregar os Pokémon."
          );

        }


      } finally {

        setLoading(false);

      }

    }


    loadPokemons();


  }, [page, debouncedSearch, type]);


  function nextPage() {

    setPage(
      (currentPage) =>
        currentPage + 1
    );

  }


  function previousPage() {

    setPage(
      (currentPage) =>
        Math.max(1, currentPage - 1)
    );

  }


  return {
    pokemons,
    loading,
    error,
    page,
    nextPage,
    previousPage
  };

}