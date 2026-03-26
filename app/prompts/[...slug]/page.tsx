import { DocumentLayout } from "@/components/document-layout";
import { getAllContent, getContentByKindAndSlug } from "@/lib/content/loader";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const all = await getAllContent();
  return all.filter((item) => item.route.startsWith("/prompts/")).map((item) => ({ slug: item.slug }));
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const all = await getAllContent();
  const document = await getContentByKindAndSlug("prompts", slug);
  if (!document) notFound();
  return <DocumentLayout document={document} catalog={all} />;
}
