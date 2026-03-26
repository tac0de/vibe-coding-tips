import { DocumentLayout } from "@/components/document-layout";
import { getAllContent, getContentByKindAndSlug } from "@/lib/content/loader";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const all = await getAllContent();
  return all.filter((item) => item.route.startsWith("/sources/")).map((item) => ({ slug: item.slug }));
}

export default async function SourceDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const document = await getContentByKindAndSlug("sources", slug);
  if (!document) notFound();
  return <DocumentLayout document={document} />;
}
