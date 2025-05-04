import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { useIsignifOCR } from "./ocr.ts";
import { logger } from "hono/logger";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) throw new Error("Missing OpenAI API key");

// TODO: get from ENV
const isignifBaseUrl = "http://localhost:3000/api/v1";

const mistral = new Mistral({ apiKey });

const app = new Hono();

app.use(logger());

app.post(
  "/from-pdf",
  zValidator("header", z.object({ authorization: z.string() })),
  zValidator(
    "form",
    z.object({
      file: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
          message: "File must be a PDF",
        }),
    }),
  ),
  async (c) => {
    const { authorization: iSignifToken } = c.req.valid("header");
    const { file } = c.req.valid("form");

    const { computeFile } = useIsignifOCR(
      mistral,
      isignifBaseUrl,
      iSignifToken,
    );

    const res = await computeFile(file);
    console.log(res);
    return c.json(res);
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
