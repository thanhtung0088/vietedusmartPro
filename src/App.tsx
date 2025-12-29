import { useState } from 'react';
import './App.css'; // Nếu có file CSS, giữ nguyên

function App() {
  const [monHoc, setMonHoc] = useState('');
  const [lop, setLop] = useState('');
  const [chuDe, setChuDe] = useState('');
  const [soTiet, setSoTiet] = useState('1');
  const [ketQua, setKetQua] = useState('');
  const [dangTai, setDangTai] = useState(false);

  const handleSoanGiaoAn = async () => {
    if (!monHoc || !lop || !chuDe) {
      alert('Vui lòng nhập đầy đủ Môn học, Lớp và Chủ đề!');
      return;
    }

    setDangTai(true);
    setKetQua('Đang soạn giáo án bằng Gemini, vui lòng chờ giây lát...');

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
      setKetQua('Lỗi: Không tìm thấy API Key. Kiểm tra biến môi trường Netlify.');
      setDangTai(false);
      return;
    }

    const prompt = `Soạn giáo án chi tiết theo đúng mẫu giáo án Việt Nam hiện hành cho:
- Môn học: ${monHoc}
- Lớp: ${lop}
- Chủ đề bài học: ${chuDe}
- Số tiết: ${soTiet}

Cấu trúc giáo án đầy đủ bao gồm:
1. Mục tiêu bài học (kiến thức, kỹ năng, thái độ)
2. Chuẩn bị (của giáo viên và học sinh)
3. Tiến trình dạy học:
   - Hoạt động khởi động
   - Hoạt động hình thành kiến thức mới
   - Hoạt động luyện tập
   - Hoạt động vận dụng
4. Củng cố, dặn dò và đánh giá

Viết bằng tiếng Việt chuẩn mực, rõ ràng, chi tiết, có ví dụ hoạt động học sinh cụ thể và sáng tạo.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-flash-latest:generateContent?key=${API_KEY}
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi API ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;

      // Định dạng đẹp hơn với markdown-like
      setKetQua(text);
    } catch (error: any) {
      console.error(error);
      setKetQua(`Đã xảy ra lỗi: ${error.message}`);
    } finally {
      setDangTai(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Soạn bài AI (Gemini)</h1>
        <p>Trang này sẽ dùng Gemini để soạn giáo án tự động.</p>
      </header>

      <div className="form-container">
        <div className="input-group">
          <label>Môn học</label>
          <input
            type="text"
            placeholder="Ví dụ: Toán học, Ngữ văn, Tiếng Anh..."
            value={monHoc}
            onChange={(e) => setMonHoc(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Lớp</label>
          <input
            type="text"
            placeholder="Ví dụ: 6, 10, 11..."
            value={lop}
            onChange={(e) => setLop(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Chủ đề bài học</label>
          <input
            type="text"
            placeholder="Ví dụ: Hàm số bậc hai, Thơ lãng mạn..."
            value={chuDe}
            onChange={(e) => setChuDe(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Số tiết</label>
          <input
            type="number"
            min="1"
            value={soTiet}
            onChange={(e) => setSoTiet(e.target.value)}
          />
        </div>

        <button onClick={handleSoanGiaoAn} disabled={dangTai} className="soan-btn">
          {dangTai ? 'Đang soạn...' : 'Soạn giáo án'}
        </button>
      </div>

      {ketQua && (
        <div className="result-container">
          <h2>Kết quả giáo án</h2>
          <pre>{ketQua}</pre>
        </div>
      )}
    </div>
  );
}

export default App;