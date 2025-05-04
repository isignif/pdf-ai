import fs from "node:fs/promises";
import path from "node:path";

let systemPrompt: string | undefined = undefined;

export async function getSystemPrompt() {
  if (systemPrompt) return systemPrompt;

  const promptPath = path.join(import.meta.dirname, "prompts", "system.md");
  systemPrompt = await fs.readFile(promptPath, { encoding: "utf8" });

  return systemPrompt;
}
