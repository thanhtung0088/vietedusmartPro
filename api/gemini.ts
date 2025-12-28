import { GoogleGenAI, TextGenerationModel } from "@google/genai";
import type { Request, Response } from "express";

// Khởi tạo client AI với API_KEY từ biến môi trường
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// Khởi tạo model Gemini cụ thể
const model = new TextGenerationModel({ client: ai, model: "gemini-1.5" });

export const generateLessonPlan = async (req: Request, res: Response) => {
  try {
    if (!process.env.API_KEY) {
      return res.status(500).json({ error: "API Key chưa cấu hình trên Vercel" });
    }

    // Lấy dữ liệu từ body
    const { data } = req.body;

    // Gọi model.generate() để tạo nội dung
    const response = await model.generate({
      prompt: data,
      temperature: 0.7
    });

    // Trả kết quả JSON
    return res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Có lỗi xảy ra" });
  }
};
