<template>
  <div class="main-container">
    <div class="b1">
      <img src="/img/work.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
// Страница конструктора
useHead({
  title: "Конструктор каркасных домов - Создать проект дома | TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Конструктор каркасных домов - создайте свой проект дома под ключ. Планировщик каркасных домов, расчет стоимости строительства каркасного дома.",
    },
    {
      name: "keywords",
      content:
        "конструктор каркасных домов, планировщик дома, создать проект каркасного дома, расчет стоимости каркасного дома, планировщик каркасного дома, проектирование каркасных домов, конструктор домов под ключ",
    },
    {
      property: "og:title",
      content: "Конструктор каркасных домов - Создать проект дома | TheBrus",
    },
    {
      property: "og:description",
      content:
        "Конструктор каркасных домов - создайте свой проект дома под ключ",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "ru_RU" },
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
