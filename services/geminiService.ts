import { GoogleGenerativeAI } from "@google/generative-ai";

// Lấy API key từ Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Model text – systemInstruction đúng chuẩn SDK mới nhất (role: "model")
const textModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: {
    role: "model",
    parts: [{ text: "Bạn là Trợ lý AI Toàn năng của Hệ sinh thái Giáo dục VietEdu Smart Pro. Luôn xưng hô là 'Trợ lý VietEdu' và gọi người dùng là 'Thầy/Cô'. Trả lời bằng tiếng Việt, chuyên nghiệp, thân thiện và hỗ trợ giáo viên tối đa." }]
  }
});

const visionModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generateText = async (prompt: string) => {
  const result = await textModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const chatWithAI = async (msg: string) => {
  return await generateText(msg);
};

export const generateLessonPlan = async (formData: any) => {
  const { subject, grade, title, periods = "1" } = formData;
  const prompt = `Soạn giáo án chi tiết cho môn ${subject}, lớp ${grade}, chủ đề "${title}", số tiết ${periods}.
Theo đúng mẫu giáo án Việt Nam hiện hành, đầy đủ các phần: Mục tiêu, Chuẩn bị, Tiến trình (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng), Củng cố - Đánh giá.
Viết bằng tiếng Việt chuẩn mực, rõ ràng, chi tiết, có hoạt động học sinh sáng tạo.`;
  return await generateText(prompt);
};

export const generateAIComment = async (diem: number, monHoc: string, hocSinh: string = "học sinh") => {
  const prompt = `Viết nhận xét cuối kỳ cho học sinh ${hocSinh}, môn ${monHoc}, điểm trung bình ${diem}.
Nhận xét phải chân thành, khích lệ, chỉ ra ưu điểm và góp ý nhẹ nhàng để tiến bộ. Độ dài khoảng 4-6 câu.`;
  return await generateText(prompt);
};

export const generatePPTLayout = async (title: string, monHoc: string = "môn học") => {
  const prompt = `Gợi ý bố cục slide PowerPoint cho bài giảng môn ${monHoc}, chủ đề "${title}".
Liệt kê 8-12 slide với tiêu đề và nội dung chính gợi ý cho mỗi slide.`;
  return await generateText(prompt);
};

export const generateTest7991 = async (formData: any) => {
  const { subject, grade } = formData;
  const chuDe = formData.title || formData.chuDe || "chủ đề chung";
  const prompt = `Tạo đề kiểm tra 45 phút môn ${subject} lớp ${grade}, chủ đề "${chuDe}".
Đề gồm phần trắc nghiệm và tự luận, có barem chấm điểm.`;
  return await generateText(prompt);
};

// Chỉ nhận 1 argument để tương thích với code hiện tại
export const generateTimetableAI = async (description: string = "") => {
  const prompt = `Phân tích mô tả thời khóa biểu sau và trả về JSON danh sách lịch dạy:
"${description}"
Format JSON: [{"dayOfWeek": number, "period": number, "isMorning": boolean, "subject": string, "class": string}]`;
  const text = await generateText(prompt);
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Parse timetable error:", text);
    return [];
  }
};

export const runAIAnalysisService = async () => {
  const prompt = `Phân tích dữ liệu học tập của trường và đưa ra nhận xét, khuyến nghị cải thiện bằng tiếng Việt chuyên nghiệp dành cho ban giám hiệu.`;
  return await generateText(prompt);
};

export const scanTimetableImage = async (base64Data: string) => {
  const result = await visionModel.generateContent([
    "Phân tích ảnh thời khóa biểu này và trả về JSON theo format: [{dayOfWeek: number, period: number, isMorning: boolean, subject: string, class: string}]",
    {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg"
      }
    }
  ]);

  const response = await result.response;
  const text = response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Parse error:", text);
    return [];
  }
};