<template>
  <div class="main-container">
    <div class="b1">
      <div class="slider-container">
        <img class="house-img" :src="currentImage" :alt="houseTitle" />

        <!-- Индикаторы -->
        <div class="slider-indicators" v-if="productImages.length > 1">
          <button
            v-for="(image, index) in productImages"
            :key="index"
            class="indicator"
            :class="{ active: index === currentImageIndex }"
            @click="goToImage(index)"
          ></button>
        </div>
      </div>
    </div>
    <div class="b2">
      <div class="b2-title">
        <h1 class="house-title">{{ houseTitle || "Название Проекта" }}</h1>
        <div>
          <button class="btn pdf" @click="downloadPDF" :disabled="!pdfUrl">
            Скачать презентацию
          </button>
          <button class="btn">Заказать</button>
        </div>
      </div>
      <div class="b2-content">
        <div class="house-spec">
          <div class="price">
            <h2>{{ formattedPrice || "9 700 000 ₽" }}</h2>
          </div>
          <div class="area">
            <p>{{ area || "203" }} м²</p>
          </div>
          <div class="item-con">
            <div class="item bad"><p>3 Спальни</p></div>
            <div class="item san"><p>2 Санузла</p></div>
            <div class="item gard"><p>1 Гардеробная</p></div>
          </div>
          <button class="btn">Изменить планировку</button>
        </div>
        <div class="house-text">
          <p class="house-description">
            {{
              description ||
              "Описание проекта будет добавлено в ближайшее время."
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="b3">
      <div class="b3-title">
        <h3>Что входит в стоимость</h3>
      </div>
      <div class="b3-text-con">
        <div class="b3-text">
          <h3 class="b3-item fund">Фундамент</h3>
          <ul>
            <li
              data="Топографическая съемка — это комплекс инженерно-геодезических работ по измерению участка местности и занесению в топографический план данных об особенностях рельефа, положении всех объектов и расстоянии между ними."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Геодезические исследования (топосъемка) участка
            </li>
            <li
              data="Геологические исследования грунта включают в себя бурение скважин, отбор проб грунта, лабораторные испытания для определения несущей способности, состава и свойств грунтов на участке строительства."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Геологические исследования грунта
            </li>
            <li
              data="Проект КЖ (конструкции железобетонные) включает в себя расчеты и чертежи фундамента, перекрытий, лестниц и других железобетонных конструкций здания."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Проект КЖ
            </li>
            <li
              data="Привязка осей на местности — это процесс переноса проектных координат и размеров с чертежей на реальный участок строительства с помощью геодезических инструментов."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Привязка осей на местности
            </li>
            <li
              data="Бетон B25 (М350) — это тяжелый бетон класса прочности B25, соответствующий марке М350. Используется для фундаментов и несущих конструкций."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Бетон B25 (М350)
            </li>
            <li
              data="Монолитный железобетонный ростверк — это горизонтальная конструкция, объединяющая сваи в единую систему и распределяющая нагрузку от здания на сваи."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Монолитный ж/б ростверк
            </li>
            <li
              data="Забивные железобетонные сваи — это готовые железобетонные конструкции, которые забиваются в грунт для создания прочного фундамента."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Забивные ж/б сваи
            </li>
            <li
              data="Закладные под коммуникации — это специальные элементы, закладываемые в бетон для последующего подключения инженерных систем."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Закладные под коммуникации
            </li>
            <li>Приемка инженером технического надзора</li>
          </ul>
        </div>
        <div class="b3-text">
          <h3 class="b3-item sten">Стеновой комплект</h3>
          <ul>
            <li
              data="Рабочий проект КД (конструкции деревянные) включает в себя детальные чертежи всех деревянных конструкций здания с указанием размеров, материалов и способов соединения."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Рабочий проект КД
            </li>
            <li
              data="Подкладочная доска из лиственницы — это доска, укладываемая под первый венец сруба для защиты от влаги и гниения. Лиственница обладает высокой стойкостью к гниению."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Подкладочная доска из лиственницы
            </li>
            <li
              data="Брус клееный стеновой — это высококачественный материал из склеенных между собой досок. Обладает высокой прочностью, стабильностью размеров и не подвержен растрескиванию."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Брус клееный стеновой производства GOOD WOOD, сечение 175х185(h),
              немецкий профиль бруса
            </li>
            <li
              data="Балки и столбы сухие, клееные, строганые — это несущие элементы каркаса здания, изготовленные из сухой древесины с точной обработкой поверхности."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Балки и столбы сухие, клееные, строганые
            </li>
            <li
              data="Комплектующие, фурнитура — это крепежные элементы, соединители, уголки и другие детали, необходимые для сборки деревянных конструкций."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Комплектующие, фурнитура
            </li>
            <li
              data="Лестница межэтажная черновая однопролетная — это временная лестница для перемещения между этажами во время строительства."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Лестница межэтажная черновая однопролетная
            </li>
            <li
              data="Доставка стенового комплекта — это транспортировка всех элементов стенового комплекта на строительную площадку."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Доставка стенового комплекта
            </li>
            <li
              data="Сборка стенового комплекта — это монтаж всех элементов стенового комплекта согласно проектной документации."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Сборка стенового комплекта
            </li>
            <li
              data="Приемка инженером технического надзора — это контроль качества выполненных работ и соответствие их проектной документации."
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @mousemove="handleMouseMove"
            >
              Приемка инженером технического надзора
            </li>
          </ul>
        </div>
        <div class="b3-text">
          <h3 class="b3-item crov">Кровля</h3>
          <ul>
            <li>Рабочий проект КД кровли</li>
            <li>Стропила сухие</li>
            <li>
              Универсальная диффузионная мембрана DELTA-XX PLUS® UNIVERSAL
            </li>
            <li>Комплектующие, фурнитура</li>
            <li>Водосточная система Aquasystem</li>
            <li>Трубчатая система снегозадержания</li>
            <li>Техническая вентиляция</li>
            <li>Подшивная доска для свесов кровли</li>
            <li>Доставка</li>
            <li>Сборка</li>
            <li>Приемка инженером технического надзора</li>
          </ul>
        </div>
        <div class="b3-text">
          <h3 class="b3-item okn">Окна и двери</h3>
          <ul>
            <li>ПВХ-профиль 70мм и фурнитура</li>
            <li>
              Стеклопакеты энергосберегающие многофункциональные
              4Solar-14ChUAr-4-14ChUAr-4LowE
            </li>
            <li>Входная дверь</li>
            <li>Комплектующие</li>
            <li>Внешние наличники</li>
            <li>Монтаж</li>
            <li>Приемка инженером технического надзора</li>
          </ul>
        </div>
        <div class="b3-text">
          <h3 class="b3-item lk">Личный кабинет</h3>
          <ul>
            <li>Мониторинг хода строительства</li>
          </ul>
        </div>
        <div class="b3-text">
          <h3 class="b3-item stroy">Сопровождение строительства</h3>
          <ul>
            <li>Организация проживания рабочих (бытовка)</li>
            <li>Подключение бытовки к электричеству</li>
            <li>Организация биотуалета</li>
            <li>Вывоз мусора</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.b1 {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.b1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

/* Индикаторы */
.slider-indicators {
  position: absolute;
  bottom: 20px;
  right: 5%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.584);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.indicator.active {
  background: white;
}

.indicator:hover {
  border-color: white;
}
.b2 {
  width: 100%;
  padding: 0 5%;
}
.b2-title {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.b2-title h1 {
  text-transform: none;
  font-family: var(--font-primary);
  font-size: var(--fs-1);
  font-weight: 500;
}
.b2-title .pdf {
  background: transparent;
}

.b2-title .pdf:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Tooltip стили */
.tooltip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
  z-index: 10000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 2px solid #65c36c;
}

.tooltip.show {
  opacity: 1;
}

/* Стили для элементов списка с tooltip */
.b3-item ul li {
  position: relative;
  cursor: help;
  transition: color 0.3s ease;
}

.b3-item ul li:hover {
  color: #65c36c;
}
.b2-content {
  display: flex;
  width: 100%;
}
.house-spec {
  width: 30%;
}
.house-text {
  width: 70%;
}
.house-text p {
  color: var(--grey);
  font-size: clamp(13px, 0.7vw, 15px);
  line-height: 1.8;
}
.house-spec .price h2 {
  color: var(--green);
}
.house-spec .item p {
  color: #fff;
}
.item-con {
  margin: 30px 0;
}
.item {
  margin: 10px 0;
  display: flex;
}
.item-con .bad::before {
  content: url(/public/svg/cart/1.svg);
  margin-right: 10px;
}
.item-con .san::before {
  content: url(/public/svg/cart/2.svg);
  margin-right: 10px;
}
.item-con .gard::before {
  content: url(/public/svg/cart/3.svg);
  margin-right: 10px;
}

.b3 {
  width: 100%;
  margin-bottom: 20vh;
}
.b3-title {
  width: 100%;
  padding: 0 5%;
  height: 20vh;
  display: flex;
  align-items: center;
}
.b3-text-con {
  padding: 0 5%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 50px;
}
.b3-text {
  width: 38%;
}
.b3-text h3 {
  font-weight: 400;
}
.b3-text ul li {
  line-height: 2.3;
  font-weight: 400;
  cursor: pointer;
  color: var(--grey);
}
.b3-text h1 {
  display: flex;
}
.b3-text ul li:hover {
  color: #fff;
}
.fund::before {
  content: url(/public/svg/cart/item/1.svg);
  margin-right: 20px;
}
.sten::before {
  content: url(/public/svg/cart/item/2.svg);
  margin-right: 20px;
}
.crov::before {
  content: url(/public/svg/cart/item/3.svg);
  margin-right: 20px;
}
.okn::before {
  content: url(/public/svg/cart/item/4.svg);
  margin-right: 20px;
}
.lk::before {
  content: url(/public/svg/cart/item/6.svg);
  margin-right: 20px;
}
.stroy::before {
  content: url(/public/svg/cart/item/5.svg);
  margin-right: 20px;
}
</style>

<script setup>
import { computed, ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import productsData from "~/data/products.js";

const route = useRoute();

// Получаем данные из query параметров
const houseTitle = ref(route.query.houseTitle || "");
const price = ref(route.query.price || "");
const area = ref(route.query.area || "");
const houseImg = ref(route.query.houseImg || "");
const description = ref(route.query.description || "");
const pdfUrl = ref(route.query.pdf || "");

// Данные продукта
const productData = ref(null);

// Слайдер изображений
const currentImageIndex = ref(0);
const productImages = ref([]);

// Получаем данные конкретного продукта
const getProductData = () => {
  // Если передан houseImg, ищем продукт по этому изображению
  if (houseImg.value) {
    const product = productsData.find(
      (p) =>
        p.img1 === houseImg.value ||
        p.img2 === houseImg.value ||
        p.img3 === houseImg.value
    );
    if (product) {
      return product;
    }
  }

  // Если не найден, берем первый продукт
  return productsData[0];
};

// Получаем изображения конкретного продукта
const getProductImages = () => {
  const product = getProductData();
  return [product.img1, product.img2, product.img3].filter(Boolean);
};

// Инициализируем данные
onMounted(() => {
  // Получаем данные продукта для изображений
  productData.value = getProductData();

  // Если description и pdf не переданы в query, берем из данных продукта
  if (!description.value) {
    description.value = productData.value?.description || "";
  }
  if (!pdfUrl.value) {
    pdfUrl.value = productData.value?.pdf || "";
  }

  // Получаем изображения
  productImages.value = getProductImages();

  // Если переданное изображение есть в списке, начинаем с него
  if (houseImg.value) {
    const index = productImages.value.findIndex(
      (img) => img === houseImg.value
    );
    if (index !== -1) {
      currentImageIndex.value = index;
    }
  }

  // Обработчики событий для tooltip теперь добавлены через Vue директивы в template
});

// Функция перехода к изображению
const goToImage = (index) => {
  currentImageIndex.value = index;
};

// Функция скачивания PDF
const downloadPDF = () => {
  if (pdfUrl.value) {
    // Создаем ссылку для скачивания
    const link = document.createElement("a");
    link.href = pdfUrl.value;
    link.download = `${houseTitle.value || "presentation"}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.warn("PDF файл не найден");
  }
};

// Tooltip функциональность
const tooltip = ref(null);

const showTooltip = (event, text) => {
  console.log("showTooltip вызвана с текстом:", text);
  if (!text) return;

  // Удаляем существующий tooltip
  hideTooltip();

  // Создаем новый tooltip
  tooltip.value = document.createElement("div");
  tooltip.value.className = "tooltip";
  tooltip.value.textContent = text;
  tooltip.value.style.position = "fixed";
  tooltip.value.style.background = "rgba(0, 0, 0, 0.15)";
  tooltip.value.style.color = "white";
  tooltip.value.style.padding = "12px 16px";
  tooltip.value.style.borderRadius = "0px";
  tooltip.value.style.fontSize = "12px";
  tooltip.value.style.lineHeight = "1.8";
  tooltip.value.style.maxWidth = "300px";
  tooltip.value.style.zIndex = "10000";
  tooltip.value.style.pointerEvents = "none";
  tooltip.value.style.opacity = "0";
  tooltip.value.style.backdropFilter = "blur(150px)";
  tooltip.value.style.transition = "opacity 0.3s ease";
  tooltip.value.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";

  document.body.appendChild(tooltip.value);
  console.log("Tooltip создан и добавлен в DOM");

  // Позиционируем tooltip рядом с курсором
  setTimeout(() => {
    if (tooltip.value) {
      const tooltipRect = tooltip.value.getBoundingClientRect();

      // Позиционируем справа сверху от курсора
      let left = event.clientX + 10;
      let top = event.clientY - tooltipRect.height - 10;

      // Проверяем, не выходит ли tooltip за границы экрана
      if (left + tooltipRect.width > window.innerWidth) {
        left = event.clientX - tooltipRect.width - 10;
      }

      if (top < 0) {
        top = event.clientY + 10;
      }

      tooltip.value.style.left = left + "px";
      tooltip.value.style.top = top + "px";
      tooltip.value.style.opacity = "1";
      console.log("Tooltip показан рядом с курсором");
    }
  }, 10);
};

const hideTooltip = () => {
  if (tooltip.value) {
    tooltip.value.remove();
    tooltip.value = null;
  }
};

const handleMouseEnter = (event) => {
  console.log("Mouse enter на элемент:", event.target.textContent);
  const text = event.target.getAttribute("data");
  console.log("Data атрибут:", text);

  if (text) {
    showTooltip(event, text);
  } else {
    console.log("Нет data атрибута у элемента");
  }
};

const handleMouseLeave = () => {
  console.log("Mouse leave");
  hideTooltip();
};

const handleMouseMove = (event) => {
  if (tooltip.value && tooltip.value.style.opacity === "1") {
    const tooltipRect = tooltip.value.getBoundingClientRect();

    // Позиционируем справа сверху от курсора
    let left = event.clientX + 10;
    let top = event.clientY - tooltipRect.height - 10;

    // Проверяем, не выходит ли tooltip за границы экрана
    if (left + tooltipRect.width > window.innerWidth) {
      left = event.clientX - tooltipRect.width - 10;
    }

    if (top < 0) {
      top = event.clientY + 10;
    }

    tooltip.value.style.left = left + "px";
    tooltip.value.style.top = top + "px";
  }
};

// Текущее изображение
const currentImage = computed(() => {
  return (
    productImages.value[currentImageIndex.value] ||
    houseImg.value ||
    "/public/img/1.jpg"
  );
});

// Форматируем цену
const formattedPrice = computed(() => {
  if (!price.value) return "";
  const numeric =
    typeof price.value === "number"
      ? price.value
      : Number(String(price.value).replace(/\D/g, ""));
  if (!isFinite(numeric)) return String(price.value);
  return new Intl.NumberFormat("ru-RU").format(numeric) + " ₽";
});

// SEO мета-теги
useHead({
  title: houseTitle.value || "Заказать дом - TheBrus",
  meta: [
    {
      name: "description",
      content: houseTitle.value
        ? `Проект дома ${houseTitle.value} площадью ${area.value} м² за ${formattedPrice.value}`
        : "Контакты проекта TheBrus - свяжитесь с нами для сотрудничества",
    },
    {
      name: "keywords",
      content: "контакты, связь, обратная связь, сотрудничество, заказать дом",
    },
    { property: "og:title", content: houseTitle.value || "Контакты - TheBrus" },
    {
      property: "og:description",
      content: houseTitle.value
        ? `Проект дома ${houseTitle.value}`
        : "Контакты проекта TheBrus",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
