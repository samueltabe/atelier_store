import Image from "next/image";
import Link from "next/link";

import type { ProductRow } from "@/db/queries";
import { formatPrice } from "@/lib/format";

export function ProductCard({
  product,
  priority = false,
}: {
  product: ProductRow;
  priority?: boolean;
}) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-raised">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="label-luxe mt-4 text-stone">{product.categoryId}</p>
      <h3 className="mt-1 text-sm">{product.name}</h3>
      <p className="mt-1 text-sm text-ink-soft">{formatPrice(product.priceCents)}</p>
    </Link>
  );
}
