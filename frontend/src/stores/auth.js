import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function register(data) {
    const response = await api.post('/register', data)
    token.value = response.data.access_token
    user.value = response.data.user
    localStorage.setItem('auth_token', token.value)
  }

  async function login(data) {
    const response = await api.post('/login', data)
    token.value = response.data.access_token
    user.value = response.data.user
    localStorage.setItem('auth_token', token.value)
  }

  async function logout() {
    await api.post('/logout')
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  async function fetchUser() {
    const response = await api.get('/me')
    user.value = response.data
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    fetchUser
  }
})