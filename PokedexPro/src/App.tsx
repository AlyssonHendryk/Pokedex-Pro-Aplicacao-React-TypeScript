import { useState } from "react";

import Header from "./components/layout/header/logo";
import { SearchInput } from "./features/pokemons/components/SearchInput";
import { PokemonGrid } from "./features/pokemons/components/PokemonGrid";
import { Pagination } from "./features/pokemons/components/Pagination";
import { PokemonTypeFilter } from "./features/pokemons/components/PokemonTypeFilter";

import { usePokemon } from "./features/pokemons/hooks/usePokemon";

import "./App.css";


export default function App() {

    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const {
        pokemons,
        loading,
        error,
        page,
        nextPage,
        previousPage
    } = usePokemon(search, selectedType);


    return (

        <div className="main">

            <Header />

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
                    <p>Carregando Pokémon...</p>
                )}


                {error && (
                    <p>{error}</p>
                )}


                {!loading && !error && (

                    <PokemonGrid
                        pokemons={pokemons}
                    />

                )}


                {!loading &&
                    !error &&
                    !search.trim() &&
                    !selectedType && (

                        <Pagination
                            page={page}
                            onPrevious={previousPage}
                            onNext={nextPage}
                        />

                    )}

            </main>

        </div>

    );
}