import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";

// Khởi tạo client AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateLessonPlan = async (req: Request, res: Response) => {
  try {
    if (!process.env.API_KEY) {
      return res.status(500).json({ error: "API Key chưa cấu hình trên Vercel" });
    }

    const { data } = req.body;

    // Gọi ai.generate() trực tiếp với object model
    const response = await ai.generate({
      model: "gemini-1.5",
      prompt: data,
      temperature: 0.7
    });

    return res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Có lỗi xảy ra" });
  }
};
