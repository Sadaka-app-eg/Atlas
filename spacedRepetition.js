// spacedRepetition.js - خوارزمية SuperMemo SM-2 المتقدمة للتكرار المتباعد
const SpacedRepetitionEngine = {
    // جلب جدول المراجعات الكامل من الذاكرة المحلية
    getAllReviews() {
        return JSON.parse(localStorage.getItem('atlas_spaced_reviews')) || {};
    },

    // معالجة مراجعة البطاقة وتحديث بياناتها الرياضية
    // القيمة (quality): من 0 (نسيان تام) إلى 5 (استجابة فورية ممتازة)
    processCardReview(cardId, quality) {
        if (quality < 0 || quality > 5) return;

        let db = this.getAllReviews();
        let cardData = db[cardId] || {
            repetitions: 0,   // عدد مرات المراجعة الناجحة المتتالية
            interval: 1,      // الفترة الزمنية بالأيام حتى المراجعة القادمة
            easiness: 2.5     // عامل التسهيل (Easiness Factor) الافتراضي
        };

        // تحديث عامل التسهيل بناءً على خوارزمية SM-2
        cardData.easiness = cardData.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        
        // حد أدنى لعامل التسهيل لحماية البطاقة من التجميد المعرفي
        if (cardData.easiness < 1.3) cardData.easiness = 1.3;

        // حساب الفترة الزمنية القادمة (Interval Calculation)
        if (quality < 3) {
            // إذا كانت الإجابة سيئة، يتم إعادة التكرار من الصفر فوراً
            cardData.repetitions = 0;
            cardData.interval = 1; 
        } else {
            cardData.repetitions++;
            if (cardData.repetitions === 1) {
                cardData.interval = 1;
            } else if (cardData.repetitions === 2) {
                cardData.interval = 6;
            } else {
                cardData.interval = Math.round(cardData.interval * cardData.easiness);
            }
        }

        // تحديد تاريخ المراجعة القادم بدقة
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + cardData.interval);
        cardData.nextReviewDate = nextDate.toISOString();

        // حفظ التحديثات في الـ LocalStorage
        db[cardId] = cardData;
        localStorage.setItem('atlas_spaced_reviews', JSON.stringify(db));
        
        console.log(`%c[SM-2 Engine] Card ${cardId}: Next review in ${cardData.interval} days (EF: ${cardData.easiness.toFixed(2)})`, "color: #10b981; font-weight: bold;");
    },

    // جلب قائمة المعرفات (IDs) للبطاقات التي يجب مراجعتها اليوم فوراً لمنع التشتت
    getDueCards() {
        const db = this.getAllReviews();
        const now = new Date();
        let dueCardIds = [];

        for (const cardId in db) {
            if (new Date(db[cardId].nextReviewDate) <= now) {
                dueCardIds.push(cardId);
            }
        }
        return dueCardIds;
    }
};
