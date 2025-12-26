import { GoogleGenAI } from "@google/genai";

// ✅ ĐÚNG CHUẨN VITE
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ Missing VITE_GEMINI_API_KEY");
}

// Khởi tạo AI
const ai = new GoogleGenAI({ apiKey });

export const generateLessonPlan = async (data: any) => {
  if (!apiKey) return "Lỗi: Thầy chưa cấu hình API Key trên Vercel.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Soạn giáo án theo mẫu Công văn 5512 môn ${data.subject} lớp ${data.grade}: ${data.title}. Mục tiêu: ${data.objectives}`,
  });

  return response.text || "";
};

export const generatePPTLayout = async (topic: string) => {
  if (!apiKey) return "Cần API Key để soạn nội dung Slide.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Gợi ý bố cục và nội dung chi tiết cho 5 slide PowerPoint về chủ đề: ${topic}.`,
  });

  return response.text || "";
};

export const generateTest7991 = async (data: any) => {
  if (!apiKey) return "Cần API Key để soạn đề.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Thiết kế ma trận và đề kiểm tra theo quy định 7991 môn ${data.subject} lớp ${data.grade}.`,
  });

  return response.text || "";
};

export const scanTimetableImage = async (base64: string) => {
  if (!apiKey) return [];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64, mimeType: "image/jpeg" } },
        {
          text: "Phân tích ảnh thời khóa biểu và trích xuất thành mảng JSON: [{ period: number, subject: string, isMorning: boolean }]. Chỉ trả về JSON."
        }
      ]
    },
    config: { responseMimeType: "application/json" }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch {
    return [];
  }
};

export const generateAIComment = async (score: number, subject: string) => {
  if (!apiKey) return "Cần API Key.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Viết 1 câu nhận xét sư phạm ngắn gọn cho học sinh được ${score} điểm môn ${subject}.`,
  });

  return response.text || "";
};

export const chatWithAI = async (msg: string) => {
  if (!apiKey)
    return "Chào Thầy! Hãy cấu hình API Key trên Vercel để tôi có thể hỗ trợ Thầy nhé.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: msg,
  });

  return response.text || "";
};
