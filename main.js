/* ==========================================================================
   NEXUS Engine - Full Production JavaScript + Firebase v10 SDK
   ========================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ⚠️ ضع إعدادات مشروع Firebase الخاص بك هنا:
const firebaseConfig = {
    apiKey: "AIzaSyB1EI6RB0EfCaq1pm5z4dcQEzhEPpNEwEA",
    authDomain: "atlas-c883c.firebaseapp.com",
    projectId: "atlas-c883c",
    storageBucket: "atlas-c883c.firebasestorage.app",
    messagingSenderId: "414987185997",
    appId: "1:414987185997:web:57f34540ef1b4ca7d6d104",
    measurementId: "G-TMTGLX2VJT"
};

// Initialize Firebase Engine
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Local App State
let currentUser = null;
let userCompletedNodes = [];

/* ==========================================================================
   Tracks Engine & Dynamic Category Filter System
   ========================================================================== */

// Real Master Tracks Dataset
const masterTracksData = [
    {
        id: "fullstack-web",
        title: "تطوير الويب المتكامل (Full-Stack Web)",
        category: "programming",
        icon: "code-2",
        level: "beginner",
        levelText: "مبتدئ -> محترف",
        desc: "مسار تفاعلي شامِل لبناء تطبيقات الويب من الهيكل الأساسي HTML/CSS مروراً بـ JavaScript الحديثة و React حتى بيئة Node.js وقواعد البيانات.",
        nodesCount: 28,
        estimatedHours: "120 ساعة"
    },
    {
        id: "deutsch-a1-b2",
        title: "احتراف اللغة الألمانية (Deutsch A1-B2)",
        category: "languages",
        icon: "languages",
        desc: "مسار منهجي تفاعلي يغطي قواعد اللغة الألمانية، النطق الصحيح، بناء الجمل، واجتياز اختبارات معهد جوته (Goethe) المعتمدة.",
        nodesCount: 20,
        level: "beginner",
        levelText: "جميع المستويات",
        estimatedHours: "90 ساعة"
    },
    {
        id: "data-science-ai",
        title: "علم البيانات والذكاء الاصطناعي",
        category: "programming",
        icon: "brain-circuit",
        desc: "دراسة تحليل البيانات الاستكشافي باستخدام Python، مكتبات Pandas & NumPy، وبناء نماذج التعلم الآلي Machine Learning والتنبؤات.",
        nodesCount: 32,
        level: "intermediate",
        levelText: "مستوى متوسط",
        estimatedHours: "150 ساعة"
    },
    {
        id: "business-english",
        title: "الإنجليزية للأعمال والمحادثة (Business English)",
        category: "languages",
        icon: "message-square-code",
        desc: "تطوير طلاقة التحدث في بيئة العمل، كتابة البريد الإلكتروني الاحترافي، إدارة الاجتماعات، واجتياز المقابلات الوظيفية باللغة الإنجليزية.",
        nodesCount: 16,
        level: "intermediate",
        levelText: "مبتدئ -> متقدم",
        estimatedHours: "60 ساعة"
    },
    {
        id: "ui-ux-design",
        title: "تصميم الواجهات وأنظمة Figma (UI/UX Design)",
        category: "design",
        icon: "figma",
        desc: "دراسة سلوك المستخدم، رسم الـ Wireframes، تصميم واجهات الموبايل والويب، وبناء Design Systems احترافية قابلة للتوسع.",
        nodesCount: 18,
        level: "beginner",
        levelText: "من الصفر",
        estimatedHours: "75 ساعة"
    },
    {
        id: "cyber-security",
        title: "الأمن السيبراني واختبار الاختراق",
        category: "programming",
        icon: "shield-check",
        desc: "فهم أساسيات الشبكات والأنظمة، اكتشاف الثغرات الأمنية في التطبيقات، واختبار الاختراق الأخلاقي لتأمين البنية التحتية.",
        nodesCount: 25,
        level: "advanced",
        levelText: "مستوى متقدم",
        estimatedHours: "110 ساعة"
    }
];

// Initialize Tracks & Filters
function setupTracksEngine() {
    updateCategoryCounts();
    renderSkeletonLoaders();

    // Initial Render with slight artificial delay for smooth transition
    setTimeout(() => {
        renderTrackCards("all");
    }, 600);

    // Setup Filter Pills Click Listener
    const pills = document.querySelectorAll(".filter-pills .pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            // Update active state
            pills.forEach(p => {
                p.classList.remove("active");
                p.setAttribute("aria-selected", "false");
            });
            pill.classList.add("active");
            pill.setAttribute("aria-selected", "true");

            const category = pill.getAttribute("data-category");
            
            // Show Skeleton briefly on switching
            renderSkeletonLoaders();
            setTimeout(() => {
                renderTrackCards(category);
            }, 400);
        });
    });
}

// Calculate Track Counts Per Category
function updateCategoryCounts() {
    const counts = {
        all: masterTracksData.length,
        programming: masterTracksData.filter(t => t.category === "programming").length,
        languages: masterTracksData.filter(t => t.category === "languages").length,
        design: masterTracksData.filter(t => t.category === "design").length
    };

    document.getElementById("count-all").textContent = counts.all;
    document.getElementById("count-programming").textContent = counts.programming;
    document.getElementById("count-languages").textContent = counts.languages;
    document.getElementById("count-design").textContent = counts.design;
}

// Render Skeleton State
function renderSkeletonLoaders() {
    const grid = document.getElementById("tracksGrid");
    if (!grid) return;

    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        grid.innerHTML += `
            <div class="track-card skeleton-card">
                <div>
                    <div class="card-top-header">
                        <div class="skeleton-pulse" style="width: 48px; height: 48px;"></div>
                        <div class="skeleton-pulse" style="width: 70px; height: 22px; border-radius: 50px;"></div>
                    </div>
                    <div class="skeleton-pulse" style="width: 80%; height: 22px; margin-bottom: 0.75rem;"></div>
                    <div class="skeleton-pulse" style="width: 100%; height: 14px; margin-bottom: 0.4rem;"></div>
                    <div class="skeleton-pulse" style="width: 90%; height: 14px; margin-bottom: 1.5rem;"></div>
                </div>
                <div>
                    <div class="skeleton-pulse" style="width: 100%; height: 36px; margin-bottom: 1rem;"></div>
                    <div class="skeleton-pulse" style="width: 100%; height: 40px;"></div>
                </div>
            </div>
        `;
    }
}

// Render Real Track Cards
function renderTrackCards(categoryFilter) {
    const grid = document.getElementById("tracksGrid");
    if (!grid) return;

    grid.setAttribute("aria-busy", "false");
    grid.innerHTML = "";

    const filteredData = categoryFilter === "all"
        ? masterTracksData
        : masterTracksData.filter(track => track.category === categoryFilter);

    if (filteredData.length === 0) {
        grid.innerHTML = `
            <div class="empty-grid-state">
                <i data-lucide="folder-open" aria-hidden="true"></i>
                <h3>لا توجد مسارات متوفرة في هذا القسم حالياً</h3>
                <p>نحن نعمل على إدراج خراط جديدة قريباً. يرجى اختيار قسم آخر للاستكشاف.</p>
            </div>
        `;
    } else {
        filteredData.forEach(track => {
            const cardHTML = `
                <article class="track-card">
                    <div>
                        <div class="card-top-header">
                            <div class="card-icon-wrapper">
                                <i data-lucide="${track.icon}" aria-hidden="true"></i>
                            </div>
                            <span class="level-badge ${track.level}">${track.levelText}</span>
                        </div>
                        <h3 class="track-card-title">${track.title}</h3>
                        <p class="track-card-desc">${track.desc}</p>
                    </div>

                    <div>
                        <div class="card-meta-bar">
                            <div class="meta-item">
                                <i data-lucide="git-commit" aria-hidden="true"></i>
                                <span>${track.nodesCount} محطة تعليمية</span>
                            </div>
                            <div class="meta-item">
                                <i data-lucide="clock" aria-hidden="true"></i>
                                <span>${track.estimatedHours}</span>
                            </div>
                        </div>

                        <button class="btn btn-secondary btn-block" onclick="selectAndScrollToRoadmap('${track.id}')">
                            <span>استكشف خريطة الطريق</span>
                            <i data-lucide="arrow-left" aria-hidden="true"></i>
                        </button>
                    </div>
                </article>
            `;
            grid.innerHTML += cardHTML;
        });
    }

    if (window.lucide) lucide.createIcons();
}

// Global function to trigger Roadmap view on clicking a track card
window.selectAndScrollToRoadmap = (trackId) => {
    const track = masterTracksData.find(t => t.id === trackId);
    if (track) {
        if (typeof renderRoadmapCanvas === "function") {
            renderRoadmapCanvas(track);
        }
        const roadmapSection = document.getElementById("roadmaps");
        if (roadmapSection) {
            roadmapSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// Ensure execution inside DOMContentLoaded
/* ==========================================================================
   ATLAS Engine - Master Application Initializer
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. تشغيل أيقونات المكتبة البصرية Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. تشغيل المحركات الأساسية للواجهة
    setupThemeToggle();
    setupHeaderInteractivity();
    animateHeroStats();
    setupTracksEngine();

    // 3. تشغيل الواجهات المساعدة والشبكة
    setupNetworkMonitor();
    setupAccordion();
    setupModalsAndSearch();
    setupContactForm();
});


/* ==========================================================================
   Utilities & System Functions
   ========================================================================== */
function setupThemeToggle() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const activeTheme = localStorage.getItem("nexus_theme") || "dark";
    document.documentElement.setAttribute("data-theme", activeTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("nexus_theme", next);
            showToast(`تم التبديل للوضع ${next === "dark" ? "الليلي" : "النهاري"}`, "success");
        });
    }
}

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => toast.remove(), 4000);
}

function setupNetworkMonitor() {
    window.addEventListener("online", () => {
        document.getElementById("offline-banner").classList.add("hidden");
        showToast("عادت الشبكة مجدداً!", "success");
    });
    window.addEventListener("offline", () => {
        document.getElementById("offline-banner").classList.remove("hidden");
        showToast("أنت الآن تعمل بدون إنترنت.", "error");
    });
}

function setupAccordion() {
    document.querySelectorAll(".accordion-header").forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement;
            parent.classList.toggle("active");
        });
    });
}

function setupModalsAndSearch() {
    const searchModal = document.getElementById("searchModal");
    const authModal = document.getElementById("authModal");

    document.getElementById("searchTriggerBtn")?.addEventListener("click", () => searchModal.classList.remove("hidden"));
    document.getElementById("closeSearchModal")?.addEventListener("click", () => searchModal.classList.add("hidden"));

    document.getElementById("loginBtn")?.addEventListener("click", () => authModal.classList.remove("hidden"));
    document.getElementById("signupBtn")?.addEventListener("click", () => {
        authModal.classList.remove("hidden");
        document.getElementById("tabSignupBtn").click();
    });
    document.getElementById("closeAuthModal")?.addEventListener("click", () => authModal.classList.add("hidden"));
}

function setupContactForm() {
    document.getElementById("contactForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("تم إرسال استفسارك بنجاح!", "success");
        e.target.reset();
    });
}
/* ==========================================================================
   Header Micro-Interactions Engine - ATLAS Platform
   ========================================================================== */

function setupHeaderInteractivity() {
    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    const avatarBtn = document.getElementById("avatarBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    // Toggle Notifications Dropdown
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = notifDropdown.classList.contains("hidden");
            
            // Close Profile Dropdown if open
            if (profileDropdown) profileDropdown.classList.add("hidden");
            
            notifDropdown.classList.toggle("hidden");
            notifBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
        });
    }

    // Toggle User Profile Dropdown
    if (avatarBtn && profileDropdown) {
        avatarBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = profileDropdown.classList.contains("hidden");
            
            // Close Notifications Dropdown if open
            if (notifDropdown) notifDropdown.classList.add("hidden");
            
            profileDropdown.classList.toggle("hidden");
            avatarBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
        });
    }

    // Close Dropdowns on Clicking Outside Anywhere
    document.addEventListener("click", (e) => {
        if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
            notifDropdown.classList.add("hidden");
            if (notifBtn) notifBtn.setAttribute("aria-expanded", "false");
        }
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== avatarBtn) {
            profileDropdown.classList.add("hidden");
            if (avatarBtn) avatarBtn.setAttribute("aria-expanded", "false");
        }
    });
}


/* ==========================================================================
   Hero Section Stats Count-Up Animation Engine
   ========================================================================== */

function animateHeroStats() {
    const statRoadmaps = document.getElementById("statRoadmapsCount");
    const statTracks = document.getElementById("statTracksCount");
    const statRate = document.getElementById("statCompletionRate");

    if (!statRoadmaps || !statTracks || !statRate) return;

    // Target numbers definition
    const targets = [
        { element: statRoadmaps, end: 120, prefix: "+" },
        { element: statTracks, end: 15, prefix: "+" },
        { element: statRate, end: 98, suffix: "%" }
    ];

    targets.forEach(item => {
        let current = 0;
        const duration = 1500; // 1.5 Seconds
        const stepTime = Math.abs(Math.floor(duration / item.end));

        const timer = setInterval(() => {
            current += 1;
            const prefix = item.prefix || "";
            const suffix = item.suffix || "";
            item.element.textContent = `${prefix}${current}${suffix}`;

            if (current >= item.end) {
                clearInterval(timer);
            }
        }, stepTime);
    });
}
// استخراج YouTube Video ID تلقائياً
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// تشغيل تحكم المشرف وإضافة الدروس لـ Firestore
const adminModal = document.getElementById("adminModal");
document.getElementById("openAdminModalBtn")?.addEventListener("click", () => adminModal.classList.remove("hidden"));
document.getElementById("closeAdminModal")?.addEventListener("click", () => adminModal.classList.add("hidden"));

document.getElementById("adminAddLessonForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackId = document.getElementById("lessonTrackSelect").value;
    const title = document.getElementById("lessonTitle").value;
    const rawUrl = document.getElementById("lessonYoutubeUrl").value;
    const desc = document.getElementById("lessonDesc").value;
    const videoId = extractYouTubeId(rawUrl);

    if (!videoId) {
        showToast("يرجى إدخال رابط يوتيوب صالح", "error");
        return;
    }

    try {
        // حفظ الدرس في Firebase Firestore
        const lessonId = `lesson_${Date.now()}`;
        await setDoc(doc(db, "tracks", trackId, "lessons", lessonId), {
            title,
            videoId,
            youtubeUrl: rawUrl,
            description: desc,
            createdAt: new Date().toISOString()
        });
        showToast("تمت إضافة المحاضرة بنجاح للمسار!", "success");
        adminModal.classList.add("hidden");
        e.target.reset();
    } catch (err) {
        showToast("حدث خطأ أثناء الحفظ في السحابة", "error");
        console.error(err);
    }
});
