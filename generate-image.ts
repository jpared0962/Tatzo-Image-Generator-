import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";
import * as fs from 'fs';
import fetch from 'node-fetch';

console.log("Using OpenAI API Key:", process.env.OPENAI_API_KEY?.substring(0, 10) + "********");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env file!");
}

async function generateImage() {
  try {
    const response = await openai.images.generate({
      prompt: "A futuristic cyberpunk cityscape at night",
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
    fs.writeFileSync("generated_image.png", Buffer.from(buffer));

    console.log("Image saved as generated_image.png");
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generateImage();

