import { useState, useEffect } from "react";
import { getOptions, createObject } from "../services/api";
import "../styles/createCar.scss";

const CreateCar = () => {
    const [formData, setFormData] = useState({
        factory_serial_number: "",
        equipment_model: "",
        engine_model: "",
        engine_serial_number: "",
        transmission_model: "",
        transmission_serial_number: "",
        drive_axle_model: "",
        drive_axle_serial_number: "",
        steering_axle_model: "",
        steering_axle_serial_number: "",
        supply_contract: "",
        shipment_date: "",
        consignee: "",
        delivery_address: "",
        configuration: "",
        client: "",
        service_company: "",
    });

    const [dropdownData, setDropdownData] = useState({
        equipmentModels: [],
        engineModels: [],
        transmissionModels: [],
        driveAxleModels: [],
        steeringAxleModels: [],
        serviceCompanies: [],
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [clientError, setClientError] = useState(false);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [equipmentModels, engineModels, transmissionModels, driveAxleModels, steeringAxleModels, serviceCompanies] = await Promise.all([
                    getOptions("equipment"),
                    getOptions("engine"),
                    getOptions("transmission"),
                    getOptions("drive-axle"),
                    getOptions("steering-axle"),
                    getOptions("service-company"),
                ]);

                setDropdownData({
                    equipmentModels,
                    engineModels,
                    transmissionModels,
                    driveAxleModels,
                    steeringAxleModels,
                    serviceCompanies,
                });
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: false });
        if (name === "client") setClientError(false);
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await createObject(formData, "car/");
            setMessage("Транспорт успешно создан");
            setFormData({
                factory_serial_number: "",
                equipment_model: "",
                engine_model: "",
                engine_serial_number: "",
                transmission_model: "",
                transmission_serial_number: "",
                drive_axle_model: "",
                drive_axle_serial_number: "",
                steering_axle_model: "",
                steering_axle_serial_number: "",
                supply_contract: "",
                shipment_date: "",
                consignee: "",
                delivery_address: "",
                configuration: "",
                client: "",
                service_company: "",
            });
            setErrors({});
            setClientError(false);
        } catch (error) {
            console.log("Ошибка сервера:", error);
            setErrors(error);
            if (error.user || error.client) setClientError(true);
        }
    };

    return (
        <div className="create-car">
            <h2>Создать новый транспорт</h2>
            {message && <p className="message">{message}</p>}
            <form className="create-car-form" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Заводской номер машины:</td>
                        <td>
                            <input
                                type="text"
                                name="factory_serial_number"
                                value={formData.factory_serial_number}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель техники:</td>
                        <td>
                            <select name="equipment_model" value={formData.equipment_model} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.equipmentModels.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Заводской номер двигателя:</td>
                        <td>
                            <input
                                type="text"
                                name="engine_serial_number"
                                value={formData.engine_serial_number}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель двигателя:</td>
                        <td>
                            <select name="engine_model" value={formData.engine_model} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.engineModels.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Модель трансмиссии:</td>
                        <td>
                            <select name="transmission_model" value={formData.transmission_model} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.transmissionModels.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Заводской номер трансмиссии:</td>
                        <td>
                            <input
                                type="text"
                                name="transmission_serial_number"
                                value={formData.transmission_serial_number}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель ведущего моста:</td>
                        <td>
                            <select name="drive_axle_model" value={formData.drive_axle_model} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.driveAxleModels.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Заводской номер ведущего моста:</td>
                        <td>
                            <input
                                type="text"
                                name="drive_axle_serial_number"
                                value={formData.drive_axle_serial_number}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель управляемого моста:</td>
                        <td>
                            <select name="steering_axle_model" value={formData.steering_axle_model} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.steeringAxleModels.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Заводской номер управляемого моста:</td>
                        <td>
                            <input
                                type="text"
                                name="steering_axle_serial_number"
                                value={formData.steering_axle_serial_number}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Контракт поставки:</td>
                        <td>
                            <input
                                type="text"
                                name="supply_contract"
                                value={formData.supply_contract}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Дата отгрузки с завода:</td>
                        <td>
                            <input
                                type="date"
                                name="shipment_date"
                                value={formData.shipment_date}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Грузополучатель:</td>
                        <td>
                            <input
                                type="text"
                                name="consignee"
                                value={formData.consignee}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Адрес поставки:</td>
                        <td>
                            <input
                                type="text"
                                name="delivery_address"
                                value={formData.delivery_address}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Комплектация:</td>
                        <td>
                            <input
                                type="text"
                                name="configuration"
                                value={formData.configuration}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Клиент (username):</td>
                        <td>
                            <input
                                type="text"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className={clientError ? "error" : ""}
                            />
                            {clientError && <p className="error-text">Пользователь не найден</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Сервисная компания:</td>
                        <td>
                            <select name="service_company" value={formData.service_company} onChange={handleChange}>
                                <option value="">Выберите</option>
                                {dropdownData.serviceCompanies.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">Создать транспорт</button>
            </form>
        </div>
    );
};

export default CreateCar;