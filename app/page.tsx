import { LibraryHome } from "@/components/library-home";
import { getLibraryHomeData } from "@/lib/content/loader";

export default async function HomePage() {
  const data = await getLibraryHomeData();
  return <LibraryHome data={data} />;
}
