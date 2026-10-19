import { EditorialBanner } from "@/components/editorial-banner";
import { FeaturedCollections } from "@/components/featured-collections";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { ProductGrid } from "@/components/product-grid";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <ProductGrid />
      <EditorialBanner />
      <Newsletter />
    </main>
  );
}
