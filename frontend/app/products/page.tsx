import ProductGrid from "@/components/ProductGrid";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { fetchProducts, fetchCategories } from "@/lib/api";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    fetchProducts({ category_slug: params.category, search: params.search }),
    fetchCategories(),
  ]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-white/[0.08] pb-8 mb-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-white tracking-tight">
            The Master Catalog
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
            A curated inventory of limited-production acoustic, horological, and spatial living instruments.
          </p>
        </div>
      </div>

      <InfiniteMarquee speed={32} direction="left" className="mb-10" />

      <ProductGrid
        initialProducts={products}
        categories={categories}
        title="Complete Portfolio"
        subtitle="Filter by category, search specifications, or sort by connoisseur rating."
      />
    </div>
  );
}
