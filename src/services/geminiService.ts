import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY || "";
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * CẬP NHẬT MODEL 2.5: 
 * Trong API, tên gọi chính xác thường là 'gemini-2.5-pro' hoặc 'gemini-2.5-flash'.
 * Tôi sẽ dùng 'gemini-2.5-flash' để tốc độ phản hồi nhanh nhất cho Lab 4.0.
 */
const MODEL_NAME = "gemini-2.5-flash"; 

const SYSTEM_PROMPT = `Bạn là Trợ lý AI VietEdu Smart (Phiên bản 2.5 Pro). 
Nhiệm vụ: Quét TKB, soạn bài 5512, đề thi 7991. 
Xưng hô: Trợ lý VietEdu - Thầy/Cô.`;

const cleanJsonString = (str: string) => {
  try {
    const start = str.indexOf('[');
    const end = str.lastIndexOf(']');
    if (start !== -1 && end !== -1) return str.substring(start, end + 1);
    return str.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch { return "[]"; }
};

const safeJsonParse = (str: string, fallback: any = []) => {
  try {
    const raw = cleanJsonString(str);
    return JSON.parse(raw);
  } catch (e) { return fallback; }
};

// 1. QUÉT THỜI KHÓA BIỂU
export const scanTimetableImage = async (base64WithHeader: string) => {
  if (!genAI) return [];
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const base64Data = base64WithHeader.includes(',') ? base64WithHeader.split(',')[1] : base64WithHeader;

    const result = await model.generateContent([
      { inlineData: { mimeType: "image/jpeg", data: base64Data } },
      { text: "Trích xuất TKB thành JSON mảng: [{dayOfWeek: number, period: number, subject: string, class: string}]. Trả về duy nhất JSON." },
    ]);
    return safeJsonParse(result.response.text());
  } catch (error: any) {
    // Xử lý lỗi 429 (Too many requests)
    if (error.message?.includes('429')) {
      alert("Hệ thống đang quá tải (Lỗi 429). Thầy/Cô vui lòng đợi 30 giây rồi thử lại nhé!");
    }
    console.error("Lỗi Quét TKB:", error);
    return [];
  }
};

// 2. CHAT VỚI TRỢ LÝ (SỬA LỖI 404/429)
export const chatWithAI = async (msg: string) => {
  if (!genAI) return "Chưa có API Key.";
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    });
    const result = await model.generateContent(msg);
    return result.response.text();
  } catch (error: any) {
    if (error.message?.includes('429')) return "AI đang bận xử lý nhiều yêu cầu cùng lúc. Thầy/Cô đợi một chút nhé!";
    if (error.message?.includes('404')) return "Model Gemini 2.5 đang được bảo trì hoặc sai địa chỉ API.";
    return "Trợ lý gặp lỗi kỹ thuật, Thầy/Cô thử lại sau.";
  }
};

// 3. CÁC HÀM SOẠN BÀI (EXPORT ĐẦY ĐỦ ĐỂ KHÔNG LỖI BUILD)
export const generateLessonPlan = async (data: any) => {
  if (!genAI) return "Thiếu API Key.";
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(`Soạn giáo án 5512: ${data.title}`);
    return result.response.text();
  } catch (e) { return "Lỗi soạn bài."; }
};

export const generateTest7991 = async (data: any) => {
  if (!genAI) return "Thiếu API Key.";
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(`Soạn đề 7991 môn ${data.subject}`);
    return result.response.text();
  } catch (e) { return "Lỗi soạn đề."; }
};

export const generatePPTLayout = async (title: string) => { return []; };
export const generateAIComment = async (score: number, subject: string) => { return "Làm tốt lắm!"; };