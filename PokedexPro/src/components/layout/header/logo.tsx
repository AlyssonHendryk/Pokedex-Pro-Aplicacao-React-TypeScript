import logoImg from "../../../assets/pokedexlogo.png";

import "./logo.css";


interface HeaderProps {
    darkMode: boolean;
    onToggleTheme: () => void;
}


function Header({
    darkMode,
    onToggleTheme
}: HeaderProps) {

    return (

        <header className="main-header">

            <img
                src={logoImg}
                alt="Pokédex"
                className="header-logo"
            />


            {/* Botão para trocar o tema */}
            <button
                className="theme-button"
                type="button"
                onClick={onToggleTheme}
                aria-label={
                    darkMode
                        ? "Ativar modo claro"
                        : "Ativar modo escuro"
                }
                title={
                    darkMode
                        ? "Modo claro"
                        : "Modo escuro"
                }
            >

                {darkMode ? "☀️" : "🌙"}

            </button>

        </header>

    );

}


export default Header;