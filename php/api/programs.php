<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Public list of active programs
if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM `programs` WHERE `is_active` = 1 ORDER BY `id` ASC");
        $programs = $stmt->fetchAll();
        
        // Decode JSON activities if stored as JSON
        foreach ($programs as &$p) {
            $decoded = json_decode($p['activities'], true);
            $p['activities'] = is_array($decoded) ? $decoded : array_map('trim', explode(',', $p['activities']));
        }
        
        echo json_encode(['success' => true, 'data' => $programs]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit;
}

// Protected CRUD operations (Requires active PHP Admin session)
session_start();
if (!isset($_SESSION['admin_user'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Admin authentication required']);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    $name = trim($input['name'] ?? '');
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    $age_group = trim($input['age_group'] ?? '');
    $timings = trim($input['timings'] ?? '');
    $student_ratio = trim($input['student_ratio'] ?? '');
    $description = trim($input['description'] ?? '');
    $activities = is_array($input['activities']) ? json_encode($input['activities']) : trim($input['activities'] ?? '');
    $image_url = trim($input['image_url'] ?? '');

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `programs` (`name`, `slug`, `age_group`, `timings`, `student_ratio`, `description`, `activities`, `image_url`, `is_active`)
            VALUES (:name, :slug, :age, :timings, :ratio, :desc, :act, :img, 1)
        ");
        $stmt->execute([
            ':name' => $name,
            ':slug' => $slug,
            ':age' => $age_group,
            ':timings' => $timings,
            ':ratio' => $student_ratio,
            ':desc' => $description,
            ':act' => $activities,
            ':img' => $image_url
        ]);

        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId(), 'message' => 'Program added successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit;
}
