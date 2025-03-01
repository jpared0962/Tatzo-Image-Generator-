import 'dotenv/config';
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import fs from 'fs';
import fetch from 'node-fetch';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.query;

  try {
    const response = await openai.images.generate({
      prompt: prompt as string,
      n: 1,
      size: "1024x1024"
    });

    if (!response || !response.data || response.data.length === 0) {
      throw new Error("No image URL returned from OpenAI API.");
    }

    const imageUrl = response.data[0].url;
    console.log("Generated Image URL:", imageUrl);

    // Fetch and save the image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    fs.writeFileSync("public/generated_image.png", Buffer.from(buffer));

    console.log("Image saved as public/generated_image.png");
    res.status(200).json({ message: "Image generated successfully", url: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ message: error.message });
  }
}
