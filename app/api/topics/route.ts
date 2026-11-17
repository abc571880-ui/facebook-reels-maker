import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { niche, country } = await req.json();
  const isArabic = country === "UAE 🇦🇪" || country === "Saudi 🇸🇦";
  const lang = isArabic ? "Arabic" : "English";
  const prompt = `Give 10 viral Facebook Reels topics for niche ${niche} in ${lang}. Return ONLY JSON: {"topics":["...","..."]}. Each topic short, with number, shocking, clickable. Only JSON.`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ topics: [] });
  }
}
