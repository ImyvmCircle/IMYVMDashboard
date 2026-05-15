import { access } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { root } from "./lib/resource-manager.mjs";

const archive = process.argv[2];

if (!archive) {
  throw new Error("Usage: node scripts/unpack-resources.mjs <resource-package.tar.gz>");
}

const archivePath = path.resolve(root, archive);
await access(archivePath);

const result = spawnSync("tar", ["-xzf", archivePath, "-C", root], {
  cwd: root,
  stdio: "inherit",
});

if (result.status !== 0) {
  throw new Error("Failed to unpack resources.");
}

console.log(`Resource package imported: ${path.relative(root, archivePath)}`);
