<template>
  <div class="soc">
    <NuxtImg src="/svg/button/soc/white/wt.svg" alt="WhatsApp" loading="lazy" />
    <NuxtImg src="/svg/button/soc/white/tg.svg" alt="Telegram" loading="lazy" />
    <NuxtImg src="/svg/button/soc/white/mail.svg" alt="Email" loading="lazy" />
    <NuxtImg src="/svg/button/soc/white/max.svg" alt="Max" loading="lazy" />
  </div>
</template>

<script setup>
// Компонент социальных сетей
</script>

<style scoped>
.soc {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.soc img {
  width: 1vw;
  min-width: 20px;
}
</style>
