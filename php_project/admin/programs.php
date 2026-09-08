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

// Handle Delete Program
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    $del_id = intval($_GET['id']);
    try {
        $del_stmt = $pdo->prepare("DELETE FROM programs WHERE id = :id");
        $del_stmt->execute([':id' => $del_id]);
        $message = "Program deleted successfully from MySQL database.";
    } catch (PDOException $e) {
        $error = "Error deleting program: " . $e->getMessage();
    }
}

// Handle Add or Edit Program
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $edit_id       = isset($_POST['id']) && !empty($_POST['id']) ? intval($_POST['id']) : null;
    $name          = sanitize_input($_POST['name'] ?? '');
    $slug          = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    $age_group     = sanitize_input($_POST['age_group'] ?? '');
    $timings       = sanitize_input($_POST['timings'] ?? '');
    $student_ratio = sanitize_input($_POST['student_ratio'] ?? '1:10');
    $description   = sanitize_input($_POST['description'] ?? '');
    $activities    = sanitize_input($_POST['activities'] ?? '');
    $image_url     = sanitize_input($_POST['image_url'] ?? '');

    if (empty($name) || empty($age_group) || empty($description)) {
        $error = "Please fill in Program Name, Age Group, and Description.";
    } else {
        if (empty($image_url)) {
            $image_url = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80';
        }

        try {
            if ($edit_id) {
                // Update
                $sql = "UPDATE programs SET 
                        name = :name, slug = :slug, age_group = :age_group, timings = :timings, 
                        student_ratio = :student_ratio, description = :description, activities = :activities, 
                        image_url = :image_url, updated_at = NOW() 
                        WHERE id = :id";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':name'          => $name,
                    ':slug'          => $slug,
                    ':age_group'     => $age_group,
                    ':timings'       => $timings,
                    ':student_ratio' => $student_ratio,
                    ':description'   => $description,
                    ':activities'    => $activities,
                    ':image_url'     => $image_url,
                    ':id'            => $edit_id
                ]);
                $message = "Program updated successfully!";
            } else {
                // Insert
                $sql = "INSERT INTO programs 
                        (name, slug, age_group, timings, student_ratio, description, activities, image_url, is_active, created_at) 
                        VALUES (:name, :slug, :age_group, :timings, :student_ratio, :description, :activities, :image_url, 1, NOW())";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':name'          => $name,
                    ':slug'          => $slug,
                    ':age_group'     => $age_group,
                    ':timings'       => $timings,
                    ':student_ratio' => $student_ratio,
                    ':description'   => $description,
                    ':activities'    => $activities,
                    ':image_url'     => $image_url
                ]);
                $message = "New program added successfully!";
            }
        } catch (PDOException $e) {
            $error = "Database Error: " . $e->getMessage();
        }
    }
}

// Fetch program for editing if requested
$editing_program = null;
if (isset($_GET['action']) && $_GET['action'] === 'edit' && isset($_GET['id'])) {
    $fetch_id = intval($_GET['id']);
    $fetch_stmt = $pdo->prepare("SELECT * FROM programs WHERE id = :id");
    $fetch_stmt->execute([':id' => $fetch_id]);
    $editing_program = $fetch_stmt->fetch();
}

// Fetch all programs
try {
    $programs = $pdo->query("SELECT * FROM programs ORDER BY id ASC")->fetchAll();
} catch (PDOException $e) {
    $programs = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programs Management - Admin Panel</title>
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
                <a href="programs.php" class="py-4 px-1 border-b-2 border-amber-500 font-bold text-sm text-amber-600">Programs CRUD</a>
                <a href="admissions.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Admission Enquiries</a>
                <a href="contacts.php" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-800">Contact Enquiries</a>
            </nav>
        </div>
    </div>

    <!-- Main Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
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

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Add or Edit Program Form -->
            <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 class="font-display font-bold text-lg text-slate-900 mb-1">
                    <?php echo $editing_program ? 'Edit Program: ' . htmlspecialchars($editing_program['name']) : 'Add New Program'; ?>
                </h2>
                <p class="text-xs text-slate-500 mb-6">
                    Updates sync directly to the MySQL <code class="font-mono text-amber-600">programs</code> table.
                </p>

                <form method="POST" action="programs.php" class="space-y-4">
                    <?php if ($editing_program): ?>
                        <input type="hidden" name="id" value="<?php echo $editing_program['id']; ?>">
                    <?php endif; ?>

                    <div>
                        <label for="name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Class / Program Name *</label>
                        <input type="text" id="name" name="name" required value="<?php echo htmlspecialchars($editing_program['name'] ?? ''); ?>" placeholder="e.g. Play Group or Nursery" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="age_group" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Age Group *</label>
                            <input type="text" id="age_group" name="age_group" required value="<?php echo htmlspecialchars($editing_program['age_group'] ?? ''); ?>" placeholder="e.g. 1.5 - 2.5 Years" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                        </div>
                        <div>
                            <label for="student_ratio" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Teacher Allocation</label>
                            <input type="text" id="student_ratio" name="student_ratio" value="<?php echo htmlspecialchars($editing_program['student_ratio'] ?? '1:10'); ?>" placeholder="1:10" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                        </div>
                    </div>

                    <div>
                        <label for="timings" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Timings</label>
                        <input type="text" id="timings" name="timings" value="<?php echo htmlspecialchars($editing_program['timings'] ?? '08:30 AM - 12:00 PM'); ?>" placeholder="e.g. 08:30 AM - 12:00 PM" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    </div>

                    <div>
                        <label for="description" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Description *</label>
                        <textarea id="description" name="description" rows="3" required placeholder="Pedagogical objectives and milestones..." class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"><?php echo htmlspecialchars($editing_program['description'] ?? ''); ?></textarea>
                    </div>

                    <div>
                        <label for="activities" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Activities (Comma separated)</label>
                        <textarea id="activities" name="activities" rows="2" placeholder="Sensory play, Jolly phonics, Finger painting..." class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"><?php echo htmlspecialchars($editing_program['activities'] ?? ''); ?></textarea>
                    </div>

                    <div>
                        <label for="image_url" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Image URL</label>
                        <input type="url" id="image_url" name="image_url" value="<?php echo htmlspecialchars($editing_program['image_url'] ?? ''); ?>" placeholder="https://images.unsplash.com/..." class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    </div>

                    <div class="pt-2 flex gap-3">
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm transition">
                            <?php echo $editing_program ? 'Save Changes' : 'Add Program'; ?>
                        </button>
                        <?php if ($editing_program): ?>
                            <a href="programs.php" class="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center">Cancel</a>
                        <?php endif; ?>
                    </div>
                </form>
            </div>

            <!-- Right: View Programs Table -->
            <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 class="font-display font-bold text-base text-slate-900">Configured Programs</h3>
                        <p class="text-xs text-slate-500">Currently loaded dynamically across the public website</p>
                    </div>
                    <span class="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full"><?php echo count($programs); ?> Active</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th class="p-4">Program</th>
                                <th class="p-4">Age Group</th>
                                <th class="p-4">Timings</th>
                                <th class="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php if (!empty($programs)): ?>
                                <?php foreach ($programs as $p): ?>
                                    <tr class="hover:bg-slate-50/50">
                                        <td class="p-4">
                                            <div class="font-bold text-slate-900 text-sm"><?php echo htmlspecialchars($p['name']); ?></div>
                                            <div class="text-[11px] text-slate-400">Batch: <?php echo htmlspecialchars($p['student_ratio']); ?></div>
                                        </td>
                                        <td class="p-4 font-semibold text-amber-700"><?php echo htmlspecialchars($p['age_group']); ?></td>
                                        <td class="p-4 text-slate-500"><?php echo htmlspecialchars($p['timings'] ?? 'N/A'); ?></td>
                                        <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                            <a href="programs.php?action=edit&id=<?php echo $p['id']; ?>" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs inline-flex items-center gap-1">
                                                <i data-lucide="edit-2" class="w-3 h-3"></i> Edit
                                            </a>
                                            <a href="programs.php?action=delete&id=<?php echo $p['id']; ?>" onclick="return confirm('Are you sure you want to delete this program from MySQL?');" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs inline-flex items-center gap-1">
                                                <i data-lucide="trash-2" class="w-3 h-3"></i> Delete
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr><td colspan="4" class="p-6 text-center text-slate-400">No programs in database.</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
