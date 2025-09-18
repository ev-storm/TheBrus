import { ref, computed } from "vue";

/**
 * Composable для автоматической загрузки планов из папки plan
 * @param {string} imagesFolder - путь к папке с изображениями
 * @returns {Object} - объект с планами и методами
 */
export function usePlanLoader(imagesFolder) {
  const plans = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Функция для получения всех планов из папки plan
  const loadPlans = () => {
    if (!imagesFolder) {
      error.value = "Путь к папке с изображениями не указан";
      return [];
    }

    try {
      // Получаем все изображения из папки plan
      const imageModules = import.meta.glob(
        "/public/img/**/plan/*.{jpg,jpeg,png,webp}",
        {
          eager: true,
          as: "url",
        }
      );

      const plansList = [];

      // Фильтруем только планы из нужной папки
      Object.keys(imageModules).forEach((path) => {
        if (path.startsWith(`/public${imagesFolder}/plan/`)) {
          // Убираем /public из пути для использования в браузере
          const browserPath = path.replace("/public", "");

          // Проверяем, что файл действительно существует
          try {
            const imageUrl = imageModules[path];
            if (imageUrl) {
              plansList.push(browserPath);
              console.log(`Found plan: ${browserPath}`);
            } else {
              console.warn(`Plan not found: ${browserPath}`);
            }
          } catch (error) {
            console.warn(`Error loading plan ${browserPath}:`, error);
          }
        }
      });

      // Сортируем планы по имени файла
      plansList.sort((a, b) => {
        const aName = a.split("/").pop().split(".")[0];
        const bName = b.split("/").pop().split(".")[0];

        // Извлекаем числа из имени файла для правильной сортировки
        const aNum = parseInt(aName.replace(/\D/g, "")) || 0;
        const bNum = parseInt(bName.replace(/\D/g, "")) || 0;

        if (aNum !== bNum) {
          return aNum - bNum;
        }

        // Если числа одинаковые, сортируем по полному имени
        return aName.localeCompare(bName);
      });

      plans.value = plansList;
      return plansList;
    } catch (err) {
      error.value = `Ошибка загрузки планов: ${err.message}`;
      console.error("Ошибка загрузки планов:", err);
      return [];
    }
  };

  // Computed для получения количества планов
  const planCount = computed(() => plans.value.length);

  return {
    plans,
    isLoading,
    error,
    planCount,
    loadPlans,
  };
}
