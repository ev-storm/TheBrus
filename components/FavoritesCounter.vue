<template>
  <span v-if="favoritesCount > 0" class="favorites-count">
    ({{ favoritesCount }})
  </span>
</template>

<script setup>
import { computed } from "vue";

// Функциональность избранного с cookies
const { getFavoritesCount } = useFavorites();

// Реактивный счетчик избранного
const favoritesCount = computed(() => getFavoritesCount());
</script>
