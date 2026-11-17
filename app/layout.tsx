import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صانع ريلزات الفيس بوك",
  description: "حوّل أي فكرة لريلز فيرال - 20 ثانية",
  manifest: "/manifest.json",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
