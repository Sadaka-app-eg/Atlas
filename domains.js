// domains.js - المستودع المعرفي والمادة العلمية الشاملة لتطبيق Atlas

const ATLAS_DOMAINS = {
    computer_science: {
        id: "cs_01",
        titleAr: "علوم الحاسب (المسار الشامل)",
        titleEn: "Computer Science",
        description: "فهم المبادئ العلمية والعملية التي تقوم عليها أنظمة الحوسبة والبرمجيات من الصفر.",
        roadmap: [
            {
                id: "cs_node_1",
                stepNumber: 1,
                title: "1️⃣ عتاد الحاسوب والـ CLI بنظام Linux",
                level: "Beginner",
                writtenExplanation: "فهم كيف يتعامل المعالج (CPU) والذاكرة (RAM) مع البيانات، وكيفية التحكم الكامل في نظام التشغيل عبر سطر الأوامر (Command Line) باستخدام Linux.",
                videos: [
                    { title: "كيف يعمل المعالج والذاكرة داخلياً؟", url: "https://www.youtube.com/watch?v=example_cs1" },
                    { title: "أوامر Linux الأساسية للمبتدئين", url: "https://www.youtube.com/watch?v=example_cs2" }
                ],
                project: { 
                    title: "تثبيت نظام Ubuntu وهمي وإنشاء شجرة مجلدات برمجية كاملة وحذفها وإدارتها عبر التيرمينال فقط.", 
                    evaluationCriteria: "تنفيذ المهام دون استخدام الواجهة الرسومية (GUI)." 
                },
                flashcards: [
                    { question: "ما هو التيرمينال (Terminal)؟", answer: "واجهة نصية تسمح لك بإصدار أوامر مباشرة لنظام التشغيل." },
                    { question: "ما الفرق بين RAM و HDD/SSD؟", answer: "الـ RAM ذاكرة مؤقتة فائقة السرعة، بينما الهاردوير لتخزين البيانات الدائم." }
                ],
                quizzes: [
                    { 
                        question: "أي أمر في Linux يُستخدم لعرض المجلد الحالي (Print Working Directory)؟", 
                        options: ["ls", "cd", "pwd", "mkdir"], 
                        correctIndex: 2 
                    }
                ]
            },
            {
                id: "cs_node_2",
                stepNumber: 2,
                title: "2️⃣ التفكير المنطقي وبناء الخوارزميات (Algorithms)",
                level: "Beginner",
                writtenExplanation: "الخوارزمية هي تسلسل منطقي ورياضي لحل مشكلة معينة بكفاءة. هنا ستتعلم كيف تفكر مثل المبرمجين وتزن كفاءة الحلول عبر الـ Big O Notation.",
                videos: [
                    { title: "مقدمة في التفكير الخوارزمي", url: "https://www.youtube.com/watch?v=example_cs3" },
                    { title: "شرح كفاءة الخوارزميات (Big O)", url: "https://www.youtube.com/watch?v=example_cs4" }
                ],
                project: { 
                    title: "كتابة مخطط تدفقي (Flowchart) متكامل لخوارزمية تقوم بفرز وترتيب أرقام عشوائية بصورة منطقية.", 
                    evaluationCriteria: "تغطية كافة الاحتمالات والشروط المنطقية للحل." 
                },
                flashcards: [
                    { question: "ماذا تعني كفاءة الخوارزمية زمنياً (Time Complexity)؟", answer: "مقياس رياضي يوضح كيف يزداد وقت التنفيذ مع زيادة حجم البيانات المدخلة." }
                ],
                quizzes: [
                    { 
                        question: "ما هي الطريقة الأسرع للبحث في قائمة مرتبة؟", 
                        options: ["Linear Search", "Binary Search", "Bubble Sort"], 
                        correctIndex: 1 
                    }
                ]
            },
            {
                id: "cs_node_3",
                stepNumber: 3,
                title: "3️⃣ أساسيات البرمجة وتراكيب البيانات (Data Structures)",
                level: "Intermediate",
                writtenExplanation: "الانتقال للتطبيق البرمجي الفعلي (باستخدام Python أو C++) وفهم كيف نخزن البيانات في الذاكرة باستخدام المصفوفات، الـ Stacks، والـ Queues.",
                videos: [
                    { title: "المتغيرات والدوال وحلقات التكرار", url: "https://www.youtube.com/watch?v=example_cs5" },
                    { title: "شرح الـ Stack والـ Queue ببساطة", url: "https://www.youtube.com/watch?v=example_cs6" }
                ],
                project: { 
                    title: "بناء برنامج لإدارة قائمة المهام اليومية (To-Do List) يعتمد على تراكيب البيانات لإضافة وحذف المهام وتحديثها.", 
                    evaluationCriteria: "خلو الكود من الأخطاء والتعامل السليم مع الذاكرة." 
                },
                flashcards: [
                    { question: "ما هو مبدأ عمل الـ Stack؟", answer: "يعتمد على مبدأ LIFO (Last In, First Out) - الأخير دخولاً هو الأول خروجاً." }
                ],
                quizzes: [
                    { 
                        question: "أي تركيب بيانات يتبع مبدأ (الأول دخولاً هو الأول خروجاً - FIFO)؟", 
                        options: ["Stack", "Queue", "Tree"], 
                        correctIndex: 1 
                    }
                ]
            },
            {
                id: "cs_node_4",
                stepNumber: 4,
                title: "4️⃣ قواعد البيانات وأنظمة الـ SQL",
                level: "Advanced",
                writtenExplanation: "تعلم كيف تُخزن البيانات الضخمة للمواقع والتطبيقات بشكل دائم داخل جداول مترابطة وكيفية استعلامها وتعديلها بكفاءة وأمان.",
                videos: [
                    { title: "تصميم قواعد البيانات (ERD)", url: "https://www.youtube.com/watch?v=example_cs7" },
                    { title: "تعلم لغة الاستعلام SQL في فيديو واحد", url: "https://www.youtube.com/watch?v=example_cs8" }
                ],
                project: { 
                    title: "تصميم قاعدة بيانات لمتجر إلكتروني وإنشاء استعلامات SQL لجلب المنتجات الأكثر مبيعاً.", 
                    evaluationCriteria: "الربط الصحيح بين الجداول (Primary & Foreign Keys)." 
                },
                flashcards: [
                    { question: "ما هو المفتاح الأساسي (Primary Key)؟", answer: "حقل فريد يميز كل سجل داخل الجدول ولا يمكن تكراره." }
                ],
                quizzes: [
                    { 
                        question: "أي أمر SQL يُستخدم لجلب وتصفية البيانات من الجدول؟", 
                        options: ["INSERT", "UPDATE", "SELECT", "DELETE"], 
                        correctIndex: 2 
                    }
                ]
            }
        ]
    },

    cyber_security: {
        id: "cyber_02",
        titleAr: "الأمن السيبراني واختبار الاختراق",
        titleEn: "Cyber Security",
        description: "تعلم حماية الأنظمة واكتشاف الثغرات الأمنية بأسلوب أخلاقي واحترافي.",
        roadmap: [
            {
                id: "cyber_node_1",
                stepNumber: 1,
                title: "1️⃣ أساسيات الشبكات والبروتوكولات (Networking)",
                level: "Beginner",
                writtenExplanation: "لا يمكنك حماية ما لا تفهم كيف يتصل! في هذه المرحلة ستدرس بروتوكولات الإنترنت وعناوين الـ IP وكيف تنتقل حزم البيانات.",
                videos: [
                    { title: "كيف تعمل شبكة الإنترنت؟ نموذج OSI", url: "https://youtube.com" }
                ],
                project: { title: "تحليل حزم البيانات المارة بالشبكة باستخدام أداة Wireshark وفك شفرتها.", evaluationCriteria: "القدرة على تصفية البروتوكولات النظيفة." },
                flashcards: [{ question: "ما هو بروتوكول DHCP؟", answer: "بروتوكول مسؤول عن توزيع عناوين الـ IP تلقائياً على الأجهزة بالشبكة." }],
                quizzes: [{ question: "ما هو المنفذ الافتراضي (Port) لبروتوكول تصفح المواقع الآمن HTTPS؟", options: ["80", "21", "443"], correctIndex: 2 }]
            },
            {
                id: "cyber_node_2",
                stepNumber: 2,
                title: "2️⃣ ثغرات الويب والتطبيقات (OWASP Top 10)",
                level: "Intermediate",
                writtenExplanation: "دراسة أشهر 10 ثغرات أمنية تصيب المواقع الإلكترونية مثل حقن قواعد البيانات (SQL Injection) وثغرات الـ XSS اللعينة وكيفية ترقيعها.",
                videos: [{ title: "شرح ثغرة SQL Injection عملياً", url: "https://youtube.com" }],
                project: { title: "اختراق معمل ويب وهمي مصاب واستخراج بيانات الأدمن بشكل أخلاقي.", evaluationCriteria: "الوصول للملف السري بنجاح." },
                flashcards: [{ question: "ما هي ثغرة XSS؟", answer: "حقن أكواد خبيثة (غالباً JavaScript) في متصفح مستخدم آخر عبر موقع مصاب." }],
                quizzes: [{ question: "لحماية المواقع من ثغرات الحقن، ماذا يجب على المطور فعله؟", options: ["تشفير الألوان", "فحص وتنقية مدخلات المستخدم (Input Validation)"], correctIndex: 1 }]
            }
        ]
    },

    entrepreneurship: {
        id: "biz_03",
        titleAr: "ريادة الأعمال وإنشاء المشاريع",
        titleEn: "Entrepreneurship",
        description: "تحويل الأفكار الناشئة إلى مشاريع حقيقية ومربحة في سوق العمل المنافس.",
        roadmap: [
            {
                id: "biz_node_1",
                stepNumber: 1,
                title: "1️⃣ دراسة السوق ونموذج العمل التجاري",
                level: "Beginner",
                writtenExplanation: "صياغة فكرتك التجارية واختبارها في السوق الحقيقي وتصميم مخطط نموذج العمل التجاري (Business Model Canvas).",
                videos: [{ title: "كيف تصمم مخطط نموذج العمل التجاري؟", url: "https://youtube.com" }],
                project: { title: "إعداد مخطط عمل تجاري كامل لفكرة تطبيق جوال وحساب القيمة المقترحة للعميل.", evaluationCriteria: "وضوح قنوات الإيرادات وتحديد الشريحة المستهدفة." },
                flashcards: [{ question: "ما هو الـ MVP؟", answer: "المنتج الحد الأدنى الأولي (Minimum Viable Product) لاختبار السوق بأقل تكلفة." }],
                quizzes: [{ question: "ما هي أول خطوة قبل إطلاق أي منتج؟", options: ["شراء مكتب فخم", "دراسة حاجة السوق والجمهور المستهدف"], correctIndex: 1 }]
            }
        ]
    },

    quran_sciences: {
        id: "quran_04",
        titleAr: "العلوم الشرعية وحفظ القرآن والتجويد",
        titleEn: "Quran & Tajweed Sciences",
        description: "ضبط التلاوة الصحيحة، ودراسة أحكام التجويد، مع بناء خطة مخصصة للحفظ والمراجعة الدورية.",
        roadmap: [
            {
                id: "quran_node_1",
                stepNumber: 1,
                title: "1️⃣ أحكام النون الساكنة والتنوين",
                level: "Beginner",
                writtenExplanation: "دراسة الأحكام الأربعة الأساسية لقراءة القرآن بشكل صحيح ومجود: الإظهار، الإدغام، الإقلاب، والإخفاء.",
                videos: [{ title: "شرح أحكام النون الساكنة والتنوين بالتفصيل والـأمثلة", url: "https://youtube.com" }],
                project: { title: "استخراج 10 أمثلة للإدغام بغنة وبدون غنة من جزء عم وتلاوتها بصوتك.", evaluationCriteria: "النطق الصحيح لزمن الغنة ومخرج الحرف." },
                flashcards: [{ question: "ما هي حروف الإظهار الحلقي؟", answer: "ستة أحرف: الهمزة، الهاء، العين، الحاء، الغين، الخاء." }],
                quizzes: [{ question: "ما حكم النون الساكنة في كلمة (مَنْ يَقُولُ)؟", options: ["إظهار", "إدغام بغنة", "إقلاب"], correctIndex: 1 }]
            }
        ]
    }
};
