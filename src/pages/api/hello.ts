// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "@/generate";

type Data = {
  // prompt: string;
  file: { file: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const file = await generateImage(req.body.prompt);
  res.status(200).json({ file });
}
