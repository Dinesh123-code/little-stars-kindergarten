-- ==========================================================
-- Little Stars Kindergarten & Preschool
-- Database Schema for MySQL 8.0+ / MariaDB
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `littlestars_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `littlestars_db`;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` VARCHAR(30) NOT NULL DEFAULT 'Administrator',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Admin User (username: admin, password: admin123)
INSERT INTO `admin_users` (`username`, `password_hash`, `name`, `email`, `role`)
VALUES (
  'admin',
  '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm',
  'Head Administrator',
  'admin@littlestarskindergarten.online',
  'Administrator'
) ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Programs Table
CREATE TABLE IF NOT EXISTS `programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `age_group` VARCHAR(50) NOT NULL,
  `timings` VARCHAR(100) NOT NULL,
  `student_ratio` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `activities` TEXT NOT NULL COMMENT 'JSON array of activities',
  `image_url` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Admission Enquiries Table
CREATE TABLE IF NOT EXISTS `admission_enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(30) NOT NULL UNIQUE,
  `child_name` VARCHAR(100) NOT NULL,
  `parent_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `dob` DATE NOT NULL,
  `applying_class` VARCHAR(50) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('Pending', 'Contacted', 'Admitted', 'Rejected') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_class (`applying_class`),
  INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS `contact_enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_read (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Core Programs Data
INSERT INTO `programs` (`name`, `slug`, `age_group`, `timings`, `student_ratio`, `description`, `activities`, `image_url`)
VALUES
('Play Group', 'play-group', '1.5 – 2.5 Years', '09:00 AM – 12:00 PM', '1:6 (1 Teacher & 1 Caregiver)', 'A nurturing first bridge between home and school. Focuses on sensory discovery, emotional comfort, motor skills, social sharing, and rhythm-based communication.', '[\"Sensory sand & water play\",\"Rhyme time & musical bells\",\"Puppet storytelling\",\"Gross motor soft-play hurdles\",\"Color recognition games\"]', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'),
('Nursery', 'nursery', '2.5 – 3.5 Years', '08:45 AM – 12:30 PM', '1:8 Mentorship', 'Scaffolding verbal expression, pre-reading through Jolly Phonics songs, number readiness, tactile sorting, and collaborative friendships.', '[\"Synthetic Jolly Phonics (42 sounds)\",\"Number counting & bead stacking\",\"Finger painting & clay modeling\",\"Outdoor balance beam play\",\"Daily circle time conversations\"]', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80'),
('LKG (Lower Kindergarten)', 'lkg', '3.5 – 4.5 Years', '08:30 AM – 01:00 PM', '1:10 Mentorship', 'Structured foundational literacy, two-letter blending, basic arithmetic, environmental science, and structured team activities preparing for formal school confidence.', '[\"Letter formation & pencil grip\",\"Sight words & illustrated readers\",\"Addition through Montessori rods\",\"Living vs non-living science inquiry\",\"Theatrical role-play & drama\"]', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'),
('UKG (Upper Kindergarten)', 'ukg', '4.5 – 5.5 Years', '08:30 AM – 01:30 PM', '1:10 Mentorship', 'Comprehensive primary school readiness: fluent sentence reading, cursive penmanship, mathematical problem solving, public speaking, and self-directed curiosity.', '[\"Sentence writing & creative journaling\",\"Skip counting, shapes & mental math\",\"Mini STEM experiments & botany\",\"Speech & elocution presentations\",\"Primary school transition readiness\"]', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80')
ON DUPLICATE KEY UPDATE `name`=`name`;
