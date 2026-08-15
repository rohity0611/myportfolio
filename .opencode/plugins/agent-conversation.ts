import type { Plugin } from "@opencode-ai/plugin"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

interface ConversationTurn {
  from: string
  to: string
  prompt: string
  response: string
  timestamp: string
}

interface Conversation {
  id: string
  turns: ConversationTurn[]
  created: string
  max_turns: number
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

// Plugin for agent-to-agent conversations
// Stores conversation history and injects into task calls
export const AgentConversationPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  const conversationsDir = join(worktree || directory, ".opencode", "shared-state", "conversations")
  ensureDir(conversationsDir)

  const DEFAULT_MAX_TURNS = 5

  return {
    "tool.execute.before": async (input, output) => {
      // Intercept task tool calls to inject conversation history
      if (input.tool === "task" && output?.args?.conversation_id) {
        const conversationId = output.args.conversation_id
        const conversationFile = join(conversationsDir, `${conversationId}.json`)
        
        const conversation = readJSON<Conversation>(conversationFile, {
          id: conversationId,
          turns: [],
          created: new Date().toISOString(),
          max_turns: DEFAULT_MAX_TURNS
        })

        // Check max turns
        if (conversation.turns.length >= conversation.max_turns) {
          output.error = `Conversation ${conversationId} exceeded max turns (${conversation.max_turns}). Start a new conversation.`
          return
        }

        // Inject conversation history into prompt
        if (conversation.turns.length > 0) {
          const history = conversation.turns.map((turn, i) => 
            `Turn ${i + 1}: ${turn.from} → ${turn.to}\nPrompt: ${turn.prompt}\nResponse: ${turn.response}`
          ).join("\n\n")
          
          const originalPrompt = output.args.prompt
          output.args.prompt = `## Conversation History (Turn ${conversation.turns.length + 1} of ${conversation.max_turns})\n\n${history}\n\n---\n\n## Current Request\n\n${originalPrompt}`
        }
      }
    },

    "tool.execute.after": async (input, output) => {
      // Store conversation turn after task completes
      if (input.tool === "task" && output?.args?.conversation_id && output?.result) {
        const conversationId = output.args.conversation_id
        const conversationFile = join(conversationsDir, `${conversationId}.json`)
        
        const conversation = readJSON<Conversation>(conversationFile, {
          id: conversationId,
          turns: [],
          created: new Date().toISOString(),
          max_turns: DEFAULT_MAX_TURNS
        })

        // Extract agent names from task args
        const fromAgent = "system"
        const toAgent = output.args.agent || "unknown"

        // Add turn
        conversation.turns.push({
          from: fromAgent,
          to: toAgent,
          prompt: output.args.prompt || "",
          response: typeof output.result === "string" ? output.result : JSON.stringify(output.result),
          timestamp: new Date().toISOString()
        })

        writeJSON(conversationFile, conversation)
      }
    }
  }
}
