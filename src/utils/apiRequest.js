import axios from 'axios';

// const API_URL = process.env.VUE_APP_API_URL;
const API_URL = 'http://api-test.azizt20.uz/';

const token = localStorage.getItem('token');

export default axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});