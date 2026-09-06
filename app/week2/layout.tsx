import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recognition and Classification: Qwen Vision | Week 2",
  description:
    "동아대학교 AI학과 실증적AI개발프로젝트Ⅱ 2주차 Qwen Vision 인식·분류 수업 슬라이드와 교수자 대본",
  openGraph: {
    title: "WEEK 02 · Qwen Vision",
    description: "Recognition & Classification · 2주차 수업 슬라이드와 교수자 대본",
    type: "website",
    images: ["https://boracles.github.io/AIproject_2026_2/og-week2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEEK 02 · Qwen Vision",
    description: "Recognition & Classification · 2주차 수업 슬라이드와 교수자 대본",
    images: ["https://boracles.github.io/AIproject_2026_2/og-week2.png"],
  },
};

export default function Week2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
