<template>
  <label :for="for" :class="['text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50', $attrs.class]">
    <slot />
  </label>
</template>

<script setup>
defineProps({
  for: String,
})
</script>
