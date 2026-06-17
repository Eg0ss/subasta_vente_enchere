<template>
  <div
    :class="[
      'inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition-colors',
      variantClasses,
      $attrs.class
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default': // accent (orange ambre pour statut actif)
      return 'bg-accent text-primary border-transparent'
    case 'success': // vert pour statuts positifs
      return 'bg-success text-white border-transparent'
    case 'secondary': // gris
      return 'bg-muted text-primary border-transparent'
    case 'destructive': // rouge pour statuts négatifs
      return 'bg-danger text-white border-transparent'
    case 'outline':
      return 'bg-transparent text-primary border-border'
    default:
      return 'bg-accent text-primary border-transparent'
  }
})
</script>
