<template>
  <header
    class="h-[var(--header-height)] bg-background/60 backdrop-blur-lg z-2 p-4 flex items-center border-b border-b-border"
  >
    <RouterLink to="/" class="flex items-center gap-3 p-2 rounded-lg">
      <img src="/wand-art-logo.svg" alt="Logo" class="h-8 w-auto" />
      <span class="font-bold text-xl">Wand Art</span>
    </RouterLink>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<style></style>
