import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!);

export const handler = async (event: any) => {
  try {
    const { grade, subject, title, requirement } = JSON.parse(event.body);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Bạn là chuyên gia giáo dục Việt Nam.
Soạn KẾ HOẠCH BÀI DẠY chuẩn Bộ GD&ĐT.

Lớp: ${grade}
Môn: ${subject}
Tên bài: ${title}
Yêu cầu: ${requirement}

Trình bày gồm:
1. Mục tiêu
2. Chuẩn bị
3. Tiến trình dạy học
4. Hoạt động GV – HS
5. Đánh giá
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ content: text }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
