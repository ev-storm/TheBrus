<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
});

const phrases = ref([
  "Фундамент — это основа долговечности: экономия здесь дороже обходится.",
  "Точность в миллиметрах сегодня — комфорт на годы завтра.",
  "Правильный проект экономит материалы, время и нервы.",
  "Сухое дерево — половина успеха в деревянном домостроении.",
  "Каркас крепок не количеством, а правильной геометрией.",
  "Гидроизоляция — маленький слой, который спасает большой дом.",
  "Вентиляция — невидимая, но самая важная инженерия.",
  "Угол не прощает компромиссов: проверяй уровни чаще.",
  "Хорошая кровля — когда о ней не вспоминают десятилетиями.",
  "Строим не стены, а пространство для жизни.",
  "Каждый саморез на своём месте — меньше скрипов и деформаций.",
  "Тёплые окна начинаются с грамотного монтажа, а не только профиля.",
  "Смета — не враг, а план: чем точнее, тем спокойнее стройка.",
  "Проект — это 90% успеха; стройка — реализация.",
  "Проверяй — измеряй — закрепляй: три шага хорошей сборки.",
]);

const phrase = computed(() => {
  const list = phrases.value || [];
  if (!Array.isArray(list) || list.length === 0) return "";
  const index = Math.floor(Math.random() * list.length);
  return list[index];
});

const progressSafe = computed(() => {
  if (typeof props.progress !== "number" || isNaN(props.progress)) return 0;
  return Math.min(100, Math.max(0, Math.round(props.progress)));
});
</script>

<template>
  <div v-if="show" class="overlay">
    <div class="center">
      <img src="/svg/loader/1.svg" alt="" class="spinner" />
    </div>

    <div class="bottom-left">
      <div class="percent">{{ progressSafe }}%</div>
      <div class="bar">
        <div class="fill" :style="{ width: progressSafe + '%' }"></div>
      </div>
    </div>

    <div class="bottom-right" v-if="phrase">
      <div class="quote">{{ phrase }}</div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: #1b1b1b;
  z-index: 9999;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spinner {
  width: 100px;
  height: 100px;
}

.bottom-left {
  position: absolute;
  left: 5%;
  bottom: 5%;
  width: 30%;
}
.percent {
  color: #ffffff;
  font-size: clamp(20px, 8vw, 100px);
}
.bar {
  width: 100%;
  height: 15px;
  background: rgb(200, 200, 200);
  overflow: hidden;
}
.fill {
  height: 100%;
  background: var(--green, #65c36c);
  width: 0;
  transition: width 200ms ease;
}
.bottom-right {
  position: absolute;
  right: 5%;
  top: 5%;
  width: 40%;
}
.quote {
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(20px, 3vw, 30px);
  line-height: 1.4;
  text-align: right;
  font-family: var(--font-accent);
  font-weight: 300;
}
</style>
