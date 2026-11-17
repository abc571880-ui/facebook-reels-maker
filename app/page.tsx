"use client";
import { useState } from "react";

const NICHES = [
  { id: "money", name: "المال 💰",
    en: ["How to build a side business with $100","How to invest $100 and grow it","How to make $1000 extra every month","How to start investing with no experience","How to turn your salary into wealth","How to build passive income from zero","How to save $10000 in one year","How to make money while you sleep","How to start a business with no money","How to invest in stocks for beginners","How to escape the 9-5 job","How to build wealth in your 20s","How to make your first $1000 online","How to grow $500 into $5000","How to stop living paycheck to paycheck"],
    ar: ["كيف تبني شغل إضافي بـ 100$","كيف تستثمر 100$ وتكبرهم","كيف تعمل 1000$ زيادة كل شهر","كيف تبدأ تستثمر بدون خبرة","كيف تحوّل راتبك لثروة","كيف تبني دخل سلبي من الصفر","كيف توفّر 10000$ بسنة وحدة","كيف تعمل مصاري وانت نايم","كيف تبدأ مشروع بدون مصاري","كيف تستثمر بالأسهم للمبتدئين","كيف تهرب من وظيفة 9-5","كيف تبني ثروة بعمر العشرين","كيف تعمل أول 1000$ أونلاين","كيف تحوّل 500$ لـ 5000$","كيف تبطل تعيش من راتب لراتب"] },
  { id: "health", name: "الصحة 🥗",
    en: ["How to lose belly fat in 30 days","How to sleep better tonight","How to gain energy in 7 days","How to eat healthy on a budget","How to build a morning routine that works","How to stop sugar cravings","How to lose 10kg without gym","How to fix your back pain at home","How to live longer - 5 simple habits","How to boost your immune system"],
    ar: ["كيف تنحف بطنك بـ 30 يوم","كيف تنام أحسن الليلة","كيف تزيد طاقتك بـ 7 أيام","كيف تاكل صحي بميزانية قليلة","كيف تبني روتين صباحي ناجح","كيف توقف اشتهاء السكر","كيف تخسر 10 كيلو بدون جيم","كيف تعالج وجع ظهرك بالبيت","كيف تعيش أطول - 5 عادات بسيطة","كيف تقوي مناعتك"] },
  { id: "tech", name: "التقنية 📱",
    en: ["How to make money with AI in 2026","How to use ChatGPT to make money","How to start a faceless YouTube channel","How to protect your phone from hackers","How to make $500 with your phone","How to learn AI in 7 days","How to automate your work with AI","How to build an app with no code","How to grow on TikTok in 2026","How to make money with Canva"],
    ar: ["كيف تعمل مصاري بالذكاء الاصطناعي 2026","كيف تستخدم شات جي بي تي لتعمل مصاري","كيف تبدأ قناة يوتيوب بدون وجه","كيف تحمي تلفونك من الهكر","كيف تعمل 500$ من تلفونك","كيف تتعلم الذكاء الاصطناعي بـ 7 أيام","كيف تأتمت شغلك بالذكاء الاصطناعي","كيف تبني تطبيق بدون برمجة","كيف تكبر على تيك توك 2026","كيف تعمل مصاري من كانفا"] },
  { id: "cooking", name: "الطبخ 🍳",
    en: ["How to cook a full dinner in 10 minutes","How to make crispy chicken at home","How to cook perfect rice every time","How to make pasta like Italians","How to meal prep for the whole week","How to make healthy breakfast in 5 minutes","How to bake bread with 3 ingredients","How to make restaurant food at home"],
    ar: ["كيف تطبخ عشا كامل بـ 10 دقايق","كيف تعمل دجاج مقرمش بالبيت","كيف تطبخ رز مظبوط كل مرة","كيف تعمل باستا زي الطليان","كيف تجهز أكل الأسبوع كامل","كيف تعمل فطور صحي بـ 5 دقايق","كيف تخبز خبز بـ 3 مكونات","كيف تعمل أكل مطاعم بالبيت"] },
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
  { id: "USA", name: "أمريكا 🇺🇸", city: "New York, USA", time: "7:00 - 9:00 مساءً EST", diff: "أمريكا ورانا بـ 7 ساعات", hashtags: "#USA #America #NewYork #MoneyTips #SideHustle #Investing #PassiveIncome #FinancialFreedom #MakeMoneyOnline #USAMoney #AmericanDream #WealthBuilding #EntrepreneurUSA #FinanceUSA #MoneyMindset" },
  { id: "UK", name: "بريطانيا 🇬🇧", city: "London, UK", time: "6:00 - 8:00 مساءً GMT", diff: "بريطانيا ورانا بـ 2 ساعة", hashtags: "#UK #London #UKMoney #British #MoneyTipsUK #InvestingUK #SideHustleUK #FinancialFreedomUK #MakeMoneyUK #LondonLife #UKEntrepreneur #FinanceUK #WealthUK #MoneyUK" },
  { id: "UAE", name: "الإمارات 🇦🇪", city: "Dubai, UAE", time: "7:00 - 9:00 مساءً", diff: "الإمارات قدامنا بساعة", hashtags: "#الامارات #دبي #ابوظبي #فلوس #استثمار #دخل_اضافي #تجارة #مشاريع #دبي_لايف #المال #ثراء #ريادة_اعمال #الامارات_اليوم #فلوسي" },
  { id: "SA", name: "السعودية 🇸🇦", city: "Riyadh, SA", time: "8:00 - 10:00 مساءً", diff: "السعودية نفس توقيتنا", hashtags: "#السعودية #الرياض #جدة #فلوس #استثمار #دخل_اضافي #تجارة #مشاريع #السعودية_اليوم #المال #ثراء #ريادة_اعمال #رؤية_2030 #فلوسي" },
];

export default function Home() {
  const [niche, setNiche] = useState("money");
  const [country, setCountry] = useState("USA");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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
        ctx.fillStyle = "white"; ctx.textAlign = "center";
        ctx.font = "900 72px Arial";
        const words = selectedTopic.split(" ");
        let lines: string[] = []; let cur = "";
        words.forEach(w => { if ((cur + " " + w).trim().length > 28) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
        if (cur.trim()) lines.push(cur.trim());
        const titleY = 320 + Math.min(time * 0.05, 30) - 30;
        lines.forEach((line, i) => ctx.fillText(line, 540, titleY + i * 90));
        tips.forEach((tip, i) => {
          const y = 950 + i * 160;
          ctx.fillStyle = "rgba(255,255,255,0.14)";
          ctx.beginPath(); ctx.roundRect(80, y, 920, 120, 32); ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = "white"; ctx.textAlign = "left"; ctx.font = "900 44px Arial";
          ctx.fillText(`0${i + 1}`, 130, y + 75);
          ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(230, y + 25, 2, 70);
          ctx.font = "600 38px Arial";
          let t = tip; if (t.length > 32) t = t.slice(0, 32);
          ctx.fillText(t, 260, y + 75);
        });
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

            <div className="flex justify-center mb-5">
              <div className="w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden relative shadow-2xl border border-zinc-700 bg-zinc-900">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <p dir={isEnglish ? "ltr" : "rtl"} className="text-white font-black text-[19px] leading-tight text-center mt-7 drop-shadow-lg">{selectedTopic}</p>
                  <div className="space-y-2.5">
                    {tips.map((t, i) => (
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
              {/* زر واحد - بينسخ كلشي */}
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
