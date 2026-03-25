import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const SECTION_TITLES = ["바로 복붙할 프롬프트", "좋은 출력의 기준", "실패 패턴"] as const;

export async function renderMarkdown(markdown: string) {
  const processed = await remark().use(gfm).use(html, { sanitize: false }).process(markdown);
  return addHeadingIds(processed.toString());
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractToc(body: string) {
  const headings = Array.from(body.matchAll(/^##\s+(.+)$/gm));
  return headings.map((match) => ({
    id: slugify(match[1]),
    title: match[1].trim(),
    level: 2
  }));
}

export function extractSection(body: string, title: string) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^##\\s+${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|\\Z)`, "m");
  return body.match(regex)?.[1]?.trim() ?? "";
}

export function extractLeadLineFromSection(body: string, title: string) {
  const section = extractSection(body, title);
  if (!section) return null;

  const line = section
    .split(/\r?\n/)
    .map((value) => value.trim())
    .find((value) => value.startsWith("- "));

  return line ? line.replace(/^- /, "").trim() : null;
}

export function extractBulletSummary(body: string, title: string) {
  const section = extractSection(body, title);
  if (!section) return [];

  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim());
}

export function extractPromptBlock(body: string) {
  const section = extractSection(body, SECTION_TITLES[0]);
  if (!section) return null;
  const codeBlock = section.match(/```(?:txt)?\n([\s\S]*?)```/);
  return codeBlock?.[1]?.trim() ?? null;
}

export function stripLeadingTitle(body: string) {
  return body.replace(/^\s*#\s+[^\n]+\n+/, "");
}

export function removeSection(body: string, title: string) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return body.replace(new RegExp(`^##\\s+${escaped}\\s*$[\\s\\S]*?(?=^##\\s+|\\Z)`, "m"), "").trim();
}

export function extractNextFromBody(body: string) {
  const section = extractSection(body, "다음 액션");
  if (!section) return null;
  const code = section.match(/`([^`]+)`/);
  if (code?.[1]) return code[1].trim();
  const line = section
    .split(/\r?\n/)
    .map((value) => value.trim())
    .find(Boolean);
  return line ?? null;
}

export function rewriteInternalLinks(markdown: string) {
  return markdown.replace(/\((prompts|playbooks|sources)\/([^)]+)\.md\)/g, (_, kind: string, rest: string) => {
    return `(/${kind}/${rest})`;
  });
}

function addHeadingIds(htmlString: string) {
  return htmlString.replace(/<h2>(.*?)<\/h2>/g, (_, content: string) => {
    const plain = content.replace(/<[^>]+>/g, "").trim();
    return `<h2 id="${slugify(plain)}">${content}</h2>`;
  });
}
