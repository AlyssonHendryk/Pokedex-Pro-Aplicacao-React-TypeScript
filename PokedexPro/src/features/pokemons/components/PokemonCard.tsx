import type { Pokemon } from "../types/pokemon";

import {
    getTypeColor
} from "../../../utils/typeColors";

import "./PokemonCard.css";


interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}


export function PokemonCard({
    pokemon,
    onClick
}: PokemonCardProps) {

    // Pega a imagem oficial do Pokémon
    const image =
        pokemon.sprites.other[
            "official-artwork"
        ].front_default;


    return (

        <article
            className="pokemon-card"
            onClick={() => onClick(pokemon)}
        >

            {image && (

                <img
                    src={image}
                    alt={pokemon.name}
                    loading="lazy"
                />

            )}


            <span>
                #
                {pokemon.id
                    .toString()
                    .padStart(3, "0")}
            </span>


            <h2>
                {pokemon.name}
            </h2>


            <div className="pokemon-card-types">

                {pokemon.types.map(
                    ({ type }) => (

                        <span
                            key={type.name}
                            style={{
                                backgroundColor:
                                    getTypeColor(
                                        type.name
                                    )
                            }}
                        >
                            {type.name}
                        </span>

                    )
                )}

            </div>

        </article>

    );

}