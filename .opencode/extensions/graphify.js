// Graphify OpenCode plugin (explicitly configured in opencode.json).
// Purpose: add lightweight graph/context reminders without breaking startup.

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export default async ({ directory }) => {
  let reminded = false;
  const hasGraphReport = () =>
    existsSync(join(directory, "graph-report.md")) ||
    existsSync(join(directory, "GRAPH_REPORT.md"));

  return {
    "tool.execute.before": async (input, output) => {
      try {
        if (reminded) return;
        if (input.tool !== "bash") return;
        if (!hasGraphReport()) return;

        output.args.command =
          'echo "[graphify] Graph report found (graph-report.md). Read it before broad repo searches." && ' +
          output.args.command;
        reminded = true;
      } catch {
        // Never block tool execution if the plugin hook fails.
      }
    },

    "experimental.session.compacting": async (_input, output) => {
      try {
        if (!hasGraphReport()) return;

        const metricsDir = join(directory, ".opencode", "metrics");
        if (!existsSync(metricsDir)) return;

        const phaseStateFiles = readdirSync(metricsDir)
          .filter((fileName) => /^phase-state-.*\.json$/i.test(fileName))
          .sort();

        if (phaseStateFiles.length === 0) return;

        output.context.push(
          [
            "## OpenCode Factory Context Continuity",
            "Restore run position from the correct phase-state cursor before choosing the next command.",
            `Available phase-state files: ${phaseStateFiles.join(", ")}`,
            "Read `.opencode/rules/context-continuity.md` and the relevant `.opencode/metrics/phase-state-{jira-key}.json`."
          ].join("\n")
        );
      } catch {
        // Never block compaction if plugin introspection fails.
      }
    }
  };
};
