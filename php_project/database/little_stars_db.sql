-- =======================================================
-- Little Stars Kindergarten MySQL Database Schema & Seed Data
-- Project: Internship Task - Kindergarten Website Development
-- Technology: PHP + MySQL
-- Database Name: little_stars_db
-- =======================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `little_stars_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `little_stars_db`;

-- --------------------------------------------------------
-- Table structure for table `admin_users`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(30) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default administrator credentials:
-- Username: admin
-- Password: password_verify with admin123 or hashed hash below
INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `name`, `email`, `role`, `created_at`) VALUES
(1, 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Principal Sarah Jenkins', 'admin@littlestarskindergarten.edu', 'superadmin', NOW());

-- --------------------------------------------------------
-- Table structure for table `programs`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `programs`;
CREATE TABLE `programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `age_group` varchar(50) NOT NULL,
  `timings` varchar(100) DEFAULT NULL,
  `student_ratio` varchar(50) DEFAULT '1:10',
  `description` text NOT NULL,
  `activities` text NOT NULL COMMENT 'Comma-separated or JSON list of activities',
  `image_url` varchar(500) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `programs` (`id`, `name`, `slug`, `age_group`, `timings`, `student_ratio`, `description`, `activities`, `image_url`, `is_active`, `created_at`) VALUES
(1, 'Play Group', 'play-group', '1.5 - 2.5 Years', '09:00 AM - 11:30 AM', '1:8', 'A warm, affectionate setting designed to ease toddlers into school life. Focuses on social separation ease, sensory stimulation, motor skills, and creative free play.', 'Sensory sand & water play, Rhyme time & musical bells, Puppet storytelling, Gross motor soft-play hurdles, Color recognition games', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(2, 'Nursery', 'nursery', '2.5 - 3.5 Years', '08:30 AM - 12:00 PM', '1:10', 'Nurtures natural inquisitiveness through language emergence, phonics foundations, basic numeracy, finger gymnastics, and collaborative group circle time.', 'Montessori cylinder blocks, Jolly phonics letter sounds, Number tracing & counting beads, Finger painting & craft collage, Expressive pretend play & drama', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(3, 'LKG (Lower Kindergarten)', 'lkg', '3.5 - 4.5 Years', '08:30 AM - 12:45 PM', '1:12', 'Bridges creative play and foundational literacy. Children develop pencil grip mastery, two-letter phonetic reading, math readiness, and scientific wonder.', 'Sight words & early phonetic reading, Addition concepts with counters, Nature observation & mini science labs, Yoga & rhythmic coordination, Weekly Show & Tell', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80', 1, NOW()),
(4, 'UKG (Upper Kindergarten)', 'ukg', '4.5 - 5.5 Years', '08:30 AM - 01:15 PM', '1:12', 'Comprehensive primary school preparedness. Focuses on independent reading, sentence composition, spatial arithmetic, critical inquiry, and ethical leadership.', 'CVC sentence formation & journaling, Skip counting & mental arithmetic, Junior STEM coding toys, Cultural celebrations & world geography, Team sports & gymnastics', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', 1, NOW());

-- --------------------------------------------------------
-- Table structure for table `admission_enquiries`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `admission_enquiries`;
CREATE TABLE `admission_enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(30) NOT NULL,
  `child_name` varchar(100) NOT NULL,
  `parent_name` varchar(100) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `applying_class` varchar(50) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('Pending','Contacted','Admitted','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_no` (`reference_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admission_enquiries` (`id`, `reference_no`, `child_name`, `parent_name`, `phone`, `email`, `dob`, `applying_class`, `message`, `status`, `created_at`) VALUES
(1, 'ADM-2026-0101', 'Aarav Sharma', 'Pooja Sharma', '+91 98765 43210', 'pooja.sharma@example.com', '2022-04-14', 'Nursery', 'Looking for morning batch. Would like to schedule a campus tour this Saturday.', 'Contacted', NOW()),
(2, 'ADM-2026-0102', 'Mia Fernandez', 'David Fernandez', '+91 98450 11223', 'david.f@example.com', '2023-01-20', 'Play Group', 'Seeking a caring environment for our toddler with school bus facility.', 'Pending', NOW()),
(3, 'ADM-2026-0103', 'Rohan Verma', 'Anita Verma', '+91 99100 88776', 'anita.verma@example.com', '2021-08-09', 'LKG', 'Transferring from another city. Need details regarding syllabus transition.', 'Admitted', NOW());

-- --------------------------------------------------------
-- Table structure for table `contact_enquiries`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `contact_enquiries`;
CREATE TABLE `contact_enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `contact_enquiries` (`id`, `name`, `email`, `phone`, `message`, `is_read`, `created_at`) VALUES
(1, 'Suresh Kumar', 'suresh.k@example.com', '+91 98112 34567', 'Are admissions open for mid-term intake in UKG? Please share fee schedule.', 1, NOW()),
(2, 'Meera Nair', 'meera.nair@example.com', '+91 97400 65432', 'Do you offer after-school day care services till 6:00 PM for working parents?', 0, NOW());

COMMIT;
