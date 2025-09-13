import { ref, onMounted, onUnmounted } from "vue";

// Глобальное состояние меню
const leftMenuOpen = ref(false);
const rightMenuOpen = ref(false);

export const useMenuManager = () => {
  const openLeftMenu = () => {
    // Закрываем правое меню, если оно открыто
    if (rightMenuOpen.value) {
      closeRightMenu();
    }
    leftMenuOpen.value = true;
    window.dispatchEvent(
      new CustomEvent("toggleMenu", {
        detail: { isOpen: true },
      })
    );
  };

  const closeLeftMenu = () => {
    leftMenuOpen.value = false;
    window.dispatchEvent(
      new CustomEvent("toggleMenu", {
        detail: { isOpen: false },
      })
    );
  };

  const openRightMenu = () => {
    // Закрываем левое меню, если оно открыто
    if (leftMenuOpen.value) {
      closeLeftMenu();
    }
    rightMenuOpen.value = true;
    window.dispatchEvent(
      new CustomEvent("toggleRightMenu", {
        detail: { isOpen: true },
      })
    );
  };

  const closeRightMenu = () => {
    rightMenuOpen.value = false;
    window.dispatchEvent(
      new CustomEvent("toggleRightMenu", {
        detail: { isOpen: false },
      })
    );
  };

  const toggleLeftMenu = () => {
    if (leftMenuOpen.value) {
      closeLeftMenu();
    } else {
      openLeftMenu();
    }
  };

  const toggleRightMenu = () => {
    if (rightMenuOpen.value) {
      closeRightMenu();
    } else {
      openRightMenu();
    }
  };

  // Слушаем события закрытия меню
  const handleLeftMenuClose = (event) => {
    leftMenuOpen.value = event.detail.isOpen;
  };

  const handleRightMenuClose = (event) => {
    rightMenuOpen.value = event.detail.isOpen;
  };

  onMounted(() => {
    window.addEventListener("toggleMenu", handleLeftMenuClose);
    window.addEventListener("toggleRightMenu", handleRightMenuClose);
  });

  onUnmounted(() => {
    window.removeEventListener("toggleMenu", handleLeftMenuClose);
    window.removeEventListener("toggleRightMenu", handleRightMenuClose);
  });

  return {
    leftMenuOpen,
    rightMenuOpen,
    openLeftMenu,
    closeLeftMenu,
    openRightMenu,
    closeRightMenu,
    toggleLeftMenu,
    toggleRightMenu,
  };
};
