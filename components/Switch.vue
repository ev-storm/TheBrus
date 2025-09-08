<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="switch" :class="{ 'switch--on': modelValue }" @click="toggle">
    <div class="switch__toggle"></div>
  </div>
</template>

<style scoped>
.switch {
  width: 30px;
  height: 15px;
  background-color: transparent;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #fafafa;
}

.switch__toggle {
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  border-color: transparent;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s ease;
}

.switch--on {
  background-color: var(--green);
  border-color: transparent;
}

.switch--on .switch__toggle {
  transform: translateX(14px);
}
</style>
