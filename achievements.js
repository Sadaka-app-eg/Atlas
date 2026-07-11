// achievements.js - نظام الشارات الديناميكي ونقاط المكافآت التلقائية
const ATLAS_BADGES = [
    { id: "badge_first_step", title: "🚀 الخطوة الأولى", description: "إتمام أول مرحلة تعليمية في خريطة الطريق", xpRequired: 50, coinsReward: 20 },
    { id: "badge_grinder", title: "⚡ المكافح الملتزم", description: "تخطي حاجز الـ 300 نقطة خبرة بنجاح", xpRequired: 300, coinsReward: 100 },
    { id: "badge_elite", title: "👑 خبير المدار المعرفي", description: "دخول النادي النخبي بـ 1000 نقطة خبرة", xpRequired: 1000, coinsReward: 500 },
    { id: "badge_multi_domain", title: "🧠 المتعدد الموسوعي", description: "إنهاء 4 مراحل تعليمية متكاملة", stagesRequired: 4, coinsReward: 250 }
];

const AchievementsEngine = {
    // فحص الشارات وتحديث حالة المستخدم ومنحه المكافآت المالية للتطبيق
    checkUnlocks(userProgress) {
        let unlockedBadges = JSON.parse(localStorage.getItem('atlas_unlocked_badges')) || [];
        let updated = false;

        ATLAS_BADGES.forEach(badge => {
            // التحقق من الشروط (سواء النقاط أو عدد المراحل المنجزة)
            const meetsXp = badge.xpRequired && userProgress.xp >= badge.xpRequired;
            const meetsStages = badge.stagesRequired && userProgress.completedNodes.length >= badge.stagesRequired;

            if ((meetsXp || meetsStages) && !unlockedBadges.includes(badge.id)) {
                unlockedBadges.push(badge.id);
                
                // منحه الكوينز الإضافية تلقائياً كمكافأة للالتزام
                userProgress.coins += badge.coinsReward;
                updated = true;

                // طباعة تنبيه مبهر بصرياً في المتصفح
                this.triggerBadgeNotification(badge);
            }
        });

        if (updated) {
            localStorage.setItem('atlas_unlocked_badges', JSON.stringify(unlockedBadges));
            // حفظ التحديثات في ملف الحساب الرئيسي
            localStorage.setItem("atlas_user_progress", JSON.stringify(userProgress));
        }
    },

    // توليد واجهة إشعار أنيقة ومنفصلة
    triggerBadgeNotification(badge) {
        console.log(`%c🏆 [إنجاز غير مقفل]: ${badge.title} - ${badge.description} (+${badge.coinsReward} Coins)`, "background: #1e1b4b; color: #fbbf24; padding: 6px 10px; border-radius: 8px; font-weight: bold;");
        
        // توليد توست تنبيه مؤقت في الواجهة إن أمكن
        const notificationText = `🏆 إنجاز عالمي جديد!\nلقد فتحت شارة: [ ${badge.title} ]\n${badge.description}\nوحصلت على مكافأة: +${badge.coinsReward} عملة رقمية!`;
        alert(notificationText);
    }
};
