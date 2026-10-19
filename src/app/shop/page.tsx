import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { SortControl } from "@/components/sort-control";
import { getCategories, getProducts, type SortOption } from "@/db/queries";

// Filtering/sorting genuinely depends on searchParams every request — this route
// can never be meaningfully static, so opt out of Cache Components' static-shell
// requirement rather than wrapping in an unhelpful Suspense boundary.
export const instant = false;

const SORT_VALUES: SortOption[] = ["newest", "price-asc", "price-desc"];

function shopHref(categoryId?: string, sort?: string) {
  const params = new URLSearchParams();
  if (categoryId) params.set("category", categoryId);
  if (sort && sort !== "newest") params.set("sort", sort);
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const params = await props.searchParams;
  const categoryParam =
    typeof params.category === "string" ? params.category.toLowerCase() : undefined;
  const sortParam = typeof params.sort === "string" ? params.sort : undefined;
  const sort = (SORT_VALUES as string[]).includes(sortParam ?? "")
    ? (sortParam as SortOption)
    : "newest";

  const allCategories = await getCategories();
  const activeCategory = allCategories.find((c) => c.id === categoryParam);

  const items = await getProducts({ categoryId: activeCategory?.id, sort });

  return (
    <main className="section-edit pt-10 sm:pt-12">
      <div className="container-edit">
        <header className="mb-10">
          <p className="label-luxe text-stone">Shop</p>
          <h1 className="mt-2 text-h1">{activeCategory?.name ?? "All Products"}</h1>
        </header>

        <div className="divider mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b pb-6">
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            <Link
              href={shopHref(undefined, sort)}
              className={`nav-link ${!activeCategory ? "text-ink" : ""}`}
            >
              All
            </Link>
            {allCategories.map((category) => (
              <Link
                key={category.id}
                href={shopHref(category.id, sort)}
                className={`nav-link ${activeCategory?.id === category.id ? "text-ink" : ""}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <p className="label-luxe text-stone">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </p>
            <SortControl sort={sort} />
          </div>
        </div>

        <div className="grid-edit">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      </div>
    </main>
  );
}
