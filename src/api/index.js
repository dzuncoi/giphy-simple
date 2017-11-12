import axios from 'axios';

var BASE_URL = 'https://api.giphy.com';

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request;
