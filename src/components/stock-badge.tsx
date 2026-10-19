import type { StockStatus } from "@/db/schema";

const STOCK_COPY: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Only a Few Left",
  "out-of-stock": "Out of Stock",
};

const DOT_CLASS: Record<StockStatus, string> = {
  "in-stock": "bg-ink",
  "low-stock": "bg-stone",
  "out-of-stock": "border border-stone bg-transparent",
};

export function StockBadge({ stock }: { stock: StockStatus }) {
  return (
    <span
      className={`label-luxe inline-flex items-center gap-2 ${
        stock === "out-of-stock" ? "text-stone" : "text-ink-soft"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[stock]}`} />
      {STOCK_COPY[stock]}
    </span>
  );
}
