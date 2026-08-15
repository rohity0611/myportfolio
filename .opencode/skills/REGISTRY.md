# Skill Registry

Skills are invoked via the `skill` tool: `skill({name: "skill-name"})`

## Active Skills

| Skill | When to Invoke | Related Commands | Related Agents |
|-------|---------------|------------------|----------------|
| `api-security-best-practices` | Secure API design (auth, input validation, rate limiting) | /plan-slice, /build, /harden | security-reviewer, backend-engineer |
| `brainstorming` | Before creative or constructive work (features, architecture) | /plan-brief, /slice | explore, deep-thinker |
| `clean-code` | Writing, reviewing, or refactoring code | /build, /harden | refactor, code-standards-agent |
| `context7-mcp` | Library/framework documentation needed | /build, /plan-slice | explore, frontend-engineer, backend-engineer |
| `deploy-to-vercel` | Deployment actions | /ship | devops-engineer |
| `dispatching-parallel-agents` | Launch multiple independent subagents concurrently | /harden | executor |
| `docker-expert` | Containerization needed | /build, /harden | devops-engineer |
| `document-coherence` | Documentation needs updating or conflict resolution | /update-architecture | documentation-agent, document-coherence |
| `executing-plans` | Have a written plan to execute with review checkpoints | /build | executor |
| `finishing-a-development-branch` | Implementation complete, need to integrate work | /ship | executor |
| `find-skills` | Discovering or installing skills | /add-skill | general |
| `frontend-design` | Building web components, pages, dashboards, UI layouts | /build | frontend-engineer |
| `frontend-security-coder` | Frontend security patterns needed | /harden | security-reviewer |
| `react-best-practices` | React/Next.js optimization | /build | frontend-engineer |
| `receiving-code-review` | Accept and process code review feedback constructively | /build, /harden | refactor |
| `requesting-code-review` | Prepare work for peer review before merging | /ship | qa-verifier |
| `research-first` | Need to gather context before making decisions | /plan-brief, /slice, /plan-slice, /build | explore |
| `skill-creator` | Creating new CLI skills following standards | /add-skill | general |
| `subagent-driven-development` | Executing implementation plans with independent tasks | /build | executor |
| `system-design-generator` | Architecture planning needed | /plan-brief, /slice | system-design-engineer |
| `systematic-debugging` | Encountering any bug, test failure, or unexpected behavior | /build, /harden | debugger |
| `test-driven-development` | Implementing features or bugfixes, before writing code | /build | test-writer |
| `verification-before-completion` | Any success/completion claims | /build, /harden | qa-verifier |
| `vercel-react-best-practices` | React/Next.js performance optimization | /build | frontend-engineer |
| `web-design-guidelines` | UI review needed | /harden | accessibility-agent |
| `webapp-testing` | Playwright testing needed | /build | test-writer |
| `using-git-worktrees` | Work on multiple branches simultaneously without switching | /build, /harden | executor |
| `writing-plans` | Have specs or requirements, before touching code | /plan-slice | general |
| `writing-skills` | Creating, updating, or improving agent skills | /add-skill | skill-creator |
| `imugi-verify` | Visual verification of built UI against Figma design | /design-verify | explore, frontend-engineer |
| `figma-design-to-code` | **MANDATORY** for Figma-to-code conversion — loads design context, adapts reference code, maps to project conventions | /design-plan-slice, /design-build | frontend-engineer |
| `extract-design-system` | Extract design primitives from existing codebase | /design-brief, /plan-brief | explore, frontend-engineer |
| `prototype` | Rapid prototyping from Figma designs | /design-plan-slice, /design-build | frontend-engineer |
| `design-taste-frontend` | Frontend design taste and quality review | /design-build, /design-verify | frontend-engineer, code-standards-agent |
| `grill-me` | Plan pressure-testing before code | /design-brief, /design-slice, /design-plan-slice, /plan-brief | explore, general |
| `improve-codebase-architecture` | Architecture analysis and improvement | /design-slice, /plan-brief | explore, system-design-engineer |
| `image-to-code` | Convert design images to code | /design-build, /build | frontend-engineer |
| `tdd` | Test-driven development workflow | /build | test-writer |
| `caveman` | Cut output tokens by 65%, keep technical facts | /build, /harden | executor, code-standards-agent |
| `handoff` | Compress session for continuation | /ship | executor |

## Skill Invocation Pattern

### In Commands

Add to command `.md` files:

```markdown
## Related Skills
Before executing, load relevant skill:
- `skill({name: "skill-name"})` — for {use case}
```

### In Agents

Agents can invoke skills directly:

```
skill({name: "research-first"})
```

### In Conversations

User or agent can invoke:

```
Use the skill tool to load: skill({name: "clean-code"})
```

## Adding New Skills

1. Run `/add-skill` command
2. Skill is installed to `.opencode/skills/{skill-name}/`
3. Reference card is created
4. Registry is updated

## Skill Categories

### Planning Skills
- `brainstorming` — idea validation
- `writing-plans` — plan creation
- `research-first` — context gathering
- `system-design-generator` — architecture planning

### Execution Skills
- `executing-plans` — plan execution
- `subagent-driven-development` — parallel execution
- `dispatching-parallel-agents` — concurrent subagent dispatch
- `test-driven-development` — TDD workflow

### Quality Skills
- `clean-code` — code quality
- `verification-before-completion` — completion verification
- `systematic-debugging` — bug investigation
- `receiving-code-review` — accepting code review feedback

### Code Review Skills
- `requesting-code-review` — preparing work for peer review

### Specialized Skills
- `frontend-design` — UI/UX
- `react-best-practices` — React optimization
- `vercel-react-best-practices` — Next.js optimization
- `document-coherence` — documentation
- `finishing-a-development-branch` — git integration
- `skill-creator` — skill creation
- `writing-skills` — creating and maintaining agent skills

### Infrastructure Skills
- `docker-expert` — containerization
- `deploy-to-vercel` — deployment
- `context7-mcp` — library docs
- `using-git-worktrees` — parallel branch work with git worktrees

### Security Skills
- `api-security-best-practices` — API security
- `frontend-security-coder` — Frontend security

### Design Workflow Skills
- `imugi-verify` — visual verification loop (SSIM + pixelmatch + Claude Vision)
- `figma-design-to-code` — Figma-to-code conversion (MANDATORY for /design-plan-slice, /design-build)
- `extract-design-system` — extract design primitives from codebase
- `prototype` — rapid prototyping from Figma designs
- `design-taste-frontend` — frontend design quality review
- `image-to-code` — convert design images to code
- Figma MCP tools — design data extraction and code generation (via MCP server)

### Planning & Pressure-Testing Skills
- `grill-me` — plan pressure-testing before code
- `improve-codebase-architecture` — architecture analysis and improvement

### Code Quality Skills
- `tdd` — test-driven development workflow
- `caveman` — cut output tokens, keep technical facts
- `handoff` — compress session for continuation
