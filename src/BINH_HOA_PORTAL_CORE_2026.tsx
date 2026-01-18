import React, { useState, useEffect } from 'react';

const BINH_HOA_PORTAL_CORE_2026: React.FC = () => {
  // --- QUẢN LÝ TRẠNG THÁI ---
  const [activeTab, setActiveTab] = useState('NHÂN SỰ & TỔ CHỨC');
  const [officeView, setOfficeView] = useState('MAIN'); // MAIN hoặc DETAIL
  const [tkbStep, setTkbStep] = useState(1);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // --- LOGIC CHẠY AI TKB ---
  useEffect(() => {
    let timer: any;
    if (isAiRunning && progress < 100) {
      timer = setInterval(() => setProgress(p => p + 1), 30);
    } else if (progress === 100) {
      setIsAiRunning(false);
      setTkbStep(4);
    }
    return () => clearInterval(timer);
  }, [isAiRunning, progress]);

  // --- COMPONENT: NHÂN SỰ (THAY THẾ CHỮ "ĐANG PHÁT TRIỂN") ---
  const PersonnelSection = () => (
    <div className="p-8 h-full animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 overflow-hidden h-full flex flex-col">
        <div className="p-10 border-b flex justify-between items-center bg-slate-50/30">
          <div>
            <h2 className="text-3xl font-black text-[#1e3a8a] uppercase italic">Nhân sự & Tổ chức</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase italic">Cơ sở dữ liệu thực tế 2026</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-lg hover:bg-black transition-all">
            + THÊM NHÂN SỰ MỚI
          </button>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 italic">
                <th className="p-4 text-left">Mã số</th>
                <th className="p-4 text-left">Họ tên giáo viên</th>
                <th className="p-4 text-left">Chuyên môn</th>
                <th className="p-4 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-[13px] font-bold">
              {[
                { id: "BH-001", n: "NGUYỄN VĂN TÙNG", d: "Quản trị hệ thống" },
                { id: "BH-002", n: "TRƯƠNG NGỌC BẢO ÂN", d: "Tin học" },
                { id: "BH-003", n: "LÊ THỊ ANH", d: "Toán học" }
              ].map(item => (
                <tr key={item.id} className="bg-slate-50/50 hover:bg-blue-50 transition-all">
                  <td className="p-5 text-blue-600 font-black">{item.id}</td>
                  <td className="p-5 uppercase italic text-slate-800">{item.n}</td>
                  <td className="p-5 text-slate-500">{item.d}</td>
                  <td className="p-5 text-right"><span className="text-emerald-500 text-[10px] uppercase">● Đang Online</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- COMPONENT: HÀNH CHÍNH & HỌC VỤ (THEO ẢNH MẪU) ---
  const OfficeSection = () => {
    if (officeView === 'DETAIL') {
      return (
        <div className="p-10 h-full animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-[45px] shadow-2xl p-12 border border-blue-50 h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"><i className="fa-solid fa-file-signature"></i></div>
                  <div>
                    <h2 className="text-3xl font-black text-[#1e3a8a] uppercase italic">Học vụ - Văn thư</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase italic">WORKSPACE / 2026 EDITION</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase italic shadow-lg">TẠO MỚI HỒ SƠ</button>
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase italic shadow-lg">XUẤT BÁO CÁO</button>
               </div>
            </div>
            <div className="grid grid-cols-4 gap-10 flex-1">
               {['HỒ SƠ HS', 'CÔNG VĂN ĐI/ĐẾN', 'HỌC BẠ', 'BẰNG TỐT NGHIỆP'].map(card => (
                 <div key={card} className="bg-white border-4 border-dashed border-slate-50 rounded-[40px] flex flex-col items-center justify-center gap-6 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"><i className="fa-solid fa-plus"></i></div>
                    <span className="text-[12px] font-black text-slate-700 uppercase italic tracking-tighter">{card}</span>
                 </div>
               ))}
            </div>
            <p className="text-center py-8 text-slate-200 font-black uppercase italic tracking-[0.5em] text-xl">Phòng làm việc điện tử chuyên nghiệp</p>
            <button onClick={() => setOfficeView('MAIN')} className="text-blue-500 font-black text-[10px] uppercase italic hover:underline">← QUAY LẠI DANH MỤC</button>
          </div>
        </div>
      );
    }
    return (
      <div className="p-12 grid grid-cols-4 gap-8">
        {['Kế toán - Tài vụ', 'Học vụ - Văn thư', 'Công nghệ thông tin', 'Thư viện'].map(m => (
          <div key={m} onClick={() => m === 'Học vụ - Văn thư' && setOfficeView('DETAIL')} className="bg-white p-10 rounded-[45px] shadow-xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center text-center border border-slate-50 group">
             <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform"><i className="fa-solid fa-building-user"></i></div>
             <h3 className="text-[13px] font-black text-slate-800 uppercase italic">{m}</h3>
             <p className="text-[8px] font-bold text-slate-400 mt-4 uppercase italic">Kích hoạt làm việc</p>
          </div>
        ))}
      </div>
    );
  };

  // --- COMPONENT: SOẠN TKB AI (KÍCH HOẠT TAB & NÚT) ---
  const TkbAiSection = () => (
    <div className="p-8 h-full flex flex-col animate-in slide-in-from-right-10 duration-500">
      <div className="bg-[#1e293b] p-6 rounded-[35px] mb-8 flex justify-between items-center shadow-2xl border border-blue-400/20">
        {[1, 2, 3, 4].map(s => (
          <div key={s} onClick={() => !isAiRunning && setTkbStep(s)} className={`flex items-center gap-5 cursor-pointer transition-all ${tkbStep === s ? 'opacity-100 scale-105' : 'opacity-20 hover:opacity-50'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${tkbStep === s ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]' : 'bg-slate-700 text-slate-400'}`}>{s}</div>
            <span className="text-[10px] font-black text-white uppercase italic tracking-widest">{['CẤU HÌNH DỮ LIỆU', 'THIẾT LẬP RÀNG BUỘC', 'KHỞI CHẠY AI', 'XUẤT BẢN TKB'][s-1]}</span>
            {s < 4 && <div className="w-16 h-[1px] bg-slate-700 ml-4"></div>}
          </div>
        ))}
      </div>

      <div className="flex-1 bg-[#0f172a] rounded-[55px] flex overflow-hidden border border-white/5 relative shadow-inner">
        <div className="w-80 border-r border-white/5 p-10 flex flex-col gap-8 bg-black/20">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-5 bg-blue-600 p-6 rounded-3xl text-white shadow-xl hover:bg-white hover:text-blue-600 transition-all text-left">
            <i className="fa-solid fa-file-excel text-2xl"></i>
            <div><p className="text-[11px] font-black uppercase italic leading-none">NẠP FILE EXCEL</p><p className="text-[8px] opacity-70 font-bold uppercase mt-2 italic">Môn dạy, phân công</p></div>
          </button>
          <button onClick={() => setTkbStep(2)} className="flex items-center gap-5 bg-white/5 p-6 rounded-3xl text-white hover:bg-white/10 transition-all text-left">
            <i className="fa-solid fa-user-lock text-rose-500 text-xl"></i>
            <div><p className="text-[11px] font-black uppercase italic leading-none">RÀNG BUỘC GV</p><p className="text-[8px] opacity-40 font-bold uppercase mt-2 italic">Tiết tránh, nghỉ bù</p></div>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-12">
          {isAiRunning ? (
            <div className="text-center">
              <div className="text-[120px] font-black text-blue-500 italic leading-none mb-6 drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]">{progress}%</div>
              <p className="text-white text-[14px] font-black uppercase tracking-[0.8em] italic animate-pulse">AI ENGINE ĐANG TỐI ƯU LỊCH HỌC...</p>
            </div>
          ) : tkbStep === 4 ? (
            <div className="text-center animate-in zoom-in">
              <i className="fa-solid fa-circle-check text-emerald-500 text-8xl mb-8"></i>
              <h2 className="text-4xl font-black text-white uppercase italic">XẾP LỊCH THÀNH CÔNG!</h2>
              <button onClick={() => setTkbStep(1)} className="mt-10 bg-white text-blue-600 px-12 py-5 rounded-2xl font-black uppercase italic">XEM BẢNG TKB</button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-6xl font-black text-white italic uppercase mb-4 tracking-tighter italic">AI PLANNER V2.6</h2>
              <p className="text-[12px] text-slate-500 font-bold uppercase mb-16 italic tracking-widest tracking-[0.3em]">Hệ thống xếp lịch tự động thông minh 2026</p>
              <button onClick={() => { setIsAiRunning(true); setProgress(0); }} className="bg-blue-600 hover:bg-white hover:text-blue-600 px-24 py-10 rounded-[45px] font-black uppercase italic text-2xl shadow-[0_20px_50px_rgba(59,130,246,0.4)] transition-all flex items-center gap-8">
                <i className="fa-solid fa-bolt-lightning"></i> KHỞI CHẠY AI
              </button>
            </div>
          )}
        </div>

        {/* MODAL NẠP EXCEL */}
        {showModal && (
          <div className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-20 animate-in fade-in">
             <div className="bg-white rounded-[50px] w-full max-w-2xl p-16 text-center shadow-2xl">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[30px] flex items-center justify-center text-4xl mb-10 mx-auto"><i className="fa-solid fa-cloud-arrow-up"></i></div>
                <h3 className="text-3xl font-black text-slate-800 uppercase italic mb-8">Nạp dữ liệu chuyên môn</h3>
                <div className="border-4 border-dashed border-slate-100 rounded-[40px] p-20 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
                   <p className="text-slate-300 font-black uppercase italic text-[14px]">Kéo thả file .xlsx vào đây</p>
                </div>
                <div className="flex gap-6 mt-12">
                   <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white py-6 rounded-2xl font-black uppercase italic text-[12px]">XÁC NHẬN NẠP</button>
                   <button onClick={() => setShowModal(false)} className="px-12 bg-slate-100 text-slate-400 py-6 rounded-2xl font-black uppercase italic text-[12px]">HỦY BỎ</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* SIDEBAR TRÁI */}
      <aside className="w-24 bg-[#061631] flex flex-col items-center py-10 shrink-0 z-50">
        <div className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center mb-16 shadow-xl"><i className="fa-solid fa-shield-halved text-white text-2xl"></i></div>
        <nav className="flex flex-col gap-12 text-slate-500">
          <i onClick={() => setActiveTab('NHÂN SỰ & TỔ CHỨC')} className={`fa-solid fa-users-gear text-xl cursor-pointer ${activeTab === 'NHÂN SỰ & TỔ CHỨC' && 'text-blue-400'}`}></i>
          <i onClick={() => {setActiveTab('HÀNH CHÍNH VĂN PHÒNG'); setOfficeView('MAIN');}} className={`fa-solid fa-building text-xl cursor-pointer ${activeTab === 'HÀNH CHÍNH VĂN PHÒNG' && 'text-blue-400'}`}></i>
          <i onClick={() => setActiveTab('SOẠN TKB AI')} className={`fa-solid fa-microchip text-xl cursor-pointer ${activeTab === 'SOẠN TKB AI' && 'text-blue-400'}`}></i>
        </nav>
      </aside>

      {/* SIDEBAR DANH MỤC */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0 z-40 shadow-2xl">
        <div className="p-10 border-b border-slate-50">
          <h1 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1 italic">Bình Hòa Hub</h1>
          <p className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">ADMINISTRATION</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {['NHÂN SỰ & TỔ CHỨC', 'HÀNH CHÍNH VĂN PHÒNG', 'CHI BỘ', 'CÔNG ĐOÀN', 'QUẢN LÝ TÀI CHÍNH', 'SOẠN TKB AI'].map(m => (
            <button key={m} onClick={() => { setActiveTab(m); setOfficeView('MAIN'); }} className={`w-full flex items-center gap-5 px-8 py-6 rounded-[28px] text-[10.5px] font-black uppercase italic transition-all ${activeTab === m ? 'bg-[#1e3a8a] text-white shadow-2xl' : 'text-slate-400 hover:bg-slate-50'}`}>
              <span className={`w-2 h-2 rounded-full ${activeTab === m ? 'bg-blue-400' : 'bg-transparent'}`}></span> {m}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        <header className="h-28 border-b border-slate-100 px-12 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-500 uppercase italic tracking-widest">Bình Hòa Portal 2026</span>
            <h2 className="text-[18px] font-black text-slate-900 uppercase italic tracking-wider">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[12px] font-black uppercase italic text-slate-800 leading-none">Thầy Tùng Admin</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase italic mt-1.5 flex items-center gap-1.5">● Hệ thống đang online</p>
             </div>
             <div className="w-16 h-16 bg-slate-950 rounded-[25px] flex items-center justify-center text-white shadow-2xl border-4 border-white transition-transform hover:scale-105"><i className="fa-solid fa-user-tie text-2xl"></i></div>
          </div>
        </header>

        <section className="flex-1 overflow-auto bg-[#f8fafc]/50">
           {activeTab === 'NHÂN SỰ & TỔ CHỨC' && PersonnelSection()}
           {activeTab === 'HÀNH CHÍNH VĂN PHÒNG' && OfficeSection()}
           {activeTab === 'SOẠN TKB AI' && TkbAiSection()}
        </section>
      </main>
    </div>
  );
};

export default BINH_HOA_PORTAL_CORE_2026;