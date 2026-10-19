// DATABASE_URL is loaded via `tsx --env-file=.env.local` (see the db:seed script) —
// a plain dotenv import here would run too late: static imports of ./index below are
// hoisted above any dotenv.config() call, so ./index would already have thrown.
import { db } from "./index";
import { categories, products } from "./schema";

function unsplash(photoId: string, width: number) {
  return `https://images.unsplash.com/${photoId}?q=80&w=${width}&auto=format&fit=crop`;
}

const SEED_CATEGORIES = [
  {
    id: "women",
    name: "Women",
    description: "Tailoring and ready-to-wear",
    image: unsplash("photo-1562572159-4efc207f5aff", 1400),
  },
  {
    id: "men",
    name: "Men",
    description: "Considered essentials",
    image: unsplash("photo-1441986300917-64674bd600d8", 1400),
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Finishing details",
    image: unsplash("photo-1551232864-3f0890e580d9", 1400),
  },
];

// Listed newest-first — sortOrder preserves this as the "Newest" sort order.
const SEED_PRODUCTS = [
  {
    id: "tulle-evening-dress",
    name: "Tulle Evening Dress",
    categoryId: "women",
    priceCents: 45000,
    image: unsplash("photo-1550928431-ee0ec6db30d3", 900),
    description:
      "A hand-draped tulle silhouette, fitted through the bodice and finished with a soft trailing hem.",
    stock: "low-stock" as const,
  },
  {
    id: "quilted-puffer-jacket",
    name: "Quilted Puffer Jacket",
    categoryId: "men",
    priceCents: 32000,
    image: unsplash("photo-1601924994987-69e26d50dc26", 900),
    description:
      "A lightweight quilted shell designed for layering through the coldest months.",
    stock: "in-stock" as const,
  },
  {
    id: "embossed-mini-bag",
    name: "Embossed Mini Bag",
    categoryId: "accessories",
    priceCents: 38000,
    image: unsplash("photo-1575032617751-6ddec2089882", 900),
    description: "Croc-embossed leather in a compact silhouette, sized for the essentials.",
    stock: "in-stock" as const,
  },
  {
    id: "floral-wrap-dress",
    name: "Floral Wrap Dress",
    categoryId: "women",
    priceCents: 23000,
    image: unsplash("photo-1496747611176-843222e1e57c", 900),
    description:
      "A lightweight wrap dress in a hand-drawn floral print, cut for warm-weather ease.",
    stock: "in-stock" as const,
  },
  {
    id: "classic-timepiece",
    name: "Classic Timepiece",
    categoryId: "accessories",
    priceCents: 42000,
    image: unsplash("photo-1434056886845-dac89ffe9b56", 900),
    description: "A minimal dial on a brushed steel mesh band, water-resistant to 50 metres.",
    stock: "in-stock" as const,
  },
  {
    id: "plaid-wool-overcoat",
    name: "Plaid Wool Overcoat",
    categoryId: "women",
    priceCents: 48000,
    image: unsplash("photo-1485968579580-b6d095142e6e", 900),
    description: "An oversized wool-blend overcoat in a muted windowpane check.",
    stock: "low-stock" as const,
  },
  {
    id: "leather-backpack",
    name: "Leather Backpack",
    categoryId: "accessories",
    priceCents: 24000,
    image: unsplash("photo-1547949003-9792a18a2601", 900),
    description: "Full-grain leather trim over a durable canvas body, built for daily use.",
    stock: "in-stock" as const,
  },
  {
    id: "striped-wide-leg-trousers",
    name: "Striped Wide-Leg Trousers",
    categoryId: "women",
    priceCents: 18000,
    image: unsplash("photo-1521577352947-9bb58764b69a", 900),
    description:
      "High-rise wide-leg trousers in a fine pinstripe, cut from a fluid cotton blend.",
    stock: "in-stock" as const,
  },
  {
    id: "ruffle-mini-dress",
    name: "Ruffle Mini Dress",
    categoryId: "women",
    priceCents: 24000,
    image: unsplash("photo-1515372039744-b8f02a3ae446", 900),
    description:
      "An off-shoulder mini dress with a tiered ruffle hem, cut from breathable cotton.",
    stock: "in-stock" as const,
  },
  {
    id: "statement-sunglasses",
    name: "Statement Sunglasses",
    categoryId: "accessories",
    priceCents: 15000,
    image: unsplash("photo-1529139574466-a303027c1d8b", 900),
    description: "Oversized acetate frames with a gradient lens and metal temple detailing.",
    stock: "in-stock" as const,
  },
  {
    id: "utility-field-jacket",
    name: "Utility Field Jacket",
    categoryId: "women",
    priceCents: 41000,
    image: unsplash("photo-1544022613-e87ca75a784a", 900),
    description:
      "A relaxed field jacket in brushed cotton twill, finished with patch pockets throughout.",
    stock: "in-stock" as const,
  },
  {
    id: "cashmere-crewneck",
    name: "Cashmere Crewneck",
    categoryId: "men",
    priceCents: 28000,
    image: unsplash("photo-1556905055-8f358a7a47b2", 900),
    description: "A pure cashmere crewneck, knitted for structure without added weight.",
    stock: "in-stock" as const,
  },
  {
    id: "chronograph-watch",
    name: "Chronograph Watch",
    categoryId: "accessories",
    priceCents: 59000,
    image: unsplash("photo-1491336477066-31156b5e4f35", 900),
    description: "A multi-function chronograph with a leather strap and sapphire crystal.",
    stock: "low-stock" as const,
  },
  {
    id: "knit-poncho",
    name: "Hand-Knit Poncho",
    categoryId: "women",
    priceCents: 22000,
    image: unsplash("photo-1434389677669-e08b4cac3105", 900),
    description: "An open-knit poncho with a fringed hem, hand finished from natural fibres.",
    stock: "in-stock" as const,
  },
  {
    id: "court-sneakers",
    name: "Court Sneakers",
    categoryId: "men",
    priceCents: 34000,
    image: unsplash("photo-1465479423260-c4afc24172c6", 900),
    description:
      "Minimal leather court sneakers with a cupsole and subtle perforated detailing.",
    stock: "out-of-stock" as const,
  },
  {
    id: "relaxed-blazer",
    name: "Relaxed Tailored Blazer",
    categoryId: "men",
    priceCents: 36000,
    image: unsplash("photo-1490481651871-ab68de25d43d", 900),
    description: "An unstructured blazer with a soft shoulder, tailored for a relaxed fit.",
    stock: "in-stock" as const,
  },
].map((product, index) => ({ ...product, sortOrder: index }));

async function main() {
  await db.insert(categories).values(SEED_CATEGORIES).onConflictDoNothing();
  await db.insert(products).values(SEED_PRODUCTS).onConflictDoNothing();
  console.log(
    `Seeded ${SEED_CATEGORIES.length} categories and ${SEED_PRODUCTS.length} products.`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
