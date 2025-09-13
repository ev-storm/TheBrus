<template>
  <button
    class="call"
    @click="
      (event) => {
        event.stopPropagation();
        openRightMenuManager();
      }
    "
  >
    <img src="/public/svg/button/phone.svg" alt="" />
  </button>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <div class="nav-logo" @click="goToHome">
        <img src="/svg/logo/logo-nav.svg" alt="TheBrus" class="logo" />
      </div>
      <div class="nav-button">
        <img
          class="nav-menu-button"
          src="/svg/button/nav/1.svg"
          alt=""
          @click.stop="toggleMenu"
        />
        <button
          class="btn trigger trigger-pc"
          @click="
            (event) => {
              event.stopPropagation();
              openRightMenuManager();
            }
          "
        >
          Написать
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMenu } from "~/composables/useMenu";
import { useMenuManager } from "~/composables/useMenuManager";
import { useRouter } from "vue-router";

const isScrolled = ref(false);
let lastScrollY = 0;
let ticking = false;
let blurTimeout = null;

// Состояние бокового меню
const isMenuOpen = ref(false);

const { toggleMenu: toggleLeftMenu } = useMenu("left");
const { openMenu: openRightMenu } = useMenu("right");
const { openLeftMenu, openRightMenu: openRightMenuManager } = useMenuManager();
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    openLeftMenu();
  } else {
    // Передаем событие в NavLeft через глобальное событие
    window.dispatchEvent(
      new CustomEvent("toggleMenu", {
        detail: { isOpen: false },
      })
    );
  }
};

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Добавляем минимальный порог для срабатывания (избегаем дрожания)
      if (scrollDifference < 5) {
        ticking = false;
        return;
      }

      // При любом скролле активируем blur
      isScrolled.value = false; // Включаем blur

      // Очищаем предыдущий таймаут
      if (blurTimeout) {
        clearTimeout(blurTimeout);
      }

      // Устанавливаем новый таймаут на 3 секунды
      blurTimeout = setTimeout(() => {
        isScrolled.value = true; // Выключаем blur через 3 секунды
      }, 3000);

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
};

const handleToggleMenuEvent = (event) => {
  isMenuOpen.value = event.detail.isOpen;
};

onMounted(() => {
  lastScrollY = window.scrollY; // Инициализируем начальную позицию
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("toggleMenu", handleToggleMenuEvent);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("toggleMenu", handleToggleMenuEvent);
  // Очищаем таймаут при размонтировании
  if (blurTimeout) {
    clearTimeout(blurTimeout);
  }
});
</script>

<style scoped>
.nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: transparent;
  backdrop-filter: blur(150px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: backdrop-filter;
}

.nav.scrolled {
  backdrop-filter: blur(0px);
  background: rgba(255, 255, 255, 0);
}

.nav-container {
  max-width: 1600px;
  margin: 0 auto;
  padding-left: clamp(40px, 10%, 50px);
  padding-right: clamp(40px, 10%, 50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}
.nav-button img {
  height: 90%;
  width: auto;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.nav-button img:active {
  transform: scale(0.95);
}

.nav-menu-button {
  cursor: pointer;
}

.nav-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  height: 40px;
  width: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-button {
  display: flex;
  align-items: center;
}
.call {
  display: none;
}
@media (max-width: 768px) {
  .trigger-pc {
    display: none;
  }
  .call {
    display: flex;
    position: fixed;
    right: 5%;
    bottom: 10%;
    border: none;
    background: var(--green);
    z-index: 9999;
    padding: 5%;
    border-radius: 100px;
    line-height: 0;
    transition: var(--tran);
    box-shadow: 0 0 20px #00000069;
  }
  .call:active {
    scale: 0.9;
  }
  .call img {
    width: 10vw;
  }
  .nav-button img {
    margin: 0;
  }
  .logo {
    height: 30px;
  }
}
</style>
