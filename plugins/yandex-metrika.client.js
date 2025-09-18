export default defineNuxtPlugin(() => {
  // Проверяем, что мы на клиентской стороне
  if (process.client) {
    // Инициализация Яндекс.Метрики на клиенте
    if (typeof window !== "undefined" && window.ym) {
      // Дополнительная настройка для SPA
      window.ym(104188545, "hit", window.location.href);
    }
  }
});
