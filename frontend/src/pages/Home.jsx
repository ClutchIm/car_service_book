import React, { useState, useEffect } from "react";
import { useAuth } from "../services/authContext";
import { getCarBySerialNumber, getTechnicalMaintenance, getClaims, getAllCars, getAllTechnicalMaintenance, getAllClaims } from "../services/api";
import "../styles/home.scss";
import CarList from "../components/CarList";
import TechnicalMaintenanceList from "../components/TechnicalMaintenanceList";
import ClaimList from "../components/ClaimList";
import FilterForm from "../components/FilterForm";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [serialNumber, setSerialNumber] = useState("");
    const [carData, setCarData] = useState(null);
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [claimsData, setClaimsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("car");
    const [filters, setFilters] = useState({});

    const handleSearch = async () => {
        if (!serialNumber.trim()) return;
        setLoading(true);
        setError("");
        setCarData(null);
        setMaintenanceData([]);
        setClaimsData([]);

        try {
            const car = await getCarBySerialNumber(serialNumber);
            setCarData(car);

            if (user) {
                const maintenance = await getTechnicalMaintenance(car.id);
                const claims = await getClaims(car.id);
                setMaintenanceData(maintenance);
                setClaimsData(claims);
            }
        } catch (err) {
            setError("Машина не найдена.");
        }
        setLoading(false);
    };

    const handleShowAll = async () => {
        setLoading(true);
        setError("");
        setCarData(null);
        setMaintenanceData([]);
        setClaimsData([]);

        try {
            const allCars = await getAllCars();
            const allMaintenance = await getAllTechnicalMaintenance();
            const allClaims = await getAllClaims();

            setCarData(allCars);
            setMaintenanceData(allMaintenance);
            setClaimsData(allClaims);
        } catch (err) {
            setError("Ошибка загрузки данных.");
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFilters({});
    };

    const normalizeData = (data) => {
        return Array.isArray(data) ? data : data ? [data] : [];
    };

    const applyFilters = (data) => {
        const normalizedData = normalizeData(data);
        if (!normalizedData.length || !filters) return normalizedData;

        return normalizedData.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
                item[key]?.name?.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    useEffect(() => {
        if (location.pathname === "/") {
            const savedData = sessionStorage.getItem("carData");
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    setCarData(parsedData || null);
                } catch (error) {
                    console.error("Ошибка парсинга данных:", error);
                }
            }
        }
    }, [location]);

    const filteredCarData = applyFilters(carData);
    const filteredMaintenanceData = applyFilters(maintenanceData);
    const filteredClaimsData = applyFilters(claimsData);

    return (
        <div className="wrapper">
            <main className="home">
                <section className="search-section">
                    <h2>Проверьте комплектацию и технические характеристики техники Силант</h2>
                    <div className="search-box">
                        <label>
                            Заводской номер:
                            <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} onKeyDown={handleKeyDown} />
                        </label>
                        <button onClick={handleSearch}>Поиск</button>
                        {user && (user.role === "manager" || user.is_staff) && (
                            <button onClick={handleShowAll} className="show-all-button">
                                Показать все
                            </button>
                        )}
                    </div>
                </section>

                {loading && <p className="loading">Загрузка...</p>}
                {error && <p className="error">{error}</p>}

                {carData && (
                    <section className="results-section">
                        <h3 className="table-title">Данные о транспорте</h3>

                        <div className="tabs">
                            <button onClick={() => handleTabChange("car")} className={activeTab === "car" ? "active" : ""}>
                                Транспорт
                            </button>
                            {user && (
                                <>
                                    <button onClick={() => handleTabChange("maintenance")} className={activeTab === "maintenance" ? "active" : ""}>
                                        ТО
                                    </button>
                                    <button onClick={() => handleTabChange("claims")} className={activeTab === "claims" ? "active" : ""}>
                                        Рекламации
                                    </button>
                                </>
                            )}
                        </div>

                        <FilterForm activeTab={activeTab} onFilterChange={handleFilterChange} />

                        <div className="table-wrapper">
                            {activeTab === "car" && (filteredCarData.length > 0 ? <CarList carData={filteredCarData} /> : <p>Нет данных</p>)}
                            {activeTab === "maintenance" && (filteredMaintenanceData.length > 0 ? <TechnicalMaintenanceList maintenanceData={filteredMaintenanceData} /> : <p>Нет данных</p>)}
                            {activeTab === "claims" && (filteredClaimsData.length > 0 ? <ClaimList claimsData={filteredClaimsData} /> : <p>Нет данных</p>)}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Home;