import React, { useState } from 'react';

const BINH_HOA_PORTAL_CORE_2026: React.FC = () => {
  const [activeTab, setActiveTab] = useState('TỔNG QUAN');

  // Dữ liệu menu bên trái theo ảnh mẫu của Thầy
  const menuItems = [
    { name: 'TỔNG QUAN', icon: 'fa-th-large' },
    { name: 'QUẢN TRỊ TRƯỜNG', icon: 'fa-school' },
    { name: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles' },
    { name: 'SỔ ĐIỂM SỐ', icon: 'fa-list-check' },
    { name: 'SỔ CHỦ NHIỆM', icon: 'fa-user-tie' },
    { name: 'HỌC LIỆU MỞ', icon: 'fa-book-open' },
    { name: 'VIDEO BÀI GIẢNG', icon: 'fa-video' },
  ];

  // Dữ liệu các thẻ màu sắc ở giữa
  const quickStats = [
    { name: 'SOẠN BÀI AI', color: 'bg-indigo-500', icon: 'fa-sparkles' },
    { name: 'BÀI GIẢNG SỐ', color: 'bg-purple-500', icon: 'fa-desktop' },
    { name: 'GAME CENTER', color: 'bg-red-500', icon: 'fa-gamepad' },
    { name: 'SỔ ĐIỂM SỐ', color: 'bg-cyan-400', icon: 'fa-list-ol' },
    { name: 'SỔ CHỦ NHIỆM', color: 'bg-amber-500', icon: 'fa-graduation-cap' },
  ];

  return (
    <div className="flex h-screen bg-[#1a2236] text-white font-sans overflow-hidden">
      {/* SIDEBAR BÊN TRÁI - THEO MẪU ẢNH */}
      <aside className="w-64 bg-[#0f172a] flex flex-col border-r border-slate-800">
        <div className="p-8 flex flex-col items-center border-b border-slate-800/50">
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-2xl border border-slate-700">
             <i className="fa-solid fa-graduation-cap text-3xl text-blue-400"></i>
          </div>
          <h2 className="text-xs font-black tracking-tighter text-center">VIETEDU SMART<br/><span className="text-[10px] text-blue-400 opacity-70">LAB SỐ 4.0</span></h2>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black transition-all ${
                activeTab === item.name ? 'bg-blue-600 shadow-lg shadow-blue-900/20 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button className="w-full py-4 bg-slate-800/50 rounded-xl text-[10px] font-black text-slate-400 flex items-center justify-center gap-3 border border-slate-700">
            <i className="fa-solid fa-power-off"></i> ĐĂNG XUẤT
          </button>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#f1f5f9]">
        {/* HEADER CHÀO MỪNG */}
        <div className="p-8">
          <div className="bg-[#0f172a] rounded-[30px] p-8 flex items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 bg-slate-800 rounded-2xl border-2 border-slate-700 flex items-center justify-center shadow-inner overflow-hidden">
                 <img src="https://via.placeholder.com/100" alt="teacher" className="opacity-50 grayscale" />
              </div>
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter text-yellow-400">CHÀO MỪNG QUÝ THẦY CÔ !</h1>
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mt-1">Hệ thống số hóa trường học THCS Bình Hòa</p>
              </div>
            </div>
            <div className="text-right z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 italic">Nâng cấp VIP 2026</p>
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-black text-[10px] flex items-center gap-3 transition-all">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  VÀO PHÒNG HỌP ONLINE
                </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>

          {/* DÃY THẺ MÀU SẮC NHƯ ẢNH MẪU */}
          <div className="grid grid-cols-5 gap-4 mt-8">
            {quickStats.map((stat) => (
              <div key={stat.name} className={`${stat.color} p-6 rounded-[24px] shadow-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition-transform border-b-4 border-black/10 group`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl group-hover:rotate-12 transition-transform">
                  <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <span className="text-[10px] font-black italic">{stat.name}</span>
              </div>
            ))}
          </div>

          {/* KHU VỰC LỊCH DẠY VÀ TRÌNH CHIẾU */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            <div className="col-span-4 bg-white rounded-[35px] p-8 shadow-xl border border-slate-200 min-h-[400px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-slate-800 font-black italic text-sm uppercase">Lịch dạy hôm nay</h3>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Cập nhật TKB</button>
              <div className="mt-12 flex flex-col items-center justify-center text-slate-300">
                  <i className="fa-solid fa-calendar-day text-6xl opacity-20 mb-4"></i>
                  <p className="text-[10px] font-bold uppercase italic text-slate-400">Không có tiết dạy lúc này</p>
              </div>
            </div>

            <div className="col-span-8 bg-white rounded-[35px] p-8 shadow-xl border border-slate-200 flex flex-col">
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h3 className="text-slate-800 font-black italic text-sm uppercase">Trình chiếu bài giảng</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-black text-[9px] uppercase italic">:: Toàn màn hình</button>
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase italic">Mở tài liệu PDF</button>
                  </div>
               </div>
               <div className="flex-1 bg-slate-100 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="bg-white/80 px-3 py-1 rounded text-[9px] font-bold text-slate-600 border border-slate-200 shadow-sm">1 / 13</span>
                    <span className="bg-white/80 px-3 py-1 rounded text-[9px] font-bold text-slate-600 border border-slate-200 shadow-sm">53%</span>
                  </div>
                  <div className="p-10 bg-white shadow-2xl rounded-lg border border-slate-200 group-hover:scale-105 transition-transform duration-700">
                    <img src="https://via.placeholder.com/400x250" alt="slide" className="rounded opacity-60" />
                    <div className="mt-4 border-t pt-4 text-center">
                      <p className="text-blue-600 font-black text-[11px] uppercase italic">Bài 2: YÊU THƯƠNG CON NGƯỜI</p>
                      <p className="text-slate-400 text-[8px] font-bold mt-1 uppercase italic tracking-widest">Thời gian thực hiện: 3 tiết</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* NÚT CHAT BUBBLE GÓC DƯỚI */}
      <div className="fixed bottom-10 right-10 w-16 h-16 bg-blue-500 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border-4 border-white z-[100]">
        <i className="fa-solid fa-comment-dots text-2xl text-white"></i>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce"></div>
      </div>
    </div>
  );
};

export default BINH_HOA_PORTAL_CORE_2026;