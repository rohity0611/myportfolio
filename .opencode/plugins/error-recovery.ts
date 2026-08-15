import type { Plugin } from "@opencode-ai/plugin"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

interface ErrorLog {
  timestamp: string
  tool: string
  error: string
  category: "transient" | "permanent" | "critical"
  action: "retry" | "fallback" | "abort"
  attempt: number
}

interface RetryState {
  attempt: number
  maxAttempts: number
  lastError?: string
  cooldownUntil?: number
}

const retryStates: Map<string, RetryState> = new Map()

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function classifyError(error: string): "transient" | "permanent" | "critical" {
  const msg = error.toLowerCase()
  
  if (msg.includes("security") || msg.includes("permission denied") || msg.includes("corruption")) {
    return "critical"
  }
  
  if (msg.includes("timeout") || msg.includes("rate limit") || msg.includes("network") || msg.includes("econnreset")) {
    return "transient"
  }
  
  return "permanent"
}

function writeErrorLog(log: ErrorLog): void {
  const errorsDir = join(process.cwd(), ".opencode", "errors")
  ensureDir(errorsDir)
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const logFile = join(errorsDir, `error-${timestamp}.json`)
  writeFileSync(logFile, JSON.stringify(log, null, 2))
}

function getRetryDelay(attempt: number): number {
  return Math.pow(2, attempt) * 1000
}

export const ErrorRecoveryPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  return {
    "tool.execute.before": async (input, output) => {
      const stateKey = `${input.tool}`
      const state = retryStates.get(stateKey)
      
      if (state?.cooldownUntil) {
        const now = Date.now()
        if (now < state.cooldownUntil) {
          await new Promise(resolve => setTimeout(resolve, state.cooldownUntil! - now))
        }
        state.cooldownUntil = undefined
      }
    },

    "tool.execute.after": async (input, output) => {
      const stateKey = `${input.tool}`
      let state = retryStates.get(stateKey)
      
      if (!state) {
        state = { attempt: 0, maxAttempts: 3 }
        retryStates.set(stateKey, state)
      }
      
      if (output?.error) {
        state.attempt++
        state.lastError = output.error
        
        const category = classifyError(output.error)
        
        const log: ErrorLog = {
          timestamp: new Date().toISOString(),
          tool: input.tool,
          error: output.error,
          category,
          action: "retry",
          attempt: state.attempt
        }
        
        if (category === "critical") {
          log.action = "abort"
          writeErrorLog(log)
          return
        }
        
        if (state.attempt >= state.maxAttempts) {
          log.action = "fallback"
          writeErrorLog(log)
          return
        }
        
        log.action = "retry"
        writeErrorLog(log)
        
        state.cooldownUntil = Date.now() + getRetryDelay(state.attempt)
        retryStates.set(stateKey, state)
        
      } else {
        retryStates.delete(stateKey)
      }
    }
  }
}
