<?php
// Простой скрипт для создания таблицы (только один раз)
require_once 'config.php';

try {
    $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";charset=" . $_ENV['DB_CHARSET'];
    $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Создаем базу данных если не существует
    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . $_ENV['DB_NAME'] . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ База данных создана<br>";
    
    // Подключаемся к созданной базе
    $pdo->exec("USE " . $_ENV['DB_NAME']);
    
    // Создаем таблицу leads
    $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        form_type VARCHAR(50) DEFAULT 'feedback',
        user_agent TEXT,
        referer VARCHAR(500),
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        INDEX idx_date_created (date_created),
        INDEX idx_ip_address (ip_address)
    )");
    
    echo "✅ Таблица 'leads' создана<br>";
    echo "✅ Готово! Теперь все заявки будут сохраняться в MySQL БД<br>";
    echo "<br><strong>Можете удалить этот файл - он больше не нужен!</strong>";
    
} catch (PDOException $e) {
    echo "❌ Ошибка: " . $e->getMessage();
}
?>
