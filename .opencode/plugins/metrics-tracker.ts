import type { Plugin } from "@opencode-ai/plugin"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

interface AgentMetrics {
  totalTasks: number
  successCount: number
  failureCount: number
  avgDuration: number
  commonFailures: string[]
  lastUsed: string
}

interface MetricsData {
  agents: Record<string, AgentMetrics>
}

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

// Extends claude-mem with agent-specific performance metrics
// claude-mem stores session details, we track agent success rates
export const MetricsTrackerPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  const metricsDir = join(worktree || directory, ".opencode", "metrics")
  ensureDir(metricsDir)
  
  const metricsPath = join(metricsDir, "agent-performance.json")
  
  if (!existsSync(metricsPath)) {
    writeJSON(metricsPath, { agents: {} })
  }

  return {
    "tool.execute.after": async (input, output) => {
      // Record agent performance metrics
      // claude-mem handles session memory, we handle agent analytics
      const metrics = readJSON<MetricsData>(metricsPath, { agents: {} })
      
      const agentName = "current-session"
      
      if (!metrics.agents[agentName]) {
        metrics.agents[agentName] = {
          totalTasks: 0,
          successCount: 0,
          failureCount: 0,
          avgDuration: 0,
          commonFailures: [],
          lastUsed: new Date().toISOString()
        }
      }
      
      const agentMetrics = metrics.agents[agentName]
      agentMetrics.totalTasks++
      agentMetrics.lastUsed = new Date().toISOString()
      
      if (output?.error) {
        agentMetrics.failureCount++
        const errorMsg = output.error.substring(0, 100)
        if (!agentMetrics.commonFailures.includes(errorMsg)) {
          agentMetrics.commonFailures.push(errorMsg)
          if (agentMetrics.commonFailures.length > 5) {
            agentMetrics.commonFailures.shift()
          }
        }
      } else {
        agentMetrics.successCount++
      }
      
      writeJSON(metricsPath, metrics)
    },

    "session.idle": async (input, output) => {
      // Update agent performance summary
      // claude-mem stores the session details
      // We update agent-specific metrics
      const metrics = readJSON<MetricsData>(metricsPath, { agents: {} })
      
      // Update avgDuration based on session
      const agentName = "current-session"
      if (metrics.agents[agentName]) {
        const agent = metrics.agents[agentName]
        if (agent.totalTasks > 0) {
          agent.avgDuration = Math.round((agent.successCount / agent.totalTasks) * 100)
        }
      }
      
      writeJSON(metricsPath, metrics)
    }
  }
}
