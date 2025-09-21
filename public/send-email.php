<?php
// Включаем отображение ошибок для диагностики
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Логируем начало выполнения
error_log('=== НАЧАЛО ОТПРАВКИ ПИСЬМА ===');
error_log('REQUEST_METHOD: ' . ($_SERVER['REQUEST_METHOD'] ?? 'НЕ УСТАНОВЛЕНО'));
error_log('HTTP_X_HTTP_METHOD_OVERRIDE: ' . ($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? 'НЕ УСТАНОВЛЕНО'));
error_log('Content-Type: ' . ($_SERVER['CONTENT_TYPE'] ?? 'НЕ УСТАНОВЛЕНО'));

// Подключаем конфигурацию
require_once 'config.php';

// Функция для работы с MySQL базой данных
function initDatabase() {
    try {
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=" . $_ENV['DB_CHARSET'];
        $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Создаем таблицу если не существует
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
            ip_address VARCHAR(45)
        )");
        
        return $pdo;
    } catch (PDOException $e) {
        error_log('Ошибка подключения к базе данных: ' . $e->getMessage());
        return false;
    }
}

// Функция для проверки лимита заявок с одного IP (защита от спама)
function checkRateLimit($pdo, $ip) {
    try {
        // Проверяем количество заявок за последний час
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM leads WHERE ip_address = ? AND date_created > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
        $stmt->execute([$ip]);
        $count = $stmt->fetchColumn();
        
        // Максимум 5 заявок в час с одного IP
        return $count < 5;
    } catch (PDOException $e) {
        error_log('Ошибка проверки лимита: ' . $e->getMessage());
        return true; // В случае ошибки разрешаем отправку
    }
}

// Функция для сохранения заявки в базу данных
function saveLead($pdo, $name, $phone, $email, $message, $ip, $formType = 'feedback') {
    try {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        
        $stmt = $pdo->prepare("INSERT INTO leads (name, phone, email, message, form_type, user_agent, referer, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $message, $formType, $userAgent, $referer, $ip]);
        return true;
    } catch (PDOException $e) {
        error_log('Ошибка сохранения заявки: ' . $e->getMessage());
        return false;
    }
}

// Проверяем наличие PHPMailer
$phpmailer_paths = [
    'vendor/phpmailer/PHPMailer.php',
    './vendor/phpmailer/PHPMailer.php',
    __DIR__ . '/vendor/phpmailer/PHPMailer.php'
];

$phpmailer_found = false;
$found_path = '';
foreach ($phpmailer_paths as $path) {
    if (file_exists($path)) {
        error_log('PHPMailer найден по пути: ' . $path);
        $phpmailer_found = true;
        $found_path = $path;
        break;
    }
}

if (!$phpmailer_found) {
    error_log('PHPMailer не найден. Проверяемые пути: ' . implode(', ', $phpmailer_paths));
    error_log('Текущая директория: ' . __DIR__);
    sendResponse(false, 'PHPMailer не найден. Проверьте загрузку файлов на хостинг.');
}

// Подключаем PHPMailer (версия с namespace)
$base_path = dirname($found_path) . '/';
require_once $base_path . 'PHPMailer.php';
require_once $base_path . 'SMTP.php';
require_once $base_path . 'Exception.php';

// Функция для отправки ответа
function sendResponse($success, $message, $details = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($details) {
        $response['details'] = $details;
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Проверяем метод запроса (учитываем прокси-серверы)
$method = $_SERVER['REQUEST_METHOD'] ?? $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? 'GET';
error_log('Метод запроса: ' . $method);

// Временно разрешаем GET для тестирования
if ($method !== 'POST' && $method !== 'GET') {
    error_log('Неподдерживаемый метод: ' . $method);
    sendResponse(false, 'Метод не поддерживается. Получен: ' . $method);
}

// Получаем данные как в рабочем примере
$input = [];
if ($method === 'GET') {
    $input = $_GET;
    error_log('GET данные: ' . json_encode($input));
} else {
    // Детальная диагностика
    $raw_input = file_get_contents('php://input');
    error_log('Raw input length: ' . strlen($raw_input));
    error_log('Raw input content: ' . $raw_input);
    
    if ($raw_input) {
        $json_data = json_decode($raw_input, true);
        error_log('JSON decode result: ' . json_encode($json_data));
        error_log('JSON decode error: ' . json_last_error_msg());
        
        if ($json_data && is_array($json_data)) {
            $input = $json_data;
            error_log('JSON данные успешно: ' . json_encode($input));
        }
    }
    
    // Если JSON не сработал, используем $_POST
    if (empty($input)) {
        $input = $_POST;
        error_log('POST данные: ' . json_encode($input));
        error_log('POST count: ' . count($_POST));
    }
    
    // Также попробуем $_REQUEST
    if (empty($input)) {
        $input = $_REQUEST;
        error_log('REQUEST данные: ' . json_encode($input));
    }
}

error_log('Итоговые данные: ' . json_encode($input));
error_log('Input is array: ' . (is_array($input) ? 'YES' : 'NO'));
if (is_array($input)) {
    error_log('Input keys: ' . implode(', ', array_keys($input)));
}

// Валидация обязательных полей
error_log('Проверка полей:');
error_log('name: ' . ($input['name'] ?? 'НЕТ'));
error_log('phone: ' . ($input['phone'] ?? 'НЕТ'));
error_log('email: ' . ($input['email'] ?? 'НЕТ'));

if (empty($input['name']) && empty($input['phone']) && empty($input['email'])) {
    error_log('Валидация не прошла - все поля пустые');
    sendResponse(false, 'Необходимо указать хотя бы одно контактное данное (имя, телефон или email)');
}

// Инициализируем базу данных
$pdo = initDatabase();
if (!$pdo) {
    error_log('Не удалось подключиться к базе данных');
    // Не прерываем выполнение, продолжаем отправку email без сохранения в БД
    $pdo = null;
}

// Получаем IP адрес
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Проверяем лимит заявок (только если БД доступна)
if ($pdo && !checkRateLimit($pdo, $ip)) {
    error_log('Превышен лимит заявок с IP: ' . $ip);
    sendResponse(false, 'Слишком много заявок. Попробуйте позже.');
}

// Извлекаем данные
$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

// Сохраняем заявку в базу данных (только если БД доступна)
if ($pdo) {
    $formType = $input['formType'] ?? 'feedback';
    if (!saveLead($pdo, $name, $phone, $email, $message, $ip, $formType)) {
        error_log('Не удалось сохранить заявку в базу данных');
        // Не прерываем выполнение, продолжаем отправку email
    }
}

// Настройки SMTP - доменная почта (отправитель = получатель)
$smtpConfig = [
    'host' => $_ENV['SMTP_HOST'] ?? 'mail.thebrus.ru',
    'port' => $_ENV['SMTP_PORT'] ?? 465,
    'username' => $_ENV['SMTP_USER'] ?? 'office@thebrus.ru',
    'password' => $_ENV['SMTP_PASS'] ?? 'oT2bF8gS7baT4lN1',
    'from_email' => $_ENV['SMTP_USER'] ?? 'office@thebrus.ru',
    'to_email' => $_ENV['CONTACT_EMAIL'] ?? 'office@thebrus.ru',
    'site_url' => $_ENV['SITE_URL'] ?? 'thebrus.ru'
];

try {
    // Создаем экземпляр PHPMailer (версия с namespace)
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    error_log('PHPMailer создан успешно');
    
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = $smtpConfig['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtpConfig['username'];
    $mail->Password = $smtpConfig['password'];
    // SSL настройки для доменной почты (SSL сертификат настроен)
    $mail->SMTPSecure = 'ssl'; // SSL для доменной почты
    $mail->Port = 465; // Порт для SSL
    $mail->CharSet = 'UTF-8';
    
    // Дополнительные настройки для доменной почты
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    // Включаем отладку SMTP для диагностики
    $mail->SMTPDebug = 2; // Выводит все команды SMTP
    $mail->Debugoutput = 'error_log'; // Вывод в лог ошибок
    
    // Отправитель и получатель с правильными заголовками
    $mail->setFrom($smtpConfig['from_email'], 'TheBrus.ru');
    $mail->addAddress($smtpConfig['to_email']);
    
    // Добавляем заголовки против спама (упрощенная версия)
    $mail->addCustomHeader('X-Mailer', 'PHP/' . phpversion());
    $mail->addCustomHeader('Reply-To', $smtpConfig['from_email']);
    
    // Убираем подозрительные заголовки
    // $mail->addCustomHeader('Precedence', 'bulk'); // Может вызывать подозрения
    
    // Определение темы письма на основе типа формы
    $formTypes = [
        'feedback' => 'Обратная связь',
        'project' => 'Клиент предлагает проект',
        'partnership' => 'Партнёр предлагает сотрудничество'
    ];
    
    $formType = $input['formType'] ?? 'feedback';
    $emailSubject = 'Новая заявка: ' . ($formTypes[$formType] ?? 'Заявка');
    $mail->Subject = $emailSubject;
    
    // Обработка прикрепленного файла
    $attachmentInfo = '';
    if (!empty($input['attachment']) && !empty($input['attachmentData'])) {
        try {
            // Извлекаем base64 данные
            $base64Data = $input['attachmentData'];
            if (strpos($base64Data, ',') !== false) {
                $base64Data = explode(',', $base64Data)[1];
            }
            
            $fileContent = base64_decode($base64Data);
            $mail->addStringAttachment($fileContent, $input['attachment'], 'base64', 'application/pdf');
            $attachmentInfo = '<p style="margin-top: 10px; color: #666; font-size: 12px;"><strong>Прикреплен файл:</strong> ' . htmlspecialchars($input['attachment']) . '</p>';
        } catch (Exception $e) {
            // Логируем ошибку, но не прерываем отправку
            error_log('Ошибка обработки файла: ' . $e->getMessage());
        }
    }
    
    // HTML содержимое письма (упрощенное против спама)
    $htmlContent = '
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Новое сообщение с сайта ' . $smtpConfig['site_url'] . '</h2>
        
        <p><strong>Имя:</strong> ' . htmlspecialchars($input['name'] ?? 'Не указано') . '</p>
        <p><strong>Телефон:</strong> ' . htmlspecialchars($input['phone'] ?? 'Не указан') . '</p>
        <p><strong>Email:</strong> ' . htmlspecialchars($input['email'] ?? 'Не указан') . '</p>
        
        <h3>Сообщение:</h3>
        <p>' . nl2br(htmlspecialchars($input['message'] ?? 'Сообщение не указано')) . '</p>
        
        ' . $attachmentInfo . '
        
        <hr>
        <p style="font-size: 12px; color: #666;">
            Отправлено с сайта ' . $smtpConfig['site_url'] . ' ' . date('d.m.Y H:i:s') . '
        </p>
    </body>
    </html>';
    
    // Текстовая версия письма (важно для доставляемости)
    $textContent = "Новое сообщение с сайта " . $smtpConfig['site_url'] . "\n\n";
    $textContent .= "Контактная информация:\n";
    $textContent .= "Имя: " . ($input['name'] ?? 'Не указано') . "\n";
    $textContent .= "Телефон: " . ($input['phone'] ?? 'Не указан') . "\n";
    $textContent .= "Email: " . ($input['email'] ?? 'Не указан') . "\n\n";
    $textContent .= "Сообщение:\n" . ($input['message'] ?? 'Сообщение не указано') . "\n\n";
    $textContent .= "Дата отправки: " . date('d.m.Y H:i:s') . "\n";
    $textContent .= "Источник: https://" . $smtpConfig['site_url'];
    
    $mail->isHTML(true);
    $mail->Body = $htmlContent;
    $mail->AltBody = $textContent; // Текстовая версия для почтовых клиентов
    
    // Отправляем письмо
    $mail->send();
    
    sendResponse(true, 'Письмо успешно отправлено', [
        'messageId' => $mail->getLastMessageID()
    ]);
    
} catch (Exception $e) {
    // Выводим детальную информацию об ошибке в консоль
    $errorDetails = [
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString(),
        'smtp_config' => [
            'host' => $smtpConfig['host'],
            'port' => $smtpConfig['port'],
            'username' => $smtpConfig['username'],
            'password_length' => strlen($smtpConfig['password']),
            'to_email' => $smtpConfig['to_email']
        ]
    ];
    
    error_log('=== ДЕТАЛЬНАЯ ОШИБКА ОТПРАВКИ ПИСЬМА ===');
    error_log('Сообщение: ' . $e->getMessage());
    error_log('Файл: ' . $e->getFile() . ':' . $e->getLine());
    error_log('SMTP Host: ' . $smtpConfig['host']);
    error_log('SMTP Port: ' . $smtpConfig['port']);
    error_log('SMTP User: ' . $smtpConfig['username']);
    error_log('Password Length: ' . strlen($smtpConfig['password']));
    error_log('To Email: ' . $smtpConfig['to_email']);
    error_log('Трассировка: ' . $e->getTraceAsString());
    error_log('=== КОНЕЦ ОШИБКИ ===');
    
    sendResponse(false, 'Ошибка отправки письма: ' . $e->getMessage(), [
        'details' => $errorDetails,
        'smtp_debug' => 'Проверьте логи сервера для подробной информации'
    ]);
}
?>
