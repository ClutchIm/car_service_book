import { useState } from "react";
import { useAuth } from "../services/authContext";
import CreateCar from "../components/CreateCar";
import CreateTechnicalMaintenance from "../components/CreateTechnicalMaintenance";
import CreateClaim from "../components/CreateClaim";
import CreateUser from "../components/CreateUser";
import ManageReference from "../components/ManageReference";
import "../styles/manageData.scss";

const ManageData = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("");

    if (!user) return null;

    const tabs = [
        { key: "car", label: "Транспорт", roles: ["manager", "is_staff"] },
        { key: "maintenance", label: "ТО", roles: ["client", "service", "manager", "is_staff"] },
        { key: "claim", label: "Рекламации", roles: ["service", "manager", "is_staff"] },
        { key: "reference", label: "Справочник", roles: ["manager", "is_staff"] },
        { key: "user", label: "Пользователь", roles: ["manager", "is_staff"] },
    ];

    return (
        <div className="manage-data">
            <div className="tabs">
                {tabs.map(({ key, label, roles }) =>
                    roles.includes(user.role) || (user.is_staff && roles.includes("is_staff")) ? (
                        <button
                            key={key}
                            className={activeTab === key ? "active" : ""}
                            onClick={() => setActiveTab(activeTab === key ? "" : key)}
                        >
                            {label}
                        </button>
                    ) : null
                )}
            </div>
            <div className="form-container">
                {activeTab === "car" && <CreateCar />}
                {activeTab === "maintenance" && <CreateTechnicalMaintenance />}
                {activeTab === "claim" && <CreateClaim />}
                {activeTab === "reference" && <ManageReference />}
                {activeTab === "user" && <CreateUser />}
            </div>
        </div>
    );
};

export default ManageData;