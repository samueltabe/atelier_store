import { defineConfig } from "drizzle-kit";

// Studio in the locked drizzle-kit version exposes unauthenticated SQL over HTTP.
// Refuse startup before the CLI can open a database connection or a listener.
if (process.argv.includes("studio")) {
  throw new Error(
    "Drizzle Studio is disabled until its SQL proxy validates origins and authenticates requests.",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
