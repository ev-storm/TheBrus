<template>
  <div class="main-container">
    <div class="b1">
      <img src="/public/img/work.svg" alt="" />
    </div>
    <TestMap />
  </div>
</template>

<script setup>
// Страница контактов
useHead({
  title: "Контакты - TheBrus",
  meta: [
    {
      name: "description",
      content: "Контакты проекта TheBrus - свяжитесь с нами для сотрудничества",
    },
    {
      name: "keywords",
      content: "контакты, связь, обратная связь, сотрудничество",
    },
    { property: "og:title", content: "Контакты - TheBrus" },
    { property: "og:description", content: "Контакты проекта TheBrus" },
    { property: "og:type", content: "website" },
  ],
});
</script>

<style scoped>
.b1 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.b1 svg {
  width: 300px;
}
</style>
