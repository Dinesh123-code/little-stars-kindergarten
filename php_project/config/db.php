<?php
/**
 * Database Configuration & Connection File
 * Project: Little Stars Kindergarten Website
 * Technology: PHP + MySQL (PDO with Prepared Statements)
 */

// Database credentials - Update these according to your local environment (e.g. XAMPP/WAMP)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'root');
define('DB_NAME', 'little_stars_db');
define('DB_CHARSET', 'utf8mb4');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // In production, log error instead of displaying raw message
    die("Database Connection Failed: " . htmlspecialchars($e->getMessage()));
}

// Site settings
define('SITE_NAME', 'Little Stars Kindergarten');
define('SITE_URL', 'http://localhost/little_stars_kindergarten');
define('CONTACT_PHONE', '+91 98765 43210');
define('CONTACT_EMAIL', 'admissions@littlestarskindergarten.edu');
define('SCHOOL_ADDRESS', 'Little Stars Campus, Kalapatti, Coimbatore, Tamil Nadu 641048');

// Helper function to sanitize input
function sanitize_input($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
?>
