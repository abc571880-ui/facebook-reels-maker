"use client";
import { useState } from "react";

const NICHES = [
  { id: "money", name: "المال 💰",
    en: [
      "How to build a side business with $100",
      "How to invest $100 and grow it",
      "How to make $1000 extra every month",
      "How to start investing with no experience",
      "How to turn your salary into wealth",
      "How to build passive income from zero",
      "How to save $10000 in one year",
      "How to make money while you sleep",
      "How to start a business with no money",
      "How to invest in stocks for beginners",
      "How to escape the 9-5 job",
      "How to build wealth in your 20s",
      "How to make your first $1000 online",
      "How to grow $500 into $5000",
      "How to stop living paycheck to paycheck",
    ],
    ar: [
      "كيف تبني شغل إضافي بـ 100$",
      "كيف تستثمر 100$ وتكبرهم",
      "كيف تعمل 1000$ زيادة كل شهر",
      "كيف تبدأ تستثمر بدون خبرة",
      "كيف تحوّل راتبك لثروة",
      "كيف تبني دخل سلبي من الصفر",
      "كيف توفّر 10000$ بسنة وحدة",
      "كيف تعمل مصاري وانت نايم",
      "كيف تبدأ مشروع بدون مصاري",
      "كيف تستثمر بالأسهم للمبتدئين",
      "كيف تهرب من وظيفة 9-5",
      "كيف تبني ثروة بعمر العشرين",
      "كيف تعمل أول 1000$ أونلاين",
      "كيف تحوّل 500$ لـ 5000$",
      "كيف تبطل تعيش من راتب لراتب",
    ] },
  { id: "health", name: "الصحة 🥗",
    en: [
      "How to lose belly fat in 30 days",
      "How to sleep better tonight",
      "How to gain energy in 7 days",
      "How to eat healthy on a budget",
      "How to build a morning routine that works",
      "How to stop sugar cravings",
      "How to lose 10kg without gym",
      "How to fix your back pain at home",
      "How to live longer - 5 simple habits",
      "How to boost your immune system",
    ],
    ar: [
      "كيف تنحف بطنك بـ 30 يوم",
      "كيف تنام أحسن الليلة",
      "كيف تزيد طاقتك بـ 7 أيام",
      "كيف تاكل صحي بميزانية قليلة",
      "كيف تبني روتين صباحي ناجح",
      "كيف توقف اشتهاء السكر",
      "كيف تخسر 10 كيلو بدون جيم",
      "كيف تعالج وجع ظهرك بالبيت",
      "كيف تعيش أطول - 5 عادات بسيطة",
      "كيف تقوي مناعتك",
    ] },
  { id: "tech", name: "التقنية 📱",
    en: [
      "How to make money with AI in 2026",
      "How to use ChatGPT to make money",
      "How to start a faceless YouTube channel",
      "How to protect your phone from hackers",
      "How to make $500 with your phone",
      "How to learn AI in 7 days",
      "How to automate your work with AI",
      "How to build an app with no code",
      "How to grow on TikTok in 2026",
      "How to make money with Canva",
    ],
    ar: [
      "كيف تعمل مصاري بالذكاء الاصطناعي 2026",
      "كيف تستخدم شات جي بي تي لتعمل مصاري",
      "كيف تبدأ قناة يوتيوب بدون وجه",
      "كيف تحمي تلفونك من الهكر",
      "كيف تعمل 500$ من تلفونك",
      "كيف تتعلم الذكاء الاصطناعي بـ 7 أيام",
      "كيف تأتمت شغلك بالذكاء الاصطناعي",
      "كيف تبني تطبيق بدون برمجة",
      "كيف تكبر على تيك توك 2026",
      "كيف تعمل مصاري من كانفا",
    ] },
  { id: "cooking", name: "الطبخ 🍳",
    en: [
      "How to cook a full dinner in 10 minutes",
      "How to make crispy chicken at home",
      "How to cook perfect rice every time",
      "How to make pasta like Italians",
      "How to meal prep for the whole week",
      "How to make healthy breakfast in 5 minutes",
      "How to bake bread with 3 ingredients",
      "How to make restaurant food at home",
    ],
    ar: [
      "كيف تطبخ عشا كامل بـ 10 دقايق",
      "كيف تعمل دجاج مقرمش بالبيت",
      "كيف تطبخ رز مظبوط كل مرة",
      "كيف تعمل باستا زي الطليان",
      "كيف تجهز أكل الأسبوع كامل",
      "كيف تعمل فطور صحي بـ 5 دقايق",
      "كيف تخبز خبز بـ 3 مكونات",
      "كيف تعمل أكل مطاعم بالبيت",
    ] },
];

const BACKGROUNDS = [
  { id: "gold", name: "ذهب", img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80" },
  { id: "money", name: "فلوس", img: "https://images.unsplash.com/photo-1554672408-730436b60dde?w=800&q=80" },
  { id: "dark", name: "أسود فخم", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
  { id: "city", name: "مدينة", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" },
  { id: "green", name: "أسهم", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { id: "luxury", name: "فخامة", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { id: "office", name: "مكتب", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: "chart", name: "رسم بياني", img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80" },
];

const COUNTRIES = [
  { id: "USA", name: "أمريكا 🇺🇸", city: "New York, USA", time: "7:00 - 9:00 مساءً EST", diff: "أمريكا ورانا بـ 7 ساعات" },
  { id: "UK", name: "بريطانيا 🇬🇧", city: "London, UK", time: "6:00 - 8:00 مساءً GMT", diff: "بريطانيا ورانا بـ 2 ساعة" },
  { id: "UAE", name: "الإمارات 🇦🇪", city: "Dubai, UAE", time: "7:00 - 9:00 مساءً", diff: "الإمارات قدامنا بساعة" },
  { id: "SA", name: "السعودية 🇸🇦", city: "Riyadh, SA", time: "8:00 - 10:00 مساءً", diff: "السعودية نفس توقيتنا" },
];

// ايموجي لكل نقطة - بدل الدوائر الصفرا
const TIP_ICONS = ["💰", "📈", "✂️", "🚀", "⭐"];

export default function Home() {
  const [niche, setNiche] = useState("money");
  const [country, setCountry] = useState("USA");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isEnglish = country === "USA" || country === "UK";
  const currentCountry = COUNTRIES.find(c => c.id === country)!;
  const currentNiche = NICHES.find(n => n.id === niche)!;

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const list = isEnglish ? currentNiche.en : currentNiche.ar;
      const shuffled = [...list].sort(() => Math.random() - 0.5).slice(0, 10);
      setTopics(shuffled);
      setSelectedTopic(shuffled[0]);
      setLoading(false);
    }, 700);
  };

  const randomTopic = () => {
    const list = isEnglish ? currentNiche.en : currentNiche.ar;
    setSelectedTopic(list[Math.floor(Math.random() * list.length)]);
  };

  const tips = isEnglish ? [
    "Start with $100, not $10,000",
    "Save 20% before you spend",
    "Cut 3 useless subscriptions",
    "Build one side income first",
    "Invest in skills, then stocks",
  ] : [
    "ابدأ بـ 100$ مش بـ 10000$",
    "وفّر 20% قبل ما تصرف",
    "الغي 3 اشتراكات فاضية",
    "ابني دخل إضافي واحد أول",
    "استثمر بمهاراتك بعدين بالأسهم",
  ];

  const caption = isEnglish
    ? `${selectedTopic}\n\nSave this video! Follow for more daily tips 🔥\n\n#facebookreels #viralreels #money #fyp #reels #viral #trending`
    : `${selectedTopic}\n\nاحفظ الفيديو! تابعني لنصايح يومية 🔥\n\n#ريلز #فيسبوك #مال #فلوس #ترند`;

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex justify-center">
      <div className="w-full max-w-[520px] bg-black text-white min-h-screen px-5 py-7 shadow-2xl border-x border-zinc-800">

        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎬</div>
          <h1 className="text-[26px] font-black leading-tight">صانع ريلز فيسبوك</h1>
          <p className="text-zinc-400 text-[13px] mt-2">ولّد فيديو فيرال بـ 2 دقيقة</p>
        </div>

        <div className="mb-7">
          <p className="text-[14px] font-bold mb-3">🎯 اختار النيش</p>
          <div className="grid grid-cols-2 gap-3">
            {NICHES.map(n => (
              <button key={n.id} onClick={() => { setNiche(n.id); setTopics([]); setSelectedTopic(""); }}
                className={`py-3.5 px-3 rounded-2xl text-[14px] font-bold transition-all ${niche === n.id ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-[1.02]" : "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800"}`}>
                {n.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <p className="text-[14px] font-bold mb-3">🌍 الدولة المستهدفة</p>
          <div className="grid grid-cols-2 gap-3">
            {COUNTRIES.map(c => (
              <button key={c.id} onClick={() => { setCountry(c.id); setTopics([]); setSelectedTopic(""); }}
                className={`py-3.5 px-3 rounded-2xl text-[14px] font-bold transition-all ${country === c.id ? "bg-white text-black shadow-lg shadow-white/10 scale-[1.02]" : "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800"}`}>
                {c.name}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center">
            {isEnglish ? "المحتوى راح يطلع بالانجليزي 🇺🇸" : "المحتوى راح يطلع بالعربي"}
          </p>
        </div>

        <div className="mb-3">
          <button onClick={generate} className="w-full bg-yellow-400 text-black font-black py-4 rounded-2xl text-[16px] shadow-lg shadow-yellow-400/20 active:scale-[0.98] transition-all">
            {loading ? "جاري التوليد... ⏳" : "✨ ولّد بـ Gemini"}
          </button>
        </div>

        <div className="flex gap-3 mb-8">
          <button onClick={generate} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🔄 10 مواضيع جديدة</button>
          <button onClick={randomTopic} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🎲 موضوع عشوائي</button>
        </div>

        {topics.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-3">🔥 اختار هوك:</h3>
            <div className="space-y-3">
              {topics.slice(0, 5).map(t => (
                <button key={t} onClick={() => setSelectedTopic(t)} dir={isEnglish ? "ltr" : "rtl"}
                  className={`w-full text-center p-4 rounded-2xl text-[14px] leading-relaxed transition-all ${selectedTopic === t ? "bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/20" : "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTopic && (
          <>
            <div className="mb-8">
              <h3 className="font-bold text-[15px] mb-3">🖼️ اختار خلفية:</h3>
              <div className="grid grid-cols-4 gap-3">
                {BACKGROUNDS.map(b => (
                  <button key={b.id} onClick={() => setSelectedBg(b)} className="relative rounded-2xl overflow-hidden aspect-square border border-zinc-800">
                    <img src={b.img} className="w-full h-full object-cover" alt={b.name} />
                    {selectedBg.id === b.id && <div className="absolute inset-0 border-[3px] border-yellow-400 rounded-2xl" />}
                    <span className="absolute bottom-1.5 right-1.5 left-1.5 bg-black/75 text-[10px] py-1 rounded-lg">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* المعاينة - الستايل الجديد */}
            <div className="flex justify-center mb-5">
              <div className="w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden relative shadow-2xl border border-zinc-700 bg-zinc-900">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <p dir={isEnglish ? "ltr" : "rtl"} className="text-white font-black text-[19px] leading-tight text-center mt-7 drop-shadow-lg">{selectedTopic}</p>

                  {/* النقاط الجديدة - زجاجية بدون أصفر */}
                  <div className="space-y-2.5">
                    {tips.map((t, i) => (
                      <div key={t} dir={isEnglish ? "ltr" : "rtl"} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
                        <span className="text-[18px] leading-none shrink-0">{TIP_ICONS[i]}</span>
                        <span className="text-white text-[13px] font-semibold leading-snug text-left">{t}</span>
                        <span className="mr-auto text-white/40 text-[12px]">→</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-[10px] text-zinc-300">@ yourpage • Follow for more</p>
                </div>
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur text-[10px] px-2.5 py-1 rounded-full">20 ثانية</span>
              </div>
            </div>

            <button className="w-full bg-green-500 font-black py-4 rounded-2xl mb-8 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all">⬇️ تحميل فيديو - 20 ثانية</button>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
              <h4 className="font-bold mb-3">📝 الكابشن + الهاشتاغات</h4>
              <p dir={isEnglish ? "ltr" : "rtl"} className="text-[13px] text-zinc-300 whitespace-pre-line leading-relaxed text-left">{caption}</p>
              <button onClick={copyCaption} className="w-full bg-green-600 py-3.5 rounded-2xl mt-4 font-bold text-[14px] active:scale-[0.98] transition-all">
                {copied ? "✅ تم النسخ!" : "📋 نسخ الكابشن + الهاشتاغات"}
              </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
              <h4 className="font-bold mb-2">📍 وين تحط اللوكيشن؟</h4>
              <p dir="ltr" className="text-[16px] font-black text-left">📍 {currentCountry.city}</p>
              <p className="text-[12px] text-zinc-400 mt-2 leading-relaxed">لما تنشر الريلز → Add Location → اكتب {currentCountry.city.split(",")[0]} → اختار {currentCountry.city}</p>
              <p className="text-[12px] bg-yellow-900/40 text-yellow-200 p-3 rounded-xl mt-3">⚠️ مهم: لا تشغل GPS وانت بتنشر - حط اللوكيشن يدوياً</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-7">
              <h4 className="font-bold mb-3">✍️ كيف تنشر على فيس ريلز؟</h4>
              <div className="space-y-2.5 text-[13px] text-zinc-300 leading-relaxed">
                <p>1. افتح فيسبوك → اضغط + → Reels</p>
                <p>2. ارفع الفيديو اللي حملته من هون</p>
                <p>3. الصق الكابشن + الهاشتاغات</p>
                <p>4. Add Location → {currentCountry.city}</p>
                <p>5. Audience → Public</p>
                <p>6. لا تحط رابط بالكابشن</p>
                <p>7. انشر بالوقت اللي تحت</p>
                <p>8. ضيف الأغنية من داخل الفيس - عشان ما يجيك حقوق</p>
              </div>
              <p className="text-[12px] text-zinc-400 mt-4 pt-3 border-t border-zinc-800">🕐 أفضل وقت: {currentCountry.time} | {currentCountry.diff}</p>
            </div>

            <button onClick={() => { setTopics([]); setSelectedTopic(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full bg-zinc-800 border border-zinc-700 py-3.5 rounded-2xl font-bold mb-2 active:scale-[0.98] transition-all">🔄 ابدأ فيديو جديد</button>
          </>
        )}
      </div>
    </div>
  );
}
