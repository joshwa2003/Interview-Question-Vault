import axios from 'axios';

const API_URL = 'http://localhost:5001/api/questions';

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
