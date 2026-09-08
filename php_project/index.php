<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Home";

// Fetch active programs dynamically from MySQL
try {
    $stmt = $pdo->prepare("SELECT * FROM programs WHERE is_active = 1 ORDER BY id ASC");
    $stmt->execute();
    $programs = $stmt->fetchAll();
} catch (PDOException $e) {
    $programs = [];
}

require_once __DIR__ . '/includes/header.php';
?>

<!-- 1. Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-white py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left scroll-reveal">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold tracking-wide">
                    <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Admissions Open for Academic Year 2026-27
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                    Where Tiny Steps Lead to <span class="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">Big Dreams!</span>
                </h1>
                <p class="text-lg text-slate-600 max-w-2xl leading-relaxed">
                    At Little Stars Kindergarten, we cultivate each child's innate curiosity through playful discovery, affectionate care, and foundational early learning excellence.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                    <a href="admissions.php" class="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:shadow-xl transition transform hover:-translate-y-0.5 text-center">
                        Apply for Admission
                    </a>
                    <a href="programs.php" class="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200 shadow-sm transition text-center flex items-center justify-center gap-2">
                        <i data-lucide="compass" class="w-5 h-5 text-amber-500"></i> Explore Classes
                    </a>
                </div>

                <!-- Fast Stats -->
                <div class="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/60 max-w-lg mx-auto lg:mx-0 scroll-reveal stagger-1">
                    <div>
                        <div class="text-2xl sm:text-3xl font-display font-black text-slate-900">1:10</div>
                        <div class="text-xs font-semibold text-slate-500">Teacher Allocation</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-display font-black text-amber-600">12+</div>
                        <div class="text-xs font-semibold text-slate-500">Years of Care</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-display font-black text-emerald-600">100%</div>
                        <div class="text-xs font-semibold text-slate-500">Safe Campus</div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-5 relative scroll-reveal-img stagger-2">
                <div class="relative mx-auto max-w-md lg:max-w-none">
                    <!-- Image Showcase with badge -->
                    <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" alt="Kindergarten children playing and learning" class="w-full h-96 object-cover object-center">
                    </div>
                    <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
                            ★
                        </div>
                        <div>
                            <div class="font-display font-bold text-slate-900 text-sm">Rated #1 Preschool</div>
                            <div class="text-xs text-slate-500">Recognized for Early Childhood Care</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. Kindergarten Introduction -->
<section class="py-16 bg-white border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
            <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Welcome to Little Stars</h2>
            <p class="text-3xl sm:text-4xl font-display font-bold text-slate-900">A Place to Grow, Laugh, and Learn Every Day</p>
            <p class="mt-4 text-slate-600 leading-relaxed">
                Founded with a vision to nurture confident, kind, and inquisitive lifelong learners. We blend the best principles of play-way pedagogy with hands-on Montessori tactile exploration.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl bg-amber-50/50 border border-amber-100 text-center scroll-reveal stagger-1">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center mb-5 text-2xl font-bold">
                    <i data-lucide="heart" class="w-7 h-7"></i>
                </div>
                <h3 class="font-display font-bold text-xl text-slate-900 mb-2">Warm, Loving Care</h3>
                <p class="text-sm text-slate-600 leading-relaxed">Every child receives personal warmth and attentive emotional encouragement from certified, compassionate early educators.</p>
            </div>

            <div class="p-8 rounded-2xl bg-sky-50/50 border border-sky-100 text-center scroll-reveal stagger-2">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-sky-400 text-sky-950 flex items-center justify-center mb-5 text-2xl font-bold">
                    <i data-lucide="puzzle" class="w-7 h-7"></i>
                </div>
                <h3 class="font-display font-bold text-xl text-slate-900 mb-2">Play-Way Learning</h3>
                <p class="text-sm text-slate-600 leading-relaxed">Structured learning concealed inside joyous games, rhymes, sensory trays, and tactile challenges that spark imagination.</p>
            </div>

            <div class="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center scroll-reveal stagger-3">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-400 text-emerald-950 flex items-center justify-center mb-5 text-2xl font-bold">
                    <i data-lucide="shield-check" class="w-7 h-7"></i>
                </div>
                <h3 class="font-display font-bold text-xl text-slate-900 mb-2">Zero-Compromise Safety</h3>
                <p class="text-sm text-slate-600 leading-relaxed">Child-proofed premises, biometric checkpoints, complete CCTV surveillance, and dedicated female support staff on every floor.</p>
            </div>
        </div>
    </div>
</section>

<!-- 3. Our Programs (Dynamic from MySQL) -->
<section class="py-20 bg-amber-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 scroll-reveal">
            <div>
                <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Our Academic Classes</h2>
                <p class="text-3xl sm:text-4xl font-display font-bold text-slate-900">Nurturing Every Milestone</p>
            </div>
            <a href="programs.php" class="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5">
                View All Program Details <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php if (!empty($programs)): ?>
                <?php foreach ($programs as $index => $prog): ?>
                    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover-lift transition flex flex-col group scroll-reveal stagger-<?php echo ($index % 4) + 1; ?>">
                        <div class="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                            <img src="<?php echo htmlspecialchars($prog['image_url']); ?>" alt="<?php echo htmlspecialchars($prog['name']); ?>" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500">
                            <span class="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-700 shadow-sm">
                                <?php echo htmlspecialchars($prog['age_group']); ?>
                            </span>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="font-display font-bold text-lg sm:text-xl text-slate-900 mb-2 min-h-[56px] flex items-center"><?php echo htmlspecialchars($prog['name']); ?></h3>
                                <p class="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed min-h-[48px]">
                                    <?php echo htmlspecialchars($prog['description']); ?>
                                </p>
                                <div class="text-xs text-slate-500 space-y-1.5 mb-5 pt-2 border-t border-slate-100">
                                    <div class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i> <?php echo htmlspecialchars($prog['timings'] ?? 'Morning Batch'); ?></div>
                                    <div class="flex items-center gap-1.5"><i data-lucide="users" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i> Batch Size: <?php echo htmlspecialchars($prog['student_ratio'] ?? '1:10'); ?></div>
                                </div>
                            </div>
                            <a href="admissions.php?class=<?php echo urlencode($prog['name']); ?>" class="w-full text-center py-3 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-amber-950 font-bold text-xs shadow-2xs transition">
                                Enquire for <?php echo htmlspecialchars($prog['name']); ?>
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="col-span-4 p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                    <p class="text-slate-500">No programs found in database. Please seed the database via the admin panel.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- 4. Learning Activities -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14 scroll-reveal">
            <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Holistic Development</h2>
            <p class="text-3xl sm:text-4xl font-display font-bold text-slate-900">Joyful Learning Activities</p>
            <p class="mt-3 text-slate-600 text-sm">Our balanced daily curriculum integrates artistic expression, sensory science, physical agility, and language enrichment.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-1">
                <div class="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4"><i data-lucide="palette" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Creative Arts & Crafts</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Finger painting, clay modeling, collage crafting, and recycling artistry enhancing fine motor grip and creative confidence.</p>
                <span class="text-xs font-semibold text-pink-600">Daily 45 Min Session</span>
            </div>

            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-2">
                <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4"><i data-lucide="music" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Music, Rhythm & Dance</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Action rhymes, percussion drums, musical bells, and joyful dancing that spark rhythm perception and listening acuity.</p>
                <span class="text-xs font-semibold text-purple-600">Morning Circle Integration</span>
            </div>

            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-3">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><i data-lucide="book-open" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Storytelling & Puppetry</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Immersive moral fables, sock puppet theaters, and illustrated picture book read-alouds developing rich verbal vocabulary.</p>
                <span class="text-xs font-semibold text-blue-600">Interactive Reading Nook</span>
            </div>

            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-1">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4"><i data-lucide="sprout" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Little Botanists & Nature Lab</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Organic gardening patches, caterpillar lifecycle observation, leaf pressing, and gentle environmental science.</p>
                <span class="text-xs font-semibold text-emerald-600">Outdoor Exploration</span>
            </div>

            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-2">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4"><i data-lucide="sparkles" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Phonics & Speech Gym</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Jolly Phonics multi-sensory sound recognition, tongue twister challenges, and vocabulary bingo games.</p>
                <span class="text-xs font-semibold text-amber-600">Language Readiness</span>
            </div>

            <div class="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition scroll-reveal stagger-3">
                <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4"><i data-lucide="activity" class="w-6 h-6"></i></div>
                <h3 class="font-display font-bold text-lg text-slate-900 mb-2">Gross Motor Obstacle Play</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">Balance beams, tunnel crawls, ring tosses, soft hurdles, and tag games building spatial awareness and agility.</p>
                <span class="text-xs font-semibold text-indigo-600">Physical Fitness</span>
            </div>
        </div>
    </div>
</section>

<!-- 5. Facilities Overview -->
<section class="py-20 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14 scroll-reveal">
            <h2 class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">World-Class Infrastructure</h2>
            <p class="text-3xl sm:text-4xl font-display font-bold text-white">Child-Centric Campus Facilities</p>
            <p class="mt-3 text-slate-400 text-sm">Every square foot of our campus is designed with pediatric safety, clean hygiene, and joyful engagement as absolute priorities.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 scroll-reveal stagger-1">
                <i data-lucide="monitor-check" class="w-8 h-8 text-amber-400 mb-4"></i>
                <h3 class="font-display font-bold text-lg text-white mb-2">Smart Interactive Rooms</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Air-conditioned classrooms with child-ergonomic wooden tables, interactive touch panels, and natural sunlight.</p>
            </div>
            <div class="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 scroll-reveal stagger-2">
                <i data-lucide="trees" class="w-8 h-8 text-amber-400 mb-4"></i>
                <h3 class="font-display font-bold text-lg text-white mb-2">Rubberized Adventure Play</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Shock-absorbent play ground with safety swings, climbing slides, sensory sandpits, and gentle turf grass.</p>
            </div>
            <div class="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 scroll-reveal stagger-3">
                <i data-lucide="waves" class="w-8 h-8 text-amber-400 mb-4"></i>
                <h3 class="font-display font-bold text-lg text-white mb-2">Heated Splash Pool</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Safe 1-foot water depth splash pool with trained lifeguards, sanitized weekly for fun water confidence sessions.</p>
            </div>
        </div>

        <div class="mt-10 text-center scroll-reveal">
            <a href="facilities.php" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition">
                Explore All Facilities <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>
    </div>
</section>

<!-- 6. Why Choose Us -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="scroll-reveal">
                <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Why Little Stars</h2>
                <p class="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">The Ideal Foundation for Your Child's Bright Journey</p>
                <p class="mt-4 text-slate-600 leading-relaxed">
                    Choosing the right preschool is one of the most significant decisions for a family. We partner closely with parents through transparent communication, emotional warmth, and individualized attention.
                </p>

                <div class="mt-8 space-y-4">
                    <div class="flex items-start gap-4 scroll-reveal stagger-1">
                        <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">Certified & Passionate Educators</h4>
                            <p class="text-xs text-slate-500">Every teacher is certified in Early Childhood Care & Education (ECCE) and pediatric first aid.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 scroll-reveal stagger-2">
                        <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">Low 1:10 Student-to-Teacher Size</h4>
                            <p class="text-xs text-slate-500">Guarantees that your child is never lost in the crowd and receives gentle individualized coaching.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 scroll-reveal stagger-3">
                        <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">Healthy Nutrition & Daily Fresh Meals</h4>
                            <p class="text-xs text-slate-500">Nutritionist planned hot vegetarian lunches and fresh fruit snacks cooked on campus.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" alt="Classroom learning" class="rounded-2xl shadow-md h-64 w-full object-cover scroll-reveal-img stagger-1">
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80" alt="Outdoor play" class="rounded-2xl shadow-md h-64 w-full object-cover mt-8 scroll-reveal-img stagger-2">
            </div>
        </div>
    </div>
</section>

<!-- 7. Gallery Preview -->
<section class="py-20 bg-amber-50/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-10 scroll-reveal">
            <div>
                <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Life at Little Stars</h2>
                <p class="text-3xl font-display font-bold text-slate-900">Campus Photo Highlights</p>
            </div>
            <a href="gallery.php" class="text-sm font-bold text-amber-600 hover:underline flex items-center gap-1">
                View Full Gallery <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="rounded-2xl overflow-hidden shadow-sm h-52 group scroll-reveal-img stagger-1">
                <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="Art session">
            </div>
            <div class="rounded-2xl overflow-hidden shadow-sm h-52 group scroll-reveal-img stagger-2">
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="Sports Day">
            </div>
            <div class="rounded-2xl overflow-hidden shadow-sm h-52 group scroll-reveal-img stagger-3">
                <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="Morning Circle">
            </div>
            <div class="rounded-2xl overflow-hidden shadow-sm h-52 group scroll-reveal-img stagger-4">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="Science Curiosity">
            </div>
        </div>
    </div>
</section>

<!-- 8. Parent Testimonials -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14 scroll-reveal">
            <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Voices of Love</h2>
            <p class="text-3xl font-display font-bold text-slate-900">What Our Parents Say</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col justify-between scroll-reveal stagger-1">
                <p class="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "Little Stars transformed Vihaan from a shy toddler into a confident, chatty boy! The teachers give mothers warmth and personal care. The daily updates and safety measures give me complete peace of mind."
                </p>
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" class="w-11 h-11 rounded-full object-cover" alt="Parent">
                    <div>
                        <div class="font-bold text-sm text-slate-900">Dr. Radhika Sen</div>
                        <div class="text-xs text-amber-600 font-semibold">Mother of Vihaan (Nursery)</div>
                    </div>
                </div>
            </div>

            <div class="p-8 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col justify-between scroll-reveal stagger-2">
                <p class="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "The phonics and foundational math approach here is extraordinary. Ananya already reads full storybooks effortlessly. Her graduation preparation for formal primary schooling was seamless."
                </p>
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" class="w-11 h-11 rounded-full object-cover" alt="Parent">
                    <div>
                        <div class="font-bold text-sm text-slate-900">Karthik & Shalini Iyer</div>
                        <div class="text-xs text-amber-600 font-semibold">Parents of Ananya (UKG)</div>
                    </div>
                </div>
            </div>

            <div class="p-8 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col justify-between scroll-reveal stagger-3">
                <p class="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "The facilities, cleanliness, splash pool, and healthy meal provisions are top notch. Kabir literally runs through the school gate with a giant smile every single morning!"
                </p>
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" class="w-11 h-11 rounded-full object-cover" alt="Parent">
                    <div>
                        <div class="font-bold text-sm text-slate-900">Rajesh Malhotra</div>
                        <div class="text-xs text-amber-600 font-semibold">Father of Kabir (Play Group)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 9. Admission Call to Action Banner -->
<section class="py-14 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
        <div class="space-y-2 mb-6 sm:mb-0">
            <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-white">Begin Your Child's Journey with Us Today</h3>
            <p class="text-sm text-amber-100 max-w-xl">Book a scheduled campus tour or submit an online admission enquiry for fast processing.</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
            <a href="admissions.php" class="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-slate-100 transition text-center">
                Submit Online Enquiry
            </a>
            <a href="contact.php" class="px-8 py-3.5 rounded-xl bg-amber-700 text-white font-bold text-sm hover:bg-amber-800 transition text-center">
                Contact Campus
            </a>
        </div>
    </div>
</section>

<!-- 10. Contact Information Snippet -->
<section class="py-16 bg-white border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-100 scroll-reveal stagger-1">
                <i data-lucide="map-pin" class="w-6 h-6 text-amber-500 mx-auto mb-2"></i>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Campus Location</h4>
                <p class="text-xs text-slate-500"><?php echo SCHOOL_ADDRESS; ?></p>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-100 scroll-reveal stagger-2">
                <i data-lucide="phone-call" class="w-6 h-6 text-amber-500 mx-auto mb-2"></i>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Call Our Admissions Desk</h4>
                <p class="text-xs text-slate-500"><?php echo CONTACT_PHONE; ?></p>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-100 scroll-reveal stagger-3">
                <i data-lucide="mail" class="w-6 h-6 text-amber-500 mx-auto mb-2"></i>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Email Enquiries</h4>
                <p class="text-xs text-slate-500"><?php echo CONTACT_EMAIL; ?></p>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
