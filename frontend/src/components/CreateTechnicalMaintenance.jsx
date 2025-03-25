import { useState, useEffect } from "react";
import { getOptions, createObject } from "../services/api";
import "../styles/createTechnicalMaintenance.scss";

const CreateTechnicalMaintenance = () => {
    const [formData, setFormData] = useState({
        maintenance_type: "",
        maintenance_date: "",
        operating_hours: "",
        work_order_number: "",
        work_order_date: "",
        car: "",
        service_company: ""
    });

    const [options, setOptions] = useState({
        maintenanceTypes: [],
        serviceCompanies: []
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [maintenanceTypes, serviceCompanies] = await Promise.all([
                    getOptions("maintenance-type"),
                    getOptions("service-company")
                ]);
                setOptions({
                    maintenanceTypes,
                    serviceCompanies
                });
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };
        fetchOptions();
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
            await createObject(formData, 'technical-maintenance/');
            setMessage("ТО успешно создано");
            setFormData({
                maintenance_type: "",
                maintenance_date: "",
                operating_hours: "",
                work_order_number: "",
                work_order_date: "",
                car: "",
                service_company: ""
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
        <div className="create-technical-maintenance">
            <h2>Создать новое ТО</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Вид ТО</td>
                        <td>
                            <select name="maintenance_type" value={formData.maintenance_type} onChange={handleChange}>
                                <option value="">Выберите вид ТО</option>
                                {options.maintenanceTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.maintenance_type && <span className="error">{errors.maintenance_type}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Дата проведения ТО</td>
                        <td>
                            <input type="date" name="maintenance_date" value={formData.maintenance_date} onChange={handleChange} />
                            {errors.maintenance_date && <span className="error">{errors.maintenance_date}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Наработка, м/час</td>
                        <td>
                            <input type="number" name="operating_hours" value={formData.operating_hours} onChange={handleChange} />
                            {errors.operating_hours && <span className="error">{errors.operating_hours}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>№ заказ-наряда</td>
                        <td>
                            <input type="text" name="work_order_number" value={formData.work_order_number} onChange={handleChange} />
                            {errors.work_order_number && <span className="error">{errors.work_order_number}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Дата заказ-наряда</td>
                        <td>
                            <input type="date" name="work_order_date" value={formData.work_order_date} onChange={handleChange} />
                            {errors.work_order_date && <span className="error">{errors.work_order_date}</span>}
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
                                className={errors.car ? "invalid" : ""}
                            />
                            {errors.car && <span className="error">{errors.car}</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>Сервисная компания</td>
                        <td>
                            <select name="service_company" value={formData.service_company} onChange={handleChange}>
                                <option value="">Выберите компанию</option>
                                {options.serviceCompanies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {errors.service_company && <span className="error">{errors.service_company}</span>}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateTechnicalMaintenance;