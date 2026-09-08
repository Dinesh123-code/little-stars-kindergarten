<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Campus Facilities";
require_once __DIR__ . '/includes/header.php';
?>

<!-- Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Safe, Stimulating & Spacious</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">World-Class Kindergarten Facilities</h1>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto text-sm">
            Crafted meticulously around children's heights, physical security, and sensory comfort with zero-compromise hygiene standards.
        </p>
    </div>
</section>

<!-- Facilities Grid -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Facility 1 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-1">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80" alt="Smart Classroom" class="h-full w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Learning Environment</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">Smart Air-Conditioned Classrooms</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        Rounded edge wooden furniture, anti-slip tiles, interactive digital panels, and expansive natural light to prevent eye fatigue.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> HEPA air purifiers installed</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Ergonomic child-sized tables</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Interactive multimedia audio</li>
                    </ul>
                </div>
            </div>

            <!-- Facility 2 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-2">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=700&q=80" alt="Playground" class="h-full w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Physical Recreation</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">Rubberized Adventure Playground</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        Seamless high-density rubber mulch that absorbs tumble impacts. Certified European play equipment with enclosed safety railings.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Fall-proof impact dampeners</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Sanitized sensory sandpit</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Full adult supervision always</li>
                    </ul>
                </div>
            </div>

            <!-- Facility 3 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-3">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f1?auto=format&fit=crop&w=700&q=80" alt="Splash Pool" class="h-48 w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Water Confidence</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">Heated Splash Pool</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        Custom-engineered shallow pool (12 to 14 inches) with gentle mushroom fountains, float jackets, and chlorine-free UV water filtration.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Certified swimming instructor</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Gentle warm water system</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Daily water purity testing</li>
                    </ul>
                </div>
            </div>

            <!-- Facility 4 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-1">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80" alt="Dining" class="h-full w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Health & Nutrition</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">Hygienic Dining & In-House Kitchen</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        Warm, nutritious vegetarian meals crafted daily by culinary professionals under the guidance of a registered pediatric nutritionist.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> 100% vegetarian wholesome menu</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Strict allergy segregation</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Steam-sanitized steel cutlery</li>
                    </ul>
                </div>
            </div>

            <!-- Facility 5 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-2">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80" alt="Security" class="h-full w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Total Safety</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">360° CCTV & Biometric Campus</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        High-definition night-vision cameras covering every corner, entrance checkpoint, and corridor with live cloud recording and authorized guardian pickup cards.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Real-time parent camera access</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Verified visitor escort policy</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> On-campus nurse and medical bay</li>
                    </ul>
                </div>
            </div>

            <!-- Facility 6 -->
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition scroll-reveal stagger-3">
                <div class="scroll-reveal-img h-48 w-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80" alt="Transport" class="h-full w-full object-cover">
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase text-amber-600">Daily Commute</span>
                    <h3 class="font-display font-bold text-xl text-slate-900 mt-1 mb-2">GPS-Tracked Safe Transport</h3>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        Fleet of customized air-conditioned buses with child seat belts, speed governors, trained background-verified drivers, and female conductors on every run.
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-500">
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Real-time parent GPS mobile app</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Female attendant inside bus</li>
                        <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Speed capped under 40 km/h</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
