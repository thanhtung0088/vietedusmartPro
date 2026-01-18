import React, { useState, useRef, useEffect } from 'react';

const Dashboard: React.FC<any> = ({ onNavigate }) => {
  // 1. QUẢN LÝ TRẠNG THÁI (STATE)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [weeklyWork, setWeeklyWork] = useState(() => localStorage.getItem('vietedu_work') || "Cập nhật PPCT HKII\nHọp BDTX 18/1");
  const [timetable, setTimetable] = useState<any[]>(() => {
    const saved = localStorage.getItem('vietedu_tkb_today');
    return saved ? JSON.parse(saved) : [];
  });

  const [isZaloOpen, setIsZaloOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { id: 1, sender: "PH Em An", text: "Thầy ơi, bé An xin nghỉ buổi chiều ạ.", time: "09:30", me: false },
    { id: 2, sender: "Tôi", text: "Dạ vâng, tôi đã nhận thông tin.", time: "09:35", me: true }
  ]);
  const [inputText, setInputText] = useState("");

  const lessonFileInputRef = useRef<HTMLInputElement>(null);

  // 2. DỮ LIỆU THỜI KHÓA BIỂU THỰC TẾ (TRÍCH XUẤT TỪ ẢNH)
  const fullData = [
    { thu: 'Thứ 2', tiet: '1', mon: '6/10 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 2', tiet: '3', mon: '9/3 (GDĐP)', buoi: 'Chiều' },
    { thu: 'Thứ 2', tiet: '4', mon: '9/1 (GDĐP)', buoi: 'Chiều' },
    { thu: 'Thứ 2', tiet: '5', mon: '9/2 (GDĐP)', buoi: 'Chiều' },
    { thu: 'Thứ 3', tiet: '3', mon: '9/7 (GDĐP)', buoi: 'Sáng' },
    { thu: 'Thứ 3', tiet: '4', mon: '9/9 (GDĐP)', buoi: 'Sáng' },
    { thu: 'Thứ 3', tiet: '5', mon: '6/9 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 3', tiet: '3', mon: '9/5 (GDĐP)', buoi: 'Chiều' },
    { thu: 'Thứ 3', tiet: '5', mon: '9/6 (GDĐP)', buoi: 'Chiều' },
    { thu: 'Thứ 4', tiet: '1', mon: '6/2 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 4', tiet: '3', mon: '6/3 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 4', tiet: '4', mon: '6/4 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 4', tiet: '3', mon: '6/7 (GDCD)', buoi: 'Chiều' },
    { thu: 'Thứ 4', tiet: '4', mon: '6/6 (GDCD)', buoi: 'Chiều' },
    { thu: 'Thứ 4', tiet: '5', mon: '6/5 (GDCD)', buoi: 'Chiều' },
    { thu: 'Thứ 6', tiet: '1', mon: '6/8 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 6', tiet: '2', mon: '9/8 (GDĐP)', buoi: 'Sáng' },
    { thu: 'Thứ 6', tiet: '3', mon: '6/1 (GDCD)', buoi: 'Sáng' },
    { thu: 'Thứ 6', tiet: '5', mon: '9/4 (GDĐP)', buoi: 'Sáng' },
  ];

  // 3. LOGIC CẬP NHẬT THEO NGÀY HIỆN TẠI
  const handleUpdateTKB = () => {
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const today = days[new Date().getDay()]; // Tự động lấy thứ hiện thực

    const todayLessons = fullData.filter(item => item.thu === today);
    setTimetable(todayLessons);
    localStorage.setItem('vietedu_tkb_today', JSON.stringify(todayLessons));

    if (todayLessons.length > 0) {
      alert(`Đã cập nhật ${todayLessons.length} tiết dạy của ${today}!`);
    } else {
      alert(`Hôm nay (${today}) Thầy không có tiết dạy trên TKB thực tế.`);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "Tôi", text: inputText, time: "Vừa xong", me: true }]);
    setInputText("");
  };

  return (
    <div className="p-2 bg-[#7f1d1d] min-h-screen text-slate-200 flex flex-col gap-2 font-sans relative overflow-hidden bg-[url('https://png.pngtree.com/background/20230112/original/pngtree-red-festive-chinese-new-year-background-image_1993416.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 z-0 bg-red-900/60 pointer-events-none"></div>

      {/* HEADER */}
      {!isCinemaMode && (
        <div className="relative z-10 h-16 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl flex items-center px-6 shadow-2xl justify-between">
          <div>
            <h1 className="text-xl font-black uppercase text-yellow-400 italic leading-none">VietEdu Smart Assistant</h1>
            <p className="text-white/80 text-[8px] font-bold mt-1 uppercase tracking-widest">Hệ sinh thái Giáo dục 2026</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsZaloOpen(true)} className="bg-[#0068ff] text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase shadow-lg flex items-center gap-2 active:scale-95 transition-transform">
               <span className="bg-white text-[#0068ff] w-4 h-4 rounded-full flex items-center justify-center font-bold">Z</span> ZALO NỘI BỘ
            </button>
            <button onClick={() => window.open('https://meet.google.com/')} className="bg-[#ea4335] text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase shadow-lg active:scale-95">● GOOGLE MEET</button>
          </div>
        </div>
      )}

      {/* MENU 6 NÚT */}
      {!isCinemaMode && (
        <div className="relative z-10 grid grid-cols-6 gap-2">
          {[
            { t: 'SOẠN BÀI AI', i: '✨', c: 'bg-indigo-600', p: 'planner' },
            { t: 'VIDEO DẠY', i: '💻', c: 'bg-purple-600', p: 'video' },
            { t: 'GIỚI THIỆU', i: '📽️', c: 'bg-green-600', p: 'intro' },
            { t: 'SỔ ĐIỂM SỐ', i: '📊', c: 'bg-cyan-600', p: 'grades' },
            { t: 'SỔ CHỦ NHIỆM', i: '👨‍🏫', c: 'bg-orange-600', p: 'class' },
            { t: 'HỌC LIỆU', i: '📚', c: 'bg-teal-600', p: 'res' }
          ].map((item, idx) => (
            <div key={idx} onClick={() => onNavigate(item.p)} className={`${item.c} py-2.5 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-xl border border-white/10`}>
              <span className="text-lg">{item.i}</span>
              <span className="font-black text-[7px] text-white uppercase">{item.t}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row gap-2 flex-grow overflow-hidden">
        {!isCinemaMode && (
          <div className="lg:w-[25%] flex flex-col gap-2 overflow-hidden">
            {/* LỊCH DẠY TỰ ĐỘNG LỌC THEO NGÀY */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-4 flex flex-col h-[55%] overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-yellow-400 font-black text-[9px] uppercase italic border-l-4 border-yellow-500 pl-3">Lịch dạy hôm nay</h2>
                <button 
                  onClick={handleUpdateTKB}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-lg font-black text-[7px] uppercase hover:bg-yellow-400 active:scale-90 shadow-lg"
                >
                  CẬP NHẬT TKB
                </button>
              </div>
              <div className="space-y-1.5 overflow-y-auto pr-1 text-[9px] custom-scroll">
                {timetable.length > 0 ? timetable.map((t, idx) => (
                  <div key={idx} className="bg-black/40 p-3 rounded-xl flex justify-between items-center border border-white/5 animate-in slide-in-from-left duration-300">
                    <div className="flex flex-col">
                      <span className="opacity-40 text-[7px] font-bold uppercase">{t.buoi} - Tiết {t.tiet}</span>
                      <span className="font-black text-yellow-400 italic text-[11px]">{t.mon}</span>
                    </div>
                    <span className="text-[7px] font-black bg-white/10 px-2 py-1 rounded-md">{t.thu}</span>
                  </div>
                )) : (
                   <div className="h-full flex flex-col items-center justify-center opacity-20">
                     <span className="text-3xl mb-2">📅</span>
                     <p className="text-[8px] uppercase font-black text-center">Bấm cập nhật để xem<br/>lịch dạy hôm nay</p>
                   </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-[#064e3b]/90 border border-emerald-500/30 rounded-[1.5rem] p-4 flex flex-col overflow-hidden">
              <h2 className="text-emerald-300 font-black mb-2 text-[9px] uppercase italic border-l-4 border-emerald-500 pl-3">Ghi chú tuần</h2>
              <textarea 
                className="flex-grow bg-black/30 rounded-2xl p-3 text-white text-[10px] outline-none border border-emerald-800/50 resize-none font-medium custom-scroll" 
                value={weeklyWork} 
                onChange={(e) => {setWeeklyWork(e.target.value); localStorage.setItem('vietedu_work', e.target.value);}} 
              />
            </div>
          </div>
        )}

        {/* TRÌNH CHIẾU PDF */}
        <div className={`${isCinemaMode ? 'w-full' : 'lg:w-[75%]'} bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-5 flex flex-col shadow-2xl transition-all duration-500 relative`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-purple-300 font-black uppercase text-[11px] italic border-l-4 border-purple-500 pl-3">Hệ thống trình chiếu AI</h2>
            <div className="flex gap-3">
                <div className="bg-black/60 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-4 text-white">
                    <span className="text-yellow-400 font-black text-[12px]">⏱ {Math.floor(timer/60)}:{(timer%60).toString().padStart(2,'0')}</span>
                    <button onClick={() => { if(!isTimerRunning && timer===0) setTimer(2700); setIsTimerRunning(!isTimerRunning)}} className={`text-[9px] ${isTimerRunning ? 'bg-red-500' : 'bg-yellow-500'} text-black px-3 py-1 rounded-lg font-black`}>{isTimerRunning ? 'DỪNG' : 'CHẠY'}</button>
                </div>
                <button onClick={() => setIsCinemaMode(!isCinemaMode)} className="bg-yellow-400 text-black px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase shadow-lg active:scale-95 transition-all">🔳 FULL SCREEN</button>
            </div>
          </div>
          <div className="flex-grow bg-black/60 rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-inner">
            {pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full border-none" title="PDF Viewer" />
            ) : (
              <div onClick={() => lessonFileInputRef.current?.click()} className="h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
                <span className="text-5xl mb-3 opacity-10">📄</span>
                <p className="text-white/20 font-black text-[10px] uppercase tracking-widest">Nạp bài giảng PDF cho tiết dạy</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ZALO NỘI BỘ */}
      {isZaloOpen && (
        <div className="fixed bottom-4 right-4 w-[400px] h-[550px] bg-white rounded-[2rem] flex shadow-[0_30px_100px_rgba(0,0,0,0.6)] z-[2000] overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="w-16 bg-[#0068ff] flex flex-col items-center py-6 gap-6 text-white/70">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-black">Z</div>
            <div onClick={() => setActiveTab('chat')} className={`cursor-pointer ${activeTab==='chat' ? 'text-white' : ''}`}>💬</div>
            <div onClick={() => setActiveTab('contact')} className={`cursor-pointer ${activeTab==='contact' ? 'text-white' : ''}`}>👥</div>
            <div onClick={() => setIsZaloOpen(false)} className="mt-auto mb-6 cursor-pointer">✕</div>
          </div>
          <div className="flex-grow flex flex-col bg-slate-50">
            <div className="p-4 bg-white border-b flex justify-between items-center">
              <h3 className="text-slate-800 font-bold text-sm">Zalo Nội Bộ - Lab 4.0</h3>
              <p className="text-[10px] text-green-500 font-bold">● Trực tuyến</p>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scroll-zalo">
              {messages.map(m => (
                <div key={m.id} className={`flex flex-col ${m.me ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl text-[12px] max-w-[85%] ${m.me ? 'bg-[#e2e9ff] text-blue-900' : 'bg-white border border-slate-100'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white border-t flex gap-2">
              <input className="flex-grow text-xs outline-none p-2" placeholder="Nhập tin nhắn..." value={inputText} onKeyPress={e => e.key === 'Enter' && handleSend()} onChange={e => setInputText(e.target.value)} />
              <button onClick={handleSend} className="text-blue-600 font-black text-xs">GỬI</button>
            </div>
          </div>
        </div>
      )}

      <input type="file" ref={lessonFileInputRef} className="hidden" accept="application/pdf" onChange={e => {
        const file = e.target.files?.[0];
        if (file) setPdfUrl(URL.createObjectURL(file));
      }} />

      <style>{`
        body, html, #root { height: 100vh; overflow: hidden; margin: 0; }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scroll-zalo::-webkit-scrollbar { width: 4px; }
        .custom-scroll-zalo::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;