import { tool } from "@opencode-ai/plugin"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
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

export const read_shared_state = tool({
  description: "Read shared state (findings, decisions, files modified, blockers) from other agents",
  args: {
    type: tool.schema.enum(["findings", "decisions", "files-modified", "blockers", "all"]).describe("Type of shared state to read"),
  },
  async execute(args, context) {
    const stateDir = join(context.worktree || context.directory, ".opencode", "shared-state")
    ensureDir(stateDir)
    
    if (args.type === "all") {
      const state = {
        findings: readJSON(join(stateDir, "findings.json"), []),
        decisions: readJSON(join(stateDir, "decisions.json"), []),
        filesModified: readJSON(join(stateDir, "files-modified.json"), []),
        blockers: readJSON(join(stateDir, "blockers.json"), [])
      }
      return JSON.stringify(state, null, 2)
    }
    
    const filePath = join(stateDir, `${args.type}.json`)
    return JSON.stringify(readJSON(filePath, []), null, 2)
  }
})

export const write_shared_state = tool({
  description: "Write findings, decisions, or blockers to shared state for other agents to read",
  args: {
    type: tool.schema.enum(["finding", "decision", "blocker"]).describe("Type of state to write"),
    content: tool.schema.string().describe("The finding, decision, or blocker description"),
    severity: tool.schema.enum(["low", "medium", "high", "critical"]).optional().describe("Severity level (for findings)"),
    status: tool.schema.enum(["open", "resolved", "escalated"]).optional().describe("Status (for blockers)"),
    rationale: tool.schema.string().optional().describe("Rationale (for decisions)"),
  },
  async execute(args, context) {
    const stateDir = join(context.worktree || context.directory, ".opencode", "shared-state")
    ensureDir(stateDir)
    
    const timestamp = new Date().toISOString()
    const agent = context.agent || "unknown"
    
    if (args.type === "finding") {
      const filePath = join(stateDir, "findings.json")
      const findings = readJSON<Array<{ agent: string; timestamp: string; finding: string; severity: string }>>(filePath, [])
      findings.push({ agent, timestamp, finding: args.content, severity: args.severity || "medium" })
      writeJSON(filePath, findings)
      return `Finding recorded: ${args.content}`
    }
    
    if (args.type === "decision") {
      const filePath = join(stateDir, "decisions.json")
      const decisions = readJSON<Array<{ agent: string; timestamp: string; decision: string; rationale: string }>>(filePath, [])
      decisions.push({ agent, timestamp, decision: args.content, rationale: args.rationale || "" })
      writeJSON(filePath, decisions)
      return `Decision recorded: ${args.content}`
    }
    
    if (args.type === "blocker") {
      const filePath = join(stateDir, "blockers.json")
      const blockers = readJSON<Array<{ agent: string; timestamp: string; blocker: string; status: string }>>(filePath, [])
      blockers.push({ agent, timestamp, blocker: args.content, status: args.status || "open" })
      writeJSON(filePath, blockers)
      return `Blocker recorded: ${args.content}`
    }
    
    return "Invalid type"
  }
})

export const check_conflicts = tool({
  description: "Check for potential conflicts with files modified by other agents",
  args: {
    files: tool.schema.array(tool.schema.string()).describe("List of files you plan to modify"),
  },
  async execute(args, context) {
    const stateDir = join(context.worktree || context.directory, ".opencode", "shared-state")
    const filesModifiedPath = join(stateDir, "files-modified.json")
    const filesModified = readJSON<Array<{ agent: string; timestamp: string; file: string; action: string }>>(
      filesModifiedPath, []
    )
    
    const modifiedFiles = new Set(filesModified.map(f => f.file))
    const conflicts = args.files.filter(f => modifiedFiles.has(f))
    
    if (conflicts.length === 0) {
      return "No conflicts detected. Safe to proceed."
    }
    
    const conflictDetails = conflicts.map(f => {
      const modifications = filesModified.filter(m => m.file === f)
      return `${f} - modified by: ${modifications.map(m => m.agent).join(", ")}`
    })
    
    return `Potential conflicts detected:\n${conflictDetails.join("\n")}\nConsider coordinating with the agents who modified these files.`
  }
})
