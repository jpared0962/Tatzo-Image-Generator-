import { useState } from "react";

const questions = [
  "What style of tattoo do you prefer? (e.g., traditional, tribal, watercolor)",
  "What colors do you envision?",
  "Any symbols or elements you want included?",
];

export default function TattooQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleAnswer = () => {
    if (!input.trim()) return;
    
    const newAnswers = [...answers, input.trim()];
    setAnswers(newAnswers);
    setInput("");

    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      // All questions answered; generate image.
      generateImage(newAnswers);
    }
  };

  const generateImage = async (answers: string[]) => {
    setLoading(true);
    // You could customize how the prompt is built. For this example:
    const prompt = `A tattoo design inspired by the following preferences: ${answers.join(
      ", "
    )}`;
    try {
      const res = await fetch(`/api/generateImage?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      {imageUrl ? (
        <div>
          <h2>Your Tattoo Design</h2>
          <img src={imageUrl} alt="Generated Tattoo Design" style={{ maxWidth: "100%" }} />
        </div>
      ) : (
        <div>
          <h3>{questions[currentStep]}</h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            style={{ padding: "8px", width: "80%" }}
          />
          <br />
          <button onClick={handleAnswer} style={{ padding: "8px 16px", marginTop: "12px" }}>
            Next
          </button>
          {loading && <p>Generating your tattoo design...</p>}
        </div>
      )}
    </div>
  );
}