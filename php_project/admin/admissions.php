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
        $stmt = $pdo->prepare("DELETE FROM admission_enquiries WHERE id = :id");
        $stmt->execute([':id' => $del_id]);
        $message = "Admission enquiry deleted successfully from database.";
    } catch (PDOException $e) {
        $error = "Error deleting enquiry: " . $e->getMessage();
    }
}

// Handle Status Update
if (isset($_POST['update_status']) && isset($_POST['enquiry_id']) && isset($_POST['new_status'])) {
    $enquiry_id = intval($_POST['enquiry_id']);
    $new_status = sanitize_input($_POST['new_status']);
    try {
        $stmt = $pdo->prepare("UPDATE admission_enquiries SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $new_status, ':id' => $enquiry_id]);
        $message = "Enquiry status updated to " . htmlspecialchars($new_status);
    } catch (PDOException $e) {
        $error = "Error updating status: " . $e->getMessage();
    }
}

// Fetch filter
$class_filter = isset($_GET['class']) ? trim($_GET['class']) : '';

try {
    if (!empty($class_filter)) {
        $stmt = $pdo->prepare("SELECT * FROM admission_enquiries WHERE applying_class = :class ORDER BY id DESC");
        $stmt->execute([':class' => $class_filter]);
    } else {
        $stmt = $pdo->query("SELECT * FROM admission_enquiries ORDER BY id DESC");
    }
    $enquiries = $stmt->fetchAll();
} catch (PDOException $e) {
    $enquiries = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admission Enquiries - Admin Panel</title>
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
                <a href="admissions.php" class="py-4 px-1 border-b-2 border-amber-500 font-bold text-sm text-amber-600">Admission Enquiries</a>
                <a href="contacts.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Contact Enquiries</a>
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

        <!-- Controls / Filter -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
                <h1 class="font-display font-bold text-lg text-slate-900">Student Admission Applications</h1>
                <p class="text-xs text-slate-500">Showing <?php echo count($enquiries); ?> stored enquiries from MySQL database</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-slate-500">Filter by Class:</span>
                <a href="admissions.php" class="px-3 py-1.5 rounded-lg text-xs font-bold <?php echo empty($class_filter) ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-600'; ?>">All</a>
                <a href="admissions.php?class=Play Group" class="px-3 py-1.5 rounded-lg text-xs font-bold <?php echo $class_filter === 'Play Group' ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-600'; ?>">Play Group</a>
                <a href="admissions.php?class=Nursery" class="px-3 py-1.5 rounded-lg text-xs font-bold <?php echo $class_filter === 'Nursery' ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-600'; ?>">Nursery</a>
                <a href="admissions.php?class=LKG" class="px-3 py-1.5 rounded-lg text-xs font-bold <?php echo $class_filter === 'LKG' ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-600'; ?>">LKG</a>
                <a href="admissions.php?class=UKG" class="px-3 py-1.5 rounded-lg text-xs font-bold <?php echo $class_filter === 'UKG' ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-600'; ?>">UKG</a>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th class="p-4">Ref #</th>
                            <th class="p-4">Child / DOB</th>
                            <th class="p-4">Parent Details</th>
                            <th class="p-4">Class</th>
                            <th class="p-4">Message / Notes</th>
                            <th class="p-4">Status</th>
                            <th class="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (!empty($enquiries)): ?>
                            <?php foreach ($enquiries as $item): ?>
                                <tr class="hover:bg-slate-50/50">
                                    <td class="p-4 font-mono font-bold text-slate-900"><?php echo htmlspecialchars($item['reference_no']); ?></td>
                                    <td class="p-4">
                                        <div class="font-bold text-slate-900 text-sm"><?php echo htmlspecialchars($item['child_name']); ?></div>
                                        <div class="text-[11px] text-slate-400">DOB: <?php echo htmlspecialchars($item['dob']); ?></div>
                                    </td>
                                    <td class="p-4">
                                        <div class="font-semibold text-slate-800"><?php echo htmlspecialchars($item['parent_name']); ?></div>
                                        <div class="text-[11px] text-slate-500"><?php echo htmlspecialchars($item['phone']); ?></div>
                                        <div class="text-[11px] text-slate-400"><?php echo htmlspecialchars($item['email']); ?></div>
                                    </td>
                                    <td class="p-4">
                                        <span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
                                            <?php echo htmlspecialchars($item['applying_class']); ?>
                                        </span>
                                    </td>
                                    <td class="p-4 max-w-xs">
                                        <p class="text-slate-600 text-xs italic line-clamp-2"><?php echo htmlspecialchars($item['message'] ?: 'No message provided'); ?></p>
                                    </td>
                                    <td class="p-4">
                                        <form method="POST" action="admissions.php" class="inline-block">
                                            <input type="hidden" name="update_status" value="1">
                                            <input type="hidden" name="enquiry_id" value="<?php echo $item['id']; ?>">
                                            <select name="new_status" onchange="this.form.submit()" class="text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-amber-400">
                                                <option value="Pending" <?php echo $item['status'] === 'Pending' ? 'selected' : ''; ?>>Pending</option>
                                                <option value="Contacted" <?php echo $item['status'] === 'Contacted' ? 'selected' : ''; ?>>Contacted</option>
                                                <option value="Admitted" <?php echo $item['status'] === 'Admitted' ? 'selected' : ''; ?>>Admitted</option>
                                                <option value="Rejected" <?php echo $item['status'] === 'Rejected' ? 'selected' : ''; ?>>Rejected</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td class="p-4 text-right">
                                        <a href="admissions.php?action=delete&id=<?php echo $item['id']; ?>" onclick="return confirm('Delete this admission enquiry from MySQL?');" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs inline-flex items-center gap-1">
                                            <i data-lucide="trash-2" class="w-3 h-3"></i> Delete
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr><td colspan="7" class="p-8 text-center text-slate-400">No admission enquiries matching your filter.</td></tr>
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
