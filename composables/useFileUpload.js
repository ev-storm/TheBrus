export const useFileUpload = () => {
  const selectedFile = ref(null);
  const isUploading = ref(false);
  const uploadError = ref(null);

  // Обработка выбора файла
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    uploadError.value = null;

    if (!file) {
      selectedFile.value = null;
      return;
    }

    // Проверка типа файла (только PDF)
    if (file.type !== "application/pdf") {
      uploadError.value = "Разрешены только PDF файлы";
      event.target.value = ""; // Очищаем input
      return;
    }

    // Проверка размера файла (максимум 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB в байтах
    if (file.size > maxSize) {
      uploadError.value = "Размер файла не должен превышать 20MB";
      event.target.value = ""; // Очищаем input
      return;
    }

    selectedFile.value = file;
    console.log(
      "Выбран файл:",
      file.name,
      "Размер:",
      (file.size / 1024 / 1024).toFixed(2) + "MB"
    );
  };

  // Преобразование файла в base64 для отправки
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Очистка выбранного файла
  const clearFile = () => {
    selectedFile.value = null;
    uploadError.value = null;
  };

  // Получение информации о файле
  const getFileInfo = () => {
    if (!selectedFile.value) return null;

    return {
      name: selectedFile.value.name,
      size: selectedFile.value.size,
      sizeMB: (selectedFile.value.size / 1024 / 1024).toFixed(2),
      type: selectedFile.value.type,
    };
  };

  return {
    selectedFile: readonly(selectedFile),
    isUploading: readonly(isUploading),
    uploadError: readonly(uploadError),
    handleFileSelect,
    fileToBase64,
    clearFile,
    getFileInfo,
  };
};
