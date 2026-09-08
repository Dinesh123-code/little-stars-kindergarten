<?php
require_once __DIR__ . '/config/db.php';
$page_title = "About Us";
require_once __DIR__ . '/includes/header.php';
?>

<!-- Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Our Heritage & Values</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">About Little Stars Kindergarten</h1>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Dedicated to honoring the golden years of early childhood with joy, reverence, and academic enlightenment since 2014.
        </p>
    </div>
</section>

<!-- Vision, Mission & Philosophy -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div class="scroll-reveal">
                <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Our Foundation</h2>
                <h3 class="text-3xl font-display font-bold text-slate-900 mb-6 leading-tight">Every Child Is a Universe of Limitless Potential</h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-4">
                    Little Stars was established with the conviction that education in the earliest formative years should not be a mechanical chore, but a thrilling adventure of sensory discovery, artistic joy, and warm companionship.
                </p>
                <p class="text-slate-600 text-sm leading-relaxed mb-6">
                    We combine the best of structured play-way inquiry with Montessori tactile self-directed exploration, allowing children to develop self-regulation, empathy, phonemic clarity, and numerical intuition at their natural pace.
                </p>

                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-100 scroll-reveal stagger-1">
                        <div class="font-display font-bold text-slate-900 text-base mb-1">Our Vision</div>
                        <p class="text-xs text-slate-600">To cultivate compassionate, curious, and resilient young citizens who love learning.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-100 scroll-reveal stagger-2">
                        <div class="font-display font-bold text-slate-900 text-base mb-1">Our Mission</div>
                        <p class="text-xs text-slate-600">To provide a safe, affectionate, and stimulating environment honoring every child's unique pace.</p>
                    </div>
                </div>
            </div>

            <div class="relative scroll-reveal-img">
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80" alt="Kindergarten classroom" class="rounded-3xl shadow-xl w-full h-[420px] object-cover">
                <div class="absolute -bottom-6 -right-6 bg-amber-400 text-amber-950 p-6 rounded-2xl font-display font-extrabold shadow-lg hidden sm:block">
                    <div class="text-3xl">12+ Years</div>
                    <div class="text-xs uppercase tracking-wider font-bold">Of Childcare Excellence</div>
                </div>
            </div>
        </div>

        <!-- Principal's Message -->
        <div class="bg-amber-50/60 p-8 sm:p-12 rounded-3xl border border-amber-200/80 mb-16 scroll-reveal">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div class="md:col-span-4 text-center scroll-reveal-img stagger-1">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80" alt="Principal" class="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-md">
                    <div class="font-display font-bold text-lg text-slate-900 mt-3">Sarah Jenkins, M.Ed.</div>
                    <div class="text-xs text-amber-700 font-semibold">Founding Director & Principal</div>
                </div>
                <div class="md:col-span-8 space-y-4 scroll-reveal stagger-2">
                    <h3 class="text-2xl font-display font-bold text-slate-900">A Message from the Principal</h3>
                    <p class="text-slate-600 text-sm leading-relaxed italic">
                        "Welcome to our Little Stars family. When children feel safe, loved, and celebrated for who they are, their minds blossom effortlessly. Here, mud play is a chemistry lesson, building blocks are architecture, and circle-time fables cultivate character. We invite you to walk this magical journey with us."
                    </p>
                    <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <span>Certified Early Childhood Educator (Harvard GSE)</span> • <span>22 Years in Pedagogy</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Core Values -->
        <div>
            <div class="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
                <h2 class="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Our Guiding Light</h2>
                <h3 class="text-3xl font-display font-bold text-slate-900">The 4 Pillars of Little Stars</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="p-6 rounded-2xl border border-slate-200 text-center scroll-reveal stagger-1">
                    <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                    <h4 class="font-display font-bold text-base text-slate-900 mb-2">Unconditional Kindness</h4>
                    <p class="text-xs text-slate-500 leading-relaxed">Empathy, sharing, peer cooperation, and respect for all living beings.</p>
                </div>
                <div class="p-6 rounded-2xl border border-slate-200 text-center scroll-reveal stagger-2">
                    <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                    <h4 class="font-display font-bold text-base text-slate-900 mb-2">Fearless Curiosity</h4>
                    <p class="text-xs text-slate-500 leading-relaxed">Encouraging every 'Why?', celebrating questions, and rewarding exploration.</p>
                </div>
                <div class="p-6 rounded-2xl border border-slate-200 text-center scroll-reveal stagger-3">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                    <h4 class="font-display font-bold text-base text-slate-900 mb-2">Creative Individuality</h4>
                    <p class="text-xs text-slate-500 leading-relaxed">Honoring varied learning styles, multiple intelligences, and artistic freedom.</p>
                </div>
                <div class="p-6 rounded-2xl border border-slate-200 text-center scroll-reveal stagger-4">
                    <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">4</div>
                    <h4 class="font-display font-bold text-base text-slate-900 mb-2">Holistic Resilience</h4>
                    <p class="text-xs text-slate-500 leading-relaxed">Building emotional grit, physical stamina, and healthy hygienic habits.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
