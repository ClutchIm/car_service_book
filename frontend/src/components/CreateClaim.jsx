import { useState, useEffect } from "react";
import { createObject, getOptions } from "../services/api";
import "../styles/createClaim.scss";

const CreateClaim = () => {
    const [formData, setFormData] = useState({
        failed_component: "",
        recovery_method: "",
        service_company: "",
        car: "",
        failure_date: "",
        recovery_date: "",
        operating_hours: "",
        failure_description: "",
        used_spare_parts: "",
    });

    const [options, setOptions] = useState({
        failedComponents: [],
        recoveryMethods: [],
        serviceCompanies: []
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [failedComponents, recoveryMethods, serviceCompanies] = await Promise.all([
                    getOptions("failed-component"),
                    getOptions("recovery-method"),
                    getOptions("service-company")
                ]);
                setOptions({ failedComponents, recoveryMethods, serviceCompanies });
            } catch (error) {
                console.error("Ошибка загрузки справочников:", error);
            }
        };
        loadOptions();
    }, []);

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
            await createObject(formData, "claim/");
            setMessage("Рекламация успешно создана");
            setFormData({
                failed_component: "",
                recovery_method: "",
                service_company: "",
                car: "",
                failure_date: "",
                recovery_date: "",
                operating_hours: "",
                failure_description: "",
                used_spare_parts: ""
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
        <div className="create-claim-container">
            <h2>Создать новую рекламацию</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Отказавший узел</td>
                        <td>
                            <select name="failed_component" value={formData.failed_component} onChange={handleChange}>
                                <option value="">Выберите узел</option>
                                {options.failedComponents.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.failed_component && <span className="error-text">{errors.failed_component}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Способ восстановления</td>
                        <td>
                            <select name="recovery_method" value={formData.recovery_method} onChange={handleChange}>
                                <option value="">Выберите способ</option>
                                {options.recoveryMethods.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.recoveryMethods && <span className="error-text">{errors.recoveryMethods}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Сервисная компания</td>
                        <td>
                            <select name="service_company" value={formData.service_company} onChange={handleChange}>
                                <option value="">Выберите компанию</option>
                                {options.serviceCompanies.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.serviceCompanies && <span className="error-text">{errors.serviceCompanies}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Заводской номер машины</td>
                        <td>
                            <input
                                type="text"
                                name="car"
                                value={formData.car}
                                onChange={handleChange}
                                className={errors.car ? "error" : ""}
                            />
                            {errors.car && <span className="error-text">{errors.car}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Дата отказа</td>
                        <td>
                            <input
                                type="date"
                                name="failure_date"
                                value={formData.failure_date}
                                onChange={handleChange}
                            />
                            {errors.failure_date && <span className="error-text">{errors.failure_date}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Дата восстановления</td>
                        <td>
                            <input
                                type="date"
                                name="recovery_date"
                                value={formData.recovery_date}
                                onChange={handleChange}
                            />
                            {errors.recovery_date && <span className="error-text">{errors.recovery_date}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Наработка, м/час</td>
                        <td>
                            <input
                                type="number"
                                name="operating_hours"
                                value={formData.operating_hours}
                                onChange={handleChange}
                            />
                            {errors.operating_hours && <span className="error-text">{errors.operating_hours}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Описание отказа</td>
                        <td>
                                <textarea
                                    name="failure_description"
                                    value={formData.failure_description}
                                    onChange={handleChange}
                                />
                            {errors.failure_description && <span className="error-text">{errors.failure_description}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Используемые запчасти</td>
                        <td>
                                <textarea
                                    name="used_spare_parts"
                                    value={formData.used_spare_parts}
                                    onChange={handleChange}
                                />
                            {errors.used_spare_parts && <span className="error-text">{errors.used_spare_parts}</span>}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateClaim;