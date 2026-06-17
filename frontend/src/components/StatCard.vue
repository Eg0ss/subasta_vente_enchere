<template>
  <Card :class="highlight ? 'border-accent' : ''">
    <CardContent class="py-4">
      <p class="text-xs uppercase tracking-wide text-neutral-500">{{ label }}</p>
      <p class="mt-1 font-serif text-2xl font-semibold text-primary">{{ value }}</p>
    </CardContent>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'

defineProps({
  label: String,
  value: String,
  highlight: Boolean
})
</script>
