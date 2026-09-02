"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Bot, Camera, ChevronRight, ClipboardList,
  Code2, FileStack, Glasses, Headphones, Image as ImageIcon, MessageSquare,
  MonitorUp, Presentation, Ruler, ScanLine, Target, TestTube2, Type, UserRound,
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
    index: "03", eyebrow: "오늘 첫 순서", chineseEyebrow: "今天的第一项",
    title: "서로 소개하고,\n프로젝트Ⅰ 결과물을 공유합니다", chineseTitle: "互相介绍，并分享项目Ⅰ的成果",
    note: <SpeakerNote lead="지금부터 한 명씩 본인과 팀을 소개한 뒤, 팀별로 지난 학기 프로젝트를 공유하겠습니다." points={["자기소개에서는 이름과 팀, 지난 학기 맡았던 역할, 관심 있는 AI 분야를 말해 주세요.", "프로젝트 소개에서는 프로젝트 이름, 해결하려던 문제, 대상 사용자, 구현한 기능을 순서대로 설명해 주세요.", "현재 막혀 있는 부분이나 이번 학기에 보완하고 싶은 점도 함께 이야기해 주세요.", "완성된 발표가 아니라 현재 상태를 서로 정확히 파악하는 시간입니다."]} transition="공유한 내용을 바탕으로 이번 학기에 무엇을 고도화할지 정하겠습니다." />,
    chineseNote: "先逐一进行自我介绍，再由各组介绍项目Ⅰ的成果和当前状态。",
    content: <div className="intro-layout"><section><UserRound /><span>01 · 자기소개<small>自我介绍</small></span><h3>본인과 팀을 소개해 주세요</h3><ul><li>이름과 팀</li><li>지난 학기 맡은 역할</li><li>관심 있는 AI 분야</li></ul><p>姓名与团队 · 上学期负责的工作 · 感兴趣的AI领域</p></section><section><Presentation /><span>02 · 프로젝트Ⅰ 소개<small>项目Ⅰ介绍</small></span><h3>지난 학기 프로젝트를 소개해 주세요</h3><ul><li>프로젝트 이름</li><li>해결하려던 문제와 대상 사용자</li><li>구현한 기능과 현재 어려운 점</li></ul><p>项目名称 · 要解决的问题与目标用户 · 已实现的功能与目前的困难</p></section><div className="intro-footer">한 명씩 자기소개 후, 팀별로 프로젝트Ⅰ 결과물을 소개합니다.<small>先逐一自我介绍，再由各组介绍项目Ⅰ的成果。</small></div></div>,
  },
  {
    index: "04", eyebrow: "이번 학기 프로젝트", chineseEyebrow: "本学期项目",
    title: "프로젝트Ⅰ 결과물을\n이번 학기에 고도화합니다", chineseTitle: "本学期继续优化项目Ⅰ的成果",
    note: <SpeakerNote lead="이번 학기에는 새 프로젝트를 시작하지 않고, 프로젝트Ⅰ 결과물을 이어서 고도화합니다." points={["먼저 지난 학기 결과물에서 실제로 작동하는 부분과 아직 구현되지 않은 부분을 나눠 정리합니다.", "그다음 사용자에게 꼭 필요한 기능을 골라 AI 모델이나 API를 서비스 화면에 연결합니다.", "기능을 붙인 뒤에는 대상 사용자가 직접 과업을 수행하도록 하고, 막히는 부분을 찾아 수정합니다.", "학기 말에는 AI 데모 서비스와 사용자 테스트 기록을 함께 보여 주면 됩니다."]} transition="이제 문제와 AI 기능을 서비스로 연결한 실제 프로젝트 사례를 살펴보겠습니다." />,
    chineseNote: "先检查项目Ⅰ成果的当前状态，补充所需功能，再通过用户测试持续优化。",
    content: <div className="purpose-layout"><div className="purpose-cards">{[["01", "현재 상태 점검", "检查当前状态", "프로젝트Ⅰ에서 만든 것과 아직 안 된 것을 먼저 정리합니다.", "先梳理项目Ⅰ中已经完成和尚未完成的部分。"], ["02", "필요한 기능 추가", "补充所需功能", "AI 모델이나 API를 실제 화면과 기능에 연결합니다.", "把AI模型或API接入实际界面与功能。"], ["03", "사용자 테스트와 수정", "用户测试与修改", "대상 사용자가 핵심 기능을 써 보게 하고, 막히는 부분을 고칩니다.", "让目标用户试用核心功能，并修改使用中遇到的问题。"]].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></article>)}</div><div className="purpose-result"><span>학기 말 결과물 · 学期成果</span><strong>AI 데모 서비스 + 사용자 테스트 기록<small>AI演示服务 + 用户测试记录</small></strong></div></div>,
  },
  {
    index: "05", eyebrow: "AI 프로젝트 사례 1 · NotebookLM", chineseEyebrow: "AI项目案例1 · NotebookLM",
    title: "내 자료 안에서 답을 찾는 NotebookLM", chineseTitle: "在自己的资料中寻找答案的NotebookLM",
    note: <SpeakerNote lead="첫 번째 사례는 Google의 NotebookLM입니다. 여기서는 모델 자체보다 자료를 읽는 흐름에 AI를 어떻게 넣었는지 보겠습니다." points={["사용자가 PDF, 문서, 웹 링크처럼 참고할 자료를 직접 선택합니다.", "NotebookLM은 선택된 자료 안에서 질문에 답하고, 답변의 근거가 된 원문 위치를 함께 보여 줍니다.", "같은 자료를 바탕으로 요약, FAQ, 학습 가이드, 오디오 개요도 만들 수 있습니다.", "핵심은 아무 정보나 생성하는 것이 아니라 사용자가 지정한 자료를 기준으로 답하도록 범위를 정한 점입니다."]} transition="다음 장에서 실제 화면을 보면서 질문과 오디오 기능이 어떻게 이어지는지 확인하겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "NotebookLM根据用户选择的资料回答问题，并把答案与原文出处连接起来；也能生成摘要、学习指南和音频概览。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/notebooklm.png" alt="NotebookLM 공식 소개 이미지" /><figcaption>Google 공식 소개 이미지 · Google官方介绍图片</figcaption></figure><div className="feature-list"><article><FileStack /><div><span>자료를 직접 선택</span><p>PDF, 문서, 웹 링크를 한 노트북에 모읍니다.<small>把PDF、文档和网页链接集中到一个笔记本中。</small></p></div></article><article><MessageSquare /><div><span>출처가 붙은 답변</span><p>답의 근거가 된 원문을 바로 확인합니다.<small>可以直接查看答案所依据的原文。</small></p></div></article><article><Headphones /><div><span>학습 자료 생성</span><p>요약, FAQ, 학습 가이드, 오디오 개요를 만듭니다.<small>生成摘要、常见问题、学习指南和音频概览。</small></p></div></article><a href="https://blog.google/innovation-and-ai/products/developing-notebooklm/" target="_blank" rel="noreferrer">Google 공식 소개 · Google官方介绍 ↗</a></div></div>,
  },
  {
    index: "06", eyebrow: "NotebookLM · 주요 기능", chineseEyebrow: "NotebookLM · 主要功能",
    title: "질문·요약·오디오를\n같은 자료에서 만듭니다", chineseTitle: "基于同一组资料生成问答、摘要与音频",
    note: <SpeakerNote lead="왼쪽 화면은 선택한 자료를 읽으며 질문하는 기능이고, 오른쪽은 같은 자료를 대화형 오디오로 바꾸는 기능입니다." points={["왼쪽에서는 원문, 답변, 추천 질문을 한 화면에서 오가며 확인할 수 있습니다.", "답변만 보여 주는 것이 아니라 원문 출처를 함께 보여 줘 사용자가 내용을 검토할 수 있습니다.", "오른쪽 오디오 개요는 같은 자료를 듣는 형태로 바꾼 것입니다. 새로운 정보를 추가하기보다 이용 방식을 확장했습니다.", "우리 프로젝트에서도 사용자가 직접 정하는 입력 자료나 기준이 있는지 생각해 봅시다."]} transition="두 번째 사례에서는 AI 모델을 모바일 서비스 흐름에 연결한 방식을 보겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "第一个界面用于基于资料提问并核对原文，第二个界面则把同一组资料转换为对话式音频。",
    content: <div className="feature-gallery feature-gallery-two"><figure><img src="/cases/notebooklm-ui.webp" alt="NotebookLM 초기 화면에서 자료와 질문을 함께 보는 모습" /><figcaption><strong>자료 기반 질문과 답변</strong><span>답변 옆에서 원문과 추천 질문을 함께 확인합니다.<small>在答案旁同时查看原文和推荐问题。</small></span></figcaption></figure><figure><img src="/cases/notebooklm-audio.webp" alt="NotebookLM Audio Overview 시연 화면" /><figcaption><strong>오디오 개요</strong><span>자료 내용을 두 진행자의 대화처럼 들려줍니다.<small>把资料内容转换为两位主持人的对话式音频。</small></span></figcaption></figure><div className="gallery-takeaway">핵심은 사용자가 선택한 자료를 기준으로 답한다는 점입니다.<small>关键在于：所有回答都以用户选择的资料为依据。</small></div></div>,
  },
  {
    index: "07", eyebrow: "AI 프로젝트 사례 2 · Master Gesture", chineseEyebrow: "AI项目案例2 · Master Gesture",
    title: "카메라로 수어를 읽어\n텍스트로 보여 줍니다", chineseTitle: "通过摄像头识别手语并显示为文字",
    note: <SpeakerNote lead="두 번째 사례인 Master Gesture는 수어를 모르는 사람과의 대화를 돕기 위해 만든 모바일 프로젝트입니다." points={["스마트폰 카메라로 사용자의 손동작을 실시간으로 받습니다.", "YOLO 모델로 손동작을 분류하고, 학습한 모델을 ONNX 형식으로 변환해 모바일 앱에 연결했습니다.", "인식 결과는 사용자가 바로 읽을 수 있도록 텍스트로 표시합니다.", "AI 모델의 정확도만 보여 주지 않고 카메라 입력부터 결과 확인까지 하나의 사용 흐름으로 만든 점을 보세요."]} transition="다음 장에서는 인식 기능 외에 어떤 기능을 함께 구현했는지 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture通过摄像头获取手部动作，用YOLO模型识别，再把ONNX模型接入移动应用并显示文字结果。",
    content: <div className="case-overview"><figure><img src="/cases/master-gesture.jpg" alt="Master Gesture가 카메라로 수어를 인식하는 테스트 화면" /><figcaption>프로젝트 테스트 화면 · 项目测试界面</figcaption></figure><div className="feature-list feature-sequence"><article><Camera /><div><span>카메라 입력</span><p>사용자의 손동작을 실시간으로 받습니다.<small>实时获取用户的手部动作。</small></p></div></article><article><ScanLine /><div><span>동작 인식</span><p>YOLO로 손동작을 분류합니다.<small>使用YOLO识别并分类手部动作。</small></p></div></article><article><Type /><div><span>텍스트 출력</span><p>인식한 수어를 문장으로 보여 줍니다.<small>把识别出的手语显示为文字。</small></p></div></article><a href="https://devpost.com/software/tomjerry" target="_blank" rel="noreferrer">Devpost 프로젝트 페이지 · Devpost项目页面 ↗</a></div></div>,
  },
  {
    index: "08", eyebrow: "Master Gesture · 주요 기능", chineseEyebrow: "Master Gesture · 主要功能",
    title: "카메라 번역부터\n수어 사전까지 구현했습니다", chineseTitle: "实现了摄像头翻译、文字转换与手语词典",
    note: <SpeakerNote lead="이 프로젝트는 카메라 번역 한 가지로 끝내지 않고 실제 대화를 돕는 기능을 함께 구성했습니다." points={["첫 화면은 카메라로 손동작을 읽어 문장으로 보여 줍니다.", "두 번째 화면은 입력한 텍스트를 수어 손모양으로 바꿔 반대 방향의 의사소통도 돕습니다.", "세 번째 화면은 알파벳별 손모양을 찾아볼 수 있는 수어 사전입니다.", "여러 기능을 많이 넣었다는 뜻보다, 사용자가 대화 전후에 무엇을 필요로 하는지 살펴 기능을 연결했다는 점이 중요합니다."]} transition="세 번째 사례에서는 하나의 접근성 문제를 앱과 API, 기기 연동으로 확장한 과정을 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture不仅支持摄像头翻译，还能把输入文字显示为手语动作，并提供按字母查找的手语词典。",
    content: <div className="feature-gallery feature-gallery-three phone-gallery"><figure><img src="/cases/master-camera.png" alt="Master Gesture 카메라 번역 화면" /><figcaption><strong>카메라 번역</strong><span>손동작을 인식해 문장으로 표시<small>识别手部动作并显示为句子</small></span></figcaption></figure><figure><img src="/cases/master-text.png" alt="Master Gesture 텍스트를 수어로 바꾸는 화면" /><figcaption><strong>텍스트 → 수어</strong><span>입력한 단어를 손모양으로 표시<small>把输入的单词显示为手语动作</small></span></figcaption></figure><figure><img src="/cases/master-signbook.png" alt="Master Gesture 수어 사전 화면" /><figcaption><strong>수어 사전</strong><span>알파벳별 손모양을 탐색<small>按字母查找手语动作</small></span></figcaption></figure></div>,
  },
  {
    index: "09", eyebrow: "AI 프로젝트 사례 3 · FROM YOUR EYES", chineseEyebrow: "AI项目案例3 · FROM YOUR EYES",
    title: "사진과 영상을 설명해\n시각 정보를 전달합니다", chineseTitle: "通过描述照片与视频传递视觉信息",
    note: <SpeakerNote lead="세 번째 사례인 FROM YOUR EYES는 시각장애인이 사진과 영상의 내용을 파악하도록 돕는 서비스입니다." points={["사용자가 사진이나 영상을 입력하면 AI가 화면 속 대상과 상황을 문장으로 설명합니다.", "설명의 길이와 방식은 사용자의 필요에 맞게 조정할 수 있습니다.", "모바일 앱 안에서만 쓰는 기능으로 두지 않고, 다른 서비스가 사용할 수 있는 API로도 확장했습니다.", "출발점인 사용자 문제를 분명히 잡았기 때문에 앱, API, 스마트 기기까지 같은 기능을 일관되게 확장할 수 있었습니다."]} transition="다음 장에서 서비스가 어떤 형태로 확장됐고 어떤 결과를 얻었는지 보겠습니다." sources={[{ label: "Microsoft — 2024 Imagine Cup World Champion", href: "https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" }]} />,
    chineseNote: "FROM YOUR EYES分析照片与视频，为视障用户提供说明，并扩展到移动应用、API和智能设备。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/from-your-eyes.webp" alt="FROM YOUR EYES 앱 화면" /><figcaption>서비스 화면 · 服务界面</figcaption></figure><div className="feature-list"><article><ImageIcon /><div><span>사진·영상 설명</span><p>시각 자료의 내용과 상황을 문장으로 설명합니다.<small>用文字说明视觉资料中的内容与情境。</small></p></div></article><article><Bot /><div><span>맞춤형 AI 도우미</span><p>사용자가 필요한 설명 방식에 맞게 설정합니다.<small>根据用户需要设置说明方式。</small></p></div></article><article><Code2 /><div><span>앱과 API</span><p>다른 서비스에서도 설명 기능을 사용할 수 있습니다.<small>其他服务也可以接入视觉说明功能。</small></p></div></article><a href="https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" target="_blank" rel="noreferrer">Microsoft 공식 소개 · Microsoft官方介绍 ↗</a></div></div>,
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
    title: "가설을 세우고,\n테스트 결과로 검증합니다", chineseTitle: "提出假设，并用测试结果进行验证",
    note: <SpeakerNote lead="이 수업에서 말하는 실증은 사람에게 한 번 써 보게 하는 것이 아니라, 가설을 세우고 결과를 확인하는 과정입니다." points={["먼저 기능이 사용자의 어떤 문제를 줄일 것인지 가설을 한 문장으로 적습니다.", "예를 들면 ‘이 기능을 사용하면 원하는 정보를 찾는 시간이 줄어든다’처럼 확인할 수 있는 문장이어야 합니다.", "테스트 전에 과업 성공 여부, 걸린 시간, 오류 횟수, 인터뷰 답변 중 무엇을 볼지 기준을 정합니다.", "결과를 본 뒤 기능을 유지할지, 수정할지, 제외할지 결정합니다. 좋았다는 반응만 모으는 것은 실증이 아닙니다."]} transition="이 과정을 학기 일정 안에서 어떻게 반복하는지 살펴보겠습니다." />,
    chineseNote: "实证不只是让用户试用，而是先提出功能将改善什么问题的假设，再确定判断标准，并根据测试结果决定保留、修改或删除。",
    content: <div className="evidence-layout evidence-layout-clear"><div className="evidence-word"><strong>실증</strong><span>實證 · EVIDENCE</span></div><div className="evidence-flow evidence-flow-clear">{[[Target, "가설", "假设", "이 기능이 누구의 어떤 문제를 줄일지 적습니다.", "说明该功能将减少谁的什么问题。"], [Ruler, "확인 기준", "判断标准", "성공과 실패를 판단할 기준을 정합니다.", "确定判断成功与失败的标准。"], [TestTube2, "테스트", "测试", "대상 사용자가 정해진 과업을 수행합니다.", "让目标用户完成设定的任务。"], [ChevronRight, "결정", "决定", "결과에 따라 유지·수정·제외합니다.", "根据结果决定保留、修改或删除。"]].map(([Icon, item, chinese, detail, chineseDetail], i) => { const StepIcon = Icon as typeof Target; return <div key={item as string}><span><StepIcon /></span><p>{item as string}<small>{chinese as string}</small></p><em>{detail as string}<small>{chineseDetail as string}</small></em>{i < 3 && <ChevronRight className="flow-arrow" />}</div>; })}</div></div>,
  },
  {
    index: "12", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "1~8주에는\n핵심 AI 기능을 구현합니다", chineseTitle: "第1~8周实现核心AI功能",
    note: <SpeakerNote lead="1주차부터 8주차까지는 프로젝트 범위를 정하고 핵심 AI 기능을 실제 화면에 연결하는 데 집중합니다." points={["1~2주에는 각 팀의 프로젝트 현황과 현재 문제를 공유합니다.", "3~5주에는 이번 학기 MVP 범위를 정하고 가장 중요한 AI 기능부터 구현합니다.", "6~7주에는 AI 기능을 서비스 화면과 연결하고 실제로 시연 가능한 상태로 만듭니다.", "8주차 중간 발표에서는 설명만 하지 말고 지금까지 만든 화면과 작동하는 기능을 직접 보여 줍니다."]} transition="중간 발표 이후에는 사용자 테스트와 최종 통합 단계로 넘어갑니다." />,
    chineseNote: "前两周分享项目现状，从第3周开始实现核心AI功能，并在第8周的期中汇报中现场展示已完成的界面与功能。",
    content: <div className="sprint-map sprint-map-part">{[["01–02", "시작", "开始", "수업 안내 · 프로젝트 현황 공유", "课程说明 · 分享项目现状"], ["03–05", "스프린트 1", "冲刺 1", "MVP 범위 정하기 · 핵심 AI 기능 구현", "确定MVP范围 · 实现核心AI功能"], ["06–08", "스프린트 2", "冲刺 2", "화면과 AI 기능 연결 · 중간 발표", "连接界面与AI功能 · 期中汇报"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week} className={i === 0 ? "start-phase" : ""}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 2 && <b>8주차 · 第8周<br />중간 발표 · 期中汇报</b>}</article>)}</div>,
  },
  {
    index: "13", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "9~15주에는 테스트하고,\n최종 시연을 준비합니다", chineseTitle: "第9~15周进行测试并准备最终演示",
    note: <SpeakerNote lead="9주차부터는 구현한 기능을 대상 사용자에게 테스트하고, 발견한 문제를 수정합니다." points={["9~11주에는 대상 사용자와 과업을 정하고 테스트를 진행합니다.", "사용자가 멈춘 지점, 잘못 이해한 부분, 예상과 다르게 사용한 행동을 기록합니다.", "12~14주에는 테스트 결과를 바탕으로 기능을 수정하고 전체 서비스를 통합합니다.", "15주차 최종 발표에서는 문제, 구현한 AI 기능, 테스트 결과, 수정한 내용을 하나의 흐름으로 시연합니다."]} transition="마지막으로 다음 주에 각 팀이 준비해 올 내용을 확인하겠습니다." />,
    chineseNote: "从第9周开始进行用户测试并修改发现的问题，最后整合全部功能，准备期末汇报与演示。",
    content: <div className="sprint-map sprint-map-part sprint-map-finish">{[["09–11", "스프린트 3", "冲刺 3", "사용자 테스트 · 문제점 수정", "用户测试 · 修改问题"], ["12–15", "스프린트 4", "冲刺 4", "최종 통합 · 발표와 시연", "最终整合 · 汇报与演示"]].map(([week, title, chineseTitle, detail, chineseDetail], i) => <article key={week}><span>{week}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p>{i === 1 && <b>15주차 · 第15周<br />최종 발표 · 期末汇报</b>}</article>)}</div>,
  },
  {
    index: "14", eyebrow: "다음 주 준비", chineseEyebrow: "下周准备",
    title: "다음 주에는\n본인 팀의 프로젝트를 소개합니다", chineseTitle: "下周介绍自己团队的项目",
    note: <SpeakerNote lead="다음 수업에서는 각 팀이 본인 프로젝트를 소개합니다." points={["팀명과 팀원을 먼저 소개해 주세요.", "프로젝트 이름, 해결하려는 문제, 대상 사용자를 구분해서 설명해 주세요.", "지난 학기에 구현한 기능과 현재 어려운 점을 정리해 주세요.", "이번 학기에 구현하거나 고도화할 핵심 AI 기능을 한 가지 이상 제시해 주세요.", "말로 설명하기 어려운 부분은 현재 화면이나 시연 가능한 기능을 함께 보여 주세요."]} />,
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
    </main>
  );
}
