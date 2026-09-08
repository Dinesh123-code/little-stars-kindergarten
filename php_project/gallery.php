<?php
require_once __DIR__ . '/config/db.php';
$page_title = "Photo Gallery";

$gallery_items = [
    [
        'title' => 'Annual Sports Day & Fun Relay',
        'category' => 'Events',
        'image' => 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Little champions cheering enthusiastically during relay sprints.'
    ],
    [
        'title' => 'Sensory Art & Finger Painting',
        'category' => 'Classroom',
        'image' => 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Exploring vivid colors and textures in our art discovery studio.'
    ],
    [
        'title' => 'Morning Yoga & Mindfulness Circle',
        'category' => 'Activities',
        'image' => 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Gentle stretching and breathing exercises to begin the day.'
    ],
    [
        'title' => 'Spacious Greenfield Campus Grounds',
        'category' => 'Campus',
        'image' => 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Lush greenery and sunlit corridors designed for peaceful childhoods.'
    ],
    [
        'title' => 'Science Discovery & Magnifiers',
        'category' => 'Activities',
        'image' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Examining leaf veins and butterfly wings under child-safe lenses.'
    ],
    [
        'title' => 'Grandparents Day Festivity',
        'category' => 'Events',
        'image' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Cherished memories shared between toddlers and their loving grandparents.'
    ],
    [
        'title' => 'Cozy Reading Nook & Story Corner',
        'category' => 'Classroom',
        'image' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Immersing young imaginations in illustrated storybooks and fables.'
    ],
    [
        'title' => 'Adventure Playground Swings',
        'category' => 'Campus',
        'image' => 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80',
        'caption' => 'Laughter echoing as children swing safely on cushioned turf.'
    ]
];

require_once __DIR__ . '/includes/header.php';
?>

<!-- Banner -->
<section class="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50 py-12 border-b border-amber-100 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-amber-700 tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full border border-amber-200">Precious Memories</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-3">Campus Life Photo Gallery</h1>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto text-sm">
            Catch a glimpse of the smiles, celebrations, triumphs, and discoveries that make every day at Little Stars memorable.
        </p>
    </div>
</section>

<!-- Gallery Section with JS Filter -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12 scroll-reveal" id="galleryFilter">
            <button class="filter-btn active px-5 py-2 rounded-full text-xs font-bold bg-amber-500 text-amber-950 transition" data-filter="all">All Moments</button>
            <button class="filter-btn px-5 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition" data-filter="Campus">Campus</button>
            <button class="filter-btn px-5 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition" data-filter="Classroom">Classrooms</button>
            <button class="filter-btn px-5 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition" data-filter="Activities">Activities</button>
            <button class="filter-btn px-5 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition" data-filter="Events">Events</button>
        </div>

        <!-- Grid of Images -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="galleryGrid">
            <?php foreach ($gallery_items as $index => $item): 
                $staggerNum = ($index % 4) + 1;
            ?>
                <div class="gallery-card rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition bg-white flex flex-col group scroll-reveal stagger-<?php echo $staggerNum; ?>" data-category="<?php echo htmlspecialchars($item['category']); ?>">
                    <div class="relative h-56 overflow-hidden scroll-reveal-img">
                        <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['title']); ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                        <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            <?php echo htmlspecialchars($item['category']); ?>
                        </span>
                    </div>
                    <div class="p-4 flex-1 flex flex-col justify-between">
                        <h4 class="font-display font-bold text-sm text-slate-900 mb-1"><?php echo htmlspecialchars($item['title']); ?></h4>
                        <p class="text-xs text-slate-500"><?php echo htmlspecialchars($item['caption']); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<script>
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-amber-500', 'text-amber-950');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            btn.classList.remove('bg-slate-100', 'text-slate-600');
            btn.classList.add('bg-amber-500', 'text-amber-950');

            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.gallery-card').forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
