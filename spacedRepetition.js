// spacedRepetition.js - خوارزمية جدولة البطاقات التعليمية لمنع النسيان
const SpacedRepetitionEngine = {
    // مصفوفة البطاقات الجاهزة للمراجعة اليوم
    reviewQueue: [],

    // جدولة بطاقة بناءً على تقييم المستخدم (1 = صعب جداً، 2 = متوسط، 3 = سهل وعرفته فوراً)
    processCardReview(cardId, score) {
        let savedReviews = JSON.parse(localStorage.getItem('atlas_reviews')) || {};
        
        let interval = 1; // الأيام الافتراضية للمراجعة القادمة
        if (score === 3) interval = 7;      // سهل -> راجعه بعد أسبوع
        else if (score === 2) interval = 3; // متوسط -> راجعه بعد 3 أيام
        else interval = 1;                  // صعب -> راجعه غداً فوراً

        const reviewDate = new Date();
        reviewDate.setDate(reviewDate.getDate() + interval);

        savedReviews[cardId] = {
            nextReviewDate: reviewDate.toISOString(),
            interval: interval
        };

        localStorage.setItem('atlas_reviews', JSON.stringify(savedReviews));
        console.log(`Card ${cardId} scheduled for review in ${interval} days.`);
    }
};
