import { index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const stockStatusEnum = pgEnum("stock_status", [
  "in-stock",
  "low-stock",
  "out-of-stock",
]);
export type StockStatus = (typeof stockStatusEnum.enumValues)[number];

export const categories = pgTable("categories", {
  id: text("id").primaryKey(), // slug: "women" | "men" | "accessories"
  name: text("name").notNull(), // display label: "Women"
  description: text("description").notNull(), // homepage collection tagline
  image: text("image").notNull(), // homepage collection card image
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey(), // slug: "tulle-evening-dress"
    name: text("name").notNull(),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    priceCents: integer("price_cents").notNull(),
    image: text("image").notNull(),
    description: text("description").notNull(),
    stock: stockStatusEnum("stock").notNull().default("in-stock"),
    sortOrder: integer("sort_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("products_category_id_idx").on(table.categoryId)],
);
