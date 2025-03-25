import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from '../services/api';
import '../styles/adminPanel.scss';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'client' });

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await createUser(newUser);
            setNewUser({ username: '', password: '', role: 'client' });
            alert('Пользователь создан');
        } catch (err) {
            alert('Ошибка при создании пользователя');
        }
    };

    return (
        <div className="admin-panel">
            <h2>Админ-панель</h2>
            <div className="user-list">
                <h3>Пользователи</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.username} ({user.role})</li>
                    ))}
                </ul>
            </div>

            <div className="create-user">
                <h3>Создание нового пользователя</h3>
                <form onSubmit={handleCreateUser}>
                    <input
                        type="text"
                        placeholder="Логин"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="client">Клиент</option>
                        <option value="service">Сервисная организация</option>
                        <option value="manager">Менеджер</option>
                    </select>
                    <button type="submit">Создать пользователя</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
