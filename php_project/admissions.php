<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Online Admission Enquiry";

$errors = [];
$success_msg = "";
$reference_code = "";

// Pre-fill selected class if came from program page
$selected_class = isset($_GET['class']) ? trim($_GET['class']) : '';

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $child_name     = sanitize_input($_POST['child_name'] ?? '');
    $parent_name    = sanitize_input($_POST['parent_name'] ?? '');
    $phone          = sanitize_input($_POST['phone'] ?? '');
    $email          = sanitize_input($_POST['email'] ?? '');
    $dob            = sanitize_input($_POST['dob'] ?? '');
    $applying_class = sanitize_input($_POST['applying_class'] ?? '');
    $message        = sanitize_input($_POST['message'] ?? '');

    // Server-side validation
    if (empty($child_name)) {
        $errors[] = "Child Name is required.";
    } elseif (strlen($child_name) < 2) {
        $errors[] = "Child Name must be at least 2 characters.";
    }

    if (empty($parent_name)) {
        $errors[] = "Parent / Guardian Name is required.";
    }

    if (empty($phone)) {
        $errors[] = "Phone number is required.";
    } elseif (!preg_match('/^[0-9+\-\s()]{7,20}$/', $phone)) {
        $errors[] = "Please enter a valid phone number (e.g. +91 98765 43210).";
    }

    if (empty($email)) {
        $errors[] = "Email address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address.";
    }

    if (empty($dob)) {
        $errors[] = "Child Date of Birth is required.";
    }

    if (empty($applying_class)) {
        $errors[] = "Please select the applying class.";
    }

    // If validation passes, insert into MySQL using prepared statements
    if (empty($errors)) {
        try {
            $reference_code = 'ADM-' . date('Y') . '-' . mt_rand(1000, 9999);
            
            $sql = "INSERT INTO admission_enquiries 
                    (reference_no, child_name, parent_name, phone, email, dob, applying_class, message, status, created_at) 
                    VALUES (:reference_no, :child_name, :parent_name, :phone, :email, :dob, :applying_class, :message, 'Pending', NOW())";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':reference_no'   => $reference_code,
                ':child_name'     => $child_name,
                ':parent_name'    => $parent_name,
                ':phone'          => $phone,
                ':email'          => $email,
                ':dob'            => $dob,
                ':applying_class' => $applying_class,
                ':message'        => $message
            ]);

            $success_msg = "Thank you! Your admission enquiry has been successfully registered. Our admissions counselor will reach out within 24 hours.";
            
            // Clear form values on success
            $child_name = $parent_name = $phone = $email = $dob = $applying_class = $message = '';
        } catch (PDOException $e) {
            $errors[] = "Database Error: Could not save enquiry. " . $e->getMessage();
        }
    }
}

// Fetch available classes for dropdown
try {
    $prog_stmt = $pdo->query("SELECT name FROM programs WHERE is_active = 1 ORDER BY id ASC");
    $available_classes = $prog_stmt->fetchAll(PDO::FETCH_COLUMN);
} catch (Exception $e) {
    $available_classes = ['Play Group', 'Nursery', 'LKG (Lower Kindergarten)', 'UKG (Upper Kindergarten)'];
}

require_once __DIR__ . '/includes/header.php';
?>

<!-- Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Academic Year 2026 - 2027</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">Online Admission Enquiry</h1>
        <p class="mt-3 text-slate-600 max-w-xl mx-auto text-sm">
            Fill out the form below to initiate your child's enrollment. Our admissions coordinator will arrange your personalized campus tour.
        </p>
    </div>
</section>

<!-- Form & Instructions Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Column: The Form -->
            <div class="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm scroll-reveal">
                
                <!-- Display Success Message -->
                <?php if (!empty($success_msg)): ?>
                    <div class="mb-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">✓</div>
                            <h3 class="font-display font-bold text-lg text-emerald-950">Enquiry Submitted Successfully!</h3>
                        </div>
                        <p class="text-sm leading-relaxed"><?php echo htmlspecialchars($success_msg); ?></p>
                        <div class="p-3 bg-white rounded-xl border border-emerald-200 text-xs font-mono font-bold text-emerald-800 flex items-center justify-between">
                            <span>Reference Code:</span>
                            <span class="text-sm text-slate-900 font-bold"><?php echo htmlspecialchars($reference_code); ?></span>
                        </div>
                        <p class="text-xs text-emerald-700">Please quote this reference number during school interactions.</p>
                    </div>
                <?php endif; ?>

                <!-- Display Errors -->
                <?php if (!empty($errors)): ?>
                    <div class="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                        <h4 class="font-bold text-sm flex items-center gap-2">
                            <i data-lucide="alert-circle" class="w-4 h-4 text-rose-600"></i> Please correct the following errors:
                        </h4>
                        <ul class="list-disc list-inside text-xs space-y-1 pt-1">
                            <?php foreach ($errors as $err): ?>
                                <li><?php echo htmlspecialchars($err); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>

                <form method="POST" action="admissions.php" class="space-y-6" novalidate>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Child Name -->
                        <div>
                            <label for="child_name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Child's Full Name *</label>
                            <input type="text" id="child_name" name="child_name" required value="<?php echo htmlspecialchars($child_name ?? ''); ?>" placeholder="e.g. Aarav Sharma" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>

                        <!-- Date of Birth -->
                        <div>
                            <label for="dob" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Child's Date of Birth *</label>
                            <input type="date" id="dob" name="dob" required value="<?php echo htmlspecialchars($dob ?? ''); ?>" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Parent Name -->
                        <div>
                            <label for="parent_name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Parent / Guardian Name *</label>
                            <input type="text" id="parent_name" name="parent_name" required value="<?php echo htmlspecialchars($parent_name ?? ''); ?>" placeholder="e.g. Pooja Sharma" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>

                        <!-- Applying Class -->
                        <div>
                            <label for="applying_class" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Applying Class / Grade *</label>
                            <select id="applying_class" name="applying_class" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white">
                                <option value="">-- Select Class --</option>
                                <?php foreach ($available_classes as $cName): ?>
                                    <option value="<?php echo htmlspecialchars($cName); ?>" <?php echo ($selected_class === $cName || (isset($applying_class) && $applying_class === $cName)) ? 'selected' : ''; ?>>
                                        <?php echo htmlspecialchars($cName); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Phone Number -->
                        <div>
                            <label for="phone" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Mobile / WhatsApp Number *</label>
                            <input type="tel" id="phone" name="phone" required value="<?php echo htmlspecialchars($phone ?? ''); ?>" placeholder="+91 98765 43210" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>

                        <!-- Email Address -->
                        <div>
                            <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                            <input type="email" id="email" name="email" required value="<?php echo htmlspecialchars($email ?? ''); ?>" placeholder="parent@example.com" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm">
                        </div>
                    </div>

                    <!-- Message / Additional Notes -->
                    <div>
                        <label for="message" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Questions / Special Requirements</label>
                        <textarea id="message" name="message" rows="4" placeholder="Mention any preferred batch timings, food allergies, bus route requirements, or scheduling preference..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"><?php echo htmlspecialchars($message ?? ''); ?></textarea>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-base shadow-md hover:shadow-lg transition transform active:scale-98">
                            Submit Admission Enquiry
                        </button>
                        <p class="text-center text-xs text-slate-400 mt-3">
                            🔒 Stored securely in database using prepared SQL statements. Your data is strictly confidential.
                        </p>
                    </div>
                </form>
            </div>

            <!-- Right Column: Admission Process & Eligibility Guide -->
            <div class="lg:col-span-5 space-y-8">
                <!-- 4 Step Process Card -->
                <div class="bg-amber-50/50 p-8 rounded-3xl border border-amber-100 space-y-6 scroll-reveal stagger-1">
                    <h3 class="font-display font-bold text-xl text-slate-900">4-Step Admission Journey</h3>

                    <div class="space-y-4">
                        <div class="flex items-start gap-3.5">
                            <span class="w-7 h-7 rounded-full bg-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                            <div>
                                <div class="font-bold text-sm text-slate-900">Online Enquiry Form</div>
                                <div class="text-xs text-slate-500">Submit child and parent particulars via our secure form.</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3.5">
                            <span class="w-7 h-7 rounded-full bg-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                            <div>
                                <div class="font-bold text-sm text-slate-900">Campus Tour & Interaction</div>
                                <div class="text-xs text-slate-500">Meet educators, experience classrooms, and enjoy our play zone.</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3.5">
                            <span class="w-7 h-7 rounded-full bg-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                            <div>
                                <div class="font-bold text-sm text-slate-900">Document Verification</div>
                                <div class="text-xs text-slate-500">Submit birth certificate, immunization chart, and photos.</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-3.5">
                            <span class="w-7 h-7 rounded-full bg-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                            <div>
                                <div class="font-bold text-sm text-slate-900">Welcome Kit & Orientation</div>
                                <div class="text-xs text-slate-500">Receive uniform, curriculum kit, and school bus badge.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Age Criteria Guide -->
                <div class="bg-white p-6 rounded-2xl border border-slate-200 scroll-reveal stagger-2">
                    <h4 class="font-display font-bold text-base text-slate-900 mb-3">Age Criteria (As of June 1, 2026)</h4>
                    <table class="w-full text-xs text-left text-slate-600">
                        <tbody class="divide-y divide-slate-100">
                            <tr><td class="py-2 font-semibold text-slate-900">Play Group</td><td class="py-2 text-right">1.5 - 2.5 Years</td></tr>
                            <tr><td class="py-2 font-semibold text-slate-900">Nursery</td><td class="py-2 text-right">2.5 - 3.5 Years</td></tr>
                            <tr><td class="py-2 font-semibold text-slate-900">LKG</td><td class="py-2 text-right">3.5 - 4.5 Years</td></tr>
                            <tr><td class="py-2 font-semibold text-slate-900">UKG</td><td class="py-2 text-right">4.5 - 5.5 Years</td></tr>
                        </tbody>
                    </table>
                </div>

                <!-- Admissions Helpline Box -->
                <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-2 scroll-reveal stagger-3">
                    <div class="text-xs text-amber-400 font-bold uppercase tracking-wider">Direct Admissions Helpline</div>
                    <div class="text-xl font-display font-bold"><?php echo CONTACT_PHONE; ?></div>
                    <p class="text-xs text-slate-400">Available Monday to Saturday from 8:00 AM to 5:00 PM for urgent queries.</p>
                </div>
            </div>

        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
