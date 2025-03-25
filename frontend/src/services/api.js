import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Token ${token}` } : {};
};

export const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}user/`, {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}auth/logout/`, {}, { headers: getAuthHeaders() });
    } catch (error) {
        console.error('Ошибка выхода:', error);
    }
};

export const getCarBySerialNumber = async (serialNumber) => {
    const response = await axios.get(`${API_URL}car/by-serial/`, {
        params: { factory_serial_number: serialNumber },
        headers: getAuthHeaders()
    });

    return response.data;
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}auth/login/`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        throw error;
    }
};

export const getCars = async (page, filters) => {
    const params = {
        page: page,
        equipment_model: filters.equipmentModel,
        engine_model: filters.engineModel,
        transmission_model: filters.transmissionModel
    };
    const response = await axios.get(`${API_URL}car/`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data;
};

export const getTechnicalMaintenance = async (carId) => {
    const response = await axios.get(`${API_URL}technical-maintenance/by-car-id/`, {
        headers: getAuthHeaders(),
        params: { car_id: carId },
    });
    return response.data;
};

export const getClaims = async (carId) => {
    const response = await axios.get(`${API_URL}claim/by-car-id/`, {
        headers: getAuthHeaders(),
        params: { car_id: carId },
    });
    return response.data;
};

export const getUsers = async () => {
    const response = await apiClient.get('/users/');
    return response.data;
};

export const createUser = async (userData) => {
    const response = await apiClient.post('/users/', userData);
    return response.data;
};

export const getDetailsByType = async (type, id) => {
    const response = await axios.get(`${API_URL}${type}/${id}/`, {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const getAllCars = async () => {
    try {
        const response = await axios.get(`${API_URL}car/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении всех машин:", error);
        throw error;
    }
};

export const getAllTechnicalMaintenance = async () => {
    try {
        const response = await axios.get(`${API_URL}technical-maintenance/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении всех ТО:", error);
        throw error;
    }
};

export const getAllClaims = async () => {
    try {
        const response = await axios.get(`${API_URL}claim/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении всех рекламаций:", error);
        throw error;
    }
};

export const getOptions = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error(`Ошибка загрузки данных (${endpoint}):`, error);
        return [];
    }
};

export const createTechnicalMaintenance = async (data) => {
    try {
        const response = await axios.post(`${API_URL}technical-maintenance/`, data, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw { error: "Ошибка отправки данных" };
    }
};

