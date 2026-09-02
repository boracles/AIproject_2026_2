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
    index: "04", eyebrow: "AI 접목 유형", chineseEyebrow: "AI应用类型",
    title: "AI는 여섯 가지 방식으로\n문제 해결에 들어옵니다", chineseTitle: "AI以六种方式参与问题解决",
    note: "기술 이름부터 고르지 않도록 합니다. 학생들이 프로젝트의 반복 작업, 판단, 탐색, 생성 지점과 여섯 가지 AI 역할을 연결하게 합니다.",
    chineseNote: "不要先从技术名称出发，而是把项目中的重复工作、判断、搜索和生成环节与六种AI作用连接起来。",
    content: <div className="pattern-grid">{[
      ["01", "인식·분류", "识别与分类", "이미지·문서·음성에서 대상이나 상태를 찾습니다.", "从图像、文档和语音中识别对象或状态。"],
      ["02", "예측", "预测", "수요·위험·고장처럼 앞으로의 가능성을 추정합니다.", "估计需求、风险、故障等未来可能性。"],
      ["03", "추천·개인화", "推荐与个性化", "상황에 맞는 다음 콘텐츠나 행동을 제안합니다.", "根据情境推荐下一项内容或行动。"],
      ["04", "생성", "生成", "글·이미지·코드·보고서 초안을 만듭니다.", "生成文本、图像、代码或报告草稿。"],
      ["05", "대화·지식 검색", "对话与知识检索", "문서와 데이터를 근거로 답변하고 요약합니다.", "基于文档和数据回答问题并进行摘要。"],
      ["06", "자동화·에이전트", "自动化与智能体", "여러 도구를 연결해 반복 업무의 일부를 수행합니다.", "连接多个工具，执行部分重复性工作。"],
    ].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><div><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></div></article>)}</div>,
  },
  {
    index: "05", eyebrow: "프로젝트 사례 · 아이디어", chineseEyebrow: "项目案例 · 创意",
    title: "이런 일상의 불편에서\nAI 프로젝트를 시작할 수 있습니다", chineseTitle: "可以从这些日常不便中开始AI项目",
    note: "거창한 기술보다 자주 겪는 불편을 구체적으로 찾는 것이 좋은 출발입니다. 세 가지 예시 중 어떤 기능을 직접 써 보고 싶은지 학생들에게 물어봅니다.",
    chineseNote: "比起宏大的技术，从经常遇到的具体不便出发更合适。可以问学生三个案例中最想亲自使用哪一个。",
    content: <div className="example-grid">{[["SPEECH", "발표 연습 코치", "演讲练习教练", "발표 영상을 올리면 말 빠르기·반복 표현·침묵 구간을 보여주고, 다음 연습 항목을 추천합니다.", "上传演讲视频后，分析语速、重复表达和停顿，并推荐下一步练习内容。", "발표가 낯선 대학생", "不熟悉演讲的大学生"], ["STUDY", "전공 수업 자료 도우미", "专业课程资料助手", "강의자료의 어려운 용어를 쉽게 풀고, 답변마다 근거가 된 페이지를 함께 보여줍니다.", "用简单语言解释课件中的难懂术语，并在每个回答中标出依据页面。", "한국어 전공 수업을 듣는 유학생", "学习韩语专业课的留学生"], ["CAMPUS", "교내 공지 찾기", "校内通知查找助手", "학과·장학·졸업 공지를 모아 질문에 답하고, 원문 링크와 마감일을 정리해 줍니다.", "汇总院系、奖学金和毕业通知，回答问题并整理原文链接与截止日期。", "필요한 공지를 자주 놓치는 학생", "经常错过重要通知的学生"]].map(([tag, title, chineseTitle, detail, chineseDetail, user, chineseUser]) => <article key={tag}><span>{tag}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p><b>사용자 · 用户<strong>{user}<small>{chineseUser}</small></strong></b></article>)}</div>,
  },
  {
    index: "06", eyebrow: "프로젝트 사례 · 구체화", chineseEyebrow: "项目案例 · 具体化",
    title: "막연한 아이디어도\n사용 장면을 정하면 프로젝트가 됩니다", chineseTitle: "模糊的想法，只要明确使用场景，就能变成项目",
    note: "‘AI 공부 앱’처럼 넓은 아이디어를 사용자, 사용 장면, 핵심 기능, 테스트 방법으로 좁혀 가는 과정을 보여줍니다.",
    chineseNote: "展示如何把“AI学习应用”这样宽泛的想法，收窄为用户、使用场景、核心功能和测试方法。",
    content: <div className="case-flow">{[["01 · 처음 아이디어", "01 · 最初想法", "AI로 공부를 도와주는 앱", "用AI帮助学习的应用"], ["02 · 사용 장면", "02 · 使用场景", "중국인 유학생이 한국어 전공 강의자료를 읽다가 이해되지 않는 개념을 만났을 때", "中国留学生阅读韩语专业课资料时，遇到不理解的概念"], ["03 · 핵심 기능", "03 · 核心功能", "자료 업로드 → 질문 → 근거 페이지 + 쉬운 설명 + 한중 용어 비교", "上传资料 → 提问 → 依据页面 + 简单解释 + 中韩术语对照"], ["04 · 테스트 방법", "04 · 测试方法", "실제 강의자료의 질문 10개로 근거 페이지가 맞는지, 설명이 도움이 되는지 살펴봅니다.", "用真实课件的10个问题，检查依据页面是否正确、解释是否有帮助。"]].map(([label, chineseLabel, detail, chineseDetail], i) => <article key={label} className={i === 0 ? "case-start" : ""}><span>{label}<small>{chineseLabel}</small></span><strong>{detail}<small>{chineseDetail}</small></strong>{i < 3 && <ChevronRight />}</article>)}</div>,
  },
  {
    index: "07", eyebrow: "사례 해부 방법", chineseEyebrow: "案例拆解方法",
    title: "기술보다 먼저\n여섯 칸을 연결합니다", chineseTitle: "先连接六个要素，而不是先选技术",
    note: "모든 사례와 학생 프로젝트를 같은 여섯 칸으로 봅니다. 특히 마지막 검증 기준이 없으면 실증 프로젝트가 되기 어렵다는 점을 강조합니다.",
    chineseNote: "用同样的六个要素分析所有案例和学生项目，并强调没有验证标准就很难成为实证项目。",
    content: <div className="canvas-layout"><div className="canvas-flow">{[
      ["01", "사용자", "用户", "누가", "谁"], ["02", "문제", "问题", "어떤 불편", "什么不便"], ["03", "입력", "输入", "구할 수 있는 데이터", "可获得的数据"],
      ["04", "AI 역할", "AI作用", "인식·예측·추천·생성", "识别·预测·推荐·生成"], ["05", "결과", "结果", "바뀌는 행동·판단", "改变的行动或判断"], ["06", "검증", "验证", "무엇을 측정할지", "要测量什么"],
    ].map(([number, title, chineseTitle, detail, chineseDetail], i) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i < 5 && <ChevronRight />}</article>)}</div><blockquote><b>문제 정의 문장<small>问题定义句式</small></b><p><strong>[사용자]</strong>는 <strong>[상황]</strong>에서 <strong>[문제]</strong>를 겪는다. <strong>[입력]</strong>으로 <strong>[AI 역할]</strong>을 수행하고, <strong>[결과]</strong>를 제공해 <strong>[지표]</strong>의 변화를 확인한다.<small><strong>[用户]</strong>在<strong>[情境]</strong>中遇到<strong>[问题]</strong>。用<strong>[输入]</strong>完成<strong>[AI作用]</strong>，提供<strong>[结果]</strong>并确认<strong>[指标]</strong>变化。</small></p></blockquote></div>,
  },
  {
    index: "08", eyebrow: "이 수업에서 말하는 실증", chineseEyebrow: "本课程所说的实证",
    title: "‘좋아 보인다’가 아니라\n직접 써 본 결과로 판단합니다", chineseTitle: "不凭“看起来不错”，而用实际使用结果来判断",
    note: "먼저 테스트 목표를 정하고, 사용자가 직접 써 보는 모습을 살펴본 뒤, 기록한 결과를 다음 버전에 반영하는 과정을 실증이라고 설명합니다.",
    chineseNote: "先确定测试目标，观察用户实际使用，再把记录的结果反映到下一版本——这就是本课程所说的实证。",
    content: <div className="evidence-layout"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow">{[["테스트 목표", "测试目标"], ["직접 사용", "实际使用"], ["결과 기록", "记录结果"], ["다음 버전", "下一版本"]].map(([item, chinese], i) => <div key={item}><span>0{i + 1}</span><p>{item}<small>{chinese}</small></p>{i < 3 && <ChevronRight />}</div>)}</div><p className="evidence-explain">먼저 무엇이 잘되어야 하는지 기준을 정합니다. 그다음 사용자가 서비스를 쓰는 모습을 살펴보고, 결과를 기록해 다음 버전에 반영합니다.<br /><small>先确定什么才算做得好，再观察用户如何使用服务，并把记录的结果反映到下一版本。</small></p></div>,
  },
  {
    index: "09", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "사례에서 시작해\n문제·기능·근거로 좁힙니다", chineseTitle: "从案例出发，逐步聚焦问题、功能与证据",
    note: "첫 3주는 사례 탐색, 문제 정의, 계획과 MVP 순서로 진행합니다. 이후 매주 개발 단계와 연결된 AI 사례 브리핑을 먼저 진행합니다.",
    chineseNote: "前三周依次进行案例探索、问题定义、项目计划与MVP。之后每周先学习与开发阶段相关的AI案例。",
    content: <div className="sprint-map sprint-six">{[["01", "가능성 탐색", "探索可能性", "AI 접목 유형 · 사례", "AI应用类型 · 案例"], ["02", "문제 정의", "问题定义", "사례 해부 · AI 기회 맵", "案例拆解 · AI机会地图"], ["03", "계획", "计划", "프로젝트 계획 · MVP", "项目计划 · MVP"], ["04–07", "개발", "开发", "AI 흐름 · 서비스 통합", "AI流程 · 服务整合"], ["08", "중간 검증", "期中验证", "시연 · 범위 재설정", "演示 · 重新设定范围"], ["09–15", "실증·완성", "实证·完成", "오류 · 배포 · 최종 시연", "错误 · 部署 · 最终演示"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week} className={i < 3 ? "start-phase" : ""}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 4 && <b>8주차 · 第8周<br />중간 발표 · 期中汇报</b>}{i === 5 && <b>15주차 · 第15周<br />최종 발표 · 期末汇报</b>}</article>)}</div>,
  },
  {
    index: "10", eyebrow: "오늘 진행 순서", chineseEyebrow: "今天的进行顺序",
    title: "사례를 본 뒤\n내 프로젝트로 옮겨봅니다", chineseTitle: "看完案例后，将原理迁移到自己的项目",
    note: "첫날부터 완성된 문제 정의나 발표 자료를 요구하지 않습니다. 사례의 구조를 자기 프로젝트에 대입해 보는 기회 탐색까지 진행합니다.",
    chineseNote: "第一天不要求完整的问题定义或汇报材料，只需把案例结构代入自己的项目并探索可能性。",
    content: <div className="today-layout"><div className="today-list">{[["수업 안내", "课程说明", "목표, 평가, 15주 진행과 제출 방식을 확인합니다.", "确认课程目标、评价、15周安排与提交方式。"], ["AI 적용 사례 브리핑", "AI应用案例简报", "여섯 가지 접목 유형과 구체적인 프로젝트 사례를 봅니다.", "了解六种AI应用类型与具体项目案例。"], ["프로젝트Ⅰ 공유", "分享项目Ⅰ", "현재 상태와 어려운 점을 발표 자료 없이 이야기합니다.", "无需汇报材料，分享当前状态与困难。"], ["AI 기회 캔버스", "AI机会画布", "사용자·문제·입력·AI·결과·검증을 한 줄씩 적어봅니다.", "分别填写用户、问题、输入、AI、结果与验证。"], ["질의응답", "答疑", "2주차 사례 분석과 문제 정의 준비를 확인합니다.", "确认第2周案例分析与问题定义的准备。"]].map(([title, chineseTitle, detail, chineseDetail], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></div><Check /></article>)}</div><aside><Users /><strong>오늘은 완성된 계획보다<br />가능성을 찾습니다.</strong><span>先发现可能性，不急于完成计划</span><p>프로젝트Ⅰ의 현재 상태 · 가능한 AI 접점<small>项目Ⅰ的当前状态 · 可能的AI切入点</small></p></aside></div>,
  },
  {
    index: "11", eyebrow: "1주차 준비", chineseEyebrow: "第1周准备",
    title: "별도 제출 없이\nAI 접목 아이디어를 준비합니다", chineseTitle: "无需单独提交，准备AI应用想法",
    note: "이번 주에는 별도 제출이 없습니다. 2주차 사례 분석과 문제 정의 활동에 사용할 다섯 가지 메모만 준비합니다.",
    chineseNote: "本周无需单独提交，只需准备第2周案例分析与问题定义活动需要的五项笔记。",
    content: <div className="assignment-layout"><div className="assignment-head"><ClipboardList /><div><span>1주차 별도 제출 없음 · 第1周无需单独提交</span><h3>AI 접목 아이디어 준비<small>准备AI应用想法</small></h3><p>2주차의 사례 분석과 문제 정의 활동에 사용할 메모입니다.<small>用于第2周的案例分析与问题定义活动。</small></p></div></div><ol>{[["프로젝트Ⅰ의 현재 상태와 어려운 점", "项目Ⅰ的当前状态与遇到的困难"], ["관심 있는 사용자 문제 1–2개", "感兴趣的1–2个用户问题"], ["참고하고 싶은 AI 적용 사례 1개", "想参考的1个AI应用案例"], ["가능한 흐름: 입력 → AI 처리 → 결과", "可能的流程：输入 → AI处理 → 输出"], ["성공 여부를 확인할 기준 1개", "用于判断成功与否的1个标准"]].map(([item, chinese], i) => <li key={item}><span>{i + 1}</span><div><strong>{item}</strong><small>{chinese}</small></div></li>)}</ol><div className="submission-box"><span>이번 주 제출 · 本周提交</span><strong>없음<small>无需提交</small></strong><p>기술 이름보다 사용자 문제와 구할 수 있는 입력을 먼저 생각합니다.<small>先考虑用户问题与可获得的输入，而不是技术名称。</small></p></div></div>,
  },
  {
    index: "12", eyebrow: "마무리", chineseEyebrow: "结束",
    title: "다음 주, 사례를 해부해\n우리의 문제를 정의합니다", chineseTitle: "下周，拆解案例并定义我们的问题",
    note: "다음 주에는 AI 기회 맵과 문제 정의 초안을 만들며, 프로젝트 계획 발표는 3주차에 진행한다고 안내합니다.",
    chineseNote: "下周将完成AI机会地图和问题定义初稿，项目计划汇报安排在第3周。",
    content: <div className="closing-content"><div className="closing-orb"><Sparkles /></div><div><p>AI를 어디에 넣을 수 있을까요?<small>AI可以应用在哪里？</small></p><span>사용자 · 문제 · 입력 · AI 역할 · 결과 · 검증 기준을 연결해 봅시다.<small>把用户、问题、输入、AI作用、结果与验证标准连接起来。</small></span></div></div>,
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
