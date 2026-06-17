<template>
  <header class="sticky top-0 z-30 border-b border-border bg-white backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <!-- Logo & Brand -->
      <div class="flex items-center gap-2.5">
        <Logo />
        <Badge v-if="isAdmin" variant="secondary" class="ml-1 gap-1">
          <svg class="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          Administration
        </Badge>
      </div>

      <!-- Horizontal Menu -->
      <nav class="flex items-center gap-6">
        <!-- Admin Menu -->
        <template v-if="isAdmin">
          <button
            @click="setActiveAdminTab('dashboard')"
            :class="[
              'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
              activeAdminTab === 'dashboard' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
            ]"
          >
            Dashboard
          </button>
          <button
            @click="setActiveAdminTab('annonces')"
            :class="[
              'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
              activeAdminTab === 'annonces' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
            ]"
          >
            Annonces
          </button>
          <button
            @click="setActiveAdminTab('utilisateurs')"
            :class="[
              'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
              activeAdminTab === 'utilisateurs' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
            ]"
          >
            Utilisateurs
          </button>
          <button
            @click="setActiveAdminTab('categories')"
            :class="[
              'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
              activeAdminTab === 'categories' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
            ]"
          >
            Catégories
          </button>
        </template>

        <!-- Client Menu -->
        <template v-else>
          <div class="flex items-center gap-4">
            <button
              v-if="activeProfile === 'buyer'"
              @click="setActiveBuyerPage('home')"
              :class="[
                'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
                activeBuyerPage === 'home' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
              ]"
            >
              Accueil
            </button>
            <button
              v-if="activeProfile === 'buyer'"
              @click="setActiveBuyerPage('mes-encheres')"
              :class="[
                'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
                activeBuyerPage === 'mes-encheres' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
              ]"
            >
              Mes enchères
            </button>
            <button
              v-if="activeProfile === 'seller'"
              @click="setActiveSellerPage('home')"
              :class="[
                'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
                activeSellerPage === 'home' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
              ]"
            >
              Mes annonces
            </button>
            <button
              v-if="activeProfile === 'seller'"
              @click="setActiveSellerPage('create')"
              :class="[
                'text-sm font-medium transition-colors flex items-center gap-2 pb-1 border-b-2',
                activeSellerPage === 'create' ? 'text-accent border-accent' : 'text-neutral-500 hover:text-primary border-transparent hover:border-primary/20'
              ]"
            >
              Créer une annonce
            </button>

            <!-- Profile Switcher -->
            <div role="tablist" aria-label="Basculer de profil" class="flex rounded-md border border-border bg-muted p-0.5 ml-2">
              <button
                role="tab"
                :aria-selected="activeProfile === 'buyer'"
                @click="setActiveProfile('buyer')"
                :class="[
                  'flex items-center gap-1.5 rounded-[0.3rem] px-3 py-1.5 text-sm font-medium transition-colors',
                  activeProfile === 'buyer' ? 'bg-accent text-primary shadow-sm' : 'text-neutral-500 hover:text-primary'
                ]"
              >
                <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Acheteur
              </button>
              <button
                role="tab"
                :aria-selected="activeProfile === 'seller'"
                @click="setActiveProfile('seller')"
                :class="[
                  'flex items-center gap-1.5 rounded-[0.3rem] px-3 py-1.5 text-sm font-medium transition-colors',
                  activeProfile === 'seller' ? 'bg-accent text-primary shadow-sm' : 'text-neutral-500 hover:text-primary'
                ]"
              >
                <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                </svg>
                Vendeur
              </button>
            </div>
          </div>
        </template>
      </nav>

      <!-- User Dropdown -->
      <div class="relative">
        <button
          @click="showDropdown = !showDropdown" class="flex items-center gap-2 px-2 py-1.5">
          <div class="flex size-8 items-center justify-center rounded-md bg-primary text-white text-xs font-medium">
            {{ userInitials }}
          </div>
          <span class="hidden text-sm font-medium sm:block text-primary">
            {{ user?.name }}
          </span>
        </button>

        <div v-if="showDropdown" @click="showDropdown = false" class="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-xl">
          <div class="px-3 py-2">
            <span class="block text-sm font-medium text-primary">{{ user?.name }}</span>
            <span class="block text-xs font-normal text-neutral-500">{{ user?.email }}</span>
          </div>
          <div class="h-px bg-border my-1"></div>
          <button @click="logout" class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-primary">
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import Badge from './ui/Badge.vue'
import Logo from './ui/Logo.vue'

const appStore = useAppStore()
const user = computed(() => appStore.user)
const activeProfile = computed(() => appStore.activeProfile)
const isAdmin = computed(() => appStore.isAdmin)
const activeAdminTab = computed(() => appStore.activeAdminTab)
const activeBuyerPage = computed(() => appStore.activeBuyerPage)
const activeSellerPage = computed(() => appStore.activeSellerPage)
const setActiveProfile = appStore.setActiveProfile
const setActiveAdminTab = appStore.setActiveAdminTab
const setActiveBuyerPage = appStore.setActiveBuyerPage
const setActiveSellerPage = appStore.setActiveSellerPage
const logout = appStore.logout

const showDropdown = ref(false)

const userInitials = computed(() => {
  if (!user.value) return ''
  return user.value.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
})
</script>
