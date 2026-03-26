import { getLocalizedLink, getLocalizedRecord } from "@/lib/content/localize";
import type { ContentLink, ContentRecord, SiteLanguage } from "@/lib/content/types";

type WarRoomScenario = {
  id: string;
  labels: Record<SiteLanguage, string>;
  summary: Record<SiteLanguage, string>;
  risks: Record<SiteLanguage, string>;
  dossierTitle: Record<SiteLanguage, string>;
  dossierSummary: Record<SiteLanguage, string>;
};

type DossierChapter = {
  id: string;
  title: string;
  docs: ContentRecord[];
};

export function stripOrdinalTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

export const WAR_ROOM_SCENARIOS: WarRoomScenario[] = [
  {
    id: "scss-swamp",
    labels: { ko: "SCSS swamp", en: "SCSS swamp" },
    summary: {
      ko: "중첩, 전역 클래스, 불명확한 상태 스타일 때문에 CSS 계층이 무너진 코드베이스를 해체한다.",
      en: "Break down a codebase where nested SCSS, global classes, and state styling have collapsed the CSS hierarchy."
    },
    risks: {
      ko: "리스크: 전역 부작용, specificity 전쟁, 컴포넌트 경계 불명확",
      en: "Risk: global side effects, specificity wars, fuzzy component boundaries"
    },
    dossierTitle: {
      ko: "SCSS to componentized styling dossier",
      en: "SCSS to componentized styling dossier"
    },
    dossierSummary: {
      ko: "진단, 스타일 경계 분리, 컴포넌트화, 검증까지 한 번에 묶은 긴 프롬프트 세트.",
      en: "Long-form prompt set covering diagnosis, styling boundaries, componentization, and verification."
    }
  },
  {
    id: "css-module-migration",
    labels: { ko: "CSS module migration", en: "CSS module migration" },
    summary: {
      ko: "레거시 페이지와 섞인 스타일 체계를 모듈형/토큰형 구조로 옮긴다.",
      en: "Move a legacy page-and-style system into modular, tokenized architecture."
    },
    risks: {
      ko: "리스크: 구조를 안 읽고 치환부터 시작하면 회귀가 폭발",
      en: "Risk: regressions explode if you start replacing before mapping structure"
    },
    dossierTitle: {
      ko: "Legacy page to React sections dossier",
      en: "Legacy page to React sections dossier"
    },
    dossierSummary: {
      ko: "페이지 분해, 섹션 경계, 스타일 모듈화, 작은 패치 전략을 묶는다.",
      en: "Bundle page decomposition, section boundaries, style modularization, and small-patch execution."
    }
  },
  {
    id: "legacy-component-split",
    labels: { ko: "legacy component decomposition", en: "legacy component decomposition" },
    summary: {
      ko: "거대한 UI 조각을 섹션/컴포넌트 단위로 쪼개고 API를 정리한다.",
      en: "Split oversized UI chunks into sections/components and clean up APIs."
    },
    risks: {
      ko: "리스크: props 오염, 상태 누수, 디자인 시스템 없이 조각만 늘어남",
      en: "Risk: prop sprawl, state leaks, and fragmentation without a design system"
    },
    dossierTitle: {
      ko: "Component decomposition dossier",
      en: "Component decomposition dossier"
    },
    dossierSummary: {
      ko: "계층 재설계, 컴포넌트 API 정리, 모바일 붕괴 방지용 프롬프트 묶음.",
      en: "Prompt bundle for hierarchy redesign, component API cleanup, and preventing mobile collapse."
    }
  },
  {
    id: "d3-retrofit",
    labels: { ko: "D3 in old UI", en: "D3 in old UI" },
    summary: {
      ko: "기존 대시보드/레거시 DOM 위에 D3를 얹거나 분리할 때 쓰는 전장.",
      en: "Use this when embedding or isolating D3 on top of an existing dashboard or legacy DOM."
    },
    risks: {
      ko: "리스크: React 경계 붕괴, resize 누락, interaction QA 부재",
      en: "Risk: broken React boundaries, missing resize handling, and no interaction QA"
    },
    dossierTitle: {
      ko: "D3 retrofit into existing dashboard dossier",
      en: "D3 retrofit into existing dashboard dossier"
    },
    dossierSummary: {
      ko: "D3 도입 판단, boundary, scale, interaction, QA를 긴 흐름으로 묶는다.",
      en: "Bundle D3 fit judgment, boundaries, scales, interaction, and QA into one long flow."
    }
  }
];

export function getUseCaseLabel(useCase: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    "repo-onboarding": { ko: "기존 프로젝트 투입", en: "Existing Project Onboarding" },
    "ui-polish": { ko: "Legacy UI migration", en: "Legacy UI migration" },
    "d3-execution": { ko: "D3 migration", en: "D3 migration" },
    "review-qa": { ko: "Review / QA", en: "Review / QA" },
    "browser-verification": { ko: "Browser verification", en: "Browser verification" },
    "agent-orchestration": { ko: "Agent orchestration", en: "Agent orchestration" },
    "teaching-kit": { ko: "Teaching kit", en: "Teaching kit" },
    "role-templates": { ko: "Role templates", en: "Role templates" },
    "workflow-playbook": { ko: "Workflow playbook", en: "Workflow playbook" },
    reference: { ko: "Reference", en: "Reference" }
  };

  const resolved = labels[useCase] ?? { ko: useCase, en: useCase };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getRoleLabel(role: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    builder: { ko: "Builder", en: "Builder" },
    reviewer: { ko: "Reviewer", en: "Reviewer" },
    explorer: { ko: "Explorer", en: "Explorer" },
    "browser-verifier": { ko: "Browser Verifier", en: "Browser Verifier" },
    orchestrator: { ko: "Orchestrator", en: "Orchestrator" },
    instructor: { ko: "Instructor", en: "Instructor" },
    reference: { ko: "Reference", en: "Reference" },
    operator: { ko: "Operator", en: "Operator" }
  };

  const resolved = labels[role] ?? { ko: role, en: role };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getDifficultyLabel(difficulty: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    starter: { ko: "Starter", en: "Starter" },
    intermediate: { ko: "Intermediate", en: "Intermediate" },
    advanced: { ko: "Advanced", en: "Advanced" }
  };

  const resolved = labels[difficulty] ?? { ko: difficulty, en: difficulty };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getReadinessLabel(readiness: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    ready: { ko: "Copy ready", en: "Copy ready" },
    guided: { ko: "Guided", en: "Guided" },
    reference: { ko: "Reference", en: "Reference" }
  };

  const resolved = labels[readiness] ?? { ko: readiness, en: readiness };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getWorkflowLabel(group: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    "existing-repo-flow": { ko: "Migration run", en: "Migration run" },
    "ui-studio": { ko: "Style surgery", en: "Style surgery" },
    "d3-lab": { ko: "D3 war lane", en: "D3 war lane" },
    "agent-roles": { ko: "Role set", en: "Role set" },
    "one-hour-lab": { ko: "Workshop lane", en: "Workshop lane" },
    "orchestration-lab": { ko: "Orchestration war room", en: "Orchestration war room" },
    "evidence-base": { ko: "Evidence base", en: "Evidence base" },
    general: { ko: "Archive", en: "Archive" }
  };

  const resolved = labels[group] ?? { ko: group, en: group };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getRiskLabel(level: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    low: { ko: "Low risk", en: "Low risk" },
    medium: { ko: "Medium risk", en: "Medium risk" },
    high: { ko: "High risk", en: "High risk" },
    critical: { ko: "Critical risk", en: "Critical risk" }
  };

  const resolved = labels[level] ?? { ko: level, en: level };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getScenarioLabel(id: string, language: SiteLanguage) {
  const scenario = WAR_ROOM_SCENARIOS.find((entry) => entry.id === id);
  return scenario ? scenario.labels[language] : id;
}

export function getArtifactTypeLabel(type: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    dossier: { ko: "Dossier", en: "Dossier" },
    prompt: { ko: "Prompt", en: "Prompt" },
    playbook: { ko: "Playbook", en: "Playbook" },
    reference: { ko: "Reference", en: "Reference" }
  };

  const resolved = labels[type] ?? { ko: type, en: type };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getLegacySurfaceLabel(surface: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    scss: { ko: "SCSS", en: "SCSS" },
    "global-css": { ko: "Global CSS", en: "Global CSS" },
    "jquery-dom": { ko: "Legacy DOM / jQuery", en: "Legacy DOM / jQuery" },
    "mixed-react-dom": { ko: "Mixed React + DOM", en: "Mixed React + DOM" },
    "mixed-references": { ko: "Reference set", en: "Reference set" }
  };

  const resolved = labels[surface] ?? { ko: surface, en: surface };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getTargetArchitectureLabel(target: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    "componentized-react": { ko: "Componentized React", en: "Componentized React" },
    "css-modules": { ko: "CSS Modules", en: "CSS Modules" },
    "tokenized-system": { ko: "Tokenized system", en: "Tokenized system" },
    "isolated-d3": { ko: "Isolated D3 boundary", en: "Isolated D3 boundary" }
  };

  const resolved = labels[target] ?? { ko: target, en: target };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function buildCopyPayload(record: ContentRecord, language: SiteLanguage, withContext = false) {
  const localized = getLocalizedRecord(record, language);

  if (!withContext) {
    return record.promptBlock ?? localized.body;
  }

  return [
    `# ${stripOrdinalTitle(localized.title)}`,
    `Scenario: ${getScenarioLabel(record.scenario, language)}`,
    `Legacy surface: ${getLegacySurfaceLabel(record.legacySurface, language)}`,
    `Target architecture: ${getTargetArchitectureLabel(record.targetArchitecture, language)}`,
    "",
    `Summary: ${localized.summary}`,
    localized.situationLead ? `When to use: ${localized.situationLead}` : null,
    "",
    "Prompt:",
    record.promptBlock ?? localized.body
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildDossierBundlePayload(title: string, chapters: DossierChapter[], language: SiteLanguage) {
  return [
    `# ${title}`,
    "",
    ...chapters.flatMap((chapter) => [
      `## ${chapter.title}`,
      "",
      ...chapter.docs.flatMap((doc) => {
        const localized = getLocalizedRecord(doc, language);
        return [
          `### ${stripOrdinalTitle(localized.title)}`,
          doc.promptBlock ?? localized.body,
          ""
        ];
      })
    ])
  ].join("\n");
}

export function getScenarioDefinition(id: string) {
  return WAR_ROOM_SCENARIOS.find((entry) => entry.id === id);
}

export function getScenarioRecords(all: ContentRecord[], scenario: string) {
  return all
    .filter((item) => item.scenario === scenario && item.archive === false)
    .sort((a, b) => Number(b.isDossier) - Number(a.isDossier) || (a.order ?? 999) - (b.order ?? 999));
}

export function getScenarioLead(all: ContentRecord[], scenario: string) {
  return getScenarioRecords(all, scenario).find((item) => item.isDossier) ?? getScenarioRecords(all, scenario)[0] ?? null;
}

export function getScenarioVerificationSet(all: ContentRecord[], scenario: string) {
  return all
    .filter(
      (item) =>
        item.archive === false &&
        (item.scenario === "verification-gate" ||
          item.useCase === "browser-verification" ||
          item.useCase === "review-qa" ||
          (item.scenario === scenario && item.riskLevel !== "low"))
    )
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 4);
}

export function getArchiveRecords(all: ContentRecord[]) {
  return all.filter((item) => item.archive).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function buildDossierChapters(record: ContentRecord, all: ContentRecord[], language: SiteLanguage): DossierChapter[] {
  const inScenario = all
    .filter((item) => item.scenario === record.scenario && item.archive === false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const verificationSet = getScenarioVerificationSet(all, record.scenario);
  const orchestrationSet = all
    .filter((item) => item.useCase === "agent-orchestration" && item.archive === false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 3);

  const pick = (predicate: (item: ContentRecord) => boolean, fallback: ContentRecord[]) => {
    const matched = inScenario.filter(predicate);
    return matched.length > 0 ? matched.slice(0, 3) : fallback.slice(0, 3);
  };

  const chapters: DossierChapter[] = [
    {
      id: "diagnostic",
      title: language === "ko" ? "Diagnostic prompts" : "Diagnostic prompts",
      docs: pick(
        (item) =>
          item.useCase === "repo-onboarding" ||
          item.path.endsWith("accessibility-audit.md") ||
          item.path.endsWith("01-read-existing-repo.md"),
        inScenario
      )
    },
    {
      id: "plan",
      title: language === "ko" ? "Migration plan prompts" : "Migration plan prompts",
      docs: pick(
        (item) =>
          item.path.endsWith("02-lock-scope.md") ||
          item.path.endsWith("design-system-extract.md") ||
          item.path.endsWith("component-api-cleanup.md") ||
          item.path.endsWith("09-react-d3-boundary.md"),
        inScenario
      )
    },
    {
      id: "refactor",
      title: language === "ko" ? "Refactor prompts" : "Refactor prompts",
      docs: pick(
        (item) =>
          item.path.endsWith("04-first-small-patch.md") ||
          item.path.endsWith("tailwind-cleanup.md") ||
          item.path.endsWith("landing-first-screen.md") ||
          item.path.endsWith("04-structure-data-join.md"),
        inScenario
      )
    },
    {
      id: "verification",
      title: language === "ko" ? "Verification prompts" : "Verification prompts",
      docs: verificationSet
    },
    {
      id: "escalation",
      title: language === "ko" ? "Escalation prompts" : "Escalation prompts",
      docs: orchestrationSet
    }
  ];

  return chapters.filter((chapter) => chapter.docs.length > 0);
}

export function getLinkText(link: ContentLink, language: SiteLanguage) {
  const localized = getLocalizedLink(link, language);
  return {
    title: stripOrdinalTitle(localized.title),
    summary: localized.summary
  };
}
