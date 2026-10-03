import type { Pokemon } from "../types/pokemon";
import "./PokemonGrid.css";
import {
    PokemonCard
} from "./PokemonCard";


interface PokemonGridProps {
    pokemons: Pokemon[];

    onPokemonClick: (
        pokemon: Pokemon
    ) => void;
}


export function PokemonGrid({
    pokemons,
    onPokemonClick
}: PokemonGridProps) {

    return (

        <section className="pokemon-grid">

            {pokemons.map(
                (pokemon) => (

                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={onPokemonClick}
                    />

                )
            )}

        </section>

    );
}