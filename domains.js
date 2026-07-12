// domains.js - الموسوعة التفصيلية الشاملة والعميقة لمسارات هندسة البرمجيات
const ATLAS_DOMAINS = {
    frontend: {
        id: "track_fe",
        titleAr: "هندسة واجهات المستخدم (Front-End Development)",
        titleEn: "Front-End Engineering",
        description: "تحويل التصاميم والأفكار البصرية إلى واجهات تفاعلية حية يراها المستخدم ويتفاعل معها في المتصفح.",
        roadmap: [
            {
                id: "fe_node_1",
                stepNumber: 1,
                title: "1️⃣ هيكل الويب (HTML5 - HyperText Markup Language)",
                level: "Beginner",
                writtenExplanation: "علم النحو والبناء الخاص بالويب. هذه الخطوة هي الحجر الأساسي والعمود الفقري لأي صفحة على الإنترنت. بدونها، لا وجود للموقع أصلاً.",
                whyLearn: "لأنها اللغة الوحيدة القياسية التي تفهمها جميع متصفحات الإنترنت في العالم (Chrome, Safari, Edge) لبناء الهيكل العظمي للموقع وعرض النصوص والملفات.",
                benefit: "تمنحك القدرة الكاملة على هيكلة العناوين، الفقرات، القوائم، وتأمين نماذج إدخال البيانات (Forms). كما أنها لغة الفرز الأساسية التي تعتمد عليها محركات البحث (SEO) لفهم وتصنيف موقعك.",
                alternatives: "لا يوجد لها أي بديل مباشر في الويب؛ فهي الأساس الحتمي والوحيد الذي يُبنى عليه كل شيء لاحقاً.",
                content: "دراسة الـ Semantic Tags (header, article, section)، الـ Forms والـ Validations، وكيفية ربط البيانات الوصفية (Metadata).",
                videos: [{ title: "Harvard CS50 - Web Programming with HTML", url: "https://www.youtube.com" }],
                project: { title: "بناء الهيكل النصي لصفحة تسجيل دخول وموقع تعريفي شامل ومطابق لمعايير الـ SEO", evaluationCriteria: "خلو الهيكل من الأخطاء التنسيقية واستخدام الوسوم الدلالية الصحيحة." },
                flashcards: [{ question: "ما هي الـ Semantic Elements؟", answer: "وسوم برمجية واضحة المعنى للمطور وللمتصفح معاً (مثل <form> و <nav>) وتساعد في أرشفة جوجل للموقع." }],
                quizzes: [{ question: "أي الوسوم التالية يُستخدم لتعريف ترويسة الصفحة أو قطاع معين؟", options: ["<section>", "<header>", "<div>", "<head>"], correctIndex: 1 }]
            },
            {
                id: "fe_node_2",
                stepNumber: 2,
                title: "2️⃣ التنسيق والجمالية البصرية (CSS3 & Tailwind CSS)",
                level: "Beginner",
                writtenExplanation: "لغة الأنماط والتنسيق. الـ HTML تمنحك موقعاً عارياً تماماً، وجاءت CSS لتكون الملابس، الألوان، الحركات، والجمال البصري الشامل للواجهة.",
                whyLearn: "لأن المستخدم لن يتفاعل مع صفحة بيضاء تفتقر للتنسيق والترتيب. التنسيق هو ما يبني الهوية البصرية وتجربة الاستخدام الجاذبة للعملاء.",
                benefit: "تمنحك التحكم المطلق في الألوان، الخطوط، الخلفيات، وتوزيع العناصر هندسياً عبر تقنيات (Flexbox & Grid)، بالإضافة إلى جعل الموقع متجاوباً تلقائياً مع شاشات الهواتف (Responsive Design).",
                alternatives: "يمكن الاعتماد على CSS الخام (Vanilla CSS)، أو الإسراع من الإنتاجية عبر أطر عمل مبهرجة وجاهزة مثل Tailwind CSS أو Bootstrap.",
                content: "دراسة الـ Box Model، الـ Flexbox، الـ CSS Grid، الـ Animations والـ Media Queries التكيفية.",
                videos: [{ title: "Tailwind CSS Full Crash Course for Modern UI", url: "https://www.youtube.com" }],
                project: { title: "تنسيق موقع تعريفي كامل وجعله متجاوباً 100% مع شاشات الجوال باستخدام Tailwind CSS مع إضافة حركات ناعمة (Transitions).", evaluationCriteria: "مرونة الواجهة عند تصغير الشاشة وتناسق الألوان والخطوط." },
                flashcards: [{ question: "ما هو الفرق بين Flexbox و Grid؟", answer: "الـ Flexbox مصمم للتوزيع في اتجاه واحد (صف أو عمود)، بينما الـ Grid مصمم للتوزيع ثنائي الأبعاد (صفوف وأعمدة معاً) للواجهات المعقدة." }],
                quizzes: [{ question: "ما هي الخاصية المستخدمة في الـ Box Model للتحكم في المساحة الداخلية بين النص وحافة العنصر؟", options: ["margin", "border", "padding", "display"], correctIndex: 2 }]
            },
            {
                id: "fe_node_3",
                stepNumber: 3,
                title: "3️⃣ لغة المنطق وتفاعل الواجهات (JavaScript ES6+)",
                level: "Intermediate",
                writtenExplanation: "لغة البرمجة والتفاعل الديناميكي. بعد أن قمنا بالهيكلة والتلوين، تأتي جافا سكربت لتضخ الروح والحياة والحسابات الذكية في أطراف الموقع.",
                whyLearn: "بدون جافا سكربت، سيظل موقعك مجرد لوحة فنية ثابتة لا يمكنها التحدث مع السيرفر أو الاستجابة لبيانات المستخدم بشكل ذكي وفوري.",
                benefit: "تمنحك القدرة على معالجة الأحداث (Events)، والتحكم في عناصر الصفحة (DOM Manipulation)، وإرسال واستقبال البيانات من الخوادم في الخلفية دون الحاجة لإعادة تحميل الصفحة (AJAX / Fetch API).",
                alternatives: "يمكن استخدام TypeScript كبديل متطور يوفر حماية برمجية صارمة وفحصاً للأخطاء أثناء الكتابة وقبل التشغيل الفعلي.",
                content: "دراسة الـ Variables، الـ Functions، الـ DOM API، الـ Promises، والعمليات اللامتزامنة (Async/Await).",
                videos: [{ title: "JavaScript Eloquent - Core Logical Concepts", url: "https://www.youtube.com" }],
                project: { title: "بناء تطبيق لوحة تحكم مالية تسحب أسعار العملات حياً من API خارجي وتحدث الشاشة فوراً مع حفظ التقدم محلياً.", evaluationCriteria: "المعالجة السليمة للبيانات القادمة من الشبكة وخلو الـ Console من الأخطاء المنطقية." },
                flashcards: [{ question: "ما هو الـ DOM في لغة جافا سكربت؟", answer: "هو اختصار لـ Document Object Model، وهو تمثيل شجري لصفحة الويب يتيح لجافا سكربت تعديل الهيكل والتنسيق والمحتوى ديناميكياً." }],
                quizzes: [{ question: "أي دالة تُستخدم لجلب البيانات برمجياً عبر الشبكة (API) بأسلوب الحوافز (Promises) الحديث؟", options: ["XMLHttpRequest()", "fetch()", "JSON.stringify()", "axios.get()"], correctIndex: 1 }]
            }
        ]
    },

    backend: {
        id: "track_be",
        titleAr: "هندسة الأنظمة الخلفية (Back-End Development)",
        titleEn: "Back-End Engineering",
        description: "بناء عقول التطبيقات، السيرفرات، معالجة البيانات المعقدة، الحماية الأمنية، والاتصال المحكم مع قواعد البيانات.",
        roadmap: [
            {
                id: "be_node_1",
                stepNumber: 1,
                title: "1️⃣ بيئة تشغيل السيرفر (Node.js & Express)",
                level: "Intermediate",
                writtenExplanation: "نقل جافا سكربت من المتصفح إلى الحاسوب والخادم. هنا نقوم بإنشاء محرك السيرفر (Server) الذي يستقبل طلبات المستخدمين ويعالج الأوامر المعقدة خلف كواليس الواجهات البصرية.",
                whyLearn: "لأن الواجهة الأمامية لا يمكنها معالجة الحسابات السرية، ولا يمكنها التواصل مع الهاردوير مباشرة؛ السيرفر هو العقل الحقيقي والآمن للتطبيق.",
                benefit: "تمنحك القدرة على بناء قنوات اتصال سريعة جداً (RESTful APIs)، التحكم في الـ Routing للموقع، وإدارة طلبات رفع الملفات وتأمين البيانات المعالجة.",
                alternatives: "يمكن استخدام لغات أخرى مثل Python (مع Django أو FastAPI)، أو لغة PHP (مع إطار العمل الشهير Laravel)، أو لغة Ruby.",
                content: "فهم الـ HTTP Request/Response Cycle، الـ Middleware البرمجية، الـ Status Codes، وإدارة حزم الـ NPM.",
                videos: [{ title: "Node.js & Express - Backend Architectural Patterns", url: "https://www.youtube.com" }],
                project: { title: "بناء سيرفر متكامل لإدارة مستودع منتجات (E-Commerce API) يدعم عمليات جلب، إضافة، تعديل، وحذف البيانات بالكامل.", evaluationCriteria: "التنفيذ الصحيح لكافة الـ Endpoints والرد بالـ HTTP Status Codes المناسبة." },
                flashcards: [{ question: "ما هي الـ Middleware فيExpress؟", answer: "هي دوال برمجية تمتلك صلاحية الوصول لكائن الطلب (Req) والاستجابة (Res) لتقوم بفحص البيانات أو الحماية قبل وصول الطلب للمسار النهائي." }],
                quizzes: [{ question: "ما هو الـ HTTP Status Code القياسي الذي يعبر عن نجاح العملية وإنشاء عنصر جديد في السيرفر (Created)؟", options: ["200", "201", "404", "500"], correctIndex: 1 }]
            },
            {
                id: "be_node_2",
                stepNumber: 2,
                title: "2️⃣ أنظمة قواعد البيانات (PostgreSQL / SQL Databases)",
                level: "Advanced",
                writtenExplanation: "مستودعات الحفظ الدائمة. السيرفر يفقد ذاكرته فور إغلاقه؛ وجاءت قواعد البيانات لتوفر مخازن صلبة وآمنة لحفظ الحسابات والبيانات الحيوية مدى الحياة.",
                whyLearn: "لأنه لا يمكن بناء نظام تسجيل دخول أو متجر أو تطبيق حقيقي بدون مكان آمن ومجدول ومنظم هندسياً لحفظ بيانات المستخدمين واسترجاعها.",
                benefit: "تأمين سرعة معالجة البيانات، والقدرة الفائقة على الاستعلام والربط بين الجداول الضخمة وحمايتها من التلف والضياع عبر لغة SQL القياسية.",
                alternatives: "قواعد البيانات غير 관계ية (NoSQL) مثل MongoDB، أو قواعد البيانات الخفيفة المضمنة مثل SQLite.",
                content: "تصميم الجداول (Schemas)، العلاقات الشجرية (One-to-Many, Many-to-Many)، والمفاتيح الأساسية والفرعية (Primary & Foreign Keys).",
                videos: [{ title: "SQL & Relational Databases Design Theory", url: "https://www.youtube.com" }],
                project: { title: "تصميم وإعداد قاعدة بيانات علائقية كاملة لشبكة اجتماعية تحتوي على جداول المستخدمين، المنشورات، والتعليقات مع ربطها بالسيرفر.", evaluationCriteria: "سلامة العلاقات الهندسية بين الجداول وعدم وجود تكرار عشوائي للداتا (Data Normalization)." },
                flashcards: [{ question: "ما هي وظيفة الـ Foreign Key (المفتاح الأجنبي)؟", answer: "هو حقل في جدول يشير إلى الـ Primary Key في جدول آخر، ويُستخدم برمجياً لبناء العلاقات والترابط بين الجداول لمنع تشتت البيانات." }],
                quizzes: [{ question: "أي أمر SQL يُستخدم لتعديل وتحديث بيانات موجودة مسبقاً داخل جدول؟", options: ["INSERT", "SELECT", "UPDATE", "ALTER"], correctIndex: 2 }]
            }
        ]
    },

    fullstack: {
        id: "track_fs",
        titleAr: "مهندس المسار الشامل (Full-Stack Developer)",
        description: "المهندس الموسوعي والـ Tech Lead الشامل الذي يمتلك القدرة على دمج الواجهات الفخمة بعقول السيرفرات وإخراج منتج عالمي.",
        roadmap: [
            {
                id: "fs_node_1",
                stepNumber: 1,
                title: "1️⃣ التوثيق وحماية الأنظمة المدمجة (JWT Authentication)",
                level: "Master",
                writtenExplanation: "مرحلة الدمج والربط والتحصين الأمني. هنا نربط الواجهة الأمامية بالخلفية ونقوم بتأمين قنوات الاتصال والتحقق من هوية المستخدمين لضمان عدم اختراق السيرفر.",
                whyLearn: "لأن وجود واجهة وسيرفر منفصلين بدون نظام حماية وتوثيق مشفر يعني أن أي شخص يمكنه اختراق قاعدة البيانات وقراءة بيانات المستخدمين وتدمير المنصة.",
                benefit: "تمنحك القدرة على تشفير كلمات المرور (Hashing)، وبناء نظام الـ Tokens الرقمية المشفرة (JWT) التي يحملها المتصفح في كل طلب لإثبات هويته بأمان مطلق.",
                alternatives: "نظام التوثيق عبر الجلسات التقليدية (Session-based Auth)، أو أطر التوظيف الجاهزة الخارجية مثل Firebase Auth أو Supabase Auth.",
                content: "آليات تشفير كلمات المرور بـ Bcrypt، توليد الـ JSON Web Tokens، وحماية مسارات السيرفر (Route Protection).",
                videos: [{ title: "JWT Security and Full-Stack Authentication Architecture", url: "https://www.youtube.com" }],
                project: { title: "بناء نظام تسجيل دخول وتوثيق متكامل وآمن (Login/Register System) يربط واجهة المتصفح بقاعدة البيانات بشكل مشفر كلياً.", evaluationCriteria: "تشفير الباسوردات في قاعدة البيانات، وعدم السماح بالدخول للمسارات الحساسة إلا بوجود Token صالح." },
                flashcards: [{ question: "ما هو الـ JWT ومما يتكون؟", answer: "هو اختصار لـ JSON Web Token، وهي طريقة آمنة لنقل المعلومات بين طرفين وتتكون من ثلاثة أجزاء مشفرة: الرأس (Header)، الحمولة (Payload)، والتوقيع الرقمي السري (Signature)." }],
                quizzes: [{ question: "ما هي الوظيفة الأساسية للمكتبة الشهيرة Bcrypt في بيئة السيرفر؟", options: ["تلوين الأزرار", "تشفير وعمل الحماية والـ Hashing لكلمات المرور", "تسريع قواعد البيانات", "جلب الفيديوهات"], correctIndex: 1 }]
            }
        ]
    }
};
