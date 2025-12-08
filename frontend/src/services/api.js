import axios from 'axios';

const base = import.meta.env.VITE_API_BASE;
const API_BASE = base && base.trim() !== '' 
  ? base 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE
});

export async function fetchSales(params) {
  const resp = await api.get('/sales', { params });
  return resp.data;
}

export async function fetchSummary(params) {
  const resp = await api.get('/sales/summary', { params });
  return resp.data;
}

export default api;
