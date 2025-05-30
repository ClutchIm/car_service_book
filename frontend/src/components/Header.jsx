import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import avatar from '../assets/avatar.jpg';
import logoBlue from '../assets/logoBlue.png';
import logoRed from '../assets/logoRed.png';
import '../styles/header.scss';

const Header = ({ onLogout }) => {
    const { user } = useAuth();
    const [logo, setLogo] = React.useState(logoBlue);

    return (
        <header className="header">
            <div className="header__container">
                <Link
                    to="/"
                    className="header__logo"
                    onMouseEnter={() => setLogo(logoRed)}
                    onMouseLeave={() => setLogo(logoBlue)}
                >
                    <img src={logo} alt="Силант"/>
                </Link>

                <nav className="header__nav">
                    <Link to="/" className="header__nav-link">ГЛАВНАЯ</Link>
                    <Link to="/manage" className="header__nav-link">ЗАПИСЬ</Link>
                </nav>

                <div className="header__info">
                    <span className="header__contact">+7-8352-20-12-09, telegram</span>
                    {user ? (
                        <div className="header__user">
                            <div className="header__profile">
                                <span className="header__name">{user.name}</span>
                                <img className="header__avatar" src={avatar} alt="Аватар"/>
                            </div>
                            <button className="header__auth-button" onClick={onLogout}>
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="header__auth-button">Авторизация</Link>
                    )}
                </div>
            </div>
            <h1 className="header__title">Электронная сервисная книжка "Мой Силант"</h1>
        </header>
    );
};

export default Header;