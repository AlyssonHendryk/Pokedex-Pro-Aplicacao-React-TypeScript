import logoImg from '../../../assets/pokedexlogo.png';

function Header() {
  return (
    <header className="main-header" style={{ display: 'flex', padding: '10px 20px', height: '61px', width: 'auto', objectFit: 'contain' }}>
      <img src={logoImg} alt="site logotype" className="header-logo" style={{ cursor: 'pointer' }} />
      <div className='centralized-container' style={{ display: 'flex', padding: '136px 270px', height: '140px', width: 'auto', objectFit: 'contain', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logoImg} alt="site main image" className='main-logo' />
      </div>
    </header>
  );
}

export default Header;
