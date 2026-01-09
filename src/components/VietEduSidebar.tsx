
import React, { useState, useRef } from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout?: () => void;
  userRole: UserRole;
}

const VietEduSidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, onLogout, userRole }) => {
  const [sidebarLogo, setSidebarLogo] = useState<string | null>(localStorage.getItem('vietedu_sidebar_logo'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setSidebarLogo(base64);
        localStorage.setItem('vietedu_sidebar_logo', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const allMenuItems = [
    { id: 'dashboard', label: 'TỔNG QUAN', icon: 'fa-table-cells-large', path: 'dashboard', roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { id: 'school-admin', label: 'QUẢN TRỊ TRƯỜNG', icon: 'fa-building-shield', path: 'school-admin', roles: [UserRole.ADMIN] },
    { id: 'lesson-planner', label: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles', path: 'lesson-planner', roles: [UserRole.ADMIN, UserRole.TEACHER] },
    { id: 'grade-book', label: 'SỔ ĐIỂM SỐ', icon: 'fa-list-check', path: 'grade-book', roles: [UserRole.ADMIN, UserRole.TEACHER] },
    { id: 'class-book', label: 'SỔ CHỦ NHIỆM', icon: 'fa-user-graduate', path: 'class-book', roles: [UserRole.ADMIN, UserRole.TEACHER] },
    { id: 'resources', label: 'HỌC LIỆU MỞ', icon: 'fa-layer-group', path: 'resources', roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { id: 'videos', label: 'VIDEO BÀI GIẢNG', icon: 'fa-video', path: 'videos', roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { id: 'game-center', label: 'GAME CENTER', icon: 'fa-gamepad', path: 'game-center', roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { id: 'intro', label: 'GIỚI THIỆU APP', icon: 'fa-circle-info', path: 'intro', roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
  ];

  const filteredMenuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside id="vietedu-sidebar" className="flex flex-col text-white shadow-2xl font-sans bg-[#061631] h-full overflow-hidden shrink-0 border-r border-white/5">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoChange} />
      
      <div className="py-8 flex flex-col items-center justify-center gap-3 border-b border-white/5 mx-4 shrink-0">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden rounded-[2px]"
        >
           {sidebarLogo ? (
             <img src={sidebarLogo} className="w-full h-full object-cover" alt="School Logo" />
           ) : (
             <div className="flex flex-col items-center gap-1 opacity-30">
               <i className="fas fa-image text-xl"></i>
               <span className="text-[7px] font-black uppercase tracking-widest text-center">ẢNH TRƯỜNG</span>
             </div>
           )}
        </div>
        <div className="text-center">
           <h1 className="font-black text-[11px] tracking-tight uppercase italic text-white leading-none">VietEdu Smart</h1>
           <p className="text-[8px] font-bold text-blue-400/60 uppercase mt-1">Lab Số 4.0</p>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 px-3 space-y-0.5 overflow-y-auto no-scrollbar pb-10">
        {filteredMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-[2px] transition-all duration-200 group ${
              currentPath === item.path 
                ? 'bg-blue-600 text-white shadow-lg font-black italic'
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-sm w-5 text-center shrink-0`}></i>
            <span className="text-[9px] font-black uppercase tracking-tight leading-none text-left">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-3 mt-auto shrink-0 border-t border-white/5 mx-2 pb-6 pt-3">
         <button 
           onClick={onLogout}
           className="w-full bg-white/5 hover:bg-rose-600 text-white/60 hover:text-white transition-all py-3 rounded-[2px] flex items-center justify-center gap-3 border border-white/5"
         >
            <i className="fa-solid fa-power-off text-xs"></i>
            <span className="text-[9px] font-black uppercase tracking-widest italic leading-none">ĐĂNG XUẤT</span>
         </button>
      </div>
    </aside>
  );
};

export default VietEduSidebar;
