// app.js - المحرك المحدث للربط الكامل مع الواجهة الفخمة والـ Sidebar

let userProgress = {
    hasCompletedOnboarding: false,
    age: 0,
    dailyTargetMinutes: 0,
    learningStyle: '',
    currentDomain: 'computer_science', 
    completedNodes: [],               
    xp: 0,
    coins: 0
};

let activeNodeData = null;
let currentFlashcardIndex = 0;
let isCardFlipped = false;

document.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("atlas_user_progress");
    if (savedData) {
        userProgress = JSON.parse(savedData);
        if (userProgress.hasCompletedOnboarding) {
            goToDashboard();
        }
    }
    setupOnboardingInteractions();
});

function setupOnboardingInteractions() {
    window.selectSurveyOption = function(field, value, buttonElement) {
        userProgress[field] = value;
        buttonElement.parentNode.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-950/20', 'border-emerald-500', 'bg-emerald-950/20');
        });
        const activeClass = field === 'style' ? 'border-emerald-500' : 'border-blue-500';
        const bgClass = field === 'style' ? 'bg-emerald-950/20' : 'bg-blue-950/20';
        buttonElement.classList.add(activeClass, bgClass);
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
    // إخفاء شاشة الاستبيان
    document.getElementById('onboarding-section').classList.add('hidden');
    
    // إظهار السايدبار ولوحة التحكم الحالية
    const sidebar = document.getElementById('sidebar-nav');
    const dash = document.getElementById('dashboard-section');
    
    if(sidebar) sidebar.classList.remove('hidden', 'md:hidden');
    if(sidebar) sidebar.classList.add('flex');
    if(dash) dash.classList.remove('hidden');
    
    document.getElementById('nav-stats').classList.remove('hidden');
    updateUIStats();
    renderDynamicRoadmap();

    setTimeout(() => {
        if(dash) dash.classList.remove('opacity-0', 'translate-y-4');
    }, 50);
}

function renderDynamicRoadmap() {
    const domainKey = userProgress.currentDomain;
    const domainData = ATLAS_DOMAINS[domainKey];
    const container = document.getElementById('roadmap-nodes-container');
    
    if (!container || !domainData) return;
    
    document.getElementById('display-domain-title').innerText = domainData.titleAr;
    document.getElementById('display-hours').innerText = `${userProgress.dailyTargetMinutes} دقيقة يومياً`;
    
    container.innerHTML = ""; 

    domainData.roadmap.forEach((node, index) => {
        const isCompleted = userProgress.completedNodes.includes(node.id);
        const alignmentClass = index % 2 === 0 ? 'md:justify-start' : 'md:justify-end';
        const numBg = isCompleted ? 'bg-emerald-500 ring-emerald-900' : 'bg-blue-600 ring-blue-900';
        const borderHover = isCompleted ? 'hover:border-emerald-500/40' : 'hover:border-blue-500/40';
        const opacityClass = isCompleted ? 'opacity-90 border-emerald-500/30' : '';

        const nodeHTML = `
            <div class="flex flex-col items-center md:flex-row ${alignmentClass} gap-6 transition-all relative z-10">
                ${index % 2 === 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg shrink-0">${node.stepNumber}</div>` : ''}
                
                <div onclick="learnNode('${node.id}')" class="glow-card glass-panel p-5 rounded-2xl w-full md:max-w-md ${borderHover} ${opacityClass} transition-all cursor-pointer relative group border border-gray-800">
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-bold ${isCompleted ? 'text-emerald-400' : 'text-blue-400'} tracking-wider uppercase">${node.level}</span>
                        ${isCompleted ? '<i class="fa-solid fa-circle-check text-emerald-500"></i>' : '<i class="fa-regular fa-circle text-gray-500 group-hover:text-blue-400"></i>'}
                    </div>
                    <h4 class="text-base font-bold text-white mt-1">${node.title}</h4>
                    <p class="text-xs text-gray-400 mt-2 line-clamp-2">${node.writtenExplanation}</p>
                    <div class="mt-3 pt-3 border-t border-gray-800/65 flex justify-between text-[10px] text-gray-500">
                        <span><i class="fa-solid fa-video ml-1"></i> ${node.videos.length} مرئي</span>
                        <span><i class="fa-solid fa-tasks ml-1"></i> ${node.quizzes.length} اختبار</span>
                        <span><i class="fa-solid fa-trophy ml-1"></i> +50 XP</span>
                    </div>
                </div>

                ${index % 2 !== 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg shrink-0">${node.stepNumber}</div>` : ''}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', nodeHTML);
    });
}

window.learnNode = function(nodeId) {
    const domainKey = userProgress.currentDomain;
    activeNodeData = ATLAS_DOMAINS[domainKey].roadmap.find(n => n.id === nodeId);
    
    if (!activeNodeData) return;

    document.getElementById('modal-node-title').innerText = activeNodeData.title;
    document.getElementById('modal-node-level').innerText = activeNodeData.level;
    document.getElementById('modal-explanation').innerText = activeNodeData.writtenExplanation;

    const videoContainer = document.getElementById('modal-videos-list');
    videoContainer.innerHTML = activeNodeData.videos.map(v => `
        <a href="${v.url}" target="_blank" class="flex items-center justify-between p-3 bg-gray-950 border border-gray-850 hover:border-red-500/40 rounded-xl transition-all group">
            <span class="text-xs font-medium text-gray-300 group-hover:text-white"><i class="fa-solid fa-play text-xs text-red-500 ml-2"></i> ${v.title}</span>
            <span class="text-[10px] text-gray-500">مشاهدة معزولة <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i></span>
        </a>
    `).join('');

    document.getElementById('modal-project-box').innerHTML = `
        <p class="font-semibold text-gray-200 mb-1">${activeNodeData.project.title}</p>
        <p class="text-[10px] text-emerald-400/80"><i class="fa-solid fa-check-double ml-1"></i> معيار القبول: ${activeNodeData.project.evaluationCriteria}</p>
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
    if (!activeNodeData || !activeNodeData.flashcards.length) return;
    const card = activeNodeData.flashcards[currentFlashcardIndex];
    const textEl = document.getElementById('flashcard-text');
    isCardFlipped = !isCardFlipped;
    textEl.innerText = isCardFlipped ? card.answer : card.question;
    textEl.className = isCardFlipped ? "text-sm font-bold text-emerald-400 px-2" : "text-sm font-bold text-white px-2";
};

window.nextFlashcard = function() {
    if (!activeNodeData) return;
    currentFlashcardIndex = (currentFlashcardIndex + 1) % activeNodeData.flashcards.length;
    isCardFlipped = false;
    resetFlashcardUI();
};

function resetFlashcardUI() {
    if (activeNodeData && activeNodeData.flashcards.length) {
        document.getElementById('flashcard-text').innerText = activeNodeData.flashcards[currentFlashcardIndex].question;
        document.getElementById('flashcard-text').className = "text-sm font-bold text-white px-2";
    }
}

function setupQuizUI() {
    const isAlreadyCompleted = userProgress.completedNodes.includes(activeNodeData.id);
    if (isAlreadyCompleted) {
        document.getElementById('quiz-question-box').classList.add('hidden');
        document.getElementById('quiz-result-box').classList.remove('hidden');
        return;
    }
    document.getElementById('quiz-question-box').classList.remove('hidden');
    document.getElementById('quiz-result-box').classList.add('hidden');

    const quiz = activeNodeData.quizzes[0];
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
        alert("❌ محاولة غير صحيحة، تفقد الشرح والبطاقات مجدداً!");
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
    }
};

window.completeCurrentNode = function() {
    if (!userProgress.completedNodes.includes(activeNodeData.id)) {
        userProgress.completedNodes.push(activeNodeData.id);
        userProgress.xp += 50;
        userProgress.coins += 10;
        saveDataToLocalStorage();
        updateUIStats();
        renderDynamicRoadmap();
        if (typeof AchievementsEngine !== 'undefined') { AchievementsEngine.checkUnlocks(userProgress); }
    }
    closeModal();
};

window.changeUserDomain = function(newDomainKey) {
    if (ATLAS_DOMAINS[newDomainKey]) {
        userProgress.currentDomain = newDomainKey;
        saveDataToLocalStorage();
        renderDynamicRoadmap();
    }
};

function updateUIStats() {
    document.getElementById('user-xp').innerText = `${userProgress.xp} XP`;
    document.getElementById('user-coins').innerText = userProgress.coins;
}

function saveDataToLocalStorage() {
    localStorage.setItem("atlas_user_progress", JSON.stringify(userProgress));
}
