import { createApp } from 'vue';

import '@/assets/main.css';
import App from './App.vue';
import router from './router';

import 'pinia-plugin-persistedstate';

import { createRequest } from '@ethan-utils/axios';

// Initialize the API client with the base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

createRequest({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
