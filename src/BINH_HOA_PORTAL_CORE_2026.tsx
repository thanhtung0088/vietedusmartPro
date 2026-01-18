import React, { useState, useEffect } from 'react';

const BINH_HOA_PORTAL_CORE_2026: React.FC = () => {
  const [activeTab, setActiveTab] = useState('NHÂN SỰ & TỔ CHỨC');
  const [officeView, setOfficeView] = useState('MAIN'); 
  const [tkbStep, setTkbStep] = useState(1);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // --- GIAO DIỆN HÀNH CHÍNH & HỌC VỤ CHI TIẾT ---
  const OfficeSection = () => {
    if (officeView === 'DETAIL') {
      return (
        <div className="p-8 h-full animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-[45px] shadow-2xl p-10 border border-blue-50 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"><i className="fa-solid fa-file-signature"></i></div>
                  <div>
                    <h2 className="text-3xl font-black text-[#1e3a8a] uppercase italic">Học vụ - Văn thư</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase italic">QUẢN LÝ HỒ SƠ & CÔNG VĂN 2026</p>
                  </div>
               </div>
               <button onClick={() => setOfficeView('MAIN')} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase italic hover:bg-slate-200 transition-all">← Quay lại</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
               {[
                 { t: 'HỒ SƠ HS', c: '1,240 Em', i: 'fa-user-graduate', col: 'text-blue-600' },
                 { t: 'CÔNG VĂN ĐẾN', c: '45 Bản', i: 'fa-file-import', col: 'text-orange-500' },
                 { t: 'HỌC BẠ ĐIỆN TỬ', c: 'Đã số hóa', i: 'fa-book', col: 'text-emerald-500' },
                 { t: 'BẰNG TỐT NGHIỆP', c: 'Đang xử lý', i: 'fa-certificate', col: 'text-purple-500' }
               ].map(card => (
                 <div key={card.t} className="bg-slate-50/50 p-6 rounded-[30px] border border-white hover:border-blue-200 hover:bg-white transition-all group cursor-pointer shadow-sm">
                    <div className={`${card.col} text-2xl mb-4`}><i className={`fa-solid ${card.i}`}></i></div>
                    <div className="text-[11px] font-black text-slate-800 uppercase italic mb-1">{card.t}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase italic">{card.c}</div>
                 </div>
               ))}
            </div>

            <div className="flex-1 bg-slate-50/30 rounded-[35px] border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                    <i className="fa-solid fa-magnifying-glass text-slate-300 text-2xl"></i>
                </div>
                <h4 className="text-[14px] font-black text-slate-800 uppercase italic mb-2">Chưa có hồ sơ nào được chọn</h4>
                <p className="text-[10px] text-slate-400 font-bold max-w-xs uppercase italic leading-relaxed">Vui lòng chọn một danh mục phía trên để xem danh sách hoặc tìm kiếm hồ sơ học sinh cụ thể.</p>
                <div className="mt-8 flex gap-4">
                    <button className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-xl">Tạo hồ sơ mới</button>
                    <button className="bg-white text-[#1e3a8a] border border-blue-100 px-10 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-sm">Nhập từ Excel</button>
                </div>
            </div>
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

  // --- CÁC PHẦN CÒN LẠI GIỮ NGUYÊN ---
  const PersonnelSection = () => (
    <div className="p-8 h-full animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 overflow-hidden h-full flex flex-col">
        <div className="p-10 border-b flex justify-between items-center bg-slate-50/30">
          <div>
            <h2 className="text-3xl font-black text-[#1e3a8a] uppercase italic">Nhân sự & Tổ chức</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase italic">Hệ thống quản lý Bình Hòa 2026</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase italic shadow-lg">THÊM NHÂN SỰ +</button>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <table className="w-full border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 italic">
                <th className="px-6 pb-4">ID</th>
                <th className="px-6 pb-4">Họ tên giáo viên</th>
                <th className="px-6 pb-4">Vị trí công tác</th>
                <th className="px-6 pb-4 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-[13px] font-bold">
              {[
                { id: "BH-001", n: "NGUYỄN VĂN TÙNG", d: "Hiệu trưởng / Quản trị" },
                { id: "BH-002", n: "TRƯƠNG NGỌC BẢO ÂN", d: "Giáo viên Tin học" },
                { id: "BH-003", n: "LÊ THỊ ANH", d: "Giáo viên Toán" }
              ].map(item => (
                <tr key={item.id} className="bg-slate-50/50 hover:bg-blue-50 transition-all rounded-2xl">
                  <td className="p-6 text-blue-600 font-black">{item.id}</td>
                  <td className="p-6 uppercase italic text-slate-800">{item.n}</td>
                  <td className="p-6 text-slate-500">{item.d}</td>
                  <td className="p-6 text-right"><span className="text-emerald-500 text-[10px] uppercase">● Trực tuyến</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TkbAiSection = () => (
    <div className="p-8 h-full flex flex-col animate-in slide-in-from-right-10">
      <div className="bg-[#1e293b] p-6 rounded-[35px] mb-8 flex justify-between items-center shadow-2xl">
        {[1, 2, 3, 4].map(s => (
          <div key={s} onClick={() => setTkbStep(s)} className={`flex items-center gap-5 cursor-pointer ${tkbStep === s ? 'opacity-100' : 'opacity-20'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${tkbStep === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>{s}</div>
            <span className="text-[10px] font-black text-white uppercase italic">{['CẤU HÌNH', 'RÀNG BUỘC', 'CHẠY AI', 'KẾT QUẢ'][s-1]}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-[#0f172a] rounded-[55px] flex items-center justify-center text-center p-20 relative overflow-hidden">
        {isAiRunning ? (
            <div>
              <div className="text-[120px] font-black text-blue-500 italic mb-6">{progress}%</div>
              <p className="text-white text-[14px] font-black uppercase italic animate-pulse">Hệ thống đang xếp lịch...</p>
            </div>
        ) : (
            <div>
                <h2 className="text-6xl font-black text-white italic uppercase mb-8">AI PLANNER V2.6</h2>
                <button onClick={() => { setIsAiRunning(true); setProgress(0); }} className="bg-blue-600 hover:bg-white hover:text-blue-600 px-20 py-8 rounded-[40px] font-black uppercase italic text-xl shadow-2xl transition-all">KHỞI CHẠY THUẬT TOÁN AI</button>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      <aside className="w-24 bg-[#061631] flex flex-col items-center py-10 shrink-0 z-50">
        <div className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center mb-16 shadow-xl"><i className="fa-solid fa-shield-halved text-white text-2xl"></i></div>
        <nav className="flex flex-col gap-12 text-slate-500">
          <i onClick={() => setActiveTab('NHÂN SỰ & TỔ CHỨC')} className={`fa-solid fa-users-gear text-xl cursor-pointer ${activeTab === 'NHÂN SỰ & TỔ CHỨC' && 'text-blue-400'}`}></i>
          <i onClick={() => {setActiveTab('HÀNH CHÍNH VĂN PHÒNG'); setOfficeView('MAIN');}} className={`fa-solid fa-building text-xl cursor-pointer ${activeTab === 'HÀNH CHÍNH VĂN PHÒNG' && 'text-blue-400'}`}></i>
          <i onClick={() => setActiveTab('SOẠN TKB AI')} className={`fa-solid fa-microchip text-xl cursor-pointer ${activeTab === 'SOẠN TKB AI' && 'text-blue-400'}`}></i>
        </nav>
      </aside>

      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0 z-40 shadow-2xl">
        <div className="p-10 border-b border-slate-50">
          <h1 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1 italic">Bình Hòa Hub</h1>
          <p className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">ADMIN</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {['NHÂN SỰ & TỔ CHỨC', 'HÀNH CHÍNH VĂN PHÒNG', 'QUẢN LÝ TÀI CHÍNH', 'SOẠN TKB AI'].map(m => (
            <button key={m} onClick={() => { setActiveTab(m); setOfficeView('MAIN'); }} className={`w-full flex items-center gap-5 px-8 py-6 rounded-[28px] text-[10.5px] font-black uppercase italic transition-all ${activeTab === m ? 'bg-[#1e3a8a] text-white shadow-2xl' : 'text-slate-400 hover:bg-slate-50'}`}>
              {m}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <header className="h-28 border-b border-slate-100 px-12 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-blue-500 uppercase italic">Bình Hòa Portal 2026</span>
            <h2 className="text-[18px] font-black text-slate-900 uppercase italic">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[12px] font-black uppercase italic text-slate-800 leading-none">Thầy Tùng Admin</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase italic mt-1.5 flex items-center gap-1.5">● Hệ thống online</p>
             </div>
             <div className="w-16 h-16 bg-slate-950 rounded-[25px] flex items-center justify-center text-white shadow-2xl border-4 border-white"><i className="fa-solid fa-user-tie text-2xl"></i></div>
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