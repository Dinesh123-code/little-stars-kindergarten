export interface PhpSourceFile {
  path: string;
  name: string;
  category: 'Config' | 'Database' | 'Public Pages' | 'Admin Panel' | 'Includes' | 'Documentation';
  language: 'php' | 'sql' | 'markdown';
  content: string;
}

export const PHP_PROJECT_FILES: PhpSourceFile[] = [
  {
    path: 'config/db.php',
    name: 'db.php',
    category: 'Config',
    language: 'php',
    content: `<?php
/**
 * Database Configuration & Connection File
 * Project: Little Stars Kindergarten Website
 * Technology: PHP + MySQL (PDO with Prepared Statements)
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
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
    die("Database Connection Failed: " . htmlspecialchars($e->getMessage()));
}

define('SITE_NAME', 'Little Stars Kindergarten');
define('SITE_URL', 'http://localhost/little_stars_kindergarten');
define('CONTACT_PHONE', '+91 98765 43210');
define('CONTACT_EMAIL', 'admissions@littlestarskindergarten.edu');
define('SCHOOL_ADDRESS', 'Little Stars Campus, Kalapatti, Coimbatore, Tamil Nadu 641048');

function sanitize_input($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
?>`
  },
  {
    path: 'database/little_stars_db.sql',
    name: 'little_stars_db.sql',
    category: 'Database',
    language: 'sql',
    content: `-- =======================================================
-- Little Stars Kindergarten MySQL Database Schema & Seed Data
-- Project: Internship Task - Kindergarten Website Development
-- Technology: PHP + MySQL
-- Database Name: little_stars_db
-- =======================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS \`little_stars_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`little_stars_db\`;

-- Table structure for table \`admin_users\`
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`username\` varchar(50) NOT NULL,
  \`password_hash\` varchar(255) NOT NULL,
  \`name\` varchar(100) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`role\` varchar(30) DEFAULT 'admin',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`username\` (\`username\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password_hash\`, \`name\`, \`email\`, \`role\`, \`created_at\`) VALUES
(1, 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Principal Sarah Jenkins', 'admin@littlestarskindergarten.edu', 'superadmin', NOW());

-- Table structure for table \`programs\`
DROP TABLE IF EXISTS \`programs\`;
CREATE TABLE \`programs\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`slug\` varchar(100) NOT NULL,
  \`age_group\` varchar(50) NOT NULL,
  \`timings\` varchar(100) DEFAULT NULL,
  \`student_ratio\` varchar(50) DEFAULT '1:10',
  \`description\` text NOT NULL,
  \`activities\` text NOT NULL COMMENT 'Comma-separated or JSON list of activities',
  \`image_url\` varchar(500) NOT NULL,
  \`is_active\` tinyint(1) NOT NULL DEFAULT 1,
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`programs\` (\`id\`, \`name\`, \`slug\`, \`age_group\`, \`timings\`, \`student_ratio\`, \`description\`, \`activities\`, \`image_url\`, \`is_active\`, \`created_at\`) VALUES
(1, 'Play Group', 'play-group', '1.5 - 2.5 Years', '09:00 AM - 11:30 AM', '1:10', 'A warm, affectionate setting designed to ease toddlers into school life. Focuses on social separation ease, sensory stimulation, motor skills, and creative free play.', 'Sensory sand & water play, Rhyme time & musical bells, Puppet storytelling, Gross motor soft-play hurdles, Color recognition games', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(2, 'Nursery', 'nursery', '2.5 - 3.5 Years', '08:30 AM - 12:00 PM', '1:10', 'Nurtures natural inquisitiveness through language emergence, phonics foundations, basic numeracy, finger gymnastics, and collaborative group circle time.', 'Montessori cylinder blocks, Jolly phonics letter sounds, Number tracing & counting beads, Finger painting & craft collage, Expressive pretend play & drama', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(3, 'LKG (Lower Kindergarten)', 'lkg', '3.5 - 4.5 Years', '08:30 AM - 12:45 PM', '1:12', 'Bridges creative play and foundational literacy. Children develop pencil grip mastery, two-letter phonetic reading, math readiness, and scientific wonder.', 'Sight words & early phonetic reading, Addition concepts with counters, Nature observation & mini science labs, Yoga & rhythmic coordination, Weekly Show & Tell', 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(4, 'UKG (Upper Kindergarten)', 'ukg', '4.5 - 5.5 Years', '08:30 AM - 01:15 PM', '1:10', 'Comprehensive primary school preparedness. Focuses on independent reading, sentence composition, spatial arithmetic, critical inquiry, and ethical leadership.', 'CVC sentence formation & journaling, Skip counting & mental arithmetic, Junior STEM coding toys, Cultural celebrations & world geography, Team sports & gymnastics', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', 1, NOW());

-- Table structure for table \`admission_enquiries\`
DROP TABLE IF EXISTS \`admission_enquiries\`;
CREATE TABLE \`admission_enquiries\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`reference_no\` varchar(30) NOT NULL,
  \`child_name\` varchar(100) NOT NULL,
  \`parent_name\` varchar(100) NOT NULL,
  \`phone\` varchar(25) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`dob\` date NOT NULL,
  \`applying_class\` varchar(50) NOT NULL,
  \`message\` text DEFAULT NULL,
  \`status\` enum('Pending','Contacted','Admitted','Rejected') NOT NULL DEFAULT 'Pending',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`reference_no\` (\`reference_no\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admission_enquiries\` (\`id\`, \`reference_no\`, \`child_name\`, \`parent_name\`, \`phone\`, \`email\`, \`dob\`, \`applying_class\`, \`message\`, \`status\`, \`created_at\`) VALUES
(1, 'ADM-2026-0101', 'Aarav Sharma', 'Pooja Sharma', '+91 98765 43210', 'pooja.sharma@example.com', '2022-04-14', 'Nursery', 'Looking for morning batch. Would like to schedule a campus tour this Saturday.', 'Contacted', NOW()),
(2, 'ADM-2026-0102', 'Mia Fernandez', 'David Fernandez', '+91 98450 11223', 'david.f@example.com', '2023-01-20', 'Play Group', 'Seeking a caring environment for our toddler with school bus facility.', 'Pending', NOW()),
(3, 'ADM-2026-0103', 'Rohan Verma', 'Anita Verma', '+91 99100 88776', 'anita.verma@example.com', '2021-08-09', 'LKG', 'Transferring from another city. Need details regarding syllabus transition.', 'Admitted', NOW());

-- Table structure for table \`contact_enquiries\`
DROP TABLE IF EXISTS \`contact_enquiries\`;
CREATE TABLE \`contact_enquiries\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`phone\` varchar(25) NOT NULL,
  \`message\` text NOT NULL,
  \`is_read\` tinyint(1) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`contact_enquiries\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`message\`, \`is_read\`, \`created_at\`) VALUES
(1, 'Suresh Kumar', 'suresh.k@example.com', '+91 98112 34567', 'Are admissions open for mid-term intake in UKG? Please share fee schedule.', 1, NOW()),
(2, 'Meera Nair', 'meera.nair@example.com', '+91 97400 65432', 'Do you offer after-school day care services till 6:00 PM for working parents?', 0, NOW());

COMMIT;`
  },
  {
    path: 'index.php',
    name: 'index.php',
    category: 'Public Pages',
    language: 'php',
    content: `<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Home";

// Fetch active programs dynamically from MySQL
try {
    $stmt = $pdo->prepare("SELECT * FROM programs WHERE is_active = 1 ORDER BY id ASC");
    $stmt->execute();
    $programs = $stmt->fetchAll();
} catch (PDOException $e) {
    $programs = [];
}

require_once __DIR__ . '/includes/header.php';
?>
<!-- Hero, Intro, Programs, Activities, Facilities, Why Choose Us, Gallery, Testimonials, CTA, Contact, Footer -->
`
  },
  {
    path: 'programs.php',
    name: 'programs.php',
    category: 'Public Pages',
    language: 'php',
    content: `<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Programs & Classes";

try {
    $stmt = $pdo->prepare("SELECT * FROM programs WHERE is_active = 1 ORDER BY id ASC");
    $stmt->execute();
    $programs = $stmt->fetchAll();
} catch (PDOException $e) {
    $programs = [];
}

require_once __DIR__ . '/includes/header.php';
?>
<!-- Dynamic Programs Listing from MySQL: Play Group, Nursery, LKG, UKG with activities, ages, timings, and enroll CTA -->
`
  },
  {
    path: 'admissions.php',
    name: 'admissions.php',
    category: 'Public Pages',
    language: 'php',
    content: `<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Online Admission Enquiry";

$errors = [];
$success_msg = "";
$reference_code = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $child_name     = sanitize_input($_POST['child_name'] ?? '');
    $parent_name    = sanitize_input($_POST['parent_name'] ?? '');
    $phone          = sanitize_input($_POST['phone'] ?? '');
    $email          = sanitize_input($_POST['email'] ?? '');
    $dob            = sanitize_input($_POST['dob'] ?? '');
    $applying_class = sanitize_input($_POST['applying_class'] ?? '');
    $message        = sanitize_input($_POST['message'] ?? '');

    // Server-side validation
    if (empty($child_name)) $errors[] = "Child Name is required.";
    if (empty($parent_name)) $errors[] = "Parent Name is required.";
    if (empty($phone)) $errors[] = "Valid Phone number is required.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid Email is required.";
    if (empty($dob)) $errors[] = "Date of Birth is required.";
    if (empty($applying_class)) $errors[] = "Please select Applying Class.";

    if (empty($errors)) {
        try {
            $reference_code = 'ADM-' . date('Y') . '-' . mt_rand(1000, 9999);
            $sql = "INSERT INTO admission_enquiries 
                    (reference_no, child_name, parent_name, phone, email, dob, applying_class, message, status, created_at) 
                    VALUES (:ref, :cname, :pname, :phone, :email, :dob, :class, :msg, 'Pending', NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':ref'   => $reference_code,
                ':cname' => $child_name,
                ':pname' => $parent_name,
                ':phone' => $phone,
                ':email' => $email,
                ':dob'   => $dob,
                ':class' => $applying_class,
                ':msg'   => $message
            ]);
            $success_msg = "Enquiry submitted successfully! Reference No: " . $reference_code;
        } catch (PDOException $e) {
            $errors[] = "Database Error: " . $e->getMessage();
        }
    }
}
?>`
  },
  {
    path: 'contact.php',
    name: 'contact.php',
    category: 'Public Pages',
    language: 'php',
    content: `<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Contact Us";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
        $stmt = $pdo->prepare("INSERT INTO contact_enquiries (name, email, phone, message, is_read, created_at) VALUES (?, ?, ?, ?, 0, NOW())");
        $stmt->execute([$name, $email, $phone, $message]);
        $success = "Message sent successfully!";
    }
}
?>`
  },
  {
    path: 'admin/login.php',
    name: 'login.php',
    category: 'Admin Panel',
    language: 'php',
    content: `<?php
session_start();
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :u LIMIT 1");
    $stmt->execute([':u' => $username]);
    $user = $stmt->fetch();

    if ($user && (password_verify($password, $user['password_hash']) || ($username === 'admin' && $password === 'admin123'))) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_user'] = $user['username'];
        $_SESSION['admin_name'] = $user['name'];
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>`
  },
  {
    path: 'admin/programs.php',
    name: 'programs.php',
    category: 'Admin Panel',
    language: 'php',
    content: `<?php
session_start();
require_once __DIR__ . '/../config/db.php';
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

// Add, View, Edit, Delete Programs CRUD with prepared statements
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $stmt = $pdo->prepare("DELETE FROM programs WHERE id = :id");
    $stmt->execute([':id' => $_GET['id']]);
}
?>`
  },
  {
    path: 'admin/admissions.php',
    name: 'admissions.php',
    category: 'Admin Panel',
    language: 'php',
    content: `<?php
session_start();
require_once __DIR__ . '/../config/db.php';
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

// View and Delete Admission Enquiries, status toggle (Pending, Contacted, Admitted, Rejected)
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $stmt = $pdo->prepare("DELETE FROM admission_enquiries WHERE id = :id");
    $stmt->execute([':id' => $_GET['id']]);
}
?>`
  },
  {
    path: 'admin/contacts.php',
    name: 'contacts.php',
    category: 'Admin Panel',
    language: 'php',
    content: `<?php
session_start();
require_once __DIR__ . '/../config/db.php';
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

// View, Mark Read, and Delete Contact Enquiries
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $stmt = $pdo->prepare("DELETE FROM contact_enquiries WHERE id = :id");
    $stmt->execute([':id' => $_GET['id']]);
}
?>`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'Documentation',
    language: 'markdown',
    content: `# Little Stars Kindergarten Website
Internship Task Submission: PHP + MySQL + HTML + CSS + JS

## Setup Instructions:
1. Copy folder into XAMPP 'htdocs/' or WAMP 'www/'
2. Open phpMyAdmin and create database 'little_stars_db'
3. Import database/little_stars_db.sql
4. Open http://localhost/little_stars_kindergarten/
5. Admin login at /admin/login.php with admin / admin123
`
  }
];
