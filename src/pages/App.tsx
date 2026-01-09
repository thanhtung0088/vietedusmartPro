
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
  const [userPlan, setUserPlan] = useState<'BASIC' | 'PRO'>('BASIC');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState<'ADMIN' | 'TEACHER' | 'STUDENT'>('ADMIN');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem('vietedu_session');
      if (session) {
        const data = JSON.parse(session);
        if (data && data.role) {
          setCurrentUser(data);
          setUserRole(data.role);
          setUserPlan(data.plan || 'BASIC');
          setIsLoggedIn(true);
        }
      }
    } catch (e) {
      localStorage.removeItem('vietedu_session');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (selectedTab === 'ADMIN') {
      if (loginData.username === 'admin' && loginData.password === 'admin@2025') {
        completeLogin({ id: 'admin_01', name: 'QUẢN TRỊ VIÊN', role: UserRole.ADMIN, plan: 'PRO' });
      } else { setError('Sai tài khoản hoặc mật khẩu quản trị.'); }
    } else if (selectedTab === 'TEACHER') {
      if (loginData.username === 'giaovien' && loginData.password === '123456') {
        completeLogin({ id: 'gv_01', name: 'THẦY TÙNG', role: UserRole.TEACHER, plan: 'BASIC' });
      } else { setError('Thông tin đăng nhập không đúng.'); }
    } else {
      completeLogin({ id: 'hs_01', name: 'HỌC SINH KHÁCH', role: UserRole.STUDENT, plan: 'BASIC' });
    }
  };

  const completeLogin = (session: any) => {
    localStorage.setItem('vietedu_session', JSON.stringify(session));
    setCurrentUser(session);
    setUserRole(session.role);
    setUserPlan(session.plan);
    setIsLoggedIn(true);
    setCurrentPath('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('vietedu_session');
    setIsLoggedIn(false);
    setCurrentPath('dashboard');
  };

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPath} onUpgrade={() => setIsUpgradeModalOpen(true)} user={currentUser} />;
      case 'school-admin': return <SchoolAdmin onBack={() => setCurrentPath('dashboard')} />;
      case 'lesson-planner': return <LessonPlanner onBack={() => setCurrentPath('dashboard')} userPlan={userPlan} userRole={userRole} />;
      case 'grade-book': return <GradeBook onBack={() => setCurrentPath('dashboard')} />;
      case 'class-book': return <ClassBook onBack={() => setCurrentPath('dashboard')} />;
      case 'rubrics': return <Rubrics onBack={() => setCurrentPath('dashboard')} />;
      case 'pro-plan': return <ProfessionalPlan onBack={() => setCurrentPath('dashboard')} />;
      case 'resources': return <ResourceHub onBack={() => setCurrentPath('dashboard')} />;
      case 'videos': return <VideoHub onBack={() => setCurrentPath('dashboard')} />;
      case 'game-center': return <GameCenter onBack={() => setCurrentPath('dashboard')} />;
      case 'intro': return <Intro onBack={() => setCurrentPath('dashboard')} userPlan={userPlan} onUpgrade={() => setIsUpgradeModalOpen(true)} />;
      default: return <Dashboard onNavigate={setCurrentPath} onUpgrade={() => setIsUpgradeModalOpen(true)} user={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-[#f1f5f9] flex items-center justify-center p-4 font-sans overflow-hidden">
        <div className="bg-white w-full max-w-6xl max-h-[750px] h-[90vh] rounded-[2rem] shadow-2xl flex overflow-hidden border-4 border-white animate-in zoom-in-95">
          <div className="hidden lg:flex w-[45%] bg-[#061631] p-16 flex-col text-white shrink-0 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-3xl border border-white/20">
                <i className="fa-solid fa-graduation-cap text-5xl"></i>
              </div>
              <h1 className="text-6xl font-black italic tracking-tighter leading-none mb-4 uppercase">VietEdu<br/><span className="text-blue-500">Smart</span></h1>
              <p className="text-lg font-bold text-slate-400 mb-12 uppercase italic tracking-widest">Lab Số 4.0 - Hệ sinh thái thông minh</p>
            </div>
          </div>
          <div className="flex-1 p-16 flex flex-col justify-center bg-white overflow-y-auto no-scrollbar">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-12">
                 <h2 className="text-4xl font-black text-[#061631] tracking-tighter uppercase italic leading-none mb-3">Đăng nhập</h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">CHÀO MỪNG QUÝ THẦY CÔ</p>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl my-8 border border-slate-200">
                {(['ADMIN', 'TEACHER', 'STUDENT'] as const).map(role => (
                  <button key={role} onClick={() => { setSelectedTab(role); setError(''); }} className={`flex-1 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedTab === role ? 'bg-white text-blue-600 shadow-lg scale-[1.05] italic' : 'text-slate-400 hover:text-slate-600'}`}>
                    {role === 'ADMIN' ? 'QUẢN TRỊ' : role === 'TEACHER' ? 'GIÁO VIÊN' : 'HỌC SINH'}
                  </button>
                ))}
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <input type="text" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} placeholder="Tên đăng nhập" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl px-8 py-5 text-sm font-black italic outline-none transition-all" />
                <input type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} placeholder="Mật khẩu" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl px-8 py-5 text-sm font-black italic outline-none transition-all" />
                {error && <p className="text-[10px] font-black text-rose-500 uppercase italic px-5 bg-rose-50 py-4 rounded-xl border border-rose-100 animate-bounce">{error}</p>}
                <button type="submit" className="w-full bg-[#061631] text-white font-black py-6 rounded-2xl text-[14px] uppercase tracking-[0.2em] italic shadow-2xl border-b-8 border-black active:scale-95 transition-all mt-4">VÀO HỆ THỐNG</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      <VietEduSidebar currentPath={currentPath} onNavigate={setCurrentPath} onLogout={handleLogout} userRole={userRole} />
      <main id="vietedu-main" className="flex-1 overflow-hidden relative">
        <div className="h-full w-full">
          {renderContent()}
        </div>
        
        {/* Zalo Pro Assistant */}
        <VietEduChat />

        {/* Upgrade Pro Modal - Bảng giá chuyên nghiệp */}
        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-[2000] bg-[#061631]/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-in fade-in duration-500">
             <div className="bg-white/5 border border-white/20 w-full max-w-6xl rounded-[4rem] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col relative">
                <button onClick={() => setIsUpgradeModalOpen(false)} className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-all z-50 shadow-2xl"><i className="fas fa-times text-2xl"></i></button>
                
                <div className="p-16 text-center shrink-0">
                   <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">NÂNG CẤP <span className="text-blue-500">VIETEDU PRO</span></h2>
                   <p className="text-blue-400 text-sm font-black uppercase tracking-[0.8em] italic opacity-60">MỞ KHÓA TOÀN BỘ SỨC MẠNH AI LAB SỐ 4.0</p>
                </div>

                <div className="flex-1 px-16 pb-20 grid grid-cols-3 gap-10">
                   {/* Plan Basic */}
                   <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col hover:bg-white/10 transition-all group">
                      <div className="mb-10">
                         <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest block mb-4">GÓI TRẢI NGHIỆM</span>
                         <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">CƠ BẢN</h3>
                         <div className="mt-6 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white italic">0đ</span>
                            <span className="text-slate-400 font-bold uppercase text-[10px]">/vĩnh viễn</span>
                         </div>
                      </div>
                      <div className="flex-1 space-y-5 mb-12">
                         <div className="flex items-center gap-4 text-white/60 text-[12px] font-bold italic"><i className="fas fa-check text-emerald-500"></i> Soạn giáo án 5512 (Giới hạn)</div>
                         <div className="flex items-center gap-4 text-white/60 text-[12px] font-bold italic"><i className="fas fa-check text-emerald-500"></i> Quản lý hồ sơ lớp học</div>
                         <div className="flex items-center gap-4 text-white/20 text-[12px] font-bold italic line-through"><i className="fas fa-lock opacity-50"></i> Trợ lý AI nhận xét điểm</div>
                         <div className="flex items-center gap-4 text-white/20 text-[12px] font-bold italic line-through"><i className="fas fa-lock opacity-50"></i> Báo cáo chuyên môn PRO</div>
                      </div>
                      <button className="w-full py-5 rounded-2xl border-2 border-white/20 text-white font-black uppercase italic text-[11px] tracking-widest hover:bg-white/10 transition-all">ĐANG SỬ DỤNG</button>
                   </div>

                   {/* Plan Teacher PRO - Recommended */}
                   <div className="bg-blue-600 rounded-[3rem] p-12 flex flex-col shadow-3xl transform scale-105 relative border-b-8 border-blue-900">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase italic tracking-widest shadow-2xl border-2 border-white">PHỔ BIẾN NHẤT</div>
                      <div className="mb-10">
                         <span className="text-[10px] font-black text-blue-200 uppercase italic tracking-widest block mb-4">GÓI SƯ PHẠM</span>
                         <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">GIÁO VIÊN PRO</h3>
                         <div className="mt-6 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white italic">199k</span>
                            <span className="text-blue-200 font-bold uppercase text-[10px]">/tháng</span>
                         </div>
                      </div>
                      <div className="flex-1 space-y-5 mb-12">
                         <div className="flex items-center gap-4 text-white text-[12px] font-black italic"><i className="fas fa-check-circle text-white"></i> KHÔNG GIỚI HẠN Soạn AI</div>
                         <div className="flex items-center gap-4 text-white text-[12px] font-black italic"><i className="fas fa-check-circle text-white"></i> Trợ lý nhận xét AI toàn lớp</div>
                         <div className="flex items-center gap-4 text-white text-[12px] font-black italic"><i className="fas fa-check-circle text-white"></i> Full Kho học liệu Lab Số</div>
                         <div className="flex items-center gap-4 text-white text-[12px] font-black italic"><i className="fas fa-check-circle text-white"></i> Lưu trữ Video Bài giảng 1TB</div>
                      </div>
                      <button onClick={() => alert("Chuyển đến trang thanh toán...")} className="w-full py-6 bg-white text-blue-600 rounded-2xl font-black uppercase italic text-[12px] tracking-[0.2em] shadow-2xl active:scale-95 transition-all">NÂNG CẤP NGAY</button>
                   </div>

                   {/* Plan School PRO */}
                   <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col hover:bg-white/10 transition-all group">
                      <div className="mb-10">
                         <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest block mb-4">GÓI TỔ CHỨC</span>
                         <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">NHÀ TRƯỜNG PRO</h3>
                         <div className="mt-6 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white italic">LIÊN HỆ</span>
                         </div>
                      </div>
                      <div className="flex-1 space-y-5 mb-12">
                         <div className="flex items-center gap-4 text-white/80 text-[12px] font-bold italic"><i className="fas fa-check text-blue-400"></i> Quản trị tập trung 100% GV</div>
                         <div className="flex items-center gap-4 text-white/80 text-[12px] font-bold italic"><i className="fas fa-check text-blue-400"></i> Báo cáo tổng hợp tự động 100%</div>
                         <div className="flex items-center gap-4 text-white/80 text-[12px] font-bold italic"><i className="fas fa-check text-blue-400"></i> AI Zalo Assistant riêng biệt</div>
                         <div className="flex items-center gap-4 text-white/80 text-[12px] font-bold italic"><i className="fas fa-check text-blue-400"></i> Hỗ trợ 24/7 trực tiếp tại trường</div>
                      </div>
                      <button onClick={() => alert("Gửi yêu cầu báo giá cho trường...")} className="w-full py-5 rounded-2xl border-2 border-blue-500 text-blue-400 font-black uppercase italic text-[11px] tracking-widest hover:bg-blue-500 hover:text-white transition-all">NHẬN BÁO GIÁ</button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
