"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Braces,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cloud,
  Code2,
  Expand,
  FileImage,
  FolderTree,
  GitBranch,
  Images,
  KeyRound,
  Laptop,
  MonitorUp,
  Presentation,
  RefreshCcw,
  ScanSearch,
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
    title: "Recognition and\nClassification",
    chineseTitle: "识别与分类：Qwen Vision",
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
        <div>
          <span className="w2-kicker">QWEN VISION LAB</span>
          <p>이미지 한 장을 서비스에 쓸 수 있는 분류 결과로 바꾸는 첫 실습</p>
          <small>将一张图像转换为可用于服务的分类结果</small>
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
    title: "세 서비스는 인식 결과를\n서로 다른 행동에 연결합니다",
    chineseTitle: "三项服务把识别结果连接到不同操作",
    note: (
      <SpeakerNote
        duration="8분"
        lead="Google Photos, Apple Photos, Google Lens는 모두 이미지를 이해하지만 사용자가 얻는 행동은 다릅니다."
        points={[
          "Google Photos는 사람, 반려동물, 장소와 사물 인식을 검색과 자동 정리에 활용합니다.",
          "Apple Photos는 사람과 반려동물, 장면과 사물을 People & Pets, 검색, 컬렉션에 연결합니다.",
          "Google Lens는 카메라나 스크린샷 속 사물, 텍스트, 제품과 장소를 검색, 번역, 식별, 쇼핑 행동으로 연결합니다.",
          "프로젝트 기획에서는 모델 이름보다 입력, 인식 결과, 후속 기능을 한 줄로 연결해 설명하는 것이 중요합니다.",
        ]}
        prompt="여러분 팀의 서비스에서 AI 결과가 연결될 다음 행동은 무엇인가요?"
        transition="먼저 Google Photos가 저장된 사진을 검색 가능한 정보로 바꾸는 과정을 자세히 보겠습니다."
        sources={[
          { label: "Google Photos 소개", href: "https://www.google.com/photos/about/" },
          { label: "Apple Photos 사람 및 반려동물 찾기", href: "https://support.apple.com/ko-kr/108795" },
          { label: "Google Lens", href: "https://lens.google/" },
        ]}
      />
    ),
    content: (
      <div className="w2-case-table" role="table" aria-label="인식 분류 서비스 사례 비교">
        <div className="w2-case-head" role="row"><span>서비스</span><span>입력</span><span>인식·분류</span><span>서비스 기능</span></div>
        {[
          ["Google Photos", "저장된 사진", "사람 · 반려동물 · 장소 · 문서", "검색 · 그룹 · 정리"],
          ["Apple Photos", "저장된 사진", "사람 · 반려동물 · 장면 · 사물", "People & Pets · 검색 · 컬렉션"],
          ["Google Lens", "카메라 · 이미지 · 화면", "사물 · 텍스트 · 제품 · 장소", "검색 · 번역 · 식별 · 쇼핑"],
        ].map((row) => <div className="w2-case-row" role="row" key={row[0]}>{row.map((cell, index) => <span role="cell" data-label={["서비스","입력","인식·분류","서비스 기능"][index]} key={cell}>{cell}</span>)}</div>)}
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
      <div className="w2-case-detail is-google">
        <section className="w2-case-identity">
          <Images />
          <span>GOOGLE PHOTOS</span>
          <strong>내용으로 다시 찾기</strong>
          <small>按内容重新查找照片</small>
        </section>
        <section className="w2-case-mechanism">
          <div className="w2-case-flow">
            <article><b>INPUT</b><strong>저장된 사진</strong><small>백업된 이미지 모음</small></article>
            <ChevronRight />
            <article><b>RECOGNIZE</b><strong>사람 · 반려동물<br />장소 · 문서 · 사물</strong><small>사진 속 의미 단서</small></article>
            <ChevronRight />
            <article><b>ACTION</b><strong>검색 · 그룹 · 정리</strong><small>필요한 사진에 빠르게 도달</small></article>
          </div>
          <p className="w2-case-example"><span>사용 예</span><strong>“강아지” · “부산” · “영수증”</strong>처럼 내용으로 검색</p>
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
      <div className="w2-case-detail is-apple">
        <section className="w2-case-identity">
          <UsersRound />
          <span>APPLE PHOTOS</span>
          <strong>관계로 모아 보기</strong>
          <small>按人物关系整理浏览</small>
        </section>
        <section className="w2-case-mechanism">
          <div className="w2-case-flow">
            <article><b>INPUT</b><strong>사진 · 비디오</strong><small>기기 속 라이브러리</small></article>
            <ChevronRight />
            <article><b>RECOGNIZE</b><strong>사람 · 반려동물<br />장면 · 사물</strong><small>반복되는 대상 묶기</small></article>
            <ChevronRight />
            <article><b>ACTION</b><strong>People &amp; Pets<br />검색 · 컬렉션</strong><small>이름 지정과 즐겨찾기</small></article>
          </div>
          <p className="w2-case-example"><span>사용 예</span><strong>이름 붙이기 → 그룹 찾기 → 오분류 수정</strong></p>
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
        transition="세 사례의 공통 구조를 확인했습니다. 이제 같은 구조를 직접 구현하는 오늘 실습 순서를 보겠습니다."
        sources={[
          { label: "Google Lens 기능 소개", href: "https://lens.google/intl/ko/" },
          { label: "Google Lens 작동 방식", href: "https://lens.google/intl/ko/howlensworks/" },
        ]}
      />
    ),
    content: (
      <div className="w2-case-detail is-lens">
        <section className="w2-case-identity">
          <ScanSearch />
          <span>GOOGLE LENS</span>
          <strong>보는 즉시 행동하기</strong>
          <small>看见后立即采取行动</small>
        </section>
        <section className="w2-case-mechanism">
          <div className="w2-case-flow">
            <article><b>INPUT</b><strong>카메라 · 이미지<br />스크린샷</strong><small>전체 또는 선택 영역</small></article>
            <ChevronRight />
            <article><b>RECOGNIZE</b><strong>사물 · 텍스트<br />제품 · 식물 · 장소</strong><small>장면에 맞는 의미 추출</small></article>
            <ChevronRight />
            <article><b>ACTION</b><strong>검색 · 번역 · 복사<br />식별 · 쇼핑</strong><small>상황별 다음 행동</small></article>
          </div>
          <p className="w2-case-example"><span>사용 예</span><strong>메뉴 번역 · 식물 식별 · 비슷한 제품 찾기</strong></p>
        </section>
      </div>
    ),
  },
  {
    index: "12",
    section: "LAB ROADMAP",
    chineseSection: "实践路线图",
    title: "설정부터 제출까지\n다섯 단계로 진행합니다",
    chineseTitle: "从设置到提交共分五个步骤",
    note: (
      <SpeakerNote
        duration="4분"
        lead="실습은 한 번에 긴 코드를 입력하지 않고 성공 지점을 다섯 개로 나누어 진행합니다."
        points={[
          "먼저 Python과 필요한 도구가 설치되어 있는지 확인합니다.",
          "그다음 Model Studio의 Region, 무료 quota, API Key를 준비합니다.",
          "텍스트 요청으로 연결만 먼저 확인한 뒤 Vision 요청으로 확장합니다.",
          "마지막에는 실행 결과를 확인하고 GitHub에 저장합니다.",
        ]}
        transition="첫 단계로 각자 실습 환경이 준비되어 있는지 확인하겠습니다."
      />
    ),
    content: (
      <div className="w2-lab-roadmap">
        {[
          [Laptop, "01", "환경 확인", "Python · VS Code"],
          [Cloud, "02", "계정 설정", "Singapore · Free Quota"],
          [Terminal, "03", "Text API", "연결 성공 확인"],
          [Camera, "04", "Vision API", "sample.jpg 분류"],
          [GitBranch, "05", "저장·제출", "GitHub Repository"],
        ].map(([Icon, number, title, detail], index) => { const StepIcon = Icon as typeof Laptop; return (
          <div className="w2-roadmap-step" key={number as string}><article><StepIcon /><span>{number as string}</span><strong>{title as string}</strong><small>{detail as string}</small></article>{index < 4 && <ChevronRight />}</div>
        ); })}
      </div>
    ),
  },
  {
    index: "13",
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
    index: "14",
    section: "MODEL STUDIO SETUP",
    chineseSection: "Model Studio设置",
    title: "Singapore 지역과\n무료 사용 한도를 먼저 확인합니다",
    chineseTitle: "先确认新加坡区域与免费额度",
    note: (
      <SpeakerNote
        duration="10분"
        lead="API Key를 만들기 전에 Region이 Singapore인지 확인합니다. 지역이 다르면 주소와 Key가 맞지 않을 수 있습니다."
        points={[
          "Model Studio를 활성화하고 Singapore Region을 선택합니다.",
          "모델 사용 페이지의 Free Quota 탭에서 사용 가능한 한도와 만료일을 확인합니다.",
          "결제 정보를 등록한 계정은 무료 한도 이후 비용이 발생할 수 있으므로 Free Quota Only를 켭니다.",
          "Free Quota Only가 켜지면 한도를 다 쓴 뒤 호출이 중단되어 추가 비용을 막을 수 있습니다.",
          "화면 이름은 서비스 업데이트에 따라 달라질 수 있으므로 Free Quota 또는 Model Usage 메뉴를 찾습니다.",
        ]}
        prompt="현재 화면에서 Region과 Free Quota Only 상태를 옆 사람과 서로 확인해 주세요."
        transition="이제 API Key를 만들고 프로젝트에 안전하게 저장하겠습니다."
        sources={[
          { label: "Alibaba Cloud Model Studio 무료 quota", href: "https://www.alibabacloud.com/help/en/model-studio/new-free-quota" },
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
    index: "15",
    section: "API KEY & BASE URL",
    chineseSection: "API Key与基础URL",
    title: "API Key는 코드가 아니라\n환경 파일에 저장합니다",
    chineseTitle: "API Key保存在环境文件中，而不是代码里",
    note: (
      <SpeakerNote
        duration="8분"
        lead="API Key는 비밀번호와 같습니다. 화면 공유나 GitHub에 노출되면 즉시 삭제하고 새 Key를 만들어야 합니다."
        points={[
          "Model Studio에서 API Key를 만들고 생성 직후 전체 값을 복사합니다.",
          "Key는 .env 파일의 DASHSCOPE_API_KEY에만 넣습니다.",
          "수업 자료의 dashscope-intl 주소는 기존 호환 주소이며 현재도 동작합니다.",
          "공식 문서는 워크스페이스별 Singapore 주소 사용을 권장합니다. 콘솔에 전용 주소가 보이면 그 값을 DASHSCOPE_BASE_URL에 사용해도 됩니다.",
          ".env를 GitHub에 올리지 않도록 .gitignore에 반드시 등록합니다.",
        ]}
        prompt="지금 화면을 공유 중인 학생은 Key 값이 보이지 않는지 먼저 확인해 주세요."
        transition="세 개의 프로젝트 파일을 만들고 환경 값을 연결하겠습니다."
        sources={[
          { label: "API Key 만들기", href: "https://www.alibabacloud.com/help/en/model-studio/get-api-key" },
          { label: "OpenAI 호환 Vision API와 지역별 주소", href: "https://www.alibabacloud.com/help/en/model-studio/qwen-vl-compatible-with-openai" },
        ]}
      />
    ),
    content: (
      <div className="w2-secret-layout">
        <div className="w2-secret-card"><KeyRound /><span>SECRET</span><strong>DASHSCOPE_API_KEY</strong><p>채팅방 · 과제 게시판 · GitHub에 올리지 않기</p><small>不要上传到聊天、作业平台或GitHub</small></div>
        <CodeBlock title=".env" compact code={`DASHSCOPE_API_KEY=YOUR_API_KEY\nDASHSCOPE_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1`} />
      </div>
    ),
  },
  {
    index: "16",
    section: "PROJECT FILES",
    chineseSection: "项目文件",
    title: "프로젝트는 세 파일로\n단순하게 시작합니다",
    chineseTitle: "项目从三个简单文件开始",
    note: (
      <SpeakerNote
        duration="8분"
        lead="qwen-practice 폴더를 만들고 VS Code에서 폴더 자체를 엽니다."
        points={[
          "app.py에는 API 호출 코드를 작성합니다.",
          ".env에는 API Key와 Base URL을 넣고 절대 제출하지 않습니다.",
          ".gitignore에는 .env와 __pycache__/를 등록합니다.",
          "라이브러리는 python -m pip install -U openai python-dotenv 명령으로 설치합니다.",
          "파일명이 .env.txt가 되지 않았는지 Windows 파일 탐색기에서 확장자를 확인합니다.",
        ]}
        transition="파일 준비가 끝나면 가장 간단한 텍스트 요청으로 연결부터 확인합니다."
      />
    ),
    content: (
      <div className="w2-files-layout">
        <div className="w2-folder-tree"><FolderTree /><span>qwen-practice/</span><strong>├── app.py<br />├── .env<br />└── .gitignore</strong></div>
        <div className="w2-file-setup">
          <CodeBlock title="INSTALL" compact code="python -m pip install -U openai python-dotenv" />
          <CodeBlock title=".gitignore" compact code={`.env\n__pycache__/`} />
        </div>
      </div>
    ),
  },
  {
    index: "17",
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
          "OpenAI 클라이언트에 API Key와 Base URL을 전달합니다.",
          "모델 이름은 qwen3.8-flash이며, 간단한 확인 문장을 요청합니다.",
          "extra_body에서 thinking을 끄면 연결 확인용 요청을 빠르게 실행할 수 있습니다.",
          "터미널에서 python app.py를 실행하고 응답이 출력되면 다음 단계로 넘어갑니다.",
        ]}
        prompt="오류가 난 학생은 오류 메시지의 마지막 세 줄만 읽고 Key, URL, model 중 어느 부분인지 표시해 보세요."
        transition="연결이 확인되면 같은 클라이언트에 이미지 입력을 추가합니다."
        sources={[
          { label: "Alibaba Cloud Model Studio 모델 목록", href: "https://www.alibabacloud.com/help/en/model-studio/models" },
        ]}
      />
    ),
    content: (
      <div className="w2-code-result-layout">
        <CodeBlock title="app.py · TEXT TEST" compact code={`import os\nfrom dotenv import load_dotenv\nfrom openai import OpenAI\n\nload_dotenv()\nclient = OpenAI(\n    api_key=os.getenv("DASHSCOPE_API_KEY"),\n    base_url=os.getenv("DASHSCOPE_BASE_URL")\n)\n\nresponse = client.chat.completions.create(\n    model="qwen3.8-flash",\n    messages=[{"role": "user", "content": "Say API connection successful."}],\n    extra_body={"enable_thinking": False}\n)\nprint(response.choices[0].message.content)`} />
        <div className="w2-success"><Terminal /><span>RUN</span><code>python app.py</code><strong><CheckCircle2 /> API connection successful</strong></div>
      </div>
    ),
  },
  {
    index: "18",
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
    index: "19",
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
        <CodeBlock title="CLASSIFICATION PROMPT" code={`LABELS = ["person", "document", "food", "device", "other"]\n\nprompt = f"""\nClassify this photo for an automatic photo organization service.\nChoose exactly one category from: {', '.join(LABELS)}\nChoose the category that best represents the photo.\nReturn only the category name.\n"""`} />
        <div className="w2-prompt-rules"><article><span>01</span><strong>허용 라벨 고정</strong><small>固定允许的标签</small></article><article><span>02</span><strong>한 개만 선택</strong><small>只选择一个</small></article><article><span>03</span><strong>카테고리명만 반환</strong><small>仅返回类别名称</small></article></div>
      </div>
    ),
  },
  {
    index: "20",
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
        <CodeBlock title="READ + ENCODE" code={`import base64\n\nwith open("sample.jpg", "rb") as f:\n    image_base64 = base64.b64encode(\n        f.read()\n    ).decode("utf-8")\n\nimage_data_url = (\n    "data:image/jpeg;base64,"\n    + image_base64\n)`} />
        <div className="w2-encode-flow"><div><FileImage /><strong>sample.jpg</strong><small>binary file</small></div><ChevronRight /><div><Braces /><strong>Base64</strong><small>text data</small></div><ChevronRight /><div><Cloud /><strong>image_url</strong><small>API input</small></div></div>
      </div>
    ),
  },
  {
    index: "21",
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
        transition="실행 중 자주 만나는 오류를 원인별로 빠르게 해결하겠습니다."
        sources={[
          { label: "OpenAI 호환 Qwen Vision 호출", href: "https://www.alibabacloud.com/help/en/model-studio/qwen-vl-compatible-with-openai" },
        ]}
      />
    ),
    content: (
      <div className="w2-vision-layout">
        <CodeBlock title="VISION REQUEST" compact code={`response = client.chat.completions.create(\n    model="qwen3.8-flash",\n    messages=[{\n        "role": "user",\n        "content": [\n            {"type": "image_url", "image_url": {\n                "url": f"data:image/jpeg;base64,{image_base64}"\n            }},\n            {"type": "text", "text": prompt}\n        ]\n    }],\n    extra_body={"enable_thinking": False}\n)\n\ncategory = response.choices[0].message.content.strip()\nprint("Category:", category)`} />
        <div className="w2-vision-result"><Camera /><span>MODEL OUTPUT</span><strong>Category: device</strong><small>分类结果：device</small></div>
      </div>
    ),
  },
  {
    index: "22",
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
          "Authentication 오류는 Key가 비어 있거나 잘못 복사되었거나 Region이 맞지 않을 때 발생합니다.",
          "model_not_found는 모델 이름, 지역 또는 사용 권한을 확인해야 합니다.",
          "FileNotFoundError는 sample.jpg의 파일명과 위치를 확인합니다.",
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
          ["Authentication", ".env · API Key · Region 확인", "Key를 화면에 공유하지 않기"],
          ["model_not_found", "모델 이름과 사용 가능한 지역 확인", "qwen3.8-flash"],
          ["FileNotFoundError", "sample.jpg 위치와 철자 확인", "app.py와 같은 폴더"],
          ["429 / quota", "무료 한도와 호출 속도 확인", "잠시 후 다시 실행"],
        ].map(([error, cause, action]) => <article key={error}><AlertTriangle /><code>{error}</code><strong>{cause}</strong><small>{action}</small></article>)}
      </div>
    ),
  },
  {
    index: "23",
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
          "commit 메시지는 Week 2: Qwen API and Vision을 사용합니다.",
          "팀 GitHub Repository URL, Text API 연결 결과, Vision 분류 결과를 제출합니다.",
          "마지막에 다음 주까지 완료할 목표를 한 문장으로 적습니다.",
          "오늘의 완료 기준은 API 연결과 이미지 분류 실행이 실제로 확인되는 것입니다.",
        ]}
        prompt="제출 전 서로의 저장소에서 .env 파일이 보이지 않는지 확인해 주세요."
      />
    ),
    content: (
      <div className="w2-submit-layout">
        <CodeBlock title="GIT" code={`git status\ngit add .\ngit commit -m "Week 2: Qwen API and Vision"\ngit push`} />
        <div className="w2-submit-checklist"><span>이번 주 제출물 · 本周提交内容</span>{[
          "팀 GitHub Repository URL",
          "Qwen Text API 연결 결과 1개",
          "sample.jpg Vision 분류 결과 1개",
          "다음 주 목표 1문장",
        ].map((item) => <p key={item}><ClipboardCheck /><strong>{item}</strong></p>)}<div><CheckCircle2 /><strong>WEEK 02 COMPLETE</strong><small>完成API连接与图像分类</small></div></div>
      </div>
    ),
  },
];

const DECK_CHANNEL = "dong-a-week-2-deck";
const DECK_STORAGE_KEY = "dong-a-week-2-current";

function SlideCanvas({ slide, position }: { slide: Slide; position: number }) {
  return (
    <section className={`w2-stage w2-slide-${slide.index}`} aria-live="polite">
      <div className="w2-grid" aria-hidden="true" />
      <div className="w2-scanline" aria-hidden="true" />
      <header className="w2-slide-meta">
        <span>{slide.section}{slide.chineseSection && <small>{slide.chineseSection}</small>}</span>
        <span>{String(position + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </header>
      <div className="w2-title-wrap">
        <h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p>{slide.chineseTitle}</p>
      </div>
      <div className="w2-slide-content">{slide.content}</div>
      <footer className="w2-slide-footer">
        <span>Dong-A University · Empirical AI Development Project II</span>
        <b>QWEN / VISION / CLASSIFICATION</b>
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
