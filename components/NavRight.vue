<template>
  <div
    ref="navRightRef"
    class="nav-right"
    :class="{ open: isOpen }"
    @click.stop
  >
    <div class="nav-right-container">
      <div class="nav-right-content">
        <div class="nav-top-menu">
          <h3>+7 910 989-26-79</h3>
          <div class="soc">
            <img src="/public/svg/button/soc/white/wt.svg" alt="" />
            <img src="/public/svg/button/soc/white/tg.svg" alt="" />
            <img src="/public/svg/button/soc/white/mail.svg" alt="" />
            <img src="/public/svg/button/soc/white/max.svg" alt="" />
          </div>
        </div>
        <div class="nav-right-menu">
          <!-- <h1>Обратная<br />связь</h1> -->
          <FormNav />
        </div>
        <div class="nav-right-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMenu } from "~/composables/useMenu";

const { isOpen, menuRef: navRightRef, updatePosition } = useMenu("right");
</script>

<style scoped>
.nav-top-menu {
  height: 20%;
}

.nav-right {
  position: fixed;
  top: 0;
  right: 0;
  width: clamp(300px, 20%, 350px);
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(150px);
  z-index: 9999;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: 0 0 20px #0000004a;
}

.nav-right.open {
  transform: translateX(0%);
  opacity: 1;
}

.nav-right-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
}
.nav-top-menu h3 {
  font-weight: 400;
  width: 100%;
  text-align: end;
  margin: 10% 0;
}
.nav-top-menu .soc {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.nav-top-menu .soc img {
  width: 1vw;
  min-width: 20px;
}
.nav-right-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-right-menu {
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav-right-menu h1 {
  text-align: end;
  font-weight: 300;
  font-size: var(--fs-p);
  width: 80%;
}

.nav-right-menu ul {
  margin: 10% 0;
}

.nav-right-footer {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
