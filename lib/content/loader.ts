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
  ContentKind,
  ContentLink,
  ContentMeta,
  ContentRecord,
  LocalizedContentData
} from "@/lib/content/types";

type RawContentRecord = Omit<
  ContentRecord,
  "nextRoute" | "nextLink" | "prevLink" | "sequenceIndex" | "sequenceTotal" | "sequenceLinks" | "relatedRoutes"
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

function sanitizeMeta(raw: Record<string, unknown>): ContentMeta {
  return {
    title: String(raw.title ?? "Untitled"),
    kind: (raw.kind as ContentKind) ?? "guide",
    domain: String(raw.domain ?? "ops"),
    summary: String(raw.summary ?? ""),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
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

        const meta = {
          ...baseMeta,
          summary: localizedKo.summary,
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
          .filter((item) => item.route !== record.route && item.kind === record.kind && item.domain === record.domain)
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
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

      return {
        ...record,
        nextRoute,
        prevLink: prevTarget ? toLink(prevTarget) : null,
        sequenceIndex: currentIndex >= 0 ? currentIndex + 1 : null,
        sequenceTotal: orderedPeers.length > 0 ? orderedPeers.length : null,
        sequenceLinks,
        nextLink: nextTarget ? toLink(nextTarget) : null,
        relatedRoutes
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
