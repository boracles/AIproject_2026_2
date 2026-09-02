"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, Expand, FlaskConical,
  Layers3, Lightbulb, MessageSquareText, Minimize, MousePointer2,
  Network, NotebookPen, Play, ScanSearch, Sparkles, Target, Users, Wrench, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  eyebrow: string;
  title: string;
  note: string;
  content: React.ReactNode;
  tone?: "lime" | "blue" | "orange";
};

const slides: Slide[] = [
  {
    eyebrow: "2026 · 2학기 / ORIENTATION",
    title: "실증적AI개발프로젝트Ⅱ\n(종합설계)",
    note: "학생들을 환영하고, 이 수업이 단순한 AI 기술 학습이 아니라 실제 문제를 발견하고 구현하고 검증하는 종합설계 수업임을 강조합니다.",
    content: <div className="cover-layout">
      <div><p className="cover-copy">아이디어를 작동하는 AI 서비스로,</p><p className="cover-copy muted-copy">작동하는 서비스를 검증된 결과로.</p></div>
      <div className="course-stamp"><span>AI학과 · 종합설계</span><strong>THU 12:00—15:00</strong><span>S06 산학협력관 · 602호</span><span>윤보라</span></div>
    </div>,
  },
  {
    eyebrow: "01 / TODAY",
    title: "오늘은 수업의 지도를\n함께 펼칩니다",
    note: "오리엔테이션만 하고 일찍 끝내기보다, 학생들의 관심사를 듣고 작은 문제 탐색까지 진행합니다. 중간에 10분씩 쉬어갑니다.",
    content: <div className="agenda-grid">{[
      ["12:00", "수업 이해", "목표 · 운영 · 평가"], ["12:30", "서로 알기", "경험 · 관심 기술 · 기대"],
      ["13:10", "사례 해부", "좋은 AI 프로젝트의 조건"], ["13:50", "문제 탐색", "누구의 어떤 문제인가"],
      ["14:30", "공유와 연결", "관심사 지도 · 다음 주 준비"],
    ].map(([time, title, desc], index) => <article className="agenda-item" key={time}><span className="agenda-index">0{index + 1}</span><time>{time}</time><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div>,
    tone: "blue",
  },
  {
    eyebrow: "02 / COURSE DEFINITION",
    title: "‘실증’은 마지막 설문이\n아닙니다",
    note: "실증은 프로젝트 마지막에 사용자에게 한번 보여주는 단계가 아닙니다. 문제 정의부터 결과 해석까지, 주장과 근거를 계속 연결하는 태도입니다.",
    content: <div className="definition-layout">
      <div className="big-word"><strong>실증</strong><span>實證 · EVIDENCE IN ACTION</span></div>
      <div className="definition-copy"><p>“좋을 것 같다”를</p><p className="accent-sentence">“이 근거로, 이렇게 판단했다”로 바꾸는 과정</p><div className="evidence-tags"><span>사용자 맥락</span><span>작동하는 프로토타입</span><span>검증 데이터</span><span>개선 기록</span></div></div>
    </div>,
  },
  {
    eyebrow: "03 / COURSE GOAL",
    title: "이번 학기, 네 번의\n변환을 완주합니다",
    note: "학기 말 결과물보다 그 결과가 만들어지는 변환 과정을 학습합니다. 각 단계는 다음 단계의 근거가 됩니다.",
    content: <div className="transformation-flow">{[
      [ScanSearch, "문제", "관찰하고 좁히기"], [Lightbulb, "가설", "AI의 역할 정하기"],
      [Wrench, "프로토타입", "핵심 경험 구현하기"], [FlaskConical, "근거", "테스트하고 개선하기"],
    ].map(([Icon, title, desc], index) => { const ItemIcon = Icon as typeof ScanSearch; return <div className="flow-step" key={String(title)}><div className="icon-orbit"><ItemIcon /></div><span className="step-num">0{index + 1}</span><h3>{String(title)}</h3><p>{String(desc)}</p>{index < 3 && <ChevronRight className="flow-arrow" />}</div>; })}</div>,
    tone: "orange",
  },
  {
    eyebrow: "04 / THE AI PART",
    title: "AI는 장식이 아니라\n판단 가능한 역할이어야 합니다",
    note: "기능 목록보다 사용자의 흐름 속에서 AI가 맡는 역할을 설명하게 합니다. AI를 뺐을 때 프로젝트의 핵심 가치가 같다면 AI의 역할을 다시 생각해야 합니다.",
    content: <div className="role-contrast"><article className="contrast-card dim-card"><span>기술에서 출발</span><h3>“LLM을 넣어보자”</h3><p>기능은 있지만 왜 필요한지 설명하기 어렵다.</p></article><div className="contrast-arrow"><ArrowRight /></div><article className="contrast-card good-card"><span>문제에서 출발</span><h3>“이 판단을 AI가 돕는다”</h3><p>입력, 출력, 사용자 가치와 한계를 설명할 수 있다.</p></article></div>,
  },
  {
    eyebrow: "05 / SEMESTER MAP",
    title: "15주는 하나의\n프로젝트 루프입니다",
    note: "주차별 세부 내용은 프로젝트 진행 상황에 따라 조정될 수 있지만, 큰 흐름은 탐색-기획-구현-실증-공유 순서입니다.",
    content: <div className="semester-map">{[
      ["01—03", "탐색", "사례 분석 · 문제 발견", "20%"], ["04—06", "기획", "사용자 · 시나리오 · AI 역할", "20%"],
      ["07—10", "구현", "핵심 기능 · 프로토타입", "27%"], ["11—13", "실증", "테스트 · 분석 · 개선", "20%"],
      ["14—15", "공유", "최종 발표 · 결과 정리", "13%"],
    ].map(([week, title, desc, width]) => <div className="semester-phase" key={week} style={{ flexBasis: width }}><span>{week}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>,
    tone: "blue",
  },
  {
    eyebrow: "06 / CLASS RHYTHM",
    title: "수업 시간은 회의가 아니라\n프로젝트를 전진시키는 시간입니다",
    note: "매주 강의만 듣는 수업이 아닙니다. 짧은 개념 설명 뒤 바로 적용하고, 팀별 점검을 통해 다음 행동을 확정합니다.",
    content: <div className="rhythm-grid">{[
      [NotebookPen, "짧은 인풋", "개념과 사례", "20—30분"], [Users, "팀 스튜디오", "만들고 논의하기", "60—90분"],
      [MessageSquareText, "체크포인트", "공유하고 피드백", "30—40분"], [Target, "다음 행동", "담당자와 완료 기준", "10분"],
    ].map(([Icon, title, desc, time]) => { const ItemIcon = Icon as typeof NotebookPen; return <article className="rhythm-card" key={String(title)}><ItemIcon /><div><h3>{String(title)}</h3><p>{String(desc)}</p></div><span>{String(time)}</span></article>; })}</div>,
  },
  {
    eyebrow: "07 / TEAM PROJECT",
    title: "팀으로 만들지만,\n개인의 기여는 보여야 합니다",
    note: "역할을 직무처럼 고정하지 않습니다. 각자 주 역할은 정하되 중요한 의사결정과 테스트에는 모두 참여합니다. 개인별 과정 기록이 필요합니다.",
    content: <div className="team-layout"><div className="team-core"><Network /><strong>ONE SHARED<br />PROBLEM</strong></div><div className="team-roles">{[
      ["기획", "문제 · 가설 · 범위"], ["UX/UI", "흐름 · 인터페이스"], ["AI/개발", "데이터 · 모델 · 구현"], ["리서치", "테스트 · 분석 · 기록"],
    ].map(([role, detail]) => <div key={role}><strong>{role}</strong><span>{detail}</span></div>)}</div></div>,
    tone: "orange",
  },
  {
    eyebrow: "08 / CHECKPOINTS",
    title: "완성 직전에 처음\n보여주지 않습니다",
    note: "체크포인트는 평가를 위한 중간 발표가 아니라 실패 비용을 줄이는 장치입니다. 덜 완성된 상태라도 판단이 필요한 것을 가져옵니다.",
    content: <div className="checkpoint-line">{[
      ["A", "문제 정의", "누구의 어떤 상황인가"], ["B", "기획안", "AI가 왜 필요한가"], ["C", "핵심 구현", "주요 흐름이 작동하는가"],
      ["D", "실증 설계", "무엇으로 판단할 것인가"], ["E", "최종 결과", "근거로 무엇을 말할 수 있는가"],
    ].map(([key, title, q]) => <article key={key}><span>{key}</span><h3>{title}</h3><p>{q}</p></article>)}</div>,
  },
  {
    eyebrow: "09 / WHAT WE VALUE",
    title: "화려함보다\n판단의 연결을 봅니다",
    note: "세부 배점은 강의계획서를 따릅니다. 여기서는 프로젝트 전 과정에서 공통으로 중요하게 보는 기준을 설명합니다.",
    content: <div className="value-list">{[
      ["01", "문제의 명확성", "사용자와 상황이 구체적인가"], ["02", "AI 역할의 타당성", "기술 선택이 문제와 연결되는가"],
      ["03", "구현과 협업", "핵심 경험이 작동하고 과정이 기록되는가"], ["04", "실증과 개선", "근거를 수집하고 결과에 반영했는가"],
    ].map(([n, title, desc]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>,
    tone: "blue",
  },
  {
    eyebrow: "10 / MINIMUM DELIVERABLES",
    title: "학기 말에는 결과만이 아니라\n과정을 함께 남깁니다",
    note: "산출물의 형식과 제출 시점은 프로젝트 범위가 정해진 뒤 구체적으로 안내합니다. 학생들에게 지금부터 작업 과정을 기록하도록 안내합니다.",
    content: <div className="deliverable-grid">{[
      [Layers3, "기획", "문제 정의 · 사용자 · 시나리오"], [MousePointer2, "프로토타입", "핵심 사용자 흐름이 작동하는 결과물"],
      [FlaskConical, "실증", "방법 · 데이터 · 해석 · 개선"], [NotebookPen, "기록", "의사결정 · 역할 · 버전 변화"],
    ].map(([Icon, title, desc]) => { const ItemIcon = Icon as typeof Layers3; return <article key={String(title)}><ItemIcon /><h3>{String(title)}</h3><p>{String(desc)}</p></article>; })}</div>,
  },
  {
    eyebrow: "11 / TODAY'S WORKSHOP",
    title: "첫 프로젝트 질문을\n한 문장으로 만듭니다",
    note: "개인 활동 10분, 2~3명 대화 15분, 전체 공유 15분 정도로 진행합니다. 해결책 이름부터 정하지 않도록 유도합니다.",
    content: <div className="prompt-layout"><p className="prompt-formula"><span>[누가]</span> <strong>어떤 상황에서</strong><br /><span>[어떤 어려움]</span>을 겪고 있는가?</p><div className="prompt-rules"><p><Check /> 해결책보다 사람과 상황부터</p><p><Check /> 직접 관찰하거나 확인할 수 있게</p><p><Check /> 한 학기 안에 다룰 수 있는 크기로</p></div></div>,
    tone: "orange",
  },
  {
    eyebrow: "12 / BEFORE NEXT CLASS",
    title: "다음 주에는 ‘아이디어’보다\n‘관찰한 장면’을 가져옵니다",
    note: "다음 주 준비물은 학생 상황에 맞춰 조정해도 됩니다. 핵심은 검색으로 만든 거대한 문제보다 본인이 실제로 관찰한 구체적인 장면입니다.",
    content: <div className="next-week"><div className="task-number">03</div><div><h3>관심 있는 문제 장면 3개</h3><ul><li>누가, 언제, 어디에서 겪는가</li><li>지금은 어떻게 해결하고 있는가</li><li>직접 확인할 수 있는 사람 또는 자료가 있는가</li></ul></div><div className="task-footnote">형식은 자유 · 각 장면 3—5줄</div></div>,
  },
  {
    eyebrow: "WELCOME / START HERE",
    title: "잘 만든 답보다\n잘 검증한 질문에서 시작합시다",
    note: "마무리 슬라이드입니다. 질문을 받고, 오늘 활동 결과와 다음 주 준비 내용을 다시 확인합니다.",
    content: <div className="closing-layout"><div className="closing-badge"><Sparkles /></div><p>질문이 있나요?</p><span>실증적AI개발프로젝트Ⅱ(종합설계) · 2026</span></div>,
    tone: "blue",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const go = useCallback((next: number) => setCurrent(Math.max(0, Math.min(slides.length - 1, next))), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") { event.preventDefault(); go(current + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); go(current - 1); }
      if (event.key.toLowerCase() === "n") setShowNotes((value) => !value);
      if (event.key.toLowerCase() === "o") setShowOverview((value) => !value);
      if (event.key === "Escape") setShowOverview(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const toggleFullscreen = async () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  const slide = slides[current];

  return <main className="deck-shell">
    <header className="deck-header">
      <button className="brand" onClick={() => go(0)} aria-label="첫 슬라이드로 이동"><span className="brand-mark">DA</span><span><strong>실증적AI개발프로젝트Ⅱ(종합설계)</strong><small>동아대학교 AI학과</small></span></button>
      <div className="header-actions"><button onClick={() => setShowOverview(true)}>전체 보기 <kbd>O</kbd></button><button onClick={() => setShowNotes((value) => !value)}>발표 메모 <kbd>N</kbd></button><Button variant="outline" size="icon-sm" onClick={toggleFullscreen} aria-label={isFullscreen ? "전체 화면 종료" : "전체 화면"}>{isFullscreen ? <Minimize /> : <Expand />}</Button></div>
    </header>
    <div className="stage-wrap"><section className={`slide-stage tone-${slide.tone ?? "lime"}`} aria-live="polite"><div className="grid-overlay" /><div className="slide-meta"><span>{slide.eyebrow}</span><span>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span></div><div className="slide-title-wrap"><h1>{slide.title.split("\n").map((line, index) => <span key={index}>{line}</span>)}</h1></div><div className="slide-content">{slide.content}</div><div className="corner-mark">DONG-A · AI</div></section></div>
    <footer className="deck-footer"><div className="progress-track" aria-label={`전체 ${slides.length}장 중 ${current + 1}장`}><span style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div><div className="footer-controls"><p><kbd>←</kbd><kbd>→</kbd> 또는 화면 버튼으로 이동</p><div><Button variant="outline" size="icon" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전 슬라이드"><ArrowLeft /></Button><Button size="icon" onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="다음 슬라이드"><ArrowRight /></Button></div></div></footer>
    {showNotes && <aside className="notes-panel"><div><span>발표자 메모</span><button onClick={() => setShowNotes(false)} aria-label="발표자 메모 닫기"><X /></button></div><p>{slide.note}</p></aside>}
    {showOverview && <div className="overview-backdrop" role="dialog" aria-modal="true" aria-label="슬라이드 전체 보기"><div className="overview-panel"><header><div><span>SLIDE MAP</span><h2>전체 슬라이드</h2></div><button onClick={() => setShowOverview(false)} aria-label="전체 보기 닫기"><X /></button></header><div className="overview-grid">{slides.map((item, index) => <button key={item.eyebrow} className={index === current ? "active" : ""} onClick={() => { go(index); setShowOverview(false); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title.replace("\n", " ")}</strong>{index === current && <Play />}</button>)}</div></div></div>}
  </main>;
}
