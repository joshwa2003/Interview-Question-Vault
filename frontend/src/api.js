import axios from 'axios';

// ✅ Use env variable — in dev: reads from frontend/.env
//                          in production: set on Render dashboard
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const API_URL = `${BASE_URL}/api/questions`;

export const getQuestions = (category = '') => {
    const url = category ? `${API_URL}?category=${category}` : API_URL;
    return axios.get(url);
};

export const addQuestion = (questionData) => {
    return axios.post(API_URL, questionData);
};

export const updateQuestion = (id, questionData) => {
    return axios.put(`${API_URL}/${id}`, questionData);
};

export const deleteQuestion = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
