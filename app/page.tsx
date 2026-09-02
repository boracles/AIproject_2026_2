"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, ClipboardList,
  Expand, Minimize, MonitorUp, Sparkles, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  index: string; eyebrow: string; chineseEyebrow: string;
  title: string; chineseTitle: string; note: string; chineseNote: string; content: React.ReactNode;
};

const slides: Slide[] = [
  {
    index: "01", eyebrow: "실증적AI개발프로젝트Ⅱ(종합설계)", chineseEyebrow: "实证人工智能开发项目Ⅱ（综合设计）",
    title: "1주차 · 수업 안내와\n프로젝트 소개", chineseTitle: "第1周 · 课程说明与项目介绍",
    note: "첫 수업은 약 1시간 동안 운영 방식을 안내하고, 학생들이 프로젝트Ⅰ의 현재 상태를 편하게 말로 공유하도록 진행합니다.",
    chineseNote: "第一节课用约1小时介绍课程运作方式，并请学生轻松口头分享项目Ⅰ的当前状态。",
    content: <div className="cover-content"><div className="cover-statement"><span>THU 12:00–15:00 · S06-602</span><strong>문제를 정의하고<br />사용자 데이터와 테스트 결과로 개선 방향을 결정합니다.</strong><p>先定义问题，再根据用户数据和测试结果确定改进方向。</p></div><div className="course-card"><span>2026. 09. 03</span><strong>WEEK 01</strong><p>동아대학교 AI학과 · 东亚大学人工智能系<br />윤보라 · 尹보라</p></div></div>,
  },
  {
    index: "02", eyebrow: "이번 학기 수업", chineseEyebrow: "本学期课程",
    title: "문제를 명확히 정의하고,\nAI 해결책을 구현·검증합니다", chineseTitle: "明确界定问题，并实现与验证AI解决方案",
    note: "문제 정의와 대상 사용자 설정을 구분하고, 확인한 사용자 요구에 맞춰 AI 기능을 구현하고 검증하는 수업임을 안내합니다.",
    chineseNote: "区分问题定义与目标用户设定，并说明课程将根据确认的用户需求实现和验证AI功能。",
    content: <div className="course-grid"><article><span>01</span><h3>문제 정의</h3><p>해결할 문제의 원인·범위·맥락을 구체화합니다.</p><small>问题定义<br />明确要解决问题的原因、范围与情境。</small></article><article><span>02</span><h3>대상 사용자</h3><p>누구를 위한 프로젝트인지 정하고 요구를 확인합니다.</p><small>目标用户<br />确定项目面向谁，并确认其需求。</small></article><article><span>03</span><h3>AI 해결책</h3><p>요구에 맞는 핵심 기능을 구현하고 결과를 검증합니다.</p><small>AI解决方案<br />实现符合需求的核心功能并验证结果。</small></article><article className="assessment"><span>평가 · 评价</span><div><b>출결<small>出勤</small></b><strong>20%</strong></div><div><b>주차별 프로젝트 과제<small>每周项目作业</small></b><strong>30%</strong></div><div><b>중간 발표<small>期中汇报</small></b><strong>20%</strong></div><div><b>최종 발표와 시연<small>期末汇报与演示</small></b><strong>30%</strong></div></article></div>,
  },
  {
    index: "03", eyebrow: "이 수업은 무엇을 하는가", chineseEyebrow: "这门课要做什么",
    title: "프로젝트Ⅰ의 결과를 이어,\n작동하는 AI 서비스로 완성합니다", chineseTitle: "延续项目Ⅰ的成果，完成真正可运行的AI服务",
    note: "이 수업은 프로젝트Ⅰ에서 정한 문제와 구현 결과를 출발점으로 삼아, AI 기능을 서비스에 통합하고 실제 사용 상황에서 검증하는 종합설계 수업입니다.",
    chineseNote: "本课程以项目Ⅰ中确定的问题和实现结果为起点，将AI功能整合到服务中，并在实际使用情境中进行验证。",
    content: <div className="purpose-layout"><div className="purpose-cards">{[["01", "현재 상태에서 시작", "从当前状态出发", "프로젝트Ⅰ에서 정한 문제·기획·구현 결과를 다시 점검하고 이어 개발합니다.", "重新检查项目Ⅰ中确定的问题、规划与实现结果，并继续开发。"], ["02", "서비스로 통합", "整合为服务", "AI 모델이나 API를 입력–처리–결과의 사용자 흐름에 연결합니다.", "将AI模型或API接入“输入–处理–结果”的用户流程。"], ["03", "사용 상황에서 검증", "在使用情境中验证", "대상 사용자가 핵심 기능을 직접 사용하게 하고, 결과와 한계를 기록합니다.", "让目标用户实际使用核心功能，并记录结果与局限。"]].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></article>)}</div><div className="purpose-result"><span>수업의 결과물 · 课程成果</span><strong>실행 가능한 AI 서비스 + 검증 기록<small>可运行的AI服务 + 验证记录</small></strong></div></div>,
  },
  {
    index: "04", eyebrow: "이 수업에서의 실증", chineseEyebrow: "本课程中的实证",
    title: "‘좋을 것 같다’를\n근거가 있는 판단으로", chineseTitle: "将“看起来不错”变成有依据的判断",
    note: "실증은 마지막 설문이나 발표가 아니라, 무엇을 확인할지 정하고 그 결과로 다음 선택을 하는 과정이라고 설명합니다.",
    chineseNote: "说明“实证”不是最后才做的问卷或汇报，而是先确定要验证什么，再根据结果决定下一步的过程。",
    content: <div className="evidence-layout"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow">{[["확인할 질문", "待确认的问题"], ["사용 시나리오", "使用情境"], ["결과와 기록", "结果与记录"], ["다음 개선", "下一步改进"]].map(([item, chinese], i) => <div key={item}><span>0{i + 1}</span><p>{item}<small>{chinese}</small></p>{i < 3 && <ChevronRight />}</div>)}</div><p className="evidence-explain">아이디어를 말로 설명하는 데 그치지 않고, 무엇을 확인할지 먼저 정한 뒤 데이터·사용 시나리오·프로젝트 결과를 근거로 성과와 한계를 판단합니다.<br /><small>不是停留在口头说明创意，而是先确定要确认的内容，依据数据、使用情境和项目结果判断成果与局限。</small></p></div>,
  },
  {
    index: "05", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "짧게 계획하고,\n만들고, 함께 검토합니다", chineseTitle: "短周期计划、开发与共同评审",
    note: "각 스프린트가 계획, 개발, 리뷰로 이어짐을 설명합니다. 중간과 최종 발표는 결과를 공유하고 다음 선택을 정리하는 자리입니다.",
    chineseNote: "说明每个冲刺由计划、开发和评审组成。期中与期末汇报用于分享成果并整理下一步选择。",
    content: <div className="sprint-map">{[["01–02", "시작", "开始", "수업 안내 · 프로젝트 계획 공유", "课程说明 · 分享项目计划"], ["03–05", "스프린트 1", "冲刺 1", "MVP 계획 · AI 기능 개발 · 리뷰", "MVP计划 · AI功能开发 · 评审"], ["06–08", "스프린트 2", "冲刺 2", "서비스 통합 · 중간 발표", "服务整合 · 期中汇报"], ["09–11", "스프린트 3", "冲刺 3", "기능 고도화 · 사용 시나리오 점검", "功能优化 · 使用情境检查"], ["12–15", "스프린트 4", "冲刺 4", "최종 통합 · 발표와 시연", "最终整合 · 汇报与演示"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week} className={i === 0 ? "start-phase" : ""}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 2 && <b>8주차 · 第8周<br />중간 발표 · 期中汇报</b>}{i === 4 && <b>15주차 · 第15周<br />최종 발표 · 期末汇报</b>}</article>)}</div>,
  },
  {
    index: "06", eyebrow: "오늘 수업 · 1주차", chineseEyebrow: "今天的课程 · 第1周",
    title: "오늘 확인할\n세 가지 목표", chineseTitle: "今天要确认的三个目标",
    note: "운영 방식과 학기 흐름을 이해하고, 프로젝트Ⅰ의 상태를 구두로 공유한 뒤, 2주차 준비 항목을 확인합니다.",
    chineseNote: "理解课程运作方式和学期流程，口头分享项目Ⅰ的当前状态，并确认第2周的准备事项。",
    content: <div className="week-goals">{[
      ["01", "수업 이해", "理解课程", "과목의 운영 방식과 학기 프로젝트의 흐름을 이해한다.", "了解课程安排与本学期项目流程。"],
      ["02", "프로젝트 공유", "分享项目", "자기소개와 프로젝트Ⅰ의 현재 상태를 편하게 구두로 공유한다.", "轻松进行自我介绍，并口头分享项目Ⅰ的当前状态。"],
      ["03", "다음 주 준비", "准备下周", "2주차 프로젝트 계획 공유를 위한 준비 사항을 확인한다.", "确认第2周项目计划分享的准备事项。"],
    ].map(([number, title, chineseTitle, detail, chinese]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p><small>{chineseTitle}<br />{chinese}</small></article>)}</div>,
  },
  {
    index: "07", eyebrow: "다음 주 준비 · 2주차", chineseEyebrow: "下周准备 · 第2周",
    title: "첫날은 서로의 프로젝트를\n가볍게 알아가는 시간입니다", chineseTitle: "第一天，轻松了解彼此的项目",
    note: "첫날에는 발표 자료를 요구하지 않습니다. 자기소개와 프로젝트Ⅰ의 현재 상태를 자유롭게 말하고, 다음 주 준비 형식을 이해하면 됩니다.",
    chineseNote: "第一天无需准备汇报材料。自由介绍自己和项目Ⅰ的现状，并了解下周的准备形式即可。",
    content: <div className="today-layout"><div className="today-list">{[["수업 안내", "课程说明", "과목의 목표, 평가 방식, 주차별 진행, 과제 제출 방식을 간단히 안내합니다.", "简要介绍课程目标、评价方式、每周进度与作业提交方式。"], ["자기소개와 프로젝트 소개", "自我介绍与项目介绍", "관심 분야와 프로젝트Ⅰ에서 진행한 내용을 자유롭게 이야기합니다.", "自由分享感兴趣的领域以及项目Ⅰ中已完成的内容。"], ["2주차 프로젝트 계획 공유 안내", "第2周项目计划分享说明", "다음 주에 공유할 프로젝트 계획의 형식과 준비 항목을 확인합니다.", "确认下周项目计划分享的形式与准备事项。"], ["질의응답", "答疑", "수업과 프로젝트 진행에 관한 질문을 확인합니다.", "解答有关课程与项目进展的问题。"]].map(([title, chineseTitle, detail, chineseDetail], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></div><Check /></article>)}</div><aside><Users /><strong>오늘은<br />발표 자료가<br />필요 없습니다.</strong><span>今天无需准备汇报材料</span></aside></div>,
  },
  {
    index: "08", eyebrow: "1주차 과제", chineseEyebrow: "第1周作业",
    title: "별도 제출 없이\n다음 주 공유를 준비합니다", chineseTitle: "无需单独提交，准备下周分享",
    note: "이번 주에는 별도 제출이 없습니다. 다음 주 프로젝트 계획 공유를 위해 세 가지 정보를 정리해 오도록 안내합니다.",
    chineseNote: "本周无需单独提交。为下周的项目计划分享整理三项信息。",
    content: <div className="assignment-layout"><div className="assignment-head"><ClipboardList /><div><span>1주차 별도 제출 없음 · 第1周无需单独提交</span><h3>프로젝트 계획 공유 준비<small>准备项目计划分享</small></h3><p>2주차 프로젝트 계획 공유를 위해 필요한 정보를 정리합니다.<small>整理第2周项目计划分享所需的信息。</small></p></div></div><ol>{[
      ["프로젝트 제목과 팀 구성", "项目名称与团队成员"],
      ["프로젝트Ⅰ의 현재 상태와 어려운 점", "项目Ⅰ的当前状态与遇到的困难"],
      ["이번 학기에 구현하고 싶은 핵심 AI 기능", "本学期希望实现的核心AI功能"],
    ].map(([item, chinese], i) => <li key={item}><span>{i + 1}</span><div><strong>{item}</strong><small>{chinese}</small></div></li>)}</ol><div className="submission-box"><span>이번 주 제출 · 本周提交</span><strong>없음 · 无</strong><p>정리한 내용은 2주차 프로젝트 계획 공유에 사용합니다.<small>整理的内容将用于第2周的项目计划分享。</small></p></div></div>,
  },
  {
    index: "09", eyebrow: "마무리", chineseEyebrow: "结束",
    title: "다음 주, 각 팀의\n프로젝트 계획을 만납니다", chineseTitle: "下周，分享各组的项目计划",
    note: "다음 주에 준비할 항목을 한 번 더 확인하고 질문을 받습니다.",
    chineseNote: "再次确认下周需要准备的事项，并回答问题。",
    content: <div className="closing-content"><div className="closing-orb"><Sparkles /></div><div><p>질문이 있나요?<small>有问题吗？</small></p><span>프로젝트 계획 공유 형식에 맞춰 자료를 준비해 주세요.<small>请按照项目计划分享的格式准备材料。</small></span></div></div>,
  },
];

const DECK_CHANNEL = "dong-a-week-1-deck";
const DECK_STORAGE_KEY = "dong-a-week-1-current";

function SlideCanvas({ slide, position }: { slide: Slide; position: number }) {
  return (
    <section className="slide-stage" aria-live="polite">
      <div className="wire wire-one" />
      <div className="wire wire-two" />
      <div className="cube cube-one" />
      <div className="cube cube-two" />
      <div className="cube cube-three" />
      <div className="slide-meta">
        <span>{slide.index} · {slide.eyebrow}<small>{slide.chineseEyebrow}</small></span>
        <span>{String(position + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className="slide-title-wrap">
        <h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p>{slide.chineseTitle}</p>
      </div>
      <div className="slide-content">{slide.content}</div>
      <div className="corner-mark">DONG-A · AI · WEEK 01</div>
    </section>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"slideshow" | "presenter">("slideshow");
  const channelRef = useRef<BroadcastChannel | null>(null);

  const go = useCallback((next: number) => {
    const normalized = Math.max(0, Math.min(slides.length - 1, next));
    setCurrent(normalized);
    window.localStorage.setItem(DECK_STORAGE_KEY, String(normalized));
    channelRef.current?.postMessage({ type: "navigate", current: normalized });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setViewMode(params.get("view") === "presenter" ? "presenter" : "slideshow");

    const stored = Number(window.localStorage.getItem(DECK_STORAGE_KEY));
    if (Number.isInteger(stored)) setCurrent(Math.max(0, Math.min(slides.length - 1, stored)));

    const channel = "BroadcastChannel" in window ? new BroadcastChannel(DECK_CHANNEL) : null;
    channelRef.current = channel;
    if (channel) {
      channel.onmessage = (event: MessageEvent<{ type?: string; current?: number }>) => {
        if (event.data.type === "navigate" && Number.isInteger(event.data.current)) {
          setCurrent(Math.max(0, Math.min(slides.length - 1, event.data.current as number)));
        }
      };
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== DECK_STORAGE_KEY || event.newValue === null) return;
      const next = Number(event.newValue);
      if (Number.isInteger(next)) setCurrent(Math.max(0, Math.min(slides.length - 1, next)));
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      channel?.close();
      channelRef.current = null;
    };
  }, []);

  const openDeckWindow = useCallback((mode: "slideshow" | "presenter") => {
    window.localStorage.setItem(DECK_STORAGE_KEY, String(current));
    const url = new URL(window.location.href);
    url.searchParams.set("view", mode);
    const features = mode === "presenter" ? "popup,width=1440,height=920" : "popup,width=1600,height=1000";
    window.open(url.toString(), `dong-a-${mode}`, features)?.focus();
  }, [current]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1); }
      if (event.key.toLowerCase() === "n" && viewMode === "slideshow") setShowNotes((value) => !value);
      if (event.key.toLowerCase() === "o" && viewMode === "slideshow") setShowOverview((value) => !value);
      if (event.key.toLowerCase() === "p" && viewMode === "slideshow") openDeckWindow("presenter");
      if (event.key === "Escape") { setShowOverview(false); setShowNotes(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go, openDeckWindow, viewMode]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const toggleFullscreen = async () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  const slide = slides[current];
  const nextSlide = slides[current + 1];

  if (viewMode === "presenter") {
    return (
      <main className="presenter-shell">
        <header className="presenter-header">
          <div>
            <span>발표자 화면 · 演讲者视图 · WEEK 01</span>
            <h1>실증적AI개발프로젝트Ⅱ(종합설계)<small>实证人工智能开发项目Ⅱ（综合设计）</small></h1>
          </div>
          <Button variant="outline" onClick={() => openDeckWindow("slideshow")}>
            <MonitorUp /> 슬라이드쇼 열기 · 打开幻灯片
          </Button>
        </header>
        <div className="presenter-layout">
          <section className="presenter-current">
            <div className="presenter-section-label">
              <span>현재 슬라이드 · 当前幻灯片</span>
              <strong>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</strong>
            </div>
            <div className="presenter-stage-wrap"><SlideCanvas slide={slide} position={current} /></div>
          </section>
          <aside className="presenter-sidebar">
            <section className="presenter-next">
              <span>다음 슬라이드 · 下一张幻灯片</span>
              {nextSlide ? (
                <>
                  <b>{nextSlide.index}</b>
                  <strong>{nextSlide.title.replace("\n", " ")}</strong>
                  <p>{nextSlide.chineseTitle}</p>
                </>
              ) : <strong>마지막 슬라이드입니다.<small>这是最后一张幻灯片。</small></strong>}
            </section>
            <section className="presenter-notes">
              <span>발표자 메모 · 演讲备注</span>
              <p>{slide.note}<small>{slide.chineseNote}</small></p>
            </section>
            <div className="presenter-controls">
              <Button variant="outline" onClick={() => go(current - 1)} disabled={current === 0}><ArrowLeft /> 이전 · 上一张</Button>
              <Button onClick={() => go(current + 1)} disabled={current === slides.length - 1}>다음 · 下一张 <ArrowRight /></Button>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="deck-shell">
      <header className="deck-header">
        <button className="brand" onClick={() => go(0)} aria-label="첫 슬라이드로 이동">
          <span className="brand-mark">DA</span>
          <span><strong>실증적AI개발프로젝트Ⅱ(종합설계)</strong><small>实证人工智能开发项目Ⅱ（综合设计） · 2026-2</small></span>
        </button>
        <div className="header-actions">
          <button onClick={() => setShowOverview(true)}>전체 보기 · 总览 <kbd>O</kbd></button>
          <button onClick={() => setShowNotes((value) => !value)}>발표 메모 · 备注 <kbd>N</kbd></button>
          <button onClick={() => openDeckWindow("presenter")}>발표자 화면 · 演讲者视图 <kbd>P</kbd></button>
          <Button variant="outline" size="icon-sm" onClick={toggleFullscreen} aria-label={isFullscreen ? "전체 화면 종료" : "전체 화면"}>{isFullscreen ? <Minimize /> : <Expand />}</Button>
        </div>
      </header>
      <div className="stage-wrap"><SlideCanvas slide={slide} position={current} /></div>
      <footer className="deck-footer">
        <div className="progress-track"><span style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div>
        <div className="footer-controls">
          <p><kbd>←</kbd><kbd>→</kbd> 또는 화면 버튼으로 이동 · 使用方向键或屏幕按钮切换</p>
          <div>
            <Button variant="outline" size="icon" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전 슬라이드"><ArrowLeft /></Button>
            <Button size="icon" onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="다음 슬라이드"><ArrowRight /></Button>
          </div>
        </div>
      </footer>
      {showNotes && <aside className="notes-panel"><div><span>발표자 메모 · 演讲备注</span><button onClick={() => setShowNotes(false)} aria-label="발표자 메모 닫기"><X /></button></div><p>{slide.note}<small>{slide.chineseNote}</small></p></aside>}
      {showOverview && <div className="overview-backdrop" role="dialog" aria-modal="true" aria-label="슬라이드 전체 보기"><div className="overview-panel"><header><div><span>SLIDE MAP · 幻灯片总览</span><h2>1주차 수업 안내<small>第1周课程说明</small></h2></div><button onClick={() => setShowOverview(false)} aria-label="전체 보기 닫기"><X /></button></header><div className="overview-grid">{slides.map((item, index) => <button key={item.index} className={index === current ? "active" : ""} onClick={() => { go(index); setShowOverview(false); }}><span>{item.index}</span><strong>{item.title.replace("\n", " ")}<small>{item.chineseTitle}</small></strong></button>)}</div></div></div>}
    </main>
  );
}
