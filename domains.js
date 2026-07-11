// domains.js - المستودع المعرفي والأكاديمي الشامل والعميق لمنصة Atlas
const ATLAS_DOMAINS = {
    computer_science: {
        id: "cs_core_2026",
        titleAr: "البكالوريوس المكثف في علوم الحاسب"،
        titleEn: "Computer Science & Systems Engineering",
        description: "مسار أكاديمي معمق يغطي البنية التحتية للحوسبة، هندسة البرمجيات، ونظم التشغيل من الترانزستور إلى السحاب.",
        roadmap: [
            {
                id: "cs_node_1",
                stepNumber: 1,
                title: "1️⃣ معمارية العتاد والتحكم عبر Linux CLI",
                level: "Beginner",
                writtenExplanation: "فهم البوابات المنطقية (AND, OR, NOT)، وكيفية تحويل الترانزستورات إلى وحدة معالجة مركزية (CPU) تدير مسجلات (Registers) ومؤشر البرنامج (Program Counter). يتبع ذلك الانتقال لنظام التشغيل Linux وفهم معمارية الملفات (POSIX Standard) والتحكم الكامل في النواة عبر الـ Shell Bash.",
                videos: [
                    { title: "Harvard CS50 - Lecture 0: Computational Thinking & Binary", url: "https://www.youtube.com/watch?v=zZ8ZpP_gOzo" },
                    { title: "The Linux Command Line - Crash Course for Systems Engineers", url: "https://www.youtube.com/watch?v=oxuRxtrO2Ag" }
                ],
                project: { 
                    title: "بناء بيئة عمل مؤتمتة (Automated Environment Dev Setup): كتابة سكربت Bash مبرمج (Bash Script) يقوم تلقائياً بفحص تحديثات النظام، وتثبيت حزمة برمجية معينة، وإنشاء هيكل مجلدات محمي بصلاحيات مستخدمين مخصصة (chmod/chown) دون أي تدخل بشري.", 
                    evaluationCriteria: "خلو السكربت من الأخطاء المنطقية، والتعامل السليم مع المتغيرات البيئية وصلاحيات الأمان بنسبة 100%." 
                },
                flashcards: [
                    { question: "ما هو الفرق الجوهري بين حزمة الـ Kernel وحزمة الـ Shell في نظام التشغيل؟", answer: "الـ Kernel هي النواة المسؤولة مباشرة عن إدارة العتاد والذاكرة، بينما الـ Shell هي الواجهة النصية أو البرمجية التي تترجم أوامر المستخدم وتمررها للنواة." },
                    { question: "ماذا يعني الرمز الصلاحي 'chmod 755' على ملف في نظام Linux؟", answer: "يعني إعطاء المالك صلاحية كاملة (قراءة، كتابة، تنفيذ = 7)، وإعطاء المجموعة والمستخدمين الآخرين صلاحية القراءة والتنفيذ فقط (5)." }
                ],
                quizzes: [
                    { 
                        question: "أي من مسجلات المعالج (Processor Registers) مسؤولة عن تخزين عنوان الذاكرة الخاص بالتعليمية البرمجية القادمة المراد تنفيذها؟", 
                        options: ["Accumulator (AC)", "Instruction Register (IR)", "Program Counter (PC)", "Stack Pointer (SP)"], 
                        correctIndex: 2 
                    }
                ]
            },
            {
                id: "cs_node_2",
                stepNumber: 2,
                title: "2️⃣ التفكير المنطقي وتحليل كفاءة الخوارزميات",
                level: "Beginner",
                writtenExplanation: "دراسة كيفية حل المشكلات المعقدة رياضياً. التركيز هنا على خوارزميات الفرز والبحث (Binary Search, Quick Sort, Merge Sort) وتحليل الأداء المعماري لها في أسوأ وأفضل الحالات باستخدام تدوين الـ Big O Notation (مساحةً وزماناً) لفهم متى ينهار التطبيق تحت ضغط البيانات الضخمة.",
                videos: [
                    { title: "Algorithms & Time Complexity (Big O Notation) Deep Dive", url: "https://www.youtube.com/watch?v=V6mKVRU1evA" },
                    { title: "MIT 6.006 - Introduction to Algorithms: Divide and Conquer", url: "https://www.youtube.com/watch?v=Tl90d_NffCw" }
                ],
                project: { 
                    title: "مقارنة الأداء الحركي (Performance Benchmarking): كتابة خوارزميتين للبحث (Linear vs Binary Search) وتمرير مصفوفة تحتوي على مليون عنصر عشوائي لهما، وحساب الوقت الفعلي المستغرق في التنفيذ بالملي ثانية ورسم بياني توضيحي للمقارنة.", 
                    evaluationCriteria: "إثبات الفارق الزمني الشاسع برمجياً وتوضيح كيف تعمل الـ Divide & Conquer في تقليص المجهود الحوسبي من O(n) إلى O(log n)." 
                },
                flashcards: [
                    { question: "ما هي كفاءة خوارزمية فرز الدمج (Merge Sort) في أسوأ الحالات (Worst-case Time Complexity)؟", answer: "كفاءتها هي O(n log n)، لأنها تقسم المصفوفة دائماً إلى نصفين وتدمجهما بشكل خطي في كل خطوة." }
                ],
                quizzes: [
                    { 
                        question: "إذا كانت الخوارزمية تأخذ وقتاً ثابتاً لا يتأثر نهائياً بحجم المدخلات (حتى لو كانت مليار عنصر)، فما هو الـ Big O الخاص بها؟", 
                        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], 
                        correctIndex: 2 
                    }
                ]
            },
            {
                id: "cs_node_3",
                stepNumber: 3,
                title: "3️⃣ إدارة الذاكرة الصلبة وتراكيب البيانات (Data Structures)",
                level: "Intermediate",
                writtenExplanation: "الانتقال للتطبيق البرمجي الخالي من الأطر الجاهزة باستخدام لغة C++ أو C. دراسة كيفية عمل المؤشرات (Pointers) وتخصيص الذاكرة العشوائية ديناميكياً (Dynamic Memory Allocation via malloc/new). بناء هياكل البيانات المتقدمة يدوياً مثل القوائم المترابطة (Linked Lists)، الأشجار الثنائية المتوازنة (AVL Trees)، والجداول الهاشية (Hash Tables) لمعالجة مشكلة التصادم (Collisions).",
                videos: [
                    { title: "Pointers and Memory Management inside RAM", url: "https://www.youtube.com/watch?v=zuegQmMdy8M" },
                    { title: "Data Structures - Trees and Graphs Implementation", url: "https://www.youtube.com/watch?v=4r_57WLMEIs" }
                ],
                project: { 
                    title: "بناء محرك تخزين بيانات مخصص (Custom Storage Engine): برمجة جدول هاش (Hash Table) من الصفر بدون استخدام مكتبات جاهزة، مع كتابة خوارزمية Chaining مخصصة لحل مشكلة تطابق مفاتيح الهاش (Collision Resolution).", 
                    evaluationCriteria: "نجاح البرنامج في تخزين واسترجاع البيانات بكفاءة زمنية O(1) والتحكم الكامل في مؤشرات الذاكرة دون حدوث تسريب للذاكرة (Memory Leak)." 
                },
                flashcards: [
                    { question: "ما هو الفرق في الذاكرة بين الـ Stack والـ Heap؟", answer: "الـ Stack تُخزن فيه المتغيرات المحلية تلقائياً وهو سريع جداً ويعتمد ترتيب المناداة، بينما الـ Heap هو مساحة الذاكرة الحرة الكبيرة التي يحجز فيها المبرمج يدوياً ويتحكم بعمر البيانات داخلها." }
                ],
                quizzes: [
                    { 
                        question: "ما هي المشكلة البرمجية التي تحدث عند حجز مساحة في الـ Heap عبر المؤشرات، ثم إنهاء البرنامج أو دالته دون عمل free أو delete للمؤشر؟", 
                        options: ["Stack Overflow", "Memory Leak", "Segmentation Fault", "Null Pointer Exception"], 
                        correctIndex: 1 
                    }
                ]
            },
            {
                id: "cs_node_4",
                stepNumber: 4,
                title: "4️⃣ هندسة أنظمة التشغيل (OS Architecture)",
                level: "Advanced",
                writtenExplanation: "كشف الغطاء عن السحر الداخلي للكمبيوتر. دراسة العمليات والمشاعب (Processes & Threads)، وجدولة المعالج (CPU Scheduling)، ومشاكل التزامن الحرج (Race Conditions) وكيفية قفلها باستخدام الـ Mutex والـ Semaphores، بالإضافة إلى إدارة الذاكرة الافتراضية (Virtual Memory) والـ Paging.",
                videos: [
                    { title: "Introduction to Operating Systems (Processes & Threads)", url: "https://www.youtube.com/watch?v=vBURTt97EkA" },
                    { title: "What is a Deadlock and how to prevent it?", url: "https://www.youtube.com/watch?v=rK9V8b7Sg24" }
                ],
                project: { 
                    title: "محاكاة جدولة المعالج (CPU Scheduler Simulation): كتابة برنامج يحاكي عمل نظام تشغيل يقوم بجدولة عدة عمليات قادمة بناءً على خوارزميات (Round Robin) وخوارزمية (Shortest Job First)، وحساب متوسط وقت الانتظار (Average Waiting Time) لكل عملية.", 
                    evaluationCriteria: "المحاكاة الرياضية الدقيقة للوقت والتبديل الصحيح للسياق (Context Switching) بدون حدوث جمود أو مجاعة للعمليات (Starvation)." 
                },
                flashcards: [
                    { question: "ما هو الجمود (Deadlock) في أنظمة التشغيل؟", answer: "حالة تحدث عندما تتوقف عمليتان أو أكثر عن التنفيذ تماماً، لأن كل عملية تنتظر مصدراً محجوزاً من قبل العملية الأخرى، مما يدخل النظام في حلقة انتظار لا تنتهي." }
                ],
                quizzes: [
                    { 
                        question: "أي خوارزمية جدولة تمنح كل عملية فترة زمنية ثابتة وصغيرة جداً من وقت المعالج (Time Quantum) ثم تنتقل للعملية التالية بالترتيب؟", 
                        options: ["First-Come, First-Served", "Shortest Job First", "Round Robin", "Priority Scheduling"], 
                        correctIndex: 2 
                    }
                ]
            }
        ]
    },

    cyber_security: {
        id: "cyber_sec_2026",
        titleAr: "هندسة الأمن السيبراني واختبار الاختراق المتقدم",
        titleEn: "Cyber Security & Offensive Hacking",
        description: "مسار هجومي ودفاعي صلب لإتقان كشف الثغرات، تتبع الاختراقات، وتأمين البنية التحتية للمؤسسات الكبرى.",
        roadmap: [
            {
                id: "cyber_node_1",
                stepNumber: 1,
                title: "1️⃣ حزم الشبكات العميقة وتحليل حركة البيانات",
                level: "Beginner",
                writtenExplanation: "الغوص في بروتوكولات حزمة TCP/IP بالكامل. فهم عملية المصافحة الثلاثية (TCP 3-Way Handshake)، والفرق بين بروتوكولات الاتصال الموثوق وغير الموثوق (TCP vs UDP)، وفهم كيفية عمل طبقات الشبكة وعناوين الـ MAC والـ IP والتوجيه (Routing).",
                videos: [
                    { title: "TCP/IP Protocol Suite and the 3-Way Handshake Explained", url: "https://www.youtube.com/watch?v=3b_T9sh7k3Y" }
                ],
                project: { 
                    title: "التنصت وتحليل الشبكة (Network Packet Analysis): تشغيل أداة Wireshark في بيئة معملية معزولة، والتقاط حزم البيانات المارة، وعزل حركة بيانات بروتوكول HTTP لاستخراج كلمات مرور غير مشفرة تمر في الشبكة، ثم كتابة تقرير سد الثغرة وتحويل الاتصال لـ HTTPS.", 
                    evaluationCriteria: "القدرة على كتابة الفلاتر المتقدمة (Display Filters) في Wireshark، واستخراج حزم الـ Syn و Ack بدقة وفهم مسار الاختراق." 
                },
                flashcards: [
                    { question: "ما هي عملية الـ TCP 3-Way Handshake بالتفصيل؟", answer: "هي عملية إنشاء اتصال موثوق بين العميل والسيرفر وتتم عبر 3 خطوات: 1. يرسل العميل حزمة SYN، 2. يرد السيرفر بحزمة SYN-ACK، 3. يؤكد العميل الاتصال بحزمة ACK." }
                ],
                quizzes: [
                    { 
                        question: "أي من البروتوكولات التالية يعمل في طبقة التطبيقات (Application Layer) ويقوم بنقل ملفات المواقع بشكل مشفر باستخدام الشهادات الرقمية؟", 
                        options: ["HTTP", "FTP", "HTTPS", "DNS"], 
                        correctIndex: 2 
                    }
                ]
            },
            {
                id: "cyber_node_2",
                stepNumber: 2,
                title: "2️⃣ حقن التطبيقات وثغرات الويب الهدامة",
                level: "Intermediate",
                writtenExplanation: "دراسة كيفية اختراق تطبيقات الويب عملياً عبر ثغرات تصنيف OWASP Top 10 العالمي. التركيز على آلية ثغرة حقن أوامر قواعد البيانات (SQL Injection) التي تسمح للمخترق بقراءة وتعديل قاعدة البيانات بالكامل عبر استغلال خطأ المطور في دمج المدخلات مباشرة في الاستعلام الاستدلالي.",
                videos: [
                    { title: "OWASP Top 10 - SQL Injection Attacks Explained Step-by-Step", url: "https://www.youtube.com/watch?v=2nXoxM688Y0" }
                ],
                project: { 
                    title: "اختراق وتأمين معمل ويب (Web Penetration Lab): الدخول إلى بيئة موقع مصاب عمداً (مثل DVWA)، وتنفيذ هجوم SQL Injection يدوي لاستخراج جدول اليوزرات وهاشات كلمات المرور وفك تشفيرها، ثم كتابة كود ترقيع الثغرة باستخدام الـ Prepared Statements في لغة البرمجة لحماية السيرفر نهائياً.", 
                    evaluationCriteria: "الوصول لبيانات الأدمن بنجاح وإثبات قفل الثغرة تماماً بالكود المعدل بحيث لا تقبل أي حقن خبيث." 
                },
                flashcards: [
                    { question: "كيف تحمي الكود تماماً من خطر ثغرات الـ SQL Injection؟", answer: "باستخدام الاستعلامات المجهزة مسبقاً (Prepared Statements / Parameterized Queries) والتي تفصل تماماً بين نص الاستعلام البرمجي الثابت وبين مدخلات المستخدم، فتعاملها الذاكرة كبيانات مجردة وليس كأوامر قابلة للتنفيذ." }
                ],
                quizzes: [
                    { 
                        question: "ماذا يطلق على ثغرة الويب التي تسمح للمخترق بحقن أكواد خبيثة من لغة JavaScript داخل صفحات الموقع لكي تنفذ تلقائياً في متصفحات الزوار الآخرين؟", 
                        options: ["SQL Injection", "Cross-Site Scripting (XSS)", "CSRF", "Broken Authentication"], 
                        correctIndex: 1 
                    }
                ]
            }
        ]
    }
};
