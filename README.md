# 🗺️ Atlas | رحلة - The Ultimate Self-Learning Guidance Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-sharp)](http://makeapullrequest.com)
[![Platform](https://img.shields.io/badge/platform-flutter%20%7C%20android%20%7C%20ios%20%7C%20web-blue)](https://flutter.dev)

**Atlas** هو تطبيق عالمي ومفتوح المصدر، مصمم ليكون المرشد الشخصي الشامل لكل متعلم ذاتي. الهدف الأساسي من التطبيق ليس مجرد عرض كورسات، بل بناء **رحلة تعلم كاملة من الصفر حتى الاحتراف** في أي مجال معرفي، مع توفير بيئة متكاملة تمنع التشتت تماماً وتضمن الالتزام.

---

## 📌 الفكرة الأساسية ومسار المستخدم (User Flow)

1. **الاستبيان الذكي (Onboarding):** عند فتح التطبيق لأول مرة، يحدد المستخدم (العمر، الحالة، الساعات المتاحة، المستوى، الهدف المهني، أسلوب التعلم المفضل).
2. **توليد الخطة الديناميكية:** يقوم النظام بجدولة الخريطة الزمنية تلقائياً وتوزيع المحتوى بناءً على مدخلات المستخدم.
3. **الخريطة التفاعلية (Interactive Roadmap):** تظهر للمستخدم خريطة شجرية (Graph) للمجال تحتوي على مراحل متسلسلة.
4. **المتابعة والالتزام:** نظام ذكي يعيد ترتيب الخطة تلقائياً في حال عدم الالتزام، مع دعم كامل للعمل بدون إنترنت (Offline Mode).

---

## ✨ المميزات الرئيسية (Core Features)

### 📊 هيكلية المحتوى المعرفي (Inside Each Domain)
* **دليل المجال الكامل:** تعريف شامل، متوسط الرواتب، صعوبة المجال، الأخطاء الشائعة، والوقت المتوقع للاحتراف.
* **الحزمة التعليمية لكل مرحلة:**
  * شرح مكتوب ورسوم توضيحية.
  * فيديوهات مقتناة بعناية (YouTube Backend API).
  * كتب وملفات PDF.
  * مشاريع عملية، تمارين، واختبارات تقييمية.
  * مراجعات، ملخصات، وبطاقات تعليمية (Flashcards).

### 🎮 آليات التحفيز والألعاب (Gamification System)
* **نظام المستويات:** التدرج عبر 6 مستويات من المبتدئ وحتى الخبير المتمرس (Beginner ➡️ Master).
* **نقاط الخبرة والمكافآت:** كسب الـ XP، العملات الرقمية (Coins)، الشارات (Badges)، ولوحات الصدارة (Leaderboards).
* **نظام الإنجازات:** مكافآت عند إتمام (أول ساعة، أول مشروع، أسبوع متواصل، 100/500/1000 ساعة).

### 💼 بيئة التوظيف والعمل (Career Hub)
* **المحاكاة والرسوم التوضيحية:** (Learning Graph) لمكانك الحالي، و(Career Graph) للوظائف المؤهل لها.
* **البورتفوليو التلقائي:** إضافة كل مشروع ينهيه المستخدم تلقائياً إلى معرض أعماله مع إمكانية التصدير كـ PDF أو موقع.
* **السيرة الذاتية الذكية:** مولد CV ديناميكي يتغير تلقائياً بحسب المجال والمستوى المنجز.
* **محاكي مقابلات العمل:** أسئلة تقييمية مبرمجة مسبقاً لكل مستوى لمحاكاة المقابلات الحقيقية وعرض ملاحظات الإصلاح.

### 🧠 أدوات الدراسة والالتزام (Study Tools & Consistency)
* **التكرار المتباعد (Spaced Repetition):** خوارزمية مجدولة لمراجعة المعلومات الصعبة قبل نسيانها.
* **الخرائط الذهنية والـ Timeline:** تصور بصري شامل لكل موضوع.
* **النظام العلاجي الاستباقي:** نظام يكتشف نقاط الضعف برمجياً (عند تكرار الخطأ في اختبار معين) ويعيد جدولة مراجعة مكثفة لها.

---

## 🛠️ البنية البرمجية المقترحة (Tech Stack)

* **Frontend:** Flutter (Dart) - لضمان واجهات سريعة جداً، Animations احترافية، وتجربة استخدام عالمية موحدة على (Android, iOS, Web).
* **Local Database:** Isar Database / Hive - لتخزين فائق السرعة للبيانات المحلية، مراجعات البطاقات والـ Offline Mode.
* **Backend & Realtime:** Supabase (PostgreSQL) - لإدارة الحسابات، لوحات الصدارة، المزامنة السحابية الفورية، والمجتمعات التفاعلية.
* **State Management:** Bloc / Riverpod.

---

## 📂 هيكل المجلدات والملفات (Project Architecture)

المشروع يتبع نمط الهندسة النظيفة (**Clean Architecture**) لضمان مرونة إضافة أي مجال جديد من خلال قاعدة البيانات دون تعديل كود التطبيق الأساسي:

```text
lib/
├── core/                  # Shared components, themes, routing, and utils (Spaced Repetition logic)
├── data/                  # Data Layer: Repository implementations, Local (Isar) & Remote (Supabase) datasources
├── domain/                # Domain Layer: Plain business entities (User, RoadmapNode, DomainModel) and use cases
└── presentation/          # UI Layer: Feature-first structure
    ├── screens/
    │   ├── onboarding/    # Setup questionnaire screens
    │   ├── roadmap/       # Dynamic Learning & Career Graph UI
    │   ├── dashboard/     # Daily tracking, analytics, and stats
    │   ├── profile_cv/    # Portfolio & automated CV generator
    │   └── community/     # Discussion spaces for each domain
    └── widgets/           # Highly reusable UI components & animations

