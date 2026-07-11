// app.js - المحرك البرمجي لإدارة الجلسات، النقاط، وبناء الخرائط ديناميكياً

// 1. حالة التطبيق الافتراضية (State)
let userProgress = {
    hasCompletedOnboarding: false,
    age: 0,
    dailyTargetMinutes: 0,
    learningStyle: '',
    currentDomain: 'computer_science', // الافتراضي
    completedNodes: [], // العقد التي تم إنهاؤها
    xp: 0,
    coins: 0
};

// 2. عند تشغيل التطبيق: التحقق من وجود بيانات محفوظة محلياً
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

// إعداد أزرار الاختيار في الاستبيان
function setupOnboardingInteractions() {
    window.selectSurveyOption = function(field, value, buttonElement) {
        userProgress[field] = value;
        // إزالة التصميم النشط من الأزرار المجاورة
        buttonElement.parentNode.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-950/20', 'border-emerald-500', 'bg-emerald-950/20');
        });
        // إضافة التصميم النشط
        const activeClass = field === 'style' ? 'border-emerald-500' : 'border-blue-500';
        const bgClass = field === 'style' ? 'bg-emerald-950/20' : 'bg-blue-950/20';
        buttonElement.classList.add(activeClass, bgClass);
    };

    // معالجة إرسال الاستبيان
    const form = document.getElementById('onboarding-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            userProgress.age = parseInt(document.getElementById('age').value);
            const hours = parseInt(document.getElementById('hours').value);
            userProgress.dailyTargetMinutes = hours * 60;
            userProgress.hasCompletedOnboarding = true;
            
            // حفظ البيانات محلياً والانتقال للوحة التحكم
            saveDataToLocalStorage();
            goToDashboard();
        });
    }
}

// 3. الانتقال للوحة التحكم وتوليد الخريطة ديناميكياً
function goToDashboard() {
    document.getElementById('onboarding-section').classList.add('hidden');
    const dash = document.getElementById('dashboard-section');
    dash.classList.remove('hidden');
    
    // تحديث الإحصائيات العلوية (Navbar)
    document.getElementById('nav-stats').classList.remove('hidden');
    updateUIStats();

    // رندرة خريطة الطريق بناء على المجال الحالي المختار من الداتا
    renderDynamicRoadmap();

    setTimeout(() => {
        dash.classList.remove('opacity-0');
    }, 50);
}

// 4. دالة بناء خريطة الطريق بشكل تفاعلي بالكامل من الـ Data
function renderDynamicRoadmap() {
    const domainKey = userProgress.currentDomain;
    const domainData = ATLAS_DOMAINS[domainKey];
    const container = document.getElementById('roadmap-nodes-container');
    
    if (!container || !domainData) return;
    
    // تحديث البيانات العامة للمجال في الكروت العلوية
    document.getElementById('display-domain-title').innerText = domainData.titleAr;
    document.getElementById('display-hours').innerText = `${userProgress.dailyTargetMinutes} دقيقة يومياً`;
    
    container.innerHTML = ""; // تصفية الحاوية أولاً

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

// 5. محاكاة عملية التعلم وإعطاء الجوائز (Gamification Engine)
window.learnNode = function(nodeId) {
    if (!userProgress.completedNodes.includes(nodeId)) {
        userProgress.completedNodes.push(nodeId);
        userProgress.xp += 50;  // إضافة نقاط خبرة
        userProgress.coins += 10; // إضافة عملات
        
        saveDataToLocalStorage();
        updateUIStats();
        renderDynamicRoadmap();
        
        alert("🎉 أحسنت! أنهيت هذه المرحلة المعرفية وحصلت على +50 XP و +10 Coins لتجنب التشتت!");
    } else {
        alert("لقد قمت بإنهاء هذه المرحلة سابقاً. يمكنك مراجعة محتواها في أي وقت!");
    }
};

// تحديث العدادات الفورية في الشاشة
function updateUIStats() {
    document.getElementById('user-xp').innerText = `${userProgress.xp} XP`;
    document.getElementById('user-coins').innerText = userProgress.coins;
}

// حفظ الحالة الحالية في التخزين المحلي للمتصفح
function saveDataToLocalStorage() {
    localStorage.setItem("atlas_user_progress", JSON.stringify(userProgress));
}
