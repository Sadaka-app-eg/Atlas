// app.js - المحرك البرمجي الشامل لتطبيق Atlas (إدارة الجلسات، النقاط، والمحتوى التفاعلي)

// ================= 1. حالة التطبيق الافتراضية (State) =================
let userProgress = {
    hasCompletedOnboarding: false,
    age: 0,
    dailyTargetMinutes: 0,
    learningStyle: '',
    currentDomain: 'computer_science', // المجال الافتراضي عند البدء
    completedNodes: [],               // العقد والمراحل التي تم اجتيازها بنجاح
    xp: 0,
    coins: 0
};

// متغيرات داخلية لتتبع حالة التبويبات والبطاقات المفتوحة حالياً داخل الصندوق المنبثق
let activeNodeData = null;
let currentFlashcardIndex = 0;
let isCardFlipped = false;

// ================= 2. دورة حياة التطبيق عند التشغيل (Initialization) =================
document.addEventListener("DOMContentLoaded", () => {
    // التحقق من وجود بيانات مستخدم محفوظة سابقاً في المتصفح لمنع التشتت وإعادة البدء
    const savedData = localStorage.getItem("atlas_user_progress");
    if (savedData) {
        userProgress = JSON.parse(savedData);
        if (userProgress.hasCompletedOnboarding) {
            goToDashboard();
        }
    }
    setupOnboardingInteractions();
});

// إعداد أزرار الاختيار في الاستبيان الأول
function setupOnboardingInteractions() {
    window.selectSurveyOption = function(field, value, buttonElement) {
        userProgress[field] = value;
        
        // إزالة التصميم النشط من الأزرار المجاورة في نفس الخيار
        buttonElement.parentNode.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-950/20', 'border-emerald-500', 'bg-emerald-950/20');
        });
        
        // إضافة تأثيرات التصميم العصري للزر النشط بحسب نوع الخيار
        const activeClass = field === 'style' ? 'border-emerald-500' : 'border-blue-500';
        const bgClass = field === 'style' ? 'bg-emerald-950/20' : 'bg-blue-950/20';
        buttonElement.classList.add(activeClass, bgClass);
    };

    // معالجة إرسال الاستبيان وتوليد الخطة فوراً
    const form = document.getElementById('onboarding-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            userProgress.age = parseInt(document.getElementById('age').value);
            const hours = parseInt(document.getElementById('hours').value);
            userProgress.dailyTargetMinutes = hours * 60;
            userProgress.hasCompletedOnboarding = true;
            
            // حفظ البيانات محلياً والانتقال مباشرة إلى لوحة التحكم
            saveDataToLocalStorage();
            goToDashboard();
        });
    }
}

// ================= 3. إدارة واجهات لوحة التحكم والتبديل (Navigation) =================
function goToDashboard() {
    document.getElementById('onboarding-section').classList.add('hidden');
    const dash = document.getElementById('dashboard-section');
    dash.classList.remove('hidden');
    
    // تفعيل شريط النقاط العلوي وتحديث الأرقام
    document.getElementById('nav-stats').classList.remove('hidden');
    updateUIStats();

    // رندرة وبناء خريطة الطريق الحالية ديناميكياً من قاعدة بيانات domains.js
    renderDynamicRoadmap();

    setTimeout(() => {
        dash.classList.remove('opacity-0');
    }, 50);
}

// ================= 4. محرك بناء خريطة الطريق الشجرية ديناميكياً (Roadmap Engine) =================
function renderDynamicRoadmap() {
    const domainKey = userProgress.currentDomain;
    const domainData = ATLAS_DOMAINS[domainKey];
    const container = document.getElementById('roadmap-nodes-container');
    
    if (!container || !domainData) return;
    
    // تحديث البيانات الوصفية للمجال الحالي في الكروت الإحصائية العلوية
    document.getElementById('display-domain-title').innerText = domainData.titleAr;
    document.getElementById('display-hours').innerText = `${userProgress.dailyTargetMinutes} دقيقة يومياً`;
    
    container.innerHTML = ""; // تصفية الحاوية الرسومية قبل إعادة الضخ

    // توليد العقد التعليمية بتصميم شجري متعرج (يسار ويمين بالتبادل) لرحلة بصرية احترافية
    domainData.roadmap.forEach((node, index) => {
        const isCompleted = userProgress.completedNodes.includes(node.id);
        const alignmentClass = index % 2 === 0 ? 'md:justify-start' : 'md:justify-end';
        const numBg = isCompleted ? 'bg-emerald-500 ring-emerald-900' : 'bg-blue-600 ring-blue-900';
        const borderHover = isCompleted ? 'hover:border-emerald-500/40' : 'hover:border-blue-500/40';
        const opacityClass = isCompleted ? 'opacity-90 border-emerald-500/30' : '';

        const nodeHTML = `
            <div class="flex flex-col items-center md:flex-row ${alignmentClass} gap-6 transition-all">
                ${index % 2 === 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg">${node.stepNumber}</div>` : ''}
                
                <div onclick="learnNode('${node.id}')" class="glass-panel p-5 rounded-2xl w-full md:max-w-md ${borderHover} ${opacityClass} transition-all cursor-pointer relative group">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-semibold ${isCompleted ? 'text-emerald-400' : 'text-blue-400'} tracking-wider uppercase">${node.level}</span>
                        ${isCompleted ? '<i class="fa-solid fa-circle-check text-emerald-500"></i>' : '<i class="fa-regular fa-circle text-gray-500 group-hover:text-blue-400"></i>'}
                    </div>
                    <h4 class="text-lg font-bold text-white mt-1">${node.title}</h4>
                    <p class="text-xs text-gray-400 mt-2 line-clamp-2">${node.writtenExplanation}</p>
                    <div class="mt-3 pt-3 border-t border-gray-800/60 flex justify-between text-[11px] text-gray-500">
                        <span><i class="fa-solid fa-video ml-1"></i> ${node.videos.length} فيديو</span>
                        <span><i class="fa-solid fa-tasks ml-1"></i> ${node.quizzes.length} اختبار</span>
                        <span><i class="fa-solid fa-trophy ml-1"></i> +50 XP</span>
                    </div>
                </div>

                ${index % 2 !== 0 ? `<div class="w-12 h-12 rounded-full ${numBg} flex items-center justify-center text-white font-bold ring-4 shadow-lg">${node.stepNumber}</div>` : ''}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', nodeHTML);
    });
}

// ================= 5. إدارة صندوق المحتوى المنبثق المعزول (Content Modal & Tabs) =================
window.learnNode = function(nodeId) {
    const domainKey = userProgress.currentDomain;
    activeNodeData = ATLAS_DOMAINS[domainKey].roadmap.find(n => n.id === nodeId);
    
    if (!activeNodeData) return;

    // حقن البيانات النصية والشرح في واجهة المودال
    document.getElementById('modal-node-title').innerText = activeNodeData.title;
    document.getElementById('modal-node-level').innerText = activeNodeData.level;
    document.getElementById('modal-explanation').innerText = activeNodeData.writtenExplanation;

    // حقن وتوليد روابط الفيديوهات بطريقة آمنة ومعزولة تمنع تشتت المتعلم
    const videoContainer = document.getElementById('modal-videos-list');
    videoContainer.innerHTML = activeNodeData.videos.map(v => `
        <a href="${v.url}" target="_blank" class="flex items-center justify-between p-3 bg-gray-900/60 border border-gray-800 hover:border-red-500/40 rounded-xl transition-all group">
            <span class="text-sm font-medium text-gray-300 group-hover:text-white"><i class="fa-solid fa-play text-xs text-red-500 ml-2"></i> ${v.title}</span>
            <span class="text-xs text-gray-500">مشاهدة معزولة <i class="fa-solid fa-arrow-up-right-from-square mr-1 text-[10px]"></i></span>
        </a>
    `).join('');

    // عرض بيانات وإرشادات التقييم الخاصة بالمشروع العملي للمرحلة
    document.getElementById('modal-project-box').innerHTML = `
        <p class="font-semibold text-gray-200 mb-1">${activeNodeData.project.title}</p>
        <p class="text-[11px] text-emerald-400/80"><i class="fa-solid fa-check-double ml-1"></i> معيار القبول: ${activeNodeData.project.evaluationCriteria}</p>
    `;

    // إعادة ضبط عدادات البطاقات التعليمية والاختبارات الداخلية للعقدة الجديدة
    currentFlashcardIndex = 0;
    isCardFlipped = false;
    resetFlashcardUI();
    setupQuizUI();

    // العودة تلقائياً للتبويب الأول (الدراسة والشرح) في كل مرة يُفتح فيها المودال
    switchTab('study');

    // فتح المودال مع تفعيل تأثير الانتقال الناعم (Animation)
    const modal = document.getElementById('content-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
};

window.closeModal = function() {
    const modal = document.getElementById('content-modal');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

// التبديل والتحكم البصري في التبويبات الداخلية للمودال
window.switchTab = function(tabName) {
    const tabs = ['study', 'flashcards', 'quiz'];
    tabs.forEach(t => {
        document.getElementById(`tab-content-${t}`).classList.add('hidden');
        document.getElementById(`tab-btn-${t}`).classList.remove('border-blue-500', 'text-blue-400');
        document.getElementById(`tab-btn-${t}`).classList.add('border-transparent', 'text-gray-400');
    });

    document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-btn-${tabName}`).classList.add('border-blue-500', 'text-blue-400');
    document.getElementById(`tab-btn-${tabName}`).classList.remove('border-transparent', 'text-gray-400');
};

// ================= 6. منطق البطاقات التعليمية (Flashcards Engine) =================
window.flipCard = function() {
    if (!activeNodeData || !activeNodeData.flashcards.length) return;
    const card = activeNodeData.flashcards[currentFlashcardIndex];
    const textEl = document.getElementById('flashcard-text');
    
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
        textEl.innerText = card.answer;
        textEl.classList.remove('text-white');
        textEl.classList.add('text-emerald-400');
    } else {
        textEl.innerText = card.question;
        textEl.classList.remove('text-emerald-400');
        textEl.classList.add('text-white');
    }
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
        document.getElementById('flashcard-text').classList.remove('text-emerald-400');
        document.getElementById('flashcard-text').classList.add('text-white');
    }
}

// ================= 7. نظام التقييم والتمارين (Quiz Engine) =================
function setupQuizUI() {
    const isAlreadyCompleted = userProgress.completedNodes.includes(activeNodeData.id);
    
    // إذا اجتاز المستخدم المرحلة سابقاً، يظهر له كارت النجاح مباشرة دون الحاجة لإعادة الاختبار
    if (isAlreadyCompleted) {
        document.getElementById('quiz-question-box').classList.add('hidden');
        document.getElementById('quiz-result-box').classList.remove('hidden');
        return;
    }

    document.getElementById('quiz-question-box').classList.remove('hidden');
    document.getElementById('quiz-result-box').classList.add('hidden');

    const quiz = activeNodeData.quizzes[0]; // استدعاء أول تمرين تقييمي مبرمج للعقدة
    document.getElementById('quiz-question-text').innerText = quiz.question;

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = quiz.options.map((option, idx) => `
        <button onclick="checkQuizAnswer(${idx}, ${quiz.correctIndex}, this)" class="w-full text-right p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-600 transition-all text-sm text-gray-300">
            ${option}
        </button>
    `).join('');
}

window.checkQuizAnswer = function(selectedIdx, correctIdx, btnElement) {
    const optionsContainer = document.getElementById('quiz-options-container');
    
    // إغلاق وقفل الأزرار فوراً عند الضغط لمنع التلاعب وتكرار الإجابات
    optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
        btnElement.classList.remove('border-gray-600');
        btnElement.classList.add('border-emerald-500', 'bg-emerald-950/20', 'text-emerald-400');
        
        // الانتقال البصري الناعم لكارت النجاح والتكريم بعد ثانية واحدة
        setTimeout(() => {
            document.getElementById('quiz-question-box').classList.add('hidden');
            document.getElementById('quiz-result-box').classList.remove('hidden');
        }, 800);
    } else {
        btnElement.classList.remove('border-gray-600');
        btnElement.classList.add('border-red-500', 'bg-red-950/20', 'text-red-400');
        alert("❌ إجابة غير دقيقة! ننصحك بالعودة لقراءة الشرح والبطاقات التعليمية، ثم المحاولة مجدداً لترسيخ المفهوم وتجنب نقاط الضعف المعرفية.");
        
        // إعادة فك قفل الأزرار للمحاولة من جديد
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
    }
};

// ================= 8. محرك الألعاب وحفظ البيانات (Gamification & Local Storage) =================
window.completeCurrentNode = function() {
    if (!userProgress.completedNodes.includes(activeNodeData.id)) {
        userProgress.completedNodes.push(activeNodeData.id);
        
        // تخصيص الجوائز الفورية لنظام المستويات والألعاب
        userProgress.xp += 50;
        userProgress.coins += 10;
        
        saveDataToLocalStorage();
        updateUIStats();
        renderDynamicRoadmap();
    }
    closeModal();
};

function updateUIStats() {
    document.getElementById('user-xp').innerText = `${userProgress.xp} XP`;
    document.getElementById('user-coins').innerText = userProgress.coins;
}

function saveDataToLocalStorage() {
    localStorage.setItem("atlas_user_progress", JSON.stringify(userProgress));
}

// دالة مساعدة إضافية في حال رغبت لاحقاً في برمجة تبديل المجال برمجياً من واجهة الاستخدام
window.changeUserDomain = function(newDomainKey) {
    if (ATLAS_DOMAINS[newDomainKey]) {
        userProgress.currentDomain = newDomainKey;
        saveDataToLocalStorage();
        renderDynamicRoadmap();
    }
};
