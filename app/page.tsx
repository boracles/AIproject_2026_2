"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, ClipboardList,
  Expand, Minimize, Sparkles, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  index: string; eyebrow: string; chineseEyebrow: string;
  title: string; chineseTitle: string; note: string; content: React.ReactNode;
};

const slides: Slide[] = [
  {
    index: "01", eyebrow: "실증적AI개발프로젝트Ⅱ(종합설계)", chineseEyebrow: "实证人工智能开发项目Ⅱ（综合设计）",
    title: "1주차 · 수업 안내와\n프로젝트 소개", chineseTitle: "第1周 · 课程说明与项目介绍",
    note: "첫 수업은 약 1시간 동안 운영 방식을 안내하고, 학생들이 프로젝트Ⅰ의 현재 상태를 편하게 말로 공유하도록 진행합니다.",
    content: <div className="cover-content"><div className="cover-statement"><span>THU 12:00–15:00 · S06-602</span><strong>문제에서 시작해<br />근거로 다음 개발을 정합니다.</strong><p>问题出发，以证据决定下一步开发。</p></div><div className="course-card"><span>2026. 09. 03</span><strong>WEEK 01</strong><p>동아대학교 AI학과<br />윤보라</p></div></div>,
  },
  {
    index: "02", eyebrow: "이번 학기 수업", chineseEyebrow: "本学期课程",
    title: "만들고, 확인하고,\n다음 선택을 정합니다", chineseTitle: "开发、确认，并决定下一步",
    note: "AI 기술을 나열하기보다 팀 프로젝트의 문제, 사용자, 데이터, AI 기능을 연결해 개발하는 수업임을 안내합니다.",
    content: <div className="course-grid"><article><span>01</span><h3>문제와 사용자</h3><p>누구의 어떤 상황을 다룰지 정합니다.</p><small>问题与用户</small></article><article><span>02</span><h3>데이터와 AI 기능</h3><p>입력, AI 처리, 결과의 흐름을 설계합니다.</p><small>数据与AI功能</small></article><article><span>03</span><h3>구현과 점검</h3><p>사용 시나리오에서 결과를 보고 개선합니다.</p><small>实现与检查</small></article><article className="assessment"><span>평가 · 评价</span><div><b>출결</b><strong>20%</strong></div><div><b>주차별 프로젝트 과제</b><strong>30%</strong></div><div><b>중간 발표</b><strong>20%</strong></div><div><b>최종 발표와 시연</b><strong>30%</strong></div></article></div>,
  },
  {
    index: "03", eyebrow: "이 수업에서의 실증", chineseEyebrow: "本课程中的实证",
    title: "‘좋을 것 같다’를\n근거가 있는 판단으로", chineseTitle: "将“看起来不错”变成有依据的判断",
    note: "실증은 마지막 설문이나 발표가 아니라, 무엇을 확인할지 정하고 그 결과로 다음 선택을 하는 과정이라고 설명합니다.",
    content: <div className="evidence-layout"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow">{["확인할 질문", "사용 시나리오", "결과와 기록", "다음 개선"].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p>{i < 3 && <ChevronRight />}</div>)}</div><p className="evidence-explain">아이디어를 말로 설명하는 데 그치지 않고, 무엇을 확인할지 먼저 정한 뒤 데이터·사용 시나리오·프로젝트 결과를 근거로 성과와 한계를 판단합니다.<br /><small>不是停留在口头说明创意，而是先确定要确认的内容，依据数据、使用情境和项目结果判断成果与局限。</small></p></div>,
  },
  {
    index: "04", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "짧게 계획하고,\n만들고, 함께 검토합니다", chineseTitle: "短周期计划、开发与共同评审",
    note: "각 스프린트가 계획, 개발, 리뷰로 이어짐을 설명합니다. 중간과 최종 발표는 결과를 공유하고 다음 선택을 정리하는 자리입니다.",
    content: <div className="sprint-map">{[["01–02", "시작", "수업 안내 · 프로젝트 계획 공유"], ["03–05", "스프린트 1", "MVP 계획 · AI 기능 개발 · 리뷰"], ["06–08", "스프린트 2", "서비스 통합 · 중간 발표"], ["09–11", "스프린트 3", "기능 고도화 · 사용 시나리오 점검"], ["12–15", "스프린트 4", "최종 통합 · 발표와 시연"]].map(([week, title, detail], i) => <article key={week} className={i === 0 ? "start-phase" : ""}><span>{week}</span><h3>{title}</h3><p>{detail}</p>{i === 2 && <b>8주차<br />중간 발표</b>}{i === 4 && <b>15주차<br />최종 발표</b>}</article>)}</div>,
  },
  {
    index: "05", eyebrow: "오늘 수업 · 1주차", chineseEyebrow: "今天的课程 · 第1周",
    title: "첫날은 서로의 프로젝트를\n가볍게 알아가는 시간입니다", chineseTitle: "第一天，轻松了解彼此的项目",
    note: "첫날에는 발표 자료를 요구하지 않습니다. 학생들이 자기소개와 프로젝트Ⅰ의 현재 상태를 자유롭게 말하고, 다음 주 준비 형식을 이해하면 됩니다.",
    content: <div className="today-layout"><div className="today-list">{[["수업 안내", "목표 · 평가 · 주차별 진행 · 과제 제출 방식"], ["자기소개와 프로젝트 소개", "관심 분야와 프로젝트Ⅰ의 현재 상태를 구두로 공유"], ["다음 주 준비 안내", "프로젝트 계획 공유 형식과 준비 항목 확인"], ["질의응답", "수업과 프로젝트 진행에 관한 질문"]].map(([title, detail], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{detail}</p></div><Check /></article>)}</div><aside><Users /><strong>오늘은<br />발표 자료가<br />필요 없습니다.</strong><span>无需准备汇报材料</span></aside></div>,
  },
  {
    index: "06", eyebrow: "다음 주 준비 · 2주차", chineseEyebrow: "下周准备 · 第2周",
    title: "프로젝트 계획을\n정해진 형식으로 공유합니다", chineseTitle: "按规定格式分享项目计划",
    note: "1주차에는 별도 제출이 없습니다. 다음 주 팀별 프로젝트 계획 공유를 위해 아래 내용을 정리해 오도록 안내합니다.",
    content: <div className="assignment-layout"><div className="assignment-head"><ClipboardList /><div><span>1주차 별도 제출 없음</span><h3>2주차 프로젝트 계획 공유 준비</h3><p>第1周无需单独提交，请准备第2周项目计划分享。</p></div></div><ol>{["프로젝트 제목과 팀 구성", "대상 사용자와 해결하려는 문제", "프로젝트Ⅰ에서 진행한 내용과 현재 상태", "이번 학기의 프로젝트 목표", "핵심 AI 기능: 입력 · AI 처리 · 결과", "이번 학기에 완성할 범위와 제외할 범위", "팀 내 역할과 첫 개발 계획"].map((item, i) => <li key={item}><span>{i + 1}</span>{item}</li>)}</ol><div className="submission-box"><span>2주차 제출물 · 第2周提交物</span><strong>프로젝트 계획서 v1 + 발표 자료</strong></div></div>,
  },
  {
    index: "07", eyebrow: "마무리", chineseEyebrow: "结束",
    title: "다음 주, 각 팀의\n프로젝트 계획을 만납니다", chineseTitle: "下周，分享各组的项目计划",
    note: "다음 주에 준비할 항목을 한 번 더 확인하고 질문을 받습니다.",
    content: <div className="closing-content"><div className="closing-orb"><Sparkles /></div><div><p>질문이 있나요?</p><span>프로젝트 계획 공유 형식에 맞춰 자료를 준비해 주세요.</span></div></div>,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const go = useCallback((next: number) => setCurrent(Math.max(0, Math.min(slides.length - 1, next))), []);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(current + 1); } if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1); } if (event.key.toLowerCase() === "n") setShowNotes((value) => !value); if (event.key.toLowerCase() === "o") setShowOverview((value) => !value); if (event.key === "Escape") { setShowOverview(false); setShowNotes(false); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [current, go]);
  useEffect(() => { const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement)); document.addEventListener("fullscreenchange", onFullscreen); return () => document.removeEventListener("fullscreenchange", onFullscreen); }, []);
  const toggleFullscreen = async () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  const slide = slides[current];
  return <main className="deck-shell"><header className="deck-header"><button className="brand" onClick={() => go(0)} aria-label="첫 슬라이드로 이동"><span className="brand-mark">DA</span><span><strong>실증적AI개발프로젝트Ⅱ</strong><small>동아대학교 AI학과 · 2026-2</small></span></button><div className="header-actions"><button onClick={() => setShowOverview(true)}>전체 보기 <kbd>O</kbd></button><button onClick={() => setShowNotes((value) => !value)}>발표 메모 <kbd>N</kbd></button><Button variant="outline" size="icon-sm" onClick={toggleFullscreen} aria-label={isFullscreen ? "전체 화면 종료" : "전체 화면"}>{isFullscreen ? <Minimize /> : <Expand />}</Button></div></header><div className="stage-wrap"><section className="slide-stage" aria-live="polite"><div className="wire wire-one" /><div className="wire wire-two" /><div className="cube cube-one" /><div className="cube cube-two" /><div className="cube cube-three" /><div className="slide-meta"><span>{slide.index} · {slide.eyebrow}</span><span>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span></div><div className="slide-title-wrap"><h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p>{slide.chineseTitle}</p></div><div className="slide-content">{slide.content}</div><div className="corner-mark">DONG-A · AI · WEEK 01</div></section></div><footer className="deck-footer"><div className="progress-track"><span style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div><div className="footer-controls"><p><kbd>←</kbd><kbd>→</kbd> 또는 화면 버튼으로 이동</p><div><Button variant="outline" size="icon" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전 슬라이드"><ArrowLeft /></Button><Button size="icon" onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="다음 슬라이드"><ArrowRight /></Button></div></div></footer>{showNotes && <aside className="notes-panel"><div><span>발표자 메모</span><button onClick={() => setShowNotes(false)} aria-label="발표자 메모 닫기"><X /></button></div><p>{slide.note}</p></aside>}{showOverview && <div className="overview-backdrop" role="dialog" aria-modal="true" aria-label="슬라이드 전체 보기"><div className="overview-panel"><header><div><span>SLIDE MAP</span><h2>1주차 수업 안내</h2></div><button onClick={() => setShowOverview(false)} aria-label="전체 보기 닫기"><X /></button></header><div className="overview-grid">{slides.map((item, index) => <button key={item.index} className={index === current ? "active" : ""} onClick={() => { go(index); setShowOverview(false); }}><span>{item.index}</span><strong>{item.title.replace("\n", " ")}</strong></button>)}</div></div></div>}</main>;
}
