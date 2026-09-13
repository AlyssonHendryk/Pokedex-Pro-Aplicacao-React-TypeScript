import pokeball from '../../../assets/pokeball-icon.png'

function PokeballIcon() {
    return (
        <div className="background-image">
        <img src={pokeball} style={{display: 'flex'}}/>
        </div>
    )
}

export default PokeballIcon()