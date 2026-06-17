<template>
  <Dialog :open="!!lot" @update:open="$emit('update:open', false)">
    <DialogHeader>
      <DialogTitle>{{ lot?.title }}</DialogTitle>
      <DialogDescription>{{ lot?.category }}</DialogDescription>
    </DialogHeader>

    <div class="mb-4">
      <img
        :src="lot?.image || '/placeholder.svg'"
        :alt="lot?.title"
        class="w-full h-64 object-cover rounded-lg bg-muted"
      />
    </div>

    <p class="text-neutral-500 mb-6">{{ lot?.description }}</p>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="p-4 rounded-lg bg-muted">
        <p class="text-xs text-neutral-500 mb-1">Prix actuel</p>
        <p class="font-bold text-2xl text-accent">{{ appStore.formatPrice(lot?.currentBid || 0) }}</p>
      </div>
      <div class="p-4 rounded-lg bg-muted">
        <p class="text-xs text-neutral-500 mb-1">Temps restant</p>
        <p class="font-bold text-2xl text-accent">{{ lot ? appStore.timeLeft(lot.endsAt) : '' }}</p>
      </div>
    </div>

    <div class="mb-6">
      <h4 class="text-sm font-semibold text-primary mb-3">Historique des enchères</h4>
      <div class="space-y-2">
        <div v-for="bid in sortedBids" :key="bid.id" class="flex justify-between items-center p-3 rounded-lg bg-muted">
          <div>
            <p class="text-sm font-medium text-primary">{{ bid.bidder }}</p>
            <p class="text-xs text-neutral-500">{{ formatBidTime(bid.at) }}</p>
          </div>
          <p class="font-bold text-accent">{{ appStore.formatPrice(bid.amount) }}</p>
        </div>
        <div v-if="sortedBids.length === 0" class="text-center text-neutral-500 py-4">
          Aucune enchère pour le moment
        </div>
      </div>
    </div>

    <div v-if="lot?.status === 'live'" class="flex gap-3">
      <Input
        v-model="bidAmount"
        type="number"
        :min="minBid"
        :placeholder="`Enchère minimum: ${appStore.formatPrice(minBid)}`"
        class="flex-1"
      />
      <Button variant="accent" @click="placeBid" :disabled="!canBid">Enchérir</Button>
    </div>
    <div v-else class="text-center">
      <Badge :variant="appStore.STATUS_VARIANTS[lot?.status]">
        {{ appStore.STATUS_LABELS[lot?.status] }}
      </Badge>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Dialog from '@/components/ui/Dialog.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'

const props = defineProps({
  lot: Object
})

defineEmits(['update:open'])

const appStore = useAppStore()
const bidAmount = ref('')

const minBid = computed(() => (props.lot?.currentBid || 0) + 50)
const canBid = computed(() => Number(bidAmount.value) >= minBid.value)
const sortedBids = computed(() => {
  if (!props.lot) return []
  return [...props.lot.bids].sort((a, b) => new Date(b.at) - new Date(a.at))
})

function placeBid() {
  if (props.lot && canBid.value) {
    appStore.placeBid(props.lot.id, Number(bidAmount.value))
    bidAmount.value = ''
  }
}

function formatBidTime(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
