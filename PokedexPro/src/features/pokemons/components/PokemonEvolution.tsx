import {
    usePokemonEvolution
} from "../hooks/usePokemonEvolution";

import "./PokemonEvolution.css";
interface PokemonEvolutionProps {
    evolutionUrl: string;
}


export function PokemonEvolution({
    evolutionUrl
}: PokemonEvolutionProps) {

    const {
        evolutions,
        loading,
        error
    } = usePokemonEvolution(evolutionUrl);


    if (loading) {

        return (

            <section className="pokemon-evolution">

                <h2>
                    Evolution
                </h2>

                <p>
                    Carregando evoluções...
                </p>

            </section>

        );

    }


    if (error) {

        return (

            <section className="pokemon-evolution">

                <h2>
                    Evolution
                </h2>

                <p>
                    Evolução indisponível.
                </p>

            </section>

        );

    }


    if (evolutions.length === 0) {
        return null;
    }


    return (

        <section className="pokemon-evolution">

            <h2>
                Evolution
            </h2>


            <div className="pokemon-evolution-list">

                {evolutions.map(
                    (evolution, index) => (

                        <div
                            className="pokemon-evolution-step"
                            key={evolution.id}
                        >

                            <div className="pokemon-evolution-pokemon">

                                {evolution.image && (

                                    <img
                                        src={evolution.image}
                                        alt={evolution.name}
                                        loading="lazy"
                                    />

                                )}

                                <span>
                                    {evolution.name}
                                </span>

                            </div>


                            {index <
                                evolutions.length - 1 && (

                                <span
                                    className="pokemon-evolution-arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>

                            )}

                        </div>

                    )
                )}

            </div>

        </section>

    );

}