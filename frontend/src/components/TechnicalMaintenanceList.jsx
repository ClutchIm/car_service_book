import React, { useState } from "react";
import "../styles/table.scss";
import DetailsCard from "./DetailsCard";

const TechnicalMaintenanceList = ({ maintenanceData }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState("");

    if (!maintenanceData) return null;

    const maintenanceArray = Array.isArray(maintenanceData) ? maintenanceData : [maintenanceData];

    const fields = [
        { key: "maintenance_type", label: "Вид ТО", link: "maintenance-type" },
        { key: "maintenance_date", label: "Дата ТО" },
        { key: "operating_hours", label: "Наработка (м/ч)" },
        { key: "work_order_number", label: "№ заказ-наряда" },
        { key: "work_order_date", label: "Дата заказ-наряда" },
        { key: "car", label: "Машина" },
        { key: "service_company", label: "Сервисная компания", link: "service-company" },
    ];

    const renderCar = (car) => {
        if (!car || typeof car !== "object") return "Не указано";
        return car.factory_serial_number || "Не указано";
    };

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
                        {fields.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {maintenanceArray.map((item, index) => (
                        <tr key={index}>
                            {fields.map(({ key, link }) => {
                                const value = item[key];

                                if (key === "car") {
                                    return <td key={key}>{renderCar(value)}</td>;
                                }

                                if (link && typeof value === "object" && value?.id) {
                                    return (
                                        <td
                                            key={key}
                                            className="clickable"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleItemClick(value, link);
                                            }}
                                        >
                                            {value.name || "Не указано"}
                                        </td>
                                    );
                                }

                                return (
                                    <td key={key}>
                                        {typeof value === "object" && value !== null
                                            ? value.name || "Не указано"
                                            : value || "Не указано"}
                                    </td>
                                );
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

export default TechnicalMaintenanceList;
