import React, { useState, useEffect } from "react";
import "../styles/filterForm.scss";
import { getOptions } from "../services/api";

const FILTER_FIELDS = {
    car: [
        { key: "equipment_model", label: "Модель техники", endpoint: "equipment" },
        { key: "engine_model", label: "Модель двигателя", endpoint: "engine" },
        { key: "transmission_model", label: "Модель трансмиссии", endpoint: "transmission" },
        { key: "drive_axle_model", label: "Модель ведущего моста", endpoint: "drive-axle" },
        { key: "steering_axle_model", label: "Модель управляемого моста", endpoint: "steering-axle" }
    ],
    maintenance: [
        { key: "maintenance_type", label: "Вид ТО", endpoint: "maintenance-type" },
        { key: "factory_serial_number", label: "Зав. номер машины", type: "input"},
        { key: "service_company", label: "Сервисная компания", endpoint: "service-company" }
    ],
    claims: [
        { key: "failed_component", label: "Узел отказа", endpoint: "failed-component" },
        { key: "recovery_method", label: "Способ восстановления", endpoint: "recovery-method" },
        { key: "service_company", label: "Сервисная компания", endpoint: "service-company" }
    ]
};

const FilterForm = ({ activeTab, onFilterChange }) => {
    const [filters, setFilters] = useState({});
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (!activeTab || !FILTER_FIELDS[activeTab]) return;

        setFilters({});
        setOptions({});

        const fetchOptions = async () => {
            const newOptions = {};
            await Promise.all(
                FILTER_FIELDS[activeTab]
                    .filter(field => field.endpoint)
                    .map(async (field) => {
                        newOptions[field.key] = await getOptions(field.endpoint);
                    })
            );
            setOptions(newOptions);
        };

        fetchOptions();
    }, [activeTab]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    if (!activeTab || !FILTER_FIELDS[activeTab]) return null;

    return (
        <div className="filter-form">
            {FILTER_FIELDS[activeTab].map(({ key, label, type }) => (
                <div key={key} className="filter-field">
                    <label>{label}:</label>
                    {type === "input" ? (
                        <input type="text" name={key} value={filters[key] || ""} onChange={handleChange} />
                    ) : (
                        <select name={key} value={filters[key] || ""} onChange={handleChange}>
                            <option value="">Выберите...</option>
                            {options[key]?.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterForm;