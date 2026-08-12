/* ==========================================================================
   NEXUS Platform - Interactive Core & Micro-interactions Logic
   ========================================================================== */

// 1. قاعدة بيانات المسارات والخرائط (Mock Data)
const tracksData = [
    {
        id: 1,
        title: "Full-Stack Web Development",
        category: "programming",
        icon: "code-2",
        desc: "خريطة طريق متكاملة لبناء تطبيقات الويب الحديثة من الهيكل الأساسي وحتى إدارة السيرفرات والـ Cloud.",
        nodesCount: 28,
        level: "من الصفر إلى الاحتراف",
        popular: true
    },
    {
        id: 2,
        title: "Mastering German Language (A1 to C1)",
        category: "languages",
        icon: "languages",
        desc: "مسار تفاعلي شامِل لتعلم اللغة الألمانية: القواعد، التحدث، واجتياز اختبارات Goethe المعتمدة.",
        nodesCount: 20,
        level: "جميع المستويات",
        popular: true
    },
    {
        id: 3,
        title: "Data Science & Machine Learning",
        category: "programming",
        icon: "brain-circuit",
        desc: "احتراف تحليل البيانات، الرياضيات التطبيقية، وبناء نماذج الذكاء الاصطناعي باستخدام Python.",
        nodesCount: 32,
        level: "متوسط -> متقدم",
        popular: false
    },
    {
        id: 4,
        title: "English Business & Fluency",
        category: "languages",
        icon: "message-square",
        desc: "تطوير مهارات التحدث بالإنجليزية للشركات، بروتوكولات التراسل، واجتياز مقابلات العمل العالمية.",
        nodesCount: 15,
        level: "مبتدئ -> متقدم",
        popular: false
    },
    {
        id: 5,
        title: "UI/UX & Design Systems",
        category: "design",
        icon: "figma",
        desc: "دراسة سلوك المستخدم، رسم الـ Wireframes، وتصميم أنظمة الواجهات (Design Systems) الاحترافية.",
        nodesCount: 18,
        level: "مبتدئ",
        popular: true
    },
    {
        id: 6,
        title: "Cybersecurity & Ethical Hacking",
        category: "programming",
        icon: "shield-check",
        desc: "تأمين الأنظمة والشبكات، اكتشاف الثغرات الأمنية، واختبار الاختراق الأخلاقي للشركات.",
        nodesCount: 25,
        level: "متقدم",
        popular: false
    }
];

// 2. تهيئة التطبيق عند اكتمال التحميل
document.addEventListener("DOMContentLoaded", () => {
    // تفعيل أيقونات Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // محاكاة التحميل الحي السلس عند فتح الصفحة لأول مرة
    simulateInitialLoading();

    // تفعيل أزرار الفلترة (Filter Pills)
    setupCategoryFilters();

    // تفعيل التفاعل مع خريطة الطريق (Interactive Roadmap Visual)
    setupRoadmapInteractivity();

    // تفعيل اختصار البحث (Ctrl + K)
    setupSearchShortcut();

    // إضفاء حيوية على الهيدر أثناء التمرير (Scroll Effect)
    setupNavbarScrollEffect();
});

/* ==========================================================================
   Functions & Micro-Interactions
   ========================================================================== */

/**
 * محاكاة التحميل السلس (Skeleton Loading) لإعطاء انطباع بالاستجابة الحية
 */
function simulateInitialLoading() {
    const cardsGrid = document.getElementById("cardsGrid");
    if (!cardsGrid) return;

    // إظهار الهيكل التحميلي لمدّة 1 ثانية ثم عرض البيانات
    setTimeout(() => {
        renderTrackCards("all");
    }, 1000);
}

/**
 * بناء وكتابة الكروت التفاعلية في الـ HTML
 */
function renderTrackCards(category) {
    const cardsGrid = document.getElementById("cardsGrid");
    if (!cardsGrid) return;

    const filteredData = category === "all" 
        ? tracksData 
        : tracksData.filter(item => item.category === category);

    cardsGrid.innerHTML = "";

    filteredData.forEach((track, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.style.animationDelay = `${index * 0.1}s`; // ظهور متتابع أنيق

        cardElement.innerHTML = `
            <div class="card-icon">
                <i data-lucide="${track.icon}"></i>
            </div>
            <h3 class="card-title">${track.title}</h3>
            <p class="card-desc">${track.desc}</p>
            <div class="card-footer">
                <span class="badge">
                    <i data-lucide="git-commit" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> 
                    ${track.nodesCount} محطة تعليمية
                </span>
                <button class="btn-ghost" onclick="selectTrack(${track.id})" style="padding: 0; font-size: 0.85rem; color: #818cf8;">
                    عرض الخريطة <i data-lucide="arrow-left" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                </button>
            </div>
        `;

        cardsGrid.appendChild(cardElement);
    });

    // تحديث الأيقونات للكروت المضافة حديثاً
    if (window.lucide) {
        lucide.createIcons();
    }
}

/**
 * إدارة الفلترة بين الأقسام مع إعادة تشغيل تأثير الـ Skeleton
 */
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll(".pill-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // إزالة التحديد السابق
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            // عرض Skeleton temporary لإعطاء الإحساس بالتحميل
            showSkeletonLoaders();

            setTimeout(() => {
                renderTrackCards(selectedCategory);
            }, 500);
        });
    });
}

/**
 * إظهار كروت التحميل المؤقتة
 */
function showSkeletonLoaders() {
    const cardsGrid = document.getElementById("cardsGrid");
    if (!cardsGrid) return;

    cardsGrid.innerHTML = `
        <div class="card skeleton-card">
            <div class="skeleton skeleton-icon"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton-footer">
                <div class="skeleton skeleton-pill"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
        <div class="card skeleton-card">
            <div class="skeleton skeleton-icon"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton-footer">
                <div class="skeleton skeleton-pill"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
        <div class="card skeleton-card">
            <div class="skeleton skeleton-icon"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton-footer">
                <div class="skeleton skeleton-pill"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
    `;
}

/**
 * جعل كروت خريطة الطريق حية عند النقر عليها
 */
function setupRoadmapInteractivity() {
    const nodes = document.querySelectorAll(".node-item");

    nodes.forEach(node => {
        node.addEventListener("click", () => {
            if (node.classList.contains("locked")) {
                alert("🔒 هذه المحطة مغلقة، يتوجب عليك إتمام المحطة السابقة أولاً لتفعيلها.");
            } else {
                nodes.forEach(n => n.classList.remove("active"));
                node.classList.add("active");
            }
        });
    });
}

/**
 * دعم اختصار البحث السريع (Ctrl + K / Cmd + K)
 */
function setupSearchShortcut() {
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            const searchBtn = document.querySelector(".search-trigger-btn");
            if (searchBtn) {
                searchBtn.click();
                alert("🔍 فتح نافذة البحث السريع (Command Palette)...");
            }
        }
    });
}

/**
 * تأثير تغيير شفافية الهيدر أثناء التمرير
 */
function setupNavbarScrollEffect() {
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(8, 9, 13, 0.92)";
            navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.35)";
        } else {
            navbar.style.background = "rgba(8, 9, 13, 0.75)";
            navbar.style.boxShadow = "none";
        }
    });
}

/**
 * دالة للتفاعل عند اختيار مسار محدد
 */
function selectTrack(trackId) {
    const track = tracksData.find(t => t.id === trackId);
    if (track) {
        console.log(`تم اختيار المسار: ${track.title}`);
        // هنا يمكنك التوجيه لصفحة تفاصيل الخريطة
    }
}
