import axios from 'axios';

/**
 * Configuration de l'instance Axios pour communiquer avec le backend Laravel.
 * Cette instance injecte automatiquement le token Bearer dans les headers
 * et gère les erreurs globales (ex: 401 Unauthorized).
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Intercepteur de requête : ajoute le token Authorization si présent dans le localStorage.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Intercepteur de réponse : gère les erreurs globales comme l'expiration de session (401).
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Si on reçoit une 401, on nettoie le token et on peut rediriger
            localStorage.removeItem('auth_token');
            // Optionnel : window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
