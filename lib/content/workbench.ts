import { getLocalizedRecord } from "@/lib/content/localize";
import type { ContentRecord, SiteLanguage } from "@/lib/content/types";

export function stripOrdinalTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

export function getUseCaseLabel(useCase: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    "repo-onboarding": { ko: "기존 프로젝트 투입", en: "Existing Project Onboarding" },
    "ui-polish": { ko: "UI 개선", en: "UI Polish" },
    "d3-execution": { ko: "D3 구현", en: "D3 Execution" },
    "review-qa": { ko: "리뷰/QA", en: "Review / QA" },
    "browser-verification": { ko: "브라우저 검증", en: "Browser Verification" },
    "agent-orchestration": { ko: "에이전트 오케스트레이션", en: "Agent Orchestration" },
    "teaching-kit": { ko: "강의 운영", en: "Teaching Kit" },
    "role-templates": { ko: "역할 프롬프트", en: "Role Templates" },
    "workflow-playbook": { ko: "실행 플레이북", en: "Workflow Playbook" },
    reference: { ko: "레퍼런스", en: "Reference" }
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
    ready: { ko: "즉시 복붙", en: "Copy Ready" },
    guided: { ko: "가이드 필요", en: "Guided" },
    reference: { ko: "레퍼런스", en: "Reference" }
  };

  const resolved = labels[readiness] ?? { ko: readiness, en: readiness };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function getWorkflowLabel(group: string, language: SiteLanguage) {
  const labels: Record<string, { ko: string; en: string }> = {
    "existing-repo-flow": { ko: "기존 프로젝트 플로우", en: "Existing Repo Flow" },
    "ui-studio": { ko: "UI 스튜디오", en: "UI Studio" },
    "d3-lab": { ko: "D3 랩", en: "D3 Lab" },
    "agent-roles": { ko: "역할 세트", en: "Role Set" },
    "one-hour-lab": { ko: "1시간 강의 플로우", en: "One-hour Lab" },
    "orchestration-lab": { ko: "오케스트레이션 랩", en: "Orchestration Lab" },
    "evidence-base": { ko: "근거 베이스", en: "Evidence Base" },
    general: { ko: "일반", en: "General" }
  };

  const resolved = labels[group] ?? { ko: group, en: group };
  return language === "ko" ? resolved.ko : resolved.en;
}

export function buildCopyPayload(record: ContentRecord, language: SiteLanguage, withContext = false) {
  const localized = getLocalizedRecord(record, language);

  if (!withContext) {
    return record.promptBlock ?? localized.body;
  }

  return [
    `# ${stripOrdinalTitle(localized.title)}`,
    "",
    `Summary: ${localized.summary}`,
    localized.situationLead ? `Situation: ${localized.situationLead}` : null,
    "",
    "Prompt:",
    record.promptBlock ?? localized.body
  ]
    .filter(Boolean)
    .join("\n");
}
