<template>
  <Card class="py-0">
    <CardContent class="p-0">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b border-border bg-muted">
            <tr>
              <th class="px-4 py-3 text-sm font-medium text-neutral-500">Lot</th>
              <th class="px-4 py-3 text-sm font-medium text-neutral-500">Vendeur</th>
              <th class="px-4 py-3 text-sm font-medium text-neutral-500">Statut</th>
              <th class="px-4 py-3 text-sm font-medium text-neutral-500 text-right">Enchère</th>
              <th class="px-4 py-3 text-sm font-medium text-neutral-500 text-right">Enchères</th>
              <th v-if="actionLabel" class="px-4 py-3 text-sm font-medium text-neutral-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lot in lots" :key="lot.id" class="border-b border-border">
              <td class="px-4 py-3 font-medium text-primary">{{ lot.title }}</td>
              <td class="px-4 py-3 text-neutral-500">{{ lot.sellerName }}</td>
              <td class="px-4 py-3">
                <Badge :variant="appStore.STATUS_VARIANTS[lot.status]">
                  {{ appStore.STATUS_LABELS[lot.status] }}
                </Badge>
              </td>
              <td class="px-4 py-3 text-right font-bold text-accent">{{ appStore.formatPrice(lot.currentBid) }}</td>
              <td class="px-4 py-3 text-right text-neutral-500">{{ lot.bids.length }}</td>
              <td v-if="actionLabel" class="px-4 py-3 text-right">
                <Button size="sm" variant="outline" @click="$emit('action', lot)">
                  {{ actionLabel }}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

const appStore = useAppStore()

defineProps({
  lots: Array,
  actionLabel: String
})

defineEmits(['action'])
</script>
