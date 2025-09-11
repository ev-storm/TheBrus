/**
 * Composable для генерации уникальных ID карточек
 * Решает проблему с привязкой лайков к индексу при сортировке
 */

export const useCardId = () => {
  /**
   * Генерирует уникальный ID для карточки
   * @param {Object} item - объект карточки
   * @param {string} tab - активная вкладка (order/portfolio)
   * @returns {string} уникальный ID карточки
   */
  const getCardId = (item, tab) => {
    if (!item || !tab) {
      console.warn("useCardId: item или tab не определены", { item, tab });
      return "unknown";
    }

    // Используем комбинацию таба и имени для уникальности
    // Это гарантирует, что ID не изменится при сортировке
    const baseId = `${tab}-${item.name}`;

    // Дополнительно добавляем хеш для большей уникальности
    // если имена могут повторяться в разных табах
    const hash = item.price ? item.price.toString() : "0";
    return `${baseId}-${hash}`;
  };

  /**
   * Извлекает информацию из ID карточки
   * @param {string} cardId - ID карточки
   * @returns {Object} объект с информацией о карточке
   */
  const parseCardId = (cardId) => {
    if (!cardId) return null;

    const parts = cardId.split("-");
    if (parts.length < 2) return null;

    return {
      tab: parts[0],
      name: parts.slice(1, -1).join("-"), // имя может содержать дефисы
      hash: parts[parts.length - 1],
    };
  };

  /**
   * Проверяет, принадлежит ли карточка к определенной вкладке
   * @param {string} cardId - ID карточки
   * @param {string} tab - вкладка для проверки
   * @returns {boolean}
   */
  const isCardFromTab = (cardId, tab) => {
    const parsed = parseCardId(cardId);
    return parsed && parsed.tab === tab;
  };

  /**
   * Получает все ID карточек для определенной вкладки
   * @param {Array} items - массив карточек
   * @param {string} tab - вкладка
   * @returns {Array} массив ID карточек
   */
  const getCardIdsForTab = (items, tab) => {
    if (!Array.isArray(items) || !tab) return [];
    return items.map((item) => getCardId(item, tab));
  };

  return {
    getCardId,
    parseCardId,
    isCardFromTab,
    getCardIdsForTab,
  };
};
