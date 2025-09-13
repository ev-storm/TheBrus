export const useEmailForm = () => {
  const isLoading = ref(false);
  const error = ref(null);
  const success = ref(false);

  const sendEmail = async (formData, fileData = null) => {
    isLoading.value = true;
    error.value = null;
    success.value = false;

    // Валидация на фронтенде
    if (!formData.name && !formData.phone && !formData.email) {
      error.value = "Необходимо указать хотя бы одно контактное данное";
      isLoading.value = false;
      return;
    }

    try {
      // Подготавливаем данные для отправки
      const emailData = { ...formData };

      // Если есть файл, добавляем его данные
      if (fileData && fileData.selectedFile && fileData.fileToBase64) {
        try {
          const base64Data = await fileData.fileToBase64(fileData.selectedFile);
          emailData.attachment = fileData.selectedFile.name;
          emailData.attachmentData = base64Data;
        } catch (fileError) {
          console.error("Ошибка обработки файла:", fileError);
          error.value = "Ошибка обработки файла";
          isLoading.value = false;
          return;
        }
      }

      const response = await $fetch("/api/send-email", {
        method: "POST",
        body: emailData,
      });

      if (response.success) {
        success.value = true;
        console.log("Письмо отправлено успешно:", response.messageId);
      } else {
        error.value = response.error || "Ошибка отправки письма";
      }
    } catch (err) {
      console.error("Ошибка отправки:", err);
      error.value = "Произошла ошибка при отправке письма";
    } finally {
      isLoading.value = false;
    }
  };

  const resetForm = () => {
    error.value = null;
    success.value = false;
    isLoading.value = false;
  };

  return {
    sendEmail,
    isLoading: readonly(isLoading),
    error: readonly(error),
    success: readonly(success),
    resetForm,
  };
};
