import React, { useState, useEffect, useMemo } from 'react';

const GradeBook: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelPasteData, setExcelPasteData] = useState('');
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  // CẤU HÌNH HỆ THỐNG: 12 KHỐI, 15 LỚP
  const [grade, setGrade] = useState('Khối 6');
  const [className, setClassName] = useState('6.1');
  const [subject, setSubject] = useState('Toán học');
  const [semester, setSemester] = useState('Học kỳ 1');

  const gradeOptions = Array.from({ length: 12 }, (_, i) => `Khối ${i + 1}`);
  const classOptions = useMemo(() => {
    const gNum = grade.split(' ')[1];
    return Array.from({ length: 15 }, (_, i) => `${gNum}.${i + 1}`);
  }, [grade]);

  const subjectOptions = [
    "Toán học", "Ngữ văn", "Tiếng Anh", "Giáo dục công dân", "Lịch sử & Địa lý", 
    "Khoa học tự nhiên", "Tin học", "Công nghệ", "Giáo dục thể chất", "Nghệ thuật", 
    "Hoạt động trải nghiệm", "Nội dung giáo dục địa phương"
  ];

  // KHO LỜI PHÊ TỪ FILE WORD (Dữ liệu chuẩn Thông tư 22)
  const aiCommentsDB = {
    tot: [
      "Em học được, có cố gắng rất nhiều, kĩ năng đọc văn bản tốt, có sự cảm thụ văn học.",
      "Em mạnh dạn, tự tin trong giờ học tích cực xây dựng bài.",
      "Em có khả năng tư duy và suy luận tốt, kiến thức vững.",
      "Em có năng khiếu về môn học, biết tư duy và vận dụng vào bài làm rất tốt."
    ],
    kha: [
      "Nắm vững kiến thức trọng tâm, kỹ năng thực hành tốt.",
      "Đáp ứng tốt các yêu cầu học tập, hoàn thành bài tập đúng hạn.",
      "Có ý thức tự giác học tập, luôn hoàn thành các bài tập cơ bản."
    ],
    dat: [
      "Đáp ứng được các yêu cầu cần đạt, có sự cố gắng trong học tập.",
      "Em có ý thức học tập nhưng chưa thật sự chủ động.",
      "Cần đặt ra mục tiêu rõ ràng và chủ động hơn trong việc học."
    ],
    chuadat: [
      "Kiến thức môn học chưa vững, ý thức học tập chưa cao.",
      "Em còn lo ra, chưa tập trung, chưa tích cực làm bài tập giáo viên giao.",
      "Chưa đáp ứng được yêu cầu cần đạt, cần rèn luyện thêm kỷ luật."
    ]
  };

  useEffect(() => {
    const key = `grade_v13_${grade}_${className}_${subject}_${semester}`;
    const saved = localStorage.getItem(key);
    if (saved) setStudents(JSON.parse(saved));
    else setStudents([]);
  }, [grade, className, subject, semester]);

  const save = (data: any[]) => {
    const key = `grade_v13_${grade}_${className}_${subject}_${semester}`;
    localStorage.setItem(key, JSON.stringify(data));
    setStudents(data);
  };

  const handleImportExcel = () => {
    const rows = excelPasteData.trim().split('\n');
    const newStudents = rows.map((row, i) => {
      const cols = row.split('\t');
      let score = parseFloat(cols[cols.length - 1]?.replace(',', '.')) || 0;
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: cols[1] || `Học sinh ${i + 1}`,
        avg: score.toFixed(1),
        comment: ''
      };
    });
    save([...students, ...newStudents]);
    setIsExcelModalOpen(false);
    setExcelPasteData('');
  };

  const handleAICommentBulk = () => {
    setIsBulkGenerating(true);
    setTimeout(() => {
      const updated = students.map(s => {
        const score = parseFloat(s.avg);
        let pool = score >= 8 ? aiCommentsDB.tot : score >= 6.5 ? aiCommentsDB.kha : score >= 5 ? aiCommentsDB.dat : aiCommentsDB.chuadat;
        const randomComment = pool[Math.floor(Math.random() * pool.length)];
        return { ...s, comment: `"${randomComment}"` };
      });
      save(updated);
      setIsBulkGenerating(false);
    }, 800);
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      {/* HEADER: MÀU TRẮNG SẠCH SẼ */}
      <div className="bg-white border-b-2 border-indigo-100 px-6 py-4 shadow-sm z-50">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 hover:bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 transition-colors">
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200">
            <select value={grade} onChange={e => setGrade(e.target.value)} className="bg-transparent px-4 py-1.5 text-[11px] font-black uppercase outline-none text-indigo-900">
              {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={className} onChange={e => setClassName(e.target.value)} className="bg-transparent px-4 py-1.5 text-[11px] font-black outline-none border-l-2 border-slate-200 text-indigo-900">
              {classOptions.map(c => <option key={c} value={c}>Lớp {c}</option>)}
            </select>
            <select value={subject} onChange={e => setSubject(e.target.value)} className="bg-transparent px-4 py-1.5 text-[11px] font-black outline-none border-l-2 border-slate-200 text-indigo-900">
              {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="ml-auto flex gap-3">
             <button onClick={() => setIsExcelModalOpen(true)} className="bg-slate-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic shadow-md">Nhập Excel</button>
             <button onClick={handleAICommentBulk} disabled={isBulkGenerating} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic shadow-xl shadow-indigo-200">
               {isBulkGenerating ? '🌀 Đang xử lý...' : '🚀 Chạy AI nhận xét'}
             </button>
          </div>
        </div>
      </div>

      {/* BẢNG ĐIỂM: TIÊU ĐỀ XANH - KẺ HÀNG ĐẬM */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="max-w-full mx-auto bg-white border-2 border-indigo-100 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#4f46e5] text-white sticky top-0 z-10">
              <tr className="text-[11px] font-black uppercase tracking-widest text-left">
                <th className="p-5 w-16 text-center border-r border-white/10">STT</th>
                <th className="p-5 min-w-[250px] border-r border-white/10">Học sinh</th>
                <th className="p-5 w-28 text-center bg-indigo-700 border-r border-white/10">TB mhk</th>
                <th className="p-5">Nhận xét chi tiết (Gemini AI)</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-200">
              {students.map((s, idx) => (
                <tr key={s.id} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="p-5 text-center text-slate-400 font-black text-xs border-r-2 border-slate-100">{idx + 1}</td>
                  <td className="p-5 font-black text-slate-800 uppercase italic text-[13px] border-r-2 border-slate-100">{s.name}</td>
                  <td className="p-5 text-center border-r-2 border-slate-100">
                    <span className="bg-indigo-600 text-white font-black text-[15px] px-3 py-1 rounded-lg">
                      {s.avg}
                    </span>
                  </td>
                  <td className="p-5 text-[13px] text-slate-700 italic font-bold leading-relaxed px-6 py-4 bg-slate-50/30">
                    {s.comment || <span className="text-slate-300 font-normal">Chờ xử lý dữ liệu...</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NHẬP DỮ LIỆU */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-900/60 backdrop-blur-md p-4">
           <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-3xl">
              <textarea 
                value={excelPasteData} onChange={e => setExcelPasteData(e.target.value)} rows={8} 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-6 text-[12px] outline-none mb-8 font-bold" 
                placeholder="Dán từ Excel vào đây..." 
              />
              <button onClick={handleImportExcel} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl uppercase italic">
                Đồng bộ hóa dữ liệu
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default GradeBook;