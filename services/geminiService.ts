let ai: any = null;

const getAI = async () => {
  if (ai) return ai;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  // ⚠️ IMPORT ĐỘNG – KHÔNG LOAD KHI APP KHỞI ĐỘNG
  const { GoogleGenAI } = await import("@google/genai");
  ai = new GoogleGenAI({ apiKey });

  return ai;
};

export const generateLessonPlan = async (data: any) => {
  try {
    const ai = await getAI();
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Soạn giáo án theo mẫu Công văn 5512 môn ${data.subject} lớp ${data.grade}: ${data.title}. Mục tiêu: ${data.objectives}`,
    });
    return res.text || "";
  } catch (e) {
    console.error(e);
    return "Lỗi AI. Vui lòng kiểm tra cấu hình.";
  }
};

export const chatWithAI = async (msg: string) => {
  try {
    const ai = await getAI();
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: msg,
    });
    return res.text || "";
  } catch {
    return "AI hiện chưa sẵn sàng.";
  }
};
