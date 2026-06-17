<template>
  <div class="flex items-center gap-3">
    <div class="relative">
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Circle ring (navy) -->
        <path
          d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C66 90 79.5 80.5 85 67"
          stroke="#0C2340"
          stroke-width="9"
          stroke-linecap="round"
        />
        <!-- Circle ring (amber) -->
        <path
          d="M50 10 C72.1 10 90 27.9 90 50 C90 66 80.5 79.5 67 85"
          stroke="#F2A93B"
          stroke-width="9"
          stroke-linecap="round"
        />
        
        <!-- Gavel head (amber) -->
        <path d="M64 34 L76 46 L60 62 L48 50 L64 34 Z" fill="#F2A93B"/>
        
        <!-- Gavel head (navy ends) -->
        <rect x="38" y="40" width="18" height="18" rx="4" fill="#0C2340" transform="rotate(-45 47 49)"/>
        <rect x="68" y="38" width="18" height="18" rx="4" fill="#0C2340" transform="rotate(-45 77 47)"/>
        
        <!-- Gavel handle -->
        <path
          d="M54 56 Q60 62 78 80 Q81 83 77 87 Q73 91 70 88 L52 70 Q48 66 52 62 Q55 59 54 56 Z"
          fill="#0C2340"
        />
        
        <!-- Gavel base -->
        <ellipse cx="50" cy="84" rx="24" ry="5.5" fill="#F2A93B"/>
        <rect x="34" y="84" width="32" height="9" rx="3" fill="#0C2340"/>
      </svg>
    </div>
    <div class="flex flex-col">
      <span class="font-serif text-2xl font-bold tracking-tight">
        <span class="text-accent">S</span><span class="text-primary">ubasta</span>
      </span>
      <span class="text-xs text-neutral-500 tracking-[0.2em] uppercase flex items-center gap-2">
        <span class="w-6 h-0.5 bg-accent"></span>
        Vente aux enchères
        <span class="w-6 h-0.5 bg-accent"></span>
      </span>
    </div>
  </div>
</template>

<script setup>
// Simple logo component
</script>
