#!/usr/bin/env node

// Validate the project-local OpenCode framework without external dependencies.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSchemaValue } from "./schema-validator.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const frameworkRoot = path.join(repoRoot, ".opencode");
const metricsRoot = path.join(frameworkRoot, "metrics");
const schemasRoot = path.join(frameworkRoot, "schemas");

const requiredFiles = [
  ".opencode/opencode.json",
  ".opencode/README.md",
  ".opencode/commands/factory-setup.md",
  ".opencode/rules/architecture-standards.md",
  ".opencode/rules/design-patterns.md",
  ".opencode/rules/build-methodology.md",
  ".opencode/rules/context-continuity.md",
  ".opencode/extensions/graphify.js",
  ".opencode/skills/document-coherence/SKILL.md",
  ".opencode/schemas/phase-state.schema.json",
  ".opencode/schemas/confidence.schema.json",
  ".opencode/schemas/execution-outcome.schema.json",
  ".opencode/schemas/swarm.schema.json",
  ".opencode/schemas/shipped.schema.json",
  ".opencode/agents/setup-mode-resolver.md",
  ".opencode/agents/setup-scube-collector.md",
  ".opencode/agents/setup-discovery-reader.md",
  ".opencode/agents/setup-file-generator.md",
  ".opencode/agents/setup-coherence-verifier.md",
  ".opencode/scripts/codegraph-mcp.cmd",
  ".opencode/scripts/codegraph-mcp.sh"
];

const metricSchemas = [
  { pattern: /^confidence-.*\.json$/i, schema: "confidence.schema.json" },
  { pattern: /^execution-outcome-.*\.json$/i, schema: "execution-outcome.schema.json" },
  { pattern: /^phase-state-.*\.json$/i, schema: "phase-state.schema.json" },
  { pattern: /^shipped-.*\.json$/i, schema: "shipped.schema.json" },
  { pattern: /^swarm-.*\.json$/i, schema: "swarm.schema.json" },
  { pattern: /^design-verification-.*\.json$/i, schema: "design-verification.schema.json" },
  { pattern: /^design-execution-.*\.json$/i, schema: "design-execution.schema.json" },
  { pattern: /^context-state-.*\.json$/i, schema: "context-state.schema.json" },
  { pattern: /^design-handoff-.*\.json$/i, schema: "design-handoff.schema.json" },
  { pattern: /^agent-performance\.json$/i, schema: "agent-performance.schema.json" }
];

const staleReferences = [
  "CLAUDE-BUILD.md",
  "docs/discovery-to-build-bridge.md",
  "old `scube`",
  "PostToolUse Hooks",
  "Every Edit/Write triggers",
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS"
];

// Walk a directory recursively and return files with a given suffix.
async function listFiles(dirPath, suffix) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, suffix));
      continue;
    }

    if (!suffix || entry.name.endsWith(suffix)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Read JSON with a helpful failure when the file is malformed.
async function readJson(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

// Record a failure in one place so output stays consistent.
function fail(failures, message) {
  failures.push(message);
}

async function validateRequiredFiles(failures) {
  for (const relativePath of requiredFiles) {
    const fullPath = path.join(repoRoot, relativePath);

    try {
      await fs.access(fullPath);
    } catch {
      fail(failures, `missing required file: ${relativePath}`);
    }
  }
}

async function validateCommandContracts(failures) {
  const buildMethodology = await fs.readFile(path.join(frameworkRoot, "rules", "build-methodology.md"), "utf8");
  const factorySetup = await fs.readFile(path.join(frameworkRoot, "commands", "factory-setup.md"), "utf8");
  const planSlice = await fs.readFile(path.join(frameworkRoot, "commands", "plan-slice.md"), "utf8");

  if (buildMethodology.includes("/plan-execution")) {
    fail(failures, "build methodology still references /plan-execution");
  }

  if (!buildMethodology.includes("inside `/plan-slice`")) {
    fail(failures, "build methodology does not describe Phase 4 as part of /plan-slice");
  }

  if (!planSlice.includes("confidence metric")) {
    fail(failures, "plan-slice does not document confidence metric output");
  }

  // Factory-setup is now a thin orchestrator; contract checks moved to subagents
  if (!factorySetup.includes("setup-mode-resolver")) {
    fail(failures, "factory-setup does not reference setup-mode-resolver agent");
  }

  if (!factorySetup.includes("setup-scube-collector")) {
    fail(failures, "factory-setup does not reference setup-scube-collector schema");
  }

  if (!factorySetup.includes("setup-discovery-reader")) {
    fail(failures, "factory-setup does not reference setup-discovery-reader agent");
  }

  if (!factorySetup.includes("setup-file-generator")) {
    fail(failures, "factory-setup does not reference setup-file-generator agent");
  }

  if (!factorySetup.includes("setup-coherence-verifier")) {
    fail(failures, "factory-setup does not reference setup-coherence-verifier agent");
  }

  // Contract strings now live in schema definitions
  const scubeCollector = await fs.readFile(path.join(frameworkRoot, "agents", "setup-scube-collector.md"), "utf8");
  const modeResolver = await fs.readFile(path.join(frameworkRoot, "agents", "setup-mode-resolver.md"), "utf8");

  if (!modeResolver.includes("scube")) {
    fail(failures, "setup-mode-resolver does not advertise scube mode");
  }

  if (!scubeCollector.includes("Questions")) {
    fail(failures, "setup-scube-collector schema does not define Questions table");
  }

  if (!scubeCollector.includes("Next.js API Routes")) {
    fail(failures, "setup-scube-collector schema does not include Next.js API Routes as backend option");
  }

  if (!scubeCollector.includes("Router") || !scubeCollector.includes("onditional")) {
    fail(failures, "setup-scube-collector schema does not define conditional Next.js router follow-up");
  }
}

async function validateContextContinuity(failures) {
  const config = await readJson(path.join(frameworkRoot, "opencode.json"));
  const instructions = config.instructions || [];
  const contextRule = ".opencode/rules/context-continuity.md";

  if (!instructions.includes(contextRule)) {
    fail(failures, `opencode.json does not auto-load ${contextRule}`);
  }

  const phaseStateSchema = await readJson(path.join(schemasRoot, "phase-state.schema.json"));
  const requiredCursorFields = [
    "start_position",
    "current_position",
    "next_required_action",
    "approved_artifacts",
    "last_completed_step",
    "blockers"
  ];

  for (const field of requiredCursorFields) {
    if (!phaseStateSchema.properties?.[field]) {
      fail(failures, `phase-state schema missing context cursor field: ${field}`);
    }

    if (!phaseStateSchema.required?.includes(field)) {
      fail(failures, `phase-state schema does not require context cursor field: ${field}`);
    }
  }

  const phaseCommands = ["plan-brief", "slice", "plan-slice", "build", "harden", "ship", "design-brief", "design-slice", "design-plan-slice", "design-build", "design-verify"];

  for (const commandName of phaseCommands) {
    const filePath = path.join(frameworkRoot, "commands", `${commandName}.md`);
    const content = await fs.readFile(filePath, "utf8");

    if (!content.includes("## Restore Context")) {
      fail(failures, `${path.relative(repoRoot, filePath)} missing Restore Context pre-flight`);
    }

    if (!content.includes("phase-state-{jira-key}.json") && !content.includes("phase-state-{ticket-id}.json")) {
      fail(failures, `${path.relative(repoRoot, filePath)} does not reference phase-state cursor`);
    }
  }

  const harden = await fs.readFile(path.join(frameworkRoot, "commands", "harden.md"), "utf8");

  if (!harden.includes("Context Packet")) {
    fail(failures, "harden command does not require Context Packet for dispatched agents");
  }

  const plugin = await fs.readFile(path.join(frameworkRoot, "extensions", "graphify.js"), "utf8");

  if (!plugin.includes("experimental.session.compacting")) {
    fail(failures, "graphify plugin does not inject context continuity during compaction");
  }

  if (!config.plugin?.some((entry) => String(entry).includes(".opencode/extensions/graphify.js"))) {
    fail(failures, "graphify plugin is not explicitly configured in opencode.json");
  }
}

async function validateStaleReferences(failures) {
  const markdownFiles = await listFiles(frameworkRoot, ".md");

  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, "utf8");

    for (const marker of staleReferences) {
      if (content.includes(marker)) {
        fail(failures, `stale reference '${marker}' found in ${path.relative(repoRoot, filePath)}`);
      }
    }
  }
}

async function validateMetrics(failures) {
  const schemaCache = new Map();
  const metricFiles = await listFiles(metricsRoot, ".json");

  for (const filePath of metricFiles) {
    const fileName = path.basename(filePath);
    const schemaMatch = metricSchemas.find(({ pattern }) => pattern.test(fileName));

    if (!schemaMatch) {
      fail(failures, `no schema mapping defined for metric file ${fileName}`);
      continue;
    }

    if (!schemaCache.has(schemaMatch.schema)) {
      schemaCache.set(schemaMatch.schema, await readJson(path.join(schemasRoot, schemaMatch.schema)));
    }

    try {
      const metric = await readJson(filePath);
      const errors = validateSchemaValue(metric, schemaCache.get(schemaMatch.schema));

      for (const error of errors) {
        fail(failures, `${path.relative(repoRoot, filePath)}: ${error}`);
      }
    } catch (error) {
      fail(failures, `${path.relative(repoRoot, filePath)}: ${error.message}`);
    }
  }

  return metricFiles.length;
}

async function validateDesignContracts(failures) {
  const designCommands = ["design-brief", "design-slice", "design-plan-slice", "design-build", "design-verify"];

  for (const commandName of designCommands) {
    const filePath = path.join(frameworkRoot, "commands", `${commandName}.md`);
    const content = await fs.readFile(filePath, "utf8");

    if (!content.includes("## Output") && !content.includes("## Output Location") && !content.includes("## Record Outcome") && !content.includes("## Post-Verification: Record Outcome")) {
      fail(failures, `${commandName}.md missing output location documentation`);
    }
  }

  const designSchemas = ["design-verification.schema.json", "design-execution.schema.json", "design-handoff.schema.json"];

  for (const schemaName of designSchemas) {
    try {
      await fs.access(path.join(schemasRoot, schemaName));
    } catch {
      fail(failures, `design schema required but missing: ${schemaName}`);
    }
  }

  const designVerify = await fs.readFile(path.join(frameworkRoot, "commands", "design-verify.md"), "utf8");
  const buildMd = await fs.readFile(path.join(frameworkRoot, "commands", "build.md"), "utf8");
  const planBrief = await fs.readFile(path.join(frameworkRoot, "commands", "plan-brief.md"), "utf8");

  if (!designVerify.includes("design-handoff")) {
    fail(failures, "design-verify does not produce design-handoff metric");
  }

  if (!buildMd.includes("design-handoff")) {
    fail(failures, "build does not check design-handoff during context restore");
  }

  if (!planBrief.includes("design-handoff")) {
    fail(failures, "plan-brief does not check design-handoff during context restore");
  }
}

async function main() {
  const failures = [];

  await validateRequiredFiles(failures);
  await validateCommandContracts(failures);
  await validateDesignContracts(failures);
  await validateContextContinuity(failures);
  await validateStaleReferences(failures);
  const metricCount = await validateMetrics(failures);

  if (failures.length > 0) {
    console.error("Framework validation failed.\n");
    failures.forEach((message) => console.error(`- ${message}`));
    process.exitCode = 1;
    return;
  }

  console.log("Framework validation passed.");
  console.log(`Required files: ${requiredFiles.length}`);
  console.log(`Metric files checked: ${metricCount}`);
}

main().catch((error) => {
  console.error("Framework validation failed.\n");
  console.error(`- ${error.message}`);
  process.exitCode = 1;
});
