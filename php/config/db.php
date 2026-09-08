<?php
/**
 * Database Connection Configuration
 * Little Stars Kindergarten & Preschool
 * Utilizes PDO with prepared statements and secure attribute settings.
 * Supports MySQL with automatic SQLite fallback when MySQL is unconfigured or offline.
 */

require_once __DIR__ . '/../../php_project/config/db.php';

function getDbConnection() {
    global $pdo;
    return $pdo;
}
?>
