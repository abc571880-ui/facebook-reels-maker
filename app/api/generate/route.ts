import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ script: `🎬 سكربت جاهز عن: ${topic}\n\nهوك (0-3 ثواني): هل كنت تعرف هاد الشي عن ${topic}؟\n\nالجزء الرئيسي: 3 حقائق مثيرة عن ${topic} راح تصدمك...\n\nالنهاية: تابعني للمزيد واكتبلي بالتعليقات رأيك!` })
    }
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: `اكتب سكربت ريلز فيسبوك 30 ثانية بالعربي عن: ${topic}. هوك قوي، 3 نقاط، دعوة للمتابعة.` }] })
    })
    const data = await res.json()
    return NextResponse.json({ script: data.choices?.[0]?.message?.content || 'ما طلع سكربت' })
  } catch (e) {
    return NextResponse.json({ script: 'صار خطأ، جرب مرة ثانية' })
  }
}
