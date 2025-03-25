import { useState, useEffect } from "react";
import { createObject, updateObject, deleteObject, fetchObjects } from "../services/api";
import "../styles/createCatalog.scss";

const CreateCatalog = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [options, setOptions] = useState({ endpoint: "" });
    const [objects, setObjects] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const endpoints_dict = {
        "service-company": "Сервисная компания",
        "maintenance-type": "Вид ТО",
        "failed-component": "Узел отказа",
        "recovery-method": "Способ восстановления",
        "equipment": "Модель техники",
        "engine": "Модель двигателя",
        "transmission": "Модель трансмиссии",
        "drive-axle": "Модель ведущего моста",
        "steering-axle": "Модель управляемого моста",
    };

    useEffect(() => {
        if (options.endpoint) {
            fetchObjects(`${options.endpoint}/`).then(setObjects).catch(() => setObjects([]));
        }
    }, [options.endpoint]);

    const handleEndpointChange = (key) => {
        setOptions({ endpoint: key });
        setSelectedId(null);
        setFormData({ name: "", description: "" });
    };

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
            if (selectedId) {
                await updateObject(formData, `${options.endpoint}/${selectedId}/`);
                setMessage(`${endpoints_dict[options.endpoint]} успешно обновлена`);
            } else {
                await createObject(formData, `${options.endpoint}/`);
                setMessage(`${endpoints_dict[options.endpoint]} успешно создана`);
            }
            setFormData({ name: "", description: "" });
            fetchObjects(`${options.endpoint}/`).then(setObjects);
        } catch (errorData) {
            setErrors(errorData || {});
        }
    };

    const handleEdit = (obj) => {
        setSelectedId(obj.id);
        setFormData({ name: obj.name, description: obj.description });
    };

    const handleDelete = async (id) => {
        try {
            await deleteObject(`${options.endpoint}/${id}/`);
            setMessage("Объект удален");
            fetchObjects(`${options.endpoint}/`).then(setObjects);
        } catch (error) {
            setErrors({error:"Ошибка удаления"});
        }
    };

    return (
        <div className="create-catalog">
            <div className="endpoints-btns">
                {Object.entries(endpoints_dict).map(([key, value]) => (
                    <button key={key} onClick={() => handleEndpointChange(key)}>
                        {value}
                    </button>
                ))}
            </div>

            {message && <p className="message">{message}</p>}
            {errors.error && <p className="error">{errors.error}</p>}

            {options.endpoint && (
                <>
                    <h2>{endpoints_dict[options.endpoint]}: Форма</h2>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                            <tr>
                                <td>Название</td>
                                <td>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>Описание</td>
                                <td>
                                    <textarea name="description" value={formData.description} onChange={handleChange} />
                                    {errors.description && <span className="error">{errors.description}</span>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <button type="submit">{selectedId ? "Обновить" : "Создать"}</button>
                    </form>
                    <div className="edit">
                        <h3>{endpoints_dict[options.endpoint]}: Список</h3>
                        <ul>
                            {objects.map((obj) => (
                                <li key={obj.id}>
                                    <span>{obj.name}</span>
                                    <button onClick={() => handleEdit(obj)}>✏️</button>
                                    <button onClick={() => handleDelete(obj.id)}>🗑</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateCatalog;