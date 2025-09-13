export const useCopyToClipboard = () => {
  const { $copyToClipboard } = useNuxtApp();

  const copyToClipboard = async (text) => {
    if (!$copyToClipboard) {
      console.error("Функция копирования не доступна");
      return { success: false, error: "Функция не доступна" };
    }

    try {
      const result = await $copyToClipboard(text);
      return result;
    } catch (err) {
      console.error("Ошибка при копировании:", err);
      return { success: false, error: err };
    }
  };

  return {
    copyToClipboard,
  };
};
