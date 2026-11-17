"use client";
import { useState, useRef, useEffect, useMemo } from "react";

const NICHES = [
  { id: "المال 💰", label: "المال 💰", grad: "linear-gradient(135deg,#f59e0b,#ef4444)", glow: "0 6px 20px rgba(245,158,11,.45)" },
  { id: "التحفيز 🔥", label: "التحفيز 🔥", grad: "linear-gradient(135deg,#ef4444,#f97316)", glow: "0 6px 20px rgba(239,68,68,.45)" },
  { id: "اللياقة 🏋️", label: "اللياقة 🏋️", grad: "linear-gradient(135deg,#22c55e,#16a34a)", glow: "0 6px 20px rgba(34,197,94,.45)" },
  { id: "الطبخ 🍳", label: "الطبخ 🍳", grad: "linear-gradient(135deg,#f97316,#eab308)", glow: "0 6px 20px rgba(249,115,22,.45)" },
  { id: "التقنية 💻", label: "التقنية 💻", grad: "linear-gradient(135deg,#3b82f6,#8b5cf6)", glow: "0 6px 20px rgba(59,130,246,.45)" },
  { id: "السفر ✈️", label: "السفر ✈️", grad: "linear-gradient(135deg,#06b6d4,#3b82f6)", glow: "0 6px 20px rgba(6,182,212,.45)" },
  { id: "الجمال 💄", label: "الجمال 💄", grad: "linear-gradient(135deg,#ec4899,#a855f7)", glow: "0 6px 20px rgba(236,72,153,.45)" },
  { id: "التعليم 📚", label: "التعليم 📚", grad: "linear-gradient(135deg,#6366f1,#06b6d4)", glow: "0 6px 20px rgba(99,102,241,.45)" },
];
const COUNTRIES = ["USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Australia 🇦🇺", "UAE 🇦🇪", "Saudi 🇸🇦"];
const VIDEO_DURATION = 20;

const POSTING_GUIDE: Record<string, { flag: string; countryName: string; timezone: string; timezoneDiff: string; bestTimes: string[]; bestDays: string; location: string; locationHow: string; captionTip: string; extraTip: string }> = {
  "USA 🇺🇸": { flag: "🇺🇸", countryName: "أمريكا", timezone: "بتوقيت نيويورك EST", timezoneDiff: "فرق التوقيت عنا: أمريكا ورانا بـ 7 ساعات", bestTimes: ["7:00 - 9:00 مساءً EST 🔥 أفضل وقت", "12:00 - 1:00 ظهراً EST", "9:00 - 10:00 صباحاً EST"], bestDays: "الجمعة - السبت - الأحد", location: "New York, USA", locationHow: "لما تنشر الريلز على الفيس → اضغط Add Location → اكتب New York → اختار New York, USA", captionTip: "انشر بالانجليزي - وحط أول سطر هو الهوك", extraTip: "لا تنشر أكتر من 2 ريلز باليوم" },
  "UK 🇬🇧": { flag: "🇬🇧", countryName: "بريطانيا", timezone: "بتوقيت لندن GMT", timezoneDiff: "فرق التوقيت عنا: بريطانيا ورانا بـ ساعتين", bestTimes: ["6:00 - 8:00 مساءً GMT 🔥 أفضل وقت", "12:00 - 1:00 ظهراً GMT", "8:00 - 9:00 صباحاً GMT"], bestDays: "الخميس - الجمعة - الأحد", location: "London, UK", locationHow: "لما تنشر الريلز → Add Location → اكتب London → اختار London, UK", captionTip: "البريطانيين بيحبوا اللهجة البريطانية", extraTip: "الريلز الطويلة بتنتشر أكتر ببريطانيا" },
  "Canada 🇨🇦": { flag: "🇨🇦", countryName: "كندا", timezone: "بتوقيت تورنتو EST", timezoneDiff: "فرق التوقيت عنا: كندا ورانا بـ 7 ساعات", bestTimes: ["7:00 - 9:00 مساءً EST 🔥 أفضل وقت", "12:00 ظهراً EST", "8:00 صباحاً EST"], bestDays: "الجمعة - السبت - الأحد", location: "Toronto, Canada", locationHow: "لما تنشر الريلز → Add Location → اكتب Toronto → اختار Toronto, Canada", captionTip: "انشر بالانجليزي", extraTip: "حط هاشتاغ #canada" },
  "Australia 🇦🇺": { flag: "🇦🇺", countryName: "أستراليا", timezone: "بتوقيت سيدني AEST", timezoneDiff: "فرق التوقيت عنا: أستراليا قدامنا بـ 8 ساعات", bestTimes: ["7:00 - 9:00 مساءً AEST 🔥 أفضل وقت", "12:00 ظهراً AEST", "7:00 صباحاً AEST"], bestDays: "السبت - الأحد - الاثنين", location: "Sydney, Australia", locationHow: "لما تنشر الريلز → Add Location → اكتب Sydney → اختار Sydney, Australia", captionTip: "انشر بالانجليزي", extraTip: "انشر الصبح عنا - عشان يكون المسا عندهم" },
  "UAE 🇦🇪": { flag: "🇦🇪", countryName: "الإمارات", timezone: "بتوقيت دبي GST", timezoneDiff: "فرق التوقيت عنا: الإمارات قدامنا بساعة وحدة", bestTimes: ["8:00 - 10:00 مساءً GST 🔥 أفضل وقت", "1:00 - 2:00 ظهراً GST", "9:00 - 10:00 صباحاً GST"], bestDays: "الخميس - الجمعة - السبت", location: "Dubai, UAE", locationHow: "لما تنشر الريلز → Add Location → اكتب Dubai → اختار Dubai, UAE", captionTip: "انشر بالعربي أو انجليزي", extraTip: "يوم الجمعة بعد صلاة الجمعة - أفضل وقت" },
  "Saudi 🇸🇦": { flag: "🇸🇦", countryName: "السعودية", timezone: "بتوقيت الرياض AST", timezoneDiff: "فرق التوقيت عنا: السعودية نفس توقيتنا تقريباً", bestTimes: ["8:00 - 11:00 مساءً AST 🔥 أفضل وقت", "1:00 - 2:00 ظهراً AST", "9:00 - 10:00 صباحاً AST"], bestDays: "الخميس - الجمعة - السبت", location: "Riyadh, Saudi Arabia", locationHow: "لما تنشر الريلز → Add Location → اكتب Riyadh → اختار Riyadh, Saudi Arabia", captionTip: "انشر بالعربي السعودي", extraTip: "بعد صلاة العشاء - الناس كلها ماسكة تلفونها" },
};

const FALLBACK_TOPICS: Record<string, string[]> = {
  "المال 💰": ["How I saved $500 in 30 days with the 50/30/20 rule", "3 subscriptions stealing $30 from you every month", "How to start investing with $100 using Trading 212", "Why your salary disappears in 10 days - fix it with 1 account", "5 side incomes you can start tonight from your phone"],
  "التحفيز 🔥": ["Wake up at 5AM for 21 days - what happens to your brain", "Delete 3 apps today and your focus doubles in 7 days", "The 2-minute rule that kills procrastination forever", "How I built a habit in 21 days with 1 trick", "Stop checking your phone first thing - do this instead"],
  "اللياقة 🏋️": ["Do 3 sets of 12 push-ups 3 times a week - chest change in 21 days", "Lose 5kg in 30 days with this 20-minute home workout", "Why your muscles don't grow - you miss 80g protein daily", "Best 5-minute ab workout - no equipment needed", "Walk 10,000 steps daily - what happens in 14 days"],
  "الطبخ 🍳": ["Add 1 spoon of vinegar to rice - fluffy rice every time", "Best pasta in 10 minutes with 3 ingredients only", "How to make burger like restaurants - secret sauce recipe", "Make cafe coffee at home with 1 trick - save $100 a month", "5 healthy meals under $5 - full week plan"],
  "التقنية 💻": ["5 AI apps that save you 5 hours a week - free", "Delete these 3 apps - they steal your data", "3 iPhone settings you must turn off today", "How to make money with ChatGPT - 3 real methods", "Protect your account in 2 minutes - turn on this setting"],
  "السفر ✈️": ["Book flights at half price - use this trick on Tuesday", "Cheapest 5 countries to travel for $500 - full plan", "How I traveled Europe for $30 a day - exact budget", "5 mistakes every beginner traveler makes - avoid them", "Pack for 7 days in 1 backpack - exact list"],
  "الجمال 💄": ["My skin changed in 14 days with this 3-step routine", "5 mistakes ruining your skin - stop number 3 today", "Grow your hair faster - 1 oil, 2 times a week", "Daily makeup in 5 minutes - exact products", "Korean glass skin - 3 products only, under $20"],
  "التعليم 📚": ["Study 25 minutes, break 5 - focus doubles instantly", "Memorize anything with this 1 technique - used by top students", "How to learn English in 30 days - 20 minutes daily plan", "Stop procrastinating - use the 2-minute rule today", "Get full marks - study smart with active recall, not re-reading"],
};

const BACKGROUNDS_BY_NICHE: Record<string, { id: string; name: string; image: string }[]> = {
  "اللياقة 🏋️": [
    { id: "gym-1", name: "🏋️ جيم - أثقال", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080&q=80&auto=format&fit=crop" },
    { id: "gym-2", name: "🏃 جري - طاقة", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1080&q=80&auto=format&fit=crop" },
    { id: "gym-3", name: "💪 عضلات - تمرين", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&q=80&auto=format&fit=crop" },
    { id: "gym-4", name: "🧘 يوغا - هدوء", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1080&q=80&auto=format&fit=crop" },
    { id: "gym-5", name: "🥊 بوكس - قوة", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1080&q=80&auto=format&fit=crop" },
  ],
  "الطبخ 🍳": [
    { id: "food-1", name: "🍝 باستا - إيطالي", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1080&q=80&auto=format&fit=crop" },
    { id: "food-2", name: "🍔 برجر - سريع", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080&q=80&auto=format&fit=crop" },
    { id: "food-3", name: "🍕 بيتزا - فرن", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1080&q=80&auto=format&fit=crop" },
    { id: "food-4", name: "🥗 سلطة - صحي", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1080&q=80&auto=format&fit=crop" },
    { id: "food-5", name: "🍰 كيك - حلو", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1080&q=80&auto=format&fit=crop" },
  ],
  "المال 💰": [
    { id: "money-1", name: "💵 فلوس - دولارات", image: "https://images.unsplash.com/photo-1554672408-730436b60dde?w=1080&q=80&auto=format&fit=crop" },
    { id: "money-2", name: "🏙️ مدينة - أعمال", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1080&q=80&auto=format&fit=crop" },
    { id: "money-3", name: "📈 أسهم - صعود", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1080&q=80&auto=format&fit=crop" },
    { id: "money-4", name: "🏦 بنك - استثمار", image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1080&q=80&auto=format&fit=crop" },
    { id: "money-5", name: "💰 ذهب - ثروة", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1080&q=80&auto=format&fit=crop" },
  ],
  "التحفيز 🔥": [
    { id: "mot-1", name: "🔥 نار - طاقة", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080&q=80&auto=format&fit=crop" },
    { id: "mot-2", name: "⛰️ قمة جبل - نجاح", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=80&auto=format&fit=crop" },
    { id: "mot-3", name: "🌅 شروق - بداية", image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1080&q=80&auto=format&fit=crop" },
    { id: "mot-4", name: "🚀 صاروخ - انطلاق", image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=1080&q=80&auto=format&fit=crop" },
    { id: "mot-5", name: "🏆 كأس - فوز", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1080&q=80&auto=format&fit=crop" },
  ],
  "التقنية 💻": [
    { id: "tech-1", name: "💻 لابتوب - كود", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&q=80&auto=format&fit=crop" },
    { id: "tech-2", name: "📱 تلفون - تطبيقات", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1080&q=80&auto=format&fit=crop" },
    { id: "tech-3", name: "🤖 روبوت - AI", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1080&q=80&auto=format&fit=crop" },
    { id: "tech-4", name: "🌐 شبكة - انترنت", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&q=80&auto=format&fit=crop" },
    { id: "tech-5", name: "🎮 جيمنج - ألعاب", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1080&q=80&auto=format&fit=crop" },
  ],
  "السفر ✈️": [
    { id: "travel-1", name: "✈️ طيارة - سفر", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1080&q=80&auto=format&fit=crop" },
    { id: "travel-2", name: "🏖️ شاطئ - بحر", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80&auto=format&fit=crop" },
    { id: "travel-3", name: "🗼 باريس - برج", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080&q=80&auto=format&fit=crop" },
    { id: "travel-4", name: "🏯 اليابان - معبد", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&q=80&auto=format&fit=crop" },
    { id: "travel-5", name: "🏜️ صحراء - مغامرة", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1080&q=80&auto=format&fit=crop" },
  ],
  "الجمال 💄": [
    { id: "beauty-1", name: "💄 مكياج - جمال", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1080&q=80&auto=format&fit=crop" },
    { id: "beauty-2", name: "💅 أظافر - عناية", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1080&q=80&auto=format&fit=crop" },
    { id: "beauty-3", name: "💇 شعر - صالون", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1080&q=80&auto=format&fit=crop" },
    { id: "beauty-4", name: "🧴 كريم - بشرة", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1080&q=80&auto=format&fit=crop" },
    { id: "beauty-5", name: "🌸 ورد - نعومة", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1080&q=80&auto=format&fit=crop" },
  ],
  "التعليم 📚": [
    { id: "edu-1", name: "📚 كتب - دراسة", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1080&q=80&auto=format&fit=crop" },
    { id: "edu-2", name: "🎓 جامعة - تخرج", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1080&q=80&auto=format&fit=crop" },
    { id: "edu-3", name: "✏️ مدرسة - تعلم", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1080&q=80&auto=format&fit=crop" },
    { id: "edu-4", name: "💻 دراسة - لابتوب", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1080&q=80&auto=format&fit=crop" },
    { id: "edu-5", name: "🧠 عقل - ذكاء", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080&q=80&auto=format&fit=crop" },
  ],
};

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; }
  return Math.abs(h);
}
function getDailyBackgrounds(niche: string, userId: string, todayKey: string, count = 5) {
  const pool = BACKGROUNDS_BY_NICHE[niche] || BACKGROUNDS_BY_NICHE["التحفيز 🔥"];
  if (!todayKey) return pool.slice(0, count);
  const seed = hashString(todayKey + "|" + niche + "|" + userId);
  const arr = [...pool];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}
function getUserId(): string {
  if (typeof window === "undefined") return "guest";
  let id = localStorage.getItem("viral_user_id");
  if (!id) {
    id = "user_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    localStorage.setItem("viral_user_id", id);
  }
  return id;
}

const pillBase: React.CSSProperties = { border: "none", cursor: "pointer", fontWeight: 800, transition: "all .2s ease", boxSizing: "border-box" };
const cardStyle: React.CSSProperties = { background: "#18181b", borderRadius: "20px", padding: "16px", width: "100%", boxSizing: "border-box", overflow: "hidden", border: "1px solid #27272a" };

function CleanPreview({ bg, hookText, script, isArabic }: { bg: any; hookText: string; script: string[]; isArabic: boolean }) {
  return (
    <div className="relative rounded-xl overflow-hidden min-h-[380px] bg-black" style={{ width: "100%", maxWidth: "100%", overflow: "hidden", boxSizing: "border-box" }}>
      <img src={bg.image} alt={bg.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45"></div>
      <div className="relative p-4 flex flex-col justify-between min-h-[380px]" dir={isArabic ? "rtl" : "ltr"} style={{ width: "100%", boxSizing: "border-box" }}>
        <div className="bg-white text-black font-black text-center px-3 py-2 rounded-lg text-lg leading-snug" style={{ wordBreak: "break-word", whiteSpace: "normal", width: "100%", boxSizing: "border-box" }}>{hookText}</div>
        <div className="mt-4 space-y-2 w-full" style={{ width: "100%" }}>
          {script?.map((line: string, i: number) => (
            <div key={i} className={`text-white text-sm bg-black/60 px-3 py-1.5 rounded-lg ${isArabic ? "text-right" : "text-left"}`} style={{ wordBreak: "break-word", whiteSpace: "normal", width: "100%", boxSizing: "border-box" }}>{i + 1}. {line}</div>
          ))}
        </div>
        {/* ✅ شلت اسم الأغنية واسم الخلفية من المعاينة - ما عاد يطلع شي فوق ولا تحت */}
      </div>
    </div>
  );
}

function PostingGuide({ country }: { country: string }) {
  const g = POSTING_GUIDE[country] || POSTING_GUIDE["USA 🇺🇸"];
  return (
    <div style={{ ...cardStyle, border: "1px solid #1e40af" }}>
      <h2 className="font-black text-lg mb-1" style={{ wordBreak: "break-word" }}>📅 دليل النشر - فيس بوك ريلز - {g.flag} {g.countryName}</h2>
      <div className="space-y-3 text-sm w-full" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="bg-black/50 rounded-xl p-3 w-full" style={{ boxSizing: "border-box" }}>
          <div className="font-bold text-yellow-300">⏰ متى تنشر؟ - {g.timezone}</div>
          <div className="mt-2 space-y-1 w-full">{g.bestTimes.map((t, i) => (<div key={i} className="bg-zinc-800 rounded-lg px-3 py-2" style={{ wordBreak: "break-word", boxSizing: "border-box" }}>{t}</div>))}</div>
          <div className="text-gray-400 text-xs mt-2">📆 {g.bestDays}</div>
          <div className="text-blue-300 text-xs mt-1">🕐 {g.timezoneDiff}</div>
        </div>
        <div className="bg-black/50 rounded-xl p-3 w-full" style={{ boxSizing: "border-box" }}>
          <div className="font-bold text-green-300">📍 وين تحط اللوكيشن؟</div>
          <div className="mt-1 font-black text-base">📍 {g.location}</div>
          <div className="text-gray-300 text-xs mt-1 leading-relaxed" style={{ wordBreak: "break-word" }}>{g.locationHow}</div>
          <div className="bg-yellow-900/40 border border-yellow-600/50 rounded-lg p-2 mt-2 text-xs">⚠️ مهم: لا تشغل GPS وانت بتنشر - حط اللوكيشن يدوياً مثل ما فوق</div>
        </div>
        <div className="bg-black/50 rounded-xl p-3 w-full" style={{ boxSizing: "border-box" }}>
          <div className="font-bold text-pink-300">✍️ كيف تنشر على فيس ريلز؟</div>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed list-decimal list-inside">
            <li>افتح فيسبوك → اضغط + → Reels</li>
            <li>ارفع الفيديو اللي حملته من هون</li>
            <li>الصق الكابشن + الهاشتاغات اللي نسختهم من المربع الواحد تحت</li>
            <li>اضغط Add Location → اكتب <b>{g.location}</b> → اختاره</li>
            <li>اضغط على Audience → Public</li>
            <li>لا تحط رابط بالكابشن</li>
            <li>انشر بالوقت اللي فوق</li>
            <li>ضيف الأغنية من داخل الفيس ريلز - من مكتبة الأغاني - عشان ما يجيك حقوق</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [niche, setNiche] = useState("المال 💰");
  const [country, setCountry] = useState("USA 🇺🇸");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState(0);
  const [copied, setCopied] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [userId, setUserId] = useState("guest");
  const [todayKey, setTodayKey] = useState("");
  const [topics, setTopics] = useState<string[]>(FALLBACK_TOPICS["المال 💰"]);
  const [topicsLoading, setTopicsLoading] = useState(false);

  const isArabicCountry = country === "UAE 🇦🇪" || country === "Saudi 🇸🇦";
  const topicsForNiche = topics.length > 0 ? topics : (FALLBACK_TOPICS[niche] || []);
  const guide = POSTING_GUIDE[country] || POSTING_GUIDE["USA 🇺🇸"];

  useEffect(() => {
    setUserId(getUserId());
    const d = new Date();
    setTodayKey(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  }, []);

  const fetchTopics = async (nicheVal: string, countryVal: string) => {
    setTopicsLoading(true);
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheVal, country: countryVal, randomSeed: Math.random().toString(36).slice(2, 10) + Date.now() }),
      });
      const data = await res.json();
      if (data.topics && data.topics.length >= 5) setTopics(data.topics);
      else setTopics(FALLBACK_TOPICS[nicheVal] || FALLBACK_TOPICS["المال 💰"]);
    } catch {
      setTopics(FALLBACK_TOPICS[nicheVal] || FALLBACK_TOPICS["المال 💰"]);
    }
    setTopicsLoading(false);
  };

  useEffect(() => { fetchTopics(niche, country); // eslint-disable-next-line
  }, [niche, country]);

  const dailyBackgrounds = useMemo(() => getDailyBackgrounds(niche, userId, todayKey, 5), [niche, userId, todayKey]);
  const [selectedBg, setSelectedBg] = useState<any>(BACKGROUNDS_BY_NICHE["المال 💰"][0]);
  useEffect(() => { if (dailyBackgrounds[0]) setSelectedBg(dailyBackgrounds[0]); }, [niche, dailyBackgrounds]);

  const copy = async (text: string, name: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(""), 2000);
  };
  const fixHashtags = (h: string) => {
    if (!h) return "#facebookreels #reels #viralreels #facebookviral #reelsviral";
    const cleaned = h.replace(/,/g, " ").split(/\s+/).map((tag) => tag.trim()).filter(Boolean).map((tag) => tag.startsWith("#") ? tag : "#" + tag).join(" ");
    return cleaned || "#facebookreels #reels #viralreels #facebookviral #reelsviral";
  };
  // ✅ مربع واحد فقط - كابشن + هاشتاغات مع بعض
  const copyAllForFacebook = async () => {
    if (!result) return;
    const allText = `${result.caption || ""}\n\n${fixHashtags(result.hashtags)}`;
    await navigator.clipboard.writeText(allText);
    setCopied("all");
    setTimeout(() => setCopied(""), 3000);
  };

  const generate = async () => {
    if (!topic.trim()) { alert(isArabicCountry ? "اختار موضوع!" : "Pick a topic!"); return; }
    setLoading(true);
    setResult(null);
    setVideoUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, niche, country, randomSeed: Math.random().toString(36).slice(2, 10) + Date.now() }),
      });
      const data = await res.json();
      setResult(data);
      setSelectedHook(0);
    } catch (e) { alert("صار خطأ - جرب مرة تانية"); }
    setLoading(false);
  };

  const generateVideo = async () => {
    if (!result) return;
    setIsRecording(true);
    setVideoUrl("");
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d")!;
    const hookText = result.hooks?.[selectedHook]?.text || "";
    const lines: string[] = result.script || [];
    const totalDuration = VIDEO_DURATION * 1000;
    let start = 0;
    const bgId = selectedBg.id;
    const isArabic = isArabicCountry;
    // ✅ شلت FOLLOW FOR MORE واسم الأغنية واسم الخلفية - الفيديو نظيف تماماً - بس الهوك + النصائح + شريط التقدم
    const watchText = isArabic ? "👇 شاهد للنهاية" : "👇 Watch till the end";

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = selectedBg.image;
    await new Promise((res) => { bgImg.onload = res; bgImg.onerror = res; });

    const wrapText = (text: string, maxWidth: number, font: string) => {
      ctx.font = font;
      // @ts-ignore
      ctx.direction = isArabic ? "rtl" : "ltr";
      const words = text.split(" ");
      const out: string[] = [];
      let line = "";
      for (const w of words) {
        const test = line ? line + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && line) { out.push(line); line = w; }
        else line = test;
      }
      if (line) out.push(line);
      return out;
    };
    const drawCleanBg = () => {
      const W = 1080, H = 1920;
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        const scale = Math.max(W / bgImg.naturalWidth, H / bgImg.naturalHeight);
        const w = bgImg.naturalWidth * scale;
        const h = bgImg.naturalHeight * scale;
        ctx.drawImage(bgImg, (W - w) / 2, (H - h) / 2, w, h);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "#1e1b4b"); grad.addColorStop(1, "#000000");
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
      }
      const overlay = ctx.createLinearGradient(0, 0, 0, H);
      overlay.addColorStop(0, "rgba(0,0,0,0.62)");
      overlay.addColorStop(0.3, "rgba(0,0,0,0.22)");
      overlay.addColorStop(0.6, "rgba(0,0,0,0.32)");
      overlay.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, W, H);
    };
    let drawInterval: any = null;
    let rafId = 0;
    let stopped = false;
    const draw = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalDuration, 1);
      drawCleanBg();
      // @ts-ignore
      ctx.direction = isArabic ? "rtl" : "ltr";
      // ✅ شلت السطر اللي كان يكتب اسم الخلفية + اسم الأغنية فوق
      const hookFont = "900 52px Arial";
      const hookLines = wrapText(hookText, 860, hookFont);
      const hookBoxH = hookLines.length * 68 + 44;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.roundRect(70, 110, 940, hookBoxH, 20);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = hookFont;
      ctx.textAlign = "center";
      hookLines.forEach((l, idx) => { ctx.fillText(l, 540, 110 + 58 + idx * 68); });
      const perLineTime = (totalDuration - 3000) / Math.max(lines.length, 1);
      const visibleCount = elapsed < 3000 ? 0 : Math.min(Math.floor((elapsed - 3000) / perLineTime) + 1, lines.length);
      const scriptStartY = 110 + hookBoxH + 30;
      let curY = scriptStartY;
      const boxes: { wrapped: string[]; h: number }[] = [];
      for (let i = 0; i < visibleCount; i++) {
        const fullText = `${i + 1}. ${lines[i]}`;
        const f = "700 42px Arial";
        const wrapped = wrapText(fullText, 800, f);
        const h = wrapped.length * 56 + 36;
        boxes.push({ wrapped, h });
      }
      const totalH = boxes.reduce((s, b) => s + b.h + 16, 0);
      if (curY + totalH > 1650) curY = 1650 - totalH;
      boxes.forEach((box) => {
        ctx.fillStyle = "rgba(0,0,0,0.72)";
        ctx.beginPath();
        ctx.roundRect(70, curY, 940, box.h, 18);
        ctx.fill();
        ctx.fillStyle = "#fde047";
        if (isArabic) ctx.fillRect(996, curY, 14, box.h);
        else ctx.fillRect(70, curY, 14, box.h);
        ctx.fillStyle = "white";
        ctx.font = "700 42px Arial";
        if (isArabic) {
          ctx.textAlign = "right";
          box.wrapped.forEach((wl, wi) => { ctx.fillText(wl, 975, curY + 50 + wi * 56); });
        } else {
          ctx.textAlign = "left";
          box.wrapped.forEach((wl, wi) => { ctx.fillText(wl, 105, curY + 50 + wi * 56); });
        }
        curY += box.h + 16;
      });
      if (visibleCount === 0) {
        ctx.fillStyle = "white";
        ctx.font = "700 44px Arial";
        ctx.textAlign = "center";
        ctx.fillText(watchText, 540, scriptStartY + 80);
      }
      // ✅ شلت FOLLOW FOR MORE واسم الأغنية من تحت - ضل بس شريط التقدم الأحمر
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(70, 1800, 940, 12);
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(70, 1800, 940 * progress, 12);
    };
    start = performance.now();
    draw(start);
    drawInterval = setInterval(() => { if (!stopped) draw(performance.now()); }, 33);
    const loopRaf = (now: number) => { if (stopped) return; draw(now); rafId = requestAnimationFrame(loopRaf); };
    rafId = requestAnimationFrame(loopRaf);
    const canvasStream = canvas.captureStream(30);
    // ✅ فيديو بدون صوت - الصوت بتحطه من داخل الفيس ريلز / CapCut
    const combined = new MediaStream([...canvasStream.getVideoTracks()]);
    const mime = MediaRecorder.isTypeSupported("video/mp4") ? "video/mp4" : "video/webm";
    const recorder = new MediaRecorder(combined, { mimeType: mime, videoBitsPerSecond: 8000000 });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => {
      stopped = true;
      if (drawInterval) clearInterval(drawInterval);
      if (rafId) cancelAnimationFrame(rafId);
      const blob = new Blob(chunks, { type: mime });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setIsRecording(false);
      const a = document.createElement("a");
      a.href = url;
      a.download = `viral-${bgId}-${Date.now()}.${mime.includes("mp4") ? "mp4" : "webm"}`;
      a.click();
    };
    recorder.start(1000);
    setTimeout(() => { if (recorder.state === "recording") { try { recorder.stop(); } catch {} } }, totalDuration + 1000);
    setTimeout(() => { if (recorder.state === "recording") { try { recorder.stop(); } catch {} } }, totalDuration + 3000);
  };

  const captionDir = isArabicCountry ? "rtl" : "ltr";

  return (
    <div dir="rtl" style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", overflowX: "hidden", background: "radial-gradient(600px 300px at 50% -50px, #1e1b4b 0%, #000 60%)", color: "#fff", padding: "12px", paddingBottom: "80px", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
        <div className="text-center py-6 w-full" style={{ overflow: "hidden", boxSizing: "border-box" }}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg,#ef4444,#f97316)", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.5px", boxShadow: "0 6px 20px rgba(239,68,68,.4)" }}>🔥 FACEBOOK REELS • 20 SEC</div>
          <h1 className="text-3xl font-black" style={{ wordBreak: "break-word", whiteSpace: "normal", margin: "12px 0 6px", fontSize: "32px", lineHeight: "1.2", textShadow: "0 4px 20px rgba(239,68,68,.35)" }}>🎬 صانع ريلزات<br />الفيس بوك</h1>
          <p className="text-gray-400 text-sm mt-2" style={{ wordBreak: "break-word" }}>حوّل أي فكرة لريلز فيرال بـ Gemini AI - 20 ثانية</p>
          {todayKey && <p className="text-xs mt-2" style={{ display: "inline-block", background: "#14532d", color: "#bbf7d0", padding: "5px 10px", borderRadius: "999px", fontWeight: 700 }}>🗓️ خلفيات اليوم: {todayKey}</p>}
        </div>

        <div style={cardStyle}>
          <h2 className="font-bold mb-3" style={{ fontSize: "16px" }}>🎯 اختار النيش</h2>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {NICHES.map((n) => {
              const active = niche === n.id;
              return (
                <button key={n.id} onClick={() => { setNiche(n.id); setTopic(""); setResult(null); setVideoUrl(""); }}
                  style={{ ...pillBase, padding: "10px 14px", borderRadius: "999px", fontSize: "13px", color: "#fff", background: active ? n.grad : "#27272a", boxShadow: active ? n.glow : "none", transform: active ? "scale(1.05)" : "scale(1)", border: active ? "2px solid rgba(255,255,255,.9)" : "1px solid #3f3f46", whiteSpace: "nowrap" }}>
                  {n.label} {active ? "✓" : ""}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ height: "12px" }} />

        <div style={cardStyle}>
          <h2 className="font-bold mb-3" style={{ fontSize: "16px" }}>🌍 الدولة المستهدفة - فيس ريلز</h2>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {COUNTRIES.map((c) => {
              const active = country === c;
              return (
                <button key={c} onClick={() => { setCountry(c); setTopic(""); setResult(null); }}
                  style={{ ...pillBase, padding: "9px 12px", borderRadius: "12px", fontSize: "12px", color: active ? "#fff" : "#d4d4d8", background: active ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "#27272a", boxShadow: active ? "0 6px 18px rgba(37,99,235,.5)" : "none", border: active ? "1px solid #60a5fa" : "1px solid #3f3f46", whiteSpace: "nowrap" }}>
                  {c} {active ? "✓" : ""}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-2" style={{ wordBreak: "break-word" }}>اللغة: {isArabicCountry ? "العربية 🇸🇦" : "English 🇺🇸"} • مدة الفيديو: 20 ثانية ثابتة • 5 نصائح</p>
          <div style={{ background: "linear-gradient(135deg,#1e3a8a,#0f172a)", borderRadius: "14px", padding: "12px", marginTop: "10px", border: "1px solid #1d4ed8" }}>
            <div className="font-bold text-blue-200" style={{ wordBreak: "break-word", fontSize: "13px" }}>📅 دليل سريع - {guide.flag} {guide.countryName}</div>
            <div className="mt-1" style={{ wordBreak: "break-word", fontSize: "12px" }}>⏰ أفضل وقت: <b className="text-white">{guide.bestTimes[0]}</b></div>
            <div style={{ wordBreak: "break-word", fontSize: "12px" }}>📍 لوكيشن النشر: <b className="text-white">{guide.location}</b></div>
            <div className="text-gray-400 mt-1" style={{ fontSize: "12px" }}>📆 {guide.bestDays}</div>
          </div>
        </div>

        <div style={{ height: "12px" }} />

        <div style={cardStyle}>
          <h2 className="font-bold mb-3" style={{ wordBreak: "break-word", fontSize: "16px" }}>💡 موضوع الفيديو - {niche} 🔄</h2>
          <div className="mb-3 w-full" style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: "8px", width: "100%", boxSizing: "border-box", alignItems: "center" }}>
              <span className="text-sm font-bold text-yellow-300" style={{ flex: 1, wordBreak: "break-word", minWidth: 0, fontSize: "13px" }}>🔥 مواضيع فيرال - بتتولد من Gemini:</span>
              <button onClick={() => fetchTopics(niche, country)} disabled={topicsLoading} style={{ ...pillBase, background: "linear-gradient(135deg,#eab308,#f97316)", color: "#000", padding: "8px 12px", borderRadius: "999px", fontSize: "12px", flexShrink: 0, whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(234,179,8,.4)" }}>{topicsLoading ? "⏳ جاري..." : "🔄 مواضيع جديدة"}</button>
            </div>
            {topicsLoading && <div style={{ background: "#27272a", borderRadius: "12px", padding: "12px", textAlign: "center", fontSize: "13px", color: "#fde047", marginTop: "10px" }}>⏳ جاري توليد 10 مواضيع جديدة...</div>}
            {!topicsLoading && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
                {topicsForNiche.slice(0, 6).map((t, idx) => {
                  const active = topic === t;
                  return (
                    <button key={t} onClick={() => setTopic(t)}
                      style={{ ...pillBase, width: "100%", boxSizing: "border-box", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", textAlign: "right", padding: "12px 14px", borderRadius: "16px", fontSize: "13px", lineHeight: "1.5", color: active ? "#fff" : "#e4e4e7", background: active ? "linear-gradient(135deg,#dc2626,#ef4444)" : "#27272a", border: active ? "2px solid #fca5a5" : "1px solid #3f3f46", boxShadow: active ? "0 8px 20px rgba(220,38,38,.4)" : "none" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "24px", height: "24px", borderRadius: "999px", background: active ? "#fff" : "#3f3f46", color: active ? "#dc2626" : "#fff", fontSize: "11px", fontWeight: 900, flexShrink: 0 }}>{idx + 1}</span>
                      <span style={{ flex: 1, whiteSpace: "normal", wordBreak: "break-word", textAlign: "right", minWidth: 0 }}>{t}</span>
                      <span style={{ flexShrink: 0, fontSize: "14px" }}>{active ? "✅" : "👈"}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div style={{ display: "flex", gap: "8px", width: "100%", marginTop: "10px" }}>
              <button onClick={() => { const arr = topicsForNiche; setTopic(arr[Math.floor(Math.random() * arr.length)]); }} style={{ ...pillBase, flex: 1, background: "#eab308", color: "#000", padding: "10px", borderRadius: "999px", fontSize: "12px" }}>🎲 موضوع عشوائي</button>
              <button onClick={() => fetchTopics(niche, country)} style={{ ...pillBase, flex: 1, background: "linear-gradient(135deg,#9333ea,#7c3aed)", color: "#fff", padding: "10px", borderRadius: "999px", fontSize: "12px", boxShadow: "0 4px 14px rgba(147,51,234,.4)" }}>✨ 10 مواضيع جديدة</button>
            </div>
          </div>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={isArabicCountry ? "أو اكتب موضوعك هنا..." : "Or write your topic here..."} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-500" style={{ width: "100%", boxSizing: "border-box", borderRadius: "14px" }} />
          <div style={{ background: "#27272a", borderRadius: "14px", padding: "12px", marginTop: "12px", textAlign: "center", border: "1px dashed #52525b" }}>
            <div className="font-black text-lg" style={{ fontSize: "16px" }}>⏱️ مدة الفيديو: 20 ثانية ثابتة</div>
            <p className="text-[11px] text-gray-400 mt-1">20 ثانية = 5 نصائح حقيقية - كل نصيحة فيها رقم + أداة + خطوة</p>
          </div>
          <button onClick={generate} disabled={loading}
            style={{ ...pillBase, width: "100%", boxSizing: "border-box", marginTop: "12px", background: loading ? "#3f3f46" : "linear-gradient(135deg,#dc2626,#f97316)", color: "#fff", padding: "16px", borderRadius: "16px", fontSize: "17px", boxShadow: loading ? "none" : "0 10px 25px rgba(220,38,38,.5)", letterSpacing: "0.3px" }}>
            {loading ? "⏳ جاري التوليد..." : "✨ ولّد بـ Gemini - نصائح حقيقية"}
          </button>
        </div>

        {result && (
          <div className="space-y-4 w-full" style={{ width: "100%", overflow: "hidden", display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            <div style={cardStyle}>
              <h2 className="font-bold mb-3">🎣 اختار الهوك - 5 هوكات فيرال</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {result.hooks?.map((h: any, i: number) => {
                  const active = selectedHook === i;
                  return (
                    <button key={i} onClick={() => setSelectedHook(i)}
                      style={{ ...pillBase, width: "100%", boxSizing: "border-box", textAlign: "right", padding: "12px 14px", borderRadius: "16px", fontSize: "13px", color: active ? "#000" : "#fff", background: active ? "#fff" : "#27272a", border: active ? "2px solid #dc2626" : "1px solid #3f3f46", boxShadow: active ? "0 6px 18px rgba(255,255,255,.15)" : "none" }}>
                      <div className="font-bold text-sm" style={{ fontSize: "12px", color: active ? "#dc2626" : "#fbbf24" }}>{h.type} {active ? "✅" : ""}</div>
                      <div className="mt-1" style={{ wordBreak: "break-word", whiteSpace: "normal", textAlign: "right" }}>{h.text}</div>
                    </button>
                  );
                })}
              </div>
              <button onClick={generate} disabled={loading} style={{ ...pillBase, width: "100%", boxSizing: "border-box", marginTop: "12px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", padding: "12px", borderRadius: "14px", fontSize: "13px" }}>🔄 ولّد هوكات ونصائح جديدة</button>
            </div>

            <div style={cardStyle}>
              <h2 className="font-bold mb-3">🎥 خلفيات اليوم - {niche}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%" }}>
                {dailyBackgrounds.map((bg) => {
                  const active = selectedBg.id === bg.id;
                  return (
                    <button key={bg.id} onClick={() => { setSelectedBg(bg); }} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "130px", border: active ? "3px solid #dc2626" : "1px solid #3f3f46", padding: 0, cursor: "pointer", boxShadow: active ? "0 8px 20px rgba(220,38,38,.4)" : "none", transform: active ? "scale(1.02)" : "scale(1)", transition: "all .2s", minWidth: 0 }}>
                      <img src={bg.image} alt={bg.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.65)", padding: "8px", textAlign: "center" }}><span className="font-bold text-xs" style={{ wordBreak: "break-word", color: "#fff" }}>{bg.name}</span></div>
                      {active && (<div style={{ position: "absolute", top: "8px", left: "8px", background: "#dc2626", color: "#fff", fontSize: "11px", fontWeight: 800, padding: "4px 8px", borderRadius: "999px" }}>✅ مختارة</div>)}
                    </button>
                  );
                })}
              </div>
              <p className="text-gray-400 text-xs mt-2">اسم الخلفية بيطلع هون بس بالموقع - ما بيطلع بالفيديو النهائي ✅</p>
            </div>

            <div style={cardStyle}>
              <h2 className="font-bold mb-3">🎬 معاينة حية - 20 ثانية</h2>
              <CleanPreview bg={selectedBg} hookText={result.hooks?.[selectedHook]?.text || ""} script={result.script || []} isArabic={isArabicCountry} />
            </div>

            <div style={cardStyle}>
              <button onClick={generateVideo} disabled={isRecording}
                style={{ ...pillBase, width: "100%", boxSizing: "border-box", background: isRecording ? "#3f3f46" : "linear-gradient(135deg,#16a34a,#22c55e,#4ade80)", color: "#fff", padding: "16px", borderRadius: "16px", fontSize: "16px", boxShadow: isRecording ? "none" : "0 10px 25px rgba(34,197,94,.5)" }}>
                {isRecording ? `⏳ جاري تسجيل الفيديو... 20 ثانية - لا تسكر الشاشة` : `🎬 تحميل فيديو - 20 ثانية - نظيف بدون أغنية`}
              </button>
              <p className="text-gray-400 text-xs text-center mt-2" style={{ wordBreak: "break-word" }}>فيديو 1080x1920 - 20 ثانية - بس الهوك + 5 نصائح - بدون أي اسم أغنية وبدون اسم خلفية - الأغنية بتحطها من داخل الفيس ريلز</p>
              {videoUrl && (<video src={videoUrl} controls className="w-full mt-3 rounded-xl" playsInline style={{ width: "100%", borderRadius: "14px" }} />)}
            </div>

            {/* ✅ مربع واحد فقط - كابشن + هاشتاغات مع بعض - شلت المربعين المنفصلين */}
            <div style={{ ...cardStyle, border: "2px solid #22c55e", background: "linear-gradient(180deg,#14532d,#18181b)" }}>
              <h2 className="font-black text-lg mb-1">🚀 الكابشن + الهاشتاغات - انسخهم مع بعض</h2>
              <p className="text-gray-400 text-xs mb-2">هاد هو المربع الوحيد - انسخه والصقه بالفيس كامل</p>
              <div dir={captionDir} className="bg-black/60 rounded-xl p-3 text-sm leading-relaxed whitespace-pre-wrap" style={{ wordBreak: "break-word", width: "100%", boxSizing: "border-box", borderRadius: "14px" }}>
                {result.caption}
                {"\n\n"}
                {fixHashtags(result.hashtags)}
              </div>
              <button onClick={copyAllForFacebook} style={{ ...pillBase, width: "100%", marginTop: "12px", background: "linear-gradient(135deg,#22c55e,#4ade80)", color: "#000", padding: "15px", borderRadius: "16px", fontSize: "16px", boxShadow: "0 8px 20px rgba(34,197,94,.4)" }}>
                {copied === "all" ? "✅ تم نسخ الكل! روح على الفيس والصق" : "📋 نسخ الكابشن + الهاشتاغات مع بعض"}
              </button>
              <p className="text-gray-400 text-[11px] text-center mt-2" style={{ wordBreak: "break-word" }}>⚠️ تذكر: حط اللوكيشن يدوياً: {guide.location} - وانشر: {guide.bestTimes[0]}</p>
            </div>

            <PostingGuide country={country} />
            <button onClick={() => { setResult(null); setTopic(""); setVideoUrl(""); }} style={{ ...pillBase, width: "100%", background: "#27272a", color: "#fff", padding: "12px", borderRadius: "14px", fontSize: "13px", border: "1px solid #3f3f46" }}>🔄 ابدأ فيديو جديد</button>
          </div>
        )}
      </div>
    </div>
  );
}
