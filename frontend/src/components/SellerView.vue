<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="font-serif text-3xl font-semibold text-primary">Mes lots</h1>
        <p class="text-neutral-500">
          Gérez vos mises en vente et suivez les enchères.
        </p>
      </div>
      <CreateLotDialog />
    </div>

    <!-- Stats -->
    <div class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="Lots déposés" :value="String(stats.total)" />
      <StatCard label="En vente" :value="String(stats.live)" />
      <StatCard label="Enchères reçues" :value="String(stats.bids)" />
      <StatCard label="Produit des ventes" :value="appStore.formatPrice(stats.revenue)" />
    </div>

    <!-- Lots List -->
    <div class="mt-8 flex flex-col gap-3">
      <div v-if="myLots.length === 0" class="rounded-lg border border-border bg-card p-6">
        <p class="py-12 text-center text-neutral-500">
          Vous n'avez encore aucun lot. Cliquez sur "Mettre un lot en vente" pour commencer.
        </p>
      </div>
      <Card v-else v-for="lot in myLots" :key="lot.id" class="overflow-hidden py-0">
        <CardContent class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div class="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              :src="lot.image || '/placeholder.svg'"
              :alt="lot.title"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <Badge :variant="appStore.STATUS_VARIANTS[lot.status]">
                {{ appStore.STATUS_LABELS[lot.status] }}
              </Badge>
              <span class="text-xs text-neutral-500">
                {{ lot.category }}
              </span>
            </div>
            <h3 class="mt-1 font-serif text-lg font-semibold text-primary">
              {{ lot.title }}
            </h3>
            <p class="text-sm text-neutral-500">
              {{ lot.status === 'live' ? `Clôture dans ${appStore.timeLeft(lot.endsAt)}` : lot.status === 'pending' ? 'En attente de validation' : appStore.STATUS_LABELS[lot.status] }}
            </p>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right">
              <p class="text-xs text-neutral-500">
                {{ lot.bids.length > 0 ? 'Meilleure enchère' : 'Mise à prix' }}
              </p>
              <p class="font-bold text-accent">
                {{ appStore.formatPrice(lot.currentBid) }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Retirer le lot"
              @click="handleRemove(lot)"
            >
              <svg class="size-4 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import CreateLotDialog from '@/components/CreateLotDialog.vue'
import StatCard from '@/components/StatCard.vue'

const appStore = useAppStore()

const myLots = computed(() => appStore.lots.filter(l => l.seller === appStore.user?.email))

const stats = computed(() => {
  const live = myLots.value.filter(l => l.status === 'live').length
  const revenue = myLots.value.filter(l => l.status === 'sold').reduce((sum, l) => sum + l.currentBid, 0)
  const bids = myLots.value.reduce((sum, l) => sum + l.bids.length, 0)
  return { live, revenue, bids, total: myLots.value.length }
})

function handleRemove(lot) {
  if (confirm(`Retirer le lot "${lot.title}" ?`)) {
    appStore.removeLot(lot.id)
  }
}
</script>
