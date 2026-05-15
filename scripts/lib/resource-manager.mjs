import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const manifestPath = path.join(root, "resources", "remote-resources.json");
export const publicResourcesRoot = path.join(root, "public", "resources");

const placeholderHosts = new Set(["example.com", "example.org", "localhost", "127.0.0.1"]);

export async function ensureResources({ force }) {
  const manifest = await readManifest();

  if (manifest.resources.length === 0) {
    console.log("未配置远程资源，跳过下载。");
    return;
  }

  for (const resource of manifest.resources) {
    await ensureResource(resource, { force });
  }
}

async function readManifest() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  if (!Array.isArray(manifest.resources)) {
    throw new Error("resources/remote-resources.json must contain a resources array.");
  }

  for (const resource of manifest.resources) {
    assertResource(resource);
  }

  return manifest;
}

async function ensureResource(resource, { force }) {
  const targetPath = path.join(publicResourcesRoot, resource.target);

  if (!force && (await isExistingResourceValid(targetPath, resource.sha256))) {
    console.log(`Resource ${resource.id} already exists.`);
    return;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  const response = await fetch(resource.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${resource.id}: ${response.status} ${response.statusText}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  assertChecksum(resource, bytes);
  await writeFile(targetPath, bytes);
  console.log(`Downloaded ${resource.id} -> public/resources/${resource.target}`);
}

async function isExistingResourceValid(targetPath, sha256) {
  try {
    await access(targetPath);
  } catch {
    return false;
  }

  if (!sha256) {
    return true;
  }

  const bytes = await readFile(targetPath);
  return createHash("sha256").update(bytes).digest("hex") === sha256;
}

function assertResource(resource) {
  if (!resource || typeof resource !== "object") {
    throw new Error("Each resource entry must be an object.");
  }

  const { id, url, target, sha256 } = resource;
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Each resource entry must have a non-empty id.");
  }
  if (typeof url !== "string" || url.trim() === "") {
    throw new Error(`Resource ${id} must have a non-empty url.`);
  }
  if (typeof target !== "string" || target.trim() === "") {
    throw new Error(`Resource ${id} must have a non-empty target.`);
  }
  if (sha256 !== undefined && (typeof sha256 !== "string" || !/^[a-f0-9]{64}$/i.test(sha256))) {
    throw new Error(`Resource ${id} sha256 must be a 64-character hex digest.`);
  }

  const parsedUrl = new URL(url);
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error(`Resource ${id} url must use http or https.`);
  }
  if (placeholderHosts.has(parsedUrl.hostname)) {
    throw new Error(`Resource ${id} uses a placeholder host.`);
  }
  if (path.isAbsolute(target) || target.includes("..")) {
    throw new Error(`Resource ${id} target must stay under public/resources.`);
  }
}

function assertChecksum(resource, bytes) {
  if (!resource.sha256) {
    return;
  }

  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== resource.sha256) {
    throw new Error(`Checksum mismatch for ${resource.id}: expected ${resource.sha256}, got ${actual}`);
  }
}
