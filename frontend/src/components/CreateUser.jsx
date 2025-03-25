import { useState } from "react";
import { createObject } from "../services/api";
import "../styles/createUser.scss";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        name: "",
    })

    const [options] = useState({
        role: [
            {"name":"service", "ru_name":"Сервис"},
            {"name":"manager", "ru_name":"Менеджер"},
            {"name":"client", "ru_name":"Клиент"}]
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");

        try {
            await createObject(formData, 'users/');
            setMessage("Пользователь успешно создан");
            setFormData({
                username: "",
                password: "",
                role: "",
                name: "",
            });
        } catch (errorData) {
            if (errorData && typeof errorData === "object") {
                const newErrors = {};
                Object.keys(errorData).forEach((field) => {
                    newErrors[field] = Array.isArray(errorData[field]) ? errorData[field][0] : errorData[field];
                });
                setErrors(newErrors);
            } else if (typeof errorData === "string") {
                setMessage(errorData);
            }
        }
    };

    return (
        <div className="create-user">
            <h2>Создать нового пользователя</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Имя пользователя</td>
                        <td>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                            {errors.username && <span className="error">{errors.username}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Пароль</td>
                        <td>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Полное имя клиента/бизнеса/сервиса</td>
                        <td>
                            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                            {errors.name && <span className="error">{errors.name}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Роль пользователя</td>
                        <td>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="">Выберите роль</option>
                                {options.role.map((role) => (
                                    <option key={role.name} value={role.name}>
                                        {role.ru_name}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className="error">{errors.role}</span>}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">Создать</button>
            </form>
        </div>
    )
}

export default CreateUser;
