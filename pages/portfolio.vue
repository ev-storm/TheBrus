<script setup>
import { ref, computed, watch } from "vue";
import FavoritesCounter from "~/components/FavoritesCounter.vue";

// Страница портфолио
useHead({
  title: "Портфолио - TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Портфолио работ проекта TheBrus - примеры наших проектов и достижений",
    },
    { name: "keywords", content: "портфолио, проекты, работы, веб-разработка" },
    { property: "og:title", content: "Портфолио - TheBrus" },
    { property: "og:description", content: "Портфолио работ проекта TheBrus" },
    { property: "og:type", content: "website" },
  ],
});
// Импортируем данные напрямую как модули
import productsData from "~/data/products.js";
import portfolioData from "~/data/portfoli.js";

// Используем импортированные данные
const products = ref(productsData);
const portfolio = ref(portfolioData);

console.log("Products loaded:", products.value?.length || 0);
console.log("Portfolio loaded:", portfolio.value?.length || 0);

// Используем useState для SSR-совместимого состояния
const activeTab = useState("portfolio-activeTab", () => "order");
const sortBy = useState("portfolio-sortBy", () => null);
const showFavorites = useState("portfolio-showFavorites", () => false);

// Функциональность избранного
const { isFavorite } = useFavorites();

// Функциональность для работы с ID карточек
const { getCardId } = useCardId();

const items = computed(() => {
  console.log("items computed вызвана");
  let data =
    (activeTab.value === "order" ? products.value : portfolio.value) || [];

  // Отладка для понимания проблемы
  if (process.dev) {
    console.log("items computed:", {
      activeTab: activeTab.value,
      productsLength: products.value?.length || 0,
      portfolioLength: portfolio.value?.length || 0,
      dataLength: data.length,
      showFavorites: showFavorites.value,
      isClient: process.client,
    });
  }

  // Фильтрация по избранному
  if (showFavorites.value) {
    console.log("Фильтрация по избранному включена");
    const originalLength = data.length;
    data = data.filter((item) => {
      const cardId = getCardId(item, activeTab.value);
      const isFav = isFavorite(cardId);
      console.log(
        `Карточка ${cardId}: ${isFav ? "в избранном" : "не в избранном"}`
      );
      return isFav;
    });
    console.log(`Отфильтровано: ${originalLength} -> ${data.length} карточек`);
  }

  // Сортируем если нужно
  if (!sortBy.value) return data;

  const sortedData = [...data];

  switch (sortBy.value) {
    case "price-asc":
      return sortedData.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedData.sort((a, b) => b.price - a.price);
    case "area-asc":
      return sortedData.sort((a, b) => a.area - b.area);
    case "area-desc":
      return sortedData.sort((a, b) => b.area - a.area);
    default:
      return data;
  }
});

function showOrder() {
  activeTab.value = "order";
  sortBy.value = null; // сброс фильтра при смене таба
  showFavorites.value = false; // сброс избранного при смене таба
}
function showPortfolio() {
  activeTab.value = "portfolio";
  sortBy.value = null; // сброс фильтра при смене таба
  showFavorites.value = false; // сброс избранного при смене таба
}

function toggleFavorites() {
  console.log(
    "toggleFavorites вызвана, текущее состояние:",
    showFavorites.value
  );
  showFavorites.value = !showFavorites.value;
  console.log("toggleFavorites новое состояние:", showFavorites.value);
  sortBy.value = null; // сброс сортировки при переключении избранного
}

function sortByPrice() {
  if (sortBy.value === "price-asc") {
    sortBy.value = "price-desc";
  } else {
    sortBy.value = "price-asc";
  }
}

function sortByArea() {
  if (sortBy.value === "area-asc") {
    sortBy.value = "area-desc";
  } else {
    sortBy.value = "area-asc";
  }
}
</script>

<template>
  <div class="main-container">
    <div class="b1">
      <div class="b1-text">
        <h1>
          {{ activeTab === "order" ? "Выбирай мечту" : "Построили мечту" }}
        </h1>
        <div>
          <p>Выгодные условия для пришедших по совету друзей и знакомых</p>
          <button class="btn">Подробней о реферальной программе</button>
        </div>
      </div>
    </div>
    <div class="b2">
      <div class="catalog-btn-con">
        <div class="catalog-btn">
          <button
            class="btn order"
            :class="{ active: activeTab === 'order' }"
            @click="showOrder"
          >
            Заказать готовое решение
          </button>
          <button
            class="btn portfolio"
            :class="{ active: activeTab === 'portfolio' }"
            @click="showPortfolio"
          >
            Выполненые проекты
          </button>
        </div>
        <div class="catalog-filter" v-if="activeTab === 'order'">
          <div
            class="filter-item like-show"
            :class="{ active: showFavorites }"
            @click="toggleFavorites"
          >
            Избранное
            <ClientOnly>
              <FavoritesCounter />
            </ClientOnly>
          </div>
          <div class="filter-marg">|</div>
          <div
            class="filter-item price"
            :class="{
              active: sortBy === 'price-asc' || sortBy === 'price-desc',
              'sort-asc': sortBy === 'price-asc',
              'sort-desc': sortBy === 'price-desc',
            }"
            @click="sortByPrice"
          >
            <span v-if="sortBy === 'price-asc'" class="sort-arrow"
              >&#9650;</span
            >
            <span v-if="sortBy === 'price-desc'" class="sort-arrow"
              >&#9660;</span
            >
            Цена
          </div>
          <div class="filter-marg">|</div>
          <div
            class="filter-item year"
            :class="{
              active: sortBy === 'area-asc' || sortBy === 'area-desc',
              'sort-asc': sortBy === 'area-asc',
              'sort-desc': sortBy === 'area-desc',
            }"
            @click="sortByArea"
          >
            <span v-if="sortBy === 'area-asc'" class="sort-arrow">&#9650;</span>
            <span v-if="sortBy === 'area-desc'" class="sort-arrow"
              >&#9660;</span
            >
            Площадь
          </div>
        </div>
      </div>
      <div class="catalog-con" v-if="items && items.length > 0">
        <ProductCard
          v-for="item in items"
          :key="getCardId(item, activeTab)"
          :title="item.name"
          :price="item.price"
          :area="item.area"
          :img1="item.img1"
          :img2="item.img2"
          :img3="item.img3"
          :img4="item.img4"
          :img5="item.img5"
          :description="item.description"
          :pdf="item.pdf"
          :hideActions="activeTab === 'portfolio'"
          :cardId="getCardId(item, activeTab)"
        />
      </div>

      <!-- Сообщение для пустого состояния избранного -->
      <div
        v-if="showFavorites && items && items.length === 0"
        class="empty-favorites"
      >
        <div class="empty-favorites-content">
          <h3>Вы пока не добавили в избранное</h3>
          <p>
            Добавьте понравившиеся проекты в избранное, чтобы они отображались
            здесь
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.b1 {
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: end;
  background-image: url("/public/img/catalog/1.png");
  background-size: 1700px;
  background-position: top;
  background-attachment: fixed;
  position: relative;
}
.b1::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #00000021;
  pointer-events: none;
  z-index: 1;
}
.b1-text {
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  padding: 0 5%;
}
.b1-text div {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: end;
}
.b1-text h1 {
  text-transform: none;
  font-weight: 500;
  font-size: clamp(50px, 8vw, 100px);
}
.b1-text div p {
  text-align: end;
  font-weight: 500;
  color: #fff;
  margin: 10% 0;
  font-size: clamp(16px, 2vw, 22px);
}
.b1-text div button {
  font-size: clamp(10px, 1vw, 14px);
}
.b2 {
  width: 100%;
  padding-bottom: 20vh;
}
.catalog-btn-con {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.catalog-btn .btn {
  background: transparent;
}
.catalog-btn .btn:focus {
  background: var(--green);
}
.catalog-btn .btn.active {
  background: var(--green);
}
.catalog-filter {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}
.filter-item {
  color: #9f9f9f;
  cursor: pointer;
  transition: var(--tran);
  display: flex;
  align-items: center;
  gap: 5px;
}
.filter-marg {
  color: #9f9f9f;
}
.filter-item:hover {
  color: #ffffff;
}
.filter-item.active {
  color: var(--green, #65c36c);
}
.sort-arrow {
  font-size: 12px;
  font-weight: bold;
}
.favorites-count {
  font-size: 12px;
  opacity: 0.7;
  margin-left: 5px;
}
.catalog-con {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px 24px;
}
.filter-item span {
  font-size: 15px;
  line-height: 1;
  color: var(--green);
  font-weight: 500;
}
@media (max-width: 1100px) {
  .catalog-con {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .catalog-con {
    grid-template-columns: 1fr;
  }
}

/* Стили для пустого состояния избранного */
.empty-favorites {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 40px 20px;
}

.empty-favorites-content {
  text-align: center;
  max-width: 400px;
}

.empty-favorites-content h3 {
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 16px;
}

.empty-favorites-content p {
  font-size: 16px;
  color: #9f9f9f;
  line-height: 1.5;
  margin: 0;
}
</style>
