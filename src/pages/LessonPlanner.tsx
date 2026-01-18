import React, { useState, useRef } from 'react';

const LessonPlanner: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedFlow, setSelectedFlow] = useState<'5512' | 'ppt' | '7991'>('ppt');
  const [grade, setGrade] = useState('Khối 6');
  const [subject, setSubject] = useState('Giáo dục công dân');
  const [lessonCount, setLessonCount] = useState('3');
  const [topic, setTopic] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pptSlides, setPptSlides] = useState<any[] | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // BỘ CHỦ ĐỀ MÀU SẮC CAO CẤP VÀ PHONG CÁCH MỚI
  const [selectedTheme, setSelectedTheme] = useState({ name: 'Bình Hòa', colors: ['#ff4d4d', '#1a1a1a', '#ffffff'] });
  const themes = [
    { name: 'Bình Hòa', colors: ['#ff4d4d', '#1a1a1a', '#ffffff'], desc: 'Đỏ Carbon - Đẳng cấp' },
    { name: 'Neon Ocean', colors: ['#00f2ff', '#0a0f1e', '#e0f2fe'], desc: 'Xanh Neon - Hiện đại' },
    { name: 'Cyber Gold', colors: ['#fbbf24', '#0f172a', '#fffbeb'], desc: 'Vàng Gold - Sang trọng' }
  ];

  const subjects = ["Toán", "Ngữ văn", "Tiếng Anh", "Vật lí", "Hóa học", "Sinh học", "Lịch sử & Địa lí", "Giáo dục công dân", "Công nghệ", "Tin học"];

  const handleGenerateAI = () => {
    if (!topic && attachedFiles.length === 0) {
      alert("Thầy vui lòng gắn dữ liệu (+) hoặc nhập nội dung để AI phân tích chuyên sâu!");
      return;
    }
    setIsGenerating(true);
    setPptSlides(null);
    setAiResult(null);

    setTimeout(() => {
      if (selectedFlow === 'ppt') {
        // AI TẠO 10 SLIDE VỚI TEMPLATE VÀ NỘI DUNG CHI TIẾT + HÌNH ẢNH MẪU
        setPptSlides([
          { id: 1, title: "TIÊU ĐỀ BÀI GIẢNG", content: `Chủ đề: ${topic.toUpperCase()}\nMôn: ${subject}\nGiáo viên: AI Assistant`, type: "Cover", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Cover" },
          { id: 2, title: "MỤC TIÊU BÀI HỌC", content: "• Kiến thức: Phân tích sâu từ tài liệu đính kèm.\n• Năng lực: Phát triển kỹ năng tư duy phản biện.\n• Phẩm chất: Bồi dưỡng ý thức công dân.", type: "Objectives", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Goal" },
          { id: 3, title: "KHỞI ĐỘNG: TRÒ CHƠI", content: "Dựa trên hình ảnh/video trong file đính kèm, hãy đoán tên sự kiện lịch sử...", type: "Game", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Game" },
          { id: 4, title: "NỘI DUNG CHÍNH (P1)", content: "Phân tích khái niệm và các yếu tố cơ bản...", type: "Content", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Content+1" },
          { id: 5, title: "NỘI DUNG CHÍNH (P2)", content: "Các ví dụ minh họa và ứng dụng thực tiễn...", type: "Content", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Content+2" },
          { id: 6, title: "THẢO LUẬN & PHÂN TÍCH", content: "Thảo luận nhóm về các trường hợp điển hình đã được cung cấp.", type: "Group Activity", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Discussion" },
          { id: 7, title: "LUYỆN TẬP & CỦNG CỐ", content: "Làm bài tập trắc nghiệm và điền khuyết để ôn lại kiến thức.", type: "Practice", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Exercise" },
          { id: 8, title: "VẬN DỤNG & SÁNG TẠO", content: "Đề xuất dự án nhỏ hoặc giải pháp cho vấn đề trong cộng đồng.", type: "Application", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Creativity" },
          { id: 9, title: "TỔNG KẾT & RÚT KINH NGHIỆM", content: "Sơ đồ tư duy tổng hợp kiến thức và các bài học rút ra.", type: "Summary", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Summary" },
          { id: 10, title: "DẶN DÒ & TÀI LIỆU", content: "Tài liệu tham khảo thêm và nhiệm vụ về nhà.", type: "Conclusion", image: "https://via.placeholder.com/600x300/101010/808080?text=AI+Generated+Thank+You" }
        ]);
      } else {
        setAiResult(`[KẾ HOẠCH BÀI DẠY CHI TIẾT 5512]\n\nMôn: ${subject} - ${grade} (${lessonCount} tiết)\nBài: ${topic}\n\nI. MỤC TIÊU (Phân tích sâu dữ liệu thực)...\nII. THIẾT BỊ DẠY HỌC (Dựa trên tài liệu gắn kèm)...\nIII. TIẾN TRÌNH DẠY HỌC (4 bước Phụ lục 4)...`);
      }
      setIsGenerating(false);
    }, 5000); // Tăng thời gian để AI "tạo" hình ảnh và thiết kế
  };

  // Hàm giả lập tạo hình ảnh bằng AI
  const generateImageForSlide = async (slideId: number, content: string) => {
    // Đây là nơi để tích hợp API Image Generation thực tế
    // Hiện tại, chỉ mô phỏng bằng cách thay đổi URL hình ảnh
    const newImageUrl = `https://picsum.photos/600/300?random=${Date.now() + slideId}`;
    setPptSlides(prevSlides => 
      prevSlides ? prevSlides.map(s => s.id === slideId ? { ...s, image: newImageUrl } : s) : null
    );
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col p-4 overflow-hidden font-sans selection:bg-indigo-500">
      
      {/* HEADER CAO CẤP */}
      <div className="flex justify-between items-center mb-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">←</button>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">VIETEDU LAB 4.0 - PRO EDITION</h1>
            <p className="text-[7px] font-bold opacity-50 uppercase tracking-[0.4em]">Hệ sinh thái giáo dục số tương lai</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-white/10">
            {themes.map((t) => (
              <button key={t.name} onClick={() => setSelectedTheme(t)} className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selectedTheme.name === t.name ? 'border-white' : 'border-transparent opacity-40'}`} style={{ backgroundColor: t.colors[0] }} title={t.desc} />
            ))}
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-[9px] font-black text-emerald-400 uppercase italic animate-pulse">AI Online: Creative Mode</div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {['5512', 'ppt', '7991'].map((id) => (
          <button key={id} onClick={() => {setSelectedFlow(id as any); setPptSlides(null); setAiResult(null);}} className={`py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${selectedFlow === id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'border-white/5 bg-white/5 opacity-40 hover:opacity-100'}`}>
            {id === '5512' ? '📜 Soạn Giáo Án' : id === 'ppt' ? '🎨 Thiết Kế PPT' : '📝 Đề Kiểm Tra'}
          </button>
        ))}
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* CỘT NHẬP LIỆU */}
        <div className="w-[32%] flex flex-col gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 overflow-y-auto custom-scroll relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-indigo-400">Khối lớp</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[12px] font-bold focus:border-indigo-500 outline-none appearance-none">
                {Array.from({ length: 12 }, (_, i) => `Khối ${i + 1}`).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-indigo-400">Số tiết</label>
              <input type="number" value={lessonCount} onChange={(e) => setLessonCount(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[12px] font-bold focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-indigo-400">Môn học CT 2018</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[12px] font-bold focus:border-indigo-500 outline-none appearance-none">
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2 flex-grow flex flex-col relative">
            <label className="text-[9px] font-black uppercase text-indigo-400">Nội dung / Học liệu thực (+)</label>
            <textarea 
              placeholder="Nhập yêu cầu soạn bài chi tiết hoặc dán link tài liệu..."
              className="w-full flex-grow bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[12px] outline-none focus:border-indigo-500 transition-all resize-none leading-relaxed"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <div className="absolute bottom-20 left-4 right-4 flex flex-wrap gap-2">
              {attachedFiles.map((file, i) => (
                <div key={i} className="bg-indigo-500 text-[8px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 animate-in fade-in zoom-in">
                  <span className="truncate max-w-[100px]">{file.name}</span>
                  <button onClick={() => setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))} className="text-white/70 hover:text-red-200">×</button>
                </div>
              ))}
            </div>

            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-5 right-5 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-90">
              <span className="text-3xl font-light">+</span>
            </button>
          </div>

          <button onClick={handleGenerateAI} disabled={isGenerating} className="w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition-all shadow-lg active:scale-95">
            {isGenerating ? 'AI ĐANG SÁNG TẠO BÀI GIẢNG...' : '🚀 BẮT ĐẦU SÁNG TẠO'}
          </button>
        </div>

        {/* CỘT HIỂN THỊ SLIDE VISUAL VÀ MINH HỌA AI */}
        <div className="w-[68%] bg-black/40 rounded-[2rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em]">Concept Slide Design (10+ Templates)</span>
            {pptSlides && <button className="bg-emerald-500 text-black px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-400">📥 Xuất File PPTX</button>}
          </div>

          <div className="flex-grow p-6 overflow-y-auto custom-scroll">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-indigo-300 font-black uppercase text-sm animate-pulse">
                <span className="text-8xl mb-6 animate-bounce">✨</span>
                AI đang vẽ ý tưởng, tạo hình ảnh và sắp xếp bố cục...
              </div>
            ) : pptSlides ? (
              <div className="grid grid-cols-2 gap-6">
                {pptSlides.map((slide) => (
                  <div key={slide.id} className="aspect-video rounded-[1.5rem] p-6 shadow-2xl border-2 transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between relative overflow-hidden group" style={{ backgroundColor: selectedTheme.colors[1], borderColor: selectedTheme.colors[0] + '30' }}>
                    
                    {/* HÌNH ẢNH MINH HỌA AI */}
                    {slide.image && (
                      <img src={slide.image} alt="AI Illustration" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity rounded-[1.5rem]" />
                    )}

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black opacity-40 uppercase" style={{ color: selectedTheme.colors[0] }}>{slide.type}</span>
                                <h4 className="text-[15px] font-black uppercase tracking-tight" style={{ color: selectedTheme.colors[0] }}>{slide.title}</h4>
                            </div>
                            <span className="text-[10px] font-black opacity-20" style={{ color: selectedTheme.colors[2] }}>Slide {slide.id}/10</span>
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed whitespace-pre-wrap flex-grow" style={{ color: selectedTheme.colors[2], opacity: 0.8 }}>{slide.content}</p>
                        
                        {/* NÚT MINH HỌA HÌNH ẢNH BẰNG AI */}
                        <button onClick={() => generateImageForSlide(slide.id, slide.content)} 
                                className="mt-4 self-end bg-indigo-600/70 text-white text-[9px] font-bold px-4 py-2 rounded-full backdrop-blur-sm hover:bg-indigo-500 shadow-md transition-all active:scale-95 flex items-center gap-1">
                          <span className="text-xs">🎨</span> Minh họa AI
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10">
                <span className="text-8xl mb-6">✨</span>
                <p className="font-black text-[12px] uppercase tracking-[0.5em] text-center">AI sáng tạo đang đợi ý tưởng<br/>của Thầy để thiết kế bài giảng</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => e.target.files && setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)])} />
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        select option { background: #0a0f1e; color: white; }
      `}</style>
    </div>
  );
};

export default LessonPlanner;