// achievements.js - نظام الشارات والميداليات الكبرى الصعب تزييفها
const ATLAS_BADGES = [
    { id: "badge_first_step", title: "الخطوة الأولى", description: "إتمام أول مرحلة تعليمية في خريطة الطريق", xpRequired: 50 },
    { id: "badge_grinder", title: "المكافح المستمر", description: "جمع أكثر من 300 نقطة خبرة XP", xpRequired: 300 },
    { id: "badge_expert", title: "أستاذ المجال", description: "تخطي حاجز الـ 1000 نقطة خبرة والوصول للاحتراف", xpRequired: 1000 }
];

const AchievementsEngine = {
    checkUnlocks(userProgress) {
        let unlockedBadges = JSON.parse(localStorage.getItem('atlas_unlocked_badges')) || [];
        
        ATLAS_BADGES.forEach(badge => {
            if (userProgress.xp >= badge.xpRequired && !unlockedBadges.includes(badge.id)) {
                unlockedBadges.push(badge.id);
                localStorage.setItem('atlas_unlocked_badges', JSON.stringify(unlockedBadges));
                
                // إظهار تنبيه مبهر للمستخدم بكسب شارة كبرى
                alert(`🏆 إنجاز عالمي جديد! لقد فتحت شارة: [ ${badge.title} ] - ${badge.description}`);
            }
        });
    }
};
