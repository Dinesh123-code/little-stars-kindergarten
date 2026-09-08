<?php
/**
 * Database Configuration & Connection File
 * Project: Little Stars Kindergarten Website
 * Technology: PHP + MySQL (PDO with Prepared Statements)
 */

// Database credentials from Environment Variables (Render / Cloud DB) with local fallbacks
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'root');
define('DB_NAME', getenv('DB_NAME') ?: 'little_stars_db');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_CHARSET', 'utf8mb4');

try {
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // Graceful error display with environment setup guidelines
    header('HTTP/1.1 500 Internal Server Error');
    echo "<div style='font-family: system-ui, sans-serif; max-w: 600px; margin: 40px auto; padding: 24px; border: 1px solid #fecaca; background: #fff1f1; border-radius: 16px; color: #991b1b;'>";
    echo "<h2 style='margin-top:0;'>⚠️ Database Connection Failed</h2>";
    echo "<p><strong>Error:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<hr style='border:0; border-top:1px solid #fca5a5; margin:16px 0;'>";
    echo "<h3>How to Fix on Render:</h3>";
    echo "<ol style='line-height: 1.6;'>";
    echo "<li>Create a free MySQL database on <strong>Aiven, Railway, or PlanetScale</strong>.</li>";
    echo "<li>Import <code>php_project/database/little_stars_db.sql</code> into your MySQL database.</li>";
    echo "<li>Go to your <strong>Render Dashboard &rarr; Environment Variables</strong> and set:</li>";
    echo "<ul>";
    echo "<li><code>DB_HOST</code> = your database host</li>";
    echo "<li><code>DB_USER</code> = your database username</li>";
    echo "<li><code>DB_PASS</code> = your database password</li>";
    echo "<li><code>DB_NAME</code> = your database name</li>";
    echo "<li><code>DB_PORT</code> = 3306</li>";
    echo "</ul>";
    echo "</ol>";
    echo "</div>";
    exit;
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
