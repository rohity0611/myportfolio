---
description: "Install an OpenCode skill to project-local .opencode/skills/. Validates SKILL.md and registers for invocation."
---

# Add Skill

Install a skill to `.opencode/skills/` and register it for invocation.

## Installation Location

Skills are installed to **project-local** directory:
```
.opencode/skills/{skill-name}/SKILL.md
```

## From GitHub Repository

1. Clone skill folder:
```bash
git clone --depth 1 --sparse https://github.com/owner/repo.git .tmp-skill
cd .tmp-skill
git sparse-checkout set skills/skill-name
```

2. Copy to `.opencode/skills/`:
```bash
Copy-Item -Path ".tmp-skill/skills/skill-name" -Destination ".opencode/skills/skill-name" -Recurse
Remove-Item -Path ".tmp-skill" -Recurse -Force
```

3. Validate SKILL.md:
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('.opencode/skills/skill-name/SKILL.md','utf8');const m=s.match(/^---\r?\n([\s\S]*?)\r?\n---/);if(!m){console.log('FAIL: no frontmatter');process.exit(1);}const fm=m[1];const name=(fm.match(/^name:\s*(.+)$/m)||[])[1];const desc=(fm.match(/^description:\s*(.+)$/m)||[])[1];if(!name||!desc){console.log('FAIL: missing name or description');process.exit(1);}console.log('OK: '+name);"
```

## From Local Path

```bash
Copy-Item -Path "path/to/skill-folder" -Destination ".opencode/skills/skill-folder" -Recurse
```

## Post-Install Registration

### 1. Create Reference Card

Create `.opencode/skills/{skill-name}/REFERENCE.md`:

```markdown
# {skill-name} Reference

## When to Use
{description from SKILL.md}

## How to Invoke
Use `skill` tool: `skill({name: "{skill-name}"})`

## Related Commands
- /command-1
- /command-2

## Related Agents
- agent-type-1
- agent-type-2
```

### 2. Update Command Files

Add to relevant command `.md` files:

```markdown
## Related Skills
Before executing, load relevant skills:
- `skill({name: "writing-skills"})` — creating and maintaining agent skills
- `skill({name: "{skill-name}"})` — for {use case}
```

### 3. Update Skill Registry

Add entry to `.opencode/skills/REGISTRY.md`:

```markdown
| {skill-name} | {trigger description} | /cmd1, /cmd2 | explore, executor |
```

## Skill Requirements

A valid skill must have:
- `SKILL.md` with YAML frontmatter
- `name`: lowercase hyphen-separated (1-64 chars)
- `description`: what and when to use (1-1024 chars)

## Verify Installation

1. Check skill appears in `.opencode/skills/` directory
2. Test invocation: `skill({name: "skill-name"})`
3. Verify command references are updated
