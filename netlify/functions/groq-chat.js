export default async (request) => {
  try {
    const { prompt } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ reply: "Chưa có key Groq. Thầy thêm GROQ_API_KEY vào Environment variables nhé!" }), { status: 200 });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: "Bạn là Trợ Lý Sư Phạm AI V4.0 trường THCS Bình Hòa. Hỗ trợ soạn bài giảng, giáo án, kế toán, nhận xét học sinh. Trả lời chi tiết, thân thiện bằng tiếng Việt." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500
      })
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ reply: "Lỗi tạm thời từ AI. Thầy thử lại nhé!" }), { status: 200 });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ reply: "Lỗi kết nối. Thầy deploy lại xem sao ạ!" }), { status: 200 });
  }
};

export const config = { path: "/api/groq-chat" };