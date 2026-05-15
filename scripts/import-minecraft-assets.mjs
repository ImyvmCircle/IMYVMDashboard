import { access, copyFile, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { root } from "./lib/resource-manager.mjs";

const sourceArg = process.argv[2];

if (!sourceArg) {
  throw new Error(
    "Usage: node scripts/import-minecraft-assets.mjs <minecraft-version-jar-or-extracted-assets-dir>",
  );
}

const sourceInput = path.resolve(root, sourceArg);
const manifestPath = path.join(root, "resources", "minecraft-assets.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

if (!Array.isArray(manifest.assets)) {
  throw new Error("resources/minecraft-assets.json must contain an assets array.");
}

const sourceRoot = await prepareSourceRoot(sourceInput, manifest.assets);

try {
  for (const asset of manifest.assets) {
    const sourcePath = await resolveSourcePath(sourceRoot.root, asset.source);
    const targetPath = path.join(root, "public", "resources", asset.target);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    console.log(`Imported ${asset.id} -> public/resources/${asset.target}`);
  }
} finally {
  if (sourceRoot.cleanup) {
    await rm(sourceRoot.cleanup, { recursive: true, force: true });
  }
}

async function prepareSourceRoot(sourcePath, assets) {
  try {
    await access(sourcePath);
  } catch {
    throw new Error(`Source not found: ${sourcePath}`);
  }

  if (sourcePath.endsWith(".jar") || sourcePath.endsWith(".zip")) {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "imyvm-minecraft-assets-"));
    const result = spawnSync(
      "unzip",
      ["-qq", sourcePath, ...assets.map((asset) => asset.source), "-d", tempDir],
      { stdio: "inherit" },
    );

    if (result.status !== 0) {
      throw new Error(`Failed to extract Minecraft assets from ${sourcePath}`);
    }

    return { root: tempDir, cleanup: tempDir };
  }

  return { root: sourcePath, cleanup: null };
}

async function resolveSourcePath(sourceRootPath, relativeSource) {
  const candidates = [
    path.join(sourceRootPath, relativeSource),
    path.join(sourceRootPath, relativeSource.replace(/^assets\/minecraft\//, "")),
    path.join(sourceRootPath, relativeSource.replace(/^assets\/minecraft\/textures\//, "")),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return path.resolve(candidate);
    } catch {}
  }

  throw new Error(`Missing Minecraft asset source: ${relativeSource}`);
}
