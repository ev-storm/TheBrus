<template>
  <div class="layout">
    <Nav />
    <NavLeft />
    <NavRight />
    <main>
      <slot />
    </main>
    <Footer />

    <!-- Cookie баннер -->
    <Banner
      v-if="showCookieBanner"
      message="Мы используем Cookie"
      :duration="0"
      @close="closeCookieBanner"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Banner from "~/components/Banner.vue";

// Cookie баннер
const showCookieBanner = ref(false);

const closeCookieBanner = () => {
  showCookieBanner.value = false;
  // Сохраняем в localStorage, что пользователь принял cookies
  localStorage.setItem("cookiesAccepted", "true");
};

onMounted(() => {
  // Проверяем, принимал ли пользователь cookies ранее
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");
  if (!cookiesAccepted) {
    // Показываем баннер с небольшой задержкой для плавности
    setTimeout(() => {
      showCookieBanner.value = true;
    }, 1000);
  }
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
