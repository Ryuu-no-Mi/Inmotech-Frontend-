function HeaderCompoent() {
    return (
        <header className="header"> 
            <h1 className="header__title">Inmotech</h1>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><a href="#home">Home</a></li>
                    <li className="header__nav-item"><a href="#about">About</a></li>
                    <li className="header__nav-item"><a href="#contact">Contact</a></li>
                </ul>   
            </nav>
        </header>
    );
    
}

export default HeaderCompoent;