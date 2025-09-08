import { ref, onMounted, onUnmounted } from "vue";

export const useMenu = (menuType = "left") => {
  const isOpen = ref(false);
  const menuRef = ref(null);

  const eventName = menuType === "left" ? "toggleMenu" : "toggleRightMenu";

  const openMenu = () => {
    console.log(`Opening ${menuType} menu`);
    isOpen.value = true;
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { isOpen: true },
      })
    );
  };

  const closeMenu = () => {
    console.log(`Closing ${menuType} menu`);
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
    console.log(`${menuType} menu received event:`, event.detail);
    isOpen.value = event.detail.isOpen;
  };

  const handleClickOutside = (event) => {
    // Не закрываем меню, если клик по кнопке trigger или её дочерним элементам
    if (
      event.target.classList.contains("trigger") ||
      event.target.closest(".trigger")
    ) {
      console.log("Click on trigger, ignoring");
      return;
    }

    if (
      isOpen.value &&
      menuRef.value &&
      !menuRef.value.contains(event.target)
    ) {
      console.log(`Click outside detected, closing ${menuType} menu`);
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
    // Добавляем обработчик click outside с небольшой задержкой
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);
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
