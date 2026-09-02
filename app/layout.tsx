import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "실증적AI개발프로젝트Ⅱ(종합설계) | 오리엔테이션",
  description:
    "동아대학교 AI학과 실증적AI개발프로젝트Ⅱ(종합설계) 첫 수업 오리엔테이션",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
