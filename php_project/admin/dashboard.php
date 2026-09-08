<?php
session_start();
require_once __DIR__ . '/../config/db.php';

// Auth Guard
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

// Fetch counts
try {
    $prog_count = $pdo->query("SELECT COUNT(*) FROM programs")->fetchColumn();
    $adm_count = $pdo->query("SELECT COUNT(*) FROM admission_enquiries")->fetchColumn();
    $unread_contacts = $pdo->query("SELECT COUNT(*) FROM contact_enquiries WHERE is_read = 0")->fetchColumn();
    $total_contacts = $pdo->query("SELECT COUNT(*) FROM contact_enquiries")->fetchColumn();

    // Recent 5 admissions
    $recent_admissions = $pdo->query("SELECT * FROM admission_enquiries ORDER BY id DESC LIMIT 5")->fetchAll();
} catch (PDOException $e) {
    $prog_count = $adm_count = $unread_contacts = $total_contacts = 0;
    $recent_admissions = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - <?php echo SITE_NAME; ?></title>
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

    <!-- Admin Top Nav -->
    <header class="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg">★</div>
                    <div>
                        <div class="font-display font-bold text-base text-white leading-none">Little Stars Admin</div>
                        <div class="text-[10px] text-amber-400 font-semibold uppercase">Management Portal</div>
                    </div>
                </div>

                <div class="flex items-center gap-4 text-xs">
                    <span class="text-slate-300 hidden sm:inline">Logged in as: <strong class="text-white"><?php echo htmlspecialchars($_SESSION['admin_name'] ?? 'Admin'); ?></strong></span>
                    <a href="../index.php" target="_blank" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition">View Site</a>
                    <a href="logout.php" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition flex items-center gap-1">
                        <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Sub Navigation Bar -->
    <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="flex space-x-6">
                <a href="dashboard.php" class="py-4 px-1 border-b-2 border-amber-500 font-bold text-sm text-amber-600 flex items-center gap-2">
                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Dashboard
                </a>
                <a href="programs.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800 hover:border-slate-300 flex items-center gap-2">
                    <i data-lucide="book-open" class="w-4 h-4"></i> Programs CRUD
                </a>
                <a href="admissions.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800 hover:border-slate-300 flex items-center gap-2">
                    <i data-lucide="user-check" class="w-4 h-4"></i> Admission Enquiries (<?php echo $adm_count; ?>)
                </a>
                <a href="contacts.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800 hover:border-slate-300 flex items-center gap-2">
                    <i data-lucide="mail" class="w-4 h-4"></i> Contact Enquiries (<?php echo $total_contacts; ?>)
                </a>
            </nav>
        </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- Overview Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Classes</div>
                    <div class="text-3xl font-display font-black text-slate-900 mt-1"><?php echo $prog_count; ?></div>
                    <a href="programs.php" class="text-xs font-semibold text-amber-600 hover:underline mt-2 inline-block">Manage Programs →</a>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="book-open" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Admissions</div>
                    <div class="text-3xl font-display font-black text-slate-900 mt-1"><?php echo $adm_count; ?></div>
                    <a href="admissions.php" class="text-xs font-semibold text-emerald-600 hover:underline mt-2 inline-block">Review Enquiries →</a>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <i data-lucide="user-plus" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Messages</div>
                    <div class="text-3xl font-display font-black text-slate-900 mt-1"><?php echo $total_contacts; ?></div>
                    <a href="contacts.php" class="text-xs font-semibold text-sky-600 hover:underline mt-2 inline-block">Open Inbox →</a>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <i data-lucide="inbox" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Unread Enquiries</div>
                    <div class="text-3xl font-display font-black text-rose-600 mt-1"><?php echo $unread_contacts; ?></div>
                    <span class="text-xs text-slate-400 mt-2 inline-block">Awaiting Review</span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <i data-lucide="bell" class="w-6 h-6"></i>
                </div>
            </div>
        </div>

        <!-- Recent Admission Enquiries Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 class="font-display font-bold text-lg text-slate-900">Recent Online Admission Enquiries</h2>
                    <p class="text-xs text-slate-500">Live incoming applications from parents</p>
                </div>
                <a href="admissions.php" class="text-xs font-bold text-amber-600 hover:underline">View All Applications</a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th class="p-4">Ref #</th>
                            <th class="p-4">Child Name</th>
                            <th class="p-4">Parent Name</th>
                            <th class="p-4">Class</th>
                            <th class="p-4">Phone</th>
                            <th class="p-4">Status</th>
                            <th class="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (!empty($recent_admissions)): ?>
                            <?php foreach ($recent_admissions as $row): ?>
                                <tr class="hover:bg-slate-50/50">
                                    <td class="p-4 font-mono font-bold text-slate-900"><?php echo htmlspecialchars($row['reference_no']); ?></td>
                                    <td class="p-4 font-semibold text-slate-900"><?php echo htmlspecialchars($row['child_name']); ?></td>
                                    <td class="p-4"><?php echo htmlspecialchars($row['parent_name']); ?></td>
                                    <td class="p-4"><span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold"><?php echo htmlspecialchars($row['applying_class']); ?></span></td>
                                    <td class="p-4 font-mono"><?php echo htmlspecialchars($row['phone']); ?></td>
                                    <td class="p-4">
                                        <span class="px-2 py-1 rounded-full text-[10px] font-bold <?php 
                                            echo $row['status'] === 'Admitted' ? 'bg-emerald-100 text-emerald-800' : 
                                                ($row['status'] === 'Contacted' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'); 
                                        ?>">
                                            <?php echo htmlspecialchars($row['status']); ?>
                                        </span>
                                    </td>
                                    <td class="p-4 text-slate-400"><?php echo substr($row['created_at'], 0, 10); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr><td colspan="7" class="p-6 text-center text-slate-400">No admission enquiries recorded yet.</td></tr>
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
