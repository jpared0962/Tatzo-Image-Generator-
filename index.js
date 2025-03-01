import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://pobytzknxtqijlebvqzb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYnl0emtueHRxaWpsZWJ2cXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzIwOTIsImV4cCI6MjA1NjM0ODA5Mn0.UaQP86giG3BYqrT413vIZZB9zl97mgKl2nHb32Qi66o';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  const { data, error } = await supabase.from('your_table_name').select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Fetched data:', data);
  }
}

testConnection();
import 'dotenv/config';
import OpenAI from "openai";

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

