export default defineNuxtPlugin((nuxtApp) => {
  // Перехватываем предупреждения Vue Router для путей к изображениям
  if (process.client) {
    console.log("Router fix plugin loaded");

    // Перехватываем предупреждения Vue Router
    const originalWarn = console.warn;

    const shouldBlockMessage = (message) => {
      return (
        typeof message === "string" &&
        message.includes("No match found for location with path") &&
        (message.includes("/img/") ||
          message.includes(".jpg") ||
          message.includes(".png") ||
          message.includes(".jpeg") ||
          message.includes(".webp"))
      );
    };

    console.warn = (...args) => {
      if (shouldBlockMessage(args[0])) {
        // Логируем заблокированные предупреждения для отладки
        console.log("🚫 Blocked router warning:", args[0]);
        console.trace("Call stack for blocked warning:");
        return;
      }
      originalWarn.apply(console, args);
    };
  }
});
