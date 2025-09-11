<template>
  <div class="like" @click="handleLikeClick">
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      :fill="isLiked ? '#65c36c' : 'none'"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.44922 7.37151C1.44922 13.2691 7.69933 17.2464 10.9942 19.7086C14.0354 17.3411 20.5392 12.038 20.5392 7.37151C20.5392 4.08309 18.0845 1.4173 15.0566 1.4173C13.4458 1.4173 11.9973 2.17168 10.9942 3.37286C9.99112 2.17168 8.5426 1.4173 6.93183 1.4173C3.90387 1.4173 1.44922 4.08309 1.44922 7.37151Z"
        :stroke="isLiked ? '#65c36c' : 'white'"
        stroke-width="1.3"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  cardId: { type: [String, Number], required: true },
});

// Функциональность избранного с cookies
const { favorites, toggleFavorite, isFavorite } = useFavorites();

// Проверяем, находится ли карточка в избранном
const isLiked = computed(() => isFavorite(props.cardId));

// Обработчик клика по лайку
const handleLikeClick = () => {
  console.log("FavoritesButton clicked for cardId:", props.cardId);
  console.log("Current favorites before toggle:", favorites.value);
  toggleFavorite(props.cardId);
  console.log("Current favorites after toggle:", favorites.value);
};
</script>
