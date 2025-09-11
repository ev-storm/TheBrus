<template>
  <div class="footer-con">
    <footer class="footer">
      <div class="footer-logo">
        <img src="/public/svg/logo/logo-nav.svg" alt="" />
        <p>Все права защищены<br />2025</p>
      </div>
      <div class="footer-nav">
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/portfolio">Каталог</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/portfolio"
                >Заказать готовое решение</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="sub-link" to="/portfolio"
                >Выполненые проекты</NuxtLink
              >
            </li>
          </ul>
          <ul>
            <NuxtLink class="main-link" to="/constructor">Конструктор</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/constructor"
                >Создать индивидуальный проект</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/contacts">Контакты</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/contacts"
                >Реквезиты компании</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="sub-link" to="/contacts">Наша команда</NuxtLink>
            </li>
            <li>
              <NuxtLink class="sub-link" to="/contacts">Локация</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/">О компании</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/">Наш подход</NuxtLink>
            </li>
            <li>
              <NuxtLink class="sub-link" to="/">Документация</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-form">
        <form action="" class="form-mini">
          <input type="text" placeholder="Имя" />
          <input type="tel" placeholder="Телефон" />
          <button class="btn">Отправить</button>
        </form>
        <div class="soc">
          <img src="/public/svg/button/soc/white/wt.svg" alt="" />
          <img src="/public/svg/button/soc/white/tg.svg" alt="" />
          <img src="/public/svg/button/soc/white/mail.svg" alt="" />
          <img src="/public/svg/button/soc/white/max.svg" alt="" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer-con {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #00000033;
}
.footer {
  width: 100%;
  display: flex;
  height: 30vh;
  max-width: 1700px;
  justify-content: space-between;
  margin-top: 5vh;
  padding: 0 2%;
}
.footer-logo {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 1% 2%;
}
.footer-logo img {
  width: 80%;
}
.footer-logo p {
  color: #ffffff85;
  font-size: 15px;
}
.footer-nav {
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: stretch;
}
.sub-link {
  color: #a0a0a0;
  font-size: clamp(12px, 0.8vw, 15px);
  font-weight: 400;
}

.nav-item {
  display: flex;
  flex-direction: column;
}
.nav-item ul {
  margin-bottom: 20px;
}
.footer-form {
  width: 20%;
}
.footer-form input {
  margin: 8px 0;
  padding: 0 30px;
}

.footer-form input::placeholder {
  margin: 8px 0;
  font-size: clamp(14px, 0.8vw, 14px);
}
.footer-form button {
  width: 100%;
  margin: 8px 0;
}
.footer-form .soc {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
}
.main-link {
  transition: var(--tran);
}
.main-link:hover {
  color: var(--green);
}
.sub-link {
  transition: var(--tran);
}
.sub-link:hover {
  color: #fff;
}
</style>
