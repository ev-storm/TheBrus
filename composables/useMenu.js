import { ref, onMounted, onUnmounted } from "vue";

export const useMenu = (menuType = "left") => {
  const isOpen = ref(false);
  const menuRef = ref(null);

  const eventName = menuType === "left" ? "toggleMenu" : "toggleRightMenu";

  const openMenu = () => {
    isOpen.value = true;
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { isOpen: true },
      })
    );
  };

  const closeMenu = () => {
    isOpen.value = false;
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { isOpen: false },
      })
    );
  };

  const toggleMenu = () => {
    if (isOpen.value) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleToggleMenu = (event) => {
    isOpen.value = event.detail.isOpen;
  };

  const handleClickOutside = (event) => {
    // Если меню закрыто, не обрабатываем клики
    if (!isOpen.value) {
      return;
    }

    // Не закрываем меню, если клик по кнопке trigger или её дочерним элементам
    if (
      event.target.classList.contains("trigger") ||
      event.target.closest(".trigger")
    ) {
      return;
    }

    // Не закрываем меню, если клик по кнопке "Заказать" или её дочерним элементам
    if (
      event.target.classList.contains("order-btn") ||
      event.target.closest(".order-btn")
    ) {
      return;
    }

    // Закрываем меню только если клик вне его области
    if (menuRef.value && !menuRef.value.contains(event.target)) {
      closeMenu();
    }
  };

  const updatePosition = () => {
    if (menuRef.value) {
      const mainContainer = document.querySelector(".main-container");
      if (mainContainer) {
        const containerRect = mainContainer.getBoundingClientRect();

        if (menuType === "left") {
          const leftPosition = containerRect.left;
          menuRef.value.style.left = `${leftPosition}px`;
        } else {
          const rightPosition = window.innerWidth - containerRect.right;
          menuRef.value.style.right = `${rightPosition}px`;
        }
      }
    }
  };

  onMounted(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    window.addEventListener(eventName, handleToggleMenu);
    // Добавляем обработчик click outside с задержкой, чтобы избежать конфликтов
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside, { passive: true });
    }, 200);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition);
    window.removeEventListener(eventName, handleToggleMenu);
    document.removeEventListener("click", handleClickOutside);
  });

  return {
    isOpen,
    menuRef,
    openMenu,
    closeMenu,
    toggleMenu,
    updatePosition,
  };
};
