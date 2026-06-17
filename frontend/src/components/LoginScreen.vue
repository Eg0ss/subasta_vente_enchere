<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md">
      <CardContent class="p-8">
        <div class="flex flex-col items-center mb-8">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="size-10 rounded-md bg-primary flex items-center justify-center">
              <svg class="size-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L4 12h3 7v10h10l5-5z"></path>
                <path d="M9 21h10"></path>
              </svg>
            </div>
            <span class="font-serif text-2xl font-bold text-primary">
              <span class="text-accent">S</span>ubasta
            </span>
          </div>
          <p class="text-neutral-500 text-center">Connectez-vous pour accéder à la plateforme</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <Label for="email">Email</Label>
            <Input id="email" v-model="loginData.email" type="email" placeholder="email@exemple.com" required />
          </div>
          <div>
            <Label for="password">Mot de passe</Label>
            <Input id="password" v-model="loginData.password" type="password" placeholder="••••••••" required />
          </div>

          <p v-if="error" class="text-danger text-sm">{{ error }}</p>

          <Button type="submit" class="w-full">Se connecter</Button>
        </form>

        <Separator class="my-6" />

        <div class="space-y-3">
          <p class="text-sm text-neutral-500 text-center">Ou connectez-vous avec un compte de démonstration:</p>
          <div class="grid grid-cols-1 gap-2">
            <Button variant="outline" @click="demoLogin('user')">
              <div class="text-left">
                <p class="font-medium text-primary">Compte membre</p>
                <p class="text-xs text-neutral-500">membre@subasta.fr / demo</p>
              </div>
            </Button>
            <Button variant="outline" @click="demoLogin('admin')">
              <div class="text-left">
                <p class="font-medium text-primary">Compte administrateur</p>
                <p class="text-xs text-neutral-500">admin@subasta.fr / admin</p>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Separator from '@/components/ui/Separator.vue'

const appStore = useAppStore()

const loginData = ref({
  email: '',
  password: ''
})
const error = ref('')

function handleLogin() {
  error.value = ''
  const result = appStore.login(loginData.value.email, loginData.value.password)
  if (!result.ok) {
    error.value = 'Identifiants incorrects'
  }
}

function demoLogin(type) {
  error.value = ''
  if (type === 'user') {
    appStore.login('membre@subasta.fr', 'demo')
  } else {
    appStore.login('admin@subasta.fr', 'admin')
  }
}
</script>
