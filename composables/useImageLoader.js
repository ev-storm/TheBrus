import { ref, computed } from "vue";

/**
 * Composable для автоматической загрузки изображений из папки
 * @param {string} imagesFolder - путь к папке с изображениями
 * @param {Array} supportedFormats - поддерживаемые форматы изображений
 * @returns {Object} - объект с изображениями и методами
 */
export function useImageLoader(
  imagesFolder,
  supportedFormats = ["jpg", "jpeg", "png", "webp"]
) {
  const images = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Функция для получения всех изображений из папки
  const loadImages = () => {
    if (!imagesFolder) {
      error.value = "Путь к папке с изображениям не указан";
      return [];
    }

    try {
      // Используем import.meta.glob для получения всех изображений из папки
      const imagesList = [];

      // Создаем паттерн для поиска всех изображений в папке
      const globPattern = `${imagesFolder}/**/*.{${supportedFormats.join(
        ","
      )}}`;

      // Получаем все изображения из всех папок (статический паттерн)
      const imageModules = import.meta.glob(
        "/public/img/**/*.{jpg,jpeg,png,webp}",
        {
          eager: true,
          as: "url",
        }
      );

      // Фильтруем только изображения из нужной папки (исключаем папку plan)
      Object.keys(imageModules).forEach((path) => {
        if (
          path.startsWith(`/public${imagesFolder}/`) &&
          !path.includes("/plan/")
        ) {
          // Убираем /public из пути для использования в браузере
          const browserPath = path.replace("/public", "");

          // Проверяем, что файл действительно существует
          try {
            const imageUrl = imageModules[path];
            if (imageUrl) {
              imagesList.push(browserPath);
            }
          } catch (error) {
            // Игнорируем ошибки загрузки
          }
        }
      });

      // Сортируем изображения по имени файла
      imagesList.sort((a, b) => {
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

      images.value = imagesList;
      return imagesList;
    } catch (err) {
      error.value = `Ошибка загрузки изображений: ${err.message}`;
      console.error("Ошибка загрузки изображений:", err);
      return [];
    }
  };

  // Computed для получения первого изображения
  const firstImage = computed(() => images.value[0] || "");

  // Computed для получения изображения по индексу
  const getImageByIndex = (index) => {
    return images.value[index] || "";
  };

  // Computed для получения количества изображений
  const imageCount = computed(() => images.value.length);

  return {
    images,
    isLoading,
    error,
    firstImage,
    imageCount,
    loadImages,
    getImageByIndex,
  };
}
