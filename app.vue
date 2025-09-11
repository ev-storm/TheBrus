<script setup>
const isLoading = ref(true);
const progress = ref(0);
let timerId;

onMounted(() => {
  // Simulate initial loading progress on client
  timerId = setInterval(() => {
    progress.value = Math.min(95, progress.value + 5);
  }, 120);

  // Finish initial load
  setTimeout(() => {
    clearInterval(timerId);
    progress.value = 100;
    setTimeout(() => {
      isLoading.value = false;
    }, 200);
  }, 600);
});

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
});

// Route change overlay (client only) - отключено
// onNuxtReady(() => {
//   const router = useRouter();
//   router.beforeEach(() => {
//     isLoading.value = true;
//     progress.value = 10;
//   });
//   router.afterEach(() => {
//     progress.value = 100;
//     setTimeout(() => {
//       isLoading.value = false;
//     }, 150);
//   });
// });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <LoadingOverlay :show="isLoading" :progress="progress" />
  </NuxtLayout>
</template>
