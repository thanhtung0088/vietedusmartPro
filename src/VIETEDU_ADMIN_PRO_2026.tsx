import React, { useState, useEffect } from 'react';

const BINH_HOA_PORTAL_CORE_2026: React.FC = () => {
  // --- 1. QUẢN LÝ TRẠNG THÁI HỆ THỐNG ---
  const [activeSubTab, setActiveSubTab] = useState('SOẠN TKB AI');
  const [activeOfficeModule, setActiveOfficeModule] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Trạng thái cho Soạn TKB AI
  const [tkbStep, setTkbStep] = useState(1);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);

  // --- 2. LOGIC KÍCH HOẠT THUẬT TOÁN AI ---
  const handleRunAi = () => {
    setIsAiRunning(true);
    setAiProgress(0);
    const timer = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsAiRunning(false);
          setTkbStep(4); // Tự động nhảy sang bước Xuất bản khi xong
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // --- 3. COMPONENT: GIAO DIỆN SOẠN TKB AI (Theo ảnh Thầy gửi) ---
  const renderTkbAiSection = () => (
    <div className="p-8 h-full flex flex-col animate-in fade-in duration-500">
      {/* 4 Bước tiến trình */}
      <div className="bg-[#1e293b] p-6 rounded-[30px] mb-8 flex justify-between items-center border border-blue-500/20 shadow-2xl">
        {[
          { s: 1, n: 'CẤU HÌNH DỮ LIỆU' },
          { s: 2, n: 'THIẾT LẬP RÀNG BUỘC' },
          { s: 3, n: 'KHỞI CHẠY AI' },
          { s: 4, n: 'XUẤT BẢN TKB' }
        ].map((item) => (
          <div key={item.s} className={`flex items-center gap-4 cursor-pointer transition-all ${tkbStep === item.s ? 'opacity-100 scale-105' : 'opacity-30'}`} onClick={() => setTkbStep(item.s)}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${tkbStep === item.s ? 'bg-blue-600 text-white shadow-[0_0_15px_#3b82f6]' : 'bg-slate-700 text-slate-400'}`}>{item.s}</div>
            <span className="text-[10px] font-black text-white uppercase italic tracking-widest">{item.n}</span>
            {item.s < 4 && <div className="w-16 h-[1px] bg-slate-600 ml-4"></div>}
          </div>
        ))}
      </div>

      {/* Vùng làm việc AI Dashboard */}
      <div className="flex-1 bg-[#0f172a] rounded-[50px] overflow-hidden flex shadow-2xl border border-white/5">
        <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-6">
          <h4 className="text-blue-400 text-[10px] font-black uppercase italic">Bộ công cụ AI</h4>
          <button className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl text-white hover:bg-blue-600 transition-all text-left group">
            <i className="fa-solid fa-file-excel text-emerald-400 group-hover:text-white"></i>
            <div><p className="text-[10px] font-black uppercase italic">NẠP FILE EXCEL</p><p className="text-[8px] opacity-50 font-bold uppercase">Môn dạy, phân công</p></div>
          </button>
          <button className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl text-white hover:bg-blue-600 transition-all text-left group">
            <i className="fa-solid fa-user-lock text-rose-400 group-hover:text-white"></i>
            <div><p className="text-[10px] font-black uppercase italic">RÀNG BUỘC GV</p><p className="text-[8px] opacity-50 font-bold uppercase">Tiết tránh, nghỉ bù</p></div>
          </button>
          <button className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl text-white hover:bg-blue-600 transition-all text-left group">
            <i className="fa-solid fa-door-open text-orange-400 group-hover:text-white"></i>
            <div><p className="text-[10px] font-black uppercase italic">PHÒNG CHỨC NĂNG</p><p className="text-[8px] opacity-50 font-bold uppercase">Lab, Tin học, TD</p></div>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-12 relative">
          {isAiRunning ? (
            <div className="text-center">
              <div className="text-8xl font-black text-blue-500 italic mb-4 animate-pulse">{aiProgress}%</div>
              <p className="text-white text-[12px] font-black uppercase tracking-[0.5em]">Đang tối ưu hóa 142 ràng buộc...</p>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-blue-600/20 rounded-3xl flex items-center justify-center mb-8"><i className="fa-solid fa-microchip text-4xl text-blue-500"></i></div>
              <h2 className="text-5xl font-black text-white italic uppercase mb-2 tracking-tighter">AI PLANNER ENGINE V2.6</h2>
              <p className="text-[11px] text-slate-500 font-bold uppercase mb-12 max-w-md text-center">Hệ thống sẵn sàng xử lý 1,200 tiết học/tuần, 45 giáo viên và 142 ràng buộc chuyên sâu.</p>
              <button onClick={handleRunAi} className="bg-blue-600 hover:bg-white hover:text-blue-600 px-20 py-8 rounded-[35px] font-black uppercase italic text-xl shadow-[0_0_30px_#3b82f6] transition-all flex items-center gap-6">
                <i className="fa-solid fa-bolt"></i> KHỞI CHẠY THUẬT TOÁN AI
              </button>
            </>
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );

  // --- 4. COMPONENT: HÀNH CHÍNH VĂN PHÒNG (Kích hoạt Tab) ---
  const renderOfficeSection = () => {
    const modules = [
      { id: 'KT', name: 'Kế toán - Tài vụ', icon: 'fa-calculator', color: 'bg-blue-600', tags: ['Bảng lương', 'Phiếu thu/chi', 'Quyết toán', 'Học phí'] },
      { id: 'HV', name: 'Học vụ - Văn thư', icon: 'fa-file-signature', color: 'bg-emerald-600', tags: ['HỒ SƠ HS', 'CÔNG VĂN ĐI/ĐẾN', 'HỌC BẠ', 'BẰNG TỐT NGHIỆP'] },
      { id: 'IT', name: 'Công nghệ thông tin', icon: 'fa-laptop-code', color: 'bg-indigo-600', tags: ['Hệ thống', 'Bảo trì'] },
      { id: 'TV', name: 'Thư viện', icon: 'fa-book-open', color: 'bg-amber-600', tags: ['Mượn trả'] },
      { id: 'GT', name: 'Giám thị', icon: 'fa-user-clock', color: 'bg-orange-600', tags: ['Nề nếp', 'Vi phạm'] }
    ];

    if (activeOfficeModule) {
      const current = modules.find(m => m.name === activeOfficeModule);
      return (
        <div className="p-8 h-full flex flex-col animate-in slide-in-from-bottom-5">
          <button onClick={() => setActiveOfficeModule(null)} className="mb-6 text-[10px] font-black uppercase text-blue-600 flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> QUAY LẠI DANH SÁCH</button>
          <div className="bg-white rounded-[40px] shadow-2xl flex-1 flex flex-col overflow-hidden border border-blue-100">
             <div className="p-10 bg-slate-50 border-b flex justify-between items-center">
                <div className="flex items-center gap-6">
                   <div className={`w-16 h-16 ${current?.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg`}><i className={`fa-solid ${current?.icon}`}></i></div>
                   <div>
                      <h2 className="text-2xl font-black text-[#1e3a8a] uppercase italic">{current?.name}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase italic">WORKSPACE / 2026 EDITION</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <button onClick={() => alert('Đang mở form tạo mới...')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-lg hover:bg-black transition-all">TẠO MỚI HỒ SƠ</button>
                   <button onClick={() => alert('Đang trích xuất báo cáo chuyên sâu...')} className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-lg hover:bg-blue-600 transition-all">XUẤT BÁO CÁO</button>
                </div>
             </div>
             <div className="p-10 grid grid-cols-4 gap-8">
                {current?.tags.map((tag, idx) => (
                  <div key={idx} onClick={() => alert(`Kích hoạt module: ${tag}`)} className="bg-white border-2 border-slate-50 p-10 rounded-[35px] hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all text-2xl text-slate-300">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <span className="text-[12px] font-black uppercase italic text-slate-800">{tag}</span>
                  </div>
                ))}
             </div>
             <div className="mt-auto p-10 text-center opacity-10 text-[12px] font-black uppercase tracking-[1em]">Phòng làm việc điện tử chuyên nghiệp</div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-10 grid grid-cols-4 gap-8">
        {modules.map((m) => (
          <div key={m.id} onClick={() => setActiveOfficeModule(m.name)} className="group bg-white p-10 rounded-[45px] shadow-xl hover:shadow-2xl hover:bg-[#1e3a8a] transition-all cursor-pointer flex flex-col items-center text-center border border-slate-50">
             <div className={`w-20 h-20 ${m.color} text-white rounded-3xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all shadow-lg`}>
                <i className={`fa-solid ${m.icon}`}></i>
             </div>
             <h3 className="text-[13px] font-black text-slate-800 uppercase italic group-hover:text-white">{m.name}</h3>
             <p className="text-[8px] font-bold text-slate-400 uppercase mt-4 group-hover:text-blue-200 tracking-widest italic">Kích hoạt làm việc</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* SIDEBAR TRÁI */}
      <aside className="w-24 bg-[#061631] flex flex-col items-center py-10 shrink-0 z-50">
        <div className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center mb-16 shadow-xl"><i className="fa-solid fa-shield-halved text-white text-2xl"></i></div>
        <nav className="flex flex-col gap-10">
          <i onClick={() => setActiveSubTab('NHÂN SỰ & TỔ CHỨC')} className={`fa-solid fa-users text-xl cursor-pointer ${activeSubTab==='NHÂN SỰ & TỔ CHỨC'?'text-blue-400':'text-slate-500 hover:text-white'}`}></i>
          <i onClick={() => setActiveSubTab('SOẠN TKB AI')} className={`fa-solid fa-microchip text-xl cursor-pointer ${activeSubTab==='SOẠN TKB AI'?'text-blue-400':'text-slate-500 hover:text-white'}`}></i>
          <i onClick={() => setActiveSubTab('HÀNH CHÍNH VĂN PHÒNG')} className={`fa-solid fa-building text-xl cursor-pointer ${activeSubTab==='HÀNH CHÍNH VĂN PHÒNG'?'text-blue-400':'text-slate-500 hover:text-white'}`}></i>
        </nav>
      </aside>

      {/* SIDEBAR PHỤ */}
      {!isFullScreen && (
        <aside className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0 z-40 shadow-xl">
          <div className="p-10 border-b border-slate-50">
            <h1 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 italic">BÌNH HÒA HUB</h1>
            <p className="text-xl font-black text-slate-800 uppercase italic">ADMINISTRATION</p>
          </div>
          <nav className="flex-1 p-5 space-y-1 overflow-y-auto custom-scrollbar">
            {['NHÂN SỰ & TỔ CHỨC', 'HÀNH CHÍNH VĂN PHÒNG', 'CHI BỘ', 'CÔNG ĐOÀN', 'QUẢN LÝ TÀI CHÍNH', 'QUẢN LÝ CHUYÊN MÔN', 'SOẠN TKB AI'].map(m => (
              <button key={m} onClick={() => { setActiveSubTab(m); setActiveOfficeModule(null); }} className={`w-full flex items-center gap-4 px-6 py-5 rounded-[22px] text-[10px] font-black uppercase italic transition-all ${activeSubTab === m ? 'bg-[#1e3a8a] text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>
                {m}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* VÙNG NỘI DUNG */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        <header className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsFullScreen(!isFullScreen)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-black transition-all"><i className={`fa-solid ${isFullScreen ? 'fa-compress' : 'fa-expand'}`}></i></button>
            <div className="flex flex-col"><span className="text-[9px] font-black text-blue-500 uppercase italic tracking-widest">BÌNH HÒA PORTAL</span><h2 className="text-[14px] font-black text-slate-900 uppercase italic tracking-wider">{activeSubTab}</h2></div>
          </div>
          <div className="flex items-center gap-4 text-right">
             <div><p className="text-[10px] font-black uppercase italic">THẦY TÙNG ADMIN</p><p className="text-[8px] font-bold text-emerald-500 uppercase italic">Hệ thống đang online</p></div>
             <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white"><i className="fa-solid fa-user-tie"></i></div>
          </div>
        </header>

        <section className="flex-1 overflow-auto bg-[#f8fafc]/50 relative custom-scrollbar">
           {activeSubTab === 'SOẠN TKB AI' ? renderTkbAiSection() :
            activeSubTab === 'HÀNH CHÍNH VĂN PHÒNG' ? renderOfficeSection() :
            <div className="p-20 text-center opacity-10 text-4xl font-black uppercase italic tracking-[0.5em]">{activeSubTab} - ĐANG PHÁT TRIỂN</div>}
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default BINH_HOA_PORTAL_CORE_2026;