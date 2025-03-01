export default function handler(req, res) {
  // Retrieve the prompt from the query parameters
  const { prompt } = req.query;

  // For now, we'll return a simple JSON response.
  // Replace this with your actual image generation logic later.
  res.status(200).json({ message: `Received prompt: ${prompt}` });
}