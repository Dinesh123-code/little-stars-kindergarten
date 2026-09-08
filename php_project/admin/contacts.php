<?php
session_start();
require_once __DIR__ . '/../config/db.php';

// Auth Guard
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

$message = "";
$error = "";

// Handle Delete
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    $del_id = intval($_GET['id']);
    try {
        $stmt = $pdo->prepare("DELETE FROM contact_enquiries WHERE id = :id");
        $stmt->execute([':id' => $del_id]);
        $message = "Contact message deleted successfully from MySQL.";
    } catch (PDOException $e) {
        $error = "Error deleting contact enquiry: " . $e->getMessage();
    }
}

// Handle Mark as Read
if (isset($_GET['action']) && $_GET['action'] === 'mark_read' && isset($_GET['id'])) {
    $msg_id = intval($_GET['id']);
    try {
        $stmt = $pdo->prepare("UPDATE contact_enquiries SET is_read = 1 WHERE id = :id");
        $stmt->execute([':id' => $msg_id]);
        $message = "Enquiry marked as read.";
    } catch (PDOException $e) {
        $error = "Error updating status: " . $e->getMessage();
    }
}

// Fetch all contact enquiries
try {
    $contacts = $pdo->query("SELECT * FROM contact_enquiries ORDER BY id DESC")->fetchAll();
} catch (PDOException $e) {
    $contacts = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Enquiries - Admin Panel</title>
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
<body class="bg-slate-100 text-slate-800 antialiased min-h-screen flex flex-col">

    <!-- Admin Header -->
    <header class="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg">★</div>
                <div class="font-display font-bold text-base">Little Stars Admin</div>
            </div>
            <div class="flex items-center gap-4 text-xs">
                <a href="dashboard.php" class="text-slate-300 hover:text-white">Dashboard</a>
                <a href="logout.php" class="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold">Logout</a>
            </div>
        </div>
    </header>

    <!-- Sub Navigation -->
    <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="flex space-x-6">
                <a href="dashboard.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Dashboard</a>
                <a href="programs.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Programs CRUD</a>
                <a href="admissions.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Admission Enquiries</a>
                <a href="contacts.php" class="py-4 px-1 border-b-2 border-amber-500 font-bold text-sm text-amber-600">Contact Enquiries</a>
            </nav>
        </div>
    </div>

    <!-- Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <?php if (!empty($message)): ?>
            <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
                <span><?php echo htmlspecialchars($message); ?></span>
            </div>
        <?php endif; ?>

        <?php if (!empty($error)): ?>
            <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
                <i data-lucide="alert-circle" class="w-5 h-5 text-rose-600"></i>
                <span><?php echo htmlspecialchars($error); ?></span>
            </div>
        <?php endif; ?>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <h1 class="font-display font-bold text-lg text-slate-900">General Contact Messages</h1>
                <p class="text-xs text-slate-500">Messages submitted via the public Contact Us form</p>
            </div>
            <span class="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg"><?php echo count($contacts); ?> Total Messages</span>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th class="p-4">Sender</th>
                            <th class="p-4">Contact Info</th>
                            <th class="p-4">Message</th>
                            <th class="p-4">Status</th>
                            <th class="p-4">Date</th>
                            <th class="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (!empty($contacts)): ?>
                            <?php foreach ($contacts as $c): ?>
                                <tr class="hover:bg-slate-50/50 <?php echo !$c['is_read'] ? 'bg-amber-50/30' : ''; ?>">
                                    <td class="p-4 font-bold text-slate-900 text-sm">
                                        <?php echo htmlspecialchars($c['name']); ?>
                                        <?php if (!$c['is_read']): ?>
                                            <span class="ml-1.5 inline-block w-2 h-2 rounded-full bg-amber-500" title="Unread"></span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="p-4">
                                        <div class="font-mono text-slate-700"><?php echo htmlspecialchars($c['phone']); ?></div>
                                        <div class="text-[11px] text-slate-400"><?php echo htmlspecialchars($c['email']); ?></div>
                                    </td>
                                    <td class="p-4 max-w-sm">
                                        <p class="text-slate-700 text-xs leading-relaxed"><?php echo htmlspecialchars($c['message']); ?></p>
                                    </td>
                                    <td class="p-4">
                                        <?php if ($c['is_read']): ?>
                                            <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">Read</span>
                                        <?php else: ?>
                                            <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">New</span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="p-4 text-slate-400 whitespace-nowrap"><?php echo substr($c['created_at'], 0, 10); ?></td>
                                    <td class="p-4 text-right whitespace-nowrap space-x-2">
                                        <?php if (!$c['is_read']): ?>
                                            <a href="contacts.php?action=mark_read&id=<?php echo $c['id']; ?>" class="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs inline-flex items-center gap-1">
                                                <i data-lucide="check" class="w-3 h-3"></i> Mark Read
                                            </a>
                                        <?php endif; ?>
                                        <a href="contacts.php?action=delete&id=<?php echo $c['id']; ?>" onclick="return confirm('Delete this contact message from MySQL?');" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs inline-flex items-center gap-1">
                                            <i data-lucide="trash-2" class="w-3 h-3"></i> Delete
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr><td colspan="6" class="p-8 text-center text-slate-400">No contact messages received yet.</td></tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
