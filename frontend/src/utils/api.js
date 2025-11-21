import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:4000' });
export default API;
