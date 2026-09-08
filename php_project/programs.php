<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Programs & Classes";

// Fetch programs dynamically from MySQL
try {
    $stmt = $pdo->prepare("SELECT * FROM programs WHERE is_active = 1 ORDER BY id ASC");
    $stmt->execute();
    $programs = $stmt->fetchAll();
} catch (PDOException $e) {
    $programs = [];
    $error = "Failed to load programs: " . $e->getMessage();
}

require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Ages 1.5 to 5.5 Years</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">Our Learning Programs</h1>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Carefully curated, stage-appropriate developmental pathways designed to inspire creativity, social bonding, and academic confidence.
        </p>
    </div>
</section>

<!-- Dynamic Programs Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <?php if (!empty($programs)): ?>
            <?php foreach ($programs as $index => $program): 
                // Parse activities (supports comma separated or JSON)
                $rawActs = $program['activities'];
                $activitiesList = [];
                if (substr($rawActs, 0, 1) === '[') {
                    $decoded = json_decode($rawActs, true);
                    $activitiesList = is_array($decoded) ? $decoded : [];
                }
                if (empty($activitiesList)) {
                    $activitiesList = array_map('trim', explode(',', $rawActs));
                }
            ?>
                <div class="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover-lift transition scroll-reveal">
                    <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                        <!-- Image Column (Uniform 5/12 width for all programs) -->
                        <div class="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-slate-100 scroll-reveal-img">
                            <img src="<?php echo htmlspecialchars($program['image_url']); ?>" alt="<?php echo htmlspecialchars($program['name']); ?>" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
                            <div class="absolute top-4 left-4 bg-amber-500 text-amber-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md">
                                <?php echo htmlspecialchars($program['age_group']); ?>
                            </div>
                        </div>

                        <!-- Content Column (Uniform 7/12 width for all programs) -->
                        <div class="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <h2 class="text-2xl sm:text-3xl font-display font-bold text-slate-900"><?php echo htmlspecialchars($program['name']); ?></h2>
                                    <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                        Batch Size: <?php echo htmlspecialchars($program['student_ratio'] ?? '1:10'); ?>
                                    </span>
                                </div>
                                <div class="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-4">
                                    <i data-lucide="clock" class="w-4 h-4 text-amber-500"></i>
                                    <span>Class Timings: <?php echo htmlspecialchars($program['timings'] ?? '08:30 AM - 12:00 PM'); ?></span>
                                </div>

                                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                                    <?php echo nl2br(htmlspecialchars($program['description'])); ?>
                                </p>

                                <!-- Activities Tag List -->
                                <div class="mb-8">
                                    <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500"></i> Core Learning Activities:
                                    </h4>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <?php foreach ($activitiesList as $act): ?>
                                            <div class="flex items-center gap-2 text-xs text-slate-700 bg-amber-50/60 border border-amber-100/80 px-3 py-2 rounded-xl">
                                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                                <span><?php echo htmlspecialchars($act); ?></span>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div class="text-xs text-slate-500">
                                    ✓ Uniform, study materials & healthy snack included
                                </div>
                                <a href="admissions.php?class=<?php echo urlencode($program['name']); ?>" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm text-center shadow-sm transition">
                                    Apply for <?php echo htmlspecialchars($program['name']); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p class="text-slate-500 text-base">No active programs available. Please check MySQL database connection.</p>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- Curriculum Highlights -->
<section class="py-14 bg-amber-50/40 border-t border-amber-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm scroll-reveal stagger-1">
                <div class="text-3xl font-display font-black text-amber-500 mb-1">Play-Way</div>
                <div class="text-sm font-bold text-slate-900 mb-2">Experiential Learning</div>
                <p class="text-xs text-slate-500">Learning concepts through physical games, songs, sensory textures, and role-playing adventures.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm scroll-reveal stagger-2">
                <div class="text-3xl font-display font-black text-sky-500 mb-1">Montessori</div>
                <div class="text-sm font-bold text-slate-900 mb-2">Self-Paced Exploration</div>
                <p class="text-xs text-slate-500">Tactile apparatus that allow children to discover balance, size, letters, and numbers independently.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm scroll-reveal stagger-3">
                <div class="text-3xl font-display font-black text-emerald-500 mb-1">STEM Junior</div>
                <div class="text-sm font-bold text-slate-900 mb-2">Inquiry & Curiosity</div>
                <p class="text-xs text-slate-500">Early science wonders, seed cultivation, child-safe magnets, and shape geometry construction.</p>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
