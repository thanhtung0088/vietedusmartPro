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
    { id: 'dashboard', label: 'Tổng quan', icon: 'fa-th-large', path: 'dashboard' },
    { id: 'school-admin', label: 'Quản trị Nhà trường', icon: 'fa-shield-halved', path: 'school-admin' },
    { id: 'lesson-planner', label: 'Soạn bài AI', icon: 'fa-wand-magic-sparkles', path: 'lesson-planner' },
    { id: 'grade-book', label: 'Sổ điểm thông minh', icon: 'fa-table-list', path: 'grade-book' },
    { id: 'rubrics', label: 'Rubrics đánh giá', icon: 'fa-star-half-stroke', path: 'rubrics' },
    { id: 'pro-plan', label: 'KH Chuyên môn', icon: 'fa-briefcase', path: 'pro-plan' },
    { id: 'resources', label: 'Kho học liệu', icon: 'fa-layer-group', path: 'resources' },
    { id: 'videos', label: 'Video bài giảng', icon: 'fa-video', path: 'videos' },
    { id: 'game-center', label: 'Game Center', icon: 'fa-gamepad', path: 'game-center' },
  ];

  return (
    <aside className="w-64 bg-[#051125] text-white flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/5 shadow-2xl">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
          <i className="fas fa-graduation-cap text-lg"></i>
        </div>
        <h1 className="font-black text-base tracking-tighter italic leading-none">VIETEDU <span className="text-blue-400">MIDDLE</span></h1>
      </div>
      
      <nav className="flex-1 mt-4 px-4 space-y-1 overflow-y-auto no-scrollbar pb-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
              currentPath === item.path 
                ? 'bg-[#3b82f6] text-white shadow-xl shadow-blue-500/20 font-bold' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-base w-6 transition-transform group-hover:scale-110`}></i>
            <span className="text-[11px] font-black uppercase tracking-widest italic">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-8 text-center bg-black/20">
         <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Hệ thống đang hoạt động</span>
         </div>
      </div>
    </aside>
  );
};

export default VietEduSidebar;