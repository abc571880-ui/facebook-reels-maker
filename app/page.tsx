"use client";
import { useState } from "react";

const NICHES = [
  { id: "money", name: "المال 💰", topics: ["How I saved $500 in 30 days", "Why your salary disappears in 10 days", "Side incomes you can start tonight", "3 money mistakes keeping you poor", "How rich people think about money", "Stop doing this with your money", "My $1000 emergency fund challenge", "Passive income ideas for beginners", "Why you are still broke", "5 habits of millionaires"] },
  { id: "health", name: "الصحة 🥗", topics: ["Drink this every morning", "Why you are always tired", "3 foods destroying your health", "Lose belly fat without gym", "This habit is killing you slowly", "Morning routine of healthy people", "Stop eating this at night", "How I lost 10kg in 2 months", "Your body needs this vitamin", "Sleep like this to live longer"] },
  { id: "tech", name: "التقنية 📱", topics: ["AI tools that make you money", "Your phone is spying on you", "Best AI apps in 2026", "Stop using ChatGPT like this", "Future jobs that will disappear", "This AI will replace your job", "Hidden iPhone tricks", "Make money with AI in 2026", "Secrets of your phone you didn't know", "Top 5 apps you need now"] },
  { id: "cooking", name: "الطبخ 🍳", topics: ["3 ingredients dinner in 10 minutes", "This recipe broke the internet", "Crispy chicken secret", "Pasta in 5 minutes", "Best breakfast ever", "Stop cooking rice like this", "Viral pasta recipe", "Cheap meal that tastes expensive", "My grandmother's secret recipe", "Easy dessert with 2 ingredients"] },
];

const BACKGROUNDS = [
  { id: "gold", name: "ذهب - ثروة", img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80" },
  { id: "stocks", name: "أسهم - صعود", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" },
  { id: "bank", name: "بنك", img: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80" },
  { id: "money2", name: "فلوس - دولارات", img: "https://images.unsplash.com/photo-1554672408-730436b60dde?w=800&q=80" },
  { id: "city", name: "مدينة - أعمال", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { id: "laptop", name: "لابتوب - شغل", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80" },
  { id: "luxury", name: "فخامة", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { id: "nature", name: "طبيعة", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
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

  const currentCountry = COUNTRIES.find(c => c.id === country)!;
  const currentNiche = NICHES.find(n => n.id === niche)!;

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = [...currentNiche.topics].sort(() => Math.random() - 0.5).slice(0, 10);
      setTopics(shuffled);
      setSelectedTopic(shuffled[0]);
      setLoading(false);
    }, 800);
  };

  const randomTopic = () => {
    const t = currentNiche.topics[Math.floor(Math.random() * currentNiche.topics.length)];
    setSelectedTopic(t);
  };

  const caption = `${selectedTopic}\n\nSave this video! Follow for more daily tips 🔥\n\n#facebookreels #viralreels #${niche} #fyp #reels #viral #trending`;

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex justify-center">
      {/* هاد هو الحاوية اللي بالنص - 520px بس */}
      <div className="w-full max-w-[520px] bg-black text-white min-h-screen px-4 py-6 shadow-2xl border-x border-zinc-800">

        {/* الهيدر */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black">🎬 صانع ريلز فيسبوك</h1>
          <p className="text-zinc-400 text-sm mt-1">ولّد فيديو فيرال بـ 2 دقيقة</p>
        </div>

        {/* النيش */}
        <label className="text-sm font-bold">🎯 اختار النيش</label>
        <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
          {NICHES.map(n => (
            <button key={n.id} onClick={() => { setNiche(n.id); setTopics([]); }}
              className={`p-3 rounded-xl text-sm font-bold border ${niche === n.id ? "bg-yellow-400 text-black border-yellow-400" : "bg-zinc-900 border-zinc-800"}`}>
              {n.name}
            </button>
          ))}
        </div>

        {/* الدولة */}
        <label className="text-sm font-bold">🌍 الدولة المستهدفة</label>
        <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
          {COUNTRIES.map(c => (
            <button key={c.id} onClick={() => setCountry(c.id)}
              className={`p-3 rounded-xl text-sm font-bold border ${country === c.id ? "bg-white text-black border-white" : "bg-zinc-900 border-zinc-800"}`}>
              {c.name}
            </button>
          ))}
        </div>

        {/* زر التوليد */}
        <button onClick={generate} className="w-full bg-yellow-400 text-black font-black py-4 rounded-2xl text-base mb-2">
          {loading ? "جاري التوليد... ⏳" : "✨ ولّد بـ Gemini"}
        </button>
        <div className="flex gap-2 mb-6">
          <button onClick={generate} className="flex-1 bg-zinc-900 py-2.5 rounded-xl text-sm">🔄 10 مواضيع جديدة</button>
          <button onClick={randomTopic} className="flex-1 bg-zinc-900 py-2.5 rounded-xl text-sm">🎲 موضوع عشوائي</button>
        </div>

        {/* المواضيع */}
        {topics.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">🔥 اختار هوك:</h3>
            <div className="space-y-2">
              {topics.slice(0, 5).map(t => (
                <button key={t} onClick={() => setSelectedTopic(t)}
                  className={`w-full text-right p-3 rounded-xl text-sm border ${selectedTopic === t ? "bg-yellow-400 text-black font-bold border-yellow-400" : "bg-zinc-900 border-zinc-800"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* الخلفيات */}
        {selectedTopic && (
          <>
            <h3 className="font-bold mb-2">🖼️ اختار خلفية:</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {BACKGROUNDS.map(b => (
                <button key={b.id} onClick={() => setSelectedBg(b)} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={b.img} className="w-full h-full object-cover" alt={b.name} />
                  {selectedBg.id === b.id && <div className="absolute inset-0 border-[3px] border-yellow-400 rounded-xl" />}
                  <span className="absolute bottom-1 right-1 left-1 bg-black/70 text-[10px] py-1 rounded-md">{b.name}</span>
                </button>
              ))}
            </div>

            {/* المعاينة - بالنص و 9:16 */}
            <div className="flex justify-center mb-4">
              <div className="w-[280px] aspect-[9/16] rounded-[24px] overflow-hidden relative shadow-2xl border border-zinc-700">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <p className="text-white font-black text-lg leading-tight text-center mt-6">{selectedTopic}</p>
                  <div className="space-y-1.5">
                    {["1. ابدأ اليوم، لا تنتظر", "2. وفّر 20% من دخلك", "3. اقطع المصاريف الفاضية", "4. ابني دخل إضافي", "5. استثمر في نفسك"].map(t => (
                      <p key={t} className="bg-black/70 rounded-lg px-2 py-1.5 text-[11px] text-right">{t}</p>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-zinc-300">@ yourpage • Follow for more</p>
                </div>
                <span className="absolute top-2 left-2 bg-black/70 text-[10px] px-2 py-1 rounded-full">20 ثانية</span>
              </div>
            </div>

            <button className="w-full bg-green-500 font-black py-3.5 rounded-2xl mb-6">⬇️ تحميل فيديو - 20 ثانية</button>

            {/* الكابشن */}
            <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
              <h4 className="font-bold mb-2">📝 الكابشن + الهاشتاغات</h4>
              <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">{caption}</p>
              <button onClick={copyCaption} className="w-full bg-green-600 py-2.5 rounded-xl mt-3 font-bold text-sm">
                {copied ? "✅ تم النسخ!" : "📋 نسخ الكابشن + الهاشتاغات"}
              </button>
            </div>

            {/* دليل النشر */}
            <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
              <h4 className="font-bold mb-2">📍 وين تحط اللوكيشن؟</h4>
              <p className="text-lg font-black">📍 {currentCountry.city}</p>
              <p className="text-xs text-zinc-400 mt-1">لما تنشر الريلز على الفيس → اضغط Add Location → اكتب {currentCountry.city.split(",")[0]} → اختار {currentCountry.city}</p>
              <p className="text-xs bg-yellow-900/50 text-yellow-200 p-2 rounded-lg mt-2">⚠️ مهم: لا تشغل GPS وانت بتنشر - حط اللوكيشن يدوياً مثل ما فوق</p>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-4 mb-6">
              <h4 className="font-bold mb-2">✍️ كيف تنشر على فيس ريلز؟</h4>
              <ol className="text-sm text-zinc-300 space-y-1.5 leading-relaxed">
                <li>1. افتح فيسبوك → اضغط + → Reels</li>
                <li>2. ارفع الفيديو اللي حملته من هون</li>
                <li>3. الصق الكابشن + الهاشتاغات اللي نسختهم من المربع الواحد تحت</li>
                <li>4. اضغط Add Location → اكتب {currentCountry.city.split(",")[0]} → اختاره</li>
                <li>5. اضغط على Audience → Public</li>
                <li>6. لا تحط رابط بالكابشن</li>
                <li>7. انشر بالوقت اللي فوق</li>
                <li>8. ضيف الأغنية من داخل الفيس ريلز - من مكتبة الأغاني - عشان ما يجيك حقوق</li>
              </ol>
              <p className="text-xs text-zinc-400 mt-3">🕐 أفضل وقت: {currentCountry.time} | فرق التوقيت: {currentCountry.diff}</p>
            </div>

            <button onClick={() => { setTopics([]); setSelectedTopic(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full bg-zinc-800 py-3 rounded-2xl font-bold mb-4">🔄 ابدأ فيديو جديد</button>
          </>
        )}
      </div>
    </div>
  );
}
