<template>
  <div class="file-upload">
    <input
      ref="fileInput"
      type="file"
      accept=".pdf"
      @change="handleFileSelect"
      style="display: none"
    />

    <button
      type="button"
      class="btn btn-file"
      @click="$refs.fileInput.click()"
      :disabled="isUploading"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <polyline
          points="14,2 14,8 20,8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <polyline
          points="10,9 9,9 8,9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ selectedFile ? "Файл выбран" : "Прикрепить файл" }}
    </button>

    <!-- Информация о выбранном файле -->
    <div v-if="selectedFile" class="file-info">
      <div class="file-details">
        <span class="file-name">{{ getFileInfo().name }}</span>
        <span class="file-size">{{ getFileInfo().sizeMB }} MB</span>
      </div>
      <button
        type="button"
        class="file-remove"
        @click="clearFile"
        title="Удалить файл"
      >
        ×
      </button>
    </div>

    <!-- Ошибка загрузки -->
    <div v-if="uploadError" class="file-error">
      {{ uploadError }}
    </div>
  </div>
</template>

<script setup>
import { useFileUpload } from "~/composables/useFileUpload";

const {
  selectedFile,
  uploadError,
  handleFileSelect,
  clearFile,
  getFileInfo,
  fileToBase64,
} = useFileUpload();

// Экспортируем selectedFile для родительского компонента
defineExpose({
  selectedFile,
  getFileInfo,
  clearFile,
  fileToBase64,
});
</script>

<style scoped>
.file-upload {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.btn-file {
  background: transparent;
  padding: 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--tran);
  font-size: 14px;
}

.btn-file:hover {
  border-color: var(--green);
  color: var(--green);
}

.btn-file:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.file-info {
  margin-top: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 10px;
  color: #a0a0a0;
}

.file-remove {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--tran);
  flex-shrink: 0;
}

.file-remove:hover {
  background: rgba(255, 68, 68, 0.1);
}

.file-error {
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 4px;
  font-size: 11px;
  color: #ff4444;
  text-align: center;
}
</style>
