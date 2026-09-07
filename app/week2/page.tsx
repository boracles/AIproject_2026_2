"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Blocks,
  BrainCircuit,
  Braces,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cloud,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Expand,
  FileImage,
  FilePlus2,
  FolderOpen,
  FolderTree,
  GitBranch,
  Images,
  KeyRound,
  Laptop,
  MousePointerClick,
  MonitorUp,
  PackageCheck,
  Presentation,
  RefreshCcw,
  ScanSearch,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  Terminal,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Source = { label: string; href: string };
type Slide = {
  index: string;
  section: string;
  chineseSection: string;
  title: string;
  englishTitle?: string;
  chineseTitle: string;
  content: React.ReactNode;
  note: React.ReactNode;
};

function SpeakerNote({
  duration,
  lead,
  points,
  prompt,
  transition,
  sources = [],
}: {
  duration: string;
  lead: string;
  points: string[];
  prompt?: string;
  transition?: string;
  sources?: Source[];
}) {
  return (
    <div className="w2-note-copy">
      <div className="w2-note-time">권장 시간 {duration}</div>
      <p className="w2-note-lead">{lead}</p>
      <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
      {prompt && <p className="w2-note-prompt"><strong>수업 질문</strong>{prompt}</p>}
      {transition && <p className="w2-note-transition"><strong>다음 장 연결</strong>{transition}</p>}
      {sources.length > 0 && (
        <div className="w2-note-sources">
          <strong>참고 자료</strong>
          {sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}

function CodeBlock({ title, code, compact = false }: { title: string; code: string; compact?: boolean }) {
  return (
    <div className={`w2-code ${compact ? "is-compact" : ""}`}>
      <div><span>{title}</span><b>CODE</b></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

const slides: Slide[] = [
  {
    index: "01",
    section: "WEEK 02 · RECOGNITION & CLASSIFICATION",
    chineseSection: "第2周 · 识别与分类",
    title: "Qwen Vision을 활용한 이미지 인식과 분류",
    englishTitle: "Image Recognition & Classification with Qwen Vision",
    chineseTitle: "使用 Qwen Vision 进行图像识别与分类",
    note: (
      <SpeakerNote
        duration="3분"
        lead="오늘은 이미지를 AI가 이해할 수 있는 정보로 바꾸고, 그 결과를 서비스 기능에 연결합니다."
        points={[
          "수업 전반부에는 팀별 프로젝트 방향을 2분에서 3분 안에 공유합니다.",
          "후반부에는 Python에서 Qwen API 연결을 확인하고 sample.jpg를 하나의 카테고리로 분류합니다.",
          "실습이 끝나면 코드와 실행 결과를 GitHub 저장소에 남깁니다.",
        ]}
        transition="먼저 오늘 수업이 끝났을 때 반드시 남아 있어야 할 결과를 확인하겠습니다."
      />
    ),
    content: (
      <div className="w2-cover">
        <div className="w2-cover-label">
          <span className="w2-kicker">WEEK 02 · QWEN VISION</span>
          <small>Recognition · Classification · API Practice</small>
        </div>
        <div className="w2-cover-visual">
          <img src="/ai-types/vision-object-detection.webp" alt="거리 사진 속 자전거와 바퀴를 감지하고 신뢰도 점수를 표시한 이미지 인식 화면" />
          <span className="w2-cover-model-tag"><ScanSearch /> VISION MODEL OUTPUT</span>
          <div className="w2-cover-result">
            <small>CLASSIFICATION</small>
            <strong>street scene <b>93%</b></strong>
          </div>
        </div>
      </div>
    ),
  },
  {
    index: "02",
    section: "TODAY'S FLOW",
    chineseSection: "今日课程流程",
    title: "오늘 수업은 이렇게 진행합니다",
    chineseTitle: "今天的课程流程",
    note: (
      <SpeakerNote
        duration="4분"
        lead="오늘 수업은 팀 아이디어 공유에서 시작해 개념 이해, API 연결, 사진 분류 실습, 팀 프로젝트 적용, 저장과 제출 순서로 진행합니다."
        points={[
          "먼저 각 팀이 주제, 문제, 타깃 유저, 초기 아이디어와 AI 역할을 짧게 발표합니다.",
          "Google Photos, Apple Photos, Google Lens를 보며 Recognition과 Classification이 서비스 행동으로 이어지는 방식을 살펴봅니다.",
          "Python에서 Qwen Text API 응답을 확인해 Key, 주소, 모델 연결이 정상인지 점검합니다.",
          "sample.jpg를 Qwen Vision에 보내 대표 category를 받고 해당 category folder에 연결하는 흐름을 실습합니다.",
          "실습 구조를 각 팀의 Input, Recognition 또는 Classification, Result, Service Action으로 다시 설계합니다.",
          "마지막으로 GitHub에 저장하고 Week 3 Goal을 작성해 제출합니다.",
        ]}
        prompt="여섯 단계 중 오늘 여러분 팀이 가장 집중해서 확인해야 할 단계는 무엇인가요?"
        transition="첫 번째 순서인 팀 프로젝트 아이디어 발표부터 시작하겠습니다."
      />
    ),
    content: (
      <div className="w2-today-flow">
        {[
          ["01", "팀 프로젝트 아이디어 발표", "주제 · 문제 · 타깃 유저 · 초기 아이디어 · AI 역할", "团队项目想法发表", "主题 · 问题 · 目标用户 · 初步想法 · AI作用"],
          ["02", "Recognition / Classification 살펴보기", "Google Photos · Apple Photos · Google Lens 사례", "了解 Recognition / Classification", "Google Photos · Apple Photos · Google Lens 案例"],
          ["03", "Qwen API 연결", "Python에서 Qwen 응답 확인", "连接 Qwen API", "在 Python 中确认 Qwen 响应"],
          ["04", "AI Photo Classifier 실습", "sample.jpg → Qwen Vision → category → category folder", "AI Photo Classifier 实践", ""],
          ["05", "팀 프로젝트에 적용", "Input → Recognition / Classification → Result → Service Action", "应用到团队项目", ""],
          ["06", "저장 및 제출", "GitHub Push · Week 3 Goal 작성", "保存与提交", "GitHub Push · 撰写第3周目标"],
        ].map(([number, title, detail, chineseTitle, chineseDetail]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <strong>{title}</strong>
              <p>{detail}</p>
              <small><b>{chineseTitle}</b>{chineseDetail && <em>{chineseDetail}</em>}</small>
            </div>
          </article>
        ))}
      </div>
    ),
  },
  {
    index: "03",
    section: "TODAY'S LAB",
    chineseSection: "今天的实践",
    title: "이미지를 분류하고, 결과에 따라\n사진을 자동 정리합니다",
    chineseTitle: "对图像进行分类，并根据结果自动整理照片",
    note: (
      <SpeakerNote
        duration="5분"
        lead="오늘 만들 흐름은 sample.jpg를 Qwen Vision으로 분류하고, 반환된 category를 사진 정리 규칙에 연결하는 것입니다."
        points={[
          "입력 단계에서 Python이 로컬의 sample.jpg를 읽어 API가 받을 수 있는 이미지 데이터로 변환합니다.",
          "Qwen Vision에는 이미지와 함께 person, document, food, device, other 중 대표 카테고리 하나를 고르라는 프롬프트를 보냅니다.",
          "사진에 휴대전화, 커피, 꽃이 함께 있어도 서비스 기준상 중심 대상인 휴대전화를 대표하는 device 한 단어만 받습니다.",
          "서비스는 device 결과를 photos/device 폴더와 연결합니다. 같은 규칙으로 document는 documents 폴더, food는 food 폴더에 연결할 수 있습니다.",
          "따라서 모델의 답을 보여 주는 데서 끝나지 않고 category를 실제 정리 행동으로 변환하는 것이 서비스 단계입니다.",
        ]}
        prompt="사진에 여러 물체가 함께 있다면 어떤 기준으로 대표 카테고리를 골라야 할까요?"
        transition="이제 팀별로 이번 학기 프로젝트가 어떤 문제를 다루는지 짧게 공유하겠습니다."
      />
    ),
    content: (
      <div className="w2-pipeline is-detailed">
        <article className="w2-pipeline-input">
          <figure>
            <img src="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=78&w=900" alt="휴대전화와 커피, 꽃이 놓인 책상 사진" />
            <figcaption>sample.jpg</figcaption>
          </figure>
          <div><span>01 · INPUT</span><strong>sample.jpg</strong><small>분류할 원본 사진 · 待分类照片</small></div>
        </article>
        <i><ArrowRight /><small>이미지 + 지시문</small></i>
        <article className="w2-pipeline-model">
          <ScanSearch />
          <span>02 · MODEL</span>
          <strong>Qwen Vision</strong>
          <p>사진 전체를 대표하는<br />카테고리 1개 선택</p>
          <div>{["person", "document", "food", "device", "other"].map((label) => <b className={label === "device" ? "is-active" : ""} key={label}>{label}</b>)}</div>
        </article>
        <i><ArrowRight /><small>한 단어 응답</small></i>
        <article className="is-result w2-pipeline-output">
          <Tags />
          <span>03 · OUTPUT</span>
          <strong>device</strong>
          <p>허용된 category 중 하나<br />单一类别结果</p>
        </article>
        <i><ArrowRight /><small>정리 규칙 실행</small></i>
        <article className="w2-pipeline-action">
          <FolderTree />
          <span>04 · ACTION</span>
          <strong>사진 자동 정리</strong>
          <div><small>photos/</small><b>└── device/</b><em>sample.jpg</em></div>
        </article>
      </div>
    ),
  },
  {
    index: "04",
    section: "TEAM PRESENTATION · 小组发表",
    chineseSection: "",
    title: "팀 프로젝트 발표",
    chineseTitle: "团队项目发表",
    note: (
      <SpeakerNote
        duration="팀 수에 따라 20분에서 30분"
        lead="각 팀은 2분에서 3분 동안 여섯 항목을 중심으로 현재의 프로젝트 계획을 소개합니다."
        points={[
          "Topic에서는 선택한 프로젝트 주제를 한 문장으로 말합니다.",
          "Problem은 만들 기능이 아니라 사용자가 겪는 불편이나 해결해야 할 상황으로 설명합니다.",
          "Target User는 이 문제를 가장 자주 겪고 해결의 도움을 받을 사람을 구체적으로 정합니다.",
          "Initial Idea에서는 문제를 해결하기 위해 가장 먼저 만들 핵심 기능을 제안합니다.",
          "AI Role은 인식·분류, 예측, 추천, 생성, 대화, 자동화 중 프로젝트에서 맡길 역할을 연결합니다.",
          "마지막 Week 3 Goal은 다음 수업에서 완료 여부를 실제 화면이나 코드로 확인할 수 있게 말합니다.",
        ]}
        prompt="발표를 들으면서 해결하려는 문제와 AI 역할이 자연스럽게 연결되는지 한 문장으로 메모해 주세요."
        transition="발표를 마친 팀은 다음 주부터 사용할 개발 리뷰 형식도 함께 기억해 주세요."
      />
    ),
    content: (
      <div className="w2-pitch-layout">
        <div className="w2-pitch-intro">
          <Presentation />
          <p><strong>각 팀은 2–3분 동안 아래 여섯 항목을 중심으로 프로젝트 계획을 소개합니다.</strong><small>每组用2–3分钟，围绕以下六项内容介绍项目计划。</small></p>
          <b>2–3 MIN / TEAM</b>
        </div>
        <div className="w2-pitch-grid">
          {[
            [Tags, "01", "TOPIC", "어떤 주제를 선택했나요?", "选择了什么主题？"],
            [AlertTriangle, "02", "PROBLEM", "어떤 문제를 해결하나요?", "要解决什么问题？"],
            [UsersRound, "03", "TARGET USER", "누구를 위한 서비스인가요?", "目标用户是谁？"],
            [Sparkles, "04", "INITIAL IDEA", "어떤 기능을 만들고 싶나요?", "想制作什么功能？"],
            [BrainCircuit, "05", "AI ROLE", "AI가 어떤 역할을 맡나요?", "AI承担什么角色？"],
            [BadgeCheck, "06", "WEEK 3 GOAL", "다음 주까지 무엇을 완료하나요?", "第3周前完成什么？"],
          ].map(([Icon, number, label, question, chinese]) => { const PitchIcon = Icon as typeof Tags; return (
            <article key={number as string}>
              <div className="w2-pitch-icon"><PitchIcon /></div>
              <div><span>{number as string} · {label as string}</span><strong>{question as string}</strong><small>{chinese as string}</small></div>
            </article>
          ); })}
        </div>
      </div>
    ),
  },
  {
    index: "05",
    section: "DEVELOPMENT REVIEW FROM WEEK 03",
    chineseSection: "从第3周开始的开发回顾",
    title: "다음 주부터는\n짧은 개발 리뷰로 시작합니다",
    chineseTitle: "从下周开始用简短的开发回顾开场",
    note: (
      <SpeakerNote
        duration="4분"
        lead="3주차부터 팀 발표는 매주 같은 네 칸으로 반복합니다."
        points={[
          "지난주 목표를 먼저 다시 읽어 실제로 약속한 범위를 확인합니다.",
          "진행 결과는 말로만 설명하지 말고 화면, 코드, 실행 로그처럼 확인할 수 있는 근거를 보여 줍니다.",
          "막힌 문제는 숨기지 말고 원인 가설과 시도한 방법까지 짧게 공유합니다.",
          "이번 주 목표는 다음 수업에서 완료 여부를 확인할 수 있는 문장으로 적습니다.",
        ]}
        transition="이제 오늘 실습할 인식·분류가 여섯 가지 AI 역할 중 어디에 해당하는지 보겠습니다."
      />
    ),
    content: (
      <div className="w2-review-flow">
        {[
          ["LAST WEEK", "지난주 목표", "上周目标"],
          ["RESULT", "진행·결과", "进展与结果"],
          ["BLOCKER", "막힌 점", "阻碍与问题"],
          ["THIS WEEK", "이번 주 목표", "本周目标"],
        ].map(([label, title, chinese], index) => (
          <div className="w2-review-step" key={label}>
            <article><span>{label}</span><strong>{title}</strong><small>{chinese}</small></article>
            {index < 3 && <ChevronRight />}
          </div>
        ))}
      </div>
    ),
  },
  {
    index: "06",
    section: "TODAY'S AI ROLE",
    chineseSection: "今天的AI角色",
    title: "오늘은 여섯 가지 역할 중\n인식·분류에 집중합니다",
    chineseTitle: "今天聚焦六种AI角色中的识别与分类",
    note: (
      <SpeakerNote
        duration="6분"
        lead="지난주에는 프로젝트에 적용할 수 있는 AI 역할을 여섯 가지로 나누어 살펴봤습니다."
        points={[
          "인식·분류는 입력에 이미 존재하는 대상이나 상태를 찾아 정해진 범주로 구분합니다.",
          "예측은 앞으로의 값이나 가능성을 추정하고, 추천은 후보의 순서를 사용자에 맞게 조정합니다.",
          "생성은 새로운 결과물을 만들고, 대화·지식검색은 근거를 찾아 답합니다.",
          "자동화·에이전트는 여러 단계를 계획하고 도구를 사용해 작업을 수행합니다.",
          "한 프로젝트 안에 두 가지 이상의 역할이 함께 들어갈 수 있습니다.",
        ]}
        prompt="여러분 팀의 핵심 AI 기능은 여섯 칸 중 어디에 가장 가깝나요?"
        transition="인식과 분류의 출력이 실제 서비스에서 어떤 행동으로 이어지는지 살펴보겠습니다."
      />
    ),
    content: (
      <div className="w2-ai-types">
        {[
          [ScanSearch, "인식·분류", "识别与分类", true],
          [BrainCircuit, "예측", "预测", false],
          [UsersRound, "추천·개인화", "推荐与个性化", false],
          [Sparkles, "생성", "生成", false],
          [Braces, "대화·지식검색", "对话与知识检索", false],
          [RefreshCcw, "자동화·에이전트", "自动化与智能体", false],
        ].map(([Icon, title, chinese, active]) => { const AIIcon = Icon as typeof ScanSearch; return (
          <article className={active ? "is-active" : ""} key={title as string}><AIIcon /><strong>{title as string}</strong><small>{chinese as string}</small></article>
        ); })}
      </div>
    ),
  },
  {
    index: "07",
    section: "RECOGNITION, CLASSIFICATION & SERVICE",
    chineseSection: "识别分类与服务",
    title: "모델의 라벨은\n다음 서비스 기능의 입력이 됩니다",
    chineseTitle: "模型标签成为后续服务功能的输入",
    note: (
      <SpeakerNote
        duration="7분"
        lead="인식·분류의 결과는 화면에 라벨을 보여 주는 것으로 끝나지 않습니다."
        points={[
          "사진에서 사람, 반려동물, 문서, 음식, 기기 같은 의미를 추출합니다.",
          "서비스는 그 의미를 검색어, 자동 앨범, 번역 대상, 상품 탐색 조건으로 사용합니다.",
          "같은 이미지 모델도 어떤 라벨을 정의하고 어떤 후속 행동에 연결하는지에 따라 서비스 가치가 달라집니다.",
          "오늘은 자동 사진 정리를 가정해 한 장의 사진을 대표 카테고리 하나로 분류합니다.",
        ]}
        prompt="정확한 라벨이 나와도 서비스에서 쓸 수 없는 경우는 언제일까요?"
        transition="이미 상용 서비스가 이 구조를 어떻게 활용하는지 세 가지 사례로 비교해 보겠습니다."
      />
    ),
    content: (
      <div className="w2-service-chain">
        <div className="w2-service-input"><FileImage /><span>IMAGE</span><strong>사진 속 의미 추출</strong><small>提取图像含义</small></div>
        <ChevronRight />
        <div className="w2-service-labels"><Tags /><span>LABELS</span><p><b>person</b><b>document</b><b>device</b></p><small>分类标签</small></div>
        <ChevronRight />
        <div className="w2-service-actions"><Sparkles /><span>SERVICE ACTION</span><strong>검색 · 정리 · 안내 · 번역</strong><small>搜索、整理、引导、翻译</small></div>
      </div>
    ),
  },
  {
    index: "08",
    section: "SERVICE CASES",
    chineseSection: "服务案例",
    title: "같은 이미지 인식도 서비스마다 쓰임이 다릅니다",
    chineseTitle: "同样的图像识别，在不同服务中的用途各不相同",
    note: (
      <SpeakerNote
        duration="4분"
        lead="이 장에서는 세 서비스를 자세히 설명하기 전에, 앞으로 살펴볼 비교 기준 두 가지를 먼저 잡습니다."
        points={[
          "첫 번째 기준은 서비스가 사진이나 카메라에서 무엇을 인식하는지입니다.",
          "두 번째 기준은 인식 결과를 검색, 정리, 번역 같은 어떤 기능에 연결하는지입니다.",
          "왼쪽의 같은 사진 모음도 Google Photos에서는 내용 검색의 대상, Apple Photos에서는 사람과 반려동물 컬렉션의 대상, Google Lens에서는 즉시 검색하거나 번역할 대상으로 사용됩니다.",
          "Google Photos는 사진 검색과 정리, Apple Photos는 앨범 구성과 검색, Google Lens는 검색·번역·정보 확인에 활용합니다.",
          "같은 Recognition과 Classification 결과도 연결되는 기능에 따라 서로 다른 서비스 경험이 됩니다.",
        ]}
        prompt="여러분 팀의 AI 결과는 사용자의 어떤 다음 행동으로 이어지나요?"
        transition="먼저 Google Photos가 저장된 사진을 검색 가능한 정보로 바꾸는 과정을 자세히 보겠습니다."
        sources={[
          { label: "Google Photos 소개", href: "https://www.google.com/photos/about/" },
          { label: "Apple Photos 사람 및 반려동물 찾기", href: "https://support.apple.com/ko-kr/108795" },
          { label: "Google Lens", href: "https://lens.google/" },
        ]}
      />
    ),
    content: (
      <div className="w2-service-map">
        <figure className="w2-service-map-visual">
          <img src="/week2/vision-service-photo-grid.png" alt="가족과 반려견, 부산 해변, 영수증, 인물, 고양이, 메뉴 사진으로 구성한 이미지 인식 예시 모음" />
          <span className="is-people"><UsersRound /> people · pet</span>
          <span className="is-place"><Images /> Busan · beach</span>
          <span className="is-text"><ScanSearch /> receipt · menu</span>
          <figcaption>같은 사진 모음 · 相同的照片集合</figcaption>
        </figure>
        <section className="w2-service-map-list">
          <article>
            <Images /><div><span>GOOGLE PHOTOS</span><strong>내용을 검색 단서로 사용</strong><small>사람·장소·사물 → 검색과 정리<br />人物、地点、物体 → 搜索与整理</small></div>
          </article>
          <article>
            <UsersRound /><div><span>APPLE PHOTOS</span><strong>반복되는 대상을 컬렉션으로 구성</strong><small>사람·반려동물 → 그룹과 앨범<br />人物、宠物 → 分组与相册</small></div>
          </article>
          <article>
            <ScanSearch /><div><span>GOOGLE LENS</span><strong>현재 보이는 대상을 즉시 활용</strong><small>사물·텍스트 → 검색과 번역<br />物体、文字 → 搜索与翻译</small></div>
          </article>
          <div className="w2-case-takeaway" aria-label="Recognition leads to different uses">
            <strong>Recognition <ArrowRight /> Different Uses</strong>
            <small>识别结果 <ArrowRight /> 不同用途</small>
          </div>
        </section>
      </div>
    ),
  },
  {
    index: "09",
    section: "SERVICE CASE · GOOGLE PHOTOS",
    chineseSection: "服务案例 · Google Photos",
    title: "Google Photos는 사진 속 의미를\n검색 가능한 단서로 바꿉니다",
    chineseTitle: "Google Photos把照片含义转换为可搜索线索",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Google Photos의 핵심은 파일명이나 폴더를 기억하지 않아도 사진 속 의미를 단서로 원하는 장면을 다시 찾게 하는 것입니다."
        points={[
          "입력은 사용자가 저장하거나 백업한 사진입니다. 서비스는 사람과 반려동물, 장소, 문서, 사물처럼 사진 안에서 반복적으로 나타나는 특징을 찾습니다.",
          "사용자는 ‘강아지’, ‘부산’, ‘영수증’처럼 사진의 내용을 나타내는 말로 검색할 수 있습니다. 검색 결과는 날짜나 파일명이 아니라 이미지 안의 의미를 중심으로 모입니다.",
          "People & Pets에서는 같은 사람이나 반려동물로 추정되는 사진을 그룹으로 묶고 이름 라벨을 붙일 수 있습니다. 잘못 묶인 사진은 사용자가 수정할 수 있습니다.",
          "중요한 설계 포인트는 인식 결과를 그대로 노출하는 것이 아니라 ‘다시 찾기’와 ‘자동 정리’라는 사용자의 시간을 줄이는 행동으로 연결한다는 점입니다.",
          "얼굴 그룹 기능은 지역과 계정 유형에 따라 제공 여부가 다를 수 있으므로 서비스 기획에서도 기능 조건을 함께 확인해야 합니다.",
        ]}
        prompt="사진 앱에서 ‘인식 정확도’보다 ‘검색 결과가 유용한가’가 더 중요한 순간은 언제일까요?"
        transition="다음은 비슷한 사진 인식을 사람 중심의 컬렉션 경험으로 연결하는 Apple Photos입니다."
        sources={[
          { label: "Google Photos에서 사람·사물·장소 검색", href: "https://support.google.com/photos/answer/15235862?hl=ko" },
          { label: "Google Photos 얼굴 그룹 관리", href: "https://support.google.com/photos/answer/6128838?hl=ko" },
        ]}
      />
    ),
    content: (
      <div className="w2-service-demo is-google">
        <figure className="w2-product-screen">
          <img src="/week2/vision-service-photo-grid.png" alt="Google Photos의 내용 검색을 설명하기 위한 가족, 장소, 영수증 사진 모음" />
          <div className="w2-search-query"><ScanSearch /><b>영수증 부산 강아지</b><span>검색</span></div>
          <div className="w2-result-tags"><b>dog · 3</b><b>Busan · 1</b><b>receipt · 1</b></div>
          <figcaption>개념 예시 화면 · 파일명을 몰라도 사진 속 내용으로 찾기</figcaption>
        </figure>
        <section className="w2-service-demo-copy">
          <div className="w2-demo-steps">
            {[
              ["01 · INPUT", "백업된 사진 모음", "파일명과 폴더가 제각각인 라이브러리"],
              ["02 · RECOGNIZE", "사람 · 장소 · 사물 · 문서", "사진마다 검색 가능한 의미 단서 생성"],
              ["03 · USER QUERY", "‘영수증’처럼 내용으로 검색", "검색어와 일치하는 사진 후보를 모음"],
              ["04 · SERVICE VALUE", "다시 찾는 시간을 줄임", "검색 · 그룹 · 자동 정리로 연결"],
            ].map(([label, title, detail]) => <article key={label}><span>{label}</span><strong>{title}</strong><small>{detail}</small></article>)}
          </div>
          <p className="w2-feedback-loop"><RefreshCcw /><span><b>사용자 교정</b> 잘못 묶인 얼굴·대상 수정 → 다음 검색 결과 개선<small>用户可修正错误分组</small></span></p>
        </section>
      </div>
    ),
  },
  {
    index: "10",
    section: "SERVICE CASE · APPLE PHOTOS",
    chineseSection: "服务案例 · Apple Photos",
    title: "Apple Photos는 사람과 반려동물을\n하나의 컬렉션으로 모읍니다",
    chineseTitle: "Apple Photos把人物与宠物整理为收藏集",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Apple Photos도 사람, 장면, 사물을 인식하지만 특히 자주 등장하는 사람과 반려동물을 컬렉션 중심 경험으로 보여 줍니다."
        points={[
          "입력은 iPhone, iPad 등에서 촬영하거나 보관한 사진과 비디오입니다. Photos는 라이브러리를 분석해 사람, 장면, 사물을 찾습니다.",
          "People & Pets에는 같은 사람이나 개·고양이로 판단된 사진이 그룹으로 나타납니다. 사용자는 이름을 붙이고 즐겨찾는 대상을 상단에 고정할 수 있습니다.",
          "이름을 붙인 사람과 반려동물은 검색과 컬렉션에서 다시 활용됩니다. iCloud Photos를 사용하면 이름과 즐겨찾기 정보가 같은 Apple 계정의 기기 사이에서 동기화됩니다.",
          "잘못 인식된 사진은 ‘이 사람이 아님’으로 수정하거나 중복된 그룹을 합칠 수 있습니다. 즉, 자동 분류 뒤에 사용자의 교정 과정이 포함됩니다.",
          "반려동물 인식 범위와 화면 이름은 운영체제 버전에 따라 달라질 수 있습니다. 서비스 설계에서는 지원 환경과 예외 처리까지 함께 설명해야 합니다.",
        ]}
        prompt="자동으로 만든 그룹이 틀렸을 때, 사용자가 쉽게 고칠 수 있도록 어떤 인터페이스가 필요할까요?"
        transition="마지막 사례는 저장된 라이브러리를 넘어 현재 카메라와 화면을 즉시 행동으로 바꾸는 Google Lens입니다."
        sources={[
          { label: "Apple Photos에서 사람 및 반려동물 찾기", href: "https://support.apple.com/ko-kr/108795" },
        ]}
      />
    ),
    content: (
      <div className="w2-service-demo is-apple">
        <figure className="w2-product-screen">
          <img src="/week2/vision-service-photo-grid.png" alt="Apple Photos의 People and Pets 컬렉션을 설명하기 위한 인물과 반려동물 사진 모음" />
          <div className="w2-people-collection">
            <span>PEOPLE &amp; PETS</span>
            <p><b className="is-person">Bora</b><b className="is-dog">Mong</b><b className="is-cat">Nabi</b></p>
          </div>
          <figcaption>개념 예시 화면 · 반복해서 등장하는 사람과 반려동물을 한 컬렉션으로</figcaption>
        </figure>
        <section className="w2-service-demo-copy">
          <div className="w2-demo-steps">
            {[
              ["01 · INPUT", "기기 속 사진과 비디오", "시간이 지날수록 계속 쌓이는 라이브러리"],
              ["02 · MATCH", "같은 사람·반려동물 찾기", "반복되는 얼굴과 특징을 그룹으로 구성"],
              ["03 · USER LABEL", "이름 지정 · 즐겨찾기", "Bora, Mong처럼 사용자가 의미를 더함"],
              ["04 · SERVICE VALUE", "컬렉션 · 검색 · 회상", "관계 중심으로 사진을 다시 경험"],
            ].map(([label, title, detail]) => <article key={label}><span>{label}</span><strong>{title}</strong><small>{detail}</small></article>)}
          </div>
          <p className="w2-feedback-loop"><RefreshCcw /><span><b>사용자 교정</b> ‘이 사람이 아님’ · 중복 그룹 합치기<small>用户可修正人物与宠物分组</small></span></p>
        </section>
      </div>
    ),
  },
  {
    index: "11",
    section: "SERVICE CASE · GOOGLE LENS",
    chineseSection: "服务案例 · Google Lens",
    title: "Google Lens는 보이는 대상을\n바로 다음 행동으로 연결합니다",
    chineseTitle: "Google Lens把眼前对象直接连接到下一步操作",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Google Lens는 카메라, 사진, 스크린샷 안의 대상을 이해하고 그 순간 필요한 검색, 번역, 복사, 식별 같은 행동을 제안합니다."
        points={[
          "입력은 실시간 카메라 화면, 이미 촬영한 이미지, 화면 캡처입니다. 사용자는 전체 장면이나 특정 영역을 선택해 질문할 수 있습니다.",
          "Lens는 사물의 시각적 특징뿐 아니라 이미지 안의 텍스트, 제품, 식물과 동물, 장소 같은 의미를 파악합니다.",
          "텍스트를 발견하면 복사하거나 번역하고, 제품과 비슷한 항목을 검색하며, 식물이나 동물은 종류를 탐색하는 식으로 인식 대상에 따라 행동이 달라집니다.",
          "검색 결과를 정렬할 때는 이미지의 시각적 유사성뿐 아니라 입력된 단어, 언어, 위치와 같은 정보가 함께 사용될 수 있습니다.",
          "따라서 Vision 서비스의 핵심 질문은 ‘무엇으로 보이는가?’에서 끝나지 않고 ‘이 결과로 사용자가 지금 무엇을 할 수 있는가?’까지 이어집니다.",
        ]}
        prompt="여러분 프로젝트가 카메라 입력을 받는다면, 인식 직후 가장 먼저 보여 줄 행동 버튼은 무엇인가요?"
        transition="세 사례에서 본 결과를 바탕으로 Recognition과 Classification이 정확히 무엇을 출력하는지 개념을 정리하겠습니다."
        sources={[
          { label: "Google Lens 기능 소개", href: "https://lens.google/intl/ko/" },
          { label: "Google Lens 작동 방식", href: "https://lens.google/intl/ko/howlensworks/" },
        ]}
      />
    ),
    content: (
      <div className="w2-service-demo is-lens">
        <figure className="w2-product-screen">
          <img src="/week2/vision-service-photo-grid.png" alt="Google Lens의 메뉴 인식과 번역을 설명하기 위한 식당 메뉴와 스마트폰 사진" />
          <div className="w2-lens-frame"><i /><i /><i /><i /><span>TEXT DETECTED</span></div>
          <div className="w2-lens-actions"><b>텍스트 선택</b><b>번역</b><b>검색</b></div>
          <figcaption>개념 예시 화면 · 선택한 영역의 대상과 텍스트에 맞는 행동 제안</figcaption>
        </figure>
        <section className="w2-service-demo-copy">
          <div className="w2-demo-steps">
            {[
              ["01 · INPUT", "카메라 · 사진 · 스크린샷", "전체 장면 또는 필요한 영역을 선택"],
              ["02 · RECOGNIZE", "사물 · 텍스트 · 제품 · 장소", "보이는 대상의 종류와 맥락을 함께 파악"],
              ["03 · ROUTE", "인식 종류에 맞는 기능 선택", "텍스트→번역, 제품→검색, 식물→식별"],
              ["04 · SERVICE VALUE", "보고 있던 화면에서 바로 행동", "복사 · 번역 · 검색 · 정보 확인"],
            ].map(([label, title, detail]) => <article key={label}><span>{label}</span><strong>{title}</strong><small>{detail}</small></article>)}
          </div>
          <p className="w2-feedback-loop"><MousePointerClick /><span><b>행동 분기</b> 같은 인식 결과도 사용자의 목적에 따라 버튼이 달라짐<small>根据用户目的提供不同操作</small></span></p>
        </section>
      </div>
    ),
  },
  {
    index: "12",
    section: "CONCEPT 01 · RECOGNITION",
    chineseSection: "概念01 · 识别",
    title: "Recognition은 이미지 안에서 보이는 정보를 찾아냅니다",
    chineseTitle: "Recognition从图像中找出可见信息",
    note: (
      <SpeakerNote
        duration="7분"
        lead="Recognition은 이미지 안에 무엇이 보이는지 찾아 이름, 위치, 속성, 텍스트 같은 정보로 바꾸는 과정입니다."
        points={[
          "입력은 이미지 전체이지만 출력은 한 단어일 필요가 없습니다. 한 장에서 사람, 반려견, 나무, 길처럼 여러 대상을 동시에 찾을 수 있습니다.",
          "대상의 이름만 반환하면 image tagging, 위치까지 사각형으로 표시하면 object detection, 글자를 읽으면 OCR에 가깝습니다.",
          "오른쪽 예시처럼 같은 사진에서 family, dog, park를 동시에 찾을 수 있습니다. 이 정보는 아직 검색이나 앨범 같은 서비스 기능이 아니라 모델이 만든 관찰 결과입니다.",
          "서비스는 필요한 결과만 선택합니다. 사진 검색은 의미 라벨을, 안전 점검은 위험 대상과 위치를, 번역은 텍스트 영역을 사용합니다.",
          "따라서 Recognition을 설계할 때는 ‘어떤 입력에서 무엇을 찾아야 하는가’를 먼저 명확히 적습니다.",
        ]}
        prompt="여러분 프로젝트의 입력 화면에서 AI가 반드시 찾아야 하는 대상이나 정보는 무엇인가요?"
        transition="여러 정보를 찾는 Recognition과 달리, Classification은 미리 정한 범주 중 하나를 고릅니다."
      />
    ),
    content: (
      <div className="w2-recognition-explainer">
        <figure>
          <img src="/week2/vision-service-photo-grid.png" alt="가족, 반려견, 장소, 문서 등 여러 대상을 찾는 Recognition 예시" />
          <span className="is-family">family</span><span className="is-dog">dog</span><span className="is-place">beach</span><span className="is-document">receipt</span>
        </figure>
        <section>
          <div className="w2-question-card"><ScanSearch /><span>MODEL QUESTION</span><strong>이 이미지에 무엇이 보이나?</strong><small>这张图像中有什么？</small></div>
          <div className="w2-output-list"><span>OUTPUT · 여러 결과 가능</span><p><b>object</b><strong>family · dog · receipt</strong></p><p><b>place</b><strong>beach · city</strong></p><p><b>text</b><strong>menu · price</strong></p></div>
        </section>
      </div>
    ),
  },
  {
    index: "13",
    section: "CONCEPT 02 · CLASSIFICATION",
    chineseSection: "概念02 · 分类",
    title: "Classification은 정해진 label 중 하나를 선택합니다",
    chineseTitle: "Classification从预设标签中选择一个类别",
    note: (
      <SpeakerNote
        duration="7분"
        lead="Classification은 사진 전체를 보고 서비스가 미리 정한 label 중 가장 적합한 하나를 선택하는 과정입니다."
        points={[
          "오늘 실습의 label set은 person, document, food, device, other 다섯 개입니다. 모델이 새로운 단어를 마음대로 만들지 않도록 선택지를 먼저 제한합니다.",
          "휴대전화, 커피, 꽃이 함께 있는 사진도 ‘사진 전체를 대표하는 대상’이라는 기준에 따라 device 하나를 선택합니다.",
          "실제 분류 모델은 label별 score를 만들고 가장 큰 값을 top-1 결과로 사용할 수 있습니다. 오른쪽 score는 개념을 설명하기 위한 예시입니다.",
          "한 사진에 여러 label을 동시에 허용하면 multi-label classification입니다. 이번 실습은 폴더 하나를 결정해야 하므로 single-label classification을 사용합니다.",
          "출력 형식을 한 단어로 고정하면 폴더 이름, 데이터베이스 값, 다음 코드 조건에 안정적으로 연결할 수 있습니다.",
        ]}
        prompt="사진 한 장을 반드시 폴더 하나에 넣어야 한다면 multi-label보다 single-label이 편리한 이유는 무엇인가요?"
        transition="이제 Recognition과 Classification의 질문, 출력, 사용 방법을 한 화면에서 비교하겠습니다."
      />
    ),
    content: (
      <div className="w2-classification-explainer">
        <figure><img src="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=78&w=900" alt="휴대전화와 커피, 꽃이 함께 놓인 분류 예시 사진" /><figcaption>sample.jpg · 전체 장면을 대표하는 label 1개</figcaption></figure>
        <section>
          <div className="w2-question-card"><Tags /><span>MODEL QUESTION</span><strong>이 사진은 어느 category인가?</strong><small>这张照片属于哪个类别？</small></div>
          <div className="w2-score-list">
            {[["device","86%"],["food","7%"],["other","4%"],["person","2%"],["document","1%"]].map(([label,score], i) => <p className={i === 0 ? "is-top" : ""} key={label}><b>{label}</b><i style={{"--score": score} as React.CSSProperties} /><span>{score}</span></p>)}
          </div>
          <div className="w2-top-result"><CheckCircle2 /><span>TOP-1 RESULT</span><strong>device</strong></div>
        </section>
      </div>
    ),
  },
  {
    index: "14",
    section: "CONCEPT CHECK · RECOGNITION VS CLASSIFICATION",
    chineseSection: "概念比较 · 识别与分类",
    title: "두 기능은 질문과 출력 형태가 다릅니다",
    chineseTitle: "两种功能的问题与输出形式不同",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Recognition과 Classification은 같은 Vision 모델을 사용할 수 있지만, 서비스가 던지는 질문과 필요한 출력이 다릅니다."
        points={[
          "Recognition의 질문은 ‘무엇이 어디에 보이는가?’입니다. 여러 대상, 텍스트, 위치, 속성을 함께 반환할 수 있습니다.",
          "Classification의 질문은 ‘미리 정한 category 중 어디에 속하는가?’입니다. 하나의 label이나 제한된 label 목록을 반환합니다.",
          "Recognition 결과는 검색 색인, 화면 표시, 정보 추출에 유용하고 Classification 결과는 라우팅, 폴더 정리, 우선순위 결정에 유용합니다.",
          "Google Lens의 텍스트 찾기는 Recognition에 가깝고, 오늘 실습의 device 결정은 Classification에 가깝습니다.",
          "프로젝트 문서에는 AI라는 넓은 표현 대신 입력, 질문, 출력 형식을 구체적으로 적어야 구현 범위가 선명해집니다.",
        ]}
        prompt="‘영수증 사진을 찾아 receipts 폴더로 이동’에는 Recognition과 Classification 중 어느 쪽이 필요한가요? 이유도 말해 보세요."
        transition="Classification을 사용하려면 먼저 서비스에 맞는 label set과 선택 규칙을 정해야 합니다."
      />
    ),
    content: (
      <div className="w2-concept-compare">
        <article className="is-recognition"><ScanSearch /><span>RECOGNITION</span><strong>무엇이 어디에 보이나?</strong><small>看到了什么？在哪里？</small><dl><div><dt>출력</dt><dd>여러 객체 · 텍스트 · 위치</dd></div><div><dt>예</dt><dd>phone · cup · flower</dd></div><div><dt>연결</dt><dd>검색 · 추출 · 화면 표시</dd></div></dl></article>
        <div className="w2-compare-versus">VS</div>
        <article className="is-classification"><Tags /><span>CLASSIFICATION</span><strong>어느 category인가?</strong><small>属于哪个类别？</small><dl><div><dt>출력</dt><dd>정해진 label 1개</dd></div><div><dt>예</dt><dd>device</dd></div><div><dt>연결</dt><dd>폴더 · 라우팅 · 우선순위</dd></div></dl></article>
      </div>
    ),
  },
  {
    index: "15",
    section: "DESIGN THE LABEL SET",
    chineseSection: "设计分类标签",
    title: "분류 label은 서비스의 정리 규칙이 됩니다",
    chineseTitle: "分类标签会成为服务的整理规则",
    note: (
      <SpeakerNote
        duration="7분"
        lead="분류 label은 모델이 자동으로 정해 주는 목록이 아니라, 서비스가 어떤 행동을 할지 결정하기 위해 설계하는 규칙입니다."
        points={[
          "오늘은 사진 정리가 목적이므로 사람, 문서, 음식, 기기, 기타를 label로 사용합니다. 각 label은 곧 destination folder가 됩니다.",
          "label은 학생과 모델이 같은 의미로 이해할 수 있어야 합니다. 예를 들어 object와 thing처럼 의미가 겹치는 이름은 피합니다.",
          "사진이 어느 label에도 맞지 않을 때를 위해 other가 필요합니다. 빠진 범주가 많으면 모델이 억지로 잘못된 label을 고르게 됩니다.",
          "label끼리 겹칠 때는 대표 대상, 화면 중앙, 사용 목적 같은 선택 기준을 프롬프트에 적습니다.",
          "label이 서비스 행동과 연결되지 않는다면 줄이거나 다시 정의합니다. 분류 결과가 바로 코드 조건에 쓰일 수 있어야 합니다.",
        ]}
        prompt="여러분 프로젝트에 필요한 label을 3개에서 5개만 고른다면 무엇이며, 각 label 뒤에 어떤 행동이 이어지나요?"
        transition="규칙을 만들어도 실제 사진은 애매할 수 있으므로 예외 경로가 필요합니다."
      />
    ),
    content: (
      <div className="w2-label-design">
        <section className="w2-label-route">
          <span>LABEL SET</span>
          {[[UsersRound,"person","people/"],[FileImage,"document","documents/"],[Sparkles,"food","food/"],[Laptop,"device","devices/"],[Blocks,"other","review/"]].map(([Icon,label,folder]) => { const LabelIcon = Icon as typeof Tags; return <article key={label as string}><LabelIcon /><strong>{label as string}</strong><ArrowRight /><code>{folder as string}</code></article>; })}
        </section>
        <section className="w2-label-rules">
          <article><b>01</b><div><strong>구분 가능</strong><small>label 의미가 서로 겹치지 않기<br />标签含义不重叠</small></div></article>
          <article><b>02</b><div><strong>빠진 경우 포함</strong><small>other 또는 review 경로 두기<br />为例外保留路径</small></div></article>
          <article><b>03</b><div><strong>행동과 연결</strong><small>각 label의 다음 기능을 정하기<br />连接到后续功能</small></div></article>
        </section>
      </div>
    ),
  },
  {
    index: "16",
    section: "HANDLE UNCERTAIN RESULTS",
    chineseSection: "处理不确定结果",
    title: "애매한 결과에는 별도의 확인 경로가 필요합니다",
    chineseTitle: "模糊结果需要单独的确认流程",
    note: (
      <SpeakerNote
        duration="7분"
        lead="실제 이미지에는 대상이 여러 개 있고 촬영 상태도 다양하므로 항상 하나의 답이 명확하게 나오지는 않습니다."
        points={[
          "휴대전화와 커피가 함께 있으면 device와 food가 모두 가능합니다. 서비스 목적이 업무 기기 정리인지 식사 기록인지에 따라 대표 label이 달라집니다.",
          "흐리거나 일부만 보이는 사진, 처음 보는 대상, 프롬프트 범주에 없는 대상은 other 또는 review 경로로 보냅니다.",
          "자동 처리 정책은 확실한 결과만 바로 정리하고, 애매한 결과는 사용자 확인을 요청하며, 실패한 결과는 원본을 유지하도록 설계할 수 있습니다.",
          "오늘의 간단한 Qwen 프롬프트는 label 한 단어를 받습니다. 실제 서비스에서는 이유, 후보 label, 규칙 검사 같은 추가 정보를 구조화해 검증할 수 있습니다.",
          "사용자가 잘못된 결과를 수정할 수 있어야 하고, 수정 기록은 label과 프롬프트를 개선하는 자료가 됩니다.",
        ]}
        prompt="AI가 틀렸을 때 원본 사진을 잃지 않게 하려면 자동 정리 코드에 어떤 안전장치를 넣어야 할까요?"
        transition="앞서 본 세 서비스도 자동 인식 뒤에 검색, 행동 선택, 사용자 교정 단계를 둡니다."
      />
    ),
    content: (
      <div className="w2-uncertain-flow">
        <section className="w2-uncertain-input"><img src="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=78&w=900" alt="휴대전화와 커피가 함께 놓여 분류가 애매할 수 있는 사진" /><span>device + food ?</span></section>
        <ArrowRight />
        <section className="w2-decision-policy">
          <span>SERVICE POLICY · 服务策略</span>
          <article className="is-auto"><CheckCircle2 /><div><b>명확한 결과</b><strong>자동 정리</strong><small>auto sort</small></div></article>
          <article className="is-check"><MousePointerClick /><div><b>애매한 결과</b><strong>사용자 확인</strong><small>ask to confirm</small></div></article>
          <article className="is-safe"><ShieldCheck /><div><b>실패 · 범주 밖</b><strong>원본 유지 + review</strong><small>keep original</small></div></article>
        </section>
        <ArrowRight />
        <section className="w2-safe-result"><FolderTree /><span>SAFE RESULT</span><strong>복사 후 분류</strong><small>원본은 그대로 보존<br />保留原始照片</small></section>
      </div>
    ),
  },
  {
    index: "17",
    section: "CASE SYNTHESIS",
    chineseSection: "案例总结",
    title: "세 서비스는 같은 네 단계로 설명할 수 있습니다",
    chineseTitle: "三个服务都可以用相同的四个步骤说明",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Google Photos, Apple Photos, Google Lens의 화면은 다르지만 입력, 인식 결과, 서비스 행동, 사용자 교정이라는 공통 구조로 분석할 수 있습니다."
        points={[
          "Google Photos는 저장된 사진을 입력으로 받아 의미 단서를 만들고 검색과 정리로 연결합니다.",
          "Apple Photos는 반복되는 사람과 반려동물을 그룹으로 만들고 이름 지정과 컬렉션 경험으로 연결합니다.",
          "Google Lens는 현재 카메라나 화면에서 대상과 텍스트를 찾고 검색, 번역, 복사 버튼으로 연결합니다.",
          "세 서비스 모두 모델 결과를 그대로 보여 주지 않고 사용자가 원하는 다음 행동을 앞에 배치합니다.",
          "프로젝트를 설명할 때도 모델 이름보다 이 네 칸을 먼저 채우면 구현해야 할 데이터와 화면이 구체적으로 보입니다.",
        ]}
        prompt="여러분 프로젝트를 Input, AI Result, Service Action, User Correction 네 칸으로 한 문장씩 적어 보세요."
        transition="개념을 짧게 확인한 뒤 같은 구조를 Qwen Vision 실습으로 구현하겠습니다."
      />
    ),
    content: (
      <div className="w2-synthesis-table">
        <div className="w2-synthesis-head"><span>SERVICE</span><span>INPUT</span><span>AI RESULT</span><span>SERVICE ACTION</span><span>USER CONTROL</span></div>
        {[
          ["Google Photos","저장된 사진","의미·사람·장소","검색·정리","오분류 수정"],
          ["Apple Photos","사진·비디오","같은 사람·반려동물","컬렉션·이름","합치기·수정"],
          ["Google Lens","카메라·화면","대상·텍스트","검색·번역·복사","영역·행동 선택"],
          ["OUR LAB","sample.jpg","category 1개","folder에 복사","other·원본 유지"],
        ].map((row) => <div className={row[0] === "OUR LAB" ? "is-lab" : ""} key={row[0]}>{row.map((cell, i) => <span key={cell}>{i === 0 ? <strong>{cell}</strong> : cell}</span>)}</div>)}
      </div>
    ),
  },
  {
    index: "18",
    section: "30-SECOND CHECK",
    chineseSection: "30秒理解检查",
    title: "세 상황이 어느 단계인지 직접 구분해 봅니다",
    chineseTitle: "判断三个情境分别属于哪个阶段",
    note: (
      <SpeakerNote
        duration="5분"
        lead="세 문장을 읽고 Recognition, Classification, Service Action 중 하나를 선택한 뒤 옆 학생과 이유를 비교합니다."
        points={[
          "첫 번째 ‘메뉴판의 글자를 찾고 읽기’는 이미지 안의 텍스트를 찾는 Recognition, 그중 OCR에 해당합니다.",
          "두 번째 ‘사진을 document, food, device 중 하나로 결정하기’는 정해진 label 중 하나를 고르는 Classification입니다.",
          "세 번째 ‘document 결과를 receipts 폴더에 복사하기’는 모델 출력 뒤에 실행되는 Service Action입니다.",
          "한 서비스에는 이 세 단계가 순서대로 함께 들어갈 수 있습니다. 구분하는 이유는 각 단계의 오류와 구현 방법이 다르기 때문입니다.",
          "답을 맞히는 것보다 어떤 입력을 받고 어떤 출력을 내는지 근거로 설명하는 것이 목표입니다.",
        ]}
        prompt="각 카드의 답과 이유를 30초 동안 옆 학생에게 설명해 보세요."
        transition="이제 개념을 코드로 옮기기 위해 실습 전체 경로를 확인하겠습니다."
      />
    ),
    content: (
      <div className="w2-concept-check">
        <article><span>01</span><ScanSearch /><strong>메뉴판의 글자를<br />찾고 읽는다</strong><small>查找并读取菜单文字</small><b>RECOGNITION · OCR</b></article>
        <article><span>02</span><Tags /><strong>document · food · device 중<br />하나를 고른다</strong><small>从标签中选择一个类别</small><b>CLASSIFICATION</b></article>
        <article><span>03</span><FolderTree /><strong>document 결과를<br />receipts 폴더에 복사한다</strong><small>将结果复制到文件夹</small><b>SERVICE ACTION</b></article>
      </div>
    ),
  },
  {
    index: "19",
    section: "LAB ROADMAP",
    chineseSection: "实践路线图",
    title: "설정부터 제출까지\n다섯 단계로 진행합니다",
    chineseTitle: "从设置到提交共分五个步骤",
    note: (
      <SpeakerNote
        duration="4분"
        lead="실습은 한 번에 긴 코드를 입력하지 않고 성공 지점을 다섯 개로 나누어 진행합니다."
        points={[
          "먼저 VS Code에서 qwen-practice 폴더와 세 파일을 만들고 .venv에 라이브러리를 설치합니다.",
          "그다음 Model Studio를 활성화하고 Singapore Region, 무료 quota, API Key와 API Host를 차례로 준비합니다.",
          "텍스트 요청으로 연결만 먼저 확인한 뒤 Vision 요청으로 확장합니다.",
          "Vision이 반환한 category를 검사하고 sorted/category 폴더에 사진을 복사합니다.",
          "마지막에는 실행 결과를 확인하고 GitHub에 저장합니다.",
        ]}
        transition="첫 단계로 각자 실습 환경이 준비되어 있는지 확인하겠습니다."
      />
    ),
    content: (
      <div className="w2-lab-roadmap">
        {[
          [Laptop, "01", "VS Code 준비", "폴더 · 파일 · .venv"],
          [Cloud, "02", "계정·Key 설정", "Singapore · API Key · Host"],
          [Terminal, "03", "Text API", "연결 성공 확인"],
          [Camera, "04", "분류·자동 정리", "sample.jpg → category folder"],
          [GitBranch, "05", "저장·제출", "GitHub Repository"],
        ].map(([Icon, number, title, detail], index) => { const StepIcon = Icon as typeof Laptop; return (
          <div className="w2-roadmap-step" key={number as string}><article><StepIcon /><span>{number as string}</span><strong>{title as string}</strong><small>{detail as string}</small></article>{index < 4 && <ChevronRight />}</div>
        ); })}
      </div>
    ),
  },
  {
    index: "20",
    section: "LAB ENVIRONMENT SETUP",
    chineseSection: "实践环境准备",
    title: "네 가지 도구가\n준비되어 있어야 합니다",
    chineseTitle: "需要准备四种工具",
    note: (
      <SpeakerNote
        duration="10분"
        lead="설치가 끝난 학생은 옆 학생과 버전 확인 화면을 서로 점검해 주세요."
        points={[
          "VS Code에서는 qwen-practice 폴더를 열고 Terminal 메뉴에서 새 터미널을 실행합니다.",
          "Windows에서 Python 설치 관리자를 사용했다면 py install 3.14로 설치할 수 있습니다.",
          "python --version과 python -m pip --version이 모두 출력되는지 확인합니다.",
          "Git은 마지막 제출 단계에서 사용하고, Model Studio는 API Key와 모델 호출에 사용합니다.",
          "명령을 찾을 수 없다는 메시지가 나오면 모든 터미널을 닫고 다시 연 뒤 먼저 버전을 확인합니다.",
        ]}
        transition="도구가 준비된 학생부터 Model Studio의 지역과 무료 사용 설정을 확인하겠습니다."
        sources={[
          { label: "Python 다운로드", href: "https://www.python.org/downloads/" },
          { label: "VS Code 다운로드", href: "https://code.visualstudio.com/download" },
          { label: "Git 다운로드", href: "https://git-scm.com/downloads" },
        ]}
      />
    ),
    content: (
      <div className="w2-tools-layout">
        <div className="w2-tools-grid">
          {[[Code2,"VS Code","프로젝트와 터미널"],[Terminal,"Python 3.14","코드 실행과 pip"],[GitBranch,"Git + GitHub","버전 관리와 제출"],[Cloud,"Model Studio","API Key와 Qwen"]].map(([Icon,title,detail]) => { const ToolIcon = Icon as typeof Code2; return <article key={title as string}><ToolIcon /><strong>{title as string}</strong><small>{detail as string}</small></article>; })}
        </div>
        <CodeBlock title="TERMINAL CHECK" compact code={`python --version\npython -m pip --version`} />
      </div>
    ),
  },
  {
    index: "21",
    section: "VS CODE SETUP · 1/3",
    chineseSection: "VS Code准备 · 1/3",
    title: "qwen-practice 폴더를 만들고 VS Code에서 엽니다",
    chineseTitle: "创建qwen-practice文件夹并在VS Code中打开",
    note: (
      <SpeakerNote
        duration="6분"
        lead="파일 하나만 여는 것이 아니라 실습 폴더 전체를 VS Code에서 열어야 Explorer와 Terminal의 기준 위치가 같아집니다."
        points={[
          "바탕화면이나 Documents에 qwen-practice라는 새 폴더를 만듭니다.",
          "VS Code를 실행하고 File 메뉴에서 Open Folder를 선택합니다.",
          "방금 만든 qwen-practice 폴더를 선택한 뒤 Open을 누릅니다.",
          "처음 여는 폴더라면 Workspace Trust 안내에서 본인이 만든 폴더인지 확인한 뒤 신뢰를 선택합니다.",
          "왼쪽 Explorer 맨 위에 QWEN-PRACTICE가 보이면 폴더 열기가 완료된 것입니다.",
        ]}
        prompt="Explorer 맨 위에 파일명이 아니라 폴더명 QWEN-PRACTICE가 보이나요?"
        transition="열린 폴더 안에 실습에 필요한 세 파일을 만들겠습니다."
        sources={[
          { label: "VS Code 기본 편집과 Explorer", href: "https://code.visualstudio.com/docs/editing/codebasics" },
        ]}
      />
    ),
    content: (
      <div className="w2-vscode-open-layout">
        <div className="w2-vscode-window">
          <header><i /><i /><i /><strong>qwen-practice — Visual Studio Code</strong></header>
          <div className="w2-vscode-body">
            <aside><FolderOpen /><Code2 /><GitBranch /></aside>
            <section><span>EXPLORER</span><strong>⌄ QWEN-PRACTICE</strong><small>폴더가 비어 있습니다 · 文件夹为空</small></section>
            <main><FolderOpen /><strong>Open Folder</strong><small>File → Open Folder… → qwen-practice</small></main>
          </div>
        </div>
        <ol className="w2-vscode-steps">
          <li><span>01</span><p><strong>폴더 만들기</strong><small>创建qwen-practice文件夹</small></p></li>
          <li><span>02</span><p><strong>File → Open Folder</strong><small>在VS Code中打开文件夹</small></p></li>
          <li><span>03</span><p><strong>QWEN-PRACTICE 확인</strong><small>确认Explorer中的文件夹名称</small></p></li>
        </ol>
      </div>
    ),
  },
  {
    index: "22",
    section: "VS CODE SETUP · 2/3",
    chineseSection: "VS Code准备 · 2/3",
    title: "Explorer에서 세 파일을 정확한 이름으로 만듭니다",
    chineseTitle: "在Explorer中使用准确名称创建三个文件",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Explorer의 New File 버튼을 세 번 눌러 app.py, .env, .gitignore를 만듭니다. 점으로 시작하는 파일명까지 정확해야 합니다."
        points={[
          "Explorer에서 QWEN-PRACTICE 폴더 이름 위에 마우스를 올리고 New File 아이콘을 누릅니다.",
          "첫 파일은 app.py로 만듭니다. Python 코드가 들어갈 실행 파일입니다.",
          "두 번째 파일은 .env로 만듭니다. API Key와 API Host를 저장합니다.",
          "세 번째 파일은 .gitignore로 만듭니다. .env와 .venv가 GitHub에 올라가지 않도록 설정합니다.",
          "Windows에서 .env.txt 또는 .gitignore.txt로 만들어지지 않았는지 Explorer의 이름을 다시 확인합니다.",
        ]}
        prompt="왼쪽 Explorer에 app.py, .env, .gitignore 세 이름이 모두 정확히 보이나요?"
        transition="이제 VS Code 안에서 Terminal을 열고 프로젝트 전용 Python 환경을 만들겠습니다."
        sources={[
          { label: "VS Code 기본 편집과 파일 저장", href: "https://code.visualstudio.com/docs/editing/codebasics" },
        ]}
      />
    ),
    content: (
      <div className="w2-vscode-files-layout">
        <div className="w2-explorer-mock">
          <header><span>EXPLORER</span><FilePlus2 /></header>
          <strong>⌄ QWEN-PRACTICE</strong>
          <p><Code2 /> app.py <small>Python 실행 코드</small></p>
          <p><KeyRound /> .env <small>API Key · API Host</small></p>
          <p><ShieldCheck /> .gitignore <small>비밀 파일 제외</small></p>
        </div>
        <div className="w2-file-role-cards">
          <article><span>01</span><strong>app.py</strong><p>Qwen API 호출과 사진 정리 코드</p><small>Qwen API调用与照片整理代码</small></article>
          <article><span>02</span><strong>.env</strong><p>컴퓨터 안에만 두는 비밀 값</p><small>仅保存在本机的密钥</small></article>
          <article><span>03</span><strong>.gitignore</strong><p>.env와 .venv를 Git에서 제외</p><small>从Git中排除敏感文件</small></article>
        </div>
      </div>
    ),
  },
  {
    index: "23",
    section: "VS CODE SETUP · 3/3",
    chineseSection: "VS Code准备 · 3/3",
    title: "Terminal에서 가상환경을 만들고 라이브러리를 설치합니다",
    chineseTitle: "在Terminal中创建虚拟环境并安装库",
    note: (
      <SpeakerNote
        duration="12분"
        lead="VS Code의 Terminal 메뉴에서 New Terminal을 열고, 프로젝트 전용 .venv를 만든 뒤 필요한 두 라이브러리를 설치합니다."
        points={[
          "Terminal → New Terminal을 선택합니다. 프롬프트 왼쪽 경로 끝이 qwen-practice인지 확인합니다.",
          "macOS는 python -m venv .venv, Windows는 py -m venv .venv를 실행합니다.",
          "macOS는 source .venv/bin/activate, Windows PowerShell은 .venv\\Scripts\\Activate.ps1로 활성화합니다.",
          "터미널 줄 앞에 (.venv)가 생기면 프로젝트 전용 Python 환경이 활성화된 것입니다.",
          "python -m pip install -U openai python-dotenv를 실행하고 Successfully installed 또는 Requirement already satisfied를 확인합니다.",
          "PowerShell 실행 정책 오류가 나면 Command Prompt 터미널을 열고 .venv\\Scripts\\activate.bat를 실행합니다.",
        ]}
        prompt="현재 터미널 줄 맨 앞에 (.venv)가 표시되나요?"
        transition="로컬 실습 환경이 준비됐으므로 Model Studio 계정과 API Key를 설정하겠습니다."
        sources={[
          { label: "Python venv 공식 문서", href: "https://docs.python.org/3/library/venv.html" },
          { label: "Python 패키지 설치 가이드", href: "https://packaging.python.org/en/latest/tutorials/installing-packages/" },
        ]}
      />
    ),
    content: (
      <div className="w2-venv-layout">
        <CodeBlock title="macOS · ZSH" code={`python -m venv .venv\nsource .venv/bin/activate\npython -m pip install -U openai python-dotenv`} />
        <CodeBlock title="Windows · PowerShell" code={`py -m venv .venv\n.venv\\Scripts\\Activate.ps1\npython -m pip install -U openai python-dotenv`} />
        <div className="w2-venv-ready"><PackageCheck /><span>TERMINAL READY</span><strong>(.venv) qwen-practice</strong><small>가상환경 활성화 완료 · 虚拟环境已启用</small></div>
      </div>
    ),
  },
  {
    index: "24",
    section: "PYTHON INTERPRETER",
    chineseSection: "Python解释器",
    title: "Python 확장을 설치하고 .venv 인터프리터를 선택합니다",
    chineseTitle: "安装Python扩展并选择.venv解释器",
    note: (
      <SpeakerNote
        duration="7분"
        lead="VS Code, Python 확장, Python 인터프리터는 서로 다른 도구입니다. 확장을 설치한 뒤 방금 만든 .venv의 Python을 선택해야 실행과 라이브러리가 같은 환경을 사용합니다."
        points={[
          "왼쪽 Extensions 아이콘을 열거나 Ctrl+Shift+X, macOS에서는 Command+Shift+X를 누릅니다.",
          "검색창에 Python을 입력하고 게시자가 Microsoft인 Python 확장을 설치합니다.",
          "Command Palette를 열고 Python: Select Interpreter를 실행합니다.",
          "목록에서 경로에 .venv가 포함된 Python을 선택합니다. macOS는 .venv/bin/python, Windows는 .venv\\Scripts\\python.exe 형태입니다.",
          "app.py를 열었을 때 오른쪽 아래 상태 표시줄에 .venv가 보이면 선택이 완료된 것입니다.",
          "목록에 보이지 않으면 Enter interpreter path를 선택해 .venv 안의 Python 실행 파일을 직접 지정합니다.",
        ]}
        prompt="VS Code 오른쪽 아래에 표시된 Python 경로에 .venv가 포함되어 있나요?"
        transition="편집기와 Python 환경이 연결됐으므로 Model Studio 계정 설정으로 넘어갑니다."
        sources={[
          { label: "VS Code Python 시작 가이드", href: "https://code.visualstudio.com/docs/python/python-tutorial" },
          { label: "VS Code Python 환경 선택", href: "https://code.visualstudio.com/docs/python/environments" },
        ]}
      />
    ),
    content: (
      <div className="w2-interpreter-layout">
        <section className="w2-extension-card"><Blocks /><span>EXTENSIONS</span><strong>Python</strong><p>Microsoft</p><b><CheckCircle2 /> INSTALLED</b><small>Python扩展已安装</small></section>
        <section className="w2-command-palette"><header><strong>&gt; Python: Select Interpreter</strong><small>Command Palette</small></header><article><span>RECOMMENDED</span><strong>Python 3.14 · .venv</strong><code>.venv/bin/python</code><small>Windows · .venv\\Scripts\\python.exe</small></article><article><span>STATUS BAR</span><strong><CheckCircle2 /> .venv selected</strong><small>右下角显示.venv</small></article></section>
        <div className="w2-interpreter-chain"><p><Code2 /><strong>VS Code</strong><small>편집기</small></p><ArrowRight /><p><Blocks /><strong>Python Extension</strong><small>연결 기능</small></p><ArrowRight /><p><Terminal /><strong>.venv Python</strong><small>실행 환경</small></p></div>
      </div>
    ),
  },
  {
    index: "25",
    section: "MODEL STUDIO SETUP",
    chineseSection: "Model Studio设置",
    title: "Model Studio를 활성화하고 Singapore를 선택합니다",
    chineseTitle: "启用Model Studio并选择新加坡区域",
    note: (
      <SpeakerNote
        duration="10분"
        lead="Alibaba Cloud 계정으로 로그인한 뒤 Model Studio를 활성화하고, API Key를 만들기 전에 Region을 Singapore로 맞춥니다."
        points={[
          "Alibaba Cloud 계정이 없다면 계정을 만든 뒤 이메일 또는 휴대전화 인증을 완료합니다.",
          "Model Studio 콘솔에 처음 들어가면 서비스 활성화 안내를 완료합니다.",
          "화면 오른쪽 위 Region 선택 메뉴에서 Singapore를 고릅니다. API Key와 API Host는 Region에 연결됩니다.",
          "모델 사용 페이지의 Free Quota 탭에서 사용 가능한 한도와 만료일을 확인합니다.",
          "결제 정보를 등록한 계정은 무료 한도 이후 비용이 발생할 수 있으므로 Free Quota Only를 켭니다.",
          "접근 권한 오류가 나오면 계정 소유자이거나 administrator 또는 API-Key 페이지 권한을 가진 RAM 사용자인지 확인합니다.",
        ]}
        prompt="현재 화면에서 Region과 Free Quota Only 상태를 옆 사람과 서로 확인해 주세요."
        transition="준비가 끝났다면 콘솔에서 API Key 메뉴를 찾아 들어가겠습니다."
        sources={[
          { label: "Alibaba Cloud Model Studio 무료 quota", href: "https://www.alibabacloud.com/help/en/model-studio/new-free-quota" },
          { label: "API Key 생성 권한과 절차", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
          { label: "모델 사용량과 Free Quota Only", href: "https://docs.modelstudio.console.alibabacloud.com/en/model-studio/model-usage-statistics" },
        ]}
      />
    ),
    content: (
      <div className="w2-cloud-setup">
        <div className="w2-region-card"><Cloud /><span>REGION</span><strong>Singapore</strong><small>新加坡</small></div>
        <div className="w2-cloud-checks">
          <article><BadgeCheck /><div><strong>Model Studio 활성화</strong><small>启用Model Studio</small></div></article>
          <article><CircleDollarSign /><div><strong>Free Quota 확인</strong><small>确认免费额度与到期日</small></div></article>
          <article><ShieldCheck /><div><strong>Free Quota Only 켜기</strong><small>用完额度后自动停止</small></div></article>
        </div>
      </div>
    ),
  },
  {
    index: "26",
    section: "GET AN API KEY · 1/4",
    chineseSection: "获取API Key · 1/4",
    title: "Model Studio에서 API Key 메뉴를 엽니다",
    chineseTitle: "在Model Studio中打开API Key菜单",
    note: (
      <SpeakerNote
        duration="6분"
        lead="공식 콘솔에 로그인한 뒤 Region, API Key 메뉴, Create API Key 버튼을 순서대로 찾습니다."
        points={[
          "bailian.console.alibabacloud.com에서 Alibaba Cloud Model Studio 콘솔을 엽니다.",
          "화면 오른쪽 위 Region이 Singapore인지 다시 확인합니다. 다른 Region에서 만든 Key는 Singapore API Host와 섞어 쓰지 않습니다.",
          "왼쪽 메뉴 또는 콘솔 바로가기에서 API Key를 선택합니다.",
          "API Key 관리 화면 오른쪽 위의 Create API Key 버튼을 누릅니다.",
          "API Key 페이지가 보이지 않으면 현재 계정의 페이지 권한을 먼저 확인합니다.",
        ]}
        prompt="버튼을 누르기 전에 화면 오른쪽 위에 Singapore가 표시되는지 확인해 주세요."
        transition="생성 창이 열리면 세 가지 옵션을 차례로 입력하겠습니다."
        sources={[
          { label: "API Key 만들기", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
        ]}
      />
    ),
    content: (
      <div className="w2-api-path-layout">
        <a className="w2-api-console-link" href="https://bailian.console.alibabacloud.com/" target="_blank" rel="noreferrer">
          <Cloud /><span><strong>Alibaba Cloud Model Studio Console</strong><small>bailian.console.alibabacloud.com</small></span><ExternalLink />
        </a>
        <div className="w2-api-path">
          {[
            [Cloud, "01", "콘솔 로그인", "Alibaba Cloud 계정", "登录控制台"],
            [Settings2, "02", "Singapore 선택", "오른쪽 위 Region", "选择新加坡区域"],
            [KeyRound, "03", "API Key 메뉴", "Key 관리 화면", "打开API Key菜单"],
            [MousePointerClick, "04", "Create API Key", "오른쪽 위 버튼", "点击创建API Key"],
          ].map(([Icon, number, title, detail, chinese], index) => { const StepIcon = Icon as typeof Cloud; return (
            <div className="w2-api-path-step" key={number as string}>
              <article><StepIcon /><span>{number as string}</span><strong>{title as string}</strong><p>{detail as string}</p><small>{chinese as string}</small></article>
              {index < 3 && <ChevronRight />}
            </div>
          ); })}
        </div>
      </div>
    ),
  },
  {
    index: "27",
    section: "GET AN API KEY · 2/4",
    chineseSection: "获取API Key · 2/4",
    title: "기본 워크스페이스를 선택하고 Key를 만듭니다",
    chineseTitle: "选择默认工作空间并创建Key",
    note: (
      <SpeakerNote
        duration="6분"
        lead="Create API Key 창에서는 Workspace, Description, Permissions 세 항목을 설정합니다."
        points={[
          "Workspace는 수업 실습에서는 default workspace를 선택합니다. 팀별 비용이나 권한을 분리할 때만 별도 workspace를 사용합니다.",
          "Description에는 week2-qwen-vision처럼 용도를 알아볼 수 있는 이름을 입력합니다.",
          "Permissions는 수업에서는 공식 권장값인 All을 선택합니다.",
          "Custom은 허용 IP와 호출 가능한 모델을 제한할 때 쓰는 고급 설정입니다. 학교나 이동 네트워크에서는 IP가 바뀔 수 있으므로 수업 중에는 All이 단순합니다.",
          "세 항목을 확인하고 OK를 누르면 Key가 생성됩니다.",
        ]}
        prompt="Description에 본인의 실제 Key 값을 입력하지 말고, 용도만 적었는지 확인해 주세요."
        transition="다음 성공 창은 다시 볼 수 없으므로 닫기 전에 두 값을 저장하겠습니다."
        sources={[
          { label: "API Key 생성 옵션", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
        ]}
      />
    ),
    content: (
      <div className="w2-key-create-layout">
        <section className="w2-key-form" aria-label="API Key 생성 옵션">
          <header><KeyRound /><strong>Create API Key</strong><small>创建API Key</small></header>
          <article><span>Workspace</span><strong>default workspace</strong><small>默认工作空间</small></article>
          <article><span>Description</span><strong>week2-qwen-vision</strong><small>用于区分用途的名称</small></article>
          <article><span>Permissions</span><strong>All</strong><small>允许调用所有标准模型</small></article>
        </section>
        <aside className="w2-key-confirm">
          <BadgeCheck />
          <span>BEFORE CREATE</span>
          <p><strong>Region</strong><small>Singapore</small></p>
          <p><strong>Workspace</strong><small>default</small></p>
          <p><strong>Permissions</strong><small>All</small></p>
          <b>OK · 创建</b>
        </aside>
      </div>
    ),
  },
  {
    index: "28",
    section: "GET AN API KEY · 3/4",
    chineseSection: "获取API Key · 3/4",
    title: "생성 직후 API Key와 API Host를 모두 복사합니다",
    chineseTitle: "创建后立即复制API Key和API Host",
    note: (
      <SpeakerNote
        duration="7분"
        lead="생성 성공 창에서 전체 API Key와 API Host를 복사하거나 다운로드합니다. 창을 닫기 전에 반드시 두 값을 모두 저장합니다."
        points={[
          "새 보안 방식으로 생성된 Key는 보통 sk-ws로 시작합니다. 화면의 전체 값을 Copy 버튼으로 복사합니다.",
          "API Host는 현재 선택한 workspace와 Singapore Region에 연결된 서비스 주소입니다. OpenAI SDK에서는 base_url로 사용합니다.",
          "Singapore의 권장 형식은 https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1 입니다.",
          "생성 창을 닫으면 전체 평문 Key를 다시 볼 수 없습니다. 잃어버리면 Reset하거나 새 Key를 만들어야 합니다.",
          "Reset하면 이전 Key는 즉시 무효가 되므로 기존 프로젝트의 .env도 새 값으로 교체합니다.",
        ]}
        prompt="두 값을 복사했는지 확인하되, 실제 Key 문자열을 화면이나 채팅으로 공유하지 마세요."
        transition="복사한 두 값을 프로젝트의 .env 파일에 안전하게 옮기겠습니다."
        sources={[
          { label: "API Key 생성과 보안 방식", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
          { label: "Singapore API Host 형식", href: "https://www.alibabacloud.com/help/en/model-studio/qwen-vl-compatible-with-openai" },
        ]}
      />
    ),
    content: (
      <div className="w2-key-output-layout">
        <div className="w2-key-output-grid">
          <article><KeyRound /><span>API KEY</span><strong>sk-ws••••••••••••••••</strong><small>전체 값을 지금 복사 · 立即复制完整Key</small><b><Copy /> COPY NOW</b></article>
          <article><Cloud /><span>API HOST · SINGAPORE</span><strong>https://&#123;WorkspaceId&#125;.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1</strong><small>OpenAI SDK의 base_url · 用作base_url</small><b><Copy /> COPY NOW</b></article>
        </div>
        <div className="w2-copy-warning"><AlertTriangle /><p><strong>이 창을 닫으면 전체 API Key를 다시 볼 수 없습니다.</strong><small>关闭此窗口后，无法再次查看完整API Key。丢失时请重置或重新创建。</small></p></div>
      </div>
    ),
  },
  {
    index: "29",
    section: "GET AN API KEY · 4/4",
    chineseSection: "获取API Key · 4/4",
    title: "두 값을 .env에 저장하고 GitHub에서 제외합니다",
    chineseTitle: "将两个值保存到.env并排除在GitHub之外",
    note: (
      <SpeakerNote
        duration="8분"
        lead="API Key는 비밀번호이므로 코드에 직접 적지 않고 프로젝트의 .env 파일에만 저장합니다."
        points={[
          "VS Code에서 qwen-practice 폴더 안에 정확히 .env라는 파일을 만듭니다. Windows에서는 .env.txt가 되지 않았는지 확장자를 확인합니다.",
          "DASHSCOPE_API_KEY 오른쪽에는 방금 복사한 전체 Key를 붙여넣습니다. 따옴표와 앞뒤 공백은 넣지 않습니다.",
          "DASHSCOPE_BASE_URL 오른쪽에는 같은 생성 창에서 복사한 API Host를 붙여넣습니다.",
          ".gitignore 파일 첫 줄에 .env를 적어 GitHub 추적에서 제외합니다.",
          "Key가 화면 공유, 채팅 또는 GitHub에 노출되면 해당 Key를 Disable 또는 Delete하고 새 Key를 발급합니다.",
        ]}
        prompt="실제 Key는 가리고, .env 파일명과 두 변수 이름만 옆 사람과 확인해 주세요."
        transition="이제 프로젝트 파일과 라이브러리를 준비한 뒤 Key가 정상적으로 읽히는지 확인하겠습니다."
        sources={[
          { label: "환경 변수로 API Key 보관하기", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
        ]}
      />
    ),
    content: (
      <div className="w2-env-layout">
        <CodeBlock title=".env · NEVER COMMIT" code={`DASHSCOPE_API_KEY=PASTE_YOUR_FULL_KEY_HERE\nDASHSCOPE_BASE_URL=https://YOUR_WORKSPACE_ID.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1`} />
        <div className="w2-env-safety">
        <CodeBlock title=".gitignore" compact code={`.env\n.venv/\n__pycache__/`} />
          <article><ShieldCheck /><span>SECRET CHECK</span><strong>코드 · 채팅 · GitHub에 Key를 붙여넣지 않기</strong><small>不要把Key粘贴到代码、聊天或GitHub</small></article>
        </div>
      </div>
    ),
  },
  {
    index: "30",
    section: "PRE-FLIGHT CHECK",
    chineseSection: "运行前检查",
    title: "API 호출 전에 폴더와 환경 상태를 확인합니다",
    chineseTitle: "调用API前检查文件夹与环境状态",
    note: (
      <SpeakerNote
        duration="6분"
        lead="코드를 붙여넣기 전에 폴더, 가상환경, 라이브러리, 비밀 파일 네 가지 준비 상태를 한 번에 확인합니다."
        points={[
          "Explorer 맨 위 폴더명이 qwen-practice이고 app.py, .env, .gitignore가 그 바로 아래에 있어야 합니다.",
          "터미널 줄 앞에는 (.venv)가 표시되어야 합니다.",
          "python -c 확인 명령이 PACKAGES: OK를 출력하면 openai와 python-dotenv 설치가 끝난 것입니다.",
          ".gitignore에는 .env, .venv/, __pycache__/ 세 줄이 들어 있어야 합니다.",
          "이 단계에서는 Key 값을 출력하지 않고 파일 존재와 패키지 설치만 확인합니다.",
        ]}
        prompt="네 가지 확인 항목 중 아직 완료되지 않은 항목을 하나 표시해 보세요."
        transition="준비가 끝나면 app.py의 전체 조립 순서를 먼저 확인합니다."
      />
    ),
    content: (
      <div className="w2-preflight-layout">
        <div className="w2-folder-tree"><FolderTree /><span>qwen-practice/</span><strong>├── .venv/<br />├── app.py<br />├── .env<br />└── .gitignore</strong></div>
        <div className="w2-preflight-checks">
          <article><CheckCircle2 /><div><strong>(.venv) 활성화</strong><small>虚拟环境已启用</small></div></article>
          <article><CheckCircle2 /><div><strong>세 파일 확인</strong><small>确认三个文件</small></div></article>
          <CodeBlock title="PACKAGE CHECK" compact code={`python -c "import openai, dotenv; print('PACKAGES: OK')"`} />
        </div>
      </div>
    ),
  },
  {
    index: "31",
    section: "APP.PY BUILD MAP",
    chineseSection: "app.py组装顺序",
    title: "app.py는 여섯 코드 블록을 위에서 아래로 연결합니다",
    chineseTitle: "app.py由六个代码块从上到下连接而成",
    note: (
      <SpeakerNote
        duration="5분"
        lead="앞으로 나오는 코드는 서로 독립된 예제가 아니라 하나의 app.py에 순서대로 연결됩니다. 먼저 전체 구조를 확인하고 각 블록을 채웁니다."
        points={[
          "첫 블록에서 라이브러리를 import하고 .env의 API Key와 API Host를 읽습니다.",
          "두 번째 블록에서 OpenAI 호환 client를 만들고, 세 번째 블록에서 허용 LABELS와 분류 prompt를 정의합니다.",
          "네 번째 블록에서 sample.jpg를 Base64로 변환합니다.",
          "다섯 번째 블록에서 Qwen Vision을 호출하고 category를 받습니다.",
          "여섯 번째 블록에서 category를 검사하고 sorted/category 폴더에 사진을 복사합니다.",
          "직접 입력이 어려운 학생은 완성 app.py를 내려받을 수 있지만, .env에는 반드시 본인의 Key와 Host를 직접 넣습니다.",
        ]}
        prompt="현재 실습에서 AI 모델 호출 이후에 실행되는 서비스 동작은 몇 번째 블록인가요?"
        transition="먼저 첫 두 블록만 사용해 가장 간단한 텍스트 연결 테스트를 실행합니다."
      />
    ),
    content: (
      <div className="w2-app-map-layout">
        <div className="w2-app-map">
          {[
            ["01", "IMPORT + ENV", "라이브러리와 비밀 값"],
            ["02", "CLIENT", "Key · API Host 연결"],
            ["03", "LABELS + PROMPT", "분류 규칙 정의"],
            ["04", "IMAGE", "sample.jpg → Base64"],
            ["05", "QWEN VISION", "category 응답"],
            ["06", "SERVICE ACTION", "sorted/category 생성"],
          ].map(([number, title, detail], index) => <div className="w2-app-map-step" key={number}><article><span>{number}</span><strong>{title}</strong><small>{detail}</small></article>{index < 5 && <ChevronRight />}</div>)}
        </div>
        <aside className="w2-code-download"><Download /><span>STARTER FILE</span><strong>완성 app.py</strong><small>完整练习代码</small><a href="/week2-qwen-vision-app.py" download>app.py 다운로드 <Download /></a><a href="/week2-env-example.txt" download>.env 예시 다운로드 <Download /></a></aside>
      </div>
    ),
  },
  {
    index: "32",
    section: "CONNECT QWEN TEXT API",
    chineseSection: "连接Qwen文本API",
    title: "텍스트 응답이 출력되면\n연결 준비가 끝난 것입니다",
    chineseTitle: "输出文本回答后即表示连接准备完成",
    note: (
      <SpeakerNote
        duration="12분"
        lead="Vision 코드를 바로 실행하지 않고 먼저 텍스트 요청으로 Key, 주소, 라이브러리 연결을 확인합니다."
        points={[
          "load_dotenv()가 .env의 값을 현재 프로그램으로 불러옵니다.",
          "Key나 Base URL이 비어 있으면 API를 호출하기 전에 오류를 내도록 먼저 검사합니다. 실제 Key 값 자체는 출력하지 않습니다.",
          "OpenAI 클라이언트에 API Key와 Base URL을 전달합니다.",
          "모델 이름은 qwen3.8-flash이며, 간단한 확인 문장을 요청합니다.",
          "extra_body에서 thinking을 끄면 연결 확인용 요청을 빠르게 실행할 수 있습니다.",
          "터미널에서 python app.py를 실행하고 응답이 출력되면 다음 단계로 넘어갑니다.",
        ]}
        prompt="오류가 난 학생은 오류 메시지의 마지막 세 줄만 읽고 Key, URL, model 중 어느 부분인지 표시해 보세요."
        transition="연결이 확인되면 Vision 실습에 사용할 sample.jpg를 프로젝트 폴더에 준비합니다."
        sources={[
          { label: "Alibaba Cloud Model Studio 모델 목록", href: "https://www.alibabacloud.com/help/en/model-studio/models" },
        ]}
      />
    ),
    content: (
      <div className="w2-code-result-layout">
        <CodeBlock title="app.py · TEXT TEST" compact code={`import os\nfrom dotenv import load_dotenv\nfrom openai import OpenAI\n\nload_dotenv()\napi_key = os.getenv("DASHSCOPE_API_KEY")\nbase_url = os.getenv("DASHSCOPE_BASE_URL")\nif not api_key or not base_url:\n    raise RuntimeError("Check your .env file")\n\nclient = OpenAI(api_key=api_key, base_url=base_url)\nresponse = client.chat.completions.create(\n    model="qwen3.8-flash",\n    messages=[{"role": "user", "content": "Say API connection successful."}],\n    extra_body={"enable_thinking": False}\n)\nprint(response.choices[0].message.content)`} />
        <div className="w2-success"><Terminal /><span>RUN</span><code>python app.py</code><strong><CheckCircle2 /> API connection successful</strong></div>
      </div>
    ),
  },
  {
    index: "33",
    section: "PREPARE SAMPLE IMAGE",
    chineseSection: "准备示例图像",
    title: "sample.jpg를 프로젝트 폴더에 저장합니다",
    chineseTitle: "将sample.jpg保存到项目文件夹",
    note: (
      <SpeakerNote
        duration="6분"
        lead="실습 이미지를 열어 qwen-practice 폴더 안에 sample.jpg라는 이름으로 저장하고 VS Code Explorer에서 위치를 확인합니다."
        points={[
          "슬라이드의 실습 이미지 열기 링크를 눌러 원본 이미지를 새 탭에서 엽니다.",
          "이미지를 저장할 때 위치는 qwen-practice 폴더, 파일명은 정확히 sample.jpg로 지정합니다.",
          "VS Code로 돌아오면 Explorer의 app.py와 같은 깊이에 sample.jpg가 나타나야 합니다.",
          "파일이 보이지 않으면 Explorer의 Refresh 버튼을 누르거나 폴더를 다시 엽니다.",
          "자신의 사진을 사용해도 되지만 JPG 파일은 sample.jpg로 이름을 바꿉니다. PNG라면 뒤 단계의 MIME type도 image/png로 변경합니다.",
        ]}
        prompt="Explorer에서 app.py와 sample.jpg가 같은 폴더 안에 나란히 보이나요?"
        transition="이미지를 먼저 눈으로 보고 어떤 대표 카테고리가 적절한지 예상해 보겠습니다."
        sources={[
          { label: "실습 이미지 원본 · Unsplash", href: "https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8" },
        ]}
      />
    ),
    content: (
      <div className="w2-sample-setup">
        <figure><img src="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=82&w=1600" alt="휴대전화와 커피, 꽃이 놓인 책상 실습 사진" /><figcaption><FileImage /> sample.jpg</figcaption></figure>
        <section>
          <span>SAVE AS</span>
          <strong>qwen-practice/sample.jpg</strong>
          <ol>
            <li><b>01</b><p>이미지 링크 열기<small>打开图像链接</small></p></li>
            <li><b>02</b><p>Save Image As…<small>将图像另存为</small></p></li>
            <li><b>03</b><p>파일명 sample.jpg<small>文件名必须准确</small></p></li>
          </ol>
          <a href="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=90&w=2000" target="_blank" rel="noreferrer">실습 이미지 열기 <ExternalLink /></a>
        </section>
      </div>
    ),
  },
  {
    index: "34",
    section: "LAB SCENARIO",
    chineseSection: "实践场景",
    title: "여러 물체가 있어도\n대표 카테고리는 하나만 고릅니다",
    chineseTitle: "即使有多个物体，也只选择一个代表类别",
    note: (
      <SpeakerNote
        duration="7분"
        lead="우리는 AI 사진 자동 정리 서비스를 만든다고 가정합니다."
        points={[
          "sample.jpg에는 휴대전화, 커피, 꽃과 책상 위 물건이 함께 보입니다.",
          "가능한 라벨은 person, document, food, device, other 다섯 개입니다.",
          "물체를 모두 나열하는 과제가 아니라 사진 전체를 대표하는 카테고리 하나를 선택하는 과제입니다.",
          "예시에서는 휴대전화가 사진의 주요 대상을 대표하므로 device로 분류합니다.",
          "서비스는 이 한 단어를 이용해 사진을 Devices 카테고리에 저장합니다.",
        ]}
        prompt="여러분이 직접 본다면 어떤 라벨을 고르겠습니까? 근거를 한 문장으로 말해 보세요."
        transition="모델도 같은 규칙을 따르도록 프롬프트에 출력 형식을 분명히 적겠습니다."
        sources={[
          { label: "실습 이미지 출처 · Unsplash", href: "https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8" },
        ]}
      />
    ),
    content: (
      <div className="w2-scenario">
        <figure><img src="https://images.unsplash.com/photo-1757778988730-6aed4fbef8a8?auto=format&fit=crop&fm=jpg&q=82&w=1600" alt="휴대전화와 커피, 꽃 등이 놓인 책상 사진" /><figcaption>sample.jpg</figcaption></figure>
        <div className="w2-scenario-side"><span>CHOOSE ONE LABEL</span><div>{["person","document","food","device","other"].map((label) => <b className={label === "device" ? "is-active" : ""} key={label}>{label}</b>)}</div><strong>device</strong><small>Devices category · 设备类别</small></div>
      </div>
    ),
  },
  {
    index: "35",
    section: "CLASSIFICATION PROMPT",
    chineseSection: "分类提示词",
    title: "라벨 목록과 출력 규칙을\n프롬프트에 함께 넣습니다",
    chineseTitle: "在提示词中同时加入标签列表与输出规则",
    note: (
      <SpeakerNote
        duration="8분"
        lead="분류 결과를 코드에서 바로 쓰려면 모델이 설명문을 덧붙이지 않도록 출력 규칙을 제한해야 합니다."
        points={[
          "LABELS 배열이 서비스가 허용하는 카테고리 목록입니다.",
          "Choose exactly one category라는 문장이 다중 선택을 막습니다.",
          "best represents the photo라는 기준이 개별 물체 탐지와 사진 전체 분류를 구분합니다.",
          "Return only the category name이 후처리를 단순하게 만듭니다.",
          "실제 서비스에서는 응답이 허용된 라벨인지 다시 검사하는 코드도 추가해야 합니다.",
        ]}
        prompt="마지막 문장을 빼면 모델 응답이 어떻게 달라질 수 있을까요?"
        transition="이제 sample.jpg를 Base64로 바꾸고 이미지와 프롬프트를 한 요청에 넣겠습니다."
      />
    ),
    content: (
      <div className="w2-prompt-layout">
        <CodeBlock title="app.py · ADD BELOW CLIENT" code={`LABELS = ["person", "document", "food", "device", "other"]\n\nprompt = f"""\nClassify this photo for an automatic photo organization service.\nChoose exactly one category from: {', '.join(LABELS)}\nChoose the category that best represents the photo.\nReturn only the category name.\n"""`} />
        <div className="w2-prompt-rules"><article><span>01</span><strong>허용 라벨 고정</strong><small>固定允许的标签</small></article><article><span>02</span><strong>한 개만 선택</strong><small>只选择一个</small></article><article><span>03</span><strong>카테고리명만 반환</strong><small>仅返回类别名称</small></article></div>
      </div>
    ),
  },
  {
    index: "36",
    section: "PREPARE VISION REQUEST",
    chineseSection: "准备Vision请求",
    title: "로컬 이미지를 읽어\nBase64 데이터로 변환합니다",
    chineseTitle: "读取本地图像并转换为Base64数据",
    note: (
      <SpeakerNote
        duration="10분"
        lead="API 요청에 로컬 파일 경로를 그대로 보내는 대신 파일 내용을 Base64 문자열로 변환합니다."
        points={[
          "sample.jpg가 app.py와 같은 폴더에 있어야 합니다.",
          "rb 모드로 파일을 열면 이미지 바이트를 읽을 수 있습니다.",
          "base64.b64encode로 인코딩한 뒤 UTF-8 문자열로 바꿉니다.",
          "data:image/jpeg;base64, 접두어와 문자열을 연결해 image_url의 url 값으로 전달합니다.",
          "PNG 파일을 사용할 경우 MIME type을 image/png로 바꿔야 합니다.",
        ]}
        prompt="FileNotFoundError가 나오면 코드와 Key 중 무엇을 먼저 확인해야 할까요?"
        transition="변환된 이미지와 분류 프롬프트를 한 메시지에 담아 모델에 보냅니다."
        sources={[
          { label: "Alibaba Cloud 이미지·영상 이해 가이드", href: "https://docs.modelstudio.console.alibabacloud.com/en/model-studio/vision" },
        ]}
      />
    ),
    content: (
      <div className="w2-encode-layout">
        <CodeBlock title="app.py · ADD BELOW PROMPT" code={`import base64\n\nwith open("sample.jpg", "rb") as f:\n    image_base64 = base64.b64encode(\n        f.read()\n    ).decode("utf-8")\n\nimage_data_url = (\n    "data:image/jpeg;base64,"\n    + image_base64\n)`} />
        <div className="w2-encode-flow"><div><FileImage /><strong>sample.jpg</strong><small>binary file</small></div><ChevronRight /><div><Braces /><strong>Base64</strong><small>text data</small></div><ChevronRight /><div><Cloud /><strong>image_url</strong><small>API input</small></div></div>
      </div>
    ),
  },
  {
    index: "37",
    section: "QWEN VISION CLASSIFICATION",
    chineseSection: "Qwen Vision分类",
    title: "이미지와 프롬프트를 보내고\n카테고리 한 단어를 받습니다",
    chineseTitle: "发送图像与提示词，接收一个类别词",
    note: (
      <SpeakerNote
        duration="15분"
        lead="이제 content 배열 안에 이미지와 텍스트를 함께 넣어 멀티모달 요청을 만듭니다."
        points={[
          "첫 번째 content 항목의 type은 image_url이며 Base64 데이터 URL을 전달합니다.",
          "두 번째 항목의 type은 text이며 앞에서 만든 분류 프롬프트를 전달합니다.",
          "응답 문자열에 strip()을 적용해 앞뒤 공백과 줄바꿈을 제거합니다.",
          "정상 실행되면 Category: device처럼 한 줄이 출력됩니다.",
          "결과가 허용된 라벨과 다르면 프롬프트를 고치거나 출력 검증 로직을 추가합니다.",
        ]}
        prompt="실행 결과와 여러분의 예상 라벨이 다르면 모델이 틀린 것인지, 분류 기준이 애매한 것인지 먼저 구분해 보세요."
        transition="받은 category를 검사한 뒤 실제 폴더를 만들고 사진을 복사하겠습니다."
        sources={[
          { label: "OpenAI 호환 Qwen Vision 호출", href: "https://www.alibabacloud.com/help/en/model-studio/qwen-vl-compatible-with-openai" },
        ]}
      />
    ),
    content: (
      <div className="w2-vision-layout">
        <CodeBlock title="app.py · REPLACE TEXT TEST REQUEST" compact code={`response = client.chat.completions.create(\n    model="qwen3.8-flash",\n    messages=[{\n        "role": "user",\n        "content": [\n            {"type": "image_url", "image_url": {\n                "url": image_data_url\n            }},\n            {"type": "text", "text": prompt}\n        ]\n    }],\n    extra_body={"enable_thinking": False}\n)\n\ncategory = response.choices[0].message.content.strip().lower()\nprint("Category:", category)`} />
        <div className="w2-vision-result"><Camera /><span>MODEL OUTPUT</span><strong>Category: device</strong><small>分类结果：device</small></div>
      </div>
    ),
  },
  {
    index: "38",
    section: "SERVICE ACTION",
    chineseSection: "服务动作",
    title: "category를 검사하고 해당 폴더에 사진을 복사합니다",
    chineseTitle: "验证category并将照片复制到对应文件夹",
    note: (
      <SpeakerNote
        duration="10분"
        lead="모델 응답을 바로 폴더명으로 쓰지 않고 먼저 허용된 라벨인지 검사한 뒤 sorted/category 폴더를 만듭니다."
        points={[
          "category.lower()로 대문자 차이를 없애고 결과를 표준화합니다.",
          "category가 LABELS 안에 없으면 ValueError를 발생시켜 예상하지 못한 폴더 생성을 막습니다.",
          "Path('sorted') / category는 category 값에 따라 sorted/device 같은 경로를 만듭니다.",
          "mkdir의 parents=True는 상위 sorted 폴더까지 만들고 exist_ok=True는 폴더가 이미 있어도 오류가 나지 않게 합니다.",
          "첫 실습은 원본 보호를 위해 shutil.copy2를 사용합니다. 실제 이동 기능은 copy2를 move로 바꿔 실험할 수 있습니다.",
        ]}
        prompt="모델이 설명 문장을 반환했을 때 LABELS 검사가 왜 필요한지 설명해 보세요."
        transition="전체 app.py를 실행하고 Terminal 출력과 Explorer의 새 폴더를 확인하겠습니다."
      />
    ),
    content: (
      <div className="w2-sort-action-layout">
        <CodeBlock title="app.py · APPEND AT THE END" code={`from pathlib import Path\nimport shutil\n\nif category not in LABELS:\n    raise ValueError(f"Unexpected category: {category}")\n\ntarget_dir = Path("sorted") / category\ntarget_dir.mkdir(parents=True, exist_ok=True)\ntarget_file = target_dir / "sample.jpg"\n\nshutil.copy2("sample.jpg", target_file)\nprint("Saved:", target_file)`} />
        <div className="w2-sort-flow">
          <article><CheckCircle2 /><span>VALIDATE</span><strong>category in LABELS</strong><small>验证返回类别</small></article>
          <ChevronRight />
          <article><FolderOpen /><span>CREATE</span><strong>sorted/device/</strong><small>创建分类文件夹</small></article>
          <ChevronRight />
          <article><Images /><span>COPY</span><strong>sample.jpg</strong><small>保留原图并复制</small></article>
        </div>
      </div>
    ),
  },
  {
    index: "39",
    section: "RUN & VERIFY",
    chineseSection: "运行与确认",
    title: "Terminal 출력과 새 폴더를 함께 확인합니다",
    chineseTitle: "同时确认Terminal输出与新建文件夹",
    note: (
      <SpeakerNote
        duration="10분"
        lead="app.py를 저장한 뒤 활성화된 가상환경에서 실행하고, Terminal의 category와 Explorer의 폴더 결과가 일치하는지 확인합니다."
        points={[
          "Ctrl+S 또는 Command+S로 app.py를 먼저 저장합니다. 탭의 흰 점이 사라져야 저장된 상태입니다.",
          "Terminal에서 python app.py를 실행합니다.",
          "Category: device와 Saved: sorted/device/sample.jpg 두 줄이 나오면 인식 결과와 서비스 동작이 연결된 것입니다.",
          "Explorer를 새로고침하고 sorted → device → sample.jpg가 만들어졌는지 확인합니다.",
          "자신의 사진으로 바꾸기 전에 예상 category를 먼저 적고, 실행 결과와 비교해 한 문장으로 기록합니다.",
        ]}
        prompt="Terminal의 category와 실제 생성된 폴더명이 정확히 일치하나요?"
        transition="실행이 되지 않는 경우 오류 메시지의 종류에 따라 원인을 찾겠습니다."
      />
    ),
    content: (
      <div className="w2-run-verify-layout">
        <CodeBlock title="VS CODE TERMINAL" code={`(.venv) qwen-practice % python app.py\nCategory: device\nSaved: sorted/device/sample.jpg`} />
        <div className="w2-output-tree"><FolderTree /><span>EXPLORER RESULT</span><strong>qwen-practice/<br />├── app.py<br />├── sample.jpg<br />└── sorted/<br />&nbsp;&nbsp;&nbsp;&nbsp;└── device/<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── sample.jpg</strong><small>인식 결과가 실제 서비스 동작으로 연결됨</small></div>
        <div className="w2-practice-check"><span>TRY YOUR PHOTO</span><p><b>1</b> 예상 라벨 적기</p><p><b>2</b> sample.jpg 교체</p><p><b>3</b> 실행 결과 비교</p><small>使用自己的照片重复实验</small></div>
      </div>
    ),
  },
  {
    index: "40",
    section: "TROUBLESHOOTING",
    chineseSection: "问题排查",
    title: "오류 메시지는\n어느 연결이 끊겼는지 알려 줍니다",
    chineseTitle: "错误信息会提示哪一处连接出现问题",
    note: (
      <SpeakerNote
        duration="10분"
        lead="오류가 나면 코드를 처음부터 다시 쓰지 말고 마지막 오류 메시지에서 원인을 분류합니다."
        points={[
          "ModuleNotFoundError는 현재 Python 환경에 라이브러리가 설치되지 않았다는 뜻입니다.",
          "RuntimeError: Check your .env file은 .env 파일명, 위치 또는 두 변수 중 빠진 값이 있는지 확인합니다.",
          "Authentication 오류는 Key가 비어 있거나 잘못 복사되었거나 Region이 맞지 않을 때 발생합니다.",
          "model_not_found는 모델 이름, 지역 또는 사용 권한을 확인해야 합니다.",
          "FileNotFoundError는 sample.jpg의 파일명과 위치를 확인합니다.",
          "Unexpected category는 모델 응답이 허용된 LABELS 중 하나가 아니라는 뜻이므로 프롬프트와 출력 내용을 확인합니다.",
          "429 또는 quota 오류는 무료 한도와 호출 속도를 확인하고 잠시 뒤 다시 실행합니다.",
        ]}
        prompt="오류가 있는 학생은 화면에 Key를 노출하지 말고 오류 유형과 마지막 메시지만 공유해 주세요."
        transition="정상 결과가 나온 학생은 마지막으로 Git에 저장하고 제출 항목을 확인합니다."
        sources={[
          { label: "Model Studio 오류 코드", href: "https://www.alibabacloud.com/help/en/model-studio/error-code" },
        ]}
      />
    ),
    content: (
      <div className="w2-troubleshoot">
        {[
          ["ModuleNotFoundError", "라이브러리 설치 환경 확인", "python -m pip install ..."],
          ["Check your .env file", ".env 이름·위치·두 변수 확인", "Key 값은 공유하지 않기"],
          ["Authentication", ".env · API Key · Region 확인", "Key를 화면에 공유하지 않기"],
          ["model_not_found", "모델 이름과 사용 가능한 지역 확인", "qwen3.8-flash"],
          ["FileNotFoundError", "sample.jpg 위치와 철자 확인", "app.py와 같은 폴더"],
          ["Unexpected category", "응답이 LABELS에 포함되는지 확인", "프롬프트 출력 규칙 확인"],
          ["429 / quota", "무료 한도와 호출 속도 확인", "잠시 후 다시 실행"],
        ].map(([error, cause, action]) => <article key={error}><AlertTriangle /><code>{error}</code><strong>{cause}</strong><small>{action}</small></article>)}
      </div>
    ),
  },
  {
    index: "41",
    section: "CONNECT GITHUB REPOSITORY",
    chineseSection: "连接GitHub仓库",
    title: "빈 GitHub 저장소를 만들고 로컬 폴더와 연결합니다",
    chineseTitle: "创建空GitHub仓库并连接本地文件夹",
    note: (
      <SpeakerNote
        duration="8분"
        lead="처음 저장하는 팀은 GitHub에서 빈 Repository를 만든 뒤 현재 qwen-practice 폴더에 remote 주소를 연결합니다."
        points={[
          "GitHub에서 New repository를 누르고 이름을 qwen-vision-week2처럼 알아보기 쉽게 정합니다.",
          "수업 제출 정책에 따라 Public 또는 Private를 선택합니다. Private인 경우 교수자 계정을 Collaborator로 초대해야 확인할 수 있습니다.",
          "로컬 파일과 충돌하지 않도록 Add a README, .gitignore, license는 선택하지 않고 빈 저장소로 만듭니다.",
          "저장소의 HTTPS 주소를 복사합니다. 예시는 https://github.com/USERNAME/qwen-vision-week2.git 형식입니다.",
          "VS Code Terminal에서 git init, git branch -M main, git remote add origin 주소를 실행합니다.",
          "git remote -v에 origin의 fetch와 push 주소가 보이면 연결이 완료된 것입니다.",
        ]}
        prompt="git remote -v에 본인 팀 저장소 주소가 두 줄로 표시되나요?"
        transition="마지막으로 비밀 파일이 제외됐는지 확인하고 commit과 push를 실행합니다."
        sources={[
          { label: "GitHub 저장소 만들기", href: "https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories" },
          { label: "GitHub remote 관리", href: "https://docs.github.com/en/get-started/git-basics/managing-remote-repositories" },
        ]}
      />
    ),
    content: (
      <div className="w2-github-connect-layout">
        <section className="w2-github-repo"><GitBranch /><span>GITHUB · NEW REPOSITORY</span><strong>qwen-vision-week2</strong><p><CheckCircle2 /> Empty repository</p><p><ShieldCheck /> Public / Private 확인</p><small>README · .gitignore · License 추가하지 않기</small></section>
        <CodeBlock title="VS CODE TERMINAL · CONNECT ONCE" code={`git init\ngit branch -M main\ngit remote add origin https://github.com/USERNAME/qwen-vision-week2.git\ngit remote -v`} />
        <div className="w2-remote-result"><GitBranch /><span>EXPECTED</span><code>origin ... (fetch)<br />origin ... (push)</code><strong><CheckCircle2 /> REMOTE CONNECTED</strong><small>远程仓库连接完成</small></div>
      </div>
    ),
  },
  {
    index: "42",
    section: "SAVE & SUBMIT",
    chineseSection: "保存与提交",
    title: "코드와 실행 결과를\nGitHub에 남깁니다",
    chineseTitle: "把代码与运行结果保存到GitHub",
    note: (
      <SpeakerNote
        duration="10분"
        lead="제출 전에 git status에서 .env가 추적되지 않는지 반드시 확인합니다."
        points={[
          "git add . 이후 git status에 .env가 보이면 commit하지 말고 .gitignore부터 수정합니다.",
          "처음 commit에서 사용자 정보 오류가 나오면 git config --global user.name과 user.email을 한 번 설정합니다.",
          "commit 메시지는 Week 2: Qwen API and Vision을 사용합니다.",
          "팀 GitHub Repository URL, Text API 연결 결과, Vision 분류 결과, sorted/category 폴더 결과를 제출합니다.",
          "마지막에 다음 주까지 완료할 목표를 한 문장으로 적습니다.",
          "오늘의 완료 기준은 API 연결과 이미지 분류 실행이 실제로 확인되는 것입니다.",
        ]}
        prompt="제출 전 서로의 저장소에서 .env 파일이 보이지 않는지 확인해 주세요."
      />
    ),
    content: (
      <div className="w2-submit-layout">
        <CodeBlock title="GIT" code={`git status\n# .env와 .venv가 보이지 않는지 확인\ngit add .\ngit commit -m "Week 2: Qwen API and Vision"\ngit push -u origin main`} />
        <div className="w2-submit-checklist"><span>이번 주 제출물 · 本周提交内容</span>{[
          "팀 GitHub Repository URL",
          "Qwen Text API 연결 결과 1개",
          "sample.jpg Vision 분류 결과 1개",
          "sorted/category 폴더 결과 1개",
          "다음 주 목표 1문장",
        ].map((item) => <p key={item}><ClipboardCheck /><strong>{item}</strong></p>)}<div><CheckCircle2 /><strong>WEEK 02 COMPLETE</strong><small>完成API连接与图像分类</small></div></div>
      </div>
    ),
  },
];

const DECK_CHANNEL = "dong-a-week-2-deck";
const DECK_STORAGE_KEY = "dong-a-week-2-current";

function SlideCanvas({ slide, position }: { slide: Slide; position: number }) {
  const titleText = slide.title.replace(/\s*\n\s*/g, " ");
  const titleSizeClass = titleText.length <= 13
    ? "is-title-short"
    : titleText.length <= 20
      ? "is-title-medium"
      : titleText.length <= 28
        ? "is-title-long"
        : "is-title-xlong";

  return (
    <section className={`w2-stage w2-slide-${slide.index}`} aria-live="polite">
      <div className="w2-grid" aria-hidden="true" />
      <div className="w2-scanline" aria-hidden="true" />
      <header className="w2-slide-meta">
        <span>{slide.section}{slide.chineseSection && <small>{slide.chineseSection}</small>}</span>
        <span>{String(position + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </header>
      <div className="w2-title-wrap">
        <h1 className={titleSizeClass}><span>{titleText}</span></h1>
        {slide.englishTitle && <p className="w2-title-english">{slide.englishTitle}</p>}
        <p className="w2-title-chinese">{slide.chineseTitle}</p>
      </div>
      <div className="w2-slide-content">{slide.content}</div>
      <footer className={`w2-slide-footer ${slide.index === "01" ? "is-cover" : ""}`}>
        <strong>Department of Artificial Intelligence, Dong-A University · Empirical AI Development Project II (Capstone Design)</strong>
        <small>Instructor · Bora Youn</small>
      </footer>
    </section>
  );
}

export default function Week2Page() {
  const [current, setCurrent] = useState(0);
  const [viewMode, setViewMode] = useState<"slideshow" | "presenter">("slideshow");
  const [fullscreenPrompt, setFullscreenPrompt] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const touchStartRef = useRef<number | null>(null);

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

  const enterFullscreen = useCallback(async () => {
    if (document.fullscreenElement) return;
    try {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      setFullscreenPrompt(false);
    } catch {
      setFullscreenPrompt(true);
    }
  }, []);

  const openDeckWindow = useCallback((mode: "slideshow" | "presenter") => {
    window.localStorage.setItem(DECK_STORAGE_KEY, String(current));
    const url = new URL(window.location.href);
    url.searchParams.set("view", mode);
    if (mode === "slideshow") url.searchParams.set("fullscreen", "1");
    else url.searchParams.delete("fullscreen");
    const features = mode === "presenter"
      ? "popup=yes,scrollbars=yes,resizable=yes,width=1440,height=920"
      : `popup=yes,fullscreen=yes,scrollbars=no,resizable=yes,left=0,top=0,width=${window.screen.availWidth},height=${window.screen.availHeight}`;
    const deckWindow = window.open(url.toString(), `dong-a-week2-${mode}`, features);
    deckWindow?.focus();
  }, [current]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "slideshow" && params.get("fullscreen") === "1") {
      setFullscreenPrompt(!document.fullscreenElement);
      void enterFullscreen();
    }
  }, [enterFullscreen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (fullscreenPrompt) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(slides.length - 1);
      if (event.key.toLowerCase() === "f") void enterFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, enterFullscreen, fullscreenPrompt, go]);

  const slide = slides[current];
  const nextSlide = slides[current + 1];

  if (viewMode === "presenter") {
    return (
      <main className="w2-page w2-presenter-shell">
        <header className="w2-presenter-header">
          <div><span>교수자 화면 · WEEK 02</span><h1>Recognition and Classification: Qwen Vision</h1></div>
          <Button onClick={() => openDeckWindow("slideshow")}><MonitorUp /> 슬라이드쇼 열기</Button>
        </header>
        <div className="w2-presenter-layout">
          <section className="w2-presenter-current">
            <div className="w2-presenter-label"><span>현재 슬라이드</span><strong>{current + 1} / {slides.length}</strong></div>
            <div className="w2-presenter-stage"><SlideCanvas slide={slide} position={current} /></div>
          </section>
          <aside className="w2-presenter-sidebar">
            <section className="w2-presenter-next"><span>다음 슬라이드</span><strong>{nextSlide?.title.replace("\n", " ") ?? "마지막 슬라이드입니다"}</strong></section>
            <section className="w2-presenter-notes"><span>교수자 대본</span>{slide.note}</section>
            <nav className="w2-presenter-controls">
              <Button variant="outline" onClick={() => go(current - 1)} disabled={current === 0}><ArrowLeft /> 이전</Button>
              <Button onClick={() => go(current + 1)} disabled={current === slides.length - 1}>다음 <ArrowRight /></Button>
            </nav>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main
      className="w2-page w2-audience-shell"
      aria-label="2주차 학생용 슬라이드쇼"
      onTouchStart={(event) => { touchStartRef.current = event.changedTouches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStartRef.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
        if (Math.abs(delta) > 48) go(delta < 0 ? current + 1 : current - 1);
        touchStartRef.current = null;
      }}
    >
      <SlideCanvas slide={slide} position={current} />
      {fullscreenPrompt && (
        <div className="w2-fullscreen-gate" role="dialog" aria-modal="true" aria-labelledby="w2-fullscreen-title">
          <div><Expand /><h1 id="w2-fullscreen-title">전체화면 슬라이드쇼</h1><p>브라우저 안내에 따라 전체화면을 시작합니다.</p><Button autoFocus onClick={enterFullscreen}>전체화면 시작</Button></div>
        </div>
      )}
      <nav className="w2-audience-controls" aria-label="슬라이드 이동">
        <Button variant="outline" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전 슬라이드"><ArrowLeft /></Button>
        <span>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <Button onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="다음 슬라이드"><ArrowRight /></Button>
        <button type="button" onClick={() => openDeckWindow("presenter")}>교수자 화면</button>
        <button type="button" onClick={() => void enterFullscreen()}><Expand /> 전체화면</button>
      </nav>
    </main>
  );
}
