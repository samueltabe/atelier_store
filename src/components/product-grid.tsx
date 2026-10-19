import Link from "next/link";

import { getProducts } from "@/db/queries";

import { ProductCard } from "./product-card";

export async function ProductGrid() {
  const newArrivals = await getProducts({ sort: "newest", limit: 8 });

  return (
    <section
      id="new-arrivals"
      className="section-edit divider scroll-mt-20 border-t lg:scroll-mt-28"
    >
      <div className="container-edit">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-h2">New Arrivals</h2>
          <Link href="/shop" className="nav-link hidden sm:inline-block">
            View All
          </Link>
        </div>

        <div className="grid-edit">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
