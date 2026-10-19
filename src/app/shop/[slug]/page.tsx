import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { StockBadge } from "@/components/stock-badge";
import {
  getCategoryById,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/db/queries";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Atelier`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [category, related] = await Promise.all([
    getCategoryById(product.categoryId),
    getRelatedProducts(product),
  ]);

  const soldOut = product.stock === "out-of-stock";

  return (
    <main className="section-edit">
      <div className="container-edit">
        <nav className="label-luxe mb-10 flex flex-wrap items-center gap-2 text-stone">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.categoryId}`} className="hover:text-ink">
            {category?.name ?? product.categoryId}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-raised">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-md">
            <p className="label-luxe text-stone">{category?.name ?? product.categoryId}</p>
            <h1 className="mt-2 text-h1">{product.name}</h1>
            <p className="mt-4 text-lg text-ink-soft">{formatPrice(product.priceCents)}</p>

            <div className="mt-6">
              <StockBadge stock={product.stock} />
            </div>

            <p className="divider mt-8 border-t pt-8 text-ink-soft">
              {product.description}
            </p>

            <button
              type="button"
              disabled={soldOut}
              className="btn-primary mt-8 w-full sm:w-auto"
            >
              {soldOut ? "Out of Stock" : "Add to Bag"}
            </button>

            <p className="label-luxe mt-6 text-stone">
              Complimentary shipping on orders over $200
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section-edit divider border-t">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-h2">You May Also Like</h2>
            </div>
            <div className="grid-edit">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
