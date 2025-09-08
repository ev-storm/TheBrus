<template>
  <div class="main-container">
    <h1>Портфолио</h1>
    <p>Здесь будут представлены наши работы</p>
  </div>
</template>

<script setup>
// Страница портфолио
useHead({
  title: "Портфолио - TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Портфолио работ проекта TheBrus - примеры наших проектов и достижений",
    },
    { name: "keywords", content: "портфолио, проекты, работы, веб-разработка" },
    { property: "og:title", content: "Портфолио - TheBrus" },
    { property: "og:description", content: "Портфолио работ проекта TheBrus" },
    { property: "og:type", content: "website" },
  ],
});
</script>
