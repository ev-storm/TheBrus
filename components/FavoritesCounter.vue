<template>
  <span v-if="favoritesCount > 0" class="favorites-count">
    ({{ favoritesCount }})
  </span>
</template>

<script setup>
// Функциональность избранного с cookies
const { favoritesCount } = useFavorites();
</script>
