import type {
    Pokemon
} from "../types/pokemon";

import {
    usePokemonSpecies
} from "../hooks/usePokemonSpecies";

import {
    PokemonEvolution
} from "./PokemonEvolution";

import {
    getTypeColor
} from "../../../utils/typeColors";

import "./PokemonDetails.css";


interface PokemonDetailsProps {
    pokemon: Pokemon;
    onBack: () => void;
}


export function PokemonDetails({
    pokemon,
    onBack
}: PokemonDetailsProps) {

    // Busca as informações extras da espécie
    const {
        species,
        loading: speciesLoading,
        error: speciesError
    } = usePokemonSpecies(pokemon.id);


    // Procura o valor de um status específico
    const getStat = (statName: string) => {

        return (
            pokemon.stats.find(
                ({ stat }) =>
                    stat.name === statName
            )?.base_stat ?? 0
        );

    };


    // Calcula o tamanho da barra do status
    const getStatPercentage = (
        statName: string
    ) => {

        const value = getStat(statName);

        return Math.min(
            (value / 150) * 100,
            100
        );

    };


    // Pega a imagem oficial do Pokémon
    const image =
        pokemon.sprites.other[
            "official-artwork"
        ].front_default;


    // Pega o primeiro tipo do Pokémon
    const primaryType =
        pokemon.types[0]?.type.name ?? "normal";


    // Cor principal baseada no tipo
    const primaryColor =
        getTypeColor(primaryType);


    // Pega a descrição em inglês
    const description =
        species?.flavor_text_entries
            .find(
                (entry) =>
                    entry.language.name === "en"
            )
            ?.flavor_text
            .replace(/\f/g, " ")
            .replace(/\n/g, " ");


    return (

        <section className="pokemon-details">


            {/* Botão para voltar para a lista */}

            <button
                className="pokemon-details-back"
                type="button"
                onClick={onBack}
                aria-label="Voltar para a lista de Pokémon"
            >
                ←
            </button>


            {/* Card com as informações principais */}

            <div
                className="pokemon-details-card"
                style={{
                    backgroundColor: primaryColor
                }}
            >


                {/* Imagem do Pokémon */}

                <div className="pokemon-details-image">

                    {image && (

                        <img
                            src={image}
                            alt={pokemon.name}
                        />

                    )}

                </div>


                {/* Informações do Pokémon */}

                <div className="pokemon-details-data">


                    {/* Número da Pokédex */}

                    <span className="pokemon-details-number">

                        #
                        {pokemon.id
                            .toString()
                            .padStart(3, "0")}

                    </span>


                    {/* Nome */}

                    <h1>
                        {pokemon.name}
                    </h1>


                    {/* Tipos */}

                    <div className="pokemon-details-types">

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


                    {/* Descrição */}

                    <div className="pokemon-details-description">

                        {speciesLoading && (

                            <p>
                                Carregando descrição...
                            </p>

                        )}


                        {!speciesLoading &&
                            !speciesError &&
                            description && (

                                <p>
                                    {description}
                                </p>

                            )}


                        {!speciesLoading &&
                            !speciesError &&
                            !description && (

                                <p>
                                    Descrição indisponível.
                                </p>

                            )}


                        {speciesError && (

                            <p>
                                Descrição indisponível.
                            </p>

                        )}

                    </div>


                    {/* Altura e peso */}

                    <div className="pokemon-details-measures">

                        <div>

                            <span>
                                Height
                            </span>

                            <strong>
                                {pokemon.height / 10}m
                            </strong>

                        </div>


                        <div>

                            <span>
                                Weight
                            </span>

                            <strong>
                                {pokemon.weight / 10}kg
                            </strong>

                        </div>

                    </div>


                    {/* Status */}

                    <div className="pokemon-details-stats">

                        <h2>
                            Stats
                        </h2>


                        <div className="stats-list">


                            {/* HP */}

                            <div className="stat-item">

                                <div className="stat-info">
                                    <strong>HP</strong>

                                    <span>
                                        {getStat("hp")}
                                    </span>
                                </div>

                                <div className="stat-bar">

                                    <div
                                        className="stat-bar-fill"
                                        style={{
                                            width:
                                                `${getStatPercentage("hp")}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Attack */}

                            <div className="stat-item">

                                <div className="stat-info">
                                    <strong>ATK</strong>

                                    <span>
                                        {getStat("attack")}
                                    </span>
                                </div>

                                <div className="stat-bar">

                                    <div
                                        className="stat-bar-fill"
                                        style={{
                                            width:
                                                `${getStatPercentage("attack")}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Defense */}

                            <div className="stat-item">

                                <div className="stat-info">
                                    <strong>DEF</strong>

                                    <span>
                                        {getStat("defense")}
                                    </span>
                                </div>

                                <div className="stat-bar">

                                    <div
                                        className="stat-bar-fill"
                                        style={{
                                            width:
                                                `${getStatPercentage("defense")}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Speed */}

                            <div className="stat-item">

                                <div className="stat-info">
                                    <strong>SPD</strong>

                                    <span>
                                        {getStat("speed")}
                                    </span>
                                </div>

                                <div className="stat-bar">

                                    <div
                                        className="stat-bar-fill"
                                        style={{
                                            width:
                                                `${getStatPercentage("speed")}%`
                                        }}
                                    />

                                </div>

                            </div>


                        </div>

                    </div>


                    {/* Habilidades */}

                    <div className="pokemon-details-abilities">

                        <h2>
                            Abilities
                        </h2>


                        <div className="abilities-list">

                            {pokemon.abilities.map(
                                ({ ability }) => (

                                    <span
                                        key={ability.name}
                                    >
                                        {ability.name}
                                    </span>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* Evoluções */}

            {species?.evolution_chain.url && (

                <PokemonEvolution
                    evolutionUrl={
                        species.evolution_chain.url
                    }
                />

            )}


        </section>

    );

}