import { Configuration, OpenAIApi } from "openai";
import { supabase } from '../../utils/supabaseClient';

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// Your handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const prompt = req.query.prompt || "A cat in a spaceship";
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "256x256",
      });

      const imageUrl = response.data.data[0]?.url;

      // Store the image URL in Supabase
      const { error } = await supabase.from('images').insert([{ image_url: imageUrl }]);

      if (error) {
        console.error("Error storing image URL:", error);
        res.status(500).json({ error: "Failed to store image" });
      } else {
        res.status(200).json({ imageUrl });
      }

    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Image generation failed" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}