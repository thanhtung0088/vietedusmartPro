
import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  role: UserRole;
  onOpenSecurity: () => void;
  onOpenShare: () => void;
}

const VietEduSidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'TỔNG QUAN', icon: 'fa-th-large', path: 'dashboard' },
    { id: 'school-admin', label: 'QUẢN TRỊ NHÀ TRƯỜNG', icon: 'fa-shield-halved', path: 'school-admin' },
    { id: 'lesson-planner', label: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles', path: 'lesson-planner' },
    { id: 'grade-book', label: 'SỔ ĐIỂM THÔNG MINH', icon: 'fa-table-list', path: 'grade-book' },
    { id: 'rubrics', label: 'RUBRICS ĐÁNH GIÁ', icon: 'fa-star-half-stroke', path: 'rubrics' },
    { id: 'pro-plan', label: 'KH CHUYÊN MÔN', icon: 'fa-briefcase', path: 'pro-plan' },
    { id: 'resources', label: 'KHO HỌC LIỆU', icon: 'fa-layer-group', path: 'resources' },
  ];

  return (
    <aside className="w-64 bg-[#061631] text-white flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/5 shadow-2xl">
      {/* Centered Header Section */}
      <div className="py-10 flex flex-col items-center justify-center gap-4 border-b border-white/5 mx-4 shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center border border-white/20 shadow-3d-extreme transform rotate-3 hover:rotate-0 transition-transform duration-500 shrink-0">
          <i className="fas fa-graduation-cap text-2xl text-white shadow-lg"></i>
        </div>
        <h1 
          className="font-black text-[16px] tracking-tight italic leading-none text-center px-2"
          style={{ 
            color: '#FFFFFF',
            textShadow: `
              0 1px 0 #ccc,
              0 2px 0 #c9c9c9,
              0 3px 0 #bbb,
              0 4px 0 #b9b9b9,
              0 5px 0 #aaa,
              0 6px 1px rgba(0,0,0,.1),
              0 0 5px rgba(0,0,0,.1),
              0 1px 3px rgba(0,0,0,.3),
              0 3px 5px rgba(0,0,0,.2),
              0 5px 10px rgba(0,0,0,.25),
              0 10px 10px rgba(0,0,0,.2),
              0 20px 20px rgba(0,0,0,.15)
            `,
            letterSpacing: '0.01em'
          }}
        >
          VieteduSmart_Pro
        </h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto no-scrollbar pb-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
              currentPath === item.path 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 font-black' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-sm w-5 transition-transform group-hover:scale-110`}></i>
            <span className="text-[10px] font-black uppercase tracking-widest italic">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-8 mt-auto">
         <div className="bg-white/5 p-5 rounded-3xl flex items-center justify-center gap-3 border border-white/5 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] font-black text-white/80 uppercase tracking-widest italic leading-tight text-center">HỆ THỐNG ĐANG<br/>HOẠT ĐỘNG</span>
         </div>
      </div>
    </aside>
  );
};

export default VietEduSidebar;
