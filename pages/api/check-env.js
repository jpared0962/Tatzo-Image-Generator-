export default function handler(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not set" });
  }
  return res.status(200).json({ message: "OPENAI_API_KEY is loaded" });
}