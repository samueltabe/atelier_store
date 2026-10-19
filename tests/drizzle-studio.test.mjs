import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const require = createRequire(import.meta.url);
const cli = join(dirname(require.resolve("drizzle-kit")), "bin.cjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const config = fileURLToPath(new URL("../drizzle.config.ts", import.meta.url));
const databaseUrl = "postgresql://studio_test:studio_test@127.0.0.1:1/studio_test";

function run(args, withCredentials) {
  const env = { ...process.env, TEST_CONFIG_PATH_PREFIX: "" };
  delete env.DATABASE_URL;
  if (withCredentials) env.DATABASE_URL = databaseUrl;

  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    env,
    encoding: "utf8",
    timeout: 10_000,
  });
  assert.ifError(result.error);
  return result;
}

for (const withCredentials of [false, true]) {
  for (const explicitConfig of [false, true]) {
    test(`Studio is blocked with credentials=${withCredentials}, explicit config=${explicitConfig}`, () => {
      const args = ["studio"];
      if (explicitConfig) {
        args.push("--config", config, "--host", "127.0.0.1", "--port", "0");
      }
      const result = run(args, withCredentials);
      assert.equal(result.status, 1);
      assert.match(
        result.stdout + result.stderr,
        /Drizzle Studio is disabled until its SQL proxy validates origins and authenticates requests/,
      );
      assert.doesNotMatch(result.stdout + result.stderr, /Studio is up and running/);
    });
  }
}

test("non-Studio schema export still loads the config", () => {
  const result = run(["export", "--config", config], true);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /CREATE TABLE "products"/);
});
