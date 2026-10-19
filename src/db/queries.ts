"use cache";

import { and, asc, desc, eq, ne } from "drizzle-orm";

import { db } from "./index";
import { categories, products } from "./schema";

export type ProductRow = typeof products.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type SortOption = "newest" | "price-asc" | "price-desc";

export async function getCategories(): Promise<CategoryRow[]> {
  return db.select().from(categories);
}

export async function getCategoryById(id: string): Promise<CategoryRow | undefined> {
  const [category] = await db.select().from(categories).where(eq(categories.id, id));
  return category;
}

export async function getProducts(
  opts: { categoryId?: string; sort?: SortOption; limit?: number } = {},
): Promise<ProductRow[]> {
  const { categoryId, sort = "newest", limit } = opts;

  const orderBy =
    sort === "price-asc"
      ? asc(products.priceCents)
      : sort === "price-desc"
        ? desc(products.priceCents)
        : asc(products.sortOrder);

  const base = db
    .select()
    .from(products)
    .where(categoryId ? eq(products.categoryId, categoryId) : undefined)
    .orderBy(orderBy);

  return limit ? base.limit(limit) : base;
}

export async function getProductBySlug(slug: string): Promise<ProductRow | undefined> {
  const [product] = await db.select().from(products).where(eq(products.id, slug));
  return product;
}

export async function getRelatedProducts(
  product: Pick<ProductRow, "id" | "categoryId">,
  limit = 4,
): Promise<ProductRow[]> {
  return db
    .select()
    .from(products)
    .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
    .orderBy(asc(products.sortOrder))
    .limit(limit);
}

export async function getProductSlugs(): Promise<{ id: string }[]> {
  return db.select({ id: products.id }).from(products);
}
