<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard.vue";
import products from "~/data/products.js";

// Импортируем стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Берем первые 5 продуктов
const sliderProducts = products.slice(0, 5);

// Настройки Swiper
const swiperModules = [Navigation, Pagination, Autoplay];

const swiperOptions = {
  modules: swiperModules,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

const swiperRef = ref(null);

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};

const onSlideChange = () => {
  // Можно добавить дополнительную логику при смене слайда
};

// Функции для управления слайдером
const nextSlide = () => {
  if (swiperRef.value) {
    swiperRef.value.slideNext();
  }
};

const prevSlide = () => {
  if (swiperRef.value) {
    swiperRef.value.slidePrev();
  }
};
</script>

<template>
  <div class="slider-cart-con">
    <div class="slider-title">
      <h1>Наши проекты</h1>
      <div class="slider-btn">
        <button @click="prevSlide" class="nav-btn">
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button @click="nextSlide" class="nav-btn">
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="swiper-container">
      <Swiper
        :modules="swiperOptions.modules"
        :space-between="swiperOptions.spaceBetween"
        :centered-slides="swiperOptions.centeredSlides"
        :loop="swiperOptions.loop"
        :autoplay="swiperOptions.autoplay"
        :navigation="swiperOptions.navigation"
        :pagination="swiperOptions.pagination"
        :breakpoints="swiperOptions.breakpoints"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
        class="product-swiper"
      >
        <SwiperSlide
          v-for="(product, index) in sliderProducts"
          :key="index"
          class="swiper-slide"
        >
          <div class="slide-content">
            <ProductCard
              :title="product.name"
              :price="product.price"
              :area="product.area"
              :img1="product.img1"
              :img2="product.img2"
              :img3="product.img3"
              :img4="product.img4"
              :img5="product.img5"
              :sh="product.sh"
              :sh2="product.sh2"
              :sh3="product.sh3"
              :description="product.description"
              :pdf="product.pdf"
              :cardId="index"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Кастомные кнопки навигации -->

      <!-- Кастомная пагинация -->
      <div class="swiper-pagination custom-pagination"></div>
    </div>
  </div>
</template>

<style scoped>
.slider-cart-con {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
  margin: 5% 0;
  position: relative;
  overflow: hidden;
}
/* 
.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.slider-header .slider-cart-btn {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}
.slider-header h2 {
  width: 40%;
  color: white;
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 300;
  margin: 0;
} */
.slider-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 5%;
}
.slider-btn {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.swiper-container {
  position: relative;
  flex: 1;
  width: 100%;
}

.product-swiper {
  width: 100%;
  height: 100%;
}

.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-content .card {
  width: 100%;
}

/* Кнопки навигации */
.nav-btn {
  width: 100px;
  height: 100px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.nav-btn:hover {
  color: var(--green);
}

.nav-btn:active {
  transform: scale(0.95);
}

/* Кастомная пагинация */
.custom-pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 12px;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet:hover) {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--green);
  transform: scale(1.3);
}

/* Скрываем стандартные кнопки Swiper */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .slider-cart-con {
    padding: 40px 3% 30px;
  }

  .slider-title {
    flex-direction: row;
    gap: 20px;
  }

  .slider-title h1 {
    width: 100%;
  }

  .slider-btn {
    width: 100%;
    justify-content: center;
  }

  .nav-btn {
    width: 45px;
    height: 45px;
  }

  .slide-content {
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .nav-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>
