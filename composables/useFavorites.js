export const useFavorites = () => {
  // Используем useCookie для SSR-совместимого хранения
  const favoritesCookie = useCookie("favorites", {
    default: () => [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    maxAge: 60 * 60 * 24 * 365, // 1 год
    sameSite: "lax",
    secure: true,
  });

  // Функция для добавления/удаления из избранного
  const toggleFavorite = (itemId) => {
    const currentFavorites = [...favoritesCookie.value];
    const index = currentFavorites.indexOf(itemId);

    if (index > -1) {
      // Удаляем из избранного
      currentFavorites.splice(index, 1);
    } else {
      // Добавляем в избранное
      currentFavorites.push(itemId);
    }

    // Обновляем cookie
    favoritesCookie.value = currentFavorites;
  };

  // Функция для проверки, находится ли элемент в избранном
  const isFavorite = (itemId) => {
    return favoritesCookie.value.includes(itemId);
  };

  // Функция для получения количества избранных
  const getFavoritesCount = () => {
    return favoritesCookie.value.length;
  };

  // Функция для очистки избранного
  const clearFavorites = () => {
    favoritesCookie.value = [];
  };

  return {
    favorites: favoritesCookie,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
  };
};
