import React, { useState } from "react";
import "../styles/table.scss";
import DetailsCard from "./DetailsCard";

const CarList = ({ carData }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState("");

    if (!carData) return null;

    const carArray = Array.isArray(carData) ? carData : [carData];

    const fields = [
        { key: "factory_serial_number", label: "Заводской номер" },
        { key: "equipment_model", label: "Модель техники", link: "equipment" },
        { key: "engine_model", label: "Модель двигателя", link: "engine" },
        { key: "engine_serial_number", label: "Заводской номер двигателя" },
        { key: "transmission_model", label: "Модель трансмиссии", link: "transmission" },
        { key: "transmission_serial_number", label: "Заводской номер трансмиссии" },
        { key: "drive_axle_model", label: "Модель ведущего моста", link: "drive-axle" },
        { key: "drive_axle_serial_number", label: "Заводской номер ведущего моста" },
        { key: "steering_axle_model", label: "Модель управляемого моста", link: "steering-axle" },
        { key: "steering_axle_serial_number", label: "Заводской номер управляемого моста" },
        { key: "supply_contract", label: "Договор поставки" },
        { key: "shipment_date", label: "Дата отгрузки" },
        { key: "consignee", label: "Грузополучатель" },
        { key: "delivery_address", label: "Адрес поставки" },
        { key: "configuration", label: "Комплектация" },
        { key: "client", label: "Клиент" },
        { key: "service_company", label: "Сервисная компания", link: "service-company" },
    ];

    const hasClient = carArray.some((car) => car.client);
    const fieldsToShow = hasClient ? fields : fields.slice(0, 10);

    const handleItemClick = (value, type) => {
        setSelectedItem(value || {});
        setSelectedItemType(type);
    };

    return (
        <div className="car-list">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        {fieldsToShow.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {carArray.map((item, index) => (
                        <tr key={index}>
                            {fieldsToShow.map(({ key, link }) => {
                                const value = item[key];

                                if (!value) return <td key={key}>Не указано</td>;

                                if (link && typeof value === "object" && value.id) {
                                    return (
                                        <td
                                            key={key}
                                            className="clickable"
                                            onClick={() => handleItemClick(value, link)}>
                                            {value.name || "Не указано"}
                                        </td>
                                    );
                                }

                                if (key === "client") {
                                    return <td key={key}>{value.name || "Не указано"}</td>;
                                }

                                return <td key={key}>
                                    {typeof value === "object" ? value.name || "Не указано" : value}
                                </td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedItem && <DetailsCard title={selectedItemType} data={selectedItem} />}
        </div>
    );
};

export default CarList;
