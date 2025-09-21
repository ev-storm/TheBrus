<?php
// Скрипт для инициализации базы данных
echo "Инициализация базы данных...\n";

try {
    $db_path = __DIR__ . '/leads.db';
    $pdo = new PDO('sqlite:' . $db_path);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Создаем таблицу
    $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT,
        date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT
    )");
    
    echo "База данных успешно создана: " . $db_path . "\n";
    echo "Таблица 'leads' создана.\n";
    
    // Проверяем, что таблица создана
    $stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='leads'");
    $table = $stmt->fetch();
    
    if ($table) {
        echo "✅ Таблица 'leads' существует.\n";
    } else {
        echo "❌ Ошибка: таблица 'leads' не найдена.\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
?>
