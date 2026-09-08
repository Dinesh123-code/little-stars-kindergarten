    <!-- Footer -->
    <footer class="mt-auto bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-amber-400">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <!-- Brand Info -->
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-display font-black text-xl">
                            ★
                        </div>
                        <span class="font-display font-bold text-2xl text-white">Little Stars</span>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">
                        A joyful, values-driven early learning sanctuary committed to holistic growth, gentle exploration, and lifelong curiosity.
                    </p>
                    <div class="flex items-center gap-3 text-slate-400">
                        <span class="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-amber-400 font-semibold">Reg. No: KA-2018-KND-091</span>
                    </div>
                </div>

                <!-- Quick Navigation -->
                <div>
                    <h4 class="font-display font-bold text-white text-base mb-4 tracking-wide uppercase">Quick Links</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="about.php" class="hover:text-amber-400 transition">About Our School</a></li>
                        <li><a href="programs.php" class="hover:text-amber-400 transition">Curriculum & Classes</a></li>
                        <li><a href="activities.php" class="hover:text-amber-400 transition">Daily Activities</a></li>
                        <li><a href="facilities.php" class="hover:text-amber-400 transition">Campus Facilities</a></li>
                        <li><a href="gallery.php" class="hover:text-amber-400 transition">Campus Photo Gallery</a></li>
                        <li><a href="admissions.php" class="hover:text-amber-400 transition">Admission Enquiry</a></li>
                    </ul>
                </div>

                <!-- Contact & Timings -->
                <div>
                    <h4 class="font-display font-bold text-white text-base mb-4 tracking-wide uppercase">Contact Info</h4>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"></i>
                            <span><?php echo SCHOOL_ADDRESS; ?></span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="phone" class="w-5 h-5 text-amber-400 shrink-0"></i>
                            <span><?php echo CONTACT_PHONE; ?></span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="mail" class="w-5 h-5 text-amber-400 shrink-0"></i>
                            <span><?php echo CONTACT_EMAIL; ?></span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="clock" class="w-5 h-5 text-amber-400 shrink-0"></i>
                            <span>Mon - Sat: 8:00 AM - 4:30 PM</span>
                        </li>
                    </ul>
                </div>

                <!-- Admissions CTA -->
                <div class="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80">
                    <h4 class="font-display font-bold text-white text-lg mb-2">Admissions Open</h4>
                    <p class="text-xs text-slate-400 mb-4">Limited seats available for Academic Year 2026-2027 across Play Group, Nursery, LKG, and UKG.</p>
                    <a href="admissions.php" class="block w-full text-center py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition">
                        Enquire Online Now
                    </a>
                    <div class="mt-4 pt-4 border-t border-slate-700 text-center">
                        <a href="admin/login.php" class="text-xs text-slate-400 hover:text-amber-400 transition flex items-center justify-center gap-1.5">
                            <i data-lucide="lock" class="w-3.5 h-3.5"></i> Admin Management Portal
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Copyright -->
            <div class="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>&copy; <?php echo date('Y'); ?> Little Stars Kindergarten. All rights reserved.</p>
                <p>Designed for Kindergarten Website Development Internship Task (PHP + MySQL)</p>
            </div>
        </div>
    </footer>

    <!-- Initialize Lucide Icons, Mobile Menu & IntersectionObserver Scroll Reveal -->
    <script>
        lucide.createIcons();
        const menuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // IntersectionObserver Scroll-Triggered Reveal Engine
        (function() {
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    root: null,
                    rootMargin: '0px 0px -40px 0px',
                    threshold: 0.1
                };

                const revealObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-revealed');
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                const targets = document.querySelectorAll('.scroll-reveal, .scroll-reveal-img');
                targets.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('is-revealed');
                    } else {
                        revealObserver.observe(el);
                    }
                });
            } else {
        // Hide Preloading Animation on Window Load
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(function() {
                    preloader.classList.add('preloader-hidden');
                }, 350);
            }
        });

        // Fallback: Ensure preloader hides even if load event takes too long
        setTimeout(function() {
            const preloader = document.getElementById('preloader');
            if (preloader && !preloader.classList.contains('preloader-hidden')) {
                preloader.classList.add('preloader-hidden');
            }
        }, 3000);
    </script>
</body>
</html>
