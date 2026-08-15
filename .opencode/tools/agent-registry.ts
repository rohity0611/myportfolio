import { tool } from "@opencode-ai/plugin"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

interface AgentCapability {
  name: string
  capabilities: string[]
  triggerConditions: string[]
  inputFormat: string
  outputFormat: string
  dependencies: string[]
  conflictsWith: string[]
  maxConcurrent: number
}

interface AgentRegistry {
  version: string
  lastUpdated: string
  agents: AgentCapability[]
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

export const query_agent_registry = tool({
  description: "Query the agent registry to find the best agent for a task",
  args: {
    query: tool.schema.string().describe("Task description or keywords to match against agent capabilities"),
    capabilities: tool.schema.array(tool.schema.string()).optional().describe("Required capabilities to filter by"),
  },
  async execute(args, context) {
    const registryPath = join(context.worktree || context.directory, ".opencode", "schemas", "agent-registry.json")
    const registry = readJSON<AgentRegistry>(registryPath, { version: "1.0.0", lastUpdated: new Date().toISOString(), agents: [] })
    
    if (registry.agents.length === 0) {
      return "Agent registry is empty. Run the generate-registry command first."
    }
    
    const queryLower = args.query.toLowerCase()
    
    // Score each agent based on query match
    const scored = registry.agents.map(agent => {
      let score = 0
      
      // Check trigger conditions
      for (const trigger of agent.triggerConditions) {
        if (queryLower.includes(trigger.toLowerCase())) {
          score += 10
        }
      }
      
      // Check capabilities
      for (const cap of agent.capabilities) {
        if (queryLower.includes(cap.toLowerCase())) {
          score += 5
        }
      }
      
      // Check name match
      if (queryLower.includes(agent.name.toLowerCase())) {
        score += 15
      }
      
      return { agent, score }
    })
    
    // Filter by required capabilities if provided
    let filtered = scored
    if (args.capabilities && args.capabilities.length > 0) {
      filtered = scored.filter(({ agent }) => {
        return args.capabilities!.every(cap => 
          agent.capabilities.some(a => a.toLowerCase().includes(cap.toLowerCase()))
        )
      })
    }
    
    // Sort by score descending
    filtered.sort((a, b) => b.score - a.score)
    
    // Return top 3 matches
    const topMatches = filtered.slice(0, 3)
    
    if (topMatches.length === 0) {
      return `No agents found matching query: ${args.query}`
    }
    
    const results = topMatches.map(({ agent, score }) => {
      return `## ${agent.name} (score: ${score})
- Capabilities: ${agent.capabilities.join(", ")}
- Trigger conditions: ${agent.triggerConditions.join(", ")}
- Input format: ${agent.inputFormat}
- Output format: ${agent.outputFormat}`
    })
    
    return `Top matching agents for: "${args.query}"\n\n${results.join("\n\n")}`
  }
})

export const list_agents = tool({
  description: "List all registered agents and their capabilities",
  args: {},
  async execute(args, context) {
    const registryPath = join(context.worktree || context.directory, ".opencode", "schemas", "agent-registry.json")
    const registry = readJSON<AgentRegistry>(registryPath, { version: "1.0.0", lastUpdated: new Date().toISOString(), agents: [] })
    
    if (registry.agents.length === 0) {
      return "Agent registry is empty. Run the generate-registry command first."
    }
    
    const agentList = registry.agents.map(agent => {
      return `- **${agent.name}**: ${agent.capabilities.join(", ")}`
    })
    
    return `Registered agents (${registry.agents.length} total):\n\n${agentList.join("\n")}`
  }
})

export const update_agent_registry = tool({
  description: "Update an agent's registry entry",
  args: {
    name: tool.schema.string().describe("Agent name"),
    capabilities: tool.schema.array(tool.schema.string()).optional().describe("Capabilities"),
    triggerConditions: tool.schema.array(tool.schema.string()).optional().describe("Trigger conditions"),
    inputFormat: tool.schema.string().optional().describe("Input format"),
    outputFormat: tool.schema.string().optional().describe("Output format"),
    dependencies: tool.schema.array(tool.schema.string()).optional().describe("Dependencies"),
    conflictsWith: tool.schema.array(tool.schema.string()).optional().describe("Conflicts with"),
    maxConcurrent: tool.schema.number().optional().describe("Max concurrent instances"),
  },
  async execute(args, context) {
    const registryPath = join(context.worktree || context.directory, ".opencode", "schemas", "agent-registry.json")
    ensureDir(join(context.worktree || context.directory, ".opencode", "schemas"))
    
    const registry = readJSON<AgentRegistry>(registryPath, { version: "1.0.0", lastUpdated: new Date().toISOString(), agents: [] })
    
    const existingIndex = registry.agents.findIndex(a => a.name === args.name)
    
    const agent: AgentCapability = {
      name: args.name,
      capabilities: args.capabilities || [],
      triggerConditions: args.triggerConditions || [],
      inputFormat: args.inputFormat || "any",
      outputFormat: args.outputFormat || "any",
      dependencies: args.dependencies || [],
      conflictsWith: args.conflictsWith || [],
      maxConcurrent: args.maxConcurrent || 1
    }
    
    if (existingIndex >= 0) {
      registry.agents[existingIndex] = agent
    } else {
      registry.agents.push(agent)
    }
    
    registry.lastUpdated = new Date().toISOString()
    writeJSON(registryPath, registry)
    
    return `Agent "${args.name}" registered/updated successfully.`
  }
})
