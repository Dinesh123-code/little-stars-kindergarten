<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$action = $_GET['action'] ?? 'check';

if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username and password required']);
        exit;
    }

    // Prepared statement to fetch user
    $stmt = $pdo->prepare("SELECT * FROM `admin_users` WHERE `username` = :uname LIMIT 1");
    $stmt->execute([':uname' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['admin_user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'name' => $user['name'],
            'role' => $user['role']
        ];
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $_SESSION['admin_user']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
    exit;
}

if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
    exit;
}

if ($action === 'check') {
    if (isset($_SESSION['admin_user'])) {
        echo json_encode(['authenticated' => true, 'user' => $_SESSION['admin_user']]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
    exit;
}
