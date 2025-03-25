import React from "react";
import "../styles/detailsCard.scss";

const DetailsCard = ({ title, data }) => {
    if (!data) return null;
    const fieldLabels = {
        name: "Название",
        description: "Описание",
    };

    const typeNames = {
        "equipment": "модели техники",
        "engine": "модели двигателя",
        "transmission": "модели трансмиссии",
        "drive-axle": "модели ведущего моста",
        "steering-axle": "модели управляемого моста",
        "service-company": "сервисной компании",
        "maintenance-type": "виде ТО",
        "failed-component": "узле отказа",
    };

    const modelName = typeNames[title] || "объекте";

    return (
        <div className="details-card">
            <h3>Данные об {modelName}</h3>
            <div className="details-container">
                {Object.entries(data).map(([key, value]) => {
                    if (key === "id") return null;
                    return (
                        <p key={key}>
                            <strong>{fieldLabels[key] || key}:</strong> {value || "Не указано"}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailsCard;
