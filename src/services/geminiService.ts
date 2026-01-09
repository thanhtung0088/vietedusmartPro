import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_PROMPT = `Bạn là Trợ lý AI Toàn năng của Hệ sinh thái Giáo dục VietEdu Smart (Phiên bản Lab Số 4.0).
Nhiệm vụ của bạn:
1. Hỗ trợ giáo viên soạn giáo án chuẩn 5512, đề kiểm tra 7991, rubrics đánh giá.
2. Tư vấn phương pháp sư phạm hiện đại, ứng dụng CNTT vào giảng dạy.
3. Trả lời bằng ngôn ngữ sư phạm, chuyên nghiệp, khích lệ và ngắn gọn.
4. Luôn xưng hô là "Trợ lý VietEdu" và gọi người dùng là "Thầy/Cô".`;

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const cleanJsonString = (str: string) => {
  if (!str) return "[]";
  return str.replace(/```json/g, "").replace(/```/g, "").trim();
};

const safeJsonParse = (str: string, fallback: any = []) => {
  try {
    const raw = cleanJsonString(str);
    const parsed = JSON.parse(raw);
    
    if (Array.isArray(parsed)) {
      return parsed.map(item => {
        const newItem: any = {};
        for (const key in item) {
          const val = item[key];
          // Critical Defense: React Error #31 occurs when an object is rendered as a child.
          // We force all non-primitive values to strings or defined defaults.
          if (val === null || val === undefined) {
            newItem[key] = "";
          } else if (typeof val === 'object') {
            newItem[key] = JSON.stringify(val);
          } else {
            newItem[key] = val;
          }
        }
        return newItem;
      });
    }
    return parsed;
  } catch (e) {
    console.error("Lỗi phân tích JSON từ AI:", e);
    return fallback;
  }
};

export const chatWithAI = async (msg: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: msg }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });
    return response.text || "";
  } catch (error: any) {
    console.error("Lỗi Chat AI:", error);
    if (error.message?.includes("Requested entity was not found")) throw new Error("API_NOT_FOUND");
    throw error;
  }
};

export const scanTimetableImage = async (base64: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64,
            },
          },
          {
            text: 'Hãy trích xuất thời khóa biểu từ hình ảnh này thành định dạng JSON mảng các đối tượng { dayOfWeek: number (2-8), period: number (1-5), subject: string, isMorning: boolean, class: string }. Chỉ trả về JSON.',
          },
        ],
      }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dayOfWeek: { type: Type.INTEGER },
              period: { type: Type.INTEGER },
              subject: { type: Type.STRING },
              isMorning: { type: Type.BOOLEAN },
              class: { type: Type.STRING },
            },
            required: ['dayOfWeek', 'period', 'subject', 'isMorning'],
          },
        },
      },
    });
    return safeJsonParse(response.text || "[]");
  } catch (error) {
    console.error('Scan TKB Error:', error);
    return [];
  }
};

export const generateLessonPlan = async (data: any) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Soạn giáo án 5512 môn ${data.subject} lớp ${data.grade} CTGDPT 2018: ${data.title}. Mục tiêu: ${data.objectives}` }] }],
      config: { systemInstruction: SYSTEM_PROMPT }
    });
    return response.text || "";
  } catch (e) {
    console.error("Lỗi Soạn Giáo Án:", e);
    return "Không thể khởi tạo giáo án lúc này.";
  }
};

export const generatePPTLayout = async (title: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Bố cục slide cho chủ đề giáo dục: ${title}. Trả về dạng JSON mảng các Slide { title: string, content: string }.` }] }],
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["title", "content"]
          }
        }
      }
    });
    return safeJsonParse(response.text || "[]");
  } catch (e) {
    console.error("Lỗi PPT AI:", e);
    return [];
  }
};

export const generateTest7991 = async (data: any) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Soạn đề kiểm tra môn ${data.subject} lớp ${data.grade} chuẩn 7991 bao gồm ma trận đặc tả và đáp án.` }] }],
      config: { systemInstruction: SYSTEM_PROMPT }
    });
    return response.text || "";
  } catch (e) {
    console.error("Lỗi Đề Kiểm Tra:", e);
    return "Lỗi khởi tạo đề thi.";
  }
};

export const generateAIComment = async (score: number, subject: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Viết 1 câu nhận xét sư phạm ngắn, khích lệ cho học sinh được ${score} điểm môn ${subject}. Chỉ trả về nội dung nhận xét nằm trong dấu ngoặc kép. Xưng em với học sinh.` }] }],
      config: { systemInstruction: SYSTEM_PROMPT }
    });
    return response.text || "";
  } catch (e) {
    return "\"Em cần cố gắng hơn.\"";
  }
};

export const generateAIImage = async (prompt: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: `Vẽ một bức ảnh minh họa giáo dục 3D cho chủ đề: ${prompt}.` }] }],
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};