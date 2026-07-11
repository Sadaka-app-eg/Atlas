// careerHub.js - نظام التوظيف الاحترافي ومحاكي الـ Portfolio
const CareerHubEngine = {
    
    // حساب مؤشر الكفاءة المهنية لسوق العمل برمجياً
    calculateReadinessScore(userProgress) {
        const totalCompleted = userProgress.completedNodes.length;
        if (totalCompleted === 0) return 0;
        
        // كل مرحلة منجزة تمنح 15% جاهزية، مع بونص إضافي لكل 200 XP
        let baseScore = totalCompleted * 15;
        let xpBonus = Math.floor(userProgress.xp / 200) * 5;
        
        let finalScore = baseScore + xpBonus;
        return finalScore > 100 ? 100 : finalScore;
    },

    // توليد سيرة ذاتية متطابقة مع أنظمة الفرز العالمية (ATS Standard)
    generateATSResume(userProgress, currentDomainData) {
        const readiness = this.calculateReadinessScore(userProgress);
        const completedNodes = currentDomainData.roadmap.filter(node => 
            userProgress.completedNodes.includes(node.id)
        );

        const resumeObject = {
            applicantInfo: {
                role: `متخصص معتمد في ${currentDomainData.titleAr}`,
                verificationSystem: "Verified via Atlas Anti-Distraction Engine",
                generationDate: new Date().toLocaleDateString('ar-EG')
            },
            metrics: {
                totalXpEarned: userProgress.xp,
                marketReadinessIndex: `${readiness}%`,
                engagementLevel: userProgress.xp > 500 ? "Elite Self-Learner" : "Active Practitioner"
            },
            verifiedSkills: completedNodes.map(node => ({
                skillName: node.title,
                competencyLevel: node.level,
                validatedProject: node.project.title
            })),
            academicSummary: `أتم بنجاح المسار المعرفي الشامل لـ [${currentDomainData.titleEn}] متخطياً كافة التقييمات والاختبارات البرمجية والعملية بدون تشتت.`
        };

        return resumeObject;
    },

    // تصدير معتمد وملون بالكامل للسيرة الذاتية يظهر في الكونسول أو النافذة
    renderPrettyCV(userProgress, currentDomainData) {
        const cv = this.generateATSResume(userProgress, currentDomainData);
        
        let formattedStr = `
============================================================
              Verified ATS-Friendly Professional CV
============================================================
🎯 المسمى الوظيفي: ${cv.applicantInfo.role}
📅 تاريخ التوثيق: ${cv.applicantInfo.generationDate}
📊 مؤشر الجاهزية لسوق العمل: ${cv.metrics.marketReadinessIndex} [${cv.metrics.engagementLevel}]
⭐ مجموع نقاط الخبرة (XP): ${cv.metrics.totalXpEarned}
------------------------------------------------------------
🛠️ المهارات والخبرات العملية الموثقة محلياً:
${cv.verifiedSkills.map((s, i) => `${i+1}. [${s.competencyLevel}] ${s.skillName}\n   💼 المشروع المنجز: ${s.validatedProject}`).join('\n\n')}
------------------------------------------------------------
📜 التقييم العام للمنصة:
${cv.academicSummary}
============================================================
        `;
        return formattedStr;
    }
};
