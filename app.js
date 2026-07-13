// app.js - محرك تشغيل منصة أطلس التعليمية ومبدل الثيمات الذكي الخالي من الشتات

let userProgress = {
    hasCompletedOnboarding: false,
    age: 0,
    dailyTargetMinutes: 0,
    learningStyle: '',
    currentTrack: 'frontend', // المسار الافتراضي عند البدء
    completedSteps: [],
    xp: 0,
    coins: 0,
    activeTheme: 'theme-cyber' // الثيم الافتراضي الفخم
};

let activeStepData = null;
let currentFlashcardIndex = 0;
let isCardFlipped = false;

// مصفوفة الثيمات البرمجية وألوانها المدمجة بالـ Tailwind
const THEMES_CONFIG = {
    'theme-cyber': { bg: '#030712', accent: 'blue', text: 'text-blue-400' },
    'theme-emerald': { bg: '#022c22', accent: 'emerald', text: 'text-emerald-400' },
    'theme-purple': { bg: '#1e1b4b', accent: 'purple', text: 'text-purple-400' }
};

document.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("atlas_track_progress");
    if (savedData) {
        userProgress = JSON.parse(savedData);
        if (userProgress.hasCompletedOnboarding) {
            goToDashboard();
        }
    }
    // تطبيق الثيم المحفوظ فوراً لإبهار المستخدم
    applyActiveTheme(userProgress.activeTheme);
    setupOnboarding();
});

function setupOnboarding() {
    window.selectSurveyOption = function(field, value, btn) {
        userProgress[field] = value;
        btn.parentNode.querySelectorAll('button').forEach(b => {
            b.classList.remove('border-blue-500', 'bg-blue-950/20', 'border-emerald-500', 'bg-emerald-950/20');
        });
        const cls = field === 'style' ? 'border-emerald-500' : 'border-blue-500';
        btn.classList.add(cls, 'bg-blue-950/20');
    };

    const form = document.getElementById('onboarding-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            userProgress.age = parseInt(document.getElementById('age').value || 20);
            const hours = parseInt(document.getElementById('hours').value || 2);
            userProgress.dailyTargetMinutes = hours * 60;
            userProgress.hasCompletedOnboarding = true;
            
            saveDataToLocalStorage();
            goToDashboard();
        });
    }
}

function goToDashboard() {
    document.getElementById('onboarding-section').classList.add('hidden');
    const sidebar = document.getElementById('sidebar-nav');
    const dash = document.getElementById('dashboard-section');
    
    if(sidebar) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('flex');
    }
    if(dash) dash.classList.remove('hidden');
    
    document.getElementById('nav-stats').classList.remove('hidden');
    
    const switcher = document.getElementById('domain-switcher');
    if (switcher) switcher.value = userProgress.currentTrack;

    updateUIStats();
    renderTrackRoadmap();

    setTimeout(() => {
        if(dash) dash.classList.remove('opacity-0', 'translate-y-4');
    }, 50);
}

function renderTrackRoadmap() {
    const trackKey = userProgress.currentTrack;
    const trackData = ATLAS_DOMAINS[trackKey];
    const container = document.getElementById('roadmap-nodes-container');
    const overviewBox = document.getElementById('track-overview-box');
    
    if (!container || !trackData) return;
    if (trackData.overview) {
        const textAccent = THEMES_CONFIG[userProgress.activeTheme].text;
        overviewBox.classList.remove('hidden');
        overviewBox.innerHTML = `
            <div class="flex flex-col gap-4">
                <div class="border-b border-gray-850 pb-3">
                    <span class="text-[10px] font-bold ${textAccent} tracking-widest uppercase">التعريف المعماري بالمجال</span>
                    <p class="text-sm text-gray-200 font-medium mt-1 leading-relaxed">${trackData.overview.definition}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="bg-gray-900/40 p-3 rounded-xl border border-gray-850">
                        <span class="text-gray-500 font-bold block mb-1">📊 منحنى الصعوبة الفعلي:</span>
                        <span class="text-gray-300 leading-relaxed">${trackData.overview.difficulty}</span>
                    </div>
                    <div class="bg-gray-900/40 p-3 rounded-xl border border-gray-850">
                        <span class="text-gray-500 font-bold block mb-1">💼 متطلبات سوق العمل والرواتب:</span>
                        <span class="text-gray-300 leading-relaxed">${trackData.overview.marketDemand}</span>
                    </div>
                    <div class="bg-gray-900/40 p-3 rounded-xl border border-gray-850">
                        <span class="text-gray-500 font-bold block mb-1">⏳ المدة الزمنية المتوقعة:</span>
                        <span class="text-gray-300 font-semibold">${trackData.overview.estimatedDuration}</span>
                    </div>
                    <div class="bg-gray-900/40 p-3 rounded-xl border border-gray-850">
                        <span class="text-gray-500 font-bold block mb-1">🎯 هل هذا المجال مناسب لك؟</span>
                        <span class="text-gray-300 leading-relaxed">${trackData.overview.idealFor}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        overviewBox.classList.add('hidden');
    }
    document.getElementById('display-domain-title').innerText = trackData.titleAr;
    document.getElementById('display-hours').innerText = `${userProgress.dailyTargetMinutes} دقيقة يومياً`;
    
    container.innerHTML = ""; 

    trackData.roadmap.forEach((node, index) => {
        const isCompleted = userProgress.completedSteps.includes(`${trackKey}_${node.id}`);
        const alignmentClass = index % 2 === 0 ? 'md:justify-start' : 'md:justify-end';
        
        // جلب لون الآكسنت الحالي بناءً على الثيم النشط
        const currentThemeAccent = THEMES_CONFIG[userProgress.activeTheme].accent;
        const numBg = isCompleted ? 'bg-emerald-500 ring-emerald-900' : `bg-${currentThemeAccent}-600 ring-${currentThemeAccent}-900`;
        const borderHover = isCompleted ? 'hover:border-emerald-500/40' : `hover:border-${currentThemeAccent}-500/40`;
        const textAccent = THEMES_CONFIG[userProgress.activeTheme].text;

        const nodeHTML = `
            <div class="flex flex-col items-center md:flex-row ${alignmentClass} gap-6 transition-all relative z-10">
                ${index % 2 === 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg shrink-0">${node.stepNumber}</div>` : ''}
                
                <div onclick="openTrackStep('${node.id}')" class="glow-card glass-panel p-6 rounded-2xl w-full md:max-w-md ${borderHover} transition-all cursor-pointer relative group border border-gray-800">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] font-bold ${isCompleted ? 'text-emerald-400' : textAccent} tracking-wider uppercase">${userProgress.currentTrack.toUpperCase()}</span>
                        ${isCompleted ? '<i class="fa-solid fa-circle-check text-emerald-500"></i>' : `<i class="fa-regular fa-circle text-gray-500 group-hover:${textAccent}"></i>`}
                    </div>
                    <h4 class="text-base font-bold text-white mt-1">${node.title}</h4>
                    <p class="text-xs text-gray-400 mt-2 line-clamp-2">${node.writtenExplanation}</p>
                    <div class="mt-4 pt-3 border-t border-gray-800/65 flex justify-between text-[10px] text-gray-500">
                        <span><i class="fa-solid fa-graduation-cap ml-1"></i> التفاصيل المعمارية</span>
                        <span>+50 XP</span>
                    </div>
                </div>

                ${index % 2 !== 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg shrink-0">${node.stepNumber}</div>` : ''}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', nodeHTML);
    });
}

window.openTrackStep = function(nodeId) {
    const trackKey = userProgress.currentTrack;
    activeStepData = ATLAS_DOMAINS[trackKey].roadmap.find(n => n.id === nodeId);
    
    if (!activeStepData) return;

    document.getElementById('modal-node-title').innerText = activeStepData.title;
    document.getElementById('modal-node-level').innerText = activeStepData.level;
    
    // ضخ الشرح المفصل والممل (السبب، الفائدة، والبدائل) داخل كروت معزولة ومبهرة
    document.getElementById('modal-explanation').innerHTML = `
        <div class="space-y-4">
            <div class="bg-gray-900/80 p-4 rounded-xl border border-gray-800">
                <h6 class="text-xs font-bold text-blue-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-circle-question"></i> ١. لماذا نتعلم هذه الأداة/الخطوة تحديداً؟</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.whyLearn}</p>
            </div>
            <div class="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/40">
                <h6 class="text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-shield-halved"></i> ٢. ما هي الفائدة المحققة والأثر البرمجي لها؟</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.benefit}</p>
            </div>
            <div class="bg-purple-950/20 p-4 rounded-xl border border-purple-900/40">
                <h6 class="text-xs font-bold text-purple-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-code-compare"></i> ٣. ما هي البدائل المتاحة لها في سوق العمل الحقيقي؟</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.alternatives}</p>
            </div>
            <div class="bg-gray-950 p-4 rounded-xl border border-gray-850">
                <h6 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-file-code"></i> ٤. المادة العلمية ومحاور الدراسة التفصيلية:</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.content}</p>
            </div>
            ${activeStepData.practicePlatform ? `
            <div class="bg-amber-950/20 p-4 rounded-xl border border-amber-900/40">
                <h6 class="text-xs font-bold text-amber-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-laptop-code"></i> ٥. فين تطبّق اللي اتعلمته دلوقتي؟</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.practicePlatform}</p>
            </div>` : ''}
            ${activeStepData.takeaway ? `
            <div class="bg-blue-950/20 p-4 rounded-xl border border-blue-900/40">
                <h6 class="text-xs font-bold text-blue-400 mb-1.5 flex items-center gap-1.5"><i class="fa-solid fa-trophy"></i> ٦. المستفاد لما تخلص الخطوة دي:</h6>
                <p class="text-xs text-gray-300 leading-relaxed">${activeStepData.takeaway}</p>
            </div>` : ''}
        </div>
    `;

    document.getElementById('modal-project-box').innerHTML = `
        <p class="font-bold text-gray-200 text-xs mb-1"><i class="fa-solid fa-laptop-code text-emerald-400 ml-1"></i> المشروع المطلوب للانتقال:</p>
        <p class="text-xs text-gray-400 leading-relaxed">${activeStepData.project.title}</p>
    `;

    currentFlashcardIndex = 0;
    isCardFlipped = false;
    resetFlashcardUI();
    setupQuizUI();
    switchTab('study');

    const modal = document.getElementById('content-modal');
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); }, 10);
};

window.closeModal = function() {
    const modal = document.getElementById('content-modal');
    modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
};

window.switchTab = function(tabName) {
    ['study', 'flashcards', 'quiz'].forEach(t => {
        document.getElementById(`tab-content-${t}`).classList.add('hidden');
        document.getElementById(`tab-btn-${t}`).classList.remove('border-blue-500', 'text-blue-400');
        document.getElementById(`tab-btn-${t}`).classList.add('border-transparent', 'text-gray-400');
    });
    document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-btn-${tabName}`).classList.add('border-blue-500', 'text-blue-400');
};

window.flipCard = function() {
    if (!activeStepData || !activeStepData.flashcards.length) return;
    const card = activeStepData.flashcards[currentFlashcardIndex];
    const textEl = document.getElementById('flashcard-text');
    isCardFlipped = !isCardFlipped;
    textEl.innerText = isCardFlipped ? card.answer : card.question;
    textEl.className = isCardFlipped ? "text-xs font-bold text-emerald-400 px-2 leading-relaxed" : "text-xs font-bold text-white px-2 leading-relaxed";
};

window.nextFlashcard = function() {
    if (!activeStepData) return;
    currentFlashcardIndex = (currentFlashcardIndex + 1) % activeStepData.flashcards.length;
    isCardFlipped = false;
    resetFlashcardUI();
};

function resetFlashcardUI() {
    if (activeStepData && activeStepData.flashcards.length) {
        document.getElementById('flashcard-text').innerText = activeStepData.flashcards[currentFlashcardIndex].question;
        document.getElementById('flashcard-text').className = "text-xs font-bold text-white px-2";
    }
}

function setupQuizUI() {
    const isAlreadyCompleted = userProgress.completedSteps.includes(`${userProgress.currentTrack}_${activeStepData.id}`);
    if (isAlreadyCompleted) {
        document.getElementById('quiz-question-box').classList.add('hidden');
        document.getElementById('quiz-result-box').classList.remove('hidden');
        return;
    }
    document.getElementById('quiz-question-box').classList.remove('hidden');
    document.getElementById('quiz-result-box').classList.add('hidden');

    const quiz = activeStepData.quizzes[0];
    document.getElementById('quiz-question-text').innerText = quiz.question;
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = quiz.options.map((option, idx) => `
        <button onclick="checkQuizAnswer(${idx}, ${quiz.correctIndex}, this)" class="w-full text-right p-4 bg-gray-950 border border-gray-850 rounded-xl hover:border-gray-600 transition-all text-xs text-gray-300">
            ${option}
        </button>
    `).join('');
}

window.checkQuizAnswer = function(selectedIdx, correctIdx, btnElement) {
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
    if (selectedIdx === correctIdx) {
        btnElement.classList.add('border-emerald-500', 'bg-emerald-950/20', 'text-emerald-400');
        setTimeout(() => {
            document.getElementById('quiz-question-box').classList.add('hidden');
            document.getElementById('quiz-result-box').classList.remove('hidden');
        }, 600);
    } else {
        btnElement.classList.add('border-red-500', 'bg-red-950/20', 'text-red-400');
        alert("❌ معمارية خاطئة! تفقد كروت التفاصيل والبدائل ثم أعد الاختبار.");
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
        btnElement.classList.remove('border-red-500', 'bg-red-950/20', 'text-red-400');
    }
};

window.completeCurrentNode = function() {
    const stepUID = `${userProgress.currentTrack}_${activeStepData.id}`;
    if (!userProgress.completedSteps.includes(stepUID)) {
        userProgress.completedSteps.push(stepUID);
        userProgress.xp += 50;
        userProgress.coins += 10;
        saveDataToLocalStorage();
        updateUIStats();
        renderTrackRoadmap();
    }
    closeModal();
};

window.changeUserDomain = function(newTrackKey) {
    if (ATLAS_DOMAINS[newTrackKey]) {
        userProgress.currentTrack = newTrackKey;
        saveDataToLocalStorage();
        renderTrackRoadmap();
    }
};

// ================= نظام مبدل الثيمات السحري المتقدم =================
window.switchTheme = function(themeName) {
    userProgress.activeTheme = themeName;
    saveDataToLocalStorage();
    applyActiveTheme(themeName);
    if(userProgress.hasCompletedOnboarding) {
        renderTrackRoadmap();
    }
};

function applyActiveTheme(themeName) {
    const config = THEMES_CONFIG[themeName];
    if (!config) return;
    
    // تعديل لون الخلفية الفعلي للبودي بالكامل بالأنيميشن
    document.body.style.backgroundColor = config.bg;
    
    // تحديث شكل أزرار السايدبار النشطة
    document.querySelectorAll('.theme-selector-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-white', 'scale-105');
    });
    const activeBtn = document.getElementById(`btn-${themeName}`);
    if (activeBtn) activeBtn.classList.add('ring-2', 'ring-white', 'scale-105');
}

function updateUIStats() {
    document.getElementById('user-xp').innerText = `${userProgress.xp} XP`;
    document.getElementById('user-coins').innerText = userProgress.coins;
}

function saveDataToLocalStorage() {
    localStorage.setItem("atlas_track_progress", JSON.stringify(userProgress));
}
