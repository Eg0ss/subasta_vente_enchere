import { defineStore } from 'pinia';
import api from '@/services/api';

/**
 * Store Pinia pour la gestion de l'authentification.
 * Centralise l'état de l'utilisateur, le token, et les actions de connexion/déconnexion.
 */
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('auth_token') || null,
        loading: false,
        error: null,
    }),

    getters: {
        /**
         * Vérifie si l'utilisateur est authentifié.
         */
        isAuthenticated: (state) => !!state.token,
        
        /**
         * Vérifie si l'utilisateur a un rôle spécifique.
         * @param {string} roleName 
         */
        hasRole: (state) => (roleName) => {
            return state.user?.roles?.some(role => role.name === roleName) || false;
        }
    },

    actions: {
        /**
         * Action de connexion.
         * Envoie les identifiants au backend, stocke le token et les infos user.
         */
        async login(email, password) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.post('/login', { email, password });
                
                const { access_token, user } = response.data;
                
                // Mise à jour de l'état
                this.token = access_token;
                this.user = user;
                
                // Persistance du token
                localStorage.setItem('auth_token', access_token);
                
                return true;
            } catch (err) {
                this.error = err.response?.data?.message || 'Erreur lors de la connexion';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Action de déconnexion.
         * Appelle le backend pour révoquer le token et nettoie l'état local.
         */
        async logout() {
            try {
                await api.post('/logout');
            } catch (err) {
                console.error('Erreur lors de la déconnexion backend', err);
            } finally {
                // Quoi qu'il arrive, on nettoie le local
                this.user = null;
                this.token = null;
                localStorage.removeItem('auth_token');
            }
        },

        /**
         * Récupère l'utilisateur actuellement connecté.
         * Utile au rechargement de la page pour restaurer la session.
         */
        async fetchCurrentUser() {
            if (!this.token) return;
            
            this.loading = true;
            try {
                const response = await api.get('/me');
                this.user = response.data;
            } catch (err) {
                this.logout(); // En cas d'erreur (ex: token expiré), on déconnecte
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});
