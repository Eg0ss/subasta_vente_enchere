<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div>
      <h1 class="font-serif text-3xl font-semibold text-primary">
        Administration de la maison
      </h1>
      <p class="text-neutral-500">
        Validez les lots soumis et supervisez les ventes en cours.
      </p>
    </div>

    <!-- Stats -->
    <div class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="À valider" :value="String(stats.pending)" :highlight="true" />
      <StatCard label="En vente" :value="String(stats.live)" />
      <StatCard label="Lots au total" :value="String(stats.total)" />
      <StatCard label="Volume en cours" :value="appStore.formatPrice(stats.totalValue)" />
    </div>

    <!-- Tabs -->
    <div class="mt-8">
      <div class="flex gap-2 border-b border-border">
        <button
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'pending' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-primary'
          ]"
          @click="activeTab = 'pending'"
        >
          À valider ({{ pending.length }})
        </button>
        <button
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'live' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-primary'
          ]"
          @click="activeTab = 'live'"
        >
          En vente ({{ live.length }})
        </button>
        <button
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-primary'
          ]"
          @click="activeTab = 'all'"
        >
          Tous les lots
        </button>
      </div>

      <!-- Pending Lots -->
      <div v-if="activeTab === 'pending'" class="mt-4">
        <div v-if="pending.length === 0" class="rounded-lg border border-border bg-card p-6">
          <p class="py-12 text-center text-neutral-500">
            Aucun lot en attente de validation.
          </p>
        </div>
        <div v-else class="flex flex-col gap-3">
          <Card v-for="lot in pending" :key="lot.id" class="py-0">
            <CardContent class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div class="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                <img
                  :src="lot.image || '/placeholder.svg'"
                  :alt="lot.title"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="flex-1">
                <span class="text-xs text-neutral-500">
                  {{ lot.category }} · {{ lot.sellerName }}
                </span>
                <h3 class="font-serif text-lg font-semibold text-primary">
                  {{ lot.title }}
                </h3>
                <p class="line-clamp-1 text-sm text-neutral-500">
                  {{ lot.description || 'Sans description' }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-xs text-neutral-500">Mise à prix</p>
                <p class="font-bold text-accent">
                  {{ appStore.formatPrice(lot.startingPrice) }}
                </p>
              </div>
              <div class="flex gap-2">
                <Button size="sm" variant="outline" class="gap-1.5" @click="rejectLot(lot)">
                  <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Refuser
                </Button>
                <Button size="sm" class="gap-1.5" @click="approveLot(lot)">
                  <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Valider
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Live Lots -->
      <div v-else-if="activeTab === 'live'" class="mt-4">
        <div v-if="live.length === 0" class="rounded-lg border border-border bg-card p-6">
          <p class="py-12 text-center text-neutral-500">
            Aucune vente en cours.
          </p>
        </div>
        <div v-else>
          <LotTable :lots="live" action-label="Clôturer / adjuger" @action="closeLot" />
        </div>
      </div>

      <!-- All Lots -->
      <div v-else class="mt-4">
        <LotTable :lots="appStore.lots" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import StatCard from '@/components/StatCard.vue'
import LotTable from '@/components/LotTable.vue'

const appStore = useAppStore()

const activeTab = ref('pending')

const pending = computed(() => appStore.lots.filter(l => l.status === 'pending'))
const live = computed(() => appStore.lots.filter(l => l.status === 'live'))

const stats = computed(() => {
  const totalValue = appStore.lots.filter(l => l.status === 'live').reduce((sum, l) => sum + l.currentBid, 0)
  return {
    pending: pending.value.length,
    live: live.value.length,
    total: appStore.lots.length,
    totalValue,
  }
})

function approveLot(lot) {
  appStore.updateLotStatus(lot.id, 'live')
}

function rejectLot(lot) {
  appStore.updateLotStatus(lot.id, 'rejected')
}

function closeLot(lot) {
  appStore.updateLotStatus(lot.id, 'sold')
}
</script>
