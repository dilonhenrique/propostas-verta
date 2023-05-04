import axios from 'axios';

const propApi = axios.create({
  baseURL: 'https://propostas.vercel.app/api/',
  headers: {}
})

export default propApi;