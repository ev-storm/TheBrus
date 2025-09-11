<template>
  <div class="main-container">
    <div class="b1">
      <img src="/public/img/work.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
// Страница конструктора
useHead({
  title: "Конструктор - TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Конструктор проектов TheBrus - создавайте свои проекты с помощью нашего инструмента",
    },
    {
      name: "keywords",
      content: "конструктор, создание проектов, инструмент, веб-разработка",
    },
    { property: "og:title", content: "Конструктор - TheBrus" },
    { property: "og:description", content: "Конструктор проектов TheBrus" },
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
