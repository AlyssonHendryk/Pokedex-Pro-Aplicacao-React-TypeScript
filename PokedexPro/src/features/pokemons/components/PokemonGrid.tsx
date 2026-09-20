import type { Pokemon } from "../types/pokemon";
import { PokemonCard } from "./PokemonCard";


interface PokemonGridProps {
  pokemons: Pokemon[];
}


export function PokemonGrid({
  pokemons
}: PokemonGridProps) {

  return (
    <section className="pokemon-grid">

      {pokemons.map((pokemon) => (

        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />

      ))}

    </section>
  );
}