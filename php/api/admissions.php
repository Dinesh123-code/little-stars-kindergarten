<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // 1. Parse Input
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $child_name = trim($input['child_name'] ?? '');
    $parent_name = trim($input['parent_name'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $dob = trim($input['dob'] ?? '');
    $applying_class = trim($input['applying_class'] ?? '');
    $message = trim($input['message'] ?? '');

    // 2. Server-side Validation
    $errors = [];
    if (empty($child_name)) $errors[] = "Child's name is required.";
    if (empty($parent_name)) $errors[] = "Parent's name is required.";
    if (empty($phone) || !preg_match('/^[0-9+\-\s()]{7,20}$/', $phone)) {
        $errors[] = "A valid phone number is required.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email address is required.";
    }
    if (empty($dob)) $errors[] = "Date of birth is required.";
    if (empty($applying_class)) $errors[] = "Please select an applying class.";

    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'errors' => $errors,
            'message' => 'Validation failed.'
        ]);
        exit;
    }

    // 3. Generate Reference Number
    $reference_no = 'ADM-' . date('Y') . '-' . str_pad(mt_rand(1000, 9999), 4, '0', STR_PAD_LEFT);

    // 4. Prepared Statement Execution
    try {
        $stmt = $pdo->prepare("
            INSERT INTO `admission_enquiries` 
            (`reference_no`, `child_name`, `parent_name`, `phone`, `email`, `dob`, `applying_class`, `message`, `status`)
            VALUES (:ref, :cname, :pname, :phone, :email, :dob, :aclass, :msg, 'Pending')
        ");

        $stmt->execute([
            ':ref'    => $reference_no,
            ':cname'  => $child_name,
            ':pname'  => $parent_name,
            ':phone'  => $phone,
            ':email'  => $email,
            ':dob'    => $dob,
            ':aclass' => $applying_class,
            ':msg'    => $message
        ]);

        echo json_encode([
            'success' => true,
            'reference_no' => $reference_no,
            'message' => 'Admission application submitted successfully! Our admissions coordinator will contact you shortly.'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
    exit;
}

if ($method === 'GET') {
    // Admin access check (session)
    session_start();
    if (!isset($_SESSION['admin_user'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized access.']);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT * FROM `admission_enquiries` ORDER BY `created_at` DESC");
        $enquiries = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $enquiries]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit;
}
