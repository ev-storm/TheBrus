<template>
  <div class="layout">
    <Nav />
    <NavLeft />
    <NavRight />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// Дефолтный layout
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
