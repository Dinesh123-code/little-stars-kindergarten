<?php
session_start();
require_once __DIR__ . '/../config/db.php';

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit;
}

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = "Please enter both username and password.";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
            $stmt->execute([':username' => $username]);
            $user = $stmt->fetch();

            // Check password using password_verify or fallback to 'admin123'
            $isValid = false;
            if ($user) {
                if (password_verify($password, $user['password_hash']) || ($username === 'admin' && $password === 'admin123')) {
                    $isValid = true;
                }
            } elseif ($username === 'admin' && $password === 'admin123') {
                // Fallback demo user
                $user = [
                    'id' => 1,
                    'username' => 'admin',
                    'name' => 'Principal Sarah Jenkins',
                    'role' => 'superadmin'
                ];
                $isValid = true;
            }

            if ($isValid) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_user'] = $user['username'];
                $_SESSION['admin_name'] = $user['name'];
                $_SESSION['admin_role'] = $user['role'] ?? 'admin';
                
                header("Location: dashboard.php");
                exit;
            } else {
                $error = "Invalid username or password. Default credentials: admin / admin123";
            }
        } catch (PDOException $e) {
            $error = "Database authentication error: " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - <?php echo SITE_NAME; ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Quicksand:wght@600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1, h2, h3, .font-display { font-family: 'Quicksand', sans-serif; }
    </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">

    <div class="max-w-md w-full bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-2xl space-y-6">
        <div class="text-center space-y-2">
            <div class="w-14 h-14 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold font-display shadow-md">
                ★
            </div>
            <h1 class="text-2xl font-display font-bold text-white">Little Stars Administration</h1>
            <p class="text-xs text-slate-400">Secure staff & management authentication portal</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <i data-lucide="alert-triangle" class="w-4 h-4 shrink-0 text-rose-400 mt-0.5"></i>
                <span><?php echo htmlspecialchars($error); ?></span>
            </div>
        <?php endif; ?>

        <!-- Quick Demo Credentials Callout -->
        <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            <div class="font-bold mb-1 flex items-center gap-1.5"><i data-lucide="key" class="w-3.5 h-3.5"></i> Demo Credentials:</div>
            <div>Username: <strong class="text-white">admin</strong></div>
            <div>Password: <strong class="text-white">admin123</strong></div>
        </div>

        <form method="POST" action="login.php" class="space-y-4" novalidate>
            <div>
                <label for="username" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Username</label>
                <div class="relative">
                    <input type="text" id="username" name="username" required value="<?php echo htmlspecialchars($username ?? 'admin'); ?>" class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
            </div>

            <div>
                <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
                <div class="relative">
                    <input type="password" id="password" name="password" required value="admin123" class="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
            </div>

            <button type="submit" class="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition">
                Sign In to Admin Dashboard
            </button>
        </form>

        <div class="pt-4 border-t border-slate-700 text-center">
            <a href="../index.php" class="text-xs text-slate-400 hover:text-amber-400 transition flex items-center justify-center gap-1">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Public Website
            </a>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
