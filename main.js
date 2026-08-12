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

// Track Data Source
const platformTracks = [
    {
        id: "web-dev",
        title: "تطوير الويب المتكامل (Full-Stack Web)",
        category: "programming",
        icon: "code-2",
        desc: "مسار تفاعلي يغطي أساسيات HTML/CSS، لغة JavaScript، React، وNode.js مع قواعد البيانات.",
        nodesCount: 3,
        nodes: [
            { id: "node_1", title: "1. أساسيات الويب و HTML5", desc: "فهم كيف يعمل الإنترنت وهيكلة الصفحات." },
            { id: "node_2", title: "2. التنسيق التجاوُبي CSS3", desc: "تصميم واجهات متناسقة مع كافة الشاشات." },
            { id: "node_3", title: "3. البرمجة التفاعلية JavaScript", desc: "إعطاء الحياة للواجهات والتحكم في العناصر." }
        ]
    },
    {
        id: "german-lang",
        title: "إتقان اللغة الألمانية (Deutsch A1-B2)",
        category: "languages",
        icon: "languages",
        desc: "تعلم القواعد، بناء الجمل، النطق المباشر لاجتياز اختبارات معهد جوته المعتمدة.",
        nodesCount: 2,
        nodes: [
            { id: "de_node_1", title: "1. النطق والحروف الألمانية A1", desc: "أساسيات الأبجدية وتراكيب الصوتيات." },
            { id: "de_node_2", title: "2. قواعد الضمائر والجمل البسيطة", desc: "تركيب الجمل والتعريف بالنفس." }
        ]
    }
];

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();

    setupThemeToggle();
    setupNetworkMonitor();
    setupAccordion();
    setupModalsAndSearch();
    setupContactForm();
    
    // Auth Listener
    setupAuthListeners();

    // Render Initial Tracks & Roadmaps
    renderTracks("all");
    renderRoadmapTree(platformTracks[0]);
});

/* ==========================================================================
   Firebase Authentication & User Progress Synchronization
   ========================================================================== */
function setupAuthListeners() {
    onAuthStateChanged(auth, async (user) => {
        const loggedOutView = document.getElementById("loggedOutView");
        const loggedInView = document.getElementById("loggedInView");

        if (user) {
            currentUser = user;
            loggedOutView.classList.add("hidden");
            loggedInView.classList.remove("hidden");

            document.getElementById("userNameDisplay").textContent = user.displayName || "مستخدم NEXUS";
            document.getElementById("userEmailDisplay").textContent = user.email;
            document.getElementById("avatarText").textContent = (user.displayName || user.email)[0].toUpperCase();

            // Fetch User Progress from Firebase Firestore
            await loadUserProgress(user.uid);
            showToast(`أهلاً بك مجدداً، ${user.displayName || 'يا بطل'}!`, "success");
        } else {
            currentUser = null;
            userCompletedNodes = [];
            loggedOutView.classList.remove("hidden");
            loggedInView.classList.add("hidden");
        }

        // Re-render Roadmap tree with updated progress state
        renderRoadmapTree(platformTracks[0]);
    });

    // Auth Modal Form Submission (Login / Sign Up)
    const authForm = document.getElementById("authForm");
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabSignupBtn = document.getElementById("tabSignupBtn");
    const nameGroup = document.getElementById("nameGroup");
    let isSignupMode = false;

    tabLoginBtn.addEventListener("click", () => {
        isSignupMode = false;
        tabLoginBtn.classList.add("active");
        tabSignupBtn.classList.remove("active");
        nameGroup.classList.add("hidden");
        document.getElementById("authSubmitBtn").textContent = "دخول";
    });

    tabSignupBtn.addEventListener("click", () => {
        isSignupMode = true;
        tabSignupBtn.classList.add("active");
        tabLoginBtn.classList.remove("active");
        nameGroup.classList.remove("hidden");
        document.getElementById("authSubmitBtn").textContent = "إنشاء حساب";
    });

    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("authEmail").value;
        const password = document.getElementById("authPassword").value;
        const name = document.getElementById("authName").value;

        try {
            if (isSignupMode) {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCred.user, { displayName: name });
                // Create user document in Firestore
                await setDoc(doc(db, "users", userCred.user.uid), {
                    displayName: name,
                    email: email,
                    completedNodes: []
                });
                showToast("تم إنشاء الحساب بنجاح!", "success");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                showToast("تم تسجيل الدخول بنجاح!", "success");
            }
            document.getElementById("authModal").classList.add("hidden");
        } catch (error) {
            showToast(`خطأ: ${error.message}`, "error");
        }
    });

    // Logout Action
    document.getElementById("logoutBtn").addEventListener("click", () => {
        signOut(auth);
        showToast("تم تسجيل الخروج بنجاح.", "success");
    });

    // Toggle Profile Dropdown
    document.getElementById("avatarBtn").addEventListener("click", () => {
        document.getElementById("profileDropdown").classList.toggle("hidden");
    });
}

// Fetch Progress from Firestore
async function loadUserProgress(uid) {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            userCompletedNodes = userDoc.data().completedNodes || [];
        }
    } catch (err) {
        console.error("Error loading progress:", err);
    }
}

// Save Completed Node to Firestore
async function toggleNodeCompletion(nodeId) {
    if (!currentUser) {
        showToast("يرجى تسجيل الدخول أولاً لحفظ تقدمك السحابي!", "error");
        document.getElementById("authModal").classList.remove("hidden");
        return;
    }

    if (userCompletedNodes.includes(nodeId)) {
        userCompletedNodes = userCompletedNodes.filter(id => id !== nodeId);
    } else {
        userCompletedNodes.push(nodeId);
    }

    try {
        await updateDoc(doc(db, "users", currentUser.uid), {
            completedNodes: userCompletedNodes
        });
        showToast("تم حفظ التحديث في حسابك بنجاح!", "success");
        renderRoadmapTree(platformTracks[0]);
    } catch (err) {
        showToast("تعذر حفظ التغيير في قاعدة البيانات.", "error");
    }
}

/* ==========================================================================
   UI Renderers & Component Control
   ========================================================================== */
function renderRoadmapTree(track) {
    const container = document.getElementById("nodesTreeContainer");
    document.getElementById("activeRoadmapTitle").textContent = `${track.title} Nodes Graph`;
    container.innerHTML = "";

    track.nodes.forEach((node, index) => {
        const isCompleted = userCompletedNodes.includes(node.id);
        const nodeHTML = `
            <div class="tree-node ${isCompleted ? 'completed' : ''}" data-id="${node.id}">
                <div class="node-icon">
                    <i data-lucide="${isCompleted ? 'check' : 'play'}"></i>
                </div>
                <div class="node-details">
                    <h4>${node.title}</h4>
                    <p>${node.desc} ${isCompleted ? '• (مكتملة ✅)' : ''}</p>
                </div>
            </div>
            ${index < track.nodes.length - 1 ? `<div class="tree-line ${isCompleted ? 'active' : ''}"></div>` : ''}
        `;
        container.innerHTML += nodeHTML;
    });

    if (window.lucide) lucide.createIcons();

    // Add Click Handler to Nodes
    document.querySelectorAll(".tree-node").forEach(element => {
        element.addEventListener("click", () => {
            const nodeId = element.getAttribute("data-id");
            toggleNodeCompletion(nodeId);
        });
    });
}

function renderTracks(category) {
    const grid = document.getElementById("tracksGrid");
    grid.innerHTML = "";

    const filtered = category === "all" ? platformTracks : platformTracks.filter(t => t.category === category);

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
                        <i data-lucide="git-commit" style="width: 14px; display: inline-block;"></i> ${track.nodesCount} محطات
                    </span>
                    <button class="btn btn-secondary" onclick="selectTrack('${track.id}')">
                        عرض الخريطة
                    </button>
                </div>
            </div>
        `;
    });
    if (window.lucide) lucide.createIcons();
}

window.selectTrack = (trackId) => {
    const track = platformTracks.find(t => t.id === trackId);
    if (track) {
        renderRoadmapTree(track);
        showToast(`تم عرض خريطة: ${track.title}`, "success");
        document.getElementById("roadmaps").scrollIntoView({ behavior: 'smooth' });
    }
};

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
