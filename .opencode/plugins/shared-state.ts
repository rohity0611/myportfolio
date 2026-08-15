import type { Plugin } from "@opencode-ai/plugin"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function readJSON<T>(filePath: string, defaultVal: T): T {
  try {
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, "utf-8"))
    }
  } catch {}
  return defaultVal
}

function writeJSON(filePath: string, data: any): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Extends graphify with cross-agent coordination
// graphify handles phase-state continuity, we handle agent coordination
export const SharedStatePlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  const stateDir = join(worktree || directory, ".opencode", "shared-state")
  ensureDir(stateDir)
  
  const filesModifiedPath = join(stateDir, "files-modified.json")
  const findingsPath = join(stateDir, "findings.json")
  
  if (!existsSync(filesModifiedPath)) {
    writeJSON(filesModifiedPath, [])
  }
  if (!existsSync(findingsPath)) {
    writeJSON(findingsPath, [])
  }

  return {
    "file.edited": async (input, output) => {
      // Record file modifications for cross-agent coordination
      const filesModified = readJSON<Array<{ agent: string; timestamp: string; file: string; action: string }>>(
        filesModifiedPath, []
      )
      
      filesModified.push({
        agent: "system",
        timestamp: new Date().toISOString(),
        file: output?.path || "unknown",
        action: output?.action || "edit"
      })
      
      writeJSON(filesModifiedPath, filesModified)
    },

    "tool.execute.after": async (input, output) => {
      // Track write operations as file modifications
      if (input.tool === "write" && output?.args?.filePath) {
        const filesModified = readJSON<Array<{ agent: string; timestamp: string; file: string; action: string }>>(
          filesModifiedPath, []
        )
        
        filesModified.push({
          agent: "system",
          timestamp: new Date().toISOString(),
          file: output.args.filePath,
          action: "write"
        })
        
        writeJSON(filesModifiedPath, filesModified)
      }
    },

    "experimental.session.compacting": async (input, output) => {
      // Inject shared state summary during compaction
      // graphify handles phase-state, we handle agent coordination
      const filesModified = readJSON<Array<{ agent: string; timestamp: string; file: string; action: string }>>(
        filesModifiedPath, []
      )
      
      if (filesModified.length > 0) {
        const recentFiles = filesModified.slice(-10).map(f => `${f.file} (${f.action})`)
        output.context.push(
          [
            "## Cross-Agent State",
            "Files modified by other agents:",
            ...recentFiles.map(f => `- ${f}`),
            "Check `.opencode/shared-state/` for full coordination state."
          ].join("\n")
        )
      }
    }
  }
}
