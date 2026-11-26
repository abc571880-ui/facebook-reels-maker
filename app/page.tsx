"use client";
import { useState, useEffect, useRef } from "react";

const HOOK_STARTS_EN = ["Nobody tells you this","Stop doing this","I wish I knew this","The truth about","Why you're still broke","This changed my life","Do this for 30 days","The rich hide this","Warning","What if I told you","Read this before"];
const HOOK_STARTS_AR = ["ماحدا بيحكيلك هاد","وقف تعمل هيك","ياريتني عرفت هاد","الحقيقة عن","ليش انت لسا مفلس","هاد غيّر حياتي","اعمل هيك 30 يوم","الأغنياء مخبين هاد","تحذير","لو قلتلك","اقرأ هاد قبل"];
const TOPIC_WORDS_EN = ["your savings","your money","your wealth","your budget","your income","your investments","your side hustle","your financial freedom"];
const TOPIC_WORDS_AR = ["مدخراتك","فلوسك","ثروتك","ميزانيتك","دخلك","استثماراتك","شغلك الإضافي","حريتك المالية"];
const HOOK_ENDS_EN = ["in 2026","while you sleep","with $100","in 7 days","from home","with no experience","before 30","that everyone ignores","that actually works"];
const HOOK_ENDS_AR = ["بـ 2026","وانت نايم","بـ 100$","بـ 7 أيام","من البيت","بدون خبرة","قبل الـ 30","الكل بيطنشها","اللي بتشتغل فعلاً"];

const NICHES = [
  { id: "money", name: "المال 💰" },
  { id: "health", name: "الصحة 🥗" },
  { id: "tech", name: "التقنية 📱" },
  { id: "cooking", name: "الطبخ 🍳" },
];

const TIPS_BY_TOPIC_EN: Record<string,string[]> = {
  savings: ["Save 20% first","Automate savings","Cut 3 subscriptions","No impulse buys","Emergency fund first","Track every dollar"],
  money: ["Start with $100","One side income","Learn then earn","Avoid bad debt","Invest monthly","Skills then stocks"],
  wealth: ["Invest monthly","Skills then stocks","Learn then earn","Avoid bad debt","Build assets","Think long term"],
  budget: ["Track every dollar","Cut 3 subscriptions","No impulse buys","Plan weekly","Save 20% first","Cash only"],
  income: ["One side income","Sell a skill","Learn then earn","Post daily","Build audience","Automate sales"],
  investments: ["Start with $100","Invest monthly","Learn then earn","Think long term","Diversify","Start early"],
  hustle: ["One side income","Sell a skill","Post daily","Learn then earn","Build audience","Start small"],
  freedom: ["Passive income first","Invest monthly","Automate savings","Build assets","Think long term","Avoid bad debt"],
  default: ["Start with $100","Save 20% first","Cut 3 subscriptions","One side income","Skills then stocks","Track every dollar"],
};
const TIPS_BY_TOPIC_AR: Record<string,string[]> = {
  savings: ["وفّر 20% أول","أتمت التوفير","الغي 3 اشتراكات","بلا مشتريات فجأة","صندوق طوارئ أول","راقب كل دولار"],
  money: ["ابدأ بـ 100$","دخل إضافي واحد","تعلم بعدين اربح","ابعد عن الديون","استثمر شهرياً","مهارتك بعدين أسهم"],
  wealth: ["استثمر شهرياً","مهارتك بعدين أسهم","تعلم بعدين اربح","ابعد عن الديون","ابني أصول","فكّر لبعيد"],
  budget: ["راقب كل دولار","الغي 3 اشتراكات","بلا مشتريات فجأة","خطط أسبوعياً","وفّر 20% أول","كاش بس"],
  income: ["دخل إضافي واحد","بيع مهارة","تعلم بعدين اربح","انشر يومياً","ابني جمهور","أتمت المبيعات"],
  investments: ["ابدأ بـ 100$","استثمر شهرياً","تعلم بعدين اربح","فكّر لبعيد","نوّع استثماراتك","ابدأ بدري"],
  hustle: ["دخل إضافي واحد","بيع مهارة","انشر يومياً","تعلم بعدين اربح","ابني جمهور","ابدأ صغير"],
  freedom: ["دخل سلبي أول","استثمر شهرياً","أتمت التوفير","ابني أصول","فكّر لبعيد","ابعد عن الديون"],
  default: ["ابدأ بـ 100$","وفّر 20% أول","الغي 3 اشتراكات","دخل إضافي واحد","مهارتك بعدين أسهم","راقب كل دولار"],
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
    const style = Math.floor(Math.random() * 4);
    let t = "";
    if (style === 0) t = isEnglish ? `5 ways to grow ${w} ${e}` : `5 طرق لتكبير ${w} ${e}`;
    else if (style === 1) t = isEnglish ? `5 secrets about ${w} ${e}` : `5 أسرار عن ${w} ${e}`;
    else if (style === 2) t = isEnglish ? `${s} - 5 steps for ${w}` : `${s} - 5 خطوات لـ ${w}`;
    else t = isEnglish ? `How to master ${w} in 5 steps ${e}` : `كيف تتقن ${w} بـ 5 خطوات ${e}`;
    if (!out.includes(t) && !used.includes(t)) out.push(t);
  }
  return out;
}

function getTipsForTopic(topic: string, isEnglish: boolean) {
  const map = isEnglish ? TIPS_BY_TOPIC_EN : TIPS_BY_TOPIC_AR;
  const lower = topic.toLowerCase();
  let key = "default";
  if (lower.includes("saving") || topic.includes("مدخرات")) key = "savings";
  else if (lower.includes("wealth") || topic.includes("ثروت")) key = "wealth";
  else if (lower.includes("budget") || topic.includes("ميزاني")) key = "budget";
  else if (lower.includes("income") || topic.includes("دخل")) key = "income";
  else if (lower.includes("invest") || topic.includes("استثمار")) key = "investments";
  else if (lower.includes("hustle") || topic.includes("إضافي")) key = "hustle";
  else if (lower.includes("freedom") || topic.includes("حرية")) key = "freedom";
  else if (lower.includes("money") || topic.includes("فلوس")) key = "money";
  const pool = map[key] || map.default;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
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
  const [currentTips, setCurrentTips] = useState<string[]>(TIPS_BY_TOPIC_EN.default.slice(0,5));
  const [displayTips, setDisplayTips] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const timeoutRef = useRef<any>(null);

  const isEnglish = country === "USA" || country === "UK";
  const currentCountry = COUNTRIES.find(c => c.id === country)!;

  const startTypingPreview = (tipsToType: string[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayTips([]);
    setTypingIndex(-1);
    let tipIdx = 0;
    let charIdx = 0;
    let current: string[] = [];
    const typeNext = () => {
      if (tipIdx >= tipsToType.length) { setTypingIndex(-1); return; }
      const full = tipsToType[tipIdx];
      if (charIdx === 0) {
        setTypingIndex(tipIdx);
        current = [...current, ""];
        setDisplayTips([...current]);
      }
      charIdx++;
      current[tipIdx] = full.slice(0, charIdx);
      setDisplayTips([...current]);
      if (charIdx < full.length) {
        timeoutRef.current = setTimeout(typeNext, 110);
      } else {
        tipIdx++;
        charIdx = 0;
        timeoutRef.current = setTimeout(typeNext, 400);
      }
    };
    timeoutRef.current = setTimeout(typeNext, 500);
  };

  useEffect(() => {
    if (selectedTopic && currentTips.length) startTypingPreview(currentTips);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [selectedTopic, currentTips]);

  const pickTips = (topic: string) => {
    const t = getTipsForTopic(topic, isEnglish);
    setCurrentTips(t);
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const fresh = makeUniqueTopics(isEnglish, 10, usedTopics);
      setUsedTopics(prev => [...prev, ...fresh].slice(-100));
      setTopics(fresh);
      setSelectedTopic(fresh[0]);
      pickTips(fresh[0]);
      setLoading(false);
    }, 500);
  };

  const randomTopic = () => {
    const fresh = makeUniqueTopics(isEnglish, 1, [...usedTopics, ...topics]);
    setUsedTopics(prev => [...prev, ...fresh].slice(-100));
    setSelectedTopic(fresh[0]);
    pickTips(fresh[0]);
  };

  const tips = currentTips;

  const caption = isEnglish
    ? `${selectedTopic} 👇\n\nMost people think you need a lot of money to start.\nTruth is: you just need the right steps.\n\nIn this video I break down 5 simple steps you can start TODAY - even if you have $0 experience.\n\n${tips.map((t,i)=>`Step ${i+1}: ${t}`).join("\n")}\n\nSave this video so you don't lose it 📌\nShare it with someone who needs to hear this.\nComment "START" and I'll send you the full guide.\n\nFollow for daily money tips - I post every day at 7PM EST 🔥\n\n.\n.\n.\n${currentCountry.hashtags}\n\n#facebookreels #viralreels #fyp #reels #viral #trending #moneytok`
    : `${selectedTopic} 👇\n\nأغلب الناس بيفكرو انو لازم يكون معك مصاري كتير عشان تبدأ.\nالحقيقة: انت بس محتاج الخطوات الصح.\n\nبهاد الفيديو شرحتلك 5 خطوات بسيطة بتبلش فيهم اليوم - حتى لو خبرتك صفر.\n\n${tips.map((t,i)=>`الخطوة ${i+1}: ${t}`).join("\n")}\n\nاحفظ الفيديو عشان ما يضيع منك 📌\nابعته لحدا محتاج يسمع هاد الكلام.\nاكتب "ابدأ" بالتعليقات وببعتلك الدليل الكامل.\n\nتابعني لنصايح يومية عن المال - بنزل كل يوم 🔥\n\n.\n.\n.\n${currentCountry.hashtags}\n\n#ريلز #فيسبوك #ترند #فايرل #مال #فلوس`;

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

      // ===== الرسم - نسخة مصلحة: كتابة بيضاء صلبة + صندوق أسود صلب =====
      const drawFrame = (time: number) => {
        // 1. الصورة
        ctx.drawImage(img, 0, 0, 1080, 1920);

        // 2. تظليل خفيف فقط
        const grad = ctx.createLinearGradient(0, 0, 0, 1920);
        grad.addColorStop(0, "rgba(0,0,0,0.45)");
        grad.addColorStop(0.5, "rgba(0,0,0,0.35)");
        grad.addColorStop(1, "rgba(0,0,0,0.55)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1080, 1920);

        // 3. العنوان - أبيض صلب + صندوق أسود صلب
        const words = selectedTopic.split(" ");
        let lines: string[] = [];
        let cur = "";
        words.forEach(w => {
          const test = (cur + " " + w).trim();
          if (test.length > 20) { if (cur.trim()) lines.push(cur.trim()); cur = w; }
          else cur = test;
        });
        if (cur.trim()) lines.push(cur.trim());
        if (lines.length > 3) lines = lines.slice(0, 3);
        const titleHeight = lines.length * 84 + 56;
        // صندوق أسود صلب - fillRect مش roundRect
        ctx.fillStyle = "#000000";
        ctx.fillRect(40, 170, 1000, titleHeight);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 170, 1000, titleHeight);
        ctx.textAlign = "center";
        ctx.font = "900 58px Arial, sans-serif";
        lines.forEach((line, i) => {
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 10;
          ctx.lineJoin = "round";
          ctx.strokeText(line, 540, 260 + i * 84);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(line, 540, 260 + i * 84);
          // طبقة تانية بيضاء عشان تكون أوضح
          ctx.fillText(line, 540, 260 + i * 84);
        });

        // 4. النقاط - كلها بيضاء صلبة
        const TIME_PER_TIP = 2000;
        const MS_PER_CHAR = 90;
        tips.forEach((tip, i) => {
          const startTime = i * TIME_PER_TIP;
          if (time < startTime) return;
          const timeInTip = time - startTime;
          const charsToShow = Math.min(tip.length, Math.floor(timeInTip / MS_PER_CHAR));
          let display = tip.slice(0, charsToShow);
          const isTyping = charsToShow < tip.length;
          const blink = Math.floor(time / 300) % 2 === 0;
          if (isTyping && blink) display += "|";
          const y = 920 + i * 165;

          // صندوق أسود صلب 100% - #000000
          ctx.fillStyle = "#000000";
          ctx.fillRect(40, y, 1000, 132);
          // حد أبيض
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 3;
          ctx.strokeRect(40, y, 1000, 132);

          // الرقم 01 - أبيض
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "left";
          ctx.font = "900 54px Arial, sans-serif";
          ctx.fillText(`0${i + 1}`, 85, y + 84);
          ctx.fillText(`0${i + 1}`, 85, y + 84);

          // خط فاصل أبيض
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(195, y + 28, 4, 76);

          // نص النقطة - أبيض نقي
          ctx.font = "900 42px Arial, sans-serif";
          ctx.textAlign = "left";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.lineJoin = "round";
          ctx.strokeText(display, 225, y + 84);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(display, 225, y + 84);
          // طبقة تانية بيضاء - هاد اللي بخليها صلبة مش شفافة
          ctx.fillText(display, 225, y + 84);
        });

        // 5. نص التحفيز - أبيض
        const finishedCount = Math.min(5, Math.floor(time / TIME_PER_TIP) + 1);
        if (finishedCount < 5) {
          const hookText = isEnglish ? "WAIT FOR #5 - IT'S THE BEST" : "استنى النقطة 5 - هي الأقوى";
          ctx.fillStyle = "#000000";
          ctx.fillRect(120, 1740, 840, 72);
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2;
          ctx.strokeRect(120, 1740, 840, 72);
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.font = "900 36px Arial, sans-serif";
          ctx.fillText(hookText, 540, 1786);
          ctx.fillText(hookText, 540, 1786);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "700 28px Arial, sans-serif";
        ctx.fillText("@ yourpage  •  Follow for more", 540, 1862);

        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fillRect(0, 1910, 1080, 10);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 1910, 1080 * (time / 10000), 10);
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
                <button key={t} onClick={() => { setSelectedTopic(t); pickTips(t); }} dir={isEnglish ? "ltr" : "rtl"}
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
                    <span className="absolute bottom-1.5 right-1.5 left-1.5 bg-black text-[10px] py-1 rounded-lg font-bold">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <h3 className="font-bold text-[15px] mb-3">✍️ المعاينة - شوف كيف بتنكتب:</h3>
              <div className="space-y-2 min-h-[140px]">
                {displayTips.map((t,i) => (
                  <div key={i} className={`flex gap-2 items-center text-[13px] p-2 rounded-xl ${typingIndex === i ? "bg-white/10 border border-white/40" : ""}`}>
                    <span className="bg-white text-black font-black w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0">{i+1}</span>
                    <span className="text-white font-bold">{t}{typingIndex === i && <span className="text-white animate-pulse text-[16px]">|</span>}</span>
                  </div>
                ))}
                {displayTips.length === 0 && <p className="text-zinc-500 text-[12px]">جاري الكتابة... ⌨️</p>}
              </div>
              <button onClick={() => startTypingPreview(currentTips)} className="w-full bg-zinc-800 py-2.5 rounded-xl text-[12px] font-bold mt-3">↻ إعادة الكتابة من الأول - شوفها بتنكتب</button>
            </div>

            {/* المعاينة - صندوق أسود صلب + كتابة بيضاء */}
            <div className="flex justify-center mb-5">
              <div className="w-[280px] aspect-[9/16] rounded-[28px] overflow-hidden relative shadow-2xl border border-zinc-700 bg-black">
                <img src={selectedBg.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="bg-black border border-white rounded-2xl p-3 mt-6 shadow-xl">
                    <p dir={isEnglish ? "ltr" : "rtl"} className="text-white font-black text-[19px] leading-tight text-center [text-shadow:0_2px_6px_rgba(0,0,0,1)]">{selectedTopic}</p>
                  </div>
                  <div className="space-y-2.5">
                    {displayTips.map((t, i) => (
                      <div key={i} dir={isEnglish ? "ltr" : "rtl"} className={`flex items-center gap-3 bg-black rounded-2xl px-4 py-3 shadow-xl ${typingIndex === i ? "border-2 border-white" : "border border-white/80"}`}>
                        <span className="text-white text-[13px] font-black tracking-wider shrink-0 w-7 text-center">0{i + 1}</span>
                        <span className="w-px h-6 bg-white shrink-0"></span>
                        <span className="text-white text-[13px] font-bold leading-snug text-left [text-shadow:0_2px_4px_rgba(0,0,0,1)]">{t}{typingIndex === i && <span className="text-white animate-pulse">|</span>}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-white font-bold [text-shadow:0_1px_3px_rgba(0,0,0,1)]">@ yourpage • Follow for more</p>
                </div>
                <span className="absolute top-3 left-3 bg-black text-[10px] font-bold px-2.5 py-1 rounded-full">10 ثواني</span>
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
