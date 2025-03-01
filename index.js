import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import OpenAI from "openai";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://pobytzknxtqijlebvqzb.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('your_table_name').select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Fetched data:', data);
  }
}

testConnection();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Load API key from .env file
});

async function generateImage() {
  try {
    const response = await openai.images.generate({
      prompt: "A futuristic cyberpunk cityscape at night",
      n: 1,
      size: "1024x1024"
    });

    console.log("Generated Image URL:", response.data[0].url);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generateImage();

