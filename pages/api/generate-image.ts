import { NextApiRequest, NextApiResponse } from "next";

const QSTASH = process.env.QSTASH_URL || `https://qstash.upstash.io`;
const DALL_E = process.env.DALL_E_URL || "https://api.openai.com/v1/images/generations";
const VERCEL_URL = process.env.VERCEL_URL || "https://vercel.com/jose-alvarados-projects-9bde703d/dall-e/DtLPXu1WimYvPsvijPtnfDaiW6Ma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.query;
  try {
    const response = await fetch(`${QSTASH + DALL_E}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
        "upstash-forward-Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "Upstash-Callback": `${VERCEL_URL}/api/callback`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      }),
    });
    const json = await response.json();
    return res.status(202).json({ id: json.messageId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, type: "Internal server error" });
  }
}
