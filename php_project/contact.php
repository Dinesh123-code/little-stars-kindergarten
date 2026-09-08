<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Contact Us";

$errors = [];
$success_msg = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = sanitize_input($_POST['name'] ?? '');
    $email   = sanitize_input($_POST['email'] ?? '');
    $phone   = sanitize_input($_POST['phone'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    // Server-side validation
    if (empty($name)) {
        $errors[] = "Please provide your name.";
    }

    if (empty($email)) {
        $errors[] = "Please provide your email address.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email format.";
    }

    if (empty($phone)) {
        $errors[] = "Please provide your contact phone number.";
    }

    if (empty($message)) {
        $errors[] = "Please enter your message or question.";
    }

    if (empty($errors)) {
        try {
            $sql = "INSERT INTO contact_enquiries (name, email, phone, message, is_read, created_at) 
                    VALUES (:name, :email, :phone, :message, 0, NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name'    => $name,
                ':email'   => $email,
                ':phone'   => $phone,
                ':message' => $message
            ]);

            $success_msg = "Thank you for reaching out! We have received your message and will respond shortly.";
            $name = $email = $phone = $message = '';
        } catch (PDOException $e) {
            $errors[] = "Database Error: " . $e->getMessage();
        }
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<!-- Header Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">We'd Love to Hear from You</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">Contact Little Stars</h1>
        <p class="mt-3 text-slate-600 max-w-xl mx-auto text-sm">
            Have questions about tuition, curriculum, transportation routes, or timings? Get in touch with our friendly administrative team.
        </p>
    </div>
</section>

<!-- Content Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Contact Form -->
            <div class="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm scroll-reveal">
                <h3 class="text-2xl font-display font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>
                <p class="text-xs text-slate-500 mb-6">All submissions are logged in our MySQL database and reviewed by campus administration.</p>

                <?php if (!empty($success_msg)): ?>
                    <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600 shrink-0"></i>
                        <span><?php echo htmlspecialchars($success_msg); ?></span>
                    </div>
                <?php endif; ?>

                <?php if (!empty($errors)): ?>
                    <div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                        <div class="font-bold mb-1">Please correct the following:</div>
                        <ul class="list-disc list-inside space-y-1">
                            <?php foreach ($errors as $err): ?>
                                <li><?php echo htmlspecialchars($err); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>

                <form method="POST" action="contact.php" class="space-y-5" novalidate>
                    <div>
                        <label for="name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Name *</label>
                        <input type="text" id="name" name="name" required value="<?php echo htmlspecialchars($name ?? ''); ?>" placeholder="e.g. Suresh Kumar" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                            <input type="email" id="email" name="email" required value="<?php echo htmlspecialchars($email ?? ''); ?>" placeholder="name@domain.com" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>
                        <div>
                            <label for="phone" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Contact Phone *</label>
                            <input type="tel" id="phone" name="phone" required value="<?php echo htmlspecialchars($phone ?? ''); ?>" placeholder="+91 98112 34567" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="message" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Message *</label>
                        <textarea id="message" name="message" rows="5" required placeholder="Type your query regarding admissions, bus routes, daycare, or syllabus..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"><?php echo htmlspecialchars($message ?? ''); ?></textarea>
                    </div>

                    <button type="submit" class="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm shadow-sm hover:shadow transition">
                        Submit Contact Enquiry
                    </button>
                </form>
            </div>

            <!-- Contact Details & Map Card -->
            <div class="lg:col-span-5 space-y-8">
                <div class="bg-amber-50/50 p-8 rounded-3xl border border-amber-100 space-y-6 scroll-reveal stagger-1">
                    <h3 class="font-display font-bold text-xl text-slate-900">Campus Information</h3>
                    
                    <div class="space-y-4 text-sm text-slate-600">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 text-sm">School Address</div>
                                <div class="text-xs text-slate-600 mt-0.5"><?php echo SCHOOL_ADDRESS; ?></div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0">
                                <i data-lucide="phone" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 text-sm">Phone Lines</div>
                                <div class="text-xs text-slate-600 mt-0.5"><?php echo CONTACT_PHONE; ?></div>
                                <div class="text-[11px] text-slate-400">Available Mon - Sat (8am - 5pm)</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0">
                                <i data-lucide="mail" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 text-sm">Admissions Email</div>
                                <div class="text-xs text-slate-600 mt-0.5"><?php echo CONTACT_EMAIL; ?></div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0">
                                <i data-lucide="clock" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 text-sm">Visiting Hours</div>
                                <div class="text-xs text-slate-600 mt-0.5">Monday to Friday: 8:30 AM – 3:30 PM</div>
                                <div class="text-xs text-slate-600">Saturday: 9:00 AM – 1:00 PM (Prior Appointment)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interactive Location Representation -->
                <div class="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 p-6 text-center scroll-reveal stagger-2">
                    <div class="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center mx-auto mb-3 font-bold">
                        <i data-lucide="navigation" class="w-6 h-6"></i>
                    </div>
                    <div class="font-bold text-sm text-slate-900">Kalapatti Campus Map</div>
                    <p class="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">Located in Kalapatti, Coimbatore, Tamil Nadu.</p>
                    <div class="inline-block px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                        GPS Coordinates: 11.0772° N, 77.0326° E
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
