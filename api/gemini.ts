import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generate({
      model: "gemini-1.5-flash",
      prompt: req.body.prompt,
    });

    res.status(200).json({
      text: result.text || "",
    });
  } catch (err) {
    res.status(500).json({ error: "Gemini error" });
  }
}
