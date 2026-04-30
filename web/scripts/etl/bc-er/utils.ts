import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

export const repoRoot = path.resolve(__dirname, "..", "..", "..", "..");
export const buildRoot = path.join(repoRoot, ".tmp", "etl-bc-er");

export interface CommandOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
}

export async function runCommand(
  command: string,
  args: string[],
  options: CommandOptions = {}
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) return resolve();
      reject(
        new Error(
          `Command failed (exit ${code}): ${[command, ...args].join(" ")}`
        )
      );
    });
  });
}

export async function commandExists(command: string): Promise<boolean> {
  try {
    await runCommand("which", [command]);
    return true;
  } catch {
    return false;
  }
}

export async function ensureBuildDirs(): Promise<void> {
  for (const sub of ["geojson", "pmtiles"]) {
    // eslint-disable-next-line no-await-in-loop
    await mkdir(path.join(buildRoot, sub), { recursive: true });
  }
}

export async function cleanBuildDir(): Promise<void> {
  await rm(buildRoot, { recursive: true, force: true });
}
