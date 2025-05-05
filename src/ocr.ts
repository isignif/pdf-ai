import { Mistral } from "@mistralai/mistralai";
import { Api as IsignifApi } from "./lib/isignif/Api.js";
import { z } from "zod";
import { getSystemPrompt } from "./prompts.ts";
import { setTimeout } from "node:timers/promises";

const waitPolite = () => setTimeout(500);

export function useIsignifOCR(
  mistral: Mistral,
  isignifBaseUrl: string,
  token = "",
) {
  const isignifHost = isignifBaseUrl.replace("/api/v1", "");
  const isignifApi = new IsignifApi({
    baseUrl: isignifBaseUrl,
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  async function getOcrPages(file: File) {
    const fileRes = await mistral.files.upload({ file: file, purpose: "ocr" });
    const fileUrl = await mistral.files.getSignedUrl({ fileId: fileRes.id });

    const ocrRes = await mistral.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        documentUrl: fileUrl.url,
        type: "document_url",
      },
    });
    return ocrRes.pages;
  }

  const ResponseFormat = z.object({
    significations: z.array(
      z
        .object({
          zipCode: z
            .string()
            .describe(
              "le code postal de la signification (il s'agit souvent de 5 chiffres)",
            ),
          name: z
            .string()
            .describe(
              "le nom de la signification qui permet à l'utilisateur de la retrouver facilement. Il s'agit souvent du lieu qui indique à l'huissier ou signifier l'acte (exemple: 'Carrefour Meyzieu' )",
            ),
        })
        .describe("La signification à signifier"),
    ),
    actType: z.string(),
    reference: z
      .string()
      .optional()
      .describe(
        "Une référence noté sur le document afin d'indentifier la demande et de la retrouver facilement",
      ),
  });

  async function computeFile(file: File) {
    // endure the token is valid
    try {
      // TODO: find a more efficient way
      const { ok } = await isignifApi.acts.actsList();
      if (!ok) throw Error("Token is not valid");
    } catch {
      throw Error("Token is not valid");
    }

    const ocrFile = await getOcrPages(file);
    await waitPolite();
    const ocrFileContent = ocrFile.map((p) => p.markdown).join("\n---\n");
    const res = await mistral.chat.parse({
      model: "ministral-3b-latest",
      messages: [
        {
          role: "system",
          content: await getSystemPrompt(),
        },
        {
          role: "user",
          content: `Bonjour, je souhaiterais créer un acte sur iSignif, voici le contenu de mon document qui contient les information de mon acte et des significations (il peut il y en avoir qu'une seule). Peux-tu t'occupper d'extraire les information afin que je puisse créer l'acte moi même ?\n\n\n${ocrFileContent}`,
        },
      ],
      responseFormat: ResponseFormat,
    });
    const data = ResponseFormat.parse(res.choices?.at(0)?.message?.parsed);

    const actTypes = await isignifApi.actTypes.actTypesList();
    // @ts-expect-error bad typing from Swagger
    const actTypeId = actTypes.data.data.at(0).id;

    const {
      data: { data: act },
    } = await isignifApi.acts.actsCreate({
      act_type_id: actTypeId,
      reference: data.reference,
    });
    if (act?.id === undefined) throw Error("Failded to create the act");
    console.log(`Created an act ${isignifHost}/acts/${act.id}`);

    for (const { name, zipCode } of data.significations) {
      const { data: signification } =
        await isignifApi.acts.significationsCreate(act.id, {
          name,
          zip_code: zipCode,
        });
      console.log("Created a signification", signification);
    }

    await isignifApi.acts.actFilesCreate(act.id, {
      name: "Signification",
      files: [
        {
          name: file.name,
          // @ts-ignore
          url: await fileToDataUrl(file),
        },
      ],
    });
    console.log(`Uploaded the file`);

    return { ...data, actId: act.id, url: `${isignifHost}/acts/${act.id}` };
  }

  return { computeFile };
}

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");
  return `data:${file.type};base64,${base64String}`;
}

export async function ocr(mistral: Mistral, file: Blob | File) {
  const fileRes = await mistral.files.upload({
    file: file,
    purpose: "ocr",
  });
  const fileUrl = await mistral.files.getSignedUrl({ fileId: fileRes.id });

  const ocrRes = await mistral.ocr.process({
    model: "mistral-ocr-latest",
    document: {
      documentUrl: fileUrl.url,
      type: "document_url",
    },
  });
  return ocrRes.pages;
}
