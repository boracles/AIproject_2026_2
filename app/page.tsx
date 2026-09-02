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
    note: "첫 시간에는 수업이 어떻게 진행되는지 살펴보고, 각자 프로젝트Ⅰ에서 어디까지 만들었는지 편하게 이야기합니다.",
    chineseNote: "第一节课先了解课程如何进行，再轻松分享各自在项目Ⅰ中已经完成到什么程度。",
    content: <div className="cover-content"><div className="cover-statement"><span>THU 12:00–15:00 · S06-602</span><strong>문제를 제대로 짚고,<br />사용자가 써 본 결과로 다음 버전을 만듭니다.</strong><p>先找准问题，再根据用户实际使用后的结果迭代下一版本。</p></div><div className="course-card"><span>2026. 09. 03</span><strong>WEEK 01</strong><p>동아대학교 AI학과 · 东亚大学人工智能系<br />윤보라 · 尹보라</p></div></div>,
  },
  {
    index: "02", eyebrow: "이번 학기 수업", chineseEyebrow: "本学期课程",
    title: "문제를 분명히 하고,\n필요한 AI 기능을 끝까지 구현합니다", chineseTitle: "明确问题，并把真正需要的AI功能实现到底",
    note: "문제와 사용자를 따로 살펴본 뒤, 필요한 AI 기능을 실제 서비스에 붙이고 사용자의 반응을 보며 다듬는 수업이라고 설명합니다.",
    chineseNote: "先分别梳理问题与用户，再把所需的AI功能接入实际服务，并根据用户反馈持续改进。",
    content: <div className="course-grid"><article><span>01</span><h3>문제 정리</h3><p>무엇이 불편한지, 왜 해결해야 하는지부터 분명히 합니다.</p><small>梳理问题<br />先明确哪里不方便，以及为什么需要解决。</small></article><article><span>02</span><h3>사용자 이해</h3><p>누가 언제 이 서비스를 쓰는지 살펴보고 필요한 기능을 정합니다.</p><small>理解用户<br />了解谁会在什么情况下使用，并确定所需功能。</small></article><article><span>03</span><h3>만들고 다듬기</h3><p>AI 기능을 실제 화면에 붙이고, 써 본 반응을 보며 고칩니다.</p><small>开发与改进<br />把AI功能接入实际界面，并根据使用反馈修改。</small></article><article className="assessment"><span>평가 · 评价</span><div><b>출결<small>出勤</small></b><strong>20%</strong></div><div><b>주차별 프로젝트 과제<small>每周项目作业</small></b><strong>30%</strong></div><div><b>중간 발표<small>期中汇报</small></b><strong>20%</strong></div><div><b>최종 발표와 시연<small>期末汇报与演示</small></b><strong>30%</strong></div></article></div>,
  },
  {
    index: "03", eyebrow: "이 수업은 무엇을 하는가", chineseEyebrow: "这门课要做什么",
    title: "프로젝트Ⅰ에서 만든 결과를 이어,\n이번 학기에는 ‘쓸 수 있는 서비스’로 완성합니다", chineseTitle: "延续项目Ⅰ的成果，本学期把它完成为真正可用的服务",
    note: "프로젝트Ⅰ에서 만든 결과를 처음부터 다시 만드는 수업이 아닙니다. 현재 상태를 점검하고, AI 기능을 서비스 흐름에 연결한 뒤 직접 써 보며 완성도를 높입니다.",
    chineseNote: "这门课不是从头重做项目Ⅰ，而是检查当前状态，把AI功能接入服务流程，并通过实际使用不断提高完成度。",
    content: <div className="purpose-layout"><div className="purpose-cards">{[["01", "현재 상태 점검", "检查当前状态", "프로젝트Ⅰ에서 만든 것과 아직 안 된 것을 먼저 정리합니다.", "先梳理项目Ⅰ中已经完成和尚未完成的部分。"], ["02", "서비스에 연결", "接入服务", "AI 모델이나 API를 사용자가 실제로 거치는 화면과 기능에 연결합니다.", "把AI模型或API接入用户实际使用的界面与功能。"], ["03", "직접 써 보고 수정", "实际使用并修改", "대상 사용자가 핵심 기능을 써 보게 하고, 막히는 부분을 고칩니다.", "让目标用户试用核心功能，并修改使用中遇到的问题。"]].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></article>)}</div><div className="purpose-result"><span>학기 말 결과물 · 学期成果</span><strong>직접 실행할 수 있는 AI 서비스 + 테스트 기록<small>可直接运行的AI服务 + 测试记录</small></strong></div></div>,
  },
  {
    index: "04", eyebrow: "프로젝트 사례 · 아이디어", chineseEyebrow: "项目案例 · 创意",
    title: "이런 일상의 불편에서\nAI 프로젝트를 시작할 수 있습니다", chineseTitle: "可以从这些日常不便中开始AI项目",
    note: "거창한 기술보다 자주 겪는 불편을 구체적으로 찾는 것이 좋은 출발입니다. 세 가지 예시 중 어떤 기능을 직접 써 보고 싶은지 학생들에게 물어봅니다.",
    chineseNote: "比起宏大的技术，从经常遇到的具体不便出发更合适。可以问学生三个案例中最想亲自使用哪一个。",
    content: <div className="example-grid">{[["SPEECH", "발표 연습 코치", "演讲练习教练", "발표 영상을 올리면 말 빠르기·반복 표현·침묵 구간을 보여주고, 다음 연습 항목을 추천합니다.", "上传演讲视频后，分析语速、重复表达和停顿，并推荐下一步练习内容。", "발표가 낯선 대학생", "不熟悉演讲的大学生"], ["STUDY", "전공 수업 자료 도우미", "专业课程资料助手", "강의자료의 어려운 용어를 쉽게 풀고, 답변마다 근거가 된 페이지를 함께 보여줍니다.", "用简单语言解释课件中的难懂术语，并在每个回答中标出依据页面。", "한국어 전공 수업을 듣는 유학생", "学习韩语专业课的留学生"], ["CAMPUS", "교내 공지 찾기", "校内通知查找助手", "학과·장학·졸업 공지를 모아 질문에 답하고, 원문 링크와 마감일을 정리해 줍니다.", "汇总院系、奖学金和毕业通知，回答问题并整理原文链接与截止日期。", "필요한 공지를 자주 놓치는 학생", "经常错过重要通知的学生"]].map(([tag, title, chineseTitle, detail, chineseDetail, user, chineseUser]) => <article key={tag}><span>{tag}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p><b>사용자 · 用户<strong>{user}<small>{chineseUser}</small></strong></b></article>)}</div>,
  },
  {
    index: "05", eyebrow: "프로젝트 사례 · 구체화", chineseEyebrow: "项目案例 · 具体化",
    title: "막연한 아이디어도\n사용 장면을 정하면 프로젝트가 됩니다", chineseTitle: "模糊的想法，只要明确使用场景，就能变成项目",
    note: "‘AI 공부 앱’처럼 넓은 아이디어를 사용자, 사용 장면, 핵심 기능, 테스트 방법으로 좁혀 가는 과정을 보여줍니다.",
    chineseNote: "展示如何把“AI学习应用”这样宽泛的想法，收窄为用户、使用场景、核心功能和测试方法。",
    content: <div className="case-flow">{[["01 · 처음 아이디어", "01 · 最初想法", "AI로 공부를 도와주는 앱", "用AI帮助学习的应用"], ["02 · 사용 장면", "02 · 使用场景", "중국인 유학생이 한국어 전공 강의자료를 읽다가 이해되지 않는 개념을 만났을 때", "中国留学生阅读韩语专业课资料时，遇到不理解的概念"], ["03 · 핵심 기능", "03 · 核心功能", "자료 업로드 → 질문 → 근거 페이지 + 쉬운 설명 + 한중 용어 비교", "上传资料 → 提问 → 依据页面 + 简单解释 + 中韩术语对照"], ["04 · 테스트 방법", "04 · 测试方法", "실제 강의자료의 질문 10개로 근거 페이지가 맞는지, 설명이 도움이 되는지 살펴봅니다.", "用真实课件的10个问题，检查依据页面是否正确、解释是否有帮助。"]].map(([label, chineseLabel, detail, chineseDetail], i) => <article key={label} className={i === 0 ? "case-start" : ""}><span>{label}<small>{chineseLabel}</small></span><strong>{detail}<small>{chineseDetail}</small></strong>{i < 3 && <ChevronRight />}</article>)}</div>,
  },
  {
    index: "06", eyebrow: "이 수업에서 말하는 실증", chineseEyebrow: "本课程所说的实证",
    title: "‘좋아 보인다’가 아니라\n직접 써 본 결과로 판단합니다", chineseTitle: "不凭“看起来不错”，而用实际使用结果来判断",
    note: "먼저 테스트 목표를 정하고, 사용자가 직접 써 보는 모습을 살펴본 뒤, 기록한 결과를 다음 버전에 반영하는 과정을 실증이라고 설명합니다.",
    chineseNote: "先确定测试目标，观察用户实际使用，再把记录的结果反映到下一版本——这就是本课程所说的实证。",
    content: <div className="evidence-layout"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow">{[["테스트 목표", "测试目标"], ["직접 사용", "实际使用"], ["결과 기록", "记录结果"], ["다음 버전", "下一版本"]].map(([item, chinese], i) => <div key={item}><span>0{i + 1}</span><p>{item}<small>{chinese}</small></p>{i < 3 && <ChevronRight />}</div>)}</div><p className="evidence-explain">먼저 무엇이 잘되어야 하는지 기준을 정합니다. 그다음 사용자가 서비스를 쓰는 모습을 살펴보고, 결과를 기록해 다음 버전에 반영합니다.<br /><small>先确定什么才算做得好，再观察用户如何使用服务，并把记录的结果反映到下一版本。</small></p></div>,
  },
  {
    index: "07", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "2~3주 단위로 만들고,\n수업에서 함께 리뷰합니다", chineseTitle: "每2~3周完成一轮开发，并在课堂上共同评审",
    note: "한 번에 완성하려 하지 않고, 2~3주마다 계획·개발·리뷰를 반복합니다. 중간 발표와 최종 발표는 지금까지 만든 결과를 직접 보여주는 시간입니다.",
    chineseNote: "不追求一次完成，而是每2~3周重复计划、开发与评审。期中和期末汇报用于现场展示已经完成的成果。",
    content: <div className="sprint-map">{[["01–02", "시작", "开始", "수업 안내 · 프로젝트 현황 공유", "课程说明 · 分享项目现状"], ["03–05", "스프린트 1", "冲刺 1", "MVP 범위 정하기 · 핵심 AI 기능 구현", "确定MVP范围 · 实现核心AI功能"], ["06–08", "스프린트 2", "冲刺 2", "화면과 AI 기능 연결 · 중간 발표", "连接界面与AI功能 · 期中汇报"], ["09–11", "스프린트 3", "冲刺 3", "사용자 테스트 · 문제점 수정", "用户测试 · 修改问题"], ["12–15", "스프린트 4", "冲刺 4", "최종 통합 · 발표와 시연", "最终整合 · 汇报与演示"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week} className={i === 0 ? "start-phase" : ""}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 2 && <b>8주차 · 第8周<br />중간 발표 · 期中汇报</b>}{i === 4 && <b>15주차 · 第15周<br />최종 발표 · 期末汇报</b>}</article>)}</div>,
  },
  {
    index: "08", eyebrow: "오늘 진행 순서", chineseEyebrow: "今天的进行顺序",
    title: "오늘 수업은\n이 순서로 진행합니다", chineseTitle: "今天的课程按以下顺序进行",
    note: "수업 운영 방식과 프로젝트 사례를 살펴본 뒤, 학생들의 프로젝트Ⅰ 진행 상황을 함께 이야기하고 다음 주 팀 프로젝트 소개를 안내합니다.",
    chineseNote: "先了解课程方式和项目案例，再交流项目Ⅰ的进展，并说明下周的团队项目介绍。",
    content: <div className="today-layout"><div className="today-list">{[["수업 안내", "课程说明", "수업 목표, 평가 방식, 한 학기 진행 순서를 설명합니다.", "说明课程目标、评价方式与一学期的进行顺序。"], ["프로젝트 사례와 이야기", "项目案例与交流", "사례를 함께 보고, 프로젝트Ⅰ에서 만든 것과 어려운 점을 이야기합니다.", "一起看项目案例，并交流项目Ⅰ中完成的内容与遇到的困难。"], ["다음 주 준비 안내", "下周准备说明", "본인 팀 프로젝트를 어떻게 소개하면 되는지 안내합니다.", "说明下周如何介绍自己团队的项目。"]].map(([title, chineseTitle, detail, chineseDetail], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></div><Check /></article>)}</div><aside><Users /><strong>오늘 이야기할 내용</strong><span>今天要交流的内容</span><p>자기소개 · 프로젝트Ⅰ에서 만든 것 · 현재 어려운 점<small>自我介绍 · 项目Ⅰ中完成的内容 · 目前的困难</small></p></aside></div>,
  },
  {
    index: "09", eyebrow: "다음 주 준비", chineseEyebrow: "下周准备",
    title: "다음 주에는\n본인 팀의 프로젝트를 소개합니다", chineseTitle: "下周介绍自己团队的项目",
    note: "다음 수업에서 본인 팀의 프로젝트를 소개할 수 있도록 팀 구성, 해결하려는 문제, 현재 상태와 이번 학기 핵심 AI 기능을 정리해 옵니다.",
    chineseNote: "为下节课介绍自己团队的项目，请整理团队成员、要解决的问题、当前状态以及本学期的核心AI功能。",
    content: <div className="assignment-layout"><div className="assignment-head"><ClipboardList /><div><span>2주차 팀 프로젝트 소개 · 第2周团队项目介绍</span><h3>본인 팀 프로젝트 소개 준비<small>准备介绍自己团队的项目</small></h3><p>다음 수업에서 아래 내용을 팀별로 소개합니다.<small>下节课各组介绍以下内容。</small></p></div></div><ol>{[["팀명과 팀원", "团队名称与成员"], ["프로젝트 이름, 해결하려는 문제, 대상 사용자", "项目名称、要解决的问题与目标用户"], ["프로젝트Ⅰ에서 만든 것과 현재 어려운 점", "项目Ⅰ中已经完成的内容与目前的困难"], ["이번 학기에 구현할 핵심 AI 기능", "本学期要实现的核心AI功能"]].map(([item, chinese], i) => <li key={item}><span>{i + 1}</span><div><strong>{item}</strong><small>{chinese}</small></div></li>)}</ol><div className="submission-box"><span>다음 수업 · 下节课</span><strong>팀 프로젝트 소개<small>团队项目介绍</small></strong><p>본인 팀의 프로젝트를 설명할 수 있도록 준비해 오세요.<small>请准备好介绍自己团队的项目。</small></p></div></div>,
  },
  {
    index: "10", eyebrow: "마무리", chineseEyebrow: "结束",
    title: "다음 주에는 각 팀이\n무엇을 만들지 함께 봅니다", chineseTitle: "下周一起看看每个团队要做什么",
    note: "다음 주에 준비할 세 가지 항목을 다시 짚고, 수업이나 프로젝트에 관한 질문을 받습니다.",
    chineseNote: "再次确认下周要准备的三项内容，并回答有关课程或项目的问题。",
    content: <div className="closing-content"><div className="closing-orb"><Sparkles /></div><div><p>궁금한 점이 있나요?<small>有想问的吗？</small></p><span>다음 주에는 본인 팀의 프로젝트와 이번 학기 계획을 소개합니다.<small>下周将介绍自己团队的项目与本学期计划。</small></span></div></div>,
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
