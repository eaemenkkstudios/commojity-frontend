import axios from 'axios';

const api = axios.create({
  baseURL: 'http://1259-191-223-168-78.ngrok.io',
});

export { api };
