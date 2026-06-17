<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      sizeClasses,
      variantClasses,
      $attrs.class,
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // default = primary (bleu marine) pour boutons secondaires
  },
  size: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default': // primary (bleu marine)
      return 'bg-primary text-white hover:bg-primary/90'
    case 'accent': // orange ambre (SEULEMENT pour enchères/actions principales liées à l'argent
      return 'bg-accent text-primary hover:bg-accent/90'
    case 'secondary': // gris
      return 'bg-muted text-primary hover:bg-muted/80'
    case 'outline':
      return 'border border-border bg-white hover:bg-muted'
    case 'ghost':
      return 'hover:bg-muted'
    case 'destructive':
      return 'bg-danger text-white hover:bg-danger/90'
    default:
      return 'bg-primary text-white hover:bg-primary/90'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-3 text-xs'
    case 'lg':
      return 'h-11 px-8'
    case 'icon':
      return 'h-9 w-9'
    default:
      return 'h-10 px-4 py-2'
  }
})
</script>
