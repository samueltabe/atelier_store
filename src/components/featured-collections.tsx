import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/db/queries";

export async function FeaturedCollections() {
  const categories = await getCategories();

  return (
    <section id="collections" className="section-edit scroll-mt-20 lg:scroll-mt-28">
      <div className="container-edit">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-h2">Shop by Collection</h2>
          <Link href="/shop" className="nav-link hidden sm:inline-block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-paper-raised"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-h3 text-paper">{category.name}</h3>
                <p className="label-luxe mt-1 text-paper/75">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
