import axios from 'axios';

const api = axios.create({
  baseURL: 'https://db99-191-223-168-78.ngrok.io/',
});

export { api };
