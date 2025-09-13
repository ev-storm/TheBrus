<template>
  <div
    ref="navLeftRef"
    class="nav-left"
    :class="{ open: isOpen }"
    @click.stop
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="nav-left-container">
      <div class="nav-left-content">
        <div class="nav-top-menu"></div>
        <nav class="nav-left-menu">
          <ul>
            <ul>
              <NuxtLink class="main-link" to="/portfolio">Каталог</NuxtLink>
              <li>
                <NuxtLink class="sub-link" to="/portfolio?tab=order"
                  >Заказать готовое решение</NuxtLink
                >
              </li>
              <li>
                <NuxtLink class="sub-link" to="/portfolio?tab=portfolio"
                  >Выполненые проекты</NuxtLink
                >
              </li>
            </ul>
            <ul>
              <NuxtLink class="main-link" to="/constructor"
                >Конструктор</NuxtLink
              >
              <li>
                <NuxtLink class="sub-link" to="/constructor"
                  >Создать индивидуальный проект</NuxtLink
                >
              </li>
            </ul>
            <ul>
              <NuxtLink class="main-link" to="/">О компании</NuxtLink>
              <li>
                <NuxtLink class="sub-link" to="/">Наш подход</NuxtLink>
              </li>
              <li>
                <NuxtLink class="sub-link" to="/">Документация</NuxtLink>
              </li>
            </ul>
            <ul>
              <NuxtLink class="main-link" to="/contacts">Контакты</NuxtLink>
              <li>
                <NuxtLink class="sub-link" to="/contacts"
                  >Реквезиты компании</NuxtLink
                >
              </li>
              <li>
                <NuxtLink class="sub-link" to="/contacts"
                  >Наша команда</NuxtLink
                >
              </li>
              <li>
                <NuxtLink class="sub-link" to="/contacts">Локация</NuxtLink>
              </li>
            </ul>
          </ul>
        </nav>
        <div class="nav-left-footer">
          <button class="btn">Войти</button>
          <!-- <p>Выгодные условия для зарегестрированных пользователей</p> -->
          <span>TheBrus © 2025 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useMenu } from "~/composables/useMenu";
import { useMenuManager } from "~/composables/useMenuManager";

const { isOpen, menuRef: navLeftRef, updatePosition } = useMenu("left");
const { leftMenuOpen } = useMenuManager();

// Переменные для обработки свайпа
const touchStartX = ref(0);
const touchStartY = ref(0);
const isSwipeStarted = ref(false);

// Функции для обработки свайпа
const handleTouchStart = (event) => {
  if (!isOpen.value) return;

  const touch = event.touches[0];
  touchStartX.value = touch.clientX;
  touchStartY.value = touch.clientY;
  isSwipeStarted.value = false;
};

const handleTouchMove = (event) => {
  if (!isOpen.value) return;

  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  // Проверяем, что это горизонтальный свайп (больше движения по X, чем по Y)
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    isSwipeStarted.value = true;
    // Предотвращаем скролл страницы при свайпе
    event.preventDefault();
  }
};

const handleTouchEnd = (event) => {
  if (!isOpen.value || !isSwipeStarted.value) return;

  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX.value;

  // Если свайп влево (в сторону закрытия) больше 50px, закрываем меню
  if (deltaX < -50) {
    isOpen.value = false;
  }

  isSwipeStarted.value = false;
};

// Синхронизируем состояние с глобальным менеджером
watch(leftMenuOpen, (newValue) => {
  if (!newValue && isOpen.value) {
    // Если глобальное состояние закрыто, но локальное открыто - закрываем локальное
    isOpen.value = false;
  }
});
</script>

<style scoped>
.nav-top-menu {
  height: 20%;
}
.nav-left {
  position: fixed;
  top: 0;
  left: 0;
  width: clamp(300px, 20%, 350px);
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(150px);
  z-index: 998;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: 0 0 20px #0000004a;
}

.nav-left.open {
  transform: translateX(0%);
  opacity: 1;
}

.nav-left-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
}

.nav-left-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.nav-left-menu {
  height: 60%;
}
.nav-left-menu ul {
  margin: 10% 0;
}
.nav-left-menu ul li {
  line-height: 1;
}
.nav-left-menu ul li a {
  line-height: 1.7;
  font-size: clamp(10px, 1vw, 13px) !important;
}

.main-link {
  font-size: clamp(14px, 1vw, 18px);
  margin: 5% 0;
}

.sub-link {
  color: #ffffff8e !important;
  font-size: clamp(8px, 1vw, 10px);
  font-weight: 400 !important;
  transition: var(--tran);
}
.sub-link:hover {
  color: #ffffffb7 !important;
}
.main-link:hover {
  padding-left: 2%;
}

.nav-left-menu a,
.nav-left-menu a:visited {
  color: var(--font);

  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-left-menu a.router-link-active {
  color: var(--green);
}
.nav-left-footer {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.nav-left-footer button {
  width: 100%;
}
.nav-left-footer p {
  color: #ffffffc1;
  margin: 4% 0;
  font-size: clamp(8px, 0.5vw, 10px);
}
.nav-left-footer span {
  color: #ffffff7e;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 4% 0;
  font-size: clamp(10px, 0.8vw, 12px);
}
@media (max-width: 768px) {
  .main-link {
    font-size: 20px;
  }
  .nav-left-menu ul li a.sub-link {
    font-size: 14px !important;
    line-height: 2;
  }
}
</style>
