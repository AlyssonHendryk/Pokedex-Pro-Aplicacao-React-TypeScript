import { useEffect, useState } from "react";

import type {
  PokemonSpecies
} from "../types/pokemon";

import {
  fetchPokemonSpecies
} from "../services/pokemonApi";


export function usePokemonSpecies(
  pokemonId: number
) {

  const [species, setSpecies] =
    useState<PokemonSpecies | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  useEffect(() => {

    // Controla o cancelamento da requisição
    const controller =
      new AbortController();

    const signal =
      controller.signal;


    async function loadSpecies() {

      try {

        setLoading(true);
        setError(null);
        setSpecies(null);


        const data =
          await fetchPokemonSpecies(
            pokemonId,
            signal
          );


        setSpecies(data);


      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }


        console.error(error);

        setSpecies(null);

        setError(
          "Não foi possível carregar a descrição."
        );


      } finally {
        if (!signal.aborted) {

          setLoading(false);

        }

      }

    }


    loadSpecies();

    return () => {

      controller.abort();

    };


  }, [pokemonId]);


  return {
    species,
    loading,
    error
  };

}