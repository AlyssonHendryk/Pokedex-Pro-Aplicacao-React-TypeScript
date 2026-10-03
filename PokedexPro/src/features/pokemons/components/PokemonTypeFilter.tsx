import { useEffect, useState } from "react";
import "./PokemonTypeFilter.css";
import type { PokemonType } from "../types/pokemon";

import {
  fetchPokemonTypes
} from "../services/pokemonApi";


interface PokemonTypeFilterProps {
  value: string;
  onChange: (type: string) => void;
}


export function PokemonTypeFilter({
  value,
  onChange
}: PokemonTypeFilterProps) {

  const [types, setTypes] =
    useState<PokemonType[]>([]);


  useEffect(() => {

    async function loadTypes() {

      try {

        const data =
          await fetchPokemonTypes();


        // Remove tipos que não são usados no filtro
        const filteredTypes =
          data.results.filter(
            (type) =>
              type.name !== "unknown" &&
              type.name !== "shadow"
          );


        setTypes(filteredTypes);

      } catch (error) {

        console.error(
          "Erro ao carregar tipos:",
          error
        );

      }

    }


    loadTypes();

  }, []);


  return (

    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    >

      <option value="">
        Todos os tipos
      </option>


      {types.map((type) => (

        <option
          key={type.name}
          value={type.name}
        >

          {type.name}

        </option>

      ))}

    </select>

  );

}