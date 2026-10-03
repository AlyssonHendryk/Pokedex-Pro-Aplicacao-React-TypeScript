import {
    useEffect,
    useState
} from "react";

import Header from "./components/layout/header/logo";

import { SearchInput } from "./features/pokemons/components/SearchInput";
import { PokemonGrid } from "./features/pokemons/components/PokemonGrid";
import { Pagination } from "./features/pokemons/components/Pagination";
import { PokemonTypeFilter } from "./features/pokemons/components/PokemonTypeFilter";
import { PokemonDetails } from "./features/pokemons/components/PokemonDetails";

import { usePokemon } from "./features/pokemons/hooks/usePokemon";

import type { Pokemon } from "./features/pokemons/types/pokemon";

import "./App.css";


export default function App() {

    const [search, setSearch] =
        useState("");

    const [selectedType, setSelectedType] =
        useState("");


    const [selectedPokemon, setSelectedPokemon] =
        useState<Pokemon | null>(null);

    const [darkMode, setDarkMode] =
        useState(() => {

            const savedTheme =
                localStorage.getItem(
                    "pokedex-theme"
                );

            return savedTheme === "dark";

        });


    const {
        pokemons,
        loading,
        error,
        page,
        totalPages,
        nextPage,
        previousPage
    } = usePokemon(
        search,
        selectedType
    );


    // Salva o tema escolhido
    useEffect(() => {

        localStorage.setItem(
            "pokedex-theme",
            darkMode
                ? "dark"
                : "light"
        );

    }, [darkMode]);


    // Troca entre tema claro e escuro
    function toggleTheme() {

        setDarkMode(
            (currentTheme) =>
                !currentTheme
        );

    }


    // Se algum Pokémon foi selecionado,
    // mostra os detalhes
    if (selectedPokemon) {

        return (

            <div
                className={
                    darkMode
                        ? "main dark"
                        : "main"
                }
            >

                <Header
                    darkMode={darkMode}
                    onToggleTheme={toggleTheme}
                />


                <main className="pokemon-details-page">

                    <PokemonDetails
                        pokemon={selectedPokemon}
                        onBack={() =>
                            setSelectedPokemon(null)
                        }
                    />

                </main>

            </div>

        );

    }

    return (

        <div
            className={
                darkMode
                    ? "main dark"
                    : "main"
            }
        >

            <Header
                darkMode={darkMode}
                onToggleTheme={toggleTheme}
            />


            <main>

                <div className="search-container">

                    <SearchInput
                        value={search}
                        onChange={setSearch}
                    />

                    <PokemonTypeFilter
                        value={selectedType}
                        onChange={setSelectedType}
                    />

                </div>

                {loading && (

                    <p>
                        Carregando Pokémon...
                    </p>

                )}


                {/* Mostra algum erro da API */}

                {error && (

                    <p>
                        {error}
                    </p>

                )}


                {/* Mostra quando não existem resultados */}

                {!loading &&
                    !error &&
                    pokemons.length === 0 && (

                        <p>
                            Nenhum Pokémon encontrado.
                        </p>

                    )}


                {/* Mostra os cards */}

                {!loading &&
                    !error &&
                    pokemons.length > 0 && (

                        <PokemonGrid
                            pokemons={pokemons}
                            onPokemonClick={
                                setSelectedPokemon
                            }
                        />

                    )}


                {!loading &&
                    !error &&
                    pokemons.length > 0 &&
                    !search.trim() &&
                    !selectedType && (

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPrevious={previousPage}
                            onNext={nextPage}
                        />

                    )}

            </main>

        </div>

    );

}