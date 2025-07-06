import { createApp } from 'vue';
import '@/assets/main.css';

import App from './App.vue';
import router from './router';
import { createRequest } from '@ethan-utils/axios';

// Initialize the API client with the base URL
createRequest({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000, // Optional: Set a timeout for requests
});

const app = createApp(App);

app.use(router);

app.mount('#app');
