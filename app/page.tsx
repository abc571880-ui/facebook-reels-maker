"use client";
import { useState, useEffect } from "react";

// ===== مولد أفكار لا نهائي - كل مرة أفكار جديدة =====
const HOOK_STARTS_EN = ["Nobody tells you this","Stop doing this","7 secrets","I wish I knew this","The truth about","Why you're still broke","This changed my life","Do this for 30 days","The rich hide this","Warning","3 mistakes","How I made","Secret","What if I told you","Read this before"];
const HOOK_STARTS_AR = ["ماحدا بيحكيلك هاد","وقف تعمل هيك","7 أسرار","ياريتني عرفت هاد","الحقيقة عن","ليش انت لسا مفلس","هاد غيّر حياتي","اعمل هيك 30 يوم","الأغنياء مخبين هاد","تحذير","3 أخطاء","كيف عملت","سر خطير","لو قلتلك","اقرأ هاد قبل"];
const TOPIC_WORDS_EN = ["money","saving","investing","passive income","side hustle","wealth","stocks","budget","freedom","business","AI money","online income"];
const TOPIC_WORDS_AR = ["الفلوس","التوفير","الاستثمار","الدخل السلبي","شغل إضافي","الثروة","الأسهم","الميزانية","الحرية المالية","المشاريع","مصاري الذكاء الاصطناعي","الدخل أونلاين"];
const HOOK_ENDS_EN = ["in 2026","while you sleep","with $100","in 7 days","from home","with no experience","before 30","everyone ignores","that works","in 2026"];
const HOOK_ENDS_AR = ["بـ 2026","وانت نايم","بـ 100$","بـ 7 أيام","من البيت","بدون خبرة","قبل الـ 30","الكل بيطنشو","اللي بتشتغل","بـ 2026"];
const NUMBERS = ["3","5","7","9","10","11"];

const NICHES = [
  { id: "money", name: "المال 💰" },
  { id: "health", name: "الصحة 🥗" },
  { id: "tech", name: "التقنية 📱" },
  { id: "cooking", name: "الطبخ 🍳" },
];

const TIPS_POOL_EN: Record<string,string[]> = {
  money: ["Start with $100","Save 20% first","Cut 3 subscriptions","One side income","Skills then stocks","Track every dollar","No impulse buys","Emergency fund first","Invest monthly","Learn then earn","Automate savings","Avoid bad debt"],
  health: ["Drink 2L water","Sleep 8 hours","Walk 30 min","No sugar today","Eat more protein","Morning sun","Stretch daily","No phone at night","Eat slow","Breathe deep","Less salt","Move hourly"],
  tech: ["Use AI daily","Learn one tool","Automate tasks","Protect passwords","Backup data","One app a day","No useless apps","Learn prompt","Post daily","Build in public","Use Canva","Sell online"],
  cooking: ["Prep on Sunday","3 ingredients only","Cook in 10 min","Taste while cooking","Sharp knife","Fresh herbs","One pot meal","Freeze leftovers","Season early","Hot pan first","Simple wins","Clean as you go"],
};
const TIPS_POOL_AR: Record<string,string[]> = {
  money: ["ابدأ بـ 100$","وفّر 20% أول","الغي 3 اشتراكات","دخل إضافي واحد","مهارتك بعدين أسهم","راقب كل دولار","بلا مشتريات فجأة","صندوق طوارئ أول","استثمر شهرياً","تعلم بعدين اربح","أتمت التوفير","ابعد عن الديون"],
  health: ["اشرب 2 لتر مي","نام 8 ساعات","امشي 30 دقيقة","بلا سكر اليوم","كل بروتين أكتر","شمس الصبح","تمدد يومياً","بلا تلفون بالليل","كل على مهل","تنفس عميق","ملح أقل","تحرك كل ساعة"],
  tech: ["استخدم الذكاء يومياً","تعلم أداة وحدة","أتمت شغلك","احمي كلمات السر","انسخ بياناتك","تطبيق واحد باليوم","بلا تطبيقات فاضية","تعلم البرومبت","انشر يومياً","ابني قدام الناس","استخدم كانفا","بيع أونلاين"],
  cooking: ["جهز يوم الأحد","3 مكونات بس","اطبخ بـ 10 دقايق","دوق وانت بتطبخ","سكين حاد","أعشاب طازة","طبخة طنجرة وحدة","فرّز الباقي","بهّر بدري","مقلاية سخنة أول","البسيط بيكسب","نضف وانت بتطبخ"],
};

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
  { id: "USA", name: "أمريكا 🇺🇸", city: "New York, USA", time: "7:00 - 9:00 مساءً EST", diff: "أمريكا ورانا بـ 7 ساعات", hashtags: "#USA #America #NewYork #MoneyTips #SideHustle #Investing #PassiveIncome #FinancialFreedom #MakeMoneyOnline #USAMoney #AmericanDream #WealthBuilding #EntrepreneurUSA #FinanceUSA #MoneyMindset" },
  { id: "UK", name: "بريطانيا 🇬🇧", city: "London, UK", time: "6:00 - 8:00 مساءً GMT", diff: "بريطانيا ورانا بـ 2 ساعة", hashtags: "#UK #London #UKMoney #British #MoneyTipsUK #InvestingUK #SideHustleUK #FinancialFreedomUK #MakeMoneyUK #LondonLife #UKEntrepreneur #FinanceUK #WealthUK #MoneyUK" },
  { id: "UAE", name: "الإمارات 🇦🇪", city: "Dubai, UAE", time: "7:00 - 9:00 مساءً", diff: "الإمارات قدامنا بساعة", hashtags: "#الامارات #دبي #ابوظبي #فلوس #استثمار #دخل_اضافي #تجارة #مشاريع #دبي_لايف #المال #ثراء #ريادة_اعمال #الامارات_اليوم #فلوسي" },
  { id: "SA", name: "السعودية 🇸🇦", city: "Riyadh, SA", time: "8:00 - 10:00 مساءً", diff: "السعودية نفس توقيتنا", hashtags: "#السعودية #الرياض #جدة #فلوس #استثمار #دخل_اضافي #تجارة #مشاريع #السعودية_اليوم #المال #ثراء #ريادة_اعمال #رؤية_2030 #فلوسي" },
];

function makeUniqueTopics(isEnglish: boolean, count: number, used: string[]) {
  const starts = isEnglish ? HOOK_STARTS_EN : HOOK_STARTS_AR;
  const words = isEnglish ? TOPIC_WORDS_EN : TOPIC_WORDS_AR;
  const ends = isEnglish ? HOOK_ENDS_EN : HOOK_ENDS_AR;
  const out: string[] = [];
  let guard = 0;
  while (out.length < count && guard < 200) {
    guard++;
    const s = starts[Math.floor(Math.random() * starts.length)];
    const w = words[Math.floor(Math.random() * words.length)];
    const e = ends[Math.floor(Math.random() * ends.length)];
    const n = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    const style = Math.floor(Math.random() * 4);
    let t = "";
    if (style === 0) t = isEnglish ? `${s} about ${w} ${e}` : `${s} عن ${w} ${e}`;
    else if (style === 1) t = isEnglish ? `${n} ways to grow ${w} ${e}` : `${n} طرق لتكبير ${w} ${e}`;
    else if (style === 2) t = isEnglish ? `How to master ${w} ${e}` : `كيف تتقن ${w} ${e}`;
    else t = isEnglish ? `${s}: ${w} ${e}` : `${s}: ${w} ${e}`;
    if (!out.includes(t) && !used.includes(t)) out.push(t);
  }
  return out;
}

export default function Home() {
  const [niche, setNiche] = useState("money");
  const [country, setCountry] = useState("USA");
  const [topics, setTopics] = useState<string[]>([]);
  const [usedTopics, setUsedTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [previewCount, setPreviewCount] = useState(1);
  const [currentTips, setCurrentTips] = useState<string[]>(TIPS_POOL_EN.money.slice(0,5));

  const isEnglish = country === "USA" || country === "UK";
  const currentCountry = COUNTRIES.find(c => c.id === country)!;

  useEffect(() => {
    if (!selectedTopic) return;
    setPreviewCount(1);
    const interval = setInterval(() => {
      setPreviewCount(prev => {
        if (prev >= 5) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [selectedTopic]);

  const pickTips = () => {
    const pool = isEnglish ? TIPS_POOL_EN[niche] : TIPS_POOL_AR[niche];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentTips(shuffled);
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const fresh = makeUniqueTopics(isEnglish, 10, usedTopics);
      setUsedTopics(prev => [...prev, ...fresh].slice(-100));
      setTopics(fresh);
      setSelectedTopic(fresh[0]);
      pickTips();
      setLoading(false);
    }, 500);
  };

  const randomTopic = () => {
    const fresh = makeUniqueTopics(isEnglish, 1, [...usedTopics, ...topics]);
    setUsedTopics(prev => [...prev, ...fresh].slice(-100));
    setSelectedTopic(fresh[0]);
    pickTips();
  };

  const tips = currentTips;

  const caption = isEnglish
    ? `${selectedTopic} 👇\n\nMost people think you need a lot of money to start.\nTruth is: you just need the right steps.\n\nIn this video I break down 5 simple steps you can start TODAY - even if you have $0 experience.\n\nStep 1 will surprise you.\nStep 5 is what rich people never tell you.\n\nSave this video so you don't lose it 📌\nShare it with someone who needs to hear this.\nComment "START" and I'll send you the full guide.\n\nFollow for daily money tips - I post every day at 7PM EST 🔥\n\n.\n.\n.\n${currentCountry.hashtags}\n\n#facebookreels #viralreels #fyp #reels #viral #trending #moneytok`
    : `${selectedTopic} 👇\n\nأغلب الناس بيفكرو انو لازم يكون معك مصاري كتير عشان تبدأ.\nالحقيقة: انت بس محتاج الخطوات الصح.\n\nبهاد الفيديو شرحتلك 5 خطوات بسيطة بتبلش فيهم اليوم - حتى لو خبرتك صفر.\n\nالخطوة 1 راح تفاجئك.\nالخطوة 5 الأغنياء ما بيحكولك ياها.\n\nاحفظ الفيديو عشان ما يضيع منك 📌\nابعته لحدا محتاج يسمع هاد الكلام.\nاكتب "ابدأ" بالتعليقات وببعتلك الدليل الكامل.\n\nتابعني لنصايح يومية عن المال - بنزل كل يوم 🔥\n\n.\n.\n.\n${currentCountry.hashtags}\n\n#ريلز #فيسبوك #ترند #فايرل #مال #فلوس`;

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVideo = async () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(0);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080; canvas.height = 1920;
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = selectedBg.img;
      await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); });
      const drawFrame = (time: number) => {
        ctx.drawImage(img, 0, 0, 1080, 1920);
        const grad = ctx.createLinearGradient(0, 0, 0, 1920);
        grad.addColorStop(0, "rgba(0,0,0,0.75)"); grad.addColorStop(0.5, "rgba(0,0,0,0.4)"); grad.addColorStop(1, "rgba(0,0,0,0.85)");
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 1920);
        const pulse = 1 + Math.sin(time / 180) * 0.03;
        ctx.save();
        ctx.translate(540, 360);
        ctx.scale(pulse, pulse);
        ctx.translate(-540, -360);
        ctx.fillStyle = "white"; ctx.textAlign = "center";
        ctx.font = "900 72px Arial";
        const words = selectedTopic.split(" ");
        let lines: string[] = []; let cur = "";
        words.forEach(w => { if ((cur + " " + w).trim().length > 28) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
        if (cur.trim()) lines.push(cur.trim());
        lines.forEach((line, i) => ctx.fillText(line, 540, 320 + i * 90));
        ctx.restore();
        const visibleCount = Math.min(tips.length, Math.floor(time / 1200) + 1);
        const visibleTips = tips.slice(0, visibleCount);
        visibleTips.forEach((tip, i) => {
          const y = 950 + i * 160;
          ctx.fillStyle = "rgba(255,255,255,0.14)";
          ctx.beginPath(); ctx.roundRect(80, y, 920, 120, 32); ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = "white"; ctx.textAlign = "left"; ctx.font = "900 44px Arial";
          ctx.fillText(`0${i + 1}`, 130, y + 75);
          ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(230, y + 25, 2, 70);
          ctx.font = "600 38px Arial";
          ctx.fillText(tip, 260, y + 75);
        });
        if (visibleCount < 5) {
          ctx.fillStyle = "rgba(250,204,21,0.95)"; ctx.textAlign = "center"; ctx.font = "900 36px Arial";
          const hookText = isEnglish ? "WAIT FOR #5 🔥 IT'S THE BEST" : "استنى النقطة 5 🔥 هي الأقوى";
          ctx.fillText(hookText, 540, 1780);
        }
        ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.textAlign = "center"; ctx.font = "400 28px Arial";
        ctx.fillText("@ yourpage  •  Follow for more", 540, 1840);
        ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.fillRect(0, 1910, 1080, 10);
        ctx.fillStyle = "#22c55e"; ctx.fillRect(0, 1910, 1080 * (time / 10000), 10);
      };
      const stream = (canvas as any).captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      const stopped = new Promise<void>(res => recorder.onstop = () => res());
      recorder.start();
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        drawFrame(elapsed);
        setDownloadProgress(Math.min(100, Math.round(elapsed / 100)));
        if (elapsed < 10000) requestAnimationFrame(tick);
        else recorder.stop();
      };
      requestAnimationFrame(tick);
      await stopped;
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `reel-${Date.now()}.webm`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("صار خطأ بالتحميل - جرب من متصفح Chrome");
    }
    setDownloading(false);
    setDownloadProgress(0);
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
          <p className="text-[11px] text-zinc-500 mt-2 text-center">{isEnglish ? "المحتوى راح يطلع بالانجليزي 🇺🇸" : "المحتوى راح يطلع بالعربي"}</p>
        </div>
        <div className="mb-3">
          <button onClick={generate} className="w-full bg-yellow-400 text-black font-black py-4 rounded-2xl text-[16px] shadow-lg shadow-yellow-400/20 active:scale-[0.98] transition-all">
            {loading ? "جاري التوليد... ⏳" : "✨ ولّد أفكار جديدة"}
          </button>
        </div>
        <div className="flex gap-3 mb-8">
          <button onClick={generate} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🔄 10 أفكار جديدة كلياً</button>
          <button onClick={randomTopic} className="flex-1 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl text-[13px] font-bold hover:bg-zinc-800 transition-all">🎲 فكرة عشوائية جديدة</button>
        </div>
        {topics.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-3">🔥 اختار هوك جديد:</h3>
            <div className="space-y-3">
              {topics.slice(0, 5).map(t => (
                <button key={t} onClick={() => { setSelectedTopic(t); pickTips(); }} dir={isEnglish ? "ltr" : "rtl"}
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
            <div className="flex justify-center mb-5">
              <div className="w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden relative shadow-2xl border border-zinc-700 bg-zinc-900">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <p dir={isEnglish ? "ltr" : "rtl"} className="text-white font-black text-[19px] leading-tight text-center mt-7 drop-shadow-lg animate-pulse">{selectedTopic}</p>
                  <div className="space-y-2.5">
                    {tips.slice(0, previewCount).map((t, i) => (
                      <div key={t} dir={isEnglish ? "ltr" : "rtl"} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
                        <span className="text-white/90 text-[13px] font-black tracking-wider shrink-0 w-7 text-center">0{i + 1}</span>
                        <span className="w-px h-6 bg-white/20 shrink-0"></span>
                        <span className="text-white text-[13px] font-semibold leading-snug text-left">{t}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-zinc-300">@ yourpage • Follow for more</p>
                </div>
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur text-[10px] px-2.5 py-1 rounded-full">10 ثواني</span>
              </div>
            </div>
            <button onClick={downloadVideo} disabled={downloading} className="w-full bg-green-500 font-black py-4 rounded-2xl mb-2 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all disabled:opacity-70">
              {downloading ? `⏳ جاري توليد الفيديو... ${downloadProgress}%` : "⬇️ تحميل فيديو - 10 ثواني"}
            </button>
            {downloading && (
              <div className="w-full h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${downloadProgress}%` }} />
              </div>
            )}
            {!downloading && <div className="h-6 mb-2" />}
            <p className="text-[11px] text-zinc-500 text-center -mt-2 mb-6">الفيديو بينزل بصيغة .webm - فيسبوك بيقبلها عادي ✅<br/>اذا بدك MP4 - حوله من موقع cloudconvert.com</p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
              <h4 className="font-bold mb-3">📝 الكابشن + الهاشتاغات</h4>
              <p dir={isEnglish ? "ltr" : "rtl"} className="text-[13px] text-zinc-300 whitespace-pre-line leading-relaxed text-left">{caption}</p>
              <button onClick={copyCaption} className="w-full bg-green-600 py-4 rounded-2xl mt-4 font-bold text-[15px] active:scale-[0.98] transition-all shadow-lg shadow-green-600/20">
                {copied ? "✅ تم النسخ! الصقو بفيسبوك" : "📋 نسخ الكابشن + الهاشتاغات"}
              </button>
              <p className="text-[11px] text-zinc-500 mt-3 text-center">الهاشتاغات مستهدفة لـ {currentCountry.city} 🎯</p>
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
