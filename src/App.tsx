
import React, { useState, useEffect } from 'react';
import VietEduSidebar from './components/VietEduSidebar';
import Dashboard from './pages/Dashboard';
import LessonPlanner from './pages/LessonPlanner';
import ClassBook from './pages/ClassBook';
import GradeBook from './pages/GradeBook'; 
import VideoHub from './pages/VideoHub';
import ResourceHub from './pages/ResourceHub';
import ProfessionalPlan from './pages/ProfessionalPlan';
import Rubrics from './pages/Rubrics';
import GameCenter from './pages/GameCenter';
import Intro from './pages/Intro';
import SchoolAdmin from './pages/SchoolAdmin'; 
import VietEduChat from './components/VietEduChat';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<'ADMIN' | 'TEACHER' | 'STUDENT'>('ADMIN');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('vietedu_session');
    if (session) {
      const data = JSON.parse(session);
      setCurrentUser(data);
      setUserRole(data.role);
      setIsLoggedIn(true);
    }
  }, []);

  const handleQuickAccess = (role: 'ADMIN' | 'TEACHER' | 'STUDENT') => {
    const mockUser = {
      id: role.toLowerCase() + '_01',
      name: role === 'ADMIN' ? 'QUẢN TRỊ VIÊN' : role === 'TEACHER' ? 'THẦY NGUYỄN TÙNG' : 'HỌC SINH THÔNG MINH',
      role: UserRole[role],
      plan: 'PRO'
    };
    localStorage.setItem('vietedu_session', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    setUserRole(mockUser.role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('vietedu_session');
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPath} onUpgrade={() => setIsUpgradeModalOpen(true)} user={currentUser} />;
      case 'school-admin': return <SchoolAdmin onBack={() => setCurrentPath('dashboard')} />;
      case 'lesson-planner': return <LessonPlanner onBack={() => setCurrentPath('dashboard')} userPlan="PRO" userRole={userRole} />;
      case 'grade-book': return <GradeBook onBack={() => setCurrentPath('dashboard')} />;
      case 'class-book': return <ClassBook onBack={() => setCurrentPath('dashboard')} />;
      case 'rubrics': return <Rubrics onBack={() => setCurrentPath('dashboard')} />;
      case 'pro-plan': return <ProfessionalPlan onBack={() => setCurrentPath('dashboard')} />;
      case 'resources': return <ResourceHub onBack={() => setCurrentPath('dashboard')} />;
      case 'videos': return <VideoHub onBack={() => setCurrentPath('dashboard')} />;
      case 'game-center': return <GameCenter onBack={() => setCurrentPath('dashboard')} />;
      case 'intro': return <Intro onBack={() => setCurrentPath('dashboard')} />;
      default: return <Dashboard onNavigate={setCurrentPath} onUpgrade={() => setIsUpgradeModalOpen(true)} user={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-[#061631] flex items-center justify-center font-sans overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#061631]/80 via-transparent to-blue-900/40"></div>
        
        <div className="bg-white/10 backdrop-blur-2xl w-full max-w-5xl h-[650px] rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex overflow-hidden border border-white/20 z-10 animate-in zoom-in-95 duration-700">
          <div className="w-[45%] p-16 flex flex-col justify-between border-r border-white/10">
             <div>
                <h1 className="text-6xl font-black italic gold-gradient-text tracking-tighter leading-none mb-4">VietEdu<br/>Smart</h1>
                <p className="text-blue-400 font-black uppercase tracking-[0.5em] italic text-xs">Lab Số 4.0 - Lab of the Future</p>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/60">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"><i className="fas fa-check"></i></div>
                   <span className="text-sm font-bold italic">AI Soạn bài 5512 tức thì</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"><i className="fas fa-check"></i></div>
                   <span className="text-sm font-bold italic">Hệ thống quản trị Lab Số v4.0</span>
                </div>
             </div>
          </div>

          <div className="flex-1 p-16 flex flex-col justify-center text-center">
             <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-10">Bắt đầu trải nghiệm</h2>
             <div className="grid grid-cols-1 gap-6">
                <button onClick={() => handleQuickAccess('ADMIN')} className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white p-8 rounded-3xl transition-all shadow-2xl flex items-center justify-between border-b-8 border-black/20">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"><i className="fas fa-shield-halved"></i></div>
                      <div className="text-left">
                         <span className="block text-[11px] font-black uppercase tracking-widest opacity-60">Phân hệ dành cho</span>
                         <span className="text-xl font-black uppercase italic tracking-tighter">BAN GIÁM HIỆU</span>
                      </div>
                   </div>
                   <i className="fas fa-chevron-right opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
                </button>

                <button onClick={() => handleQuickAccess('TEACHER')} className="group bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white p-8 rounded-3xl transition-all shadow-2xl flex items-center justify-between border-b-8 border-black/20">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"><i className="fas fa-user-tie"></i></div>
                      <div className="text-left">
                         <span className="block text-[11px] font-black uppercase tracking-widest opacity-60">Phân hệ dành cho</span>
                         <span className="text-xl font-black uppercase italic tracking-tighter">GIÁO VIÊN BỘ MÔN</span>
                      </div>
                   </div>
                   <i className="fas fa-chevron-right opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
                </button>

                <button onClick={() => handleQuickAccess('STUDENT')} className="group bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white p-8 rounded-3xl transition-all shadow-2xl flex items-center justify-between border-b-8 border-black/20">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"><i className="fas fa-graduation-cap"></i></div>
                      <div className="text-left">
                         <span className="block text-[11px] font-black uppercase tracking-widest opacity-60">Phân hệ dành cho</span>
                         <span className="text-xl font-black uppercase italic tracking-tighter">HỌC SINH KHÁCH</span>
                      </div>
                   </div>
                   <i className="fas fa-chevron-right opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
                </button>
             </div>
             <p className="mt-12 text-white/30 text-[10px] font-black uppercase tracking-widest italic">Hệ thống đang chạy bản Lab Testing v4.0 Chốt</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      <VietEduSidebar currentPath={currentPath} onNavigate={setCurrentPath} onLogout={handleLogout} userRole={userRole} />
      <main id="vietedu-main" className="flex-1 overflow-hidden relative">
        {renderContent()}
        <VietEduChat />
      </main>
    </div>
  );
};

export default App;
