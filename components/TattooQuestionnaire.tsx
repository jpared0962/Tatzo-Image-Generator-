import { useState, useCallback } from "react";
import styles from './TattooQuestionnaire.module.css';

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
  const [error, setError] = useState("");

  const handleAnswer = useCallback(() => {
    if (!input.trim()) return;

    const newAnswers = [...answers, input.trim()];
    setAnswers(newAnswers);
    setInput("");

    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      generateImage(newAnswers);
    }
  }, [input, answers, currentStep, generateImage]);

  const generateImage = useCallback(async (answers: string[]) => {
    setLoading(true);
    setError("");
    const prompt = `A tattoo design inspired by the following preferences: ${answers.join(", ")}`;
    try {
      const res = await fetch(`/api/generateImage?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError("Failed to generate image");
      }
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error("Failed to generate image:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      {imageUrl ? (
        <div>
          <h2>Your Tattoo Design</h2>
          <img src={imageUrl} alt="Generated Tattoo Design" className={styles.image} />
        </div>
      ) : (
        <div>
          <h3>{questions[currentStep]}</h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className={styles.input}
          />
          <br />
          <button onClick={handleAnswer} className={styles.button}>
            Next
          </button>
          {loading && <p>Generating your tattoo design...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
}
