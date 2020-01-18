import axios from 'axios';
import { api_base } from '../env.json';

export default api = axios.create({
    baseURL: api_base
})