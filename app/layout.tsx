import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reels Maker - صانع الريلز',
  description: 'اصنع ريلز فيسبوك احترافي بالذكاء الاصطناعي',
  manifest: '/manifest.json',
  themeColor: '#1877F2',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
