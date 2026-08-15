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

export const agent_query = tool({
  description: "Query another agent for information or analysis within the same context",
  args: {
    agentType: tool.schema.string().describe("Type of agent to query"),
    query: tool.schema.string().describe("Question or task for the agent"),
    context: tool.schema.string().optional().describe("Additional context to provide"),
  },
  async execute(args, context) {
    const queriesDir = join(context.worktree || context.directory, ".opencode", "queries")
    ensureDir(queriesDir)
    
    const queryId = `query-${Date.now()}`
    const queryPath = join(queriesDir, `${queryId}.json`)
    const resultPath = join(queriesDir, `${queryId}-result.json`)
    
    // Write query file
    const queryData = {
      queryId,
      agentType: args.agentType,
      query: args.query,
      context: args.context || "",
      timestamp: new Date().toISOString(),
      requesterAgent: context.agent || "unknown"
    }
    
    writeJSON(queryPath, queryData)
    
    // In a real implementation, this would dispatch a subagent
    // For now, we return the query file path for the parent to handle
    return `Query prepared: ${queryPath}\n\nThe parent agent should use the task tool to dispatch this query to a ${args.agentType} agent, with the query file path as context.`
  }
})

export const read_query_result = tool({
  description: "Read the result of a previously dispatched agent query",
  args: {
    queryId: tool.schema.string().describe("Query ID to read result for"),
  },
  async execute(args, context) {
    const queriesDir = join(context.worktree || context.directory, ".opencode", "queries")
    const resultPath = join(queriesDir, `${args.queryId}-result.json`)
    
    if (!existsSync(resultPath)) {
      return `No result found for query: ${args.queryId}. The query may still be processing.`
    }
    
    const result = readJSON<any>(resultPath, null)
    return JSON.stringify(result, null, 2)
  }
})

export const write_query_result = tool({
  description: "Write the result of an agent query",
  args: {
    queryId: tool.schema.string().describe("Query ID to write result for"),
    result: tool.schema.string().describe("Result from the agent"),
    status: tool.schema.enum(["success", "partial", "failed"]).describe("Status of the result"),
  },
  async execute(args, context) {
    const queriesDir = join(context.worktree || context.directory, ".opencode", "queries")
    ensureDir(queriesDir)
    
    const resultPath = join(queriesDir, `${args.queryId}-result.json`)
    
    const resultData = {
      queryId: args.queryId,
      result: args.result,
      status: args.status,
      timestamp: new Date().toISOString(),
      agent: context.agent || "unknown"
    }
    
    writeJSON(resultPath, resultData)
    
    return `Result written for query: ${args.queryId}`
  }
})
