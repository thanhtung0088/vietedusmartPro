import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `Bạn là Trợ lý AI Toàn năng của Hệ sinh thái Giáo dục VietEdu Smart (Phiên bản Lab Số 4.0).
Nhiệm vụ của bạn:
1. Hỗ trợ giáo viên soạn giáo án chuẩn 5512, đề kiểm tra 7991, rubrics đánh giá.
2. Tư vấn phương pháp sư phạm hiện đại, ứng dụng CNTT vào giảng dạy.
3. Giải đáp các thắc mắc về quản lý hồ sơ chuyên môn, sổ điểm, sổ chủ nhiệm.
4. Trả lời bằng ngôn ngữ sư phạm, chuyên nghiệp, khích lệ và ngắn gọn.
5. Luôn xưng hô là "Trợ lý VietEdu" và gọi người dùng là "Thầy/Cô".`;

export const chatWithAI = async (msg: string) => {
  if (!process.env.API_KEY) return "Chào Thầy/Cô! Hãy cấu hình API Key để tôi có thể hỗ trợ nhé.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: msg,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });
  return response.text;
};

export const generateLessonPlan = async (data: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Soạn giáo án theo mẫu Công văn 5512 môn ${data.subject} lớp ${data.grade}: ${data.title}. Mục tiêu: ${data.objectives}`,
    config: { systemInstruction: SYSTEM_PROMPT }
  });
  return response.text;
};

export const generatePPTLayout = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gợi ý bố cục và nội dung chi tiết cho 5 slide PowerPoint về chủ đề: ${topic}.`,
    config: { systemInstruction: SYSTEM_PROMPT }
  });
  return response.text;
};

export const generateTest7991 = async (data: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Thiết kế ma trận và đề kiểm tra theo quy định 7991 môn ${data.subject} lớp ${data.grade}.`,
    config: { systemInstruction: SYSTEM_PROMPT }
  });
  return response.text;
};

export const scanTimetableImage = async (base64: string) => {
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
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Viết 1 câu nhận xét sư phạm ngắn gọn cho học sinh được ${score} điểm môn ${subject}.`,
    config: { systemInstruction: SYSTEM_PROMPT }
  });
  return response.text || "";
};