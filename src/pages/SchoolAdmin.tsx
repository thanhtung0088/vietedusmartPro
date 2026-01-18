import React, { useState } from 'react';

const THCS_BinhHoa_Elite_Final_2026: React.FC = () => {
  const [activeSubMenu, setActiveSubMenu] = useState('hr');
  const [currentWorkSpace, setCurrentWorkSpace] = useState<string | null>(null);
  const [isZaloOpen, setIsZaloOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const SCHOOL_NAME = "THCS BÌNH HÒA - QUẢN TRỊ SỐ 2026";

  // SIDEBAR 9 MỤC ĐÚNG MẪU
  const sidebarMenus = [
    { id: 'hr', label: 'Nhân sự & Tổ chức', icon: 'fa-users-gear' },
    { id: 'office', label: 'Hành chính Văn phòng', icon: 'fa-building-columns' },
    { id: 'party', label: 'Chi bộ', icon: 'fa-star' },
    { id: 'union', label: 'Công đoàn', icon: 'fa-hands-holding-child' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: 'fa-money-check-dollar' },
    { id: 'academic', label: 'Quản lý Chuyên môn', icon: 'fa-book-open-reader' },
    { id: 'facilities', label: 'Quản lý Cơ sở vật chất', icon: 'fa-school-lock' },
    { id: 'reports', label: 'Báo cáo tổng hợp', icon: 'fa-chart-pie' },
    { id: 'tkb', label: 'Soạn TKB AI', icon: 'fa-robot' },
  ];

  // HÀNH CHÍNH 8 BỘ PHẬN
  const officeDepts = [
    { label: 'Kế toán - Tài vụ', icon: 'fa-file-invoice-dollar', color: 'bg-blue-600' },
    { label: 'Học vụ - Văn thư', icon: 'fa-folder-tree', color: 'bg-emerald-600' },
    { label: 'Công nghệ thông tin', icon: 'fa-laptop-code', color: 'bg-indigo-600' },
    { label: 'Thư viện', icon: 'fa-book-bookmark', color: 'bg-orange-600' },
    { label: 'Tư vấn học đường', icon: 'fa-user-doctor', color: 'bg-rose-600' },
    { label: 'Đoàn - Đội', icon: 'fa-flag', color: 'bg-red-600' },
    { label: 'Bảo vệ - Phục vụ', icon: 'fa-shield-halved', color: 'bg-slate-600' },
    { label: 'Giám thị', icon: 'fa-user-shield', color: 'bg-cyan-700' },
  ];

  // 6 PHÂN HỆ BÁO CÁO
  const reportData = [
    { title: "I. KẾ HOẠCH & BÁO CÁO CHUNG", items: ["Kế hoạch giáo dục tổ chuyên môn (Năm học)", "Kế hoạch hoạt động chuyên môn tháng/tuần", "Biên bản họp tổ chuyên môn định kỳ", "Biên bản họp xét thi đua đợt 1, 2, 3, 4"] },
    { title: "II. QUẢN LÝ DẠY HỌC & CHƯƠNG TRÌNH", items: ["Báo cáo thực hiện chương trình (Tiến độ)", "Báo cáo phân công giảng dạy và dạy thay", "Kế hoạch dạy học các môn học (Phân phối CT)"] },
    { title: "III. HOẠT ĐỘNG CHUYÊN ĐỀ & THAO GIẢNG", items: ["Báo cáo sinh hoạt chuyên môn nghiên cứu bài học", "Kế hoạch thao giảng, dự giờ cấp tổ", "Tổng hợp nhận xét, đánh giá tiết dạy GV"] },
    { title: "IV. BỒI DƯỠNG & KIỂM TRA NỘI BỘ", items: ["Báo cáo kiểm tra hồ sơ sổ sách giáo viên", "Báo cáo đánh giá chuẩn nghề nghiệp giáo viên", "Nhận xét, đánh giá viên chức hằng tháng"] },
    { title: "V. HOẠT ĐỘNG HỌC SINH", items: ["Kế hoạch bồi dưỡng học sinh giỏi cấp tổ", "Báo cáo kết quả phụ đạo học sinh yếu kém", "Kế hoạch ngoại khóa chuyên môn"] },
    { title: "VI. CHUYỂN ĐỔI SỐ & HỒ SƠ ĐIỆN TỬ", items: ["Báo cáo triển khai hồ sơ sổ sách điện tử", "Báo cáo sử dụng học bạ điện tử và chữ ký số"] },
  ];

  return (
    <div className={`flex h-screen bg-[#020617] text-white overflow-hidden ${isFullScreen ? 'p-0' : ''}`}>
      
      {/* SIDEBAR TRÁI */}
      {!isFullScreen && (
        <aside className="w-72 flex flex-col border-r border-white/5 bg-[#0f172a] z-50">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-[11px] font-black text-blue-400 uppercase italic tracking-widest">{SCHOOL_NAME}</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll">
            {sidebarMenus.map((item) => (
              <button key={item.id} onClick={() => { setActiveSubMenu(item.id); setCurrentWorkSpace(null); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase italic transition-all ${activeSubMenu === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}>
                <i className={`fa-solid ${item.icon} w-5`}></i> {item.label}
              </button>
            ))}
          </nav>
          <div className="p-6"><button className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black italic text-[10px] uppercase border border-red-500/20">ĐĂNG XUẤT</button></div>
        </aside>
      )}

      <main className="flex-1 flex flex-col relative bg-[#020617]">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0f172a]/80 backdrop-blur-md">
          <div className="text-[11px] font-black uppercase italic text-blue-500">
            {isFullScreen ? 'CHẾ ĐỘ TOÀN MÀN HÌNH' : `Phân hệ: ${sidebarMenus.find(m => m.id === activeSubMenu)?.label}`}
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsFullScreen(!isFullScreen)} className="bg-slate-800 text-white px-6 py-3 rounded-xl font-black italic text-[10px] uppercase border border-white/10 hover:bg-slate-700 transition-all">
              <i className={`fa-solid ${isFullScreen ? 'fa-compress' : 'fa-expand'} mr-2`}></i> {isFullScreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            </button>
            <button onClick={() => setIsZaloOpen(!isZaloOpen)} className="bg-[#0068ff] text-white px-6 py-3 rounded-xl font-black italic text-[10px] uppercase shadow-lg flex items-center gap-2"><i className="fa-solid fa-comment-dots"></i> Zalo OA Admin</button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-10 custom-scroll">
          
          {/* TRANG NHÂN SỰ: BẢNG PHÂN CÔNG CHUYÊN MÔN */}
          {activeSubMenu === 'hr' && (
            <div className="bg-white rounded-[40px] text-black shadow-2xl flex flex-col min-h-full">
              <div className="p-12 pb-6">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-center">
                    <h4 className="font-bold text-[12px] uppercase leading-tight">ỦY BAN NHÂN DÂN XÃ BÌNH MỸ</h4>
                    <h4 className="font-black text-[13px] uppercase underline underline-offset-4">TRƯỜNG TRUNG HỌC CƠ SỞ BÌNH HÒA</h4>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-[12px] uppercase leading-tight">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                    <h4 className="font-bold text-[12px] underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</h4>
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black uppercase tracking-tighter">BẢNG PHÂN CÔNG CHUYÊN MÔN</h1>
                  <h2 className="text-lg font-bold italic">HỌC KỲ I, NĂM HỌC 2025 - 2026</h2>
                </div>
                <div className="flex justify-end gap-3 mb-4">
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-black italic text-[10px] uppercase flex items-center gap-2 shadow-lg"><i className="fa-solid fa-file-excel"></i> Dán từ Excel</button>
                </div>
              </div>
              
              {/* TABLE CONTAINER VỚI THANH CUỘN */}
              <div className="flex-1 overflow-x-auto px-12 pb-12 custom-scroll-light">
                <table className="w-full border-collapse border-2 border-slate-800 text-[11px]">
                  <thead>
                    <tr className="bg-slate-300 text-slate-900 font-black uppercase text-center">
                      <th rowSpan={2} className="border-2 border-slate-800 p-3 w-10">TT</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3 min-w-[200px]">Họ và tên giáo viên</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Nữ</th>
                      <th colSpan={3} className="border-2 border-slate-800 p-3">Tình hình biên chế</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Công tác chính</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Môn</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3 min-w-[300px]">Lớp (Khối) dạy</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Tổng số tiết dạy</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Chủ nhiệm</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Công tác kiêm nhiệm</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Tổng số tiết/tuần</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Số tiết tiêu chuẩn</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Số tiết phụ trội</th>
                      <th rowSpan={2} className="border-2 border-slate-800 p-3">Ghi chú</th>
                    </tr>
                    <tr className="bg-slate-300 text-slate-900 font-black text-[9px]">
                      <th className="border-2 border-slate-800 p-2">Biên chế</th>
                      <th className="border-2 border-slate-800 p-2">Tập sự</th>
                      <th className="border-2 border-slate-800 p-2">Hợp đồng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3,4,5].map(i => (
                      <tr key={i} className="hover:bg-slate-50 italic font-bold">
                        {Array(16).fill(0).map((_, j) => <td key={j} className="border-2 border-slate-800 p-3 text-center h-12"></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRANG BÁO CÁO TỔNG HỢP */}
          {activeSubMenu === 'reports' && (
            <div className="grid grid-cols-3 gap-6 animate-in slide-in-from-bottom-5">
              <div className="col-span-3 text-[12px] font-black uppercase italic text-blue-400 mb-4 flex justify-between items-center">
                <span>CHUYÊN GIA BÁO CÁO TỔ TRƯỞNG CHUYÊN MÔN</span>
                <button className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 text-[10px]"><i className="fa-solid fa-chevron-up mr-2"></i> THU GỌN DANH MỤC</button>
              </div>
              {reportData.map((sec, idx) => (
                <div key={idx} className="bg-[#0f172a] border border-white/10 rounded-[40px] p-8 hover:border-blue-500/40 transition-all shadow-xl">
                  <h3 className="text-blue-500 font-black italic text-[11px] uppercase mb-6 border-b border-dashed border-white/10 pb-4">{sec.title}</h3>
                  <ul className="space-y-4">
                    {sec.items.map((item, i) => (
                      <li key={i} onClick={() => setCurrentWorkSpace(item)} className="flex items-start gap-3 group cursor-pointer">
                        <i className="fa-solid fa-circle-check text-[10px] text-blue-600 mt-1 opacity-50 group-hover:opacity-100 transition-all"></i>
                        <span className="text-[11px] font-bold italic opacity-70 group-hover:opacity-100 group-hover:text-blue-400 transition-all leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* TRANG HÀNH CHÍNH & CÁC TRANG CÒN LẠI (KÍCH HOẠT KHÔNG GIAN LÀM VIỆC) */}
          {(activeSubMenu === 'office' || activeSubMenu === 'party' || activeSubMenu === 'union' || activeSubMenu === 'finance' || activeSubMenu === 'academic' || activeSubMenu === 'facilities' || activeSubMenu === 'tkb') && !currentWorkSpace && (
            <div className="grid grid-cols-4 gap-6 animate-in zoom-in-95">
              {activeSubMenu === 'office' ? (
                officeDepts.map((dept, idx) => (
                  <div key={idx} className="bg-[#0f172a] border border-white/10 rounded-[50px] p-10 text-center group transition-all hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                    <div className={`${dept.color} w-16 h-16 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-all`}><i className={`fa-solid ${dept.icon} text-2xl`}></i></div>
                    <h4 className="text-[13px] font-black uppercase italic mb-8 tracking-tighter">{dept.label}</h4>
                    <button onClick={() => setCurrentWorkSpace(dept.label)} className="w-full py-4 bg-white/5 hover:bg-blue-600 text-white rounded-2xl font-black italic text-[10px] uppercase transition-all">Mở không gian</button>
                  </div>
                ))
              ) : (
                <div className="col-span-4 bg-[#0f172a] rounded-[60px] p-20 text-center border border-dashed border-white/10">
                   <i className={`fa-solid ${sidebarMenus.find(m => m.id === activeSubMenu)?.icon} text-6xl text-blue-500/20 mb-10`}></i>
                   <h2 className="text-2xl font-black uppercase italic mb-10">KHÔNG GIAN LÀM VIỆC: {sidebarMenus.find(m => m.id === activeSubMenu)?.label}</h2>
                   <button onClick={() => setCurrentWorkSpace(sidebarMenus.find(m => m.id === activeSubMenu)?.label || '')} className="bg-blue-600 text-white px-10 py-5 rounded-3xl font-black italic uppercase text-[12px] shadow-2xl hover:scale-105 transition-all">Kích hoạt phân hệ thực tế</button>
                </div>
              )}
            </div>
          )}

          {/* WORKSPACE CHUNG CHO TẤT CẢ */}
          {currentWorkSpace && (
            <div className="bg-[#0f172a] rounded-[60px] border border-white/10 p-12 h-full flex flex-col shadow-inner animate-in fade-in zoom-in-95">
               <div className="flex justify-between items-center mb-10 pb-8 border-b border-dashed border-white/10">
                  <h3 className="text-3xl font-black uppercase italic text-blue-500 tracking-tighter">BỘ PHẬN: {currentWorkSpace}</h3>
                  <div className="flex gap-4">
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black italic text-[11px] uppercase flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                      <i className="fa-solid fa-file-excel text-lg"></i> Dán từ Excel
                    </button>
                    <button onClick={() => setCurrentWorkSpace(null)} className="px-6 py-4 text-slate-500 font-black italic text-[10px] uppercase hover:text-red-500 transition-all">Đóng [x]</button>
                  </div>
               </div>
               <div className="flex-1 border-4 border-dashed border-white/5 rounded-[40px] flex items-center justify-center italic font-black text-xs uppercase text-slate-500 opacity-20">Sẵn sàng nhận dữ liệu phân công & báo cáo chuyên sâu...</div>
            </div>
          )}
        </section>

        {/* ZALO OA WIDGET */}
        {isZaloOpen && (
          <div className="absolute bottom-10 right-10 w-[420px] h-[700px] bg-[#1e293b] rounded-[50px] shadow-2xl border-4 border-blue-500/20 z-[100] flex flex-col overflow-hidden animate-in slide-in-from-right-10">
             <div className="p-8 bg-[#0068ff] text-white flex items-center justify-between shadow-lg shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-white p-1 rounded-full"><img src="https://i.imgur.com/8Yv9z6V.png" className="w-full h-full" /></div>
                   <div>
                      <h4 className="font-black italic text-[13px] uppercase leading-none">THCS Bình Hòa</h4>
                      <p className="text-[8px] font-black opacity-70 italic mt-1 uppercase leading-relaxed">OA ID: 2731008879488992092</p>
                   </div>
                </div>
                <button onClick={() => setIsZaloOpen(false)} className="text-2xl"><i className="fa-solid fa-circle-xmark"></i></button>
             </div>
             <div className="flex-1 p-8 bg-[#0f172a]">
                <div className="bg-blue-600 text-white p-5 rounded-[25px] rounded-bl-none text-[12px] font-black italic shadow-md">Đang chờ duyệt tài khoản xác thực...</div>
             </div>
             <div className="p-8 bg-[#1e293b] border-t border-white/5 flex gap-4">
                <input type="text" placeholder="Nhập tin nhắn..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 text-[11px] italic font-black outline-none" />
                <button className="w-14 h-14 bg-[#0068ff] text-white rounded-2xl shadow-xl flex items-center justify-center"><i className="fa-solid fa-paper-plane text-xl"></i></button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default THCS_BinhHoa_Elite_Final_2026;