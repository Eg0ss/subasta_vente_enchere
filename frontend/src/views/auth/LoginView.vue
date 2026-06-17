<template>
  <div class="auth-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
    <p>
      Pas de compte ? <router-link to="/register">S'inscrire</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
}

.error {
  color: red;
  margin-bottom: 15px;
}
</style>