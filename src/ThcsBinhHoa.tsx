import React, { useState } from 'react';

const VIETEDU_SMART_PRO_2026: React.FC = () => {
  // --- QUẢN LÝ TRẠNG THÁI ---
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('Nhân sự & Tổ chức');
  const [activeMainMenu, setActiveMainMenu] = useState('Quản trị trường');
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelInput, setExcelInput] = useState('');
  const [personnelData, setPersonnelData] = useState<string[][]>([]);

  // --- THUẬT TOÁN XỬ LÝ DỮ LIỆU TRIỆT ĐỂ (CHỐNG NHẢY SỐ) ---
  const handlePasteExcel = () => {
    if (!excelInput.trim()) return;

    const rawRows = excelInput.split('\n').filter(line => line.trim() !== '');
    
    const finalData = rawRows
      .map(line => line.split('\t').map(cell => cell.trim()))
      .filter(row => {
        const nameColumn = row[1] || '';
        // ĐIỀU KIỆN LỌC TRIỆT ĐỂ:
        // 1. Cột tên không được để trống
        // 2. Cột tên không được chỉ chứa số (loại bỏ các dòng tổng cộng khối)
        // 3. Cột tên không chứa các từ khóa tiêu đề
        const isOnlyNumber = /^\d+$/.test(nameColumn);
        const isHeader = nameColumn.toLowerCase().includes("họ và tên") || nameColumn.toLowerCase().includes("cộng");
        
        return nameColumn !== '' && !isOnlyNumber && !isHeader;
      });

    setPersonnelData(finalData);
    setIsExcelModalOpen(false);
    setExcelInput('');
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white font-sans overflow-hidden">
      
      {/* 1. SIDEBAR CHÍNH (BIỂU TƯỢNG) */}
      {!isFullScreen && (
        <aside className="w-[80px] flex flex-col items-center py-6 border-r border-white/5 bg-[#0f172a] shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-blue-500/20">
            <i className="fa-solid fa-graduation-cap text-2xl"></i>
          </div>
          <div className="flex-1 space-y-6">
            {[
              { id: 'Tổng quan', icon: 'fa-grid-2' },
              { id: 'Quản trị trường', icon: 'fa-school' },
              { id: 'Soạn bài AI', icon: 'fa-robot' },
              { id: 'Học liệu', icon: 'fa-book-open' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveMainMenu(item.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeMainMenu === item.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-500 hover:text-white'}`}
              >
                <i className={`fa-solid ${item.icon} text-xl`}></i>
              </button>
            ))}
          </div>
          <button className="w-12 h-12 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
            <i className="fa-solid fa-power-off text-xl"></i>
          </button>
        </aside>
      )}

      {/* 2. SIDEBAR PHỤ (CHI TIẾT MENU) - CẬP NHẬT THEO YÊU CẦU THẦY */}
      {!isFullScreen && activeMainMenu === 'Quản trị trường' && (
        <aside className="w-64 bg-[#0f172a]/50 border-r border-white/5 flex flex-col shrink-0 animate-in slide-in-from-left duration-300">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-[10px] font-black text-blue-500 uppercase italic tracking-widest">Quản trị số 2026</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            {[
              { name: 'Nhân sự & Tổ chức', icon: 'fa-users-gear' },
              { name: 'Hành chính Văn phòng', icon: 'fa-file-invoice', sub: [
                  'Kế toán - Tài vụ', 'Học vụ - Văn thư', 'Công nghệ thông tin', 'Thư viện', 'Tư vấn học đường', 'Đoàn - Đội', 'Bảo vệ - Phục vụ', 'Giám thị'
              ]},
              { name: 'Chi bộ', icon: 'fa-clover' },
              { name: 'Công đoàn', icon: 'fa-handshake' },
              { name: 'Quản lý tài chính', icon: 'fa-money-bill-transfer' },
              { name: 'Quản lý chuyên môn', icon: 'fa-book' },
              { name: 'Quản lý cơ sở vật chất', icon: 'fa-building-shield' },
              { name: 'Báo cáo tổng hợp', icon: 'fa-chart-pie' },
              { name: 'Soạn TKB AI', icon: 'fa-calendar-check' },
            ].map((menu) => (
              <div key={menu.name} className="space-y-1">
                <button 
                  onClick={() => setActiveTab(menu.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase italic transition-all ${activeTab === menu.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <i className={`fa-solid ${menu.icon} w-5`}></i>
                  {menu.name}
                </button>
                {/* HIỂN THỊ MENU PHỤ CỦA HÀNH CHÍNH */}
                {menu.sub && activeTab === menu.name && (
                  <div className="ml-9 space-y-1 py-1 border-l border-white/10">
                    {menu.sub.map(subItem => (
                      <button key={subItem} className="w-full text-left px-4 py-2 text-[10px] text-slate-500 hover:text-blue-400 transition-all italic font-medium">• {subItem}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* 3. KHÔNG GIAN LÀM VIỆC CHÍNH */}
      <main className="flex-1 flex flex-col relative bg-[#020617] overflow-hidden">
        
        {/* HEADER CÔNG CỤ */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0f172a]/80 backdrop-blur-md shrink-0 z-50">
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)} 
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isFullScreen ? 'bg-blue-600 shadow-lg' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              <i className={`fa-solid ${isFullScreen ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase italic text-blue-500">{activeTab}</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase italic tracking-tighter">Hệ thống phân tích dữ liệu THCS Bình Hòa</span>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-black italic text-[10px] uppercase shadow-lg hover:brightness-110 transition-all">Phòng họp Online</button>
             <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black italic text-[10px] uppercase shadow-lg hover:brightness-110 transition-all">Zalo OA Admin</button>
          </div>
        </header>

        {/* VÙNG HIỂN THỊ BẢNG */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          <div className="bg-white rounded-[40px] text-black shadow-2xl flex flex-col min-h-full overflow-hidden border-4 border-white animate-in zoom-in-95 duration-500">
            
            {/* TIÊU ĐỀ HÀNH CHÍNH QUỐC GIA */}
            <div className="p-10 pb-6 border-b border-slate-100 bg-slate-50/50">
               <div className="flex justify-between items-start mb-8 font-bold text-[10px] uppercase text-slate-600">
                  <div className="text-center italic leading-loose">UBND XÃ BÌNH MỸ<br/><span className="underline decoration-2 underline-offset-4 font-black text-slate-900">TRƯỜNG THCS BÌNH HÒA</span></div>
                  <div className="text-center italic leading-loose">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/><span className="underline decoration-2 underline-offset-4 font-black text-slate-900">Độc lập - Tự do - Hạnh phúc</span></div>
               </div>
               
               <div className="text-center mb-8">
                  <h1 className="text-3xl font-black uppercase italic text-slate-900 tracking-tighter">BẢNG PHÂN CÔNG CHUYÊN MÔN</h1>
                  <p className="italic font-bold text-blue-600 text-sm mt-1">Học kỳ I, Năm học 2025 - 2026</p>
               </div>
               
               <div className="flex justify-end">
                  <button 
                    onClick={() => setIsExcelModalOpen(true)}
                    className="bg-[#107c41] hover:bg-[#155e37] text-white px-10 py-5 rounded-2xl font-black italic text-[12px] uppercase shadow-2xl shadow-emerald-200 transition-all flex items-center gap-4 active:scale-95"
                  >
                    <i className="fa-solid fa-file-excel text-xl"></i> Dán từ Excel Ngay
                  </button>
               </div>
            </div>

            {/* BẢNG CHUYÊN MÔN - CHỐNG NHẢY SỐ */}
            <div className="p-8 flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto border border-slate-200 rounded-3xl custom-scrollbar-light shadow-inner bg-slate-50/30">
                <table className="w-full text-[11px] border-collapse min-w-[2200px]">
                  <thead className="bg-[#0f172a] text-white sticky top-0 z-30 font-black uppercase italic">
                    <tr>
                      <th rowSpan={2} className="p-4 border border-white/10 w-12 text-center">TT</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-80 text-left sticky left-0 bg-[#0f172a] z-40 whitespace-nowrap shadow-xl">Họ và tên giáo viên</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-12 text-center">Nữ</th>
                      <th colSpan={3} className="p-4 border border-white/10 text-center bg-blue-900/40">Tình hình biên chế</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-40 text-center">Công tác chính</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-32 text-center">Môn</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-96 text-center">Lớp (khối) dạy</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-24 text-center">Tổng tiết</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-24 text-center">Chủ nhiệm</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-64 text-center">Công tác kiêm nhiệm</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-24 text-center">Tổng/Tuần</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-24 text-center text-blue-400">Tiêu chuẩn</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-24 text-center text-red-400">Phụ trội</th>
                      <th rowSpan={2} className="p-4 border border-white/10 w-40 text-center">Ghi chú</th>
                    </tr>
                    <tr>
                      <th className="p-3 border border-white/10 w-24 text-center bg-blue-800/20">Biên chế</th>
                      <th className="p-3 border border-white/10 w-24 text-center bg-blue-800/20">Tập sự</th>
                      <th className="p-3 border border-white/10 w-24 text-center bg-blue-800/20">Hợp đồng</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {personnelData.length > 0 ? (
                      personnelData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50/80 transition-all group">
                          <td className="p-4 text-center font-black text-blue-600 bg-slate-50/50">{idx + 1}</td>
                          {/* DỮ LIỆU TÊN: SẠCH 100%, KHÔNG CÓ SỐ LẺ */}
                          <td className="p-4 font-black uppercase text-slate-900 sticky left-0 bg-white group-hover:bg-blue-50 z-20 shadow-md whitespace-nowrap">
                            {row[1]}
                          </td>
                          <td className="p-4 text-center font-bold text-pink-500">{row[2] || ''}</td>
                          <td className="p-4 text-center">{row[3] || ''}</td>
                          <td className="p-4 text-center">{row[4] || ''}</td>
                          <td className="p-4 text-center">{row[5] || ''}</td>
                          <td className="p-4 text-center font-bold text-slate-600 italic uppercase">{row[6] || ''}</td>
                          <td className="p-4 text-center font-black text-blue-700">{row[7] || ''}</td>
                          <td className="p-4 text-center leading-relaxed font-bold italic text-slate-700">{row[8] || ''}</td>
                          <td className="p-4 text-center font-black bg-slate-50">{row[9] || ''}</td>
                          <td className="p-4 text-center font-bold text-emerald-600">{row[10] || ''}</td>
                          <td className="p-4 text-center italic text-slate-400 text-[10px]">{row[11] || ''}</td>
                          <td className="p-4 text-center font-black bg-blue-50">{row[12] || ''}</td>
                          <td className="p-4 text-center font-bold">{row[13] || ''}</td>
                          <td className="p-4 text-center text-red-600 font-black">{row[14] || ''}</td>
                          <td className="p-4 text-center italic text-slate-300">{row[15] || ''}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={16} className="h-80 text-center italic text-slate-300 font-black uppercase tracking-[0.5em] bg-slate-50/50">
                           Đang chờ dán dữ liệu chuyên môn...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL NHẬP LIỆU */}
        {isExcelModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={() => setIsExcelModalOpen(false)}></div>
            <div className="relative bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border-t-[12px] border-emerald-600">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase italic">Bộ nạp dữ liệu thông minh</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 italic">Tự động lọc bỏ số thứ tự khối và dòng trống</p>
                </div>
                <button onClick={() => setIsExcelModalOpen(false)} className="text-slate-200 hover:text-red-500 text-3xl transition-all"><i className="fa-solid fa-circle-xmark"></i></button>
              </div>
              <textarea 
                autoFocus
                value={excelInput}
                onChange={(e) => setExcelInput(e.target.value)}
                placeholder="Nhấn Ctrl + V để dán dữ liệu chuyên môn từ Excel..."
                className="w-full h-72 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[30px] p-6 text-black text-xs font-bold outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none shadow-inner"
              />
              <button 
                onClick={handlePasteExcel}
                className="w-full mt-6 bg-[#107c41] text-white py-6 rounded-3xl font-black uppercase italic text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4"
              >
                <i className="fa-solid fa-shield-check text-xl"></i> Cập nhật bảng sạch 100%
              </button>
            </div>
          </div>
        )}
      </main>

      {/* CSS THANH CUỘN */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        
        .custom-scrollbar-light::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 3px solid #f8fafc; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default VIETEDU_SMART_PRO_2026;