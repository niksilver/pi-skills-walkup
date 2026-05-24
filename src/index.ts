import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { execSync } from "node:child_process";
import { existsSync, lstatSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

/**
 * Extension to load skills from .pi/skills in the current directory
 * and all parent directories up to the git root or filesystem root.
 */
export default function (pi: ExtensionAPI) {
  pi.on("resources_discover", async (event) => {
    const cwd = event.cwd;
    const root = getGitRoot();
    const skillPaths: string[] = [];
    
    let current = resolve(cwd);
    while (true) {
      const skillDir = join(current, ".pi/skills");
      if (existsSync(skillDir) && lstatSync(skillDir).isDirectory()) {
        if (!skillPaths.includes(skillDir)) {
          skillPaths.push(skillDir);
        }
      }
      
      if (current === root || current === dirname(current)) {
        break;
      }
      current = dirname(current);
    }

    return {
      skillPaths,
    };
  });
}

function getGitRoot(): string {
  try {
    // Execute git command to find the top-level directory of the current repository
    return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch {
    // If not in a git repository, return the filesystem root
    return "/";
  }
}
