import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, niche, country } = await req.json();
  const isArabic = country === "UAE 🇦🇪" || country === "Saudi 🇸🇦";
  const lang = isArabic ? "Arabic" : "English";
  const prompt = `You are a Facebook Reels viral expert. Topic: ${topic}. Niche: ${niche}. Language: ${lang}.
Return ONLY valid JSON: {"hooks":[{"type":"Hook 1","text":"..."},{"type":"Hook 2","text":"..."},{"type":"Hook 3","text":"..."},{"type":"Hook 4","text":"..."},{"type":"Hook 5","text":"..."}],"script":["Tip 1 with number and tool","Tip 2","Tip 3","Tip 4","Tip 5"],"caption":"viral caption with hook first line, 3 lines, call to action","hashtags":"#facebookreels #reels #viralreels #facebookviral #reelsviral"}
Rules: hooks must be short, shocking, with numbers. Script: 5 tips, each tip must have a number + tool + step. Caption in ${lang}. No extra text, only JSON.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({
      hooks: [{ type: "🔥 هوك", text: topic }],
      script: ["Tip 1: Start today", "Tip 2: Be consistent", "Tip 3: Use this tool", "Tip 4: Save this video", "Tip 5: Follow for more"],
      caption: `${topic}\n\nSave this video! Follow for more 👇`,
      hashtags: "#facebookreels #reels #viralreels #facebookviral #reelsviral"
    });
  }
}
