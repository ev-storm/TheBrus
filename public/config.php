<?php


$config = [
    // SMTP настройки для доменной почты
    'SMTP_HOST' => 'mail.thebrus.ru',
    'SMTP_PORT' => 465, // Порт для SSL
    'SMTP_USER' => 'office@thebrus.ru',  
    'SMTP_PASS' => 'oT2bF8gS7baT4lN1',
    
    // Настройки сайта
    'SITE_URL' => 'thebrus.ru',
    'CONTACT_EMAIL' => 'office@thebrus.ru', // Отправитель = получатель
    
    // Yandex Maps API
    'YMAPS_API_KEY' => '2daa9fb2-779c-4369-b15e-8ba3c97897c5',
    
    // MySQL база данных
    'DB_HOST' => 'localhost',
    'DB_NAME' => 'u3259088_brus_users',
    'DB_USER' => 'u3259088_brus_admin',
    'DB_PASS' => 'qQ5kG0lE9zvI9rR5',
    'DB_CHARSET' => 'utf8mb4'
];

// Устанавливаем переменные окружения
foreach ($config as $key => $value) {
    putenv("$key=$value");
    $_ENV[$key] = $value;
}
?>
