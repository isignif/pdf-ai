import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { useIsignifOCR } from "./ocr.ts";
import { logger } from "hono/logger";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) throw new Error("Missing OpenAI API key");

const mistral = new Mistral({ apiKey });

const app = new Hono();

app.use(logger());

app.post(
  "/guess-pdf",
  zValidator(
    "form",
    z.object({
      file: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
          message: "File must be a PDF",
        }),
      iSignifToken: z.string(),
      iSignifApiUrl: z.string().default("http://isignif.fr/api/v1"),
    }),
  ),
  async (c) => {
    const { file, iSignifApiUrl, iSignifToken } = c.req.valid("form");

    const { computeFile } = useIsignifOCR(mistral, iSignifApiUrl, iSignifToken);

    try {
      const res = await computeFile(file);

      return c.redirect(res.url);
    } catch (error) {
      console.error(error);
      c.status(500);
      return c.json({ error: String(error) });
    }
  },
);

serve(
  {
    fetch: app.fetch,
    port: 4000,
    serverOptions: {},
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
