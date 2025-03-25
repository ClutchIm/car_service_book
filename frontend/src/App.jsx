import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CC from "./components/CreateClaim"
import CTM from "./components/CreateTechnicalMaintenance"
import { useAuth } from "./services/authContext";

const App = () => {
    const { user, setUser } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [carData, setCarData] = useState(() => {
        try {
            const savedData = sessionStorage.getItem("carData");
            return savedData && savedData !== "undefined" ? JSON.parse(savedData) : [];
        } catch (error) {
            console.error("Ошибка парсинга carData из sessionStorage:", error);
            return [];
        }
    });
    const [clearSearchResults, setClearSearchResults] = useState(() => () => {});

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, [user]);

    const handleSearch = (results) => {
        setCarData(results);
        sessionStorage.setItem("carData", JSON.stringify(results));
    };

    const clearDataAndLogout = () => {
        setCarData([]);
        sessionStorage.removeItem("carData");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload();
    };

    return (
        <Router>
            <Header onLogout={clearDataAndLogout} />
            <Routes>
                <Route path="/" element={<Home onSearch={handleSearch} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cc" element={<CC />} />
                <Route path="/ctm" element={<CTM />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
