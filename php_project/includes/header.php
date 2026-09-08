<?php
if (!defined('SITE_NAME')) {
    require_once __DIR__ . '/../config/db.php';
}
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . " - " . SITE_NAME : SITE_NAME . " | Nurturing Bright Minds"; ?></title>
    <meta name="description" content="Little Stars Kindergarten - Fostering curiosity, empathy, and foundational excellence in early childhood.">
    <!-- Tailwind CSS CDN for elegant modern styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Quicksand:wght@600;700;800&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1, h2, h3, h4, .font-display { font-family: 'Quicksand', sans-serif; }

        /* ==========================================================================
           Refined Intentional & Performance-Optimized Motion System
           ========================================================================== */

        /* Smooth Easings & GPU Acceleration Utilities */
        :root {
            --ease-out-smooth: cubic-bezier(0.2, 0.8, 0.2, 1);
            --ease-spring-subtle: cubic-bezier(0.34, 1.3, 0.64, 1);
            --duration-fast: 200ms;
            --duration-normal: 300ms;
            --duration-slow: 500ms;
        }

        /* Subtle Keyframes using strictly hardware-accelerated transform & opacity */
        @keyframes floatSubtle {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -6px, 0); }
        }

        @keyframes pulseSoft {
            0%, 100% { opacity: 1; transform: scale3d(1, 1, 1); }
            50% { opacity: 0.85; transform: scale3d(1.02, 1.02, 1); }
        }

        @keyframes fadeInSubtle {
            from { opacity: 0; transform: translate3d(0, 12px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* Performance Optimized Animation Classes */
        .animate-float-slow {
            animation: floatSubtle 6s var(--ease-out-smooth) infinite;
            will-change: transform;
        }
        
        .animate-fade-in-up {
            animation: fadeInSubtle var(--duration-slow) var(--ease-out-smooth) forwards;
            will-change: transform, opacity;
        }

        /* Hover Elevation Micro-Interactions */
        .hover-lift {
            transition: transform var(--duration-normal) var(--ease-out-smooth),
                        box-shadow var(--duration-normal) var(--ease-out-smooth);
            will-change: transform;
            backface-visibility: hidden;
        }
        
        .hover-lift:hover {
            transform: translate3d(0, -4px, 0);
            box-shadow: 0 12px 24px -6px rgba(245, 158, 11, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.04);
        }

        /* Image Scale Micro-Interaction */
        .img-zoom-hover {
            transition: transform 500ms var(--ease-out-smooth);
            will-change: transform;
            backface-visibility: hidden;
        }
        
        .group:hover .img-zoom-hover {
            transform: scale3d(1.03, 1.03, 1);
        }

        /* ==========================================================================
           Scroll-Triggered Reveal Animations (IntersectionObserver System)
           ========================================================================== */

        /* Base Reveal State: Sections, Cards & Headings (Fade + 30px upward movement) */
        .scroll-reveal {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
            transition: opacity 700ms var(--ease-out-smooth),
                        transform 700ms var(--ease-out-smooth);
            will-change: opacity, transform;
            backface-visibility: hidden;
        }

        /* Image Reveal State (Fade + scale 0.95 -> 1) */
        .scroll-reveal-img {
            opacity: 0;
            transform: scale3d(0.95, 0.95, 1);
            transition: opacity 750ms var(--ease-out-smooth),
                        transform 750ms var(--ease-out-smooth);
            will-change: opacity, transform;
            backface-visibility: hidden;
        }

        /* Triggered Active State when scrolled into viewport */
        .scroll-reveal.is-revealed {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        .scroll-reveal-img.is-revealed {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }

        /* Stagger Delays for Cards, Items & Grids */
        .stagger-1 { transition-delay: 100ms; }
        .stagger-2 { transition-delay: 200ms; }
        .stagger-3 { transition-delay: 300ms; }
        .stagger-4 { transition-delay: 400ms; }
        .stagger-5 { transition-delay: 500ms; }

        /* Accessibility & No-JS Fallback */
        html.no-js .scroll-reveal,
        html.no-js .scroll-reveal-img {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            .animate-float-slow,
            .animate-fade-in-up,
            .hover-lift,
            .img-zoom-hover,
            .scroll-reveal,
            .scroll-reveal-img {
                animation: none !important;
                transform: none !important;
                transition: none !important;
                opacity: 1 !important;
            }
        }
        /* Preloader Overlay System */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 500ms ease-out, visibility 500ms ease-out;
        }

        #preloader.preloader-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        @keyframes starPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.15) rotate(8deg); opacity: 0.85; }
        }

        .preloader-star {
            width: 68px;
            height: 68px;
            background: #f59e0b;
            color: #451a03;
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            font-weight: 900;
            box-shadow: 0 12px 28px -6px rgba(245, 158, 11, 0.45);
            animation: starPulse 1.2s ease-in-out infinite;
        }

        .preloader-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #f59e0b;
            margin: 0 3px;
            animation: dotsBounce 1.4s infinite ease-in-out both;
        }

        .preloader-dots span:nth-child(1) { animation-delay: -0.32s; }
        .preloader-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dotsBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
    <script>document.documentElement.classList.remove('no-js');</script>
</head>
<body class="bg-amber-50/20 text-slate-800 antialiased flex flex-col min-h-screen">

    <!-- Page Preloading Animation Screen -->
    <div id="preloader">
        <div class="preloader-star">★</div>
        <div style="font-family: 'Quicksand', sans-serif; font-weight: 800; font-size: 22px; color: #0f172a; margin-top: 18px; tracking: -0.5px;">Little Stars</div>
        <div style="font-size: 11px; font-weight: 700; color: #d97706; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">Kindergarten & Nursery</div>
        <div class="preloader-dots" style="margin-top: 22px;">
            <span></span><span></span><span></span>
        </div>
    </div>

    <!-- Top Announcement Bar -->
    <div class="bg-amber-500 text-amber-950 text-xs font-semibold py-2 px-4">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div class="flex items-center gap-4">
                <span class="inline-flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5"></i> <?php echo CONTACT_PHONE; ?></span>
                <span class="hidden sm:inline-flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5"></i> <?php echo CONTACT_EMAIL; ?></span>
            </div>
            <div class="flex items-center gap-3">
                <span class="bg-white/80 px-2 py-0.5 rounded-full text-amber-900 text-[11px] font-bold">Admissions Open 2026-27</span>
                <a href="admin/login.php" class="text-amber-950 underline hover:text-white transition">Staff Portal</a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-amber-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <a href="index.php" class="flex items-center gap-3 group">
                    <div class="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-display font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
                        ★
                    </div>
                    <div>
                        <div class="font-display font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">Little Stars</div>
                        <div class="text-xs tracking-wider text-amber-600 font-bold uppercase">Kindergarten & Nursery</div>
                    </div>
                </a>

                <!-- Desktop Navigation Links -->
                <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
                    <a href="index.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'index' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Home</a>
                    <a href="about.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'about' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">About Us</a>
                    <a href="programs.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'programs' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Programs</a>
                    <a href="activities.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'activities' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Activities</a>
                    <a href="facilities.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'facilities' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Facilities</a>
                    <a href="gallery.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'gallery' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Gallery</a>
                    <a href="admissions.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'admissions' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Admissions</a>
                    <a href="contact.php" class="px-3 py-2 rounded-lg text-sm font-semibold transition <?php echo $current_page == 'contact' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/50'; ?>">Contact Us</a>
                </nav>

                <!-- Action CTA -->
                <div class="hidden sm:flex items-center gap-3">
                    <a href="admissions.php" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm shadow-sm hover:shadow transition transform active:scale-95">
                        Apply Online
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobileMenu" class="hidden lg:hidden border-t border-amber-100 bg-white px-4 pt-3 pb-6 space-y-2">
            <a href="index.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Home</a>
            <a href="about.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">About Us</a>
            <a href="programs.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Programs</a>
            <a href="activities.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Activities</a>
            <a href="facilities.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Facilities</a>
            <a href="gallery.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Gallery</a>
            <a href="admissions.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Admissions</a>
            <a href="contact.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50">Contact Us</a>
            <a href="admin/login.php" class="block px-3 py-2 rounded-lg text-base font-semibold text-amber-700 bg-amber-50">Admin Panel</a>
            <a href="admissions.php" class="block text-center mt-3 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold">Apply for Admission</a>
        </div>
    </header>
