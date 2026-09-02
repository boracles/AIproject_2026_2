import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "실증적AI개발프로젝트Ⅱ(종합설계) | 1주차 수업 안내",
  description:
    "동아대학교 AI학과 실증적AI개발프로젝트Ⅱ(종합설계) 1주차 수업 안내와 2주차 프로젝트 계획 공유 준비",
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
