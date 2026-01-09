import React, { useState, useEffect, useRef } from 'react';
import { scanTimetableImage } from '../services/geminiService';

const Dashboard: React.FC<{onNavigate: (path: string) => void, onUpgrade: () => void, user: any}> = ({ onNavigate, onUpgrade, user }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(new Date().getDay() + 1);
  const [bannerImage, setBannerImage] = useState<string | null>(localStorage.getItem(`vietedu_banner_${user?.id || 'guest'}`));

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const jsDay = new Date().getDay();
    const vietDay = jsDay === 0 ? 8 : jsDay + 1;
    setCurrentDayOfWeek(vietDay);

    const userPrefix = user?.id || 'guest';
    try {
      const saved = localStorage.getItem(`vietedu_schedule_${userPrefix}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSchedule(Array.isArray(parsed) ? parsed : []);
      } else {
        setSchedule([
          { period: 1, subject: 'Toán học', isMorning: true, dayOfWeek: vietDay, class: '6.1' },
          { period: 2, subject: 'Toán học', isMorning: true, dayOfWeek: vietDay, class: '6.1' },
          { period: 4, subject: 'KHTN (Lý)', isMorning: false, dayOfWeek: vietDay, class: '9.2' }
        ]);
      }
    } catch (e) { console.error(e); }
  }, [user]);

  const handleScanTKB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        try {
          const res = await scanTimetableImage(base64);
          if (res && Array.isArray(res)) {
            const formatted = res.map((s: any) => ({
              ...s,
              // Strictly ensure primitive types to prevent React Error #31
              subject: String(s.subject || "Tiết trống"),
              class: String(s.class || "").replace('/', '.').replace('-', '.'),
              period: Number(s.period) || 1,
              dayOfWeek: Number(s.dayOfWeek) || 2,
              isMorning: Boolean(s.isMorning)
            }));
            setSchedule(formatted);
            localStorage.setItem(`vietedu_schedule_${user?.id || 'guest'}`, JSON.stringify(formatted));
            alert('AI đã đồng bộ dữ liệu TKB thành công!');
          }
        } catch (err) {
          alert('Lỗi kết nối AI.');
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'lesson-planner', label: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles', color: 'bg-[#5e5ce6]' },
    { id: 'videos', label: 'BÀI GIẢNG SỐ', icon: 'fa-desktop', color: 'bg-[#af52de]' },
    { id: 'game-center', label: 'GAME CENTER', icon: 'fa-gamepad', color: 'bg-[#ff375f]' },
    { id: 'grade-book', label: 'SỔ ĐIỂM SỐ', icon: 'fa-list-check', color: 'bg-[#30b0c7]' },
    { id: 'class-book', label: 'SỔ CHỦ NHIỆM', icon: 'fa-user-graduate', color: 'bg-[#f08a00]' },
    { id: 'rubrics', label: 'BỘ RUBRICS', icon: 'fa-star', color: 'bg-[#12b76a]' },
    { id: 'school-admin', label: 'QUẢN TRỊ TRƯỜNG', icon: 'fa-building-shield', color: 'bg-[#566376]' },
    { id: 'intro', label: 'GIỚI THIỆU', icon: 'fa-circle-info', color: 'bg-[#2b65eb]' },
  ];

  const todaySchedule = Array.isArray(schedule) 
    ? schedule.filter(s => Number(s.dayOfWeek) === currentDayOfWeek)
    : [];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f1f5f9] font-sans">
      <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              const base64 = ev.target?.result as string;
              setBannerImage(base64);
              localStorage.setItem(`vietedu_banner_${user?.id || 'guest'}`, base64);
            };
            reader.readAsDataURL(file);
          }
      }} />
      <input type="file" ref={scanInputRef} className="hidden" accept="image/*" onChange={handleScanTKB} />
      
      <div className="relative mx-4 mt-4 bg-[#061631] py-10 flex items-center px-10 shadow-xl rounded-xl shrink-0 overflow-hidden">
        <div className="flex-1 flex items-center gap-10">
          <div onClick={() => bannerInputRef.current?.click()} className="w-[160px] aspect-[16/9] bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all rounded-xl overflow-hidden border border-white/10 shadow-2xl">
             {bannerImage ? <img src={bannerImage} className="w-full h-full object-cover" alt="Banner" /> : <div className="text-white/20 text-[9px] font-black uppercase text-center italic tracking-widest leading-none">ẢNH TRƯỜNG</div>}
          </div>
          <div>
            <h1 className="text-5xl font-black italic uppercase leading-none tracking-tight mb-3 gold-gradient-text">Chào mừng thầy cô !</h1>
            <div className="flex flex-col items-start border-l-4 border-blue-600 pl-6">
               <p className="text-[12px] font-black text-blue-400 uppercase italic tracking-widest opacity-80">VietEdu Smart - Phòng Lab Số 4.0</p>
               <p className="text-[9px] font-black text-white/40 uppercase italic tracking-[0.3em] mt-1">Hệ sinh thái sư phạm AI thế hệ mới</p>
            </div>
          </div>
        </div>
        <button onClick={onUpgrade} className="bg-amber-600 text-white px-10 py-5 rounded-xl text-[11px] font-black uppercase italic shadow-lg active:translate-y-1 transition-all border-b-4 border-amber-900">NÂNG CẤP PRO</button>
      </div>

      <div className="px-4 mt-6 grid grid-cols-4 md:grid-cols-8 gap-4 shrink-0">
         {navItems.map(item => (
           <button key={item.id} onClick={() => onNavigate(item.id)} className={`${item.color} text-white rounded-xl p-4 h-[100px] flex flex-col items-center justify-center gap-2 shadow-xl hover:-translate-y-1 transition-all border-b-4 border-black/20 group`}>
              <i className={`fa-solid ${item.icon} text-2xl group-hover:scale-110 transition-transform`}></i>
              <span className="text-[9px] font-black uppercase italic leading-none text-center tracking-tight">{item.label}</span>
           </button>
         ))}
      </div>

      <div className="px-4 mt-6 grid grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden pb-6">
        <div className="col-span-12 lg:col-span-4 flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xl">
           <div className="p-5 bg-slate-50 border-b flex justify-between items-center shrink-0">
              <span className="text-[11px] font-black uppercase italic tracking-widest text-[#061631]">LỊCH DẠY & CÔNG TÁC</span>
              <button 
                onClick={() => scanInputRef.current?.click()}
                disabled={isScanning}
                className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase italic shadow-lg flex items-center gap-2 transition-all ${isScanning ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white active:scale-95'}`}
              >
                {isScanning ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-camera"></i>}
                {isScanning ? 'ĐANG ĐỒNG BỘ...' : 'ĐỒNG BỘ TKB'}
              </button>
           </div>
           <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4 bg-slate-50/30">
              {todaySchedule.length > 0 ? todaySchedule.sort((a,b) => {
                const aM = a.isMorning ? 0 : 1;
                const bM = b.isMorning ? 0 : 1;
                return aM === bM ? (Number(a.period) - Number(b.period)) : (aM - bM);
              }).map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm hover:border-blue-400 transition-all group">
                   <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center font-black italic ${item.isMorning ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      <span className="text-[8px] leading-none">{item.isMorning ? 'SÁNG' : 'CHIỀU'}</span>
                      <span className="text-lg leading-none mt-1">T{String(item.period)}</span>
                   </div>
                   <div className="flex-1">
                      <h4 className="text-[13px] font-black text-slate-800 uppercase italic leading-none">{String(item.subject)}</h4>
                      <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">Lớp: {String(item.class)}</p>
                   </div>
                   <i className="fas fa-chevron-right text-slate-200 group-hover:text-blue-500 transition-colors"></i>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
                   <i className="fas fa-calendar-day text-6xl mb-4"></i>
                   <p className="text-[10px] font-black uppercase italic tracking-widest">Hôm nay trống lịch dạy</p>
                </div>
              )}
           </div>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xl relative">
           <div className="p-5 border-b bg-slate-50 shrink-0 flex justify-between items-center">
              <span className="text-[11px] font-black uppercase italic tracking-widest text-[#061631]">TRÌNH CHIẾU LAB SỐ 4.0</span>
              <button onClick={() => onNavigate('lesson-planner')} className="bg-[#061631] text-blue-400 px-8 py-3 rounded-xl text-[10px] font-black uppercase border-b-4 border-black italic shadow-2xl">MỞ TÀI LIỆU AI</button>
           </div>
           <div className="flex-1 w-full h-full flex items-center justify-center p-10 bg-slate-100/50 relative overflow-hidden italic text-center">
              <div className="opacity-10 group">
                <i className="fa-solid fa-desktop text-[120px] mb-8 group-hover:scale-110 transition-transform duration-1000"></i>
                <p className="text-xl font-black uppercase tracking-[0.5em] italic leading-relaxed">SẴN SÀNG GIẢNG DẠY</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;