/**
 * ====================================================================
 * ATLAS ACADEMY - LANGUAGES CURRICULUM & SKILLS DATABASE (2026)
 * المرجع الشامل لمسارات اللغات: الإنجليزية (A1 - C1) والألمانية (A1 - B2)
 * ====================================================================
 */

// 1. محرك النطق الصوتي متعدد اللغات
window.speakPhrase = function(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

// 2. منهج اللغة الألمانية الشامل (Deutsch A1 -> B2)
window.deutschMasterCurriculum = {
  a1: {
    badgeName: "Niveau A1 (المبتدئ التأسيسي)",
    lectures: [
      {
        title: "01. الأبجدية الألمانية والنطق الصوتي وقواعد الحروف (Alphabet & Aussprache)",
        videoUrl: "https://www.youtube.com/watch?v=WP1blVh1Z2Q",
        desc: "مخارج الحروف، الحروف الصوتية المركبة (ei, eu, ie)، والحروف الخاصة (Ä, Ö, Ü, ß).",
        quiz: [
          { question: "كيف يُنطق المقطع الصوتي (ei) في الألمانية؟", options: ["مثل كلمة 'Eye' بالإنجليزية", "مثل حرف الياء الممدودة", "ينطق واو"], correctIndex: 0 }
        ]
      },
      {
        title: "02. الضمائر وتصريف الأفعال الأساسية: sein و haben في الحاضر",
        videoUrl: "https://www.youtube.com/watch?v=dtkwt_aEey8",
        desc: "ضمائر الفاعل وقواعد تصريف أفعال الكينونة والملك وتكوين أول جملة صحيحة.",
        quiz: [
          { question: "اختر التصريف الصحيح: Wir ______ Deutsch.", options: ["lernen", "lernt", "lerne"], correctIndex: 0 }
        ]
      },
      {
        title: "03. أدوات التعريف والتنكير وحالة الرفع (Der, Die, Das & Nominativ)",
        videoUrl: "https://www.youtube.com/watch?v=L9AWrJnhsRI",
        desc: "أدوات المذكر والمؤنث والمحايد، الجمع، وقاعدة النفي بـ Nicht و Kein.",
        quiz: [
          { question: "أداة التعريف الصحيحة لكلمة Buch (كتاب) هي:", options: ["das", "der", "die"], correctIndex: 0 }
        ]
      },
      {
        title: "04. المحادثات اليومية والتعارف وطلب الطعام في المطعم (Sprechen A1)",
        videoUrl: "https://www.youtube.com/watch?v=0lh_UR6pU7w",
        desc: "التحيات، التعريف بالنفس، السؤال عن الاتجاهات، والتعامل في السوبرماركت.",
        quiz: [
          { question: "الرد المناسب عند قول شخص لك 'Wie geht es Ihnen?':", options: ["Gut, danke!", "Ich bin zwanzig", "Auf Wiedersehen"], correctIndex: 0 }
        ]
      }
    ],
    verbs: {
      title: "⚡ الأفعال — Verben",
      description: "أهم الأفعال التأسيسية وتصريفاتها مع الأمثلة.",
      topics: [
        {
          title: "الأفعال الأساسية (Grundverben)",
          items: [
            { en: "sein (bin / bist / ist)", ar: "يكون", ex: "Ich bin Student.", exAr: "أنا طالب." },
            { en: "haben (habe / hast / hat)", ar: "يملك / لديه", ex: "Wir haben ein Auto.", exAr: "لدينا سيارة." },
            { en: "lernen", ar: "يتعلم", ex: "Er lernt Deutsch.", exAr: "هو يتعلم الألمانية." },
            { en: "sprechen", ar: "يتحدث", ex: "Sprechen Sie Arabisch?", exAr: "هل تتحدث العربية؟" },
            { en: "kommen", ar: "يأتي / ينحدر من", ex: "Ich komme aus Ägypten.", exAr: "أنا قادم من مصر." },
            { en: "wohnen", ar: "يسكن / يقيم", ex: "Sie wohnt in Kairo.", exAr: "هي تسكن في القاهرة." },
            { en: "machen", ar: "يفعل / يصنع", ex: "Was machst du heute?", exAr: "ماذا تفعل اليوم؟" },
            { en: "gehen", ar: "يذهب / يمشي", ex: "Ich gehe zur Arbeit.", exAr: "أنا ذاهب إلى العمل." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 الأسماء والمفردات — Nomen",
      description: "المفردات الأساسية وأدوات التعريف الخاصة بها.",
      topics: [
        {
          title: "الأشخاص والعائلة (Personen & Familie)",
          items: [
            { en: "Der Mann", ar: "الرجل" },
            { en: "Die Frau", ar: "المرأة" },
            { en: "Das Kind", ar: "الطفل" },
            { en: "Die Eltern", ar: "الوالدان" },
            { en: "Der Freund", ar: "الصديق" },
            { en: "Die Arbeit", ar: "العمل" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 الجمل والتعابير اليومية — Sätze",
      description: "جمل المحادثة والتحية الشائعة.",
      topics: [
        {
          title: "التعارف والتحية (Begrüßung & Vorstellung)",
          items: [
            { en: "Hallo! Mein Name ist Ahmed.", ar: "مرحباً! اسمي أحمد." },
            { en: "Wie geht es Ihnen?", ar: "كيف حال حضرتك؟" },
            { en: "Ich komme aus Ägypten und wohne in Kairo.", ar: "أنا من مصر وأسكن في القاهرة." },
            { en: "Ich möchte einen Kaffee, bitte.", ar: "أود الحصول على قهوة من فضلك." },
            { en: "Auf Wiedersehen!", ar: "إلى اللقاء / مع السلامة!" }
          ]
        }
      ]
    }
  },
  a2: {
    badgeName: "Niveau A2 (فوق المبتدئ)",
    lectures: [
      { title: "01. حالة النصب والمفعول به (Akkusativ) والضمائر الشخصية", videoUrl: "https://www.youtube.com/watch?v=WP1blVh1Z2Q", desc: "تحول der إلى den وتصريف أدوات النفي والتنكير في المفعول به." },
      { title: "02. الماضي التام (Perfekt) واستخدام haben و sein", videoUrl: "https://www.youtube.com/watch?v=dtkwt_aEey8", desc: "قواعد تصريف اسم المفعول Partizip II وسرد الأحداث اليومية." }
    ],
    verbs: {
      title: "⚡ أفعال المستوى A2",
      description: "أفعال الماضي والحركة.",
      topics: [
        {
          title: "أفعال شائعة (A2 Verben)",
          items: [
            { en: "sehen", ar: "يرى / يشاهد", ex: "Ich habe den Film gesehen.", exAr: "لقد شاهدت الفيلم." },
            { en: "kaufen", ar: "يشتري", ex: "Er kauft ein Ticket.", exAr: "هو يشتري تذكرة." },
            { en: "fahren", ar: "يسافر / يقود", ex: "Wir fahren nach Berlin.", exAr: "نحن مسافرون إلى برلين." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 المفردات والأسماء — Nomen",
      description: "مفردات السفر والأماكن.",
      topics: [
        {
          title: "السفر والمواصلات (Reisen)",
          items: [
            { en: "Der Bahnhof", ar: "محطة القطار" },
            { en: "Das Hotel", ar: "الفندق" },
            { en: "Der Flughafen", ar: "المطار" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 جمل التخاطب اليومي",
      description: "جمل التعامل في الأماكن العامة.",
      topics: [
        {
          title: "السؤال عن الأماكن والاتجاهات",
          items: [
            { en: "Wo ist der Hauptbahnhof?", ar: "أين تقع محطة القطارات المركزية؟" },
            { en: "Wie viel kostet dieses Ticket?", ar: "كم تبلغ تكلفة هذه التذكرة؟" }
          ]
        }
      ]
    }
  },
  b1: {
    badgeName: "Niveau B1 (المتوسط واختبار جوته)",
    lectures: [
      { title: "01. حالة المجرور (Dativ) وحروف الجر المشتركة (Wechselpräpositionen)", videoUrl: "https://www.youtube.com/watch?v=WP1blVh1Z2Q", desc: "الفرق بين السكون والحركة وتغير أدوات التعريف مع Dativ." }
    ],
    verbs: {
      title: "⚡ أفعال المستوى B1",
      description: "أفعال تتطلب Dativ وأفعال مركبة.",
      topics: [
        {
          title: "أفعال متقدمة (B1 Verben)",
          items: [
            { en: "helfen", ar: "يساعد (+ Dativ)", ex: "Ich helfe dir gerne.", exAr: "أساعدك بكل سرور." },
            { en: "gehören", ar: "يخص / ينتمي إلى", ex: "Das Buch gehört mir.", exAr: "الكتاب يخصني." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 مفردات العمل والمراسلات",
      description: "المصطلحات المهنية للمستوى المتوسط.",
      topics: [
        {
          title: "العمل والتقديم (Beruf & Bewerbung)",
          items: [
            { en: "Die Bewerbung", ar: "طلب التقديم للوظيفة" },
            { en: "Der Lebenslauf", ar: "السيرة الذاتية" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 جمل التعبير وإبداء الرأي",
      description: "تراكيب لغوية رسمية.",
      topics: [
        {
          title: "المراسلات ومقابلات العمل",
          items: [
            { en: "Ich habe mich um die Stelle beworben.", ar: "لقد تقدمت بطلب لهذه الوظيفة." }
          ]
        }
      ]
    }
  },
  b2: {
    badgeName: "Niveau B2 (المتقدم والأعمال)",
    lectures: [
      { title: "01. أدوات الربط المتقدمة وقواعد المبني للمجهول (Passiv & Konjunktiv II)", videoUrl: "https://www.youtube.com/watch?v=WP1blVh1Z2Q", desc: "الصياغة الاحترافية للتقارير والأماني والاقتراحات في بيئة العمل الألمانية." }
    ],
    verbs: {
      title: "⚡ أفعال الأعمال والشركات",
      description: "أفعال التفاوض والتنظيم المهني.",
      topics: [
        {
          title: "أفعال التفاوض (B2 Verben)",
          items: [
            { en: "verhandeln", ar: "يتفاوض", ex: "Wir verhandeln über den Vertrag.", exAr: "نحن نتفاوض حول العقد." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 مصطلحات الشركات والعقود",
      description: "مصطلحات الأعمال الرسمية.",
      topics: [
        {
          title: "العقود والشركات (Wirtschaft)",
          items: [
            { en: "Die Vereinbarung", ar: "الاتفاقية / العقد" },
            { en: "Die Verhandlung", ar: "المفاوضة" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 جمل النقاش الاحترافي",
      description: "تراكيب للمناقشات المهنية والتفاوض.",
      topics: [
        {
          title: "التفاوض المؤسسي",
          items: [
            { en: "Wir müssen die Bedingungen genau prüfen.", ar: "علينا فحص الشروط بدقة." }
          ]
        }
      ]
    }
  }
};

// 3. مسار اللغة الإنجليزية الشامل (English A1 -> C1)
window.courseResourcesMaster = {
  a1: {
    badgeName: "Level A1 (Starter & Phonics)",
    verbs: {
      title: "⚡ الأفعال — Verbs",
      description: "تعلم الأفعال الأساسية واستخدمها في جمل حقيقية مع الترجمة والنطق الصوتي.",
      topics: [
        {
          title: "الأفعال الأساسية والشائعة (Essential Core Verbs)",
          items: [
            { en: "be (am / is / are)", ar: "يكون", ex: "I am a student.", exAr: "أنا أكون طالب." },
            { en: "have / has", ar: "يملك / لديه", ex: "She has a laptop.", exAr: "هي لديها لابتوب." },
            { en: "do / does", ar: "يفعل / ينجز", ex: "We do our homework.", exAr: "نحن نقوم بواجبنا." },
            { en: "go", ar: "يذهب", ex: "I go to work by train.", exAr: "أنا أذهب للعمل بالقطار." },
            { en: "come", ar: "يأتي", ex: "Come here quickly.", exAr: "تعال إلى هنا بسرعة." },
            { en: "get", ar: "يحصل على / يستيقظ", ex: "I get up early.", exAr: "أنا أستيقظ مبكراً." },
            { en: "make", ar: "يصنع / يجعل", ex: "She makes breakfast.", exAr: "هي تصنع وجبة الإفطار." },
            { en: "take", ar: "يأخذ", ex: "Take this book.", exAr: "خذ هذا الكتاب معك." },
            { en: "give", ar: "يعطي", ex: "Give me your pen.", exAr: "أعطني قلمك." },
            { en: "see", ar: "يرى / يشاهد", ex: "I see my friend.", exAr: "أنا أرى صديقي." },
            { en: "know", ar: "يعرف / يعلم", ex: "I know the answer.", exAr: "أنا أعرف الإجابة." },
            { en: "think", ar: "يفكر / يعتقد", ex: "I think it is good.", exAr: "أنا أعتقد أنه جيد." },
            { en: "want", ar: "يريد", ex: "I want to learn English.", exAr: "أنا أريد أن أتعلم الإنجليزية." },
            { en: "need", ar: "يحتاج", ex: "I need some help.", exAr: "أنا أحتاج بعض المساعدة." }
          ]
        },
        {
          title: "أفعال الروتين اليومي (Daily Routine Verbs)",
          items: [
            { en: "wake up", ar: "يستيقظ من النوم", ex: "I wake up at seven.", exAr: "أنا أستيقظ في السابعة." },
            { en: "wash", ar: "يغسل", ex: "I wash my face.", exAr: "أنا أغسل وجهي." },
            { en: "brush", ar: "ينظف بالفرشاة", ex: "I brush my teeth.", exAr: "أنا أنظف أسناني بالفرشاة." },
            { en: "eat", ar: "يأكل", ex: "They eat fresh food.", exAr: "هم يأكلون طعاماً طازجاً." },
            { en: "drink", ar: "يشرب", ex: "Drink plenty of water.", exAr: "اشرب الكثير من الماء." },
            { en: "sleep", ar: "ينام", ex: "I sleep eight hours.", exAr: "أنا أنام 8 ساعات." },
            { en: "work", ar: "يعمل", ex: "He works in an office.", exAr: "هو يعمل في مكتب." },
            { en: "study", ar: "يدرس / يذاكر", ex: "We study English daily.", exAr: "نحن ندرس الإنجليزية يومياً." },
            { en: "read", ar: "يقرأ", ex: "Read this short story.", exAr: "اقرأ هذه القصة القصيرة." },
            { en: "write", ar: "يكتب", ex: "Write your full name.", exAr: "اكتب اسمك بالكامل." },
            { en: "watch", ar: "يشاهد", ex: "I watch the lesson.", exAr: "أنا أشاهد الدرس." },
            { en: "listen", ar: "يستمع", ex: "Listen to the teacher.", exAr: "استمع إلى المعلم." },
            { en: "speak", ar: "يتكلم", ex: "He speaks English.", exAr: "هو يتحدث الإنجليزية." },
            { en: "cook", ar: "يطبخ", ex: "She cooks dinner.", exAr: "هي تطبخ العشاء." }
          ]
        },
        {
          title: "أفعال الحركة والتنقل (Movement & Action Verbs)",
          items: [
            { en: "walk", ar: "يمشي", ex: "I walk to school.", exAr: "أنا أمشي إلى المدرسة." },
            { en: "run", ar: "يركض / يجري", ex: "He runs in the morning.", exAr: "هو يجري في الصباح." },
            { en: "drive", ar: "يقود سيارة", ex: "I drive my car.", exAr: "أنا أقود سيارتي." },
            { en: "travel", ar: "يسافر", ex: "They travel every year.", exAr: "هم يسافرون كل عام." },
            { en: "sit", ar: "يجلس", ex: "Sit down on the chair.", exAr: "اجلس على الكرسي." },
            { en: "stand", ar: "يقف", ex: "Stand up please.", exAr: "قف من فضلك." },
            { en: "open", ar: "يفتح", ex: "Open the door.", exAr: "افتح الباب." },
            { en: "close", ar: "يغلق", ex: "Close the window.", exAr: "أغلق النافذة." },
            { en: "stop", ar: "يتوقف", ex: "Stop here please.", exAr: "توقف هنا من فضلك." },
            { en: "start", ar: "يبدأ", ex: "Start the game.", exAr: "ابدأ اللعبة." }
          ]
        },
        {
          title: "أفعال التعامل والتواصل (Social & Communication Verbs)",
          items: [
            { en: "call", ar: "يتصل هاتفياً", ex: "Call me tonight.", exAr: "اتصل بي الليلة." },
            { en: "ask", ar: "يسأل", ex: "Ask the question.", exAr: "اسأل السؤال." },
            { en: "answer", ar: "يجيب", ex: "Answer the phone.", exAr: "رد على الهاتف." },
            { en: "help", ar: "يساعد", ex: "Help your friend.", exAr: "ساعد صديقك." },
            { en: "explain", ar: "يشرح", ex: "Explain this word.", exAr: "اشرح هذه الكلمة." },
            { en: "understand", ar: "يفهم", ex: "I understand now.", exAr: "أنا أفهم الآن." },
            { en: "remember", ar: "يتذكر", ex: "Remember my name.", exAr: "تذكر اسمي." },
            { en: "forget", ar: "ينسى", ex: "Do not forget.", exAr: "لا تنسَ." },
            { en: "buy", ar: "يشتري", ex: "Buy some milk.", exAr: "اشترِ بعض الحليب." },
            { en: "pay", ar: "يدفع", ex: "Pay the bill.", exAr: "ادفع الفاتورة." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 الأسماء — Nouns",
      description: "مفردات ومصطلحات Level A1 مصنفة حسب الميادين الحياتية مع الترجمة.",
      topics: [
        {
          title: "العائلة والأشخاص (Family & People)",
          items: [
            { en: "father", ar: "أب" }, { en: "mother", ar: "أم" }, { en: "parents", ar: "الوالدان" },
            { en: "brother", ar: "أخ" }, { en: "sister", ar: "أخت" }, { en: "son", ar: "ابن" },
            { en: "daughter", ar: "ابنة" }, { en: "child", ar: "طفل" }, { en: "baby", ar: "رضيع" },
            { en: "grandfather", ar: "جد" }, { en: "grandmother", ar: "جدة" }, { en: "uncle", ar: "عم / خال" },
            { en: "aunt", ar: "عمة / خالة" }, { en: "cousin", ar: "ابن العم أو الخال" }, { en: "husband", ar: "زوج" },
            { en: "wife", ar: "زوجة" }, { en: "friend", ar: "صديق" }, { en: "man", ar: "رجل" },
            { en: "woman", ar: "امرأة" }, { en: "boy", ar: "ولد" }, { en: "girl", ar: "بنت" }
          ]
        },
        {
          title: "المنزل والغرف والأثاث (Home & Furniture)",
          items: [
            { en: "house", ar: "منزل" }, { en: "apartment", ar: "شقة" }, { en: "room", ar: "غرفة" },
            { en: "living room", ar: "غرفة الجلوس" }, { en: "bedroom", ar: "غرفة النوم" }, { en: "kitchen", ar: "مطبخ" },
            { en: "bathroom", ar: "حمام" }, { en: "door", ar: "باب" }, { en: "window", ar: "نافذة" },
            { en: "table", ar: "طاولة" }, { en: "chair", ar: "كرسي" }, { en: "bed", ar: "سرير" },
            { en: "sofa", ar: "كنبة" }, { en: "lamp", ar: "مصباح" }
          ]
        },
        {
          title: "الطعام والمشروبات والوجبات (Food, Drinks & Meals)",
          items: [
            { en: "water", ar: "ماء" }, { en: "milk", ar: "حليب" }, { en: "tea", ar: "شاي" },
            { en: "coffee", ar: "قهوة" }, { en: "juice", ar: "عصير" }, { en: "bread", ar: "خبز" },
            { en: "rice", ar: "أرز" }, { en: "cheese", ar: "جبن" }, { en: "egg", ar: "بيضة" },
            { en: "chicken", ar: "دجاج" }, { en: "meat", ar: "لحم" }, { en: "fish", ar: "سمك" },
            { en: "apple", ar: "تفاحة" }, { en: "breakfast", ar: "إفطار" }, { en: "lunch", ar: "غداء" },
            { en: "dinner", ar: "عشاء" }
          ]
        },
        {
          title: "الأماكن والمرافق العامة (Places & Facilities)",
          items: [
            { en: "city", ar: "مدينة" }, { en: "street", ar: "شارع" }, { en: "school", ar: "مدرسة" },
            { en: "university", ar: "جامعة" }, { en: "hospital", ar: "مستشفى" }, { en: "pharmacy", ar: "صيدلية" },
            { en: "bank", ar: "بنك" }, { en: "supermarket", ar: "سوبرماركت" }, { en: "restaurant", ar: "مطعم" },
            { en: "cafe", ar: "مقهى" }, { en: "hotel", ar: "فندق" }, { en: "airport", ar: "مطار" },
            { en: "station", ar: "محطة" }, { en: "office", ar: "مكتب" }
          ]
        }
      ]
    },
    adjectives: {
      title: "🎨 الصفات — Adjectives",
      description: "صفات أساسية لوصف الأشخاص والمشاعر والأشياء مع الأمثلة وترجمتها.",
      topics: [
        {
          title: "صفات الأشخاص (Personal Traits)",
          items: [
            { en: "good", ar: "جيد", ex: "He is a good boy.", exAr: "هو ولد جيد." },
            { en: "bad", ar: "سيء", ex: "This is a bad day.", exAr: "هذا يوم سيء." },
            { en: "nice", ar: "لطيف", ex: "She is very nice.", exAr: "هي لطيفة جداً." },
            { en: "smart", ar: "ذكي", ex: "He is a smart student.", exAr: "هو طالب ذكي." },
            { en: "busy", ar: "مشغول", ex: "I am busy today.", exAr: "أنا مشغول اليوم." }
          ]
        },
        {
          title: "المشاعر والحالات (Feelings & States)",
          items: [
            { en: "happy", ar: "سعيد", ex: "I am happy today.", exAr: "أنا سعيد اليوم." },
            { en: "sad", ar: "حزين", ex: "Why are you sad?", exAr: "لماذا أنت حزين؟" },
            { en: "tired", ar: "متعب", ex: "I feel tired now.", exAr: "أنا أشعر بالتعب الآن." },
            { en: "hungry", ar: "جائع", ex: "I am very hungry.", exAr: "أنا جائع جداً." },
            { en: "thirsty", ar: "عطشان", ex: "I need water, I am thirsty.", exAr: "أحتاج ماء، أنا عطشان." }
          ]
        },
        {
          title: "الأحجام والأوصاف (Size & Description)",
          items: [
            { en: "big", ar: "كبير", ex: "Cairo is a big city.", exAr: "القاهرة مدينة كبيرة." },
            { en: "small", ar: "صغير", ex: "This is a small room.", exAr: "هذه غرفة صغيرة." },
            { en: "hot", ar: "حار / ساخن", ex: "The tea is hot.", exAr: "الشاي ساخن." },
            { en: "cold", ar: "بارد", ex: "The water is cold.", exAr: "الماء بارد." },
            { en: "fast", ar: "سريع", ex: "The car is fast.", exAr: "السيارة سريعة." },
            { en: "easy", ar: "سهل", ex: "English is easy.", exAr: "اللغة الإنجليزية سهلة." }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 الجمل اليومية — Sentences",
      description: "جمل وتراكيب جاهزة تساعدك على التحدث من أول يوم.",
      topics: [
        {
          title: "التحيات والتعارف (Greetings & Social)",
          items: [
            { en: "Hello! Good morning.", ar: "مرحباً! صباح الخير." },
            { en: "How are you today?", ar: "كيف حالك اليوم؟" },
            { en: "I am fine, thank you.", ar: "أنا بخير، شكراً لك." },
            { en: "Nice to meet you.", ar: "سررت بلقائك." },
            { en: "See you tomorrow.", ar: "أراك غداً." }
          ]
        },
        {
          title: "طلب المساعدة (Asking for Help)",
          items: [
            { en: "Can you help me, please?", ar: "هل يمكنك مساعدتي من فضلك؟" },
            { en: "I don't understand.", ar: "أنا لا أفهم." },
            { en: "Please repeat that.", ar: "أعد ذلك من فضلك." },
            { en: "Speak slowly, please.", ar: "تحدث ببطء من فضلك." },
            { en: "What does this word mean?", ar: "ماذا تعني هذه الكلمة؟" }
          ]
        },
        {
          title: "المطعم والتسوق (Dining & Shopping)",
          items: [
            { en: "I would like a cup of tea.", ar: "أود كوباً من الشاي." },
            { en: "Can I have the menu, please?", ar: "هل يمكنني أخذ القائمة من فضلك؟" },
            { en: "How much is this shirt?", ar: "كم سعر هذا القميص؟" },
            { en: "The bill, please.", ar: "الفاتورة من فضلك." }
          ]
        }
      ]
    },
    conversations: {
      title: "🗣️ المحادثات والحوارات الواقعية",
      description: "حوارات قصيرة ومباشرة مترجمة بالكامل للمواقف اليومية.",
      topics: [
        {
          title: "المحادثة 01: التعارف (Meeting Someone)",
          items: [
            { en: "A: Hello! What is your name?", ar: "أ: مرحباً! ما اسمك؟" },
            { en: "B: My name is Ahmed. Nice to meet you.", ar: "ب: اسمي أحمد. سررت بلقائك." },
            { en: "A: Where are you from?", ar: "أ: من أين أنت؟" },
            { en: "B: I am from Egypt.", ar: "ب: أنا من مصر." }
          ]
        },
        {
          title: "المحادثة 02: في المطعم (In The Restaurant)",
          items: [
            { en: "Waiter: Are you ready to order?", ar: "النادل: هل أنت جاهز للطلب؟" },
            { en: "Customer: Yes, I want a chicken sandwich.", ar: "الزبون: نعم، أريد شطيرة دجاج." },
            { en: "Waiter: Anything to drink?", ar: "النادل: أي شيء للشرب؟" },
            { en: "Customer: Water, please.", ar: "الزبون: ماء، من فضلك." }
          ]
        }
      ]
    },
    grammar: {
      title: "🧠 القواعد — Grammar Basics",
      description: "القواعد الأساسية مشروحة بأبسط شكل مع أمثلة مترجمة.",
      topics: [
        {
          title: "فعل الكينونة (Verb to Be)",
          items: [
            { en: "I am -> I am a student.", ar: "أنا أكون طالب." },
            { en: "He / She / It is -> He is happy.", ar: "هو يكون سعيد." },
            { en: "We / They / You are -> They are at home.", ar: "هم يكونون في البيت." }
          ]
        },
        {
          title: "المضارع البسيط (Present Simple)",
          items: [
            { en: "I work every day.", ar: "أنا أعمل كل يوم." },
            { en: "He works every day.", ar: "هو يعمل كل يوم (إضافة s مع المفرد)." },
            { en: "I don't like tea.", ar: "أنا لا أحب الشاي (نفي بـ don't)." }
          ]
        }
      ]
    },
    listening: {
      title: "🎧 الاستماع — Listening Practice",
      description: "تدريبات استماع أساسية وبسيطة.",
      topics: [
        {
          title: "المستوى الأول: الحروف والأرقام",
          items: [
            { en: "Numbers: One, Two, Three, Four, Five.", ar: "الأرقام من 1 إلى 5 بالنطق الصحيح." },
            { en: "Days: Monday, Tuesday, Wednesday.", ar: "أيام الأسبوع مع الاستماع لنطقها." }
          ]
        },
        {
          title: "المستوى الثاني: جمل قصيرة",
          items: [
            { en: "I wake up at seven and eat breakfast.", ar: "استمع للمقطع: أستيقظ في السابعة وأتناول الإفطار." }
          ]
        }
      ]
    },
    writing: {
      title: "✍️ الكتابة — Writing Practice",
      description: "نماذج كتابة مبسطة ومترجمة للتدريب.",
      topics: [
        {
          title: "التعريف بالنفس (Self Introduction)",
          items: [
            { en: "My name is [Name].", ar: "اسمي يكون [الاسم]." },
            { en: "I am [Age] years old.", ar: "عمري [السن] سنوات." },
            { en: "I live in Egypt.", ar: "أنا أعيش في مصر." }
          ]
        }
      ]
    },
    pronunciation: {
      title: "🔊 النطق والصوتيات — Pronunciation",
      description: "مخارج الحروف المهمة لتجنب الأخطاء الشائعة.",
      topics: [
        {
          title: "الفرق بين P و B",
          items: [
            { en: "Pen vs Ben", ar: "حرف P يخرج معه هواء خفيف بينما B لا يخرج معه هواء." },
            { en: "Park vs Bark", ar: "تدرب على النطق بالضغط على زر الاستماع." }
          ]
        }
      ]
    },
    expressions: {
      title: "🔥 التعبيرات الشائعة — Common Expressions",
      description: "تعبيرات يومية سريعة ومترجمة.",
      topics: [
        {
          title: "تعبيرات شائعة",
          items: [
            { en: "No problem!", ar: "لا توجد مشكلة!" },
            { en: "Of course!", ar: "بالتأكيد!" },
            { en: "Wait a minute.", ar: "انتظر دقيقة." },
            { en: "Never mind.", ar: "لا تشغل بالك / انسَ الأمر." }
          ]
        }
      ]
    }
  },
  a2: {
    badgeName: "Level A2 (Elementary Fluency)",
    verbs: {
      title: "⚡ أفعال المستوى A2",
      description: "أفعال السفر والأنشطة والماضي البسيط.",
      topics: [
        {
          title: "أفعال السفر والحركة (Travel & Action)",
          items: [
            { en: "arrive", ar: "يصل", ex: "The flight arrived on schedule.", exAr: "وصلت الرحلة في موعدها." },
            { en: "leave", ar: "يغادر", ex: "We left early morning.", exAr: "غادرنا في الصباح الباكر." },
            { en: "travel", ar: "يسافر", ex: "I travel abroad every year.", exAr: "أسافر للخارج كل عام." },
            { en: "visit", ar: "يزور", ex: "They visited Alexandria.", exAr: "زاروا الإسكندرية." },
            { en: "stay", ar: "يقيم", ex: "We stayed at a hotel.", exAr: "أقمنا في فندق." },
            { en: "book", ar: "يحجز", ex: "I booked two tickets.", exAr: "حجزت تذكرتين." }
          ]
        },
        {
          title: "أفعال الحياة المهنية واليومية",
          items: [
            { en: "explain", ar: "يشرح", ex: "Can you explain this?", exAr: "هل يمكنك شرح هذا؟" },
            { en: "decide", ar: "يقرر", ex: "We decided to start.", exAr: "قررنا أن نبدأ." },
            { en: "receive", ar: "يستلم", ex: "I received your email.", exAr: "استلمت بريدك الإلكتروني." },
            { en: "improve", ar: "يطور / يتحسن", ex: "My speaking improved.", exAr: "تحسن تحدثي كثيراً." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 المفردات والمصطلحات — A2 Vocabulary",
      description: "المفردات الخاصة بالسفر، الصحة، والعمل.",
      topics: [
        {
          title: "المطار والسفر (Airport & Travel)",
          items: [
            { en: "Airport", ar: "مطار" }, { en: "Flight", ar: "رحلة طيران" },
            { en: "Passport", ar: "جواز سفر" }, { en: "Luggage", ar: "أمتعة / حقائب" },
            { en: "Boarding pass", ar: "بطاقة صعود الطائرة" }, { en: "Gate", ar: "بوابة" }
          ]
        },
        {
          title: "الصحة والعيادة (Health & Clinic)",
          items: [
            { en: "Headache", ar: "صداع" }, { en: "Fever", ar: "حمى" },
            { en: "Medicine", ar: "دواء" }, { en: "Pharmacy", ar: "صيدلية" },
            { en: "Appointment", ar: "موعد محدد" }
          ]
        },
        {
          title: "العمل والمكتب (Work & Office)",
          items: [
            { en: "Colleague", ar: "زميل عمل" }, { en: "Meeting", ar: "اجتماع" },
            { en: "Deadline", ar: "الموعد النهائي" }, { en: "Report", ar: "تقرير" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 جمل التخاطب والمواقف اليومية",
      description: "جمل للمطارات، الفنادق، العيادات، والعمل.",
      topics: [
        {
          title: "المطار وحجوزات السفر",
          items: [
            { en: "I would like to check in, I have a reservation.", ar: "أود تسجيل الدخول، لدي حجز." },
            { en: "Where is the boarding gate for flight 402?", ar: "أين بوابة الصعود الخاصة بالرحلة رقم 402؟" },
            { en: "My luggage has not arrived yet.", ar: "أمتعتي لم تصل بعد." }
          ]
        },
        {
          title: "العيادة والصحة",
          items: [
            { en: "I have had a terrible headache since yesterday.", ar: "لدي صداع فظيع منذ الأمس." },
            { en: "I would like to make an appointment with the doctor.", ar: "أود حجز موعد مع الطبيب." }
          ]
        },
        {
          title: "العمل والمراسلات",
          items: [
            { en: "I received your email and will review the files today.", ar: "استلمت بريدك الإلكتروني وسأراجع الملفات اليوم." },
            { en: "The project deadline is next Monday.", ar: "الموعد النهائي لتسليم المشروع الإثنين القادم." }
          ]
        }
      ]
    }
  },
  b1: {
    badgeName: "Level B1 (Intermediate English)",
    verbs: {
      title: "⚡ أفعال المستوى B1",
      description: "أفعال النقاش، الإدارة، وحل المشكلات.",
      topics: [
        {
          title: "أفعال الإنجاز والتطوير",
          items: [
            { en: "achieve", ar: "يحقق / ينجز", ex: "You will achieve great success.", exAr: "ستحقق نجاحاً كبيراً." },
            { en: "manage", ar: "يدير", ex: "He managed the deployment team.", exAr: "أدار فريق النشر البرمجي." },
            { en: "suggest", ar: "يقترح", ex: "I suggest adopting TypeScript.", exAr: "أقترح تبني لغة TypeScript." },
            { en: "reduce", ar: "يخفض", ex: "We reduced cloud hosting costs.", exAr: "خفضنا تكاليف الاستضافة السحابية." },
            { en: "investigate", ar: "يفحص / يحقق", ex: "Investigate the security issue.", exAr: "افحص المشكلة الأمنية." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 المفردات المتوسطة — B1 Vocabulary",
      description: "مصطلحات التقنية، المشاريع، والوظائف.",
      topics: [
        {
          title: "التقنية والبرمجيات (Tech & Software)",
          items: [
            { en: "Requirement", ar: "متطلب أساسي" }, { en: "Efficiency", ar: "كفاءة" },
            { en: "Architecture", ar: "معمارية برمجية" }, { en: "Performance", ar: "مستوى الأداء" },
            { en: "Deployment", ar: "نشر المشروع" }, { en: "Troubleshooting", ar: "استكشاف الأعطال" }
          ]
        },
        {
          title: "المسار المهني (Career)",
          items: [
            { en: "Qualification", ar: "مؤهل علمي" }, { en: "Achievement", ar: "إنجاز" },
            { en: "Collaboration", ar: "تعاون مشترك" }, { en: "Leadership", ar: "قيادة" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 جمل التعبير والنقاش المهني",
      description: "جمل الاجتماعات، المقابلات، وحل الأزمات التقنية.",
      topics: [
        {
          title: "مقابلات العمل والتوظيف",
          items: [
            { en: "Tell me about your technical background and key projects.", ar: "حدثني عن خلفيتك التقنية وأهم مشاريعك." },
            { en: "My greatest strength is solving complex algorithmic problems.", ar: "أعظم نقاط قوتي هي حل المشكلات الخوارزمية المعقدة." }
          ]
        },
        {
          title: "الاجتماعات وإبداء الرأي",
          items: [
            { en: "In my opinion, this approach is more scalable and cost-effective.", ar: "في رأيي، هذا الأسلوب أكثر قابلية للتوسع وموفر للتكاليف." },
            { en: "I see your point, but we need to consider the timeline constraints.", ar: "أتفهم وجهة نظرك، لكن علينا مراعاة قيود الجدول الزمني." }
          ]
        }
      ]
    }
  },
  b2: {
    badgeName: "Level B2 (Upper-Intermediate Fluency)",
    verbs: {
      title: "⚡ أفعال المستوى B2",
      description: "أفعال القيادة، التفاوض، والتحليل المعمق.",
      topics: [
        {
          title: "أفعال التفاوض والتطبيق",
          items: [
            { en: "negotiate", ar: "يتفاوض على", ex: "We negotiated contract terms.", exAr: "تفاوضنا على بنود العقد." },
            { en: "implement", ar: "يطبق / ينفذ", ex: "They implemented secure protocols.", exAr: "طبقوا بروتوكولات آمنة." },
            { en: "demonstrate", ar: "يبرهن عملياً", ex: "Demonstrate product capability.", exAr: "أظهر كفاءة المنتج عملياً." },
            { en: "streamline", ar: "يبسط الإجراءات", ex: "Streamline continuous integration.", exAr: "بسط إجراءات التكامل المستمر." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 المصطلحات التخصصية والأعمال",
      description: "مفردات الحوكمة، البنية التحتية، والاستثمار.",
      topics: [
        {
          title: "البنية التحتية وهندسة النظم",
          items: [
            { en: "Infrastructure", ar: "بنية تحتية" }, { en: "Scalability", ar: "قابلية التوسع" },
            { en: "Vulnerability", ar: "ثغرة أمنية" }, { en: "Latency", ar: "زمن استجابة الشبكة" },
            { en: "Microservices", ar: "الخدمات المصغرة" }
          ]
        },
        {
          title: "إدارة الأعمال والمالية",
          items: [
            { en: "Stakeholder", ar: "صاحب مصلحة / معني" }, { en: "ROI", ar: "العائد على الاستثمار" },
            { en: "KPI", ar: "مؤشر أداء رئيسي" }, { en: "Market share", ar: "حصة سوقية" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 تراكيب التحدث الاحترافي والعروض التقديمية",
      description: "جمل الاجتماعات العليا، التفاوض، والعروض التقديمية.",
      topics: [
        {
          title: "التفاوض والاجتماعات الرسمية",
          items: [
            { en: "I believe we should reconsider our current technical roadmap.", ar: "أعتقد أنه ينبغي علينا إعادة النظر في خارطة طريقنا التقنية." },
            { en: "We need to ensure that the SLA guarantees 99.9% uptime availability.", ar: "نحتاج للتأكد من أن اتفاقية الخدمة تضمن جاهزية بنسبة 99.9%." }
          ]
        },
        {
          title: "العروض التقديمية والخطابة",
          items: [
            { en: "As you can see on this chart, our server latency decreased by 40%.", ar: "كما ترون في هذا المخطط، انخفض زمن استجابة السيرفر بنسبة 40%." },
            { en: "In conclusion, adopting modern PWAs will maximize user retention.", ar: "ختاماً، إن تبني تطبيقات الويب المتقدمة سيعزز بقاء المستخدمين." }
          ]
        }
      ]
    }
  },
  c1: {
    badgeName: "Level C1 (Advanced & Business Mastery)",
    verbs: {
      title: "⚡ أفعال المستوى C1 الأكاديمية والتنفيذية",
      description: "أفعال الصياغة النظرية والتحليل الاستراتيجي الفائق.",
      topics: [
        {
          title: "أفعال متقدمة واستراتيجية",
          items: [
            { en: "facilitate", ar: "ييسر / يذلل الصعاب", ex: "Cloud systems facilitate integration.", exAr: "الأنظمة السحابية تيسر عملية التكامل." },
            { en: "leverage", ar: "يستثمر بأفضل وجه", ex: "Leverage machine learning APIs.", exAr: "استثمر واجهات برمجة تعلم الآلة بذكاء." },
            { en: "orchestrate", ar: "يقود وينسق عملاً ضخماً", ex: "Orchestrate microservices fleets.", exAr: "نسق وقد أساطيل الخدمات المصغرة." },
            { en: "scrutinize", ar: "يدقق ويمحص", ex: "Scrutinize code for vulnerabilities.", exAr: "دقق الكود البرمجي بحثاً عن الثغرات." }
          ]
        }
      ]
    },
    nouns: {
      title: "📚 المفردات الفكرية والتقنية العليا",
      description: "مصطلحات الذكاء الاصطناعي، المعمارية الموزعة، والسياسات المالية.",
      topics: [
        {
          title: "المفاهيم والنماذج المعرفية",
          items: [
            { en: "Paradigm", ar: "نموذج فكري وإدراكي" }, { en: "Efficacy", ar: "فاعلية وجدوى قاطعة" },
            { en: "Autonomous", ar: "ذاتي التحكم ومستقل" }, { en: "Neural Network", ar: "شبكة عصبية اصطناعية" },
            { en: "Venture Capital", ar: "رأس المال الجريء الاستثماري" }
          ]
        }
      ]
    },
    sentences: {
      title: "💬 الخطابة القيادية والمناظرات الدولية",
      description: "تراكيب الإدارة العليا واستشراف السياسات المستقبلية.",
      topics: [
        {
          title: "القيادة التنفيذية والإدارة العليا",
          items: [
            { en: "I would like to draw your attention to the substantial paradigm shift in our enterprise architecture.", ar: "أود أن ألفت انتباهكم إلى التحول النموذجي الجوهري في معمارية مؤسستنا." },
            { en: "It is paramount that we align our technical deliverables with overarching corporate governance mandates.", ar: "من الأهمية بمكان أن نوائم مخرجاتنا التقنية مع تفويضات الحوكمة المؤسسية الشاملة." }
          ]
        },
        {
          title: "استشراف المستقبل والذكاء الاصطناعي",
          items: [
            { en: "Leveraging decentralized zero-trust frameworks is an indispensable prerequisite for enterprise defense.", ar: "يعد الاستثمار الفعال لأطر العمل اللامركزية القائمة على انعدام الثقة شرطاً مسبقاً لا غنى عنه للدفاع السيبراني." },
            { en: "The proposed optimization metrics will enhance execution speed without jeopardizing data integrity.", ar: "ستعزز معايير التحسين المقترحة سرعة التنفيذ دون المساس بسلامة البيانات." }
          ]
        }
      ]
    }
  }
};
