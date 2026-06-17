<template>
  <div class="auth-container">
    <h1>Inscription</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Nom</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="form.password" type="password" required minlength="8" />
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirmer le mot de passe</label>
        <input id="password_confirmation" v-model="form.password_confirmation" type="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Inscription...' : 'S\'inscrire' }}
      </button>
    </form>
    <p>
      Déjà un compte ? <router-link to="/login">Se connecter</router-link>
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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    await authStore.register(form.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Erreur d\'inscription'
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