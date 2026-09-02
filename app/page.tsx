"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, ChevronRight, ClipboardList,
  MonitorUp,
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
    index: "04", eyebrow: "AI 프로젝트 사례 1 · 학습", chineseEyebrow: "AI项目案例1 · 学习",
    title: "자료를 읽고 정리하는 NotebookLM", chineseTitle: "帮助阅读和整理资料的NotebookLM",
    note: "NotebookLM은 사용자가 올린 자료 안에서 답을 찾고 출처를 함께 보여 줍니다. AI 기능이 구체적인 공부 흐름과 어떻게 연결되는지 살펴봅니다.",
    chineseNote: "NotebookLM在用户上传的资料中寻找答案，并同时显示来源。请留意AI功能如何接入具体的学习流程。",
    content: <div className="case-study case-contain"><figure><img src="/cases/notebooklm.png" alt="NotebookLM 공식 소개 이미지" /><figcaption>Google 공식 소개 이미지 · Google官方介绍图片</figcaption></figure><div className="case-study-points">{[["누가 쓰나", "谁来使用", "강의 자료와 논문을 많이 읽는 학생·연구자", "需要阅读大量课程资料和论文的学生、研究者"], ["어떤 문제인가", "要解决什么问题", "자료가 많을수록 핵심 내용과 출처를 한꺼번에 파악하기 어렵다", "资料越多，越难同时掌握重点内容和来源"], ["무엇을 만들었나", "实现了什么", "올린 자료를 바탕으로 답하고 요약·학습 가이드·오디오 개요를 만드는 서비스", "基于上传资料回答问题，并生成摘要、学习指南和音频概览的服务"], ["눈여겨볼 점", "值得注意", "답변과 원문 출처를 연결해 사용자가 직접 확인할 수 있다", "把回答与原文来源连接起来，方便用户直接核对"]].map(([label, chineseLabel, detail, chineseDetail]) => <article key={label}><span>{label}<small>{chineseLabel}</small></span><strong>{detail}<small>{chineseDetail}</small></strong></article>)}<a href="https://blog.google/innovation-and-ai/products/developing-notebooklm/" target="_blank" rel="noreferrer">Google 공식 소개 보기 · 查看Google官方介绍 ↗</a></div></div>,
  },
  {
    index: "05", eyebrow: "AI 프로젝트 사례 2 · 접근성", chineseEyebrow: "AI项目案例2 · 无障碍",
    title: "수어를 텍스트로 바꾸는 Master Gesture", chineseTitle: "把手语转换为文字的Master Gesture",
    note: "Master Gesture의 실제 화면을 보며 누구의 어떤 어려움을 해결하려 했는지, 무엇을 구현했고 어떻게 공개했는지 차례로 짚습니다.",
    chineseNote: "通过Master Gesture的真实界面，了解团队为谁解决什么困难、实现了什么功能，以及如何公开成果。",
    content: <div className="case-study"><figure><img src="/cases/master-gesture.jpg" alt="Master Gesture가 카메라로 수어를 인식하는 테스트 화면" /><figcaption>프로젝트 테스트 화면 · 项目测试界面</figcaption></figure><div className="case-study-points">{[["누가 쓰나", "谁来使用", "청각·언어장애인과 대화 상대", "听障、言语障碍人士及其交流对象"], ["어떤 문제인가", "要解决什么问题", "수어를 모르는 사람과 바로 대화하기 어렵다", "难以与不懂手语的人即时交流"], ["무엇을 만들었나", "实现了什么", "카메라로 수어를 읽어 실시간 텍스트로 보여 주는 앱", "通过摄像头识别手语并实时显示文字的应用"], ["어떻게 구현했나", "如何实现", "YOLO로 동작을 인식하고 PyTorch·ONNX 모델을 앱에 연결", "用YOLO识别动作，并把PyTorch、ONNX模型接入应用"]].map(([label, chineseLabel, detail, chineseDetail]) => <article key={label}><span>{label}<small>{chineseLabel}</small></span><strong>{detail}<small>{chineseDetail}</small></strong></article>)}<a href="https://devpost.com/software/tomjerry" target="_blank" rel="noreferrer">Devpost 프로젝트 페이지 보기 · 查看Devpost项目页面 ↗</a></div></div>,
  },
  {
    index: "06", eyebrow: "AI 프로젝트 사례 3 · 접근성", chineseEyebrow: "AI项目案例3 · 无障碍",
    title: "사진과 영상을 설명하는 FROM YOUR EYES", chineseTitle: "描述照片和视频的FROM YOUR EYES",
    note: "FROM YOUR EYES는 시각장애인이 이미지와 영상의 내용을 파악할 수 있도록 설명을 제공합니다. 명확한 사용자 문제에서 시작해 서비스로 발전한 사례입니다.",
    chineseNote: "FROM YOUR EYES为视障用户提供图片和视频内容说明。这是一个从明确的用户问题出发并发展成服务的案例。",
    content: <div className="case-study case-contain"><figure><img src="/cases/from-your-eyes.webp" alt="FROM YOUR EYES 앱 화면" /><figcaption>서비스 화면 · 服务界面</figcaption></figure><div className="case-study-points">{[["누가 쓰나", "谁来使用", "이미지와 영상 정보를 얻기 어려운 시각장애인", "难以获取图片和视频信息的视障用户"], ["어떤 문제인가", "要解决什么问题", "온라인의 시각 자료가 설명 없이 제공되면 내용을 알기 어렵다", "网络视觉资料如果没有说明，就很难理解其内容"], ["무엇을 만들었나", "实现了什么", "사진과 영상을 분석해 사용자에게 내용 설명을 제공하는 서비스", "分析照片和视频，并向用户提供内容说明的服务"], ["프로젝트 결과", "项目成果", "2024 Microsoft Imagine Cup 세계 우승", "获得2024 Microsoft Imagine Cup全球冠军"]].map(([label, chineseLabel, detail, chineseDetail]) => <article key={label}><span>{label}<small>{chineseLabel}</small></span><strong>{detail}<small>{chineseDetail}</small></strong></article>)}<a href="https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" target="_blank" rel="noreferrer">Microsoft 우승 사례 보기 · 查看Microsoft冠军案例 ↗</a></div></div>,
  },
  {
    index: "07", eyebrow: "이 수업에서 말하는 실증", chineseEyebrow: "本课程所说的实证",
    title: "‘좋아 보인다’가 아니라\n직접 써 본 결과로 판단합니다", chineseTitle: "不凭“看起来不错”，而用实际使用结果来判断",
    note: "먼저 테스트 목표를 정하고, 사용자가 직접 써 보는 모습을 살펴본 뒤, 기록한 결과를 다음 버전에 반영하는 과정을 실증이라고 설명합니다.",
    chineseNote: "先确定测试目标，观察用户实际使用，再把记录的结果反映到下一版本——这就是本课程所说的实证。",
    content: <div className="evidence-layout"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow">{[["테스트 목표", "测试目标"], ["직접 사용", "实际使用"], ["결과 기록", "记录结果"], ["다음 버전", "下一版本"]].map(([item, chinese], i) => <div key={item}><span>0{i + 1}</span><p>{item}<small>{chinese}</small></p>{i < 3 && <ChevronRight />}</div>)}</div><p className="evidence-explain">먼저 무엇이 잘되어야 하는지 기준을 정합니다. 그다음 사용자가 서비스를 쓰는 모습을 살펴보고, 결과를 기록해 다음 버전에 반영합니다.<br /><small>先确定什么才算做得好，再观察用户如何使用服务，并把记录的结果反映到下一版本。</small></p></div>,
  },
  {
    index: "08", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "2~3주 단위로 만들고,\n수업에서 함께 리뷰합니다", chineseTitle: "每2~3周完成一轮开发，并在课堂上共同评审",
    note: "한 번에 완성하려 하지 않고, 2~3주마다 계획·개발·리뷰를 반복합니다. 중간 발표와 최종 발표는 지금까지 만든 결과를 직접 보여주는 시간입니다.",
    chineseNote: "不追求一次完成，而是每2~3周重复计划、开发与评审。期中和期末汇报用于现场展示已经完成的成果。",
    content: <div className="sprint-map">{[["01–02", "시작", "开始", "수업 안내 · 프로젝트 현황 공유", "课程说明 · 分享项目现状"], ["03–05", "스프린트 1", "冲刺 1", "MVP 범위 정하기 · 핵심 AI 기능 구현", "确定MVP范围 · 实现核心AI功能"], ["06–08", "스프린트 2", "冲刺 2", "화면과 AI 기능 연결 · 중간 발표", "连接界面与AI功能 · 期中汇报"], ["09–11", "스프린트 3", "冲刺 3", "사용자 테스트 · 문제점 수정", "用户测试 · 修改问题"], ["12–15", "스프린트 4", "冲刺 4", "최종 통합 · 발표와 시연", "最终整合 · 汇报与演示"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week} className={i === 0 ? "start-phase" : ""}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 2 && <b>8주차 · 第8周<br />중간 발표 · 期中汇报</b>}{i === 4 && <b>15주차 · 第15周<br />최종 발표 · 期末汇报</b>}</article>)}</div>,
  },
  {
    index: "09", eyebrow: "다음 주 준비", chineseEyebrow: "下周准备",
    title: "다음 주에는\n본인 팀의 프로젝트를 소개합니다", chineseTitle: "下周介绍自己团队的项目",
    note: "다음 수업에서 본인 팀의 프로젝트를 소개할 수 있도록 팀 구성, 해결하려는 문제, 현재 상태와 이번 학기 핵심 AI 기능을 정리해 옵니다.",
    chineseNote: "为下节课介绍自己团队的项目，请整理团队成员、要解决的问题、当前状态以及本学期的核心AI功能。",
    content: <div className="assignment-layout"><div className="assignment-head"><ClipboardList /><div><span>2주차 팀 프로젝트 소개 · 第2周团队项目介绍</span><h3>본인 팀 프로젝트 소개 준비<small>准备介绍自己团队的项目</small></h3><p>다음 수업에서 아래 내용을 팀별로 소개합니다.<small>下节课各组介绍以下内容。</small></p></div></div><ol>{[["팀명과 팀원", "团队名称与成员"], ["프로젝트 이름, 해결하려는 문제, 대상 사용자", "项目名称、要解决的问题与目标用户"], ["프로젝트Ⅰ에서 만든 것과 현재 어려운 점", "项目Ⅰ中已经完成的内容与目前的困难"], ["이번 학기에 구현할 핵심 AI 기능", "本学期要实现的核心AI功能"]].map(([item, chinese], i) => <li key={item}><span>{i + 1}</span><div><strong>{item}</strong><small>{chinese}</small></div></li>)}</ol><div className="submission-box"><span>다음 수업 · 下节课</span><strong>팀 프로젝트 소개<small>团队项目介绍</small></strong><p>본인 팀의 프로젝트를 설명할 수 있도록 준비해 오세요.<small>请准备好介绍自己团队的项目。</small></p></div></div>,
  },
];

const DECK_CHANNEL = "dong-a-week-1-deck";
const DECK_STORAGE_KEY = "dong-a-week-1-current";

function SlideCanvas({ slide, position }: { slide: Slide; position: number }) {
  return (
    <section className={`slide-stage slide-${slide.index}`} aria-live="polite">
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
      if (viewMode !== "presenter") return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go, openDeckWindow, viewMode]);
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
    <main className="audience-shell" aria-label="학생용 슬라이드쇼 화면">
      <SlideCanvas slide={slide} position={current} />
    </main>
  );
}
