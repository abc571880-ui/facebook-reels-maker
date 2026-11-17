"use client";
import { useState } from "react";

const NICHES = [
  { id: "money", name: "المال 💰", en: ["How I saved $500 in 30 days", "Why your salary disappears in 10 days", "Side incomes you can start tonight", "3 money mistakes keeping you poor", "How rich people think about money", "Stop doing this with your money", "My $1000 emergency fund challenge", "Passive income ideas for beginners", "Why you are still broke", "5 habits of millionaires"], ar: ["كيف وفّرت 500$ بـ 30 يوم", "ليش راتبك بخلص بـ 10 أيام", "دخل إضافي بتبلشو الليلة", "3 أخطاء بتخليك فقير", "كيف الأغنياء بفكرو بالمال", "وقف تعمل هيك بمصاريك", "تحدي 1000$ للطوارئ", "أفكار دخل سلبي للمبتدئين", "ليش انت لسا مفلس", "5 عادات المليونيرية"] },
  { id: "health", name: "الصحة 🥗", en: ["Drink this every morning", "Why you are always tired", "3 foods destroying your health", "Lose belly fat without gym", "This habit is killing you slowly", "Morning routine of healthy people", "Stop eating this at night", "How I lost 10kg in 2 months", "Your body needs this vitamin", "Sleep like this to live longer"], ar: ["اشرب هاد كل صبح", "ليش انت دايماً تعبان", "3 أكلات بتدمر صحتك", "انحف بدون جيم", "هاي العادة بتقتلك ببطء", "روتين الصبح للناس الصحية", "وقف تاكل هاد بالليل", "كيف خسرت 10 كيلو بشهرين", "جسمك محتاج هاد الفيتامين", "نام هيك لتعيش أطول"] },
  { id: "tech", name: "التقنية 📱", en: ["AI tools that make you money", "Your phone is spying on you", "Best AI apps in 2026", "Stop using ChatGPT like this", "Future jobs that will disappear", "This AI will replace your job", "Hidden iPhone tricks", "Make money with AI in 2026", "Secrets of your phone you didn't know", "Top 5 apps you need now"], ar: ["أدوات ذكاء اصطناعي بتعملك مصاري", "تلفونك بتجسس عليك", "أفضل تطبيقات ذكاء اصطناعي 2026", "وقف تستخدم شات جي بي تي هيك", "وظايف راح تختفي بالمستقبل", "هاد الذكاء الاصطناعي راح ياخد شغلك", "حيل آيفون مخفية", "اعمل مصاري بالذكاء الاصطناعي", "أسرار تلفونك ما كنت تعرفها", "أهم 5 تطبيقات لازم عندك"] },
  { id: "cooking", name: "الطبخ 🍳", en: ["3 ingredients dinner in 10 minutes", "This recipe broke the internet", "Crispy chicken secret", "Pasta in 5 minutes", "Best breakfast ever", "Stop cooking rice like this", "Viral pasta recipe", "Cheap meal that tastes expensive", "My grandmother's secret recipe", "Easy dessert with 2 ingredients"], ar: ["عشا بـ 3 مكونات بـ 10 دقايق", "هاي الوصفة كسرت النت", "سر الدجاج المقرمش", "باستا بـ 5 دقايق", "أطيب فطور بالعالم", "وقف تطبخ الرز هيك", "وصفة الباستا الترند", "أكلة رخيصة طعمها فخم", "وصفة ستي السرية", "حلو سهل بمكونين"] },
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
    "Start today, don't wait",
    "Save 20% of your income",
    "Cut useless expenses",
    "Build a side income",
    "Invest in yourself",
  ] : [
    "ابدأ اليوم، لا تنتظر",
    "وفّر 20% من دخلك",
    "اقطع المصاريف الفاضية",
    "ابني دخل إضافي",
    "استثمر في نفسك",
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

        {/* هيدر */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎬</div>
          <h1 className="text-[26px] font-black leading-tight">صانع ريلز فيسبوك</h1>
          <p className="text-zinc-400 text-[13px] mt-2">ولّد فيديو فيرال بـ 2 دقيقة</p>
        </div>

        {/* النيش - أزرار مفصولة */}
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

        {/* الدولة - أزرار مفصولة */}
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

        {/* زر التوليد الكبير */}
        <div className="mb-3">
          <button onClick={generate} className="w-full bg-yellow-400 text-black font-black py-4 rounded-2xl text-[16px] shadow-lg shadow-yellow-400/20 active:scale-[0.98] transition-all">
            {loading ? "جاري التوليد... ⏳" : "✨ ولّد بـ Gemini"}
          </button>
        </div>

        {/* الزرين الصغار - مفصولين */}
        <div className="flex gap-3 mb-8">
          <button onClick={generate} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🔄 10 مواضيع جديدة</button>
          <button onClick={randomTopic} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🎲 موضوع عشوائي</button>
        </div>

        {/* المواضيع */}
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
            {/* الخلفيات */}
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

            {/* المعاينة */}
            <div className="flex justify-center mb-5">
              <div className="w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden relative shadow-2xl border border-zinc-700 bg-zinc-900">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <p dir={isEnglish ? "ltr" : "rtl"} className="text-white font-black text-[19px] leading-tight text-center mt-7 drop-shadow-lg">{selectedTopic}</p>
                  <div className="space-y-2">
                    {tips.map((t, i) => (
                      <p key={t} dir={isEnglish ? "ltr" : "rtl"} className="bg-black/70 backdrop-blur rounded-xl px-3 py-2.5 text-[12px] text-left flex gap-2">
                        <span className="bg-yellow-400 text-black w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0">{i + 1}</span>
                        <span>{t.replace(/^\d+\.\s/, "")}</span>
                      </p>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-zinc-300">@ yourpage • Follow for more</p>
                </div>
                <span className="absolute top-3 left-3 bg-black/70 text-[10px] px-2.5 py-1 rounded-full">20 ثانية</span>
              </div>
            </div>

            <button className="w-full bg-green-500 font-black py-4 rounded-2xl mb-8 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all">⬇️ تحميل فيديو - 20 ثانية</button>

            {/* الكابشن */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
              <h4 className="font-bold mb-3">📝 الكابشن + الهاشتاغات</h4>
              <p dir={isEnglish ? "ltr" : "rtl"} className="text-[13px] text-zinc-300 whitespace-pre-line leading-relaxed text-left">{caption}</p>
              <button onClick={copyCaption} className="w-full bg-green-600 py-3.5 rounded-2xl mt-4 font-bold text-[14px] active:scale-[0.98] transition-all">
                {copied ? "✅ تم النسخ!" : "📋 نسخ الكابشن + الهاشتاغات"}
              </button>
            </div>

            {/* اللوكيشن */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
              <h4 className="font-bold mb-2">📍 وين تحط اللوكيشن؟</h4>
              <p dir="ltr" className="text-[16px] font-black text-left">📍 {currentCountry.city}</p>
              <p className="text-[12px] text-zinc-400 mt-2 leading-relaxed">لما تنشر الريلز → Add Location → اكتب {currentCountry.city.split(",")[0]} → اختار {currentCountry.city}</p>
              <p className="text-[12px] bg-yellow-900/40 text-yellow-200 p-3 rounded-xl mt-3">⚠️ مهم: لا تشغل GPS وانت بتنشر - حط اللوكيشن يدوياً</p>
            </div>

            {/* دليل النشر */}
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
