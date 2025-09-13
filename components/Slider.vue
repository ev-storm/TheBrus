<template>
  <swiper
    :slidesPerView="slidesPerView"
    :spaceBetween="spaceBetween"
    :speed="1000"
    :modules="modules"
    class="mySwiper"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="breakpoints"
  >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="index"
      :class="{
        'first-visible': index === firstVisibleIndex,
        'last-visible': index === lastVisibleIndex,
      }"
      @mouseenter="onSlideHover(index)"
      @mouseleave="onSlideLeave"
    >
      <img class="slide-img" :src="slide.img" :alt="slide.text" />
      <div class="slide-text-con">
        <img :src="slide.imgText" alt="" />
        <span>{{ slide.text }}</span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperInstance = ref(null);
    const firstVisibleIndex = ref(0);
    const lastVisibleIndex = ref(4); // 5 слайдов на экран, последний индекс = 4
    let hoverTimeout = null;

    // Адаптивные параметры для разных размеров экрана
    const slidesPerView = ref(4);
    const spaceBetween = ref(30);

    const breakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    };

    const slides = [
      {
        text: "Полную заинтересованность всей команды в результате — вашем  комфортном доме",
        img: "/img/index/slider/1.png",
        imgText: "/img/index/slider/svg/1.svg",
      },
      {
        text: "Применение оптимальных, проверенных и совместимых технологий и материалов",
        img: "/img/index/slider/2.png",
        imgText: "/img/index/slider/svg/2.svg",
      },
      {
        text: "Строгое соответствие всех строительно-монтажных процессов нормам и стандартам",
        img: "/img/index/slider/3.png",
        imgText: "/img/index/slider/svg/3.svg",
      },
      {
        text: "Многоуровневый контроль качества на каждом этапе опытными специалистами",
        img: "/img/index/slider/4.png",
        imgText: "/img/index/slider/svg/4.svg",
      },
      {
        text: "Качественную отделку и сдачу объекта, которые не потребуют последующих переделок",
        img: "/img/index/slider/5.png",
        imgText: "/img/index/slider/svg/5.svg",
      },
      {
        text: "Полную заинтересованность всей команды в результате — вашем  комфортном доме",
        img: "/img/index/slider/1.png",
        imgText: "/img/index/slider/svg/1.svg",
      },
      {
        text: "Применение оптимальных, проверенных и совместимых технологий и материалов",
        img: "/img/index/slider/2.png",
        imgText: "/img/index/slider/svg/2.svg",
      },
      {
        text: "Строгое соответствие всех строительно-монтажных процессов нормам и стандартам",
        img: "/img/index/slider/3.png",
        imgText: "/img/index/slider/svg/3.svg",
      },
      {
        text: "Многоуровневый контроль качества на каждом этапе опытными специалистами",
        img: "/img/index/slider/4.png",
        imgText: "/img/index/slider/svg/4.svg",
      },
      {
        text: "Качественную отделку и сдачу объекта, которые не потребуют последующих переделок",
        img: "/img/index/slider/5.png",
        imgText: "/img/index/slider/svg/5.svg",
      },
    ];

    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
      updateVisibleSlides();
    };

    const onSlideChange = () => {
      updateVisibleSlides();
    };

    const onSlideHover = (index) => {
      // Проверяем, что это не мобильное устройство
      if (window.innerWidth <= 768) {
        return;
      }

      console.log(
        "Hover on slide:",
        index,
        "First visible:",
        firstVisibleIndex.value,
        "Last visible:",
        lastVisibleIndex.value
      );

      // Очищаем предыдущий таймер, если он есть
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }

      // Устанавливаем задержку 300ms перед перелистыванием
      hoverTimeout = setTimeout(() => {
        if (swiperInstance.value) {
          if (index === firstVisibleIndex.value) {
            // При наведении на первый видимый слайд - идем влево
            console.log("Going left");
            swiperInstance.value.slidePrev();
          } else if (index === lastVisibleIndex.value) {
            // При наведении на последний видимый слайд - идем вправо
            console.log("Going right");
            swiperInstance.value.slideNext();
          }
        }
      }, 100);
    };

    const onSlideLeave = () => {
      // Отменяем перелистывание при уходе курсора
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
    };

    const updateVisibleSlides = () => {
      if (swiperInstance.value) {
        const activeIndex = swiperInstance.value.activeIndex;
        const slidesPerView = swiperInstance.value.params.slidesPerView;
        const totalSlides = slides.length;

        firstVisibleIndex.value = activeIndex;
        lastVisibleIndex.value = Math.min(
          activeIndex + slidesPerView - 1,
          totalSlides - 1
        );
      }
    };

    return {
      modules: [],
      slides,
      firstVisibleIndex,
      lastVisibleIndex,
      slidesPerView,
      spaceBetween,
      breakpoints,
      onSwiper,
      onSlideChange,
      onSlideHover,
      onSlideLeave,
    };
  },
};
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 350px;
}
.swiper-slide {
  background: var(--green);
  transition: var(--tran);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  justify-content: flex-end;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 10% 100%, 0 90%);
}

.slide-img {
  width: auto;
  height: 101%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: -3%;
  transition: all 0.4s ease-in-out;
  transform: translate(-1px, -1px);
  box-shadow: 0 0 10px #0216347b;
}
.swiper-slide:hover .slide-img {
  transform: translateY(-25%);
}
.first-visible:hover .slide-img {
  transform: translateY(0);
}
.last-visible:hover .slide-img {
  transform: translateY(0);
}

.first-visible,
.last-visible {
  transform: scale(0.8);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.slide-text-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2% 10%;
  align-items: center;
}
.slide-text-con span {
  text-align: end;
  font-size: 14px;
  width: 80%;
  line-height: 1.2;
}
.slide-text-con img {
  width: 20%;
}

/* Мобильная адаптация слайдера */
@media (max-width: 768px) {
  .mySwiper {
    height: 300px;
  }

  .swiper-slide {
    clip-path: polygon(0 0, 100% 0, 100% 95%, 95% 100%, 5% 100%, 0 95%);
  }

  .slide-text-con {
    display: flex;
    padding: 3% 3%;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    flex-direction: row;
  }

  .slide-text-con span {
    text-align: center;
    font-size: 16px;
    width: 100%;
    line-height: 1.4;
  }

  .slide-text-con img {
    width: 20%;
    max-width: 80px;
  }

  .slide-img {
    left: -5%;
    width: 110%;
  }

  .swiper-slide:hover .slide-img {
    transform: translateY(-35%);
  }
}
</style>
