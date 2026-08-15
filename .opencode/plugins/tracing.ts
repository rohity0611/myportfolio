import type { Plugin } from "@opencode-ai/plugin"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

interface TraceSpan {
  traceId: string
  spanId: string
  parentSpanId?: string
  operation: string
  startTime: string
  endTime?: string
  duration?: number
  status: "running" | "success" | "error"
  tool: string
  args?: Record<string, any>
  error?: string
}

interface TraceContext {
  traceId: string
  rootSpanId: string
  spans: TraceSpan[]
  startTime: number
}

const activeTraces: Map<string, TraceContext> = new Map()

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function writeTrace(trace: TraceContext): void {
  const tracesDir = join(process.cwd(), ".opencode", "traces")
  ensureDir(tracesDir)
  const traceFile = join(tracesDir, `${trace.traceId}.json`)
  
  writeFileSync(traceFile, JSON.stringify({
    traceId: trace.traceId,
    rootSpanId: trace.rootSpanId,
    spans: trace.spans,
    duration: Date.now() - trace.startTime,
    status: trace.spans.some(s => s.status === "error") ? "error" : "success"
  }, null, 2))
}

// Extends graphify's tool hooks with distributed tracing spans
// graphify reminds about context, we capture execution traces
export const TracingPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  return {
    "tool.execute.before": async (input, output) => {
      // graphify reminds about graph-report
      // We add span capture for observability
      const traceKey = worktree || directory
      let trace = activeTraces.get(traceKey)
      
      if (!trace) {
        trace = {
          traceId: generateId(),
          rootSpanId: generateId(),
          spans: [],
          startTime: Date.now()
        }
        activeTraces.set(traceKey, trace)
      }
      
      const span: TraceSpan = {
        traceId: trace.traceId,
        spanId: generateId(),
        parentSpanId: trace.spans.length > 0 ? trace.spans[trace.spans.length - 1].spanId : undefined,
        operation: `tool.${input.tool}`,
        startTime: new Date().toISOString(),
        status: "running",
        tool: input.tool,
        args: output?.args
      }
      
      trace.spans.push(span)
    },

    "tool.execute.after": async (input, output) => {
      // End span, record duration
      const traceKey = worktree || directory
      const trace = activeTraces.get(traceKey)
      
      if (trace && trace.spans.length > 0) {
        const span = trace.spans[trace.spans.length - 1]
        span.endTime = new Date().toISOString()
        span.duration = Date.now() - new Date(span.startTime).getTime()
        span.status = output?.error ? "error" : "success"
        
        if (output?.error) {
          span.error = output.error
        }
        
        writeTrace(trace)
      }
    },

    "session.idle": async (input, output) => {
      // Write final trace
      const traceKey = worktree || directory
      const trace = activeTraces.get(traceKey)
      
      if (trace) {
        writeTrace(trace)
        activeTraces.delete(traceKey)
      }
    }
  }
}
