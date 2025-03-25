import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from '../services/api';
import { useAuth } from '../services/authContext';
import '../styles/login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            if (data.key) {
                localStorage.setItem('token', data.key);
                const userData = await getCurrentUser();
                setUser(userData.length ? userData[0] : null);
                navigate('/');
            } else {
                setError('Ошибка авторизации');
            }
        } catch (err) {
            console.error('Ошибка авторизации:', err);
            setError('Ошибка авторизации');
        }
    };

    return (
        <div className="login-container">
            <h2>Авторизация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
