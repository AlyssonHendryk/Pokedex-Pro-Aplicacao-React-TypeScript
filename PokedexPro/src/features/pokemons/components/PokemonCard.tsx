import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <article className="pokemon-card">

            <img
                src={
                    pokemon.sprites.other["official-artwork"].front_default ?? ""
                }
                alt={pokemon.name}
            />

            <span>
                #{pokemon.id.toString().padStart(3, "0")}
            </span>

            <h2>
                {pokemon.name.charAt(0).toUpperCase() +
                    pokemon.name.slice(1)}
            </h2>

            <div>
                {pokemon.types.map(({ type }) => (
                    <span key={type.name}>
                        {type.name}
                    </span>
                ))}
            </div>

        </article>
    );
}