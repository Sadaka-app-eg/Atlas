/* ==========================================================================
   NEXUS Engine - Real Production Interactivity & State Handlers
   ========================================================================== */

// 1. البيانات الحقيقية الكاملة للمسارات والخرائط
const platformTracks = [
    {
        id: "web-dev",
        title: "تطوير الويب المتكامل (Full-Stack Web)",
        category: "programming",
        icon: "code-2",
        desc: "مسار تفاعلي يغطي أساسيات الويب HTML/CSS، لغة JavaScript، مكتبة React، وبيئة Node.js مع قواعد البيانات.",
        nodesCount: 28,
        level: "من الصفر لـ الاحتراف"
    },
    {
        id: "german-lang",
        title: "إتقان اللغة الألمانية (Deutsch A1-B2)",
        category: "languages",
        icon: "languages",
        desc: "تعلم القواعد، بناء الجمل، النطق المباشر والمحادثات اليومية المعتمدة لاجتياز اختبارات معهد جوته.",
        nodesCount: 22,
        level: "جميع المستويات"
    },
    {
        id: "data-science",
        title: "علم البيانات والذكاء الاصطناعي",
        category: "programming",
        icon: "brain-circuit",
        desc: "دراسة تحليل البيانات باستخدام Python، مكتبات Pandas & NumPy، وبناء نماذج التعلم الآلي Machine Learning.",
        nodesCount: 30,
        level: "متوسط"
    },
    {
        id: "english-fluency",
        title: "الإنجليزية للأعمال والمحادثة (Business English)",
        category: "languages",
        icon: "message-square-code",
        desc: "طريقة عملك، كتابة البريد الإلكتروني الاحترافي، واجتياز المقابلات الوظيفية باللغة الإنجليزية في الشركات العالمية.",
        nodesCount: 16,
        level: "مبتدئ -> متقدم"
    }
];

// 2. Initializing Core Application System
document.addEventListener("DOMContentLoaded", () => {
    // A. Initialize Lucide Icons
    if (window.lucide) lucide.createIcons();

    // B. Setup Online/Offline Network Detectors
    setupNetworkMonitor();

    // C. Render Track Cards with Skeleton Loader delay
    renderTracksWithSkeleton("all");

    // D. Filter Event Listeners
    setupFilterEvents();

    // E. Setup FAQ Accordion Toggles
    setupAccordion();

    // F. Form Validation Engine
    setupFormValidation();

    // G. Modals & Search System Setup
    setupModalHandlers();
});

/* ==========================================================================
   Network Status & Offline Detection System
   ========================================================================== */
function setupNetworkMonitor() {
    const offlineBanner = document.getElementById("offline-banner");

    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineBanner.classList.add("hidden");
            showToast("تم إعادة الاتصال بالشبكة بنجاح", "success");
        } else {
            offlineBanner.classList.remove("hidden");
            showToast("فقدت الاتصال بالإنترنت. تعمل الآن في وضع عدم الاتصال.", "error");
        }
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const iconName = type === "success" ? "check-circle" : "alert-circle";
    toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   Skeleton Loading & Track Rendering Logic
   ========================================================================== */
function renderTracksWithSkeleton(category) {
    const grid = document.getElementById("tracksGrid");
    grid.innerHTML = "";

    // Show Skeletons
    for (let i = 0; i < 3; i++) {
        grid.innerHTML += `
            <div class="card skeleton-card">
                <div class="skeleton-box" style="height: 44px; width: 44px; margin-bottom: 1rem;"></div>
                <div class="skeleton-box" style="height: 20px; width: 70%; margin-bottom: 0.5rem;"></div>
                <div class="skeleton-box" style="height: 14px; width: 100%; margin-bottom: 0.5rem;"></div>
                <div class="skeleton-box" style="height: 14px; width: 80%; margin-bottom: 1.5rem;"></div>
                <div class="skeleton-box" style="height: 30px; width: 100%;"></div>
            </div>
        `;
    }

    // Simulate async data fetching
    setTimeout(() => {
        grid.innerHTML = "";
        const filtered = category === "all" 
            ? platformTracks 
            : platformTracks.filter(item => item.category === category);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i data-lucide="folder-open" style="width: 48px; height: 48px; color: var(--text-muted);"></i>
                    <h3 style="margin-top: 1rem;">لا توجد مسارات متوفرة في هذا القسم حالياً</h3>
                    <p style="color: var(--text-secondary);">يرجى اختيار قسم آخر أو البحث عن مهارة مختلفة.</p>
                </div>
            `;
        } else {
            filtered.forEach(track => {
                grid.innerHTML += `
                    <div class="card">
                        <div>
                            <div class="card-icon"><i data-lucide="${track.icon}"></i></div>
                            <h3 class="card-title">${track.title}</h3>
                            <p class="card-desc">${track.desc}</p>
                        </div>
                        <div class="card-footer">
                            <span style="font-size: 0.8rem; color: var(--text-muted);">
                                <i data-lucide="git-commit" style="width: 14px; display: inline-block;"></i> ${track.nodesCount} محطة
                            </span>
                            <button class="btn btn-secondary" onclick="openTrackDetails('${track.id}')">
                                استكشف الخريطة
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        if (window.lucide) lucide.createIcons();
    }, 600);
}

function setupFilterEvents() {
    const pills = document.querySelectorAll(".filter-pills .pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            renderTracksWithSkeleton(pill.getAttribute("data-category"));
        });
    });
}

/* ==========================================================================
   Accordion & UI Controls
   ========================================================================== */
function setupAccordion() {
    const items = document.querySelectorAll(".accordion-item");
    items.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            items.forEach(i => i.classList.remove("active"));
            if (!isActive) item.classList.add("active");
        });
    });
}

/* ==========================================================================
   Form Validation Engine (Contact Form)
   ========================================================================== */
function setupFormValidation() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        const inputs = form.querySelectorAll(".form-input");
        inputs.forEach(input => {
            const group = input.parentElement;
            if (!input.checkValidity()) {
                group.classList.add("invalid");
                isValid = false;
            } else {
                group.classList.remove("invalid");
            }
        });

        if (isValid) {
            showToast("تم إرسال رسالتك بنجاح! سيتواصل معك فريق الدعم قريباً.", "success");
            form.reset();
        } else {
            showToast("يرجى التأكد من ملء جميع الحقول بشكل صحيح.", "error");
        }
    });
}

/* ==========================================================================
   Modals & Command Palette Search Logic
   ========================================================================== */
function setupModalHandlers() {
    const searchModal = document.getElementById("searchModal");
    const searchTrigger = document.getElementById("searchTriggerBtn");
    const closeSearch = document.getElementById("closeSearchModal");
    const searchInput = document.getElementById("globalSearchInput");
    const searchResults = document.getElementById("searchResults");

    // Open Search via button or Ctrl + K
    if (searchTrigger) {
        searchTrigger.addEventListener("click", () => searchModal.classList.remove("hidden"));
    }

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            searchModal.classList.remove("hidden");
            searchInput.focus();
        }
    });

    if (closeSearch) {
        closeSearch.addEventListener("click", () => searchModal.classList.add("hidden"));
    }

    // Live Search Output
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query === "") {
                searchResults.innerHTML = `<p class="search-hint">اكتب للبدء في البحث المباشر...</p>`;
                return;
            }

            const matches = platformTracks.filter(t => 
                t.title.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                searchResults.innerHTML = `<p class="search-hint">لم نجد أي مسار يطابق بحثك.</p>`;
            } else {
                searchResults.innerHTML = matches.map(m => `
                    <div style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="openTrackDetails('${m.id}')">
                        <strong>${m.title}</strong>
                        <p style="font-size: 0.8rem; color: var(--text-muted);">${m.desc}</p>
                    </div>
                `).join("");
            }
        });
    }
}

function openTrackDetails(trackId) {
    showToast(`جاري فتح خريطة الطريق: ${trackId}`, "success");
}
