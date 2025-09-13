export default defineNuxtPlugin(() => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } catch (err) {
      console.error("Ошибка копирования в буфер обмена:", err);
      return { success: false, error: err };
    }
  };

  return {
    provide: {
      copyToClipboard,
    },
  };
});
