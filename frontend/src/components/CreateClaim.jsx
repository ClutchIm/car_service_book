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
        description: ""
    });

    const [options, setOptions] = useState({
        failedComponents: [],
        recoveryMethods: [],
        serviceCompanies: []
    });

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createObject(formData, "claim/");
            setFormData({
                failed_component: "",
                recovery_method: "",
                service_company: "",
                car: "",
                failure_date: "",
                recovery_date: "",
                operating_hours: "",
                description: ""
            });
            setErrors({});
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <div className="create-claim-container">
            <h2>Создать новую рекламацию</h2>
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
                            {errors.car && <span className="error-text">{errors.car[0]}</span>}
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
                        </td>
                    </tr>
                    <tr>
                        <td>Описание отказа</td>
                        <td>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
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