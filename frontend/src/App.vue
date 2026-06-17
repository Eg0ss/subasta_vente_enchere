<template>
  <div class="min-h-screen bg-background">
    <AppHeader v-if="appStore.isAuthenticated" />
    <div v-if="appStore.isAuthenticated">
      <AdminView v-if="appStore.isAdmin" />
      <SellerView v-else-if="appStore.activeProfile === 'seller'" />
      <BuyerView v-else />
    </div>
    <LoginScreen v-else />
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/AppHeader.vue'
import LoginScreen from '@/components/LoginScreen.vue'
import BuyerView from '@/components/BuyerView.vue'
import SellerView from '@/components/SellerView.vue'
import AdminView from '@/components/AdminView.vue'

const appStore = useAppStore()
</script>

