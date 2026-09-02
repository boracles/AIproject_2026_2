"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Bot, Camera, ChevronRight, ClipboardList,
  Code2, FileStack, Glasses, Image as ImageIcon, MessageSquare,
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

function AITypeDetail({
  Icon,
  number,
  definition,
  chineseDefinition,
  image,
  imageAlt,
  imageCaption,
  sources,
  steps,
  loopLabel,
  example,
  chineseExample,
  exampleDetail,
  chineseExampleDetail,
  verification,
  chineseVerification,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  number: string;
  definition: string;
  chineseDefinition: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  sources: { ko: string; zh: string }[];
  steps: { ko: string; zh: string; decision?: boolean }[];
  loopLabel?: { ko: string; zh: string };
  example: string;
  chineseExample: string;
  exampleDetail: string;
  chineseExampleDetail: string;
  verification: string;
  chineseVerification: string;
}) {
  return (
    <div className="ai-type-detail">
      <section className="ai-type-definition">
        <Icon />
        <span>TYPE {number}</span>
        <p>{definition}<small>{chineseDefinition}</small></p>
        <figure className="ai-type-image">
          <img src={image} alt={imageAlt} />
          <figcaption>{imageCaption}</figcaption>
        </figure>
      </section>
      <section className="ai-type-body">
        <div className={`ai-flow-diagram ${sources.length > 1 ? "is-merge" : "is-linear"} ${loopLabel ? "is-loop" : ""}`}>
          <div className="flow-sources">
            {sources.map((source) => <article className="flow-node" key={source.ko}><strong>{source.ko}<small>{source.zh}</small></strong></article>)}
          </div>
          <ChevronRight />
          <div className="flow-steps">
            {steps.map((step, index) => (
              <div className="flow-step" key={step.ko}>
                <article className={`flow-node ${step.decision ? "is-decision" : ""}`}><strong>{step.ko}<small>{step.zh}</small></strong></article>
                {index < steps.length - 1 && <ChevronRight />}
              </div>
            ))}
          </div>
          {loopLabel && <div className="flow-loop"><span>↶</span><strong>{loopLabel.ko}<small>{loopLabel.zh}</small></strong></div>}
        </div>
        <div className="ai-type-example"><span>대표 사례 · 代表案例</span><h3>{example}<small>{chineseExample}</small></h3><p>{exampleDetail}<small>{chineseExampleDetail}</small></p></div>
        <div className="ai-type-verification"><span>QA·UT 평가 지표 · QA·UT评价指标</span><p>{verification}<small>{chineseVerification}</small></p></div>
      </section>
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
    title: "AI 시스템을 완성하고,\nQA와 UT로 검증합니다", chineseTitle: "完成AI系统，并通过QA与用户测试进行验证",
    note: <SpeakerNote lead="이 교과목은 프로젝트Ⅰ의 결과를 이어 AI 시스템을 고도화하고, 학생이 수행할 수 있는 QA와 소규모 UT로 문제를 찾아 개선하는 종합설계 수업입니다." points={["프로젝트Ⅰ에서 만든 결과물을 바탕으로 사용자 문제를 해결하는 AI 서비스 또는 시스템을 완성합니다.", "데이터, 모델, 서비스 화면, 로그가 연결되도록 전체 시스템을 구성합니다.", "QA에서는 팀이 테스트 케이스를 실행해 기능 오류, AI 응답 품질, 지연시간과 실패 상황을 점검합니다.", "UT에서는 참여자가 정해진 과업을 수행하고, 성공 여부와 막힌 지점, 의견을 기록합니다.", "UT 결과를 해석할 때는 참여자 구성과 테스트 범위를 한계로 함께 적습니다.", "학기 말에는 AI 데모 서비스, QA 기록, UT 결과, 재현 가능한 코드·모델·문서를 함께 제시합니다."]} transition="그럼 먼저 각 팀이 프로젝트Ⅰ에서 어디까지 만들었는지 공유해 보겠습니다." />,
    chineseNote: "本课程在项目Ⅰ成果的基础上完善AI系统，并通过团队QA和小规模用户测试发现问题、持续改进。",
    content: <div className="course-grid"><article><span>01 · 만들 프로젝트</span><h3>AI 서비스 또는 시스템</h3><p>프로젝트Ⅰ 결과를 고도화해 사용자 문제를 해결하는 서비스나 시스템을 완성합니다.</p><small>制作项目<br />继续优化项目Ⅰ成果，完成解决用户问题的AI服务或系统。</small></article><article><span>02 · AI 기술 적용</span><h3>데이터부터 서비스까지 연결</h3><p>데이터·모델·서비스 화면·로그를 연결해 하나의 사용 흐름으로 구성합니다.</p><small>应用AI技术<br />连接数据、模型、服务界面与日志，构成完整的使用流程。</small></article><article><span>03 · 검증 방법</span><h3>QA + UT</h3><p>팀이 기능과 AI 품질을 점검하고, UT로 사용 흐름을 검증합니다.</p><small>验证方法<br />团队检查功能与AI质量，并通过用户测试验证使用流程。</small></article><article className="assessment"><span>04 · 학기 말 결과물</span><h3>데모 + 검증 기록 + 재현</h3><p>AI 데모와 QA·UT 결과를 제시하고, 코드·모델·문서를 재현 가능한 형태로 정리합니다.</p><small>学期成果<br />AI演示 + QA与用户测试结果 + 可复现的代码、模型与文档</small></article></div>,
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
    note: <SpeakerNote lead="이번 학기에는 프로젝트Ⅰ 결과물을 이어 AI 기능과 서비스 전체를 고도화합니다." points={["먼저 지난 학기 결과물에서 구현된 부분과 아직 구현되지 않은 부분을 나눠 정리합니다.", "사용자에게 필요한 AI 기능을 골라 모델이나 API를 서비스 화면과 연결합니다.", "QA에서는 팀원이 테스트 케이스를 실행해 기능 오류, 예외 상황, AI 응답 품질, 속도와 연결 상태를 점검합니다.", "UT에서는 참여자가 과업을 수행하고, 성공 여부와 막힌 지점, 의견을 기록합니다.", "UT 참여자 구성과 테스트 범위는 결과 해석의 한계로 명시합니다.", "학기 말에는 AI 데모 서비스와 함께 QA 기록과 UT 결과를 제시합니다."]} transition="이제 문제와 AI 기능을 서비스로 연결한 프로젝트 사례를 살펴보겠습니다." />,
    chineseNote: "先检查项目Ⅰ成果并补充所需功能，再分别进行团队QA与小规模用户测试。",
    content: <div className="purpose-layout"><div className="purpose-cards">{[["01", "현재 상태 점검", "检查当前状态", "프로젝트Ⅰ에서 만든 것과 아직 안 된 것을 먼저 정리합니다.", "先梳理项目Ⅰ中已经完成和尚未完成的部分。"], ["02", "필요한 기능 추가", "补充所需功能", "AI 모델이나 API를 서비스 화면과 기능에 연결합니다.", "把AI模型或API接入界面与功能。"], ["03", "QA", "质量保证", "팀원이 기능 오류, 예외 상황, AI 응답 품질, 속도와 연결 상태를 점검합니다.", "团队成员检查功能错误、异常、AI回答质量、速度与连接状态。"], ["04", "UT", "用户测试", "과업 수행을 관찰해 사용성 문제와 초기 반응을 확인합니다.", "观察任务执行，确认可用性问题与初步反馈。"]].map(([number, title, chineseTitle, detail, chineseDetail]) => <article key={number}><span>{number}</span><h3>{title}<small>{chineseTitle}</small></h3><p>{detail}<small>{chineseDetail}</small></p></article>)}</div><div className="purpose-result"><span>학기 말 결과물 · 学期成果</span><strong>AI 데모 서비스 + QA 기록 + UT 결과<small>AI演示服务 + QA记录 + 用户测试结果</small></strong></div></div>,
  },
  {
    index: "05", eyebrow: "AI 접목 유형", chineseEyebrow: "AI应用类型",
    title: "AI는 프로젝트에서\n여섯 가지 역할을 맡을 수 있습니다", chineseTitle: "AI可以在项目中承担六种不同角色",
    note: <SpeakerNote lead="현재 AI 접목 프로젝트를 살펴보면 AI가 맡는 역할을 다음 여섯 가지로 정리할 수 있습니다." points={["인식·분류는 입력에 이미 있는 대상이나 상태를 찾아 범주로 구분합니다.", "예측은 과거와 현재 데이터를 이용해 앞으로의 값이나 가능성을 추정합니다.", "추천·개인화는 여러 후보 중 현재 사용자에게 적합한 항목을 고르고 순서를 정합니다.", "생성은 지시와 참고자료를 바탕으로 새로운 글, 이미지, 음성, 영상이나 코드를 만듭니다.", "대화·지식 검색은 관련 근거를 문서에서 찾아 답변이나 요약으로 제공합니다.", "자동화·에이전트는 목표를 받아 필요한 단계를 계획하고 허용된 도구로 여러 작업을 수행합니다.", "한 프로젝트에는 두 가지 이상의 유형이 함께 들어갈 수 있습니다. 각 기능이 어느 유형인지 구분하면 필요한 데이터와 평가 지표를 정하기 쉬워집니다."]} transition="첫 번째 유형인 인식·분류부터 사례와 검증 방법을 살펴보겠습니다." sources={[{ label: "1주차 Notion — AI가 프로젝트에 접목되는 여섯 가지 유형", href: "https://app.notion.com/p/3cf7c00fe5ad8149bf56cf4648e4b04a" }]} />,
    chineseNote: "当前的AI融合项目可以分为以下六种类型。一个项目可以同时包含两种以上类型。",
    content: <div className="ai-types-overview">{[[ScanLine, "01", "인식·분류", "识别与分类", "대상과 상태를 찾고 범주로 구분"], [Target, "02", "예측", "预测", "미래의 값·확률·위험 추정"], [UserRound, "03", "추천·개인화", "推荐与个性化", "사용자에게 맞는 후보 선택·정렬"], [ImageIcon, "04", "생성", "生成", "새로운 글·이미지·음성·코드 제작"], [MessageSquare, "05", "대화·지식 검색", "对话与知识检索", "문서 근거를 찾아 답변·요약"], [Bot, "06", "자동화·에이전트", "自动化与智能体", "목표를 받아 여러 단계의 작업 수행"]].map(([Icon, number, name, chinese, role]) => { const TypeIcon = Icon as typeof ScanLine; return <article key={number as string}><TypeIcon /><span>{number as string}</span><h3>{name as string}<small>{chinese as string}</small></h3><p>{role as string}</p></article>; })}</div>,
  },
  {
    index: "06", eyebrow: "AI 접목 유형 1 · 인식·분류", chineseEyebrow: "AI应用类型1 · 识别与分类",
    title: "이미 있는 대상과 상태를\n찾아 정해진 범주로 구분합니다", chineseTitle: "识别已有对象与状态，并归入预设类别",
    note: <SpeakerNote lead="인식·분류는 이미지, 문서, 음성에 이미 존재하는 대상이나 상태를 찾아 정해진 범주로 구분하는 유형입니다." points={["결과는 무엇인지, 어디에 있는지, 어떤 상태인지 또는 분류 신뢰도가 됩니다.", "Google Cloud Vision의 라벨 감지는 사진 속 사물, 장소, 활동을 찾아 라벨과 신뢰도 점수로 반환합니다.", "학생 프로젝트에서는 제품 분류, 불량 감지, 문서 종류 판별, 음성 의도 분류 등에 적용할 수 있습니다.", "QA에서는 정답을 알고 있는 테스트 자료를 준비하고 정확히 찾은 비율, 놓친 대상, 잘못 분류한 사례를 기록합니다.", "UT가 필요하다면 사용자가 분류 결과를 이해하고 다음 행동을 수행할 수 있는지도 확인합니다."]} transition="다음은 과거와 현재 데이터로 미래를 추정하는 예측 유형입니다." sources={[{ label: "Google Cloud Vision — Detect Labels", href: "https://docs.cloud.google.com/vision/docs/labels" }]} />,
    chineseNote: "识别图像、文档或语音中已有的对象与状态，并输出标签、位置、状态或置信度。",
    content: <AITypeDetail Icon={ScanLine} number="01" definition="이미지·문서·음성에 존재하는 대상이나 상태를 찾아 정해진 범주로 구분합니다." chineseDefinition="识别图像、文档或语音中的对象与状态，并归入预设类别。" image="/ai-types/vision-object-detection.webp" imageAlt="Google Cloud Vision이 거리 사진 속 자전거와 바퀴를 감지한 화면" imageCaption="Cloud Vision 라벨 감지 결과" sources={[{ ko: "이미지·문서·음성", zh: "图像·文档·语音" }]} steps={[{ ko: "특징 추출", zh: "特征提取" }, { ko: "대상·상태 분류", zh: "对象·状态分类" }, { ko: "라벨·위치·신뢰도", zh: "标签·位置·置信度" }]} example="Google Cloud Vision 라벨 감지" chineseExample="Google Cloud Vision标签检测" exampleDetail="거리 사진에서 사물·장소·활동을 찾아 라벨과 신뢰도로 반환합니다." chineseExampleDetail="从街景照片中识别物体、地点与活动，返回标签与置信度。" verification="분류 정확도 · 재현율 · 오분류 사례" chineseVerification="分类准确率 · 召回率 · 错误分类案例" />,
  },
  {
    index: "07", eyebrow: "AI 접목 유형 2 · 예측", chineseEyebrow: "AI应用类型2 · 预测",
    title: "과거와 현재 데이터로\n앞으로의 값이나 가능성을 추정합니다", chineseTitle: "利用历史与当前数据估计未来数值或发生概率",
    note: <SpeakerNote lead="예측은 과거와 현재 데이터를 이용해 앞으로 발생할 값이나 가능성을 추정하는 유형입니다." points={["결과는 예상 시간, 수량, 확률, 위험도처럼 미래를 나타내는 값입니다.", "Google Maps는 과거 도로별 교통 패턴과 현재 교통 상황을 함께 분석해 앞으로의 교통량과 도착 예정 시간을 예측합니다.", "예측이라고 부르려면 결과를 비교할 미래의 정답 데이터가 있어야 합니다. 현재 상태를 구분하는 기능은 예측이 아니라 인식·분류에 가깝습니다.", "QA에서는 학습에 쓰지 않은 데이터로 관측값과 예측값의 차이, 위험을 놓친 비율, 예측이 유효한 시간 범위를 확인합니다.", "UT에서는 예측값이 사용자의 판단이나 행동에 이해 가능한 방식으로 제시되는지 확인할 수 있습니다."]} transition="다음은 사용자마다 결과가 달라지는 추천·개인화 유형입니다." sources={[{ label: "Google Maps — How AI predicts traffic and routes", href: "https://blog.google/products-and-platforms/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/" }]} />,
    chineseNote: "利用历史与当前数据估计未来的时间、数量、概率或风险值。",
    content: <AITypeDetail Icon={Target} number="02" definition="과거와 현재 데이터를 이용해 앞으로 발생할 값이나 가능성을 추정합니다." chineseDefinition="利用历史与当前数据估计未来的数值或发生概率。" image="/ai-types/maps-traffic-prediction.webp" imageAlt="혼잡한 도로의 교통 상황 사례 사진" imageCaption="Google Maps 교통 예측 사례" sources={[{ ko: "과거 교통 패턴", zh: "历史交通模式" }, { ko: "현재 교통 상황", zh: "实时交通状况" }]} steps={[{ ko: "예측 모델", zh: "预测模型" }, { ko: "미래 속도·도착 시간", zh: "未来车速·到达时间" }]} example="Google Maps 교통·도착 시간 예측" chineseExample="Google Maps交通与到达时间预测" exampleDetail="과거 교통 패턴과 현재 상황을 결합해 미래 교통량과 도착 시간을 예측합니다." chineseExampleDetail="结合历史交通模式与当前状况，预测未来交通与到达时间。" verification="예측 오차 · 위험 사건 재현율 · 예측 시점별 성능" chineseVerification="预测误差 · 风险事件召回率 · 不同预测时间点的性能" />,
  },
  {
    index: "08", eyebrow: "AI 접목 유형 3 · 추천·개인화", chineseEyebrow: "AI应用类型3 · 推荐与个性化",
    title: "여러 후보 중 사용자에게 맞는 항목을\n고르고 순서를 정합니다", chineseTitle: "从多个候选项中选择并排序适合当前用户的内容",
    note: <SpeakerNote lead="추천·개인화는 여러 후보 가운데 현재 사용자에게 적합할 가능성이 높은 항목을 고르고 순서를 정하는 유형입니다." points={["모든 사용자에게 같은 검색 결과나 인기순을 보여 주는 것과 달리, 사용 기록과 상황에 따라 결과가 달라집니다.", "Netflix는 시청 기록과 선호 신호를 바탕으로 회원별 콘텐츠 목록을 구성합니다.", "학생 프로젝트에서는 학습 콘텐츠, 상품, 장소, 활동, 다음 행동을 사용자별로 추천할 수 있습니다.", "QA에서는 사용자 조건이 달라질 때 추천 결과가 의도대로 달라지는지, 같은 항목만 반복되거나 부적절한 후보가 상위에 오르지 않는지 확인합니다.", "UT에서는 추천 선택률, 원하는 항목을 찾는 시간, 추천의 이해 가능성과 다양성을 확인합니다."]} transition="다음은 새로운 콘텐츠를 만드는 생성 유형입니다." sources={[{ label: "Netflix Research — Recommendations", href: "https://research.netflix.com/research-area/recommendations" }]} />,
    chineseNote: "根据用户记录与情境，从候选项中选择并排序更适合当前用户的内容。",
    content: <AITypeDetail Icon={UserRound} number="03" definition="여러 후보 가운데 현재 사용자에게 적합할 가능성이 높은 항목을 고르고 순서를 정합니다." chineseDefinition="从候选项中选择并排序更适合当前用户的内容。" image="/ai-types/netflix-recommendations.webp" imageAlt="사용자별 Top Picks가 표시된 Netflix 추천 화면" imageCaption="Netflix 개인화 추천 화면" sources={[{ ko: "시청·선택 기록", zh: "观看·选择记录" }, { ko: "영화·콘텐츠 정보", zh: "影片·内容信息" }]} steps={[{ ko: "후보 콘텐츠 순위화", zh: "候选内容排序" }, { ko: "개인화 추천 목록", zh: "个性化推荐列表" }]} example="Netflix 개인화 추천" chineseExample="Netflix个性化推荐" exampleDetail="시청 기록과 선호 신호를 바탕으로 회원별 콘텐츠 목록을 구성합니다." chineseExampleDetail="根据观看记录与偏好信号生成个性化内容列表。" verification="추천 선택률 · 추천 후 과업 완료율 · 추천 결과 다양성" chineseVerification="推荐选择率 · 推荐后的任务完成率 · 推荐结果多样性" />,
  },
  {
    index: "09", eyebrow: "AI 접목 유형 4 · 생성", chineseEyebrow: "AI应用类型4 · 生成",
    title: "지시와 참고자료를 바탕으로\n새로운 콘텐츠를 만듭니다", chineseTitle: "根据指令与参考资料生成新的内容",
    note: <SpeakerNote lead="생성은 기존 입력을 분류하는 데 그치지 않고 사용자의 지시와 참고자료를 바탕으로 새로운 글, 이미지, 음성, 영상이나 코드를 만드는 유형입니다." points={["Adobe Firefly에서는 사용자가 장면과 스타일을 문장으로 입력하면 조건에 맞는 이미지 후보를 생성합니다.", "사용자는 결과를 한 번 받고 끝내는 것이 아니라 프롬프트를 수정하고 후보를 선택하며 결과를 발전시킵니다.", "학생 프로젝트에서는 문서 초안, 이미지, 음성 안내, 영상 요약, 코드 생성 등에 적용할 수 있습니다.", "QA에서는 지시와 결과의 일치도, 사실 오류, 부적절한 생성, 동일 조건에서의 품질 편차를 확인합니다.", "UT에서는 사용자가 결과를 수정하고 최종 작업에 활용할 수 있는지, 생성 과정이 오히려 일을 늘리지 않는지 확인합니다."]} transition="다음은 문서의 근거를 찾아 답하는 대화·지식 검색 유형입니다." sources={[{ label: "Adobe Firefly — Text to Image", href: "https://www.adobe.com/products/firefly/features/text-to-image.html" }]} />,
    chineseNote: "根据用户指令与参考资料生成新的文本、图像、音频、视频或代码。",
    content: <AITypeDetail Icon={ImageIcon} number="04" definition="사용자의 지시와 참고자료를 바탕으로 새로운 글·이미지·음성·영상·코드를 만듭니다." chineseDefinition="根据用户指令与参考资料生成新的文本、图像、音频、视频或代码。" image="/ai-types/firefly-text-to-image.webp" imageAlt="Adobe Firefly의 텍스트 이미지 생성 설정 화면" imageCaption="Adobe Firefly 생성 화면" sources={[{ ko: "텍스트 지시", zh: "文本指令" }, { ko: "스타일·참고 이미지", zh: "风格·参考图像" }]} steps={[{ ko: "생성 모델", zh: "生成模型" }, { ko: "새 이미지 후보", zh: "新图像方案" }, { ko: "선택·수정", zh: "选择·修改" }]} example="Adobe Firefly 텍스트 이미지 생성" chineseExample="Adobe Firefly文本生成图像" exampleDetail="장면과 스타일을 입력하면 이미지 후보를 만들고 프롬프트 수정으로 결과를 발전시킵니다." chineseExampleDetail="输入场景与风格后生成图像方案，并通过修改提示词继续迭代。" verification="프롬프트 충실도 · 결과물 유용성 · 오류·유해 출력 발생률" chineseVerification="提示词遵循度 · 结果可用性 · 错误或有害输出发生率" />,
  },
  {
    index: "10", eyebrow: "AI 접목 유형 5 · 대화·지식 검색", chineseEyebrow: "AI应用类型5 · 对话与知识检索",
    title: "문서에서 관련 근거를 찾아\n질문에 답하거나 내용을 요약합니다", chineseTitle: "从文档中检索依据，回答问题或总结内容",
    note: <SpeakerNote lead="대화·지식 검색은 질문과 관련된 내용을 문서나 데이터에서 먼저 찾고, 찾은 근거를 이용해 답변하거나 요약하는 유형입니다." points={["일반적인 생성 기능과 달리 어떤 자료를 근거로 답했는지 사용자가 확인할 수 있어야 합니다.", "NotebookLM은 사용자가 넣은 PDF, 강의자료, 웹페이지를 바탕으로 질문에 답하고 답변과 연결된 출처를 표시합니다.", "학생 프로젝트에서는 규정 안내, 수업자료 질의응답, 제품 매뉴얼 검색, 조직 내 문서 검색 등에 적용할 수 있습니다.", "QA에서는 답변이 맞는지, 인용 부분이 답변을 뒷받침하는지, 근거 없이 만든 내용이 있는지 확인합니다.", "UT에서는 사용자가 필요한 정보를 더 빠르게 찾는지, 출처를 이해하고 검토할 수 있는지 확인합니다."]} transition="다음은 AI가 도구를 사용해 여러 단계를 수행하는 자동화·에이전트 유형입니다." sources={[{ label: "Gemini Notebook — Add or discover sources", href: "https://support.google.com/gemininotebook/answer/16215270?hl=en" }]} />,
    chineseNote: "先从文档或数据中检索相关依据，再根据依据回答或总结，并显示来源。",
    content: <AITypeDetail Icon={MessageSquare} number="05" definition="질문과 관련된 내용을 문서나 데이터에서 찾고, 그 근거를 이용해 답변하거나 요약합니다." chineseDefinition="从文档或数据中检索相关依据，再据此回答或总结。" image="/ai-types/notebooklm-guide.webp" imageAlt="NotebookLM에서 학습 가이드와 답변 길이를 설정하는 화면" imageCaption="NotebookLM 학습 설정 화면" sources={[{ ko: "질문", zh: "问题" }, { ko: "선택한 문서", zh: "已选文档" }]} steps={[{ ko: "관련 근거 검색", zh: "检索相关依据" }, { ko: "근거를 포함한 답변", zh: "带依据的回答" }, { ko: "출처 확인", zh: "核对来源" }]} example="Google NotebookLM" chineseExample="Google NotebookLM" exampleDetail="사용자가 넣은 자료를 바탕으로 질문에 답하고 답변과 연결된 출처를 표시합니다." chineseExampleDetail="根据用户添加的资料回答问题，并标注对应来源。" verification="답변 정확도 · 근거 충실도 · 인용 정확도 · 환각 발생률" chineseVerification="回答准确率 · 依据忠实度 · 引用准确率 · 幻觉发生率" />,
  },
  {
    index: "11", eyebrow: "AI 접목 유형 6 · 자동화·에이전트", chineseEyebrow: "AI应用类型6 · 自动化与智能体",
    title: "사용자 목표를 받아\n여러 단계의 작업을 수행합니다", chineseTitle: "接收用户目标并执行多阶段任务",
    note: <SpeakerNote lead="자동화·에이전트는 사용자가 목표를 주면 AI가 필요한 단계를 정하고, 허용된 도구를 선택해 여러 단계의 작업을 수행하는 유형입니다." points={["답변만 작성하는 챗봇과 달리 문서 읽기, 데이터 조회, 파일 작성, 메시지 초안 만들기 같은 도구 사용이 포함됩니다.", "예를 들어 매주 프로젝트 현황을 정리하라는 목표를 받으면 관련 문서와 데이터를 확인하고 보고서와 공유 메시지 초안을 만들 수 있습니다.", "학생 프로젝트에서는 반복 보고서 작성, 여러 자료의 수집과 정리, 조건에 따른 알림이나 업무 흐름 지원 등에 적용할 수 있습니다.", "도구 권한과 사용자 승인 범위를 먼저 정해야 하며, 중요한 작업은 중간 확인 없이 실행하지 않도록 설계합니다.", "QA에서는 전체 과업 완료율, 잘못된 도구 사용, 단계 누락, 중간 확인과 사용자 승인 준수를 확인합니다.", "UT에서는 사용자가 진행 상태와 결과를 이해하고 필요할 때 수정·중단·승인할 수 있는지 확인합니다."]} transition="이제 여섯 유형 중 대화·지식 검색에 해당하는 NotebookLM을 화면으로 살펴보겠습니다." sources={[{ label: "OpenAI — A practical guide to building AI agents", href: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" }, { label: "OpenAI Academy — Workspace agents", href: "https://openai.com/academy/workspace-agents/" }]} />,
    chineseNote: "用户给出目标后，AI规划步骤、选择获准工具并执行多阶段任务，同时遵守中间检查与用户批准。",
    content: <AITypeDetail Icon={Bot} number="06" definition="사용자가 목표를 주면 필요한 단계를 계획하고 허용된 도구로 여러 작업을 수행합니다." chineseDefinition="用户给出目标后，AI规划步骤并使用获准工具执行多阶段任务。" image="/ai-types/agent-builder-workflow.webp" imageAlt="검색과 요약 단계를 연결한 에이전트 워크플로 화면" imageCaption="Agent Builder 워크플로" sources={[{ ko: "사용자 목표", zh: "用户目标" }]} steps={[{ ko: "단계 계획·도구 선택", zh: "规划步骤·选择工具" }, { ko: "문서·데이터 작업", zh: "处理文档与数据" }, { ko: "결과 확인", zh: "检查结果", decision: true }, { ko: "결과 제출·사용자 승인", zh: "提交结果·用户确认" }]} loopLabel={{ ko: "수정 필요 → 계획으로 돌아감", zh: "需要修改 → 返回计划" }} example="반복 업무를 처리하는 Workspace Agent" chineseExample="处理重复工作的Workspace Agent" exampleDetail="관련 문서와 데이터를 확인해 정해진 형식의 보고서와 공유 메시지 초안을 만듭니다." chineseExampleDetail="读取相关文档与数据，按指定格式生成报告与共享消息草稿。" verification="전체 과업 성공률 · 도구 선택 정확도 · 승인 절차 위반률" chineseVerification="完整任务成功率 · 工具选择准确率 · 审批流程违规率" />,
  },
  {
    index: "12", eyebrow: "AI 프로젝트 사례 1 · NotebookLM", chineseEyebrow: "AI项目案例1 · NotebookLM",
    title: "내 자료를 읽고 질문에 답하며\n출처까지 보여 주는 AI 서비스", chineseTitle: "读取用户资料、回答问题并显示出处的AI服务",
    note: <SpeakerNote lead="NotebookLM은 사용자가 넣은 PDF, 문서, 웹 링크를 AI가 읽고, 그 자료에 관한 질문에 답해 주는 Google의 학습·조사 서비스입니다." points={["먼저 분석할 자료를 직접 넣습니다.", "자료에 관해 질문하면 AI가 관련 내용을 찾아 답합니다.", "답변에 연결된 출처를 누르면 근거가 된 원문 위치를 확인할 수 있습니다.", "업로드한 자료를 요약문, FAQ, 학습 가이드, 대화형 오디오로 바꿔 볼 수도 있습니다."]} transition="다음 장에서 질문, 요약, 오디오 기능을 사용자가 어떻게 이용하는지 보겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "NotebookLM是Google的学习与研究服务。AI读取用户上传的PDF、文档或网页链接，根据这些资料回答问题，并显示原文出处。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/notebooklm.png" alt="NotebookLM 공식 소개 이미지" /><figcaption>Google 공식 소개 이미지 · Google官方介绍图片</figcaption></figure><div className="feature-list"><article><FileStack /><div><span>분석할 자료를 넣습니다</span><p>PDF, 문서, 웹 링크를 업로드합니다.<small>上传PDF、文档或网页链接。</small></p></div></article><article><MessageSquare /><div><span>자료에 관해 질문합니다</span><p>AI가 업로드한 자료에서 관련 내용을 찾아 답합니다.<small>AI从上传的资料中查找相关内容并回答。</small></p></div></article><article><ClipboardList /><div><span>답변의 근거를 확인합니다</span><p>출처를 눌러 답변이 나온 원문 위치를 확인합니다.<small>点击出处，查看答案所依据的原文位置。</small></p></div></article><a href="https://blog.google/innovation-and-ai/products/developing-notebooklm/" target="_blank" rel="noreferrer">Google 공식 소개 · Google官方介绍 ↗</a></div></div>,
  },
  {
    index: "13", eyebrow: "NotebookLM · 주요 기능", chineseEyebrow: "NotebookLM · 主要功能",
    title: "긴 자료를 전부 읽지 않아도\n묻고, 요약해서 보고, 오디오로 듣습니다", chineseTitle: "无需通读长资料，也可以提问、阅读摘要或收听音频",
    note: <SpeakerNote lead="NotebookLM에 자료를 넣으면 필요한 내용은 질문으로 찾고, 전체 내용은 요약해서 읽거나 오디오로 들을 수 있습니다." points={["질문을 입력하면 업로드한 자료에서 관련 내용을 찾아 답하고 출처를 표시합니다.", "긴 자료는 요약문, FAQ, 학습 가이드 형태로 정리해 읽을 수 있습니다.", "오디오 개요를 만들면 자료 내용을 두 진행자의 대화처럼 들을 수 있습니다.", "NotebookLM은 사용자가 선택한 자료를 바탕으로 답하고, 참고한 원문을 표시합니다."]} transition="두 번째 사례에서는 AI 모델을 모바일 서비스 흐름에 연결한 방식을 보겠습니다." sources={[{ label: "Google — Developing NotebookLM", href: "https://blog.google/innovation-and-ai/products/developing-notebooklm/" }]} />,
    chineseNote: "上传资料后，可以通过提问寻找所需内容，把长资料整理成摘要，也可以转换为对话式音频。",
    content: <div className="feature-gallery feature-gallery-two"><figure><img src="/cases/notebooklm-ui.webp" alt="NotebookLM 초기 화면에서 자료와 질문을 함께 보는 모습" /><figcaption><strong>질문하면 근거와 함께 답변</strong><span>업로드한 자료에서 답을 찾고 참고한 원문을 표시합니다.<small>从上传的资料中寻找答案，并显示参考原文。</small></span></figcaption></figure><figure><img src="/cases/notebooklm-audio.webp" alt="NotebookLM Audio Overview 시연 화면" /><figcaption><strong>자료를 대화형 오디오로 변환</strong><span>자료 내용을 두 진행자의 대화처럼 들려줍니다.<small>把资料内容转换为两位主持人的对话式音频。</small></span></figcaption></figure><div className="gallery-takeaway">NotebookLM은 사용자가 선택한 자료를 바탕으로 답하고 참고한 원문을 표시합니다.<small>NotebookLM根据用户选择的资料回答，并显示参考原文。</small></div></div>,
  },
  {
    index: "14", eyebrow: "AI 프로젝트 사례 2 · Master Gesture", chineseEyebrow: "AI项目案例2 · Master Gesture",
    title: "수어 사용자와 수어를 모르는 사람이\n대화할 수 있도록 돕습니다", chineseTitle: "帮助手语使用者与不懂手语的人交流",
    note: <SpeakerNote lead="두 번째 사례인 Master Gesture는 수어 사용자와 수어를 모르는 사람 사이의 의사소통을 돕기 위해 만든 모바일 프로젝트입니다." points={["스마트폰 카메라로 사용자의 손동작을 실시간으로 받습니다.", "YOLO 모델로 손동작을 분류하고, 학습한 모델을 ONNX 형식으로 변환해 모바일 앱에 연결했습니다.", "인식 결과는 상대방이 읽을 수 있도록 텍스트로 표시합니다.", "AI 모델의 정확도만 보여 주지 않고 카메라 입력부터 결과 확인까지 하나의 대화 흐름으로 구성했습니다."]} transition="다음 장에서는 수어 인식 외에 양방향 대화를 위해 어떤 기능을 구현했는지 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture通过摄像头获取手部动作，用YOLO模型识别，再把ONNX模型接入移动应用并显示文字结果。",
    content: <div className="case-overview"><figure><img src="/cases/master-gesture.jpg" alt="Master Gesture가 카메라로 수어를 인식하는 테스트 화면" /><figcaption>프로젝트 테스트 화면 · 项目测试界面</figcaption></figure><div className="feature-list feature-sequence"><article><Camera /><div><span>카메라 입력</span><p>사용자의 손동작을 실시간으로 받습니다.<small>实时获取用户的手部动作。</small></p></div></article><article><ScanLine /><div><span>동작 인식</span><p>YOLO로 손동작을 분류합니다.<small>使用YOLO识别并分类手部动作。</small></p></div></article><article><Type /><div><span>텍스트 출력</span><p>인식한 수어를 문장으로 보여 줍니다.<small>把识别出的手语显示为文字。</small></p></div></article><a href="https://devpost.com/software/tomjerry" target="_blank" rel="noreferrer">Devpost 프로젝트 페이지 · Devpost项目页面 ↗</a></div></div>,
  },
  {
    index: "15", eyebrow: "Master Gesture · 주요 기능", chineseEyebrow: "Master Gesture · 主要功能",
    title: "수어 인식부터\n텍스트 변환과 수어 사전까지 구현했습니다", chineseTitle: "实现了手语识别、文字转换与手语词典",
    note: <SpeakerNote lead="이 프로젝트는 수어 인식에 그치지 않고 양방향 대화에 필요한 기능을 함께 구성했습니다." points={["첫 화면은 카메라로 손동작을 읽어 문장으로 보여 줍니다.", "두 번째 화면은 입력한 텍스트를 수어 손모양으로 바꿔 반대 방향의 의사소통도 돕습니다.", "세 번째 화면은 알파벳별 손모양을 찾아볼 수 있는 수어 사전입니다.", "사용자가 대화 전후에 무엇을 필요로 하는지 살펴 세 기능을 하나의 흐름으로 연결했습니다."]} transition="세 번째 사례에서는 하나의 접근성 문제를 앱과 API, 기기 연동으로 확장한 과정을 보겠습니다." sources={[{ label: "Devpost — Master Gesture", href: "https://devpost.com/software/tomjerry" }]} />,
    chineseNote: "Master Gesture不仅支持摄像头翻译，还能把输入文字显示为手语动作，并提供按字母查找的手语词典。",
    content: <div className="feature-gallery feature-gallery-three phone-gallery"><figure><img src="/cases/master-camera.png" alt="Master Gesture 수어 인식 화면" /><figcaption><strong>수어 인식</strong><span>손동작을 인식해 문장으로 표시<small>识别手部动作并显示为句子</small></span></figcaption></figure><figure><img src="/cases/master-text.png" alt="Master Gesture 텍스트를 수어로 바꾸는 화면" /><figcaption><strong>텍스트 → 수어</strong><span>입력한 단어를 손모양으로 표시<small>把输入的单词显示为手语动作</small></span></figcaption></figure><figure><img src="/cases/master-signbook.png" alt="Master Gesture 수어 사전 화면" /><figcaption><strong>수어 사전</strong><span>알파벳별 손모양을 탐색<small>按字母查找手语动作</small></span></figcaption></figure></div>,
  },
  {
    index: "16", eyebrow: "AI 프로젝트 사례 3 · FROM YOUR EYES", chineseEyebrow: "AI项目案例3 · FROM YOUR EYES",
    title: "시각장애인이 사진과 영상을 이해하도록\nAI가 내용을 설명합니다", chineseTitle: "AI为视障用户说明照片与视频内容",
    note: <SpeakerNote lead="FROM YOUR EYES는 시각장애인이 다른 사람의 도움 없이 사진과 영상의 내용을 이해하도록 돕기 위해 만든 서비스입니다." points={["사용자가 사진이나 영상을 입력하면 AI가 화면 속 대상과 상황을 문장으로 설명합니다.", "설명의 길이와 방식은 사용자의 필요에 맞게 조정할 수 있습니다.", "모바일 앱 안에서만 쓰는 기능으로 두지 않고, 다른 서비스가 사용할 수 있는 API로도 확장했습니다.", "시각 정보 접근이라는 문제를 중심에 두고 앱, API, 스마트 기기까지 같은 기능을 확장했습니다."]} transition="다음 장에서 서비스가 어떤 형태로 확장됐고 어떤 결과를 얻었는지 보겠습니다." sources={[{ label: "Microsoft — 2024 Imagine Cup World Champion", href: "https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" }]} />,
    chineseNote: "FROM YOUR EYES旨在帮助视障用户无需他人协助也能理解照片与视频内容，并扩展到移动应用、API和智能设备。",
    content: <div className="case-overview case-contain"><figure><img src="/cases/from-your-eyes.webp" alt="FROM YOUR EYES 앱 화면" /><figcaption>서비스 화면 · 服务界面</figcaption></figure><div className="feature-list"><article><Target /><div><span>만든 이유</span><p>시각장애인이 사진·영상 속 정보에 스스로 접근하도록 돕습니다.<small>帮助视障用户自主获取照片和视频中的信息。</small></p></div></article><article><ImageIcon /><div><span>사진·영상 설명</span><p>화면 속 대상과 상황을 문장으로 설명합니다.<small>用文字说明画面中的对象与情境。</small></p></div></article><article><Code2 /><div><span>앱과 API</span><p>다른 서비스에서도 설명 기능을 사용할 수 있습니다.<small>其他服务也可以接入视觉说明功能。</small></p></div></article><a href="https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" target="_blank" rel="noreferrer">Microsoft 공식 소개 · Microsoft官方介绍 ↗</a></div></div>,
  },
  {
    index: "17", eyebrow: "FROM YOUR EYES · 기능과 결과", chineseEyebrow: "FROM YOUR EYES · 功能与成果",
    title: "사용자 문제에서 시작해\n앱과 API로 확장했습니다", chineseTitle: "从用户问题出发，扩展为应用与API",
    note: <SpeakerNote lead="FROM YOUR EYES는 사진·영상 설명 기능을 앱과 API, 스마트 기기 연동으로 확장했고 2024 Imagine Cup 세계 우승을 차지했습니다." points={["스마트 글래스나 워치에서도 주변 상황 설명을 들을 수 있도록 사용 환경을 넓혔습니다.", "외부 서비스가 시각 설명 기능을 사용할 수 있도록 API도 제공했습니다.", "수상 자체보다 중요한 점은 처음 정한 사용자 문제를 유지하면서 서비스의 사용 범위를 확장했다는 것입니다.", "우리 프로젝트도 현재 기능을 다른 화면이나 상황에서 쓸 수 있는지 생각해 볼 수 있습니다."]} transition="세 사례를 본 뒤, 학생 프로젝트에서 가능한 검증 방법을 정리하겠습니다." sources={[{ label: "Microsoft — 2024 Imagine Cup World Champion", href: "https://news.microsoft.com/source/latam/noticias-de-microsoft/anunciamos-al-campeon-mundial-de-imagine-cup-2024/" }]} />,
    chineseNote: "项目扩展到照片、视频和文档说明、定制AI助手、外部服务API以及智能眼镜和手表，并获得2024 Imagine Cup世界冠军。",
    content: <div className="impact-layout"><div className="impact-images"><figure><img src="/cases/from-your-eyes-team.png" alt="2024 Imagine Cup 우승팀 FROM YOUR EYES" /><figcaption>2024 World Champion · 2024世界冠军</figcaption></figure><figure><img src="/cases/from-your-eyes-award.png" alt="2024 Imagine Cup World Championship 트로피" /><figcaption>Microsoft Imagine Cup</figcaption></figure></div><div className="impact-points"><article><Glasses /><div><strong>스마트 기기 연동</strong><p>글래스와 워치에서도 주변 상황 설명을 들을 수 있습니다.<small>也可通过智能眼镜和手表获取环境说明。</small></p></div></article><article><Code2 /><div><strong>외부 서비스용 API</strong><p>다른 앱에도 시각 설명 기능을 연결합니다.<small>把视觉说明功能接入其他应用。</small></p></div></article><div className="impact-result"><span>프로젝트 결과 · 项目成果</span><strong>2024 Imagine Cup 세계 우승<small>2024 Imagine Cup 世界冠军</small></strong></div></div></div>,
  },
  {
    index: "18", eyebrow: "학생 프로젝트의 검증 범위", chineseEyebrow: "学生项目的验证范围",
    title: "가설을 세우고,\nQA와 UT의 근거로 검증합니다", chineseTitle: "提出假设，并以QA与用户测试证据进行验证",
    note: <SpeakerNote lead="이 수업에서는 외부 배포를 요구하지 않습니다. QA와 UT로 가설을 검증합니다." points={["먼저 AI 기능이 누구의 어떤 문제를 어떻게 줄일 것인지 가설을 세웁니다.", "QA에서는 팀원이 테스트 케이스를 실행하고 오류, 예외 상황, AI 응답 품질, 지연시간과 실패율을 기록합니다.", "UT에서는 참여자가 정해진 과업을 수행하고 성공 여부, 시간, 막힌 지점과 의견을 기록합니다.", "참여자 구성과 테스트 범위는 결과 해석의 한계로 함께 적습니다.", "수집한 근거로 기능이 의도대로 작동하는지, 사용 흐름에 어떤 문제가 있는지 판단하고 수정합니다. 수업 범위를 넘는 효과가 입증됐다고 주장하지 않습니다."]} transition="이 범위 안에서 주차별 개발과 검증을 어떻게 진행하는지 살펴보겠습니다." />,
    chineseNote: "本课程不要求外部部署。通过QA和用户测试验证假设，并说明验证局限。",
    content: <div className="evidence-layout evidence-layout-clear"><div className="evidence-word"><strong>검증</strong><span>驗證 · EVIDENCE</span></div><div className="evidence-flow evidence-flow-clear">{[[Target, "가설", "假设", "AI 기능이 누구의 어떤 문제를 줄일지 적습니다.", "说明AI功能将减少谁的什么问题。"], [Ruler, "QA", "质量保证", "팀이 오류·AI 품질·성능을 점검합니다.", "团队检查错误、AI质量与性能。"], [TestTube2, "UT", "用户测试", "과업 수행 과정과 반응을 관찰합니다.", "观察任务执行过程与反馈。"], [ChevronRight, "결과·한계", "结果·局限", "근거로 수정하고 검증 범위의 한계를 적습니다.", "根据证据修改，并说明验证范围的局限。"]].map(([Icon, item, chinese, detail, chineseDetail], i) => { const StepIcon = Icon as typeof Target; return <div key={item as string}><span><StepIcon /></span><p>{item as string}<small>{chinese as string}</small></p><em>{detail as string}<small>{chineseDetail as string}</small></em>{i < 3 && <ChevronRight className="flow-arrow" />}</div>; })}</div></div>,
  },
  {
    index: "19", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "1~5주: 문제와 가설을 정하고\nAI 기능 구현을 시작합니다", chineseTitle: "第1~5周：明确问题与假设，开始实现AI功能",
    note: <SpeakerNote lead="1주차부터 5주차까지는 프로젝트의 출발점을 정리하고, 이번 학기에 검증할 가설과 AI 기능을 구체화합니다." points={["1주차에는 수업 운영과 평가 방식을 확인하고, 프로젝트Ⅰ 수강 여부와 각자의 프로젝트 경험 또는 개발 아이디어를 공유합니다. 과제는 팀과 개인 역할을 정리하는 것입니다.", "2주차에는 팀별로 프로젝트Ⅰ 결과물, 해결하려는 문제, 대상 사용자, 구현 상태를 시연합니다. 과제는 프로젝트 현황 1페이지와 저장소·데모 링크 제출입니다.", "3주차에는 사용자 문제를 근거로 검증 가능한 가설을 세우고 필요한 데이터와 검증 방법을 정합니다. 과제는 가설·근거·검증 방법을 담은 검증 계획서 1차본입니다.", "4주차에는 기존 모델이나 API의 기준 성능을 측정하고 이번 학기 구현 범위를 확정합니다. 과제는 기준선 결과표와 MVP 기능 명세입니다.", "5주차에는 가장 중요한 AI 기능을 구현하고 입력·출력·예외 상황을 확인합니다. 과제는 동작 화면, 코드 커밋, 남은 이슈를 포함한 개발 체크포인트입니다."]} transition="6주차부터는 AI 기능을 서비스에 연결하고 중간 발표와 QA를 준비합니다." />,
    chineseNote: "第1~5周整理项目现状，提出可验证的假设，确定MVP范围并开始实现AI功能。",
    content: <div className="week-plan">{[["01", "OT·팀 출발점 확인", "课程说明·确认团队起点", "팀 구성·개인 역할 정리", "整理团队与个人角色"], ["02", "프로젝트 현황 발표", "汇报项目现状", "현황 1쪽 + 저장소·데모 링크", "现状1页 + 代码库·演示链接"], ["03", "문제 근거·가설·검증 설계", "问题依据·假设·验证设计", "검증 계획서 1차본", "验证计划书初稿"], ["04", "기준선 측정·MVP 확정", "测量基线·确定MVP", "기준선 결과표 + 기능 명세", "基线结果表 + 功能说明"], ["05", "AI 기능 구현 1", "实现AI功能 1", "동작 화면 + 코드 + 이슈 목록", "运行画面 + 代码 + 问题清单"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "20", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "6~10주: 서비스로 연결하고\n중간 발표와 QA를 진행합니다", chineseTitle: "第6~10周：连接服务，进行期中汇报与QA",
    note: <SpeakerNote lead="6주차부터 10주차까지는 AI 기능을 서비스의 사용 흐름에 연결하고, 중간 발표 뒤 두 단계의 QA를 진행합니다." points={["6주차에는 데이터 또는 사용자 입력이 AI 기능을 거쳐 화면의 결과로 이어지는 전체 흐름을 연결합니다. 과제는 처음부터 끝까지 동작하는 화면 녹화와 실행 방법입니다.", "7주차에는 중간 발표 전 점검을 진행하고 정상·오류·경계 상황을 포함한 QA 시나리오를 작성합니다. 과제는 테스트 케이스와 발견한 버그 목록입니다.", "8주차 중간 발표에서는 문제, 가설, 구현 범위, AI 기능, 현재 데모를 시연합니다. 과제는 발표 자료, 데모 링크, 받은 피드백과 수정 계획입니다.", "9주차에는 기능 QA를 진행해 화면, 입력, API 연결, 저장, 예외 처리의 오류를 재현하고 수정합니다. 과제는 테스트 결과와 수정 전후 상태가 담긴 QA 기록 1차본입니다.", "10주차에는 AI 품질과 성능 QA를 진행해 정확도 또는 응답 품질, 지연시간, 실패율, 비용을 점검합니다. 과제는 평가 데이터셋, 측정 결과표, 남은 위험 목록입니다."]} transition="11주차부터는 UT를 설계하고 진행합니다." />,
    chineseNote: "第6~10周把AI功能接入完整服务流程，完成期中演示，并分别进行功能QA与AI质量、性能QA。",
    content: <div className="week-plan">{[["06", "AI 기능·화면 통합", "整合AI功能与界面", "전체 흐름 영상 + 실행 방법", "完整流程视频 + 运行方法"], ["07", "중간 점검·QA 설계", "期中检查·QA设计", "테스트 케이스 + 버그 목록", "测试用例 + 缺陷清单"], ["08", "중간 발표·데모", "期中汇报·演示", "발표 자료 + 피드백·수정 계획", "汇报资料 + 反馈·修改计划"], ["09", "기능 QA", "功能QA", "QA 기록 1차본", "QA记录初稿"], ["10", "AI 품질·성능 QA", "AI质量·性能QA", "평가 데이터 + 측정 결과표", "评估数据 + 测量结果表"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "21", eyebrow: "15주 프로젝트 흐름", chineseEyebrow: "15周项目流程",
    title: "11~15주: UT로 사용 흐름을 확인하고\n최종 결과물을 완성합니다", chineseTitle: "第11~15周：通过用户测试检查使用流程并完成最终成果",
    note: <SpeakerNote lead="11주차부터 15주차까지는 UT를 진행하고 결과를 반영해 최종 서비스를 완성합니다." points={["11주차에는 가설에 맞는 과업, 질문, 기록 항목을 정합니다. 과제는 UT 계획서, 진행 대본, 과업지입니다.", "12주차에는 1차 UT를 진행합니다. 진행자는 설명으로 도와주지 않고 참여자의 성공 여부, 시간, 오류, 멈춘 지점과 발화를 기록합니다. 과제는 익명화한 원자료와 관찰 기록입니다.", "13주차에는 추가 UT를 진행하고 결과를 분석합니다. QA와 UT 데이터를 함께 보며 기능과 사용 흐름의 문제, 수정 우선순위를 정합니다. 과제는 발견점, 근거, 개선 항목과 검증 한계를 정리한 결과표입니다.", "14주차에는 우선순위가 높은 문제를 수정하고 최종 후보 버전을 통합합니다. 과제는 수정 전후 비교, 최종 데모 링크, 보고서 초안입니다.", "15주차에는 문제와 가설, 구현, QA, UT, 근거에 따른 수정 결과와 검증 한계를 시연합니다. 최종 과제는 서비스, 코드·모델·실행 문서, QA 기록, UT 결과, 최종 발표 자료, 개인 기여 기록입니다."]} transition="이제 각 결과물이 성적에 어떻게 반영되는지 설명하겠습니다." />,
    chineseNote: "第11~15周实施用户测试，结合QA结果修改服务，并明确验证局限。",
    content: <div className="week-plan">{[["11", "UT 설계·준비", "用户测试设计·准备", "계획서 + 대본 + 과업지", "计划书 + 主持稿 + 任务单"], ["12", "UT 1차", "用户测试第1轮", "익명 원자료 + 관찰 기록", "匿名原始数据 + 观察记录"], ["13", "추가 UT·결과 분석", "追加测试·结果分析", "결과표 + 개선 우선순위 + 한계", "结果表 + 改进优先级 + 局限"], ["14", "수정·최종 통합", "修改·最终整合", "수정 전후 비교 + 보고서 초안", "修改前后对比 + 报告初稿"], ["15", "최종 발표·시연", "期末汇报·演示", "서비스·문서·검증 결과", "服务·文档·验证结果"]].map(([week, activity, chineseActivity, task, chineseTask]) => <article key={week}><span>{week}주</span><div><strong>{activity}</strong><small>{chineseActivity}</small></div><div><b>주차 과제</b><p>{task}<small>{chineseTask}</small></p></div></article>)}</div>,
  },
  {
    index: "22", eyebrow: "평가 방법", chineseEyebrow: "评价方式",
    title: "결과물뿐 아니라 개발 과정과\n가설을 검증한 근거를 함께 평가합니다", chineseTitle: "不仅评价成果，也评价开发过程与验证假设的证据",
    note: <SpeakerNote lead="평가는 팀 결과물과 개인의 참여·기여를 함께 봅니다. 아래 비율은 이번 학기 평가안이며, 각 항목은 제출된 자료를 근거로 평가합니다." points={["출석과 수업 참여 10%는 출결, 팀 활동 참여, 피드백 반영 태도를 봅니다.", "주차별 과제와 개발 기록 20%는 기한 내 제출 여부뿐 아니라 코드 커밋, 회의·실험 기록, 맡은 역할의 수행 내용을 봅니다.", "중간 발표와 데모 20%는 문제와 가설의 명확성, 구현 진척도, 데모 완성도, 피드백 이후 수정 계획을 평가합니다.", "QA와 UT 20%는 테스트 설계, 원자료와 기록, 발견한 문제, 수정 내용, 참여자 구성과 검증 한계를 평가합니다.", "최종 결과물과 발표 30%는 AI 기능과 서비스의 완성도, 재현 가능성, 최종 시연, 문서 품질을 평가합니다.", "팀 점수만으로 평가하지 않습니다. 개인 역할 기록, 코드·문서 기여, 발표와 동료평가를 함께 확인해 개인 점수에 반영합니다."]} transition="마지막으로 다음 주에 제출하고 발표할 내용을 확인하겠습니다." />,
    chineseNote: "评价包括出勤参与10%、每周作业与开发记录20%、期中汇报20%、QA与用户测试20%、最终成果与汇报30%，并结合个人贡献调整。",
    content: <div className="grading-layout"><div className="grading-cards">{[["10%", "출석·수업 참여", "出勤·课堂参与"], ["20%", "주차별 과제·개발 기록", "每周作业·开发记录"], ["20%", "중간 발표·데모", "期中汇报·演示"], ["20%", "QA·UT", "QA·用户测试"], ["30%", "최종 결과물·발표", "最终成果·汇报"]].map(([weight, item, chinese]) => <article key={item}><strong>{weight}</strong><span>{item}<small>{chinese}</small></span></article>)}</div><div className="grading-rule"><span>개인 점수 반영 · 个人成绩</span><strong>역할 기록 + 코드·문서 기여 + 발표 + 동료평가</strong><small>角色记录 + 代码与文档贡献 + 汇报 + 同伴评价</small></div></div>,
  },
  {
    index: "23", eyebrow: "다음 주 준비", chineseEyebrow: "下周准备",
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
