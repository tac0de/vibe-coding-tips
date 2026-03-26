export type ContentKind = "prompt" | "playbook" | "source" | "template" | "guide";
export type ContentDomain = "onboarding" | "roles" | "ui" | "d3" | "ops" | "templates" | string;

export type ContentMeta = {
  title: string;
  kind: ContentKind;
  domain: ContentDomain;
  summary: string;
  tags: string[];
  order?: number;
  next?: string | null;
  related?: string[];
};

export type ContentRecord = ContentMeta & {
  slug: string[];
  route: string;
  path: string;
  body: string;
  html: string;
  toc: Array<{ id: string; title: string; level: number }>;
  promptBlock?: string | null;
  nextRoute?: string | null;
  nextLink?: ContentLink | null;
  prevLink?: ContentLink | null;
  sequenceIndex?: number | null;
  sequenceTotal?: number | null;
  sequenceLinks: ContentLink[];
  relatedRoutes: ContentLink[];
  summaryPoints: string[];
  failurePoints: string[];
};

export type ContentLink = {
  title: string;
  route: string;
  summary: string;
  kind: ContentKind;
  domain: ContentDomain;
  order?: number;
};
