<?php
/**
 * Database Configuration & Connection File
 * Project: Little Stars Kindergarten Website
 * Technology: PHP + MySQL (PDO with Prepared Statements)
 * Supports MySQL with automatic SQLite fallback when MySQL is unconfigured or offline.
 */

define('DB_HOST', getenv('DB_HOST') ?: '');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_NAME', getenv('DB_NAME') ?: 'little_stars_db');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_CHARSET', 'utf8mb4');

$pdo = null;

// 1. Try MySQL connection if DB_HOST is configured
if (!empty(DB_HOST)) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        $pdo = null;
    }
}

// 2. Automatic fallback to SQLite if MySQL is not connected or available
if ($pdo === null) {
    try {
        $sqlite_dir = sys_get_temp_dir();
        $sqlite_file = $sqlite_dir . '/little_stars.sqlite';
        $pdo = new PDO('sqlite:' . $sqlite_file);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        initialize_sqlite_tables($pdo);
    } catch (Exception $e) {
        die("Database Connection Error: " . htmlspecialchars($e->getMessage()));
    }
}

function initialize_sqlite_tables($pdo) {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `programs` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT,
        `name` TEXT NOT NULL,
        `slug` TEXT NOT NULL,
        `age_group` TEXT NOT NULL,
        `timings` TEXT NOT NULL,
        `student_ratio` TEXT NOT NULL,
        `description` TEXT NOT NULL,
        `activities` TEXT NOT NULL,
        `image_url` TEXT NOT NULL,
        `is_active` INTEGER NOT NULL DEFAULT 1,
        `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
    );");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `admission_enquiries` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT,
        `reference_no` TEXT NOT NULL,
        `child_name` TEXT NOT NULL,
        `parent_name` TEXT NOT NULL,
        `phone` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `dob` TEXT NOT NULL,
        `applying_class` TEXT NOT NULL,
        `message` TEXT,
        `status` TEXT NOT NULL DEFAULT 'Pending',
        `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
    );");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_enquiries` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT,
        `name` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `phone` TEXT NOT NULL,
        `message` TEXT NOT NULL,
        `is_read` INTEGER NOT NULL DEFAULT 0,
        `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
    );");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `admin_users` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT,
        `username` TEXT NOT NULL,
        `password_hash` TEXT NOT NULL,
        `name` TEXT NOT NULL,
        `email` TEXT NOT NULL,
        `role` TEXT NOT NULL DEFAULT 'Administrator',
        `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
    );");

    // Seed initial programs if table is empty
    $count = $pdo->query("SELECT COUNT(*) FROM `programs`")->fetchColumn();
    if ($count == 0) {
        $stmt = $pdo->prepare("INSERT INTO `programs` (`id`, `name`, `slug`, `age_group`, `timings`, `student_ratio`, `description`, `activities`, `image_url`, `is_active`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
        
        $initial = [
            [1, 'Play Group', 'play-group', '1.5 - 2.5 Years', '09:00 AM - 11:30 AM', '1:8 Ratio', 'A gentle, sensory-rich introduction to school life focused on socialization, emotional security, tactile play, and language discovery.', '["Sensory Water Play","Finger Painting & Clay","Action Rhymes & Music","Puppet Storytelling"]', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'],
            [2, 'Nursery', 'nursery', '2.5 - 3.5 Years', '08:30 AM - 12:00 PM', '1:10 Ratio', 'Fostering independent thinking, phonemic awareness, vocabulary expansion, fine motor grip, and creative artistic expressions.', '["Jolly Phonics Level 1","Montessori Apparatus","Kinesthetic Math Games","Outdoor Obstacle Play"]', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'],
            [3, 'LKG (Lower Kindergarten)', 'lkg', '3.5 - 4.5 Years', '08:30 AM - 12:30 PM', '1:12 Ratio', 'Structured inquiry learning covering reading fluency, mathematical logic, basic environmental science, and social cooperation.', '["Blended Sight Words","Junior STEM Lab","Dramatics & Speech","Number Line Geometry"]', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'],
            [4, 'UKG (Upper Kindergarten)', 'ukg', '4.5 - 5.5 Years', '08:30 AM - 01:00 PM', '1:15 Ratio', 'Comprehensive primary school readiness preparing children for ICSE, CBSE, and Cambridge grade 1 admission standards.', '["Independent Story Writing","Addition & Subtraction","Creative Art & Pottery","General Knowledge & Geography"]', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80']
        ];

        foreach ($initial as $row) {
            $stmt->execute($row);
        }
    }
}

// Site settings
define('SITE_NAME', 'Little Stars Kindergarten');
define('SITE_URL', getenv('RENDER_EXTERNAL_URL') ?: 'http://localhost:8000');
define('CONTACT_PHONE', '+91 98765 43210');
define('CONTACT_EMAIL', 'admissions@littlestarskindergarten.edu');
define('SCHOOL_ADDRESS', 'Little Stars Campus, Kalapatti, Coimbatore, Tamil Nadu 641048');

// Helper function to sanitize input
function sanitize_input($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
?>
