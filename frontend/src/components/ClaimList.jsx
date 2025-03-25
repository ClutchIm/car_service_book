import React, { useState } from "react";
import "../styles/table.scss";
import DetailsCard from "./DetailsCard";

const ClaimList = ({ claimsData }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState("");

    if (!claimsData) return null;

    const claimsArray = Array.isArray(claimsData) ? claimsData : [claimsData];

    const fields = [
        { key: "failure_date", label: "Дата отказа" },
        { key: "operating_hours", label: "Наработка (м/ч)" },
        { key: "failed_component", label: "Узел отказа", link: "failed-component" },
        { key: "failure_description", label: "Описание отказа" },
        { key: "recovery_method", label: "Способ восстановления" },
        { key: "used_spare_parts", label: "Используемые запасные части" },
        { key: "recovery_date", label: "Дата восстановления" },
        { key: "downtime_days", label: "Время простоя (дней)" },
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
                    {claimsArray.map((item, index) => (
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

export default ClaimList;
