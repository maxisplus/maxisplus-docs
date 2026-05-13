#!/usr/bin/env node
import { execSync, spawn } from "child_process";
import { readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { createInterface } from "readline";
import { fileURLToPath } from "url";

const ROOT = dirname(fileURLToPath(import.meta.url));

function findHtmlFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findHtmlFiles(full, base));
    } else if (entry.endsWith(".html")) {
      results.push(relative(base, full));
    }
  }
  return results;
}

function groupByFolder(files) {
  const groups = {};
  for (const f of files) {
    const parts = f.split("/");
    const folder = parts.length > 1 ? parts[0] : "(root)";
    (groups[folder] ??= []).push(f);
  }
  return groups;
}

function printMenu(groups) {
  const entries = [];
  let i = 1;
  const folders = Object.keys(groups).sort();
  for (const folder of folders) {
    console.log(`\n  \x1b[1m\x1b[36m${folder}/\x1b[0m`);
    for (const file of groups[folder]) {
      const label = file.split("/").pop().replace(".html", "");
      console.log(`  \x1b[90m[${i}]\x1b[0m ${label}`);
      entries.push(file);
      i++;
    }
  }
  return entries;
}

async function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function ensureBrowserSync() {
  try {
    execSync("npx --yes browser-sync --version", { stdio: "ignore" });
  } catch {
    // will be installed on first npx --yes run
  }
}

async function main() {
  console.clear();
  console.log("\x1b[1m\x1b[35m  maxis-docs dev server\x1b[0m\n");

  const files = findHtmlFiles(ROOT);
  if (files.length === 0) {
    console.error("No HTML files found.");
    process.exit(1);
  }

  const groups = groupByFolder(files);
  const entries = printMenu(groups);

  console.log();
  const raw = await prompt("  Pick a file [1-" + entries.length + "]: ");
  const idx = parseInt(raw, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= entries.length) {
    console.error("\n  Invalid selection.");
    process.exit(1);
  }

  const chosen = entries[idx];
  console.log(`\n  Starting server for \x1b[1m${chosen}\x1b[0m…\n`);

  ensureBrowserSync();

  const bs = spawn(
    "npx",
    [
      "--yes",
      "browser-sync",
      "start",
      "--server",
      ROOT,
      "--startPath",
      "/" + chosen,
      "--port",
      "4200",
      "--watch",
      "--files",
      chosen,
      "--no-notify",
    ],
    { stdio: "inherit", cwd: ROOT },
  );

  bs.on("exit", (code) => process.exit(code ?? 0));
}

main();
