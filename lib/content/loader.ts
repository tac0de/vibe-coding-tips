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
import type { ContentKind, ContentLink, ContentMeta, ContentRecord } from "@/lib/content/types";

const ROOT = process.cwd();
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

  const sourceMatch = body.match(/- 왜 지금 보는지:\s*(?:\r?\n)+\s*-\s+(.+)/);
  if (sourceMatch?.[1]) return sourceMatch[1].trim();

  return (
    extractLeadLineFromSection(body, "상황") ??
    extractLeadLineFromSection(body, "왜 지금 보는지") ??
    summary
  );
}

async function loadAllContentRaw() {
  const records = await Promise.all(
    CONTENT_TARGETS.flatMap(({ dir, route }) =>
      walk(path.join(ROOT, dir)).map(async (filePath) => {
        const relativePath = path.relative(path.join(ROOT, dir), filePath);
        const source = fs.readFileSync(filePath, "utf8");
        const parsed = matter(source);
        const baseMeta = sanitizeMeta(parsed.data);
        const normalizedBody = stripLeadingTitle(parsed.content);
        const rewrittenBody = rewriteInternalLinks(normalizedBody);
        const inferredOrder = inferOrder(relativePath);
        const meta = {
          ...baseMeta,
          summary: normalizeSummary(baseMeta.summary, rewrittenBody),
          order: baseMeta.order ?? inferredOrder
        };
        const displayBody =
          meta.kind === "prompt" && extractPromptBlock(rewrittenBody)
            ? removeSection(rewrittenBody, "바로 복붙할 프롬프트")
            : rewrittenBody;
        const html = await renderMarkdown(displayBody);
        const routeParts = normalizeRouteParts(route, relativePath);

        return {
          ...meta,
          slug: routeParts.slice(1),
          route: `/${routeParts.join("/")}`,
          path: filePath,
          body: rewrittenBody,
          html,
          toc: extractToc(displayBody),
          promptBlock: meta.kind === "prompt" ? extractPromptBlock(rewrittenBody) : null,
          nextReference: meta.next ?? extractNextFromBody(rewrittenBody),
          summaryPoints: extractBulletSummary(rewrittenBody, "좋은 출력의 기준"),
          failurePoints: extractBulletSummary(rewrittenBody, "실패 패턴")
        };
      })
    )
  );

  const byTitle = new Map<string, string>();
  const byPath = new Map<string, string>();

  for (const record of records) {
    byTitle.set(record.title.toLowerCase(), record.route);
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

      const relatedRoutes: ContentLink[] = (record.related ?? [])
        .map((entry) => resolveReference(entry))
        .filter(Boolean)
        .map((route) => {
          const target = records.find((item) => item.route === route)!;
          return {
            title: target.title,
            route: target.route,
            summary: target.summary,
            kind: target.kind,
            domain: target.domain
          };
        });

      if (relatedRoutes.length === 0) {
        records
          .filter((item) => item.route !== record.route && item.kind === record.kind && item.domain === record.domain)
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
          .slice(0, 3)
          .forEach((item) =>
            relatedRoutes.push({
              title: item.title,
              route: item.route,
              summary: item.summary,
              kind: item.kind,
              domain: item.domain
            })
          );
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
        prevLink: prevTarget
          ? {
              title: prevTarget.title,
              route: prevTarget.route,
              summary: prevTarget.summary,
              kind: prevTarget.kind,
              domain: prevTarget.domain
            }
          : null,
        nextLink: nextTarget
          ? {
              title: nextTarget.title,
              route: nextTarget.route,
              summary: nextTarget.summary,
              kind: nextTarget.kind,
              domain: nextTarget.domain
            }
          : null,
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
