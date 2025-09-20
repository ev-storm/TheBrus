import { ref, onMounted, onUnmounted } from "vue";
import { useMenuManager } from "./useMenuManager";

export const useMenu = (menuType = "left") => {
  const isOpen = ref(false);
  const menuRef = ref(null);

  const eventName = menuType === "left" ? "toggleMenu" : "toggleRightMenu";

  const openMenu = () => {
    isOpen.value = true;

    if (menuType === "right") {
      const { openRightMenu } = useMenuManager();
      openRightMenu();
    } else {
      const { openLeftMenu } = useMenuManager();
      openLeftMenu();
    }
  };

  const closeMenu = () => {
    isOpen.value = false;

    if (menuType === "right") {
      const { closeRightMenu } = useMenuManager();
      closeRightMenu();
    } else {
      const { closeLeftMenu } = useMenuManager();
      closeLeftMenu();
    }
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
    if (!isOpen.value) {
      return;
    }

    if (
      event.target.classList.contains("trigger") ||
      event.target.closest(".trigger")
    ) {
      return;
    }

    if (
      event.target.classList.contains("order-btn") ||
      event.target.closest(".order-btn")
    ) {
      return;
    }

    if (
      event.target.classList.contains("swap-plan") ||
      event.target.closest(".swap-plan")
    ) {
      return;
    }

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
