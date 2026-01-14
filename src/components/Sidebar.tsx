import React from 'react';

const Sidebar: React.FC<any> = ({ activeMenu, onNavigate }) => {
  const menus = [
    { name: 'TỔNG QUAN', icon: 'fa-grid-2' },
    { name: 'QUẢN TRỊ TRƯỜNG', icon: 'fa-school' },
    { name: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles' },
    { name: 'SỐ ĐIỂM SỐ', icon: 'fa-list-check' },
    { name: 'SỐ CHỦ NHIỆM', icon: 'fa-user-graduate' },
    { name: 'HỌC LIỆU MỞ', icon: 'fa-book-open' },
    { name: 'VIDEO BÀI GIẢNG', icon: 'fa-circle-play' },
    { name: 'GAME CENTER', icon: 'fa-gamepad' },
    { name: 'GIỚI THIỆU APP', icon: 'fa-circle-info' },
  ];

  return (
    <div className="w-[260px] bg-[#1a2236] border-r border-white/5 flex flex-col h-screen shrink-0">
      <div className="p-8 flex flex-col items-center border-b border-white/5">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
          <i className="fa-solid fa-graduation-cap text-3xl text-white"></i>
        </div>
        <h2 className="text-white font-black italic text-sm tracking-widest text-center">VIETEDU SMART</h2>
        <span className="text-blue-400 text-[9px] font-bold mt-1">LAB SỐ 4.0</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
        {menus.map((m) => (
          <button
            key={m.name}
            onClick={() => onNavigate(m.name)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
              activeMenu === m.name 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${m.icon} w-5 text-sm`}></i>
            <span className="text-[10px] font-black italic uppercase tracking-tighter">{m.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
          <i className="fa-solid fa-power-off text-sm"></i>
          <span className="text-[10px] font-black italic uppercase">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
