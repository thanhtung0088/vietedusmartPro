import { GoogleGenAI } from "@google/genai";

// Khởi tạo instance AI một lần duy nhất bằng API_KEY từ biến môi trường
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLessonPlan = async (data: any) => {
  if (!process.env.API_KEY) return "Lỗi: Thầy chưa cấu hình API Key trên Vercel.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Soạn giáo án theo mẫu Công văn 5512 môn ${data.subject} lớp ${data.grade}: ${data.title}. Mục tiêu: ${data.objectives}`,
  });
  return response.text;
};

export const generatePPTLayout = async (topic: string) => {
  if (!process.env.API_KEY) return "Cần API Key để soạn nội dung Slide.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gợi ý bố cục và nội dung chi tiết cho 5 slide PowerPoint về chủ đề: ${topic}.`,
  });
  return response.text;
};

export const generateTest7991 = async (data: any) => {
  if (!process.env.API_KEY) return "Cần API Key để soạn đề.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Thiết kế ma trận và đề kiểm tra theo quy định 7991 môn ${data.subject} lớp ${data.grade}.`,
  });
  return response.text;
};

export const scanTimetableImage = async (base64: string) => {
  if (!process.env.API_KEY) return [];
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64, mimeType: 'image/jpeg' } },
        { text: "Phân tích ảnh thời khóa biểu và trích xuất thành mảng JSON: [{ 'period': number, 'subject': 'string', 'isMorning': boolean }]. Chỉ trả về JSON." }
      ]
    },
    config: { responseMimeType: "application/json" }
  });
  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [];
  }
};

export const generateAIComment = async (score: number, subject: string) => {
  if (!process.env.API_KEY) return "Cần API Key.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Viết 1 câu nhận xét sư phạm ngắn gọn cho học sinh được ${score} điểm môn ${subject}.`,
  });
  return response.text || "";
};

export const chatWithAI = async (msg: string) => {
  if (!process.env.API_KEY) return "Chào Thầy! Hãy cấu hình API Key trên Vercel để tôi có thể hỗ trợ Thầy nhé.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: msg,
  });
  return response.text;
};