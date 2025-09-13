import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Валидация обязательных полей
    if (!body.name && !body.phone && !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Необходимо указать хотя бы одно контактное данное (имя, телефон или email)",
      });
    }

    // Обработка прикрепленного файла
    let attachment = null;
    if (body.attachment && body.attachmentData) {
      try {
        // Извлекаем base64 данные (убираем префикс data:application/pdf;base64,)
        const base64Data = body.attachmentData.split(",")[1];
        attachment = {
          filename: body.attachment,
          content: Buffer.from(base64Data, "base64"),
          contentType: "application/pdf",
        };
      } catch (error) {
        console.error("Ошибка обработки файла:", error);
      }
    }

    // Проверка настроек SMTP
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw createError({
        statusCode: 500,
        statusMessage:
          "SMTP настройки не настроены. Обратитесь к администратору.",
      });
    }

    // Настройка SMTP транспорта
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true для 465, false для других портов
      auth: {
        user: process.env.SMTP_USER, // ваш email
        pass: process.env.SMTP_PASS, // пароль приложения
      },
    });

    // Настройка письма
    const siteUrl = process.env.SITE_URL || "thebrus.ru";

    // Определение темы письма на основе типа формы
    const formTypes = {
      feedback: "Обратная связь",
      project: "Клиент предлагает проект",
      partnership: "Партнёр предлагает сотрудничество",
    };

    let emailSubject = `Новая заявка: ${formTypes[body.formType] || "Заявка"}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "office@thebrus.ru",
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            Новая заявка
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Данные клиента:</h3>
            <p><strong>Имя:</strong> ${body.name || "Не указано"}</p>
            <p><strong>Телефон:</strong> ${body.phone || "Не указан"}</p>
            <p><strong>Email:</strong> ${body.email || "Не указан"}</p>
          </div>
          
          <div style="background: #fff; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Сообщение:</h3>
            <p style="white-space: pre-wrap;">${
              body.message || "Сообщение не указано"
            }</p>
            ${
              attachment
                ? `<p style="margin-top: 10px; color: #666; font-size: 12px;"><strong>Прикреплен файл:</strong> ${attachment.filename}</p>`
                : ""
            }
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>Отправлено: ${new Date().toLocaleString("ru-RU")}</p>
            <p>Источник: <a href="https://${siteUrl}" style="color: #4CAF50;">${siteUrl}</a></p>
          </div>
        </div>
      `,
    };

    // Добавляем вложение если есть файл
    if (attachment) {
      mailOptions.attachments = [attachment];
    }

    // Отправка письма
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Письмо успешно отправлено",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Ошибка отправки письма:", error);

    return {
      success: false,
      error: "Ошибка отправки письма",
      details: error.message,
    };
  }
});
