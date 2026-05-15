import { mkdir } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ensureResources, root } from "./lib/resource-manager.mjs";

await ensureResources({ force: false });

const outputDir = path.join(root, "resources", "packages");
const output = path.join(outputDir, "imyvm-dashboard-resources.tar.gz");
await mkdir(outputDir, { recursive: true });

const result = spawnSync(
  "tar",
  [
    "-czf",
    output,
    "src/resources",
    "public/resources",
    "resources/minecraft-assets.json",
    "resources/remote-resources.json",
  ],
  { cwd: root, stdio: "inherit" },
);

if (result.status !== 0) {
  throw new Error("Failed to package resources.");
}

console.log(`Resource package created: ${path.relative(root, output)}`);
