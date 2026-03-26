import type { ContentLink, ContentRecord, SiteLanguage } from "@/lib/content/types";

export function getLocalizedRecord(record: ContentRecord, language: SiteLanguage) {
  return record.locales[language] ?? record.locales.ko;
}

export function getLocalizedLink(link: ContentLink, language: SiteLanguage) {
  return link.locales[language] ?? link.locales.ko;
}
