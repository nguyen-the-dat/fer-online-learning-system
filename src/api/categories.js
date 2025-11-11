import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/categories`);
  return res.data;
};
