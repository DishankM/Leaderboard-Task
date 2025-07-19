import axios from 'axios';

//  Axios instance with a base URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api' 
});

// Export functions for each API endpoint
export const getUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', {name});
export const claimPoints = (userId) => API.post(`/claims/${userId}`);
export const getRankings = () => API.get('/rankings');
export const getClaimHistory = (userId) => API.get(`/history/${userId}`);
