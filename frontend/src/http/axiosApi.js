import axios from 'axios';
const BASE_URL = 'https://localhost:44361/';

export default axios.create({
    baseURL: BASE_URL
});