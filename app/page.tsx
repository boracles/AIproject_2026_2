"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Bot, Camera, ChevronRight, ClipboardList,
  Code2, FileStack, Glasses, Image as ImageIcon, MessageSquare,
  MonitorUp, Presentation, Ruler, ScanLine, Target, TestTube2, Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  index: string; eyebrow: string; chineseEyebrow: string;
  title: string; chineseTitle: string; note: React.ReactNode; chineseNote: string; content: React.ReactNode;
};

function SpeakerNote({
  lead,
  points,
  transition,
  sources = [],
}: {
  lead: string;
  points: string[];
  transition?: string;
  sources?: { label: string; href: string }[];
}) {
  return (
    <div className="speaker-note-copy">
      <p className="speaker-note-lead">{lead}</p>
      <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
      {transition && <p className="speaker-note-transition"><strong>다음 장 연결</strong>{transition}</p>}
      {sources.length > 0 && (
        <div className="speaker-note-sources">
          <strong>[Sources]</strong>
          {sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>)}
        </div>
      )}
    </div>
  );
}

const slides: Slide[] = [
  {
    index: "01", eyebrow: "1주차 · 수업 안내와 프로젝트 소개", chineseEyebrow: "第1周 · 课程说明与项目介绍",
    title: "실증적AI개발프로젝트Ⅱ\n(종합설계)", chineseTitle: "实证人工智能开发项目Ⅱ（综合设计）",
    note: <SpeakerNote lead="안녕하세요. 이번 학기 실증적AI개발프로젝트Ⅱ를 맡은 윤보라입니다." points={["오늘은 수업 운영 방식과 한 학기 프로젝트 흐름을 먼저 설명합니다.", "그다음 각자 자기소개를 하고, 팀별로 프로젝트Ⅰ에서 만든 결과물을 공유하겠습니다.", "첫 시간에는 새 아이디어를 정하기보다 각 팀이 어디에서 출발하는지 함께 확인하겠습니다."]} transition="먼저 이 수업에서 한 학기 동안 무엇을 하는지부터 보겠습니다." />,
    chineseNote: "第一节课先了解课程如何进行，再轻松分享各自在项目Ⅰ中已经完成到什么程度。",
    content: <div className="cover-content"><div className="cover-statement"><span>THU 12:00–15:00 · S06-602</span><strong>1주차 · 수업 안내와 프로젝트 소개</strong><p>第1周 · 课程说明与项目介绍</p></div><div className="course-card"><span>2026. 09. 03</span><strong>WEEK 01</strong><p>동아대학교 AI학과 · 东亚大学人工智能系<br />윤보라 · 尹보라</p></div></div>,
  },
  {
    index: "02", eyebrow: "교과목 개요", chineseEyebrow: "课程概要",
    title: "AI 시스템을 완성하고,\n현장 실증으로 효과와 한계를 검증합니다", chineseTitle: "完成AI系统，并通过现场实证验证效果与局限",
    note: <SpeakerNote lead="이 교과목은 프로젝트Ⅰ의 결과를 이어 AI 시스템을 고도화하고, 그 성능과 사용자 효과를 현장에서 검증하는 종합설계 수업입니다." points={["프로젝트Ⅰ에서 만든 결과물을 바탕으로 사용자 문제를 해결하는 AI 서비스 또는 시스템을 완성합니다.", "데이터, 모델, 서비스 화면, 로그가 연결되도록 전체 시스템을 구성합니다.", "기준선과 비교해 성능, 지연시간, 비용, 안정성, 오류를 측정하고 대상 사용자를 통해 효과와 한계를 확인합니다.", "학기 말에는 AI 데모 서비스, 실증 결과, 재현 가능한 코드·모델·문서를 함께 제시합니다."]} transition="그럼 먼저 각 팀이 프로젝트Ⅰ에서 어디까지 만들었는지 공유해 보겠습니다." />,
    chineseNote: "本课程在项目Ⅰ成果的基础上完善AI系统，并通过性能测量与目标用户测试验证其效果与局限。",
    content: <div className="course-grid"><article><span>01 · 만들 프로젝트</span><h3>AI 서비스 또는 시스템</h3><p>프로젝트Ⅰ 결과를 고도화해 사용자 문제를 해결하는 서비스나 시스템을 완성합니다.</p><small>制作项目<br />继续优化项目Ⅰ成果，完成解决用户问题的AI服务或系统。</small></article><article><span>02 · AI 기술 적용</span><h3>데이터부터 서비스까지 연결</h3><p>데이터·모델·서비스 화면·로그를 연결해 하나의 사용 흐름으로 구성합니다.</p><small>应用AI技术<br />连接数据、模型、服务界面与日志，构成完整的使用流程。</small></article><article><span>03 · 실증할 내용</span><h3>성능과 사용자 효과</h3><p>성능·지연시간·비용·안정성·오류와 사용자에게 미치는 효과·한계를 검증합니다.</p><small>实证内容<br />验证性能、延迟、成本、稳定性、错误以及对用户的效果与局限。</small></article><article className="assessment"><span>04 · 학기 말 결과물</span><h3>데모 + 실증 + 재현</h3><p>AI 데모 서비스와 실증 결과를 제시하고, 코드·모델·문서를 재현 가능한 형태로 정리합니다.</p><small>学期成果<br />AI演示服务 + 实证结果 + 可复现的代码、模型与文档</small></article></div>,
  },
  {
    index: "03", eyebrow: "자기소개와 프로젝트 공유", chineseEyebrow: "自我介绍与项目分享",
    title: "프로젝트Ⅰ 수강 여부와\n이번 학기 출발점을 공유합니다", chineseTitle: "根据是否修读过项目Ⅰ，分享本学期的起点",
    note: <SpeakerNote lead="Before we begin the introductions, did you take Project I last semester? Please raise your hand if you did." points={["If you took Project I, please introduce yourself and briefly explain the project you worked on.", "Tell us what problem the project addressed, which AI function you developed, and what role you played.", "Then explain what you would like to improve or develop further in this course.", "If this is your first time taking the course, please introduce yourself and tell us what kind of product or service you would like to develop using AI, including the problem you want to solve and the intended users."]} transition="Let’s begin with the students who took Project I last semester." />,
    chineseNote: "先确认是否修读过项目Ⅰ。修读过的学生介绍上学期的项目与本学期的发展方向；首次修读的学生介绍希望使用AI开发的产品或服务。",
    content: <div className="intro-layout"><section><Presentation /><span>01 · 프로젝트Ⅰ 수강자<small>修读过项目Ⅰ的学生</small></span><h3>지난 프로젝트와 발전 방향</h3><ul><li>이름과 지난 학기 맡은 역할</li><li>진행한 프로젝트와 핵심 AI 기능</li><li>이번 학기에 더 발전시킬 부분</li></ul><p>姓名与上学期的角色 · 项目与核心AI功能 · 本学期的发展方向</p></section><section><Bot /><span>02 · 처음 수강하는 학생<small>首次修读的学生</small></span><h3>AI로 개발하고 싶은 프로덕트</h3><ul><li>이름과 관심 있는 AI 분야</li><li>개발하고 싶은 프로덕트나 서비스</li><li>해결하고 싶은 문제와 대상 사용자</li></ul><p>姓名与感兴趣的AI领域 · 想开发的产品或服务 · 问题与目标用户</p></section></div>,
  },
  {
    index: "04", eyebrow: "이번 학기 프로젝트", chineseEyebrow: "本学期项目",
    title: "프로젝트Ⅰ 결과물을\n이번 학기에 고도화합니다", chineseTitle: "本学期继续优化项目Ⅰ的成果",
    note: <SpeakerNote lead="이번 학기에는 프로젝트Ⅰ 결과물을 이어 AI 기능과 서비스 전체를 고도화합니다." points={["먼저 지난 학기 결과물에서 구현된 부분과 아직 구현되지 않은 부분을 나눠 정리합니다.", "사용자에게 필요한 AI 기능을 골라 모델이나 API를 서비스 화면과 연결합니다.", "QA에서는 기능 오류, 예외 상황, AI 응답 품질, 속도와 연결 상태를 점검합니다.", "사용자 테스트에서는 대상 사용자가 과업을 수행하도록 하고, 사용성 문제와 기대한 효과를 확인합니다.", "학기 말에는 AI 데모 서비스와 함께 QA 기록과 사용자 테스트 결과를 제시합니다."]} transition="이제 문제와 AI 기능을 서비스로 연결한 프로젝트 사례를 살펴보겠습니다." />,
    chineseNote: "先检查项目Ⅰ成果并补充所需功能，再分别进行QA质量检查与用户测试，持续完善项目。",
    content: <div className="purpose-layout"><div className="purpose-cards">{[["01", "현재 상태 점검", "检查当前状态", "프로젝트Ⅰ에서 만든 것과 아직 안 된 것을 먼저 정리합니다.", "先梳理项目Ⅰ中已经完成和尚未完成的部分。"], ["02", "필요한 기능 추가", "补充所需功能", "AI 모델이나 API를 서비스 화면과 기능에 연결합니다.", "把AI模型或API接入界面与功能。"], ["03", "QA", "质量保证", "기능 오류, 예외 상황, AI 응답 품질, 속도와 연결 상태를 점검합니다.", "检查功能错误、异常情况、AI回答质量、速度与连接状态。"], ["04", "사용자 테스트", "用户测试", "대상 사용자의 과업 수행을 관찰해 사용성 문제와 기대한 효과를 확인합니다.", "观察目标用户完成任务，确认可用性问题与预期效果。"]].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></article>)}</div><div className="purpose-result"><span>학기 말 결과물 · 学期成果</span><strong>AI 데모 서비스 + QA 기록 + 사용자 테스트 결과<small>AI演示服务 + QA记录 + 用户测试结果</small></strong></div></div>,
  },
  {
    index: "05", eyebrow: "AI 프로젝트 사례 1 · NotebookLM", chineseEyebrow: "AI项目案例1 · NotebookLM",
    title: "내 자료를 읽고 질문에 답하며\n출처까지 보여 주는 AI 서비스", chineseTitle: "读取用户资料、回答问题并显示出处的AI服务",
    note: <SpeakerNote lead="NotebookLM은 사용자가 넣은 PDF, 문서, 웹 링크를 AI가 읽고, 그 자료에 관한 질문에 답해 주는 Google의 학습·조사 서비스입니다." points={["먼저 분석할 자료를 직접 넣습니다.", "자료에 관해 질문하면 AI가 관련 내용을 찾아 답합니다.", "답변에 연결된 출처를 누르면 근거가 된 원문 위치를 확인할 수 있습니다.", "업로드한 자료를 요약문, FAQ, 학습 가이드, 대화형 오디오로 바꿔 볼 수도 있습니다."]} transition="다음 장에서 질문, 요약, 오디오 기능을 사용자가 어떻게 이용하는지 보겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "NotebookLM是Google的学习与研究服务。AI读取用户上传的PDF、文档或网页链接，根据这些资料回答问题，并显示原文出处。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/notebooklm.png" alt="NotebookLM 공식 소개 이미지" /><figcaption>Google 공식 소개 이미지 · Google官方介绍图片</figcaption></figure><div className="feature-list"><article><FileStack /><div><span>분석할 자료를 넣습니다</span><p>PDF, 문서, 웹 링크를 업로드합니다.<small>上传PDF、文档或网页链接。</small></p></div></article><article><MessageSquare /><div><span>자료에 관해 질문합니다</span><p>AI가 업로드한 자료에서 관련 내용을 찾아 답합니다.<small>AI从上传的资料中查找相关内容并回答。</small></p></div></article><article><ClipboardList /><div><span>답변의 근거를 확인합니다</span><p>출처를 눌러 답변이 나온 원문 위치를 확인합니다.<small>点击出处，查看答案所依据的原文位置。</small></p></div></article><a href="https://blog.google/innovation-and-ai/products/developing-notebooklm/" target="_blank" rel="noreferrer">Google 공식 소개 · Google官方介绍 ↗</a></div></div>,
  },
  {
    index: "06", eyebrow: "NotebookLM · 주요 기능", chineseEyebrow: "NotebookLM · 主要功能",
    title: "긴 자료를 전부 읽지 않아도\n묻고, 요약해서 보고, 오디오로 듣습니다", chineseTitle: "无需通读长资料，也可以提问、阅读摘要或收听音频",
    note: <SpeakerNote lead="NotebookLM에 자료를 넣으면 필요한 내용은 질문으로 찾고, 전체 내용은 요약해서 읽거나 오디오로 들을 수 있습니다." points={["질문을 입력하면 업로드한 자료에서 관련 내용을 찾아 답하고 출처를 표시합니다.", "긴 자료는 요약문, FAQ, 학습 가이드 형태로 정리해 읽을 수 있습니다.", "오디오 개요를 만들면 자료 내용을 두 진행자의 대화처럼 들을 수 있습니다.", "NotebookLM은 사용자가 선택한 자료를 바탕으로 답하고, 참고한 원문을 표시합니다."]} transition="두 번째 사례에서는 AI 모델을 모바일 서비스 흐름에 연결한 방식을 보겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "上传资料后，可以通过提问寻找所需内容，把长资料整理成摘要，也可以转换为对话式音频。",
    content: <div className="feature-gallery feature-gallery-two"><figure><img src="/cases/notebooklm-ui.webp" alt="NotebookLM 초기 화면에서 자료와 질문을 함께 보는 모습" /><figcaption><strong>질문하면 근거와 함께 답변</strong><span>업로드한 자료에서 답을 찾고 참고한 원문을 표시합니다.<small>从上传的资料中寻找答案，并显示参考原文。</small></span></figcaption></figure><figure><img src="/cases/notebooklm-audio.webp" alt="NotebookLM Audio Overview 시연 화면" /><figcaption><strong>자료를 대화형 오디오로 변환</strong><span>자료 내용을 두 진행자의 대화처럼 들려줍니다.<small>把资料内容转换为两位主持人的对话式音频。</small></span></figcaption></figure><div className="gallery-takeaway">NotebookLM은 사용자가 선택한 자료를 바탕으로 답하고 참고한 원문을 표시합니다.<small>NotebookLM根据用户选择的资料回答，并显示参考原文。</small></div></div>,
  },
  {
    index: "07", eyebrow: "AI 프로젝트 사례 2 · Master Gesture", chineseEyebrow: "AI项目案例2 · Master Gesture",
    title: "수어 사용자와 수어를 모르는 사람이\n대화할 수 있도록 돕습니다", chineseTitle: "帮助手语使用者与不懂手语的人交流",
    note: <SpeakerNote lead="두 번째 사례인 Master Gesture는 수어 사용자와 수어를 모르는 사람 사이의 의사소통을 돕기 위해 만든 모바일 프로젝트입니다." points={["스마트폰 카메라로 사용자의 손동작을 실시간으로 받습니다.", "YOLO 모델로 손동작을 분류하고, 학습한 모델을 ONNX 형식으로 변환해 모바일 앱에 연결했습니다.", "인식 결과는 상대방이 읽을 수 있도록 텍스트로 표시합니다.", "AI 모델의 정확도만 보여 주지 않고 카메라 입력부터 결과 확인까지 하나의 대화 흐름으로 구성했습니다."]} transition="다음 장에서는 수어 인식 외에 양방향 대화를 위해 어떤 기능을 구현했는지 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture通过摄像头获取手部动作，用YOLO模型识别，再把ONNX模型接入移动应用并显示文字结果。",
    content: <div className="case-overview"><figure><img src="/cases/master-gesture.jpg" alt="Master Gesture가 카메라로 수어를 인식하는 테스트 화면" /><figcaption>프로젝트 테스트 화면 · 项目测试界面</figcaption></figure><div className="feature-list feature-sequence"><article><Camera /><div><span>카메라 입력</span><p>사용자의 손동작을 실시간으로 받습니다.<small>实时获取用户的手部动作。</small></p></div></article><article><ScanLine /><div><span>동작 인식</span><p>YOLO로 손동작을 분류합니다.<small>使用YOLO识别并分类手部动作。</small></p></div></article><article><Type /><div><span>텍스트 출력</span><p>인식한 수어를 문장으로 보여 줍니다.<small>把识别出的手语显示为文字。</small></p></div></article><a href="https://devpost.com/software/tomjerry" target="_blank" rel="noreferrer">Devpost 프로젝트 페이지 · Devpost项目页面 ↗</a></div></div>,
  },
  {
    index: "08", eyebrow: "Master Gesture · 주요 기능", chineseEyebrow: "Master Gesture · 主要功能",
    title: "수어 인식부터\n텍스트 변환과 수어 사전까지 구현했습니다", chineseTitle: "实现了手语识别、文字转换与手语词典",
    note: <SpeakerNote lead="이 프로젝트는 수어 인식에 그치지 않고 양방향 대화에 필요한 기능을 함께 구성했습니다." points={["첫 화면은 카메라로 손동작을 읽어 문장으로 보여 줍니다.", "두 번째 화면은 입력한 텍스트를 수어 손모양으로 바꿔 반대 방향의 의사소통도 돕습니다.", "세 번째 화면은 알파벳별 손모양을 찾아볼 수 있는 수어 사전입니다.", "사용자가 대화 전후에 무엇을 필요로 하는지 살펴 세 기능을 하나의 흐름으로 연결했습니다."]} transition="세 번째 사례에서는 하나의 접근성 문제를 앱과 API, 기기 연동으로 확장한 과정을 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture不仅支持摄像头翻译，还能把输入文字显示为手语动作，并提供按字母查找的手语词典。",
    content: <div className="feature-gallery feature-gallery-three phone-gallery"><figure><img src="/cases/master-camera.png" alt="Master Gesture 수어 인식 화면" /><figcaption><strong>수어 인식</strong><span>손동작을 인식해 문장으로 표시<small>识别手部动作并显示为句子</small></span></figcaption></figure><figure><img src="/cases/master-text.png" alt="Master Gesture 텍스트를 수어로 바꾸는 화면" /><figcaption><strong>텍스트 → 수어</strong><span>입력한 단어를 손모양으로 표시<small>把输入的单词显示为手语动作</small></span></figcaption></figure><figure><img src="/cases/master-signbook.png" alt="Master Gesture 수어 사전 화면" /><figcaption><strong>수어 사전</strong><span>알파벳별 손모양을 탐색<small>按字母查找手语动作</small></span></figcaption></figure></div>,
  },
  {
    index: "09", eyebrow: "AI 프로젝트 사례 3 · FROM YOUR EYES", chineseEyebrow: "AI项目案例3 · FROM YOUR EYES",
    title: "시각장애인이 사진과 영상을 이해하도록\nAI가 내용을 설명합니다", chineseTitle: "AI为视障用户说明照片与视频内容",
    note: <SpeakerNote lead="FROM YOUR EYES는 시각장애인이 다른 사람의 도움 없이 사진과 영상의 내용을 이해하도록 돕기 위해 만든 서비스입니다." points={["사용자가 사진이나 영상을 입력하면 AI가 화면 속 대상과 상황을 문장으로 설명합니다.", "설명의 길이와 방식은 사용자의 필요에 맞게 조정할 수 있습니다.", "모바일 앱 안에서만 쓰는 기능으로 두지 않고, 다른 서비스가 사용할 수 있는 API로도 확장했습니다.", "시각 정보 접근이라는 문제를 중심에 두고 앱, API, 스마트 기기까지 같은 기능을 확장했습니다."]} transition="다음 장에서 서비스가 어떤 형태로 확장됐고 어떤 결과를 얻었는지 보겠습니다." sources={[{ label: "Microsoft — 2024 Imagine Cup World Champion", href: "https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" }]} />,
    chineseNote: "FROM YOUR EYES旨在帮助视障用户无需他人协助也能理解照片与视频内容，并扩展到移动应用、API和智能设备。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/from-your-eyes.webp" alt="FROM YOUR EYES 앱 화면" /><figcaption>서비스 화면 · 服务界面</figcaption></figure><div className="feature-list"><article><Target /><div><span>만든 이유</span><p>시각장애인이 사진·영상 속 정보에 스스로 접근하도록 돕습니다.<small>帮助视障用户自主获取照片和视频中的信息。</small></p></div></article><article><ImageIcon /><div><span>사진·영상 설명</span><p>화면 속 대상과 상황을 문장으로 설명합니다.<small>用文字说明画面中的对象与情境。</small></p></div></article><article><Code2 /><div><span>앱과 API</span><p>다른 서비스에서도 설명 기능을 사용할 수 있습니다.<small>其他服务也可以接入视觉说明功能。</small></p></div></article><a href="https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" target="_blank" rel="noreferrer">Microsoft 공식 소개 · Microsoft官方介绍 ↗</a></div></div>,
  },
  {
    index: "10", eyebrow: "FROM YOUR EYES · 기능과 결과", chineseEyebrow: "FROM YOUR EYES · 功能与成果",
    title: "사용자 문제에서 시작해\n앱과 API로 확장했습니다", chineseTitle: "从用户问题出发，扩展为应用与API",
    note: <SpeakerNote lead="FROM YOUR EYES는 사진·영상 설명 기능을 앱과 API, 스마트 기기 연동으로 확장했고 2024 Imagine Cup 세계 우승을 차지했습니다." points={["스마트 글래스나 워치에서도 주변 상황 설명을 들을 수 있도록 사용 환경을 넓혔습니다.", "외부 서비스가 시각 설명 기능을 사용할 수 있도록 API도 제공했습니다.", "수상 자체보다 중요한 점은 처음 정한 사용자 문제를 유지하면서 서비스의 사용 범위를 확장했다는 것입니다.", "우리 프로젝트도 현재 기능을 다른 화면이나 상황에서 쓸 수 있는지 생각해 볼 수 있습니다."]} transition="세 사례를 본 뒤, 이 수업에서 말하는 실증이 무엇인지 정리하겠습니다." sources={[{ label: "Microsoft — 2024 Imagine Cup World Champion", href: "https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" }]} />,
    chineseNote: "项目扩展到照片、视频和文档说明、定制AI助手、外部服务API以及智能眼镜和手表，并获得2024 Imagine Cup世界冠军。",
    content: <div className="impact-layout"><div className="impact-images"><figure><img src="/cases/from-your-eyes-team.png" alt="2024 Imagine Cup 우승팀 FROM YOUR EYES" /><figcaption>2024 World Champion · 2024世界冠军</figcaption></figure><figure><img src="/cases/from-your-eyes-award.png" alt="2024 Imagine Cup World Championship 트로피" /><figcaption>Microsoft Imagine Cup</figcaption></figure></div><div className="impact-points"><article><Glasses /><div><strong>스마트 기기 연동</strong><p>글래스와 워치에서도 주변 상황 설명을 들을 수 있습니다.<small>也可通过智能眼镜和手表获取环境说明。</small></p></div></article><article><Code2 /><div><strong>외부 서비스용 API</strong><p>다른 앱에도 시각 설명 기능을 연결합니다.<small>把视觉说明功能接入其他应用。</small></p></div></article><div className="impact-result"><span>프로젝트 결과 · 项目成果</span><strong>2024 Imagine Cup 세계 우승<small>2024 Imagine Cup 世界冠军</small></strong></div></div></div>,
  },
  {
    index: "11", eyebrow: "이 수업에서 말하는 실증", chineseEyebrow: "本课程所说的实证",
    title: "가설을 세우고,\nQA와 사용자 테스트의 근거로 검증합니다", chineseTitle: "提出假设，并以QA与用户测试证据进行验证",
    note: <SpeakerNote lead="이 수업의 실증은 가설을 세운 뒤 QA, 성능 측정, 사용자 테스트에서 얻은 근거로 그 가설을 검증하는 과정입니다." points={["먼저 AI 기능이 누구의 어떤 문제를 어떻게 줄일 것인지 가설을 세웁니다.", "그 가설을 검증하려면 QA, 성능 측정, 사용자 테스트 중 어떤 방법과 데이터가 필요한지 설계합니다.", "QA에서는 오류와 예외 상황, 응답 품질과 속도를 기록하고, 사용자 테스트에서는 과업 성공 여부, 걸린 시간, 행동과 의견을 수집합니다.", "수집한 근거가 가설을 지지하는지 판단하고, 결과에 따라 기능을 유지하거나 수정하거나 제외합니다."]} transition="이 검증 과정을 학기 일정 안에서 어떻게 진행하는지 살펴보겠습니다." />,
    chineseNote: "先提出假设，再设计验证方法，通过QA、性能测量与用户测试收集证据，判断证据是否支持假设。",
    content: <div className="evidence-layout evidence-layout-clear"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow evidence-flow-clear">{[[Target, "가설", "假设", "AI 기능이 누구의 어떤 문제를 줄일지 적습니다.", "说明AI功能将减少谁的什么问题。"], [Ruler, "검증 설계", "验证设计", "가설에 맞는 QA·성능 측정·사용자 테스트를 정합니다.", "根据假设确定QA、性能测量与用户测试。"], [TestTube2, "근거 수집", "收集证据", "오류·성능·과업 결과·사용자 의견을 기록합니다.", "记录错误、性能、任务结果与用户意见。"], [ChevronRight, "가설 판단", "判断假设", "근거가 가설을 지지하는지 판단하고 기능을 수정합니다.", "判断证据是否支持假设，并修改功能。"]].map(([Icon, item, chinese, detail, chineseDetail], i) => { const StepIcon = Icon as typeof Target; return <div key={item as string}><span><StepIcon /></span><p>{item as string}<small>{chinese as string}</small></p><em>{detail as string}<small>{chineseDetail as string}</small></em>{i < 3 && <ChevronRight className="flow-arrow" />}</div>; })}</div></div>,
  },
  {
    index: "12", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "1~5주: 문제와 가설을 정하고\nAI 기능 구현을 시작합니다", chineseTitle: "第1~5周：明确问题与假设，开始实现AI功能",
    note: <SpeakerNote lead="1주차부터 5주차까지는 프로젝트의 출발점을 정리하고, 이번 학기에 검증할 가설과 AI 기능을 구체화합니다." points={["1주차에는 수업 운영과 평가 방식을 확인하고, 프로젝트Ⅰ 수강 여부와 각자의 프로젝트 경험 또는 개발 아이디어를 공유합니다. 과제는 팀과 개인 역할을 정리하는 것입니다.", "2주차에는 팀별로 프로젝트Ⅰ 결과물, 해결하려는 문제, 대상 사용자, 구현 상태를 시연합니다. 과제는 프로젝트 현황 1페이지와 저장소·데모 링크 제출입니다.", "3주차에는 사용자 문제를 근거로 검증 가능한 가설을 세우고 필요한 데이터와 검증 방법을 정합니다. 과제는 가설·근거·검증 방법을 담은 검증 계획서 1차본입니다.", "4주차에는 기존 모델이나 API의 기준 성능을 측정하고 이번 학기 구현 범위를 확정합니다. 과제는 기준선 결과표와 MVP 기능 명세입니다.", "5주차에는 가장 중요한 AI 기능을 구현하고 입력·출력·예외 상황을 확인합니다. 과제는 동작 화면, 코드 커밋, 남은 이슈를 포함한 개발 체크포인트입니다."]} transition="6주차부터는 AI 기능을 서비스에 연결하고 중간 발표와 QA를 준비합니다." />,
    chineseNote: "第1~5周整理项目现状，提出可验证的假设，确定MVP范围并开始实现AI功能。",
    content: <div className="week-plan">{[["01", "OT·팀 출발점 확인", "课程说明·确认团队起点", "팀 구성·개인 역할 정리", "整理团队与个人角色"], ["02", "프로젝트 현황 발표", "汇报项目现状", "현황 1쪽 + 저장소·데모 링크", "现状1页 + 代码库·演示链接"], ["03", "문제 근거·가설·검증 설계", "问题依据·假设·验证设计", "검증 계획서 1차본", "验证计划书初稿"], ["04", "기준선 측정·MVP 확정", "测量基线·确定MVP", "기준선 결과표 + 기능 명세", "基线结果表 + 功能说明"], ["05", "AI 기능 구현 1", "实现AI功能 1", "동작 화면 + 코드 + 이슈 목록", "运行画面 + 代码 + 问题清单"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "13", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "6~10주: 서비스로 연결하고\n중간 발표와 QA를 진행합니다", chineseTitle: "第6~10周：连接服务，进行期中汇报与QA",
    note: <SpeakerNote lead="6주차부터 10주차까지는 AI 기능을 서비스의 사용 흐름에 연결하고, 중간 발표 뒤 두 단계의 QA를 진행합니다." points={["6주차에는 데이터 또는 사용자 입력이 AI 기능을 거쳐 화면의 결과로 이어지는 전체 흐름을 연결합니다. 과제는 처음부터 끝까지 동작하는 화면 녹화와 실행 방법입니다.", "7주차에는 중간 발표 전 점검을 진행하고 정상·오류·경계 상황을 포함한 QA 시나리오를 작성합니다. 과제는 테스트 케이스와 발견한 버그 목록입니다.", "8주차 중간 발표에서는 문제, 가설, 구현 범위, AI 기능, 현재 데모를 시연합니다. 과제는 발표 자료, 데모 링크, 받은 피드백과 수정 계획입니다.", "9주차에는 기능 QA를 진행해 화면, 입력, API 연결, 저장, 예외 처리의 오류를 재현하고 수정합니다. 과제는 테스트 결과와 수정 전후 상태가 담긴 QA 기록 1차본입니다.", "10주차에는 AI 품질과 성능 QA를 진행해 정확도 또는 응답 품질, 지연시간, 실패율, 비용을 점검합니다. 과제는 평가 데이터셋, 측정 결과표, 남은 위험 목록입니다."]} transition="11주차부터는 대상 사용자를 모집해 가설을 사용자 테스트로 검증합니다." />,
    chineseNote: "第6~10周把AI功能接入完整服务流程，完成期中演示，并分别进行功能QA与AI质量、性能QA。",
    content: <div className="week-plan">{[["06", "AI 기능·화면 통합", "整合AI功能与界面", "전체 흐름 영상 + 실행 방법", "完整流程视频 + 运行方法"], ["07", "중간 점검·QA 설계", "期中检查·QA设计", "테스트 케이스 + 버그 목록", "测试用例 + 缺陷清单"], ["08", "중간 발표·데모", "期中汇报·演示", "발표 자료 + 피드백·수정 계획", "汇报资料 + 反馈·修改计划"], ["09", "기능 QA", "功能QA", "QA 기록 1차본", "QA记录初稿"], ["10", "AI 품질·성능 QA", "AI质量·性能QA", "평가 데이터 + 측정 결과표", "评估数据 + 测量结果表"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "14", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "11~15주: 사용자 테스트로 검증하고\n최종 결과물을 완성합니다", chineseTitle: "第11~15周：通过用户测试验证并完成最终成果",
    note: <SpeakerNote lead="11주차부터 15주차까지는 대상 사용자의 행동과 결과를 근거로 가설을 검증하고 최종 서비스를 완성합니다." points={["11주차에는 가설에 맞는 참여자, 과업, 질문, 기록 항목을 정하고 대상 사용자를 모집합니다. 과제는 사용자 테스트 계획서, 진행 대본, 과업지, 참여자 모집 현황입니다.", "12주차에는 1차 사용자 테스트를 진행합니다. 진행자는 설명으로 도와주지 않고 사용자의 성공 여부, 시간, 오류, 멈춘 지점, 발화를 기록합니다. 과제는 익명화한 원자료와 관찰 기록입니다.", "13주차에는 추가 테스트를 진행하고 결과를 분석합니다. QA 결과와 사용자 테스트 데이터를 함께 보며 가설의 지지 여부와 수정 우선순위를 정합니다. 과제는 발견점, 근거, 개선 항목을 정리한 검증 결과표입니다.", "14주차에는 우선순위가 높은 문제를 수정하고 최종 후보 버전을 통합합니다. 과제는 수정 전후 비교, 최종 데모 링크, 보고서 초안입니다.", "15주차에는 문제와 가설, 구현, QA, 사용자 테스트, 근거에 따른 수정 결과를 시연합니다. 최종 과제는 서비스, 코드·모델·실행 문서, QA 기록, 사용자 테스트 결과, 최종 발표 자료, 개인 기여 기록입니다."]} transition="이제 각 결과물이 성적에 어떻게 반영되는지 설명하겠습니다." />,
    chineseNote: "第11~15周设计并实施用户测试，结合QA与用户数据判断假设，修改服务并完成最终演示。",
    content: <div className="week-plan">{[["11", "사용자 테스트 설계·모집", "用户测试设计·招募", "계획서 + 대본 + 과업지", "计划书 + 主持稿 + 任务单"], ["12", "사용자 테스트 1차", "用户测试第1轮", "익명 원자료 + 관찰 기록", "匿名原始数据 + 观察记录"], ["13", "추가 테스트·결과 분석", "追加测试·结果分析", "가설 검증표 + 개선 우선순위", "假设验证表 + 改进优先级"], ["14", "수정·최종 통합", "修改·最终整合", "수정 전후 비교 + 보고서 초안", "修改前后对比 + 报告初稿"], ["15", "최종 발표·시연", "期末汇报·演示", "서비스·문서·검증 결과 일체", "服务·文档·验证结果全套"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "15", eyebrow: "평가 방법", chineseEyebrow: "评价方式",
    title: "결과물뿐 아니라 개발 과정과\n가설을 검증한 근거를 함께 평가합니다", chineseTitle: "不仅评价成果，也评价开发过程与验证假设的证据",
    note: <SpeakerNote lead="평가는 팀 결과물과 개인의 참여·기여를 함께 봅니다. 아래 비율은 이번 학기 평가안이며, 각 항목은 제출된 자료를 근거로 평가합니다." points={["출석과 수업 참여 10%는 출결, 팀 활동 참여, 피드백 반영 태도를 봅니다.", "주차별 과제와 개발 기록 20%는 기한 내 제출 여부뿐 아니라 코드 커밋, 회의·실험 기록, 맡은 역할의 수행 내용을 봅니다.", "중간 발표와 데모 20%는 문제와 가설의 명확성, 구현 진척도, 데모 완성도, 피드백 이후 수정 계획을 평가합니다.", "QA와 사용자 검증 20%는 테스트 설계의 타당성, 원자료와 기록의 충실성, 근거에 따른 가설 판단과 수정 내용을 평가합니다.", "최종 결과물과 발표 30%는 AI 기능과 서비스의 완성도, 재현 가능성, 최종 시연, 문서 품질을 평가합니다.", "팀 점수만으로 평가하지 않습니다. 개인 역할 기록, 코드·문서 기여, 발표와 동료평가를 함께 확인해 개인 점수에 반영합니다."]} transition="마지막으로 다음 주에 제출하고 발표할 내용을 확인하겠습니다." />,
    chineseNote: "评价包括出勤参与10%、每周作业与开发记录20%、期中汇报20%、QA与用户验证20%、最终成果与汇报30%，并结合个人贡献调整。",
    content: <div className="grading-layout"><div className="grading-cards">{[["10%", "출석·수업 참여", "出勤·课堂参与"], ["20%", "주차별 과제·개발 기록", "每周作业·开发记录"], ["20%", "중간 발표·데모", "期中汇报·演示"], ["20%", "QA·사용자 검증", "QA·用户验证"], ["30%", "최종 결과물·발표", "最终成果·汇报"]].map(([weight, item, chinese]) => <article key={item}><strong>{weight}</strong><span>{item}<small>{chinese}</small></span></article>)}</div><div className="grading-rule"><span>개인 점수 반영 · 个人成绩</span><strong>역할 기록 + 코드·문서 기여 + 발표 + 동료평가</strong><small>角色记录 + 代码与文档贡献 + 汇报 + 同伴评价</small></div></div>,
  },
  {
    index: "16", eyebrow: "다음 주 준비", chineseEyebrow: "下周准备",
    title: "다음 주에는\n본인 팀의 프로젝트를 소개합니다", chineseTitle: "下周介绍自己团队的项目",
    note: <SpeakerNote lead="다음 수업에서는 각 팀이 현재 프로젝트 상태를 5분 안에 소개하고, 이어서 3분 동안 질문과 피드백을 받습니다." points={["첫째, 팀명과 팀원별 역할을 소개합니다.", "둘째, 프로젝트 이름, 해결하려는 문제, 그 문제가 있다는 근거, 대상 사용자를 구분해 설명합니다.", "셋째, 프로젝트Ⅰ에서 구현한 기능을 화면이나 데모로 보여 주고, 현재 작동하는 부분과 작동하지 않는 부분을 구분합니다.", "넷째, 이번 학기에 구현하거나 고도화할 AI 기능과 검증하려는 가설을 제시합니다.", "발표 전 프로젝트 현황 1페이지, 저장소 링크, 실행 가능한 데모 또는 화면 녹화 링크를 제출합니다.", "Project I을 수강하지 않은 학생은 개발하고 싶은 AI 프로덕트, 해결할 문제와 근거, 대상 사용자, 사용할 수 있는 데이터 또는 AI 기술을 같은 형식으로 준비합니다."]} />,
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
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);
  const slide = slides[current];
  const nextSlide = slides[current + 1];

  if (viewMode === "presenter") {
    return (
      <main className="presenter-shell">
        <header className="presenter-header">
          <div>
            <span>발표자 화면 · WEEK 01</span>
            <h1>실증적AI개발프로젝트Ⅱ(종합설계)</h1>
          </div>
          <Button variant="outline" onClick={() => openDeckWindow("slideshow")}>
            <MonitorUp /> 슬라이드쇼 열기
          </Button>
        </header>
        <div className="presenter-layout">
          <section className="presenter-current">
            <div className="presenter-section-label">
              <span>현재 슬라이드</span>
              <strong>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</strong>
            </div>
            <div className="presenter-stage-wrap"><SlideCanvas slide={slide} position={current} /></div>
          </section>
          <aside className="presenter-sidebar">
            <section className="presenter-next">
              <span>다음 슬라이드</span>
              {nextSlide ? (
                <>
                  <b>{nextSlide.index}</b>
                  <strong>{nextSlide.title.replace("\n", " ")}</strong>
                </>
              ) : <strong>마지막 슬라이드입니다.</strong>}
            </section>
            <section className="presenter-notes">
              <span>발표자 메모</span>
              {slide.note}
            </section>
            <div className="presenter-controls">
              <Button variant="outline" onClick={() => go(current - 1)} disabled={current === 0}><ArrowLeft /> 이전</Button>
              <Button onClick={() => go(current + 1)} disabled={current === slides.length - 1}>다음 <ArrowRight /></Button>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="audience-shell" aria-label="학생용 슬라이드쇼 화면">
      <SlideCanvas slide={slide} position={current} />
      <nav className="audience-controls" aria-label="슬라이드 이동">
        <Button variant="outline" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전 슬라이드"><ArrowLeft /> 이전</Button>
        <span>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <Button onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="다음 슬라이드">다음 <ArrowRight /></Button>
      </nav>
    </main>
  );
}
