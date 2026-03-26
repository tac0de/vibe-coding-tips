import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  extractBulletSummary,
  extractLeadLineFromSection,
  extractNextFromBody,
  extractPromptBlock,
  extractToc,
  removeSection,
  renderMarkdown,
  rewriteInternalLinks,
  stripLeadingTitle
} from "@/lib/content/markdown";
import type {
  ContentArtifactType,
  ContentCopyReadiness,
  ContentDifficulty,
  ContentKind,
  ContentLink,
  ContentMeta,
  ContentRecord,
  ContentRiskLevel,
  LocalizedContentData
} from "@/lib/content/types";

type RawContentRecord = Omit<
  ContentRecord,
  | "nextRoute"
  | "nextLink"
  | "prevLink"
  | "sequenceIndex"
  | "sequenceTotal"
  | "sequenceLinks"
  | "relatedRoutes"
  | "dossierLinks"
  | "variantLinks"
  | "verificationLinks"
> & {
  nextReference: string | null;
};

const ROOT = process.cwd();
const LOCALE_ROOT = path.join(ROOT, "locales");
const CONTENT_TARGETS = [
  { dir: "prompts", route: "prompts" },
  { dir: "playbooks", route: "playbooks" },
  { dir: "sources", route: "sources" }
] as const;

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function normalizeRouteParts(targetRoute: string, relativePath: string) {
  const withoutExt = relativePath.replace(/\.md$/, "");
  return [targetRoute, ...withoutExt.split(path.sep)];
}

function inferOrder(relativePath: string) {
  const match = path.basename(relativePath).match(/^(\d+)[-_]/);
  return match ? Number(match[1]) : undefined;
}

function inferUseCase(dir: string, relativePath: string, kind: ContentKind, domain: string) {
  const file = relativePath.toLowerCase();

  if (kind === "source") return "reference";
  if (file.includes("review") || file.includes("accessibility")) return "review-qa";
  if (file.includes("browser")) return "browser-verification";
  if (file.includes("one-hour") || file.includes("instructor") || file.includes("handout")) return "teaching-kit";
  if (file.includes("orchestration") || file.includes("mcp")) return "agent-orchestration";
  if (file.includes("tailwind") || domain === "ui") return "ui-polish";
  if (domain === "d3" || file.includes("d3")) return "d3-execution";
  if (domain === "onboarding") return "repo-onboarding";
  if (domain === "roles") return "role-templates";
  return dir === "playbooks" ? "workflow-playbook" : "reference";
}

function inferScenario(relativePath: string, kind: ContentKind, useCase: string, domain: string) {
  const file = relativePath.toLowerCase();

  if (domain === "d3" || file.includes("d3")) {
    if (file.includes("boundary") || file.includes("where-d3-fits") || file.includes("interaction-qa")) {
      return "d3-extraction";
    }
    return "d3-retrofit";
  }

  if (domain === "ui" || file.includes("tailwind") || file.includes("scss") || file.includes("accessibility")) {
    if (file.includes("component") || file.includes("design-system") || file.includes("information-hierarchy")) {
      return "legacy-component-split";
    }
    return "scss-swamp";
  }

  if (useCase === "repo-onboarding") return "css-module-migration";
  if (useCase === "browser-verification" || useCase === "review-qa") return "verification-gate";
  if (useCase === "agent-orchestration") return "orchestration-war-room";
  if (kind === "source") return "archive-general";
  return "archive-general";
}

function inferLegacySurface(relativePath: string, scenario: string, kind: ContentKind) {
  const file = relativePath.toLowerCase();
  if (kind === "source") return "mixed-references";
  if (file.includes("scss")) return "scss";
  if (file.includes("tailwind")) return "global-css";
  if (scenario === "scss-swamp") return "global-css";
  if (scenario === "legacy-component-split" || scenario === "css-module-migration") return "mixed-react-dom";
  if (scenario === "d3-retrofit" || scenario === "d3-extraction") return "jquery-dom";
  return "mixed-react-dom";
}

function inferTargetArchitecture(relativePath: string, scenario: string) {
  const file = relativePath.toLowerCase();
  if (file.includes("tailwind")) return "tokenized-system";
  if (scenario === "scss-swamp") return "componentized-react";
  if (scenario === "css-module-migration") return "css-modules";
  if (scenario === "legacy-component-split") return "componentized-react";
  if (scenario === "d3-retrofit") return "isolated-d3";
  if (scenario === "d3-extraction") return "isolated-d3";
  return "componentized-react";
}

function inferArtifactType(kind: ContentKind, useCase: string, scenario: string, filePath: string): ContentArtifactType {
  const file = filePath.toLowerCase();
  if (kind === "source") return "reference";
  if (kind === "playbook") return useCase === "workflow-playbook" || file.includes("one-hour") ? "playbook" : "dossier";
  if (
    scenario === "scss-swamp" ||
    scenario === "css-module-migration" ||
    scenario === "legacy-component-split" ||
    scenario === "d3-retrofit" ||
    scenario === "d3-extraction"
  ) {
    return "dossier";
  }
  return "prompt";
}

function inferRiskLevel(relativePath: string, scenario: string, useCase: string): ContentRiskLevel {
  const file = relativePath.toLowerCase();
  if (file.includes("regression") || file.includes("orchestration") || file.includes("failure")) return "critical";
  if (scenario === "d3-retrofit" || scenario === "d3-extraction" || useCase === "browser-verification") return "high";
  if (scenario === "scss-swamp" || scenario === "legacy-component-split") return "medium";
  return "low";
}

function inferVariantGroup(relativePath: string, scenario: string) {
  const file = relativePath.toLowerCase();
  if (scenario === "scss-swamp") {
    if (file.includes("tailwind")) return "utility-migration";
    if (file.includes("design-system") || file.includes("component")) return "component-extraction";
    return "scss-nesting-hell";
  }
  if (scenario === "css-module-migration") return "pure-css-to-modules";
  if (scenario === "legacy-component-split") return "component-decomposition";
  if (scenario === "d3-retrofit") return file.includes("boundary") ? "d3-isolate" : "d3-embed";
  if (scenario === "d3-extraction") return "d3-isolate";
  if (scenario === "verification-gate") return "verification-set";
  return "general";
}

function inferIsDossier(kind: ContentKind, artifactType: ContentArtifactType, scenario: string, featured: boolean) {
  if (kind === "source") return false;
  if (featured) return true;
  return artifactType === "dossier" && scenario !== "archive-general";
}

function inferArchive(kind: ContentKind, scenario: string, useCase: string) {
  if (kind === "source") return true;
  return scenario === "archive-general" || useCase === "teaching-kit" || useCase === "role-templates";
}

function inferRole(relativePath: string, kind: ContentKind, domain: string) {
  const file = relativePath.toLowerCase();

  if (kind === "source") return "reference";
  if (file.includes("reviewer")) return "reviewer";
  if (file.includes("explorer")) return "explorer";
  if (file.includes("browser")) return "browser-verifier";
  if (file.includes("builder")) return "builder";
  if (file.includes("instructor") || file.includes("handout")) return "instructor";
  if (file.includes("orchestration") || file.includes("mcp")) return "orchestrator";
  if (kind === "playbook") return "operator";
  return "builder";
}

function inferDifficulty(relativePath: string, kind: ContentKind, order?: number): ContentDifficulty {
  const file = relativePath.toLowerCase();
  if (file.includes("advanced") || file.includes("performance") || file.includes("orchestration")) return "advanced";
  if (kind === "source") return "intermediate";
  if ((order ?? 0) >= 8) return "advanced";
  if ((order ?? 0) >= 4) return "intermediate";
  return "starter";
}

function inferTimeToUse(source: string, kind: ContentKind, difficulty: ContentDifficulty) {
  const wordCount = source.split(/\s+/).filter(Boolean).length;
  if (kind === "source") return 12;
  if (difficulty === "advanced") return 18;
  if (wordCount > 900) return 15;
  if (wordCount > 450) return 10;
  return 5;
}

function inferCopyReadiness(kind: ContentKind, promptBlock: string | null | undefined): ContentCopyReadiness {
  if (promptBlock) return "ready";
  if (kind === "playbook") return "guided";
  return "reference";
}

function inferWorkflowGroup(dir: string, relativePath: string, domain: string) {
  const file = relativePath.toLowerCase();

  if (file.includes("one-hour")) return "one-hour-lab";
  if (file.includes("orchestration") || file.includes("mcp")) return "orchestration-lab";
  if (domain === "onboarding") return "existing-repo-flow";
  if (domain === "ui") return "ui-studio";
  if (domain === "d3") return "d3-lab";
  if (domain === "roles") return "agent-roles";
  return dir === "sources" ? "evidence-base" : "general";
}

function inferFeatured(relativePath: string, kind: ContentKind, workflowGroup: string) {
  const file = relativePath.toLowerCase();
  if (file.includes("01-read-existing-repo")) return true;
  if (file.includes("review-and-browser-verify")) return true;
  if (file.includes("one-hour-agent-lab")) return true;
  if (file.includes("landing-first-screen")) return true;
  if (workflowGroup === "orchestration-lab") return true;
  return kind === "source" && file.includes("openai");
}

function sanitizeMeta(raw: Record<string, unknown>): ContentMeta {
  return {
    title: String(raw.title ?? "Untitled"),
    kind: (raw.kind as ContentKind) ?? "guide",
    domain: String(raw.domain ?? "ops"),
    summary: String(raw.summary ?? ""),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    useCase: String(raw.useCase ?? ""),
    role: String(raw.role ?? ""),
    scenario: String(raw.scenario ?? ""),
    legacySurface: String(raw.legacySurface ?? ""),
    targetArchitecture: String(raw.targetArchitecture ?? ""),
    artifactType: (raw.artifactType as ContentArtifactType) ?? "prompt",
    riskLevel: (raw.riskLevel as ContentRiskLevel) ?? "medium",
    variantGroup: String(raw.variantGroup ?? ""),
    isDossier: typeof raw.isDossier === "boolean" ? raw.isDossier : false,
    archive: typeof raw.archive === "boolean" ? raw.archive : false,
    difficulty: (raw.difficulty as ContentDifficulty) ?? "starter",
    timeToUse: typeof raw.timeToUse === "number" ? raw.timeToUse : 0,
    copyReadiness: (raw.copyReadiness as ContentCopyReadiness) ?? "reference",
    workflowGroup: String(raw.workflowGroup ?? ""),
    featured: typeof raw.featured === "boolean" ? raw.featured : false,
    order: typeof raw.order === "number" ? raw.order : undefined,
    next: raw.next == null ? null : String(raw.next),
    related: Array.isArray(raw.related) ? raw.related.map(String) : []
  };
}

function normalizeSummary(summary: string, body: string) {
  if (summary && !summary.startsWith("- 링크:")) return summary;

  const sourceMatch =
    body.match(/- 왜 지금 보는지:\s*(?:\r?\n)+\s*-\s+(.+)/) ??
    body.match(/- Why this matters:\s*(?:\r?\n)+\s*-\s+(.+)/);

  if (sourceMatch?.[1]) return sourceMatch[1].trim();

  return (
    extractLeadLineFromSection(body, "상황") ??
    extractLeadLineFromSection(body, "Situation") ??
    extractLeadLineFromSection(body, "왜 지금 보는지") ??
    extractLeadLineFromSection(body, "Why this matters") ??
    summary
  );
}

async function buildLocalizedData(source: string) {
  const parsed = matter(source);
  const meta = sanitizeMeta(parsed.data);
  const normalizedBody = stripLeadingTitle(parsed.content);
  const rewrittenBody = rewriteInternalLinks(normalizedBody);
  const promptTitle =
    extractPromptBlock(rewrittenBody) && rewrittenBody.includes("## 바로 복붙할 프롬프트")
      ? "바로 복붙할 프롬프트"
      : rewrittenBody.includes("## Copy-ready prompt")
        ? "Copy-ready prompt"
        : null;

  const displayBody =
    meta.kind === "prompt" && promptTitle ? removeSection(rewrittenBody, promptTitle) : rewrittenBody;

  return {
    title: meta.title,
    summary: normalizeSummary(meta.summary, rewrittenBody),
    body: rewrittenBody,
    html: await renderMarkdown(displayBody),
    toc: extractToc(displayBody),
    promptBlock: meta.kind === "prompt" ? extractPromptBlock(rewrittenBody) : null,
    situationLead:
      extractLeadLineFromSection(rewrittenBody, "상황") ??
      extractLeadLineFromSection(rewrittenBody, "Situation"),
    summaryPoints:
      extractBulletSummary(rewrittenBody, "좋은 출력의 기준").length > 0
        ? extractBulletSummary(rewrittenBody, "좋은 출력의 기준")
        : extractBulletSummary(rewrittenBody, "Good output checklist"),
    failurePoints:
      extractBulletSummary(rewrittenBody, "실패 패턴").length > 0
        ? extractBulletSummary(rewrittenBody, "실패 패턴")
        : extractBulletSummary(rewrittenBody, "Failure patterns")
  } satisfies LocalizedContentData;
}

async function loadAllContentRaw() {
  const records: RawContentRecord[] = await Promise.all(
    CONTENT_TARGETS.flatMap(({ dir, route }) =>
      walk(path.join(ROOT, dir)).map(async (filePath) => {
        const relativePath = path.relative(path.join(ROOT, dir), filePath);
        const sourceKo = fs.readFileSync(filePath, "utf8");
        const parsed = matter(sourceKo);
        const baseMeta = sanitizeMeta(parsed.data);
        const inferredOrder = inferOrder(relativePath);
        const localePathEn = path.join(LOCALE_ROOT, "en", dir, relativePath);
        const sourceEn = fs.existsSync(localePathEn) ? fs.readFileSync(localePathEn, "utf8") : sourceKo;

        const localizedKo = await buildLocalizedData(sourceKo);
        const localizedEn = await buildLocalizedData(sourceEn);
        const useCase = baseMeta.useCase || inferUseCase(dir, relativePath, baseMeta.kind, baseMeta.domain);
        const role = baseMeta.role || inferRole(relativePath, baseMeta.kind, baseMeta.domain);
        const scenario = baseMeta.scenario || inferScenario(relativePath, baseMeta.kind, useCase, baseMeta.domain);
        const legacySurface = baseMeta.legacySurface || inferLegacySurface(relativePath, scenario, baseMeta.kind);
        const targetArchitecture = baseMeta.targetArchitecture || inferTargetArchitecture(relativePath, scenario);
        const difficulty =
          typeof parsed.data.difficulty === "string"
            ? baseMeta.difficulty
            : inferDifficulty(relativePath, baseMeta.kind, inferredOrder);
        const timeToUse = baseMeta.timeToUse > 0 ? baseMeta.timeToUse : inferTimeToUse(sourceKo, baseMeta.kind, difficulty);
        const copyReadiness =
          typeof parsed.data.copyReadiness === "string"
            ? baseMeta.copyReadiness
            : inferCopyReadiness(baseMeta.kind, localizedKo.promptBlock);
        const workflowGroup = baseMeta.workflowGroup || inferWorkflowGroup(dir, relativePath, baseMeta.domain);
        const featured = typeof parsed.data.featured === "boolean" ? Boolean(parsed.data.featured) : inferFeatured(relativePath, baseMeta.kind, workflowGroup);
        const artifactType =
          typeof parsed.data.artifactType === "string"
            ? baseMeta.artifactType
            : inferArtifactType(baseMeta.kind, useCase, scenario, relativePath);
        const riskLevel =
          typeof parsed.data.riskLevel === "string"
            ? baseMeta.riskLevel
            : inferRiskLevel(relativePath, scenario, useCase);
        const variantGroup = baseMeta.variantGroup || inferVariantGroup(relativePath, scenario);
        const isDossier =
          typeof parsed.data.isDossier === "boolean" ? baseMeta.isDossier : inferIsDossier(baseMeta.kind, artifactType, scenario, featured);
        const archive = typeof parsed.data.archive === "boolean" ? baseMeta.archive : inferArchive(baseMeta.kind, scenario, useCase);

        const meta = {
          ...baseMeta,
          summary: localizedKo.summary,
          useCase,
          role,
          scenario,
          legacySurface,
          targetArchitecture,
          artifactType,
          riskLevel,
          variantGroup,
          isDossier,
          archive,
          difficulty,
          timeToUse,
          copyReadiness,
          workflowGroup,
          featured,
          order: baseMeta.order ?? inferredOrder
        };
        const routeParts = normalizeRouteParts(route, relativePath);

        return {
          ...meta,
          slug: routeParts.slice(1),
          route: `/${routeParts.join("/")}`,
          path: filePath,
          body: localizedKo.body,
          html: localizedKo.html,
          toc: localizedKo.toc,
          promptBlock: localizedKo.promptBlock,
          nextReference: meta.next ?? extractNextFromBody(localizedKo.body),
          situationLead: localizedKo.situationLead,
          summaryPoints: localizedKo.summaryPoints,
          failurePoints: localizedKo.failurePoints,
          locales: {
            ko: localizedKo,
            en: localizedEn
          }
        };
      })
    )
  );

  const byTitle = new Map<string, string>();
  const byPath = new Map<string, string>();

  for (const record of records) {
    byTitle.set(record.title.toLowerCase(), record.route);
    byTitle.set(record.locales.en.title.toLowerCase(), record.route);
    byPath.set(path.basename(record.path).toLowerCase(), record.route);
    byPath.set(record.slug.join("/").toLowerCase(), record.route);
  }

  const resolveReference = (reference?: string | null) => {
    if (!reference) return null;
    const normalized = reference.replace(/\.md$/i, "").replace(/\\/g, "/").toLowerCase().trim();
    if (normalized.startsWith("prompts/") || normalized.startsWith("playbooks/") || normalized.startsWith("sources/")) {
      return `/${normalized}`;
    }
    return byPath.get(normalized) ?? byTitle.get(normalized) ?? null;
  };

  return records
    .map((record) => {
      const orderedPeers = records
        .filter(
          (item) =>
            item.kind === record.kind &&
            item.domain === record.domain &&
            typeof item.order === "number"
        )
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      const currentIndex = orderedPeers.findIndex((item) => item.route === record.route);
      const prevTarget = currentIndex > 0 ? orderedPeers[currentIndex - 1] : null;

      const toLink = (item: RawContentRecord): ContentLink => ({
        title: item.title,
        route: item.route,
        summary: item.summary,
        kind: item.kind,
        domain: item.domain,
        useCase: item.useCase,
        role: item.role,
        scenario: item.scenario,
        legacySurface: item.legacySurface,
        targetArchitecture: item.targetArchitecture,
        artifactType: item.artifactType,
        riskLevel: item.riskLevel,
        variantGroup: item.variantGroup,
        isDossier: item.isDossier,
        archive: item.archive,
        difficulty: item.difficulty,
        timeToUse: item.timeToUse,
        copyReadiness: item.copyReadiness,
        workflowGroup: item.workflowGroup,
        featured: item.featured,
        order: item.order,
        locales: {
          ko: { title: item.locales.ko.title, summary: item.locales.ko.summary },
          en: { title: item.locales.en.title, summary: item.locales.en.summary }
        }
      });

      const sequenceLinks: ContentLink[] = orderedPeers.map(toLink);

      const relatedRoutes: ContentLink[] = (record.related ?? [])
        .map((entry) => resolveReference(entry))
        .filter(Boolean)
        .map((route) => toLink(records.find((item) => item.route === route)!));

      if (relatedRoutes.length === 0) {
        records
          .filter((item) => item.route !== record.route)
          .sort((a, b) => {
            const workflowScore =
              Number(b.workflowGroup === record.workflowGroup) - Number(a.workflowGroup === record.workflowGroup);
            const useCaseScore = Number(b.useCase === record.useCase) - Number(a.useCase === record.useCase);
            const kindScore = Number(b.kind === record.kind) - Number(a.kind === record.kind);
            const domainScore = Number(b.domain === record.domain) - Number(a.domain === record.domain);
            return workflowScore || useCaseScore || kindScore || domainScore || (a.order ?? 999) - (b.order ?? 999);
          })
          .slice(0, 3)
          .forEach((item) => relatedRoutes.push(toLink(item)));
      }

      const explicitNextRoute = resolveReference(record.nextReference);
      const sequentialNextRoute =
        record.kind === "prompt"
          ? records
              .filter(
                (item) =>
                  item.kind === record.kind &&
                  item.domain === record.domain &&
                  item.route !== record.route &&
                  typeof item.order === "number" &&
                  typeof record.order === "number" &&
                  item.order === record.order + 1
              )
              .map((item) => item.route)[0] ?? null
          : null;

      const nextRoute = explicitNextRoute ?? sequentialNextRoute;
      const nextTarget = nextRoute ? records.find((item) => item.route === nextRoute) ?? null : null;
      const dossierLinks = records
        .filter(
          (item) =>
            item.route !== record.route &&
            item.isDossier &&
            item.scenario === record.scenario &&
            item.archive === false
        )
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .slice(0, 5)
        .map(toLink);
      const variantLinks = records
        .filter(
          (item) =>
            item.route !== record.route &&
            item.scenario === record.scenario &&
            item.variantGroup === record.variantGroup
        )
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .slice(0, 5)
        .map(toLink);
      const verificationLinks = records
        .filter(
          (item) =>
            item.route !== record.route &&
            (item.scenario === "verification-gate" ||
              item.useCase === "browser-verification" ||
              item.useCase === "review-qa" ||
              item.path.endsWith("10-regression-gate.md"))
        )
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .slice(0, 5)
        .map(toLink);

      return {
        ...record,
        nextRoute,
        prevLink: prevTarget ? toLink(prevTarget) : null,
        sequenceIndex: currentIndex >= 0 ? currentIndex + 1 : null,
        sequenceTotal: orderedPeers.length > 0 ? orderedPeers.length : null,
        sequenceLinks,
        nextLink: nextTarget ? toLink(nextTarget) : null,
        relatedRoutes,
        dossierLinks,
        variantLinks,
        verificationLinks
      } satisfies ContentRecord;
    })
    .sort((a, b) => {
      if (a.kind !== b.kind) return a.kind.localeCompare(b.kind);
      if (a.domain !== b.domain) return a.domain.localeCompare(b.domain);
      return (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title);
    });
}

export async function getAllContent() {
  return loadAllContentRaw();
}

export async function getContentByKindAndSlug(kind: "prompts" | "playbooks" | "sources", slug: string[]) {
  const all = await loadAllContentRaw();
  return all.find((entry) => entry.route === `/${[kind, ...slug].join("/")}`) ?? null;
}

export async function getContentByKind(kind: ContentKind) {
  const all = await loadAllContentRaw();
  return all.filter((entry) => entry.kind === kind);
}

export async function getLibraryHomeData() {
  const all = await loadAllContentRaw();
  return {
    all,
    onboarding: all.filter((entry) => entry.kind === "prompt" && entry.domain === "onboarding"),
    roles: all.filter((entry) => entry.kind === "prompt" && entry.domain === "roles"),
    ui: all.filter((entry) => entry.kind === "prompt" && entry.domain === "ui"),
    d3: all.filter((entry) => entry.kind === "prompt" && entry.domain === "d3"),
    playbooks: all.filter((entry) => entry.kind === "playbook"),
    sources: all.filter((entry) => entry.kind === "source")
  };
}
