<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/40" @click="$emit('update:open', false)"></div>
      <div :class="['relative z-50 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg', $attrs.class]">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  open: Boolean,
})
</script>
