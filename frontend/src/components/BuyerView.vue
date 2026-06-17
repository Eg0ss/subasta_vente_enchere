<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div class="mb-8">
      <h1 class="font-serif text-3xl font-semibold text-primary">Enchères en cours</h1>
      <p class="text-neutral-500">Découvrez les lots disponibles aux enchères</p>
    </div>

    <!-- Search & Filter -->
    <div class="mb-6 flex flex-wrap gap-4 items-center">
      <Input v-model="searchQuery" placeholder="Rechercher un lot..." class="max-w-sm" />
      <select v-model="selectedCategory" class="h-10 rounded-md border border-border bg-card px-3 py-2 text-sm text-primary">
        <option value="">Toutes les catégories</option>
        <option v-for="cat in appStore.CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Lots Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="lot in filteredLots" :key="lot.id" class="overflow-hidden hover:shadow-md transition-shadow">
        <div class="aspect-[4/3] overflow-hidden bg-muted">
          <img :src="lot.image || '/placeholder.svg'" :alt="lot.title" class="h-full w-full object-cover" />
        </div>
        <CardContent class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <Badge :variant="appStore.STATUS_VARIANTS[lot.status]">
              {{ appStore.STATUS_LABELS[lot.status] }}
            </Badge>
            <span class="text-xs text-neutral-500">{{ lot.category }}</span>
          </div>
          <h3 class="font-serif text-lg font-semibold text-primary mb-2">{{ lot.title }}</h3>
          <p class="text-sm text-neutral-500 mb-4 line-clamp-2">{{ lot.description }}</p>

          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-xs text-neutral-500">Prix actuel</p>
              <p class="font-bold text-xl text-accent">{{ appStore.formatPrice(lot.currentBid) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-neutral-500">Temps restant</p>
              <p class="font-medium text-accent">{{ appStore.timeLeft(lot.endsAt) }}</p>
            </div>
          </div>

          <div class="flex gap-2">
            <Button variant="accent" class="flex-1" @click="openLotDetail(lot)">Enchérir</Button>
            <Button variant="ghost" size="icon" @click="openLotDetail(lot)">
              <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Lot Detail Dialog -->
    <LotDetailDialog
      :open="selectedLot !== null"
      :lot="selectedLot"
      @update:open="selectedLot = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import LotDetailDialog from '@/components/LotDetailDialog.vue'

const appStore = useAppStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedLot = ref(null)

const filteredLots = computed(() => {
  return appStore.lots.filter(lot => {
    if (lot.status !== 'live') return false
    if (searchQuery.value && !lot.title.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    if (selectedCategory.value && lot.category !== selectedCategory.value) return false
    return true
  })
})

function openLotDetail(lot) {
  selectedLot.value = lot
}
</script>
