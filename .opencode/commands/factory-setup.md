---
description: "Factory Setup — Generate AGENTS.md, rules files, and architecture.html. Two modes: 'discovery' (from discovery outputs) or 'scube' (interactive tech stack definition)."
---

# Factory Setup

Configure this repository for the OpenCode Factory build workflow. Your job is to generate the lean AGENTS.md and supporting rules files.

## Restore Context

Before anything else, resolve `{jira-key}` from `$ARGUMENTS` if provided.

## Step 1: Resolve Mode

Use the `task` tool with subagent_type matching the agent name:

- task(subagent_type: "setup-mode-resolver", description: "Resolve factory setup mode", prompt: "Resolve the factory-setup mode from the command arguments. Arguments: $ARGUMENTS\n\nReturn a JSON object with 'mode' (discovery|scube) and 'reason'.")

**Preflight Gate:** Read the agent's response. If mode is not resolved (error returned), STOP and report the error to the human. Do NOT proceed to Step 2.

## Step 2: Collect Context

Based on the resolved mode from Step 1, dispatch the appropriate collector agent.

### Scube Mode

Read the question schema from `.opencode/agents/setup-scube-collector.md`.

Use the `question` tool to ask all questions in ONE batched call using the schema's `questions` array. Then ask the conditional follow-up (Next.js router) if applicable.

Collect answers and normalize into the JSON format specified in the schema's `output` section.

**Preflight Gate:** If required fields (app_name, description) are missing or empty, re-ask with specific error details. Do NOT proceed to Step 3 until all required fields are present.

### Discovery Mode

Use the `task` tool with subagent_type matching the agent name:

- task(subagent_type: "setup-discovery-reader", description: "Read and validate discovery outputs", prompt: "Validate and read discovery outputs from .discovery/ directory. Check these files exist and are non-empty: phase1-codebase-profile.md, phase2-architecture.md, phase2-code-quality.md, phase3-synthesis.md. Extract app name, tech stack, architecture layers, coding patterns, health score, and top risks.\n\nReturn a JSON object with: app_name, tech_stack, architecture, health_score, top_risks.")

**Preflight Gate:** Read the agent's response. If discovery files are missing or incomplete, STOP and report which files are missing. Do NOT proceed to Step 3.

## Step 3: Generate Files

Use the `task` tool with subagent_type matching the agent name:

- task(subagent_type: "setup-file-generator", description: "Generate AGENTS.md and rules files", prompt: "Generate AGENTS.md (<100 lines), .opencode/rules/architecture-standards.md, .opencode/rules/design-patterns.md, and architecture.html. Substitute {{APP_NAME}} with the provided app name. AGENTS.md must contain ONLY: project name, one-line description, rules auto-loading note, standing constraints, design principles, key file locations, FACTORY_CONFIG block, and File Size Discipline. Does NOT contain: build methodology, architecture details, coding conventions, phase descriptions.\n\nContext: {paste the JSON from Step 2 here}\n\nReturn a JSON object with: files_generated, agents_md_lines, app_name.")

**Preflight Gate:** Read the agent's response. If any output file is missing or AGENTS.md exceeds 100 lines, re-dispatch the generator with specific error details. Do NOT proceed to Step 4 until files are valid.

## Step 4: Verify Coherence

Use the `task` tool with subagent_type matching the agent name:

- task(subagent_type: "setup-coherence-verifier", description: "Verify document consistency", prompt: "Verify document consistency after file generation. Check: AGENTS.md exists and under 100 lines, all 7 rules files exist (architecture-standards, design-patterns, build-methodology, context-continuity, agentic-safety, senior-engineering-standards, memory), no duplication between AGENTS.md and rules files, architecture.html exists, git initialised.\n\nReturn a JSON object with: pass (true|false), agents_md_lines, issues array, checks object.")

**Preflight Gate:** Read the agent's response. If verification fails (pass is false), re-dispatch the file-generator to fix issues, then re-verify. Do NOT proceed to Step 5 until verification passes.

## Step 5: Archive (Discovery Mode Only)

If mode is discovery, archive the discovery outputs:

```bash
mkdir -p docs/discovery-archive
cp -r .discovery/* docs/discovery-archive/
```

## Post-Setup Verification

Verify the final state:

- [ ] `AGENTS.md` exists and is under 100 lines
- [ ] `.opencode/rules/architecture-standards.md` exists
- [ ] `.opencode/rules/design-patterns.md` exists
- [ ] `.opencode/rules/build-methodology.md` exists
- [ ] `architecture.html` exists
- [ ] No duplication between AGENTS.md and rules files
- [ ] Git initialised

## Design Workflow Detection

After setup, inform the user about the Design Factory:

> **Design Workflow Available:** If your brief includes a Figma URL, start with `/design-brief {ticket-id} {figma-url}` instead of `/plan-brief`. The Design Factory extracts tokens, generates verified components, and hands off to Build Factory automatically.
>
> See `docs/design-workflow.md` for the full D1-D5 pipeline.

## Completion Response (MANDATORY)

Report:

```
Factory v3.1 configured.
Mode: {discovery|scube}
AGENTS.md: {line_count} lines
Rules: 5 files auto-loading
Architecture: {full|skeleton}
Design Workflow: Available (use /design-brief for Figma-based features)
Ready to build — run /plan-brief to start.
```

Exact next command: `/plan-brief {jira-key}` (or `/design-brief {ticket-id} {figma-url}` if Figma URL provided)
