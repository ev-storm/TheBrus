<template>
  <input
    type="tel"
    v-model="formattedValue"
    @input="handleInput"
    @keydown="handleKeydown"
    :placeholder="placeholder"
    :class="inputClass"
    :disabled="disabled"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  inputClass: String,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const formattedValue = ref("+7 ");

const handleInput = (event) => {
  const input = event.target;
  let value = input.value;

  // Extract only digits from the input
  let digits = value.replace(/\D/g, "");

  // Remove leading 7 if present (since we already have +7)
  if (digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  // Limit to 10 digits maximum
  digits = digits.slice(0, 10);

  // Format the number according to +7 ___ ___-__-__
  let formatted = "+7 ";

  if (digits.length > 0) {
    formatted += digits.slice(0, 3);
  }
  if (digits.length > 3) {
    formatted += " " + digits.slice(3, 6);
  }
  if (digits.length > 6) {
    formatted += "-" + digits.slice(6, 8);
  }
  if (digits.length > 8) {
    formatted += "-" + digits.slice(8, 10);
  }

  formattedValue.value = formatted;
  emit("update:modelValue", digits);
};

const handleKeydown = (event) => {
  const input = event.target;
  const cursorPosition = input.selectionStart;

  // Prevent deletion of "+7 " prefix
  if (event.key === "Backspace" && cursorPosition <= 3) {
    event.preventDefault();
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      formattedValue.value = "+7 ";
      return;
    }

    let digits = newValue.toString().replace(/\D/g, "");

    // Remove leading 7 if present
    // if (digits.startsWith("7")) {
    //   digits = digits.slice(1);
    // }

    // Limit to 10 digits
    digits = digits.slice(0, 10);

    let formatted = "+7 ";

    if (digits.length > 0) {
      formatted += digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += " " + digits.slice(3, 6);
    }
    if (digits.length > 6) {
      formatted += "-" + digits.slice(6, 8);
    }
    if (digits.length > 8) {
      formatted += "-" + digits.slice(8, 10);
    }

    formattedValue.value = formatted;
  },
  { immediate: true }
);
</script>

<style scoped></style>
