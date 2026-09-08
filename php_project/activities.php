<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Activities & Routine";
require_once __DIR__ . '/includes/header.php';
?>

<!-- Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Enriching Experiences</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">Learning Activities & Daily Routine</h1>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto text-sm">
            Discover the thoughtfully balanced mix of intellectual stimulation, physical agility, and creative expression that fills each day at Little Stars.
        </p>
    </div>
</section>

<!-- Activities Grid -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <!-- Card 1 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-1">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80" alt="Arts" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">Creative Expression</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Visual Arts & Pottery Studio</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            Exploring finger paints, organic clay sculpture, leaf stamping, paper tearing, and collage making to master fine-motor pencil grip.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Builds patience and spatial composition
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-2">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80" alt="Music" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">Auditory & Rhythmic</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Music, Percussion & Movement</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            Using maracas, xylophones, and triangle chimes alongside traditional folk action rhymes to cultivate auditory sensitivity and bilateral rhythm.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Enhances phonemic rhythm & speech
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-3">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80" alt="Storytelling" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Language Emergence</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Dramatic Play & Puppetry</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            Children don character capes, puppet animals, and role-play everyday situations like grocery shops, fire-fighters, and doctors to foster empathy.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Builds social confidence & dialogue
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-1">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=700&q=80" alt="Nature" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Early Science</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Little Botanists & Nature Lab</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            Sowing mustard seeds in recycled pots, tracking sapling shoots, observing worm farms, and child-safe floating vs sinking water physics.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Nurtures environmental care & curiosity
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-2">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80" alt="Phonics" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Phonemic Mastery</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Jolly Phonics & Reading Nook</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            42 core phonetic sounds taught with corresponding physical gestures, catchy songs, flash-card games, and cozy bean-bag storybook hours.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Independent reading fluency by UKG
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col scroll-reveal stagger-3">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=700&q=80" alt="Gymnastics" class="h-full w-full object-cover">
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">Gross Motor Fitness</span>
                        <h3 class="font-display font-bold text-xl text-slate-900 mt-2 mb-2">Obstacle Hurdles & Yoga</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">
                            Animal stretch yoga poses, balance beams, ring hopping, foam hurdles, and parachute canopy games building agility and cardiovascular health.
                        </p>
                    </div>
                    <div class="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Strong coordination and vestibular balance
                    </div>
                </div>
            </div>
        </div>

        <!-- Daily Routine Table -->
        <div class="bg-amber-50/50 p-8 sm:p-10 rounded-3xl border border-amber-100 scroll-reveal">
            <div class="text-center max-w-xl mx-auto mb-8">
                <h3 class="font-display font-bold text-2xl text-slate-900">A Typical Day at Little Stars</h3>
                <p class="text-xs text-slate-600 mt-1">Predictable rhythms create security, confidence, and smooth transitions for early learners.</p>
            </div>

            <div class="max-w-3xl mx-auto space-y-3 text-xs sm:text-sm">
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-1">
                    <span class="font-bold text-amber-700 w-36">08:30 AM - 09:00 AM</span>
                    <span class="font-semibold text-slate-900 flex-1">Arrival, Temperature Check & Warm Welcome</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Individual Greetings</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-2">
                    <span class="font-bold text-amber-700 w-36">09:00 AM - 09:30 AM</span>
                    <span class="font-semibold text-slate-900 flex-1">Morning Circle Time, National Anthem & Action Rhymes</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Whole Group</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-3">
                    <span class="font-bold text-amber-700 w-36">09:30 AM - 10:30 AM</span>
                    <span class="font-semibold text-slate-900 flex-1">Montessori Apparatus & Language / Phonics Work</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Guided Centers</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-4">
                    <span class="font-bold text-amber-700 w-36">10:30 AM - 11:00 AM</span>
                    <span class="font-semibold text-slate-900 flex-1">Healthy Fruit & Milk Snack Time + Handwashing Drill</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Nutrition & Table Manners</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-5">
                    <span class="font-bold text-amber-700 w-36">11:00 AM - 11:45 AM</span>
                    <span class="font-semibold text-slate-900 flex-1">Outdoor Adventure Play, Sandpit & Splash Pool</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Gross Motor Fun</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-1">
                    <span class="font-bold text-amber-700 w-36">11:45 AM - 12:30 PM</span>
                    <span class="font-semibold text-slate-900 flex-1">Art & Craft / Sensory Lab / Junior STEM</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Tactile Creation</span>
                </div>
                <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 scroll-reveal stagger-2">
                    <span class="font-bold text-amber-700 w-36">12:30 PM - 01:00 PM</span>
                    <span class="font-semibold text-slate-900 flex-1">Story Hour, Pack-Up & Happy Departure</span>
                    <span class="text-slate-500 text-xs hidden sm:inline">Reflection & Bus Boarding</span>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
