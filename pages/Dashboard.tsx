import React, { useState, useEffect } from 'react';
import { scanTimetableImage } from '../services/geminiService';

interface DashboardProps {
  onNavigate: (path: string) => void;
  onOpenShare: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [ppctData, setPpctData] = useState<any>({});
  const [isScanning, setIsScanning] = useState(false);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(new Date().getDay() + 1);
  const [sessionFilter, setSessionFilter] = useState<'all' | 'morning' | 'afternoon'>('all');

  useEffect(() => {
    const jsDay = new Date().getDay();
    const vietDay = jsDay === 0 ? 8 : jsDay + 1;
    setCurrentDayOfWeek(vietDay);

    const savedSched = localStorage.getItem('vietedu_schedule');
    if (savedSched) setSchedule(JSON.parse(savedSched));

    const savedPpct = localStorage.getItem('vietedu_ppct_mapping');
    if (savedPpct) {
      setPpctData(JSON.parse(savedPpct));
    } else {
      const dummyPpct = {
        'GDCD': 'Bài 5: Tự lập và trách nhiệm',
        'GDĐP': 'Chủ đề 2: Văn hóa địa phương trong kỷ nguyên số',
        'Toán học': 'Tiết 45: Luyện tập chung về số thập phân',
        'Ngữ văn': 'Tiết 32: Viết bài văn biểu cảm về sự việc'
      };
      setPpctData(dummyPpct);
    }
  }, []);

  const handleScanTKB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        try {
          const res = await scanTimetableImage(base64);
          setSchedule(res);
          localStorage.setItem('vietedu_schedule', JSON.stringify(res));
        } catch (err) {
          alert("Lỗi quét TKB. Thầy hãy thử chụp ảnh rõ nét hơn.");
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const menuTools = [
    { id: 'lesson-planner', label: 'SOẠN BÀI AI', icon: 'fa-wand-magic-sparkles', color: 'from-blue-600 to-blue-800' },
    { id: 'grade-book', label: 'SỔ ĐIỂM SỐ', icon: 'fa-table-list', color: 'from-indigo-600 to-indigo-800' },
    { id: 'class-book', label: 'CHỦ NHIỆM', icon: 'fa-book-open-reader', color: 'from-emerald-600 to-emerald-800' },
    { id: 'school-admin', label: 'QUẢN TRỊ', icon: 'fa-shield-halved', color: 'from-amber-600 to-orange-700' },
    { id: 'game-center', label: 'GAME HỌC TẬP', icon: 'fa-gamepad', color: 'from-rose-600 to-rose-800' },
  ];

  const renderScheduleList = (isMorning: boolean) => {
    const periods = [1, 2, 3, 4, 5];
    return periods.map(p => {
      const entry = schedule.find(s => s.dayOfWeek === currentDayOfWeek && s.period === p && s.isMorning === isMorning);
      return (
        <div key={`${isMorning ? 'am' : 'pm'}-${p}`} className={`flex items-center gap-2 p-2 rounded-xl border border-slate-100 transition-all mb-1 ${entry ? 'bg-blue-50/40 shadow-sm border-blue-100' : 'bg-white opacity-30'}`}>
          <span className="text-[9px] font-black text-blue-600 italic w-6 text-center">T{p}</span>
          <div className="flex-1">
            <p className={`text-[9px] font-black uppercase italic truncate ${entry ? 'text-slate-800' : 'text-slate-200'}`}>{entry ? entry.subject : 'Trống'}</p>
          </div>
          {entry?.class && <span className="text-[7px] font-black bg-[#061631] text-blue-400 px-1.5 py-0.5 rounded-md italic">{entry.class}</span>}
        </div>
      );
    });
  };

  const getTodayLessons = () => {
    const activeLessons = schedule.filter(s => s.dayOfWeek === currentDayOfWeek && s.subject);
    return activeLessons.sort((a, b) => (a.isMorning === b.isMorning ? a.period - b.period : (a.isMorning ? -1 : 1))).map(l => ({
      ...l,
      lessonName: ppctData[l.subject] || `Tên bài giảng môn ${l.subject}`
    }));
  };

  const getDayLabel = (d: number) => {
    if (d === 8) return "Chủ Nhật";
    return `Thứ ${d}`;
  };

  return (
    <div className="max-w-[1580px] mx-auto flex flex-col h-[calc(100vh-48px)] overflow-hidden animate-in fade-in duration-700">
      <div className="relative overflow-hidden rounded-[2rem] glass-3d-dark h-[85px] flex items-center px-8 mb-4 shrink-0 shadow-3d-extreme border border-white/10">
        <div className="relative z-10">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 drop-shadow-sm">
            CHÀO THẦY TÙNG!
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-[8px] font-black text-amber-500/80 uppercase tracking-[0.3em] italic">Lab Số 4.0 - Active Sessions</p>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-xl px-6 py-2 rounded-2xl border border-white/10 text-right">
          <p className="text-[7px] font-black opacity-40 uppercase tracking-widest italic text-white">{getDayLabel(currentDayOfWeek)}</p>
          <p className="text-lg font-black italic text-white">{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4 shrink-0">
        {menuTools.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)} className={`bg-gradient-to-br ${item.color} p-3 rounded-2xl shadow-3d-extreme cursor-pointer h-[75px] flex flex-col justify-between text-white border border-white/20 transition-all hover:-translate-y-1 active:scale-95 text-left relative overflow-hidden group`}>
            <h3 className="text-[8px] font-black uppercase italic tracking-widest leading-none relative z-10">{item.label}</h3>
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md relative z-10"><i className={`fas ${item.icon} text-[10px]`}></i></div>
            <i className={`fas ${item.icon} absolute -right-3 -bottom-3 text-4xl opacity-10 group-hover:scale-125 transition-transform`}></i>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0 mb-2">
        <div className="col-span-3 flex flex-col h-full bg-white rounded-[2rem] shadow-3d-extreme border border-slate-200 overflow-hidden group">
          <div className="p-4 bg-slate-50 border-b flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#061631] text-blue-400 rounded-lg flex items-center justify-center shadow-lg"><i className="fas fa-calendar-day text-[9px]"></i></div>
                <span className="text-[8px] font-black text-slate-800 uppercase italic tracking-widest">LỊCH DẠY {getDayLabel(currentDayOfWeek)}</span>
              </div>
              <label className="bg-[#061631] text-blue-400 px-2 py-1 rounded-lg text-[7px] font-black uppercase cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                <input type="file" className="hidden" accept="image/*" onChange={handleScanTKB} />
                <i className="fas fa-camera mr-1"></i> QUÉT
              </label>
            </div>
            <div className="flex bg-slate-200 p-0.5 rounded-lg border border-slate-300">
              {[{ id: 'all', label: 'CẢ NGÀY' }, { id: 'morning', label: 'SÁNG' }, { id: 'afternoon', label: 'CHIỀU' }].map(btn => (
                <button key={btn.id} onClick={() => setSessionFilter(btn.id as any)} className={`flex-1 py-1 rounded-md text-[7px] font-black uppercase italic transition-all ${sessionFilter === btn.id ? 'bg-[#061631] text-white shadow-sm' : 'text-slate-400'}`}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
            {(sessionFilter === 'all' || sessionFilter === 'morning') && (
              <div>
                <h4 className="text-[7px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2 italic flex items-center gap-1">
                  <i className="fas fa-sun"></i> CA SÁNG
                </h4>
                {renderScheduleList(true)}
              </div>
            )}
            {(sessionFilter === 'all' || sessionFilter === 'afternoon') && (
              <div className={sessionFilter === 'afternoon' ? '' : 'pt-1'}>
                <h4 className="text-[7px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-2 italic flex items-center gap-1">
                  <i className="fas fa-moon"></i> CA CHIỀU
                </h4>
                {renderScheduleList(false)}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-9 flex flex-col h-full bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-3d-extreme border border-white/10 overflow-hidden relative">
          <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">BÀI DẠY <span className="text-blue-400">HÔM NAY</span></h2>
              <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.3em] italic mt-1">Dữ liệu tự động đồng bộ Lab Số 4.0</p>
            </div>
            <div className="flex gap-3">
              <select value={currentDayOfWeek} onChange={(e) => setCurrentDayOfWeek(parseInt(e.target.value))} className="bg-white/5 text-white text-[9px] font-black uppercase italic rounded-xl px-3 border border-white/10 outline-none">
                <option value="2">Thứ Hai</option>
                <option value="3">Thứ Ba</option>
                <option value="4">Thứ Tư</option>
                <option value="5">Thứ Năm</option>
                <option value="6">Thứ Sáu</option>
                <option value="7">Thứ Bảy</option>
              </select>
              <button onClick={() => onNavigate('pro-plan')} className="bg-white/5 text-white/60 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-[8px] font-black uppercase italic border border-white/5">
                <i className="fas fa-list-check mr-1"></i> PPCT
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            <div className="grid grid-cols-1 gap-3">
              {getTodayLessons().length > 0 ? getTodayLessons().map((lesson, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-[1.8rem] p-4 flex items-center gap-4 group/item hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex flex-col items-center justify-center shrink-0 border border-blue-500/20 shadow-inner">
                    <span className="text-[6px] font-black uppercase leading-none mb-0.5">{lesson.isMorning ? 'SÁNG' : 'CHIỀU'}</span>
                    <span className="text-xl font-black italic leading-none">T{lesson.period}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-[7px] font-black text-white uppercase italic">{lesson.subject}</span>
                      <span className="text-[8px] font-black text-white/40 uppercase italic truncate">LỚP {lesson.class}</span>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase italic truncate leading-tight">{lesson.lessonName}</h4>
                  </div>
                  <button onClick={() => onNavigate('lesson-planner')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase italic transition-all hover:scale-105 shadow-lg shadow-indigo-900/20">
                    SOẠN GIÁO ÁN
                  </button>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center py-10 opacity-20">
                  <i className="fas fa-book-open text-6xl mb-4 text-white"></i>
                  <p className="text-white text-[9px] font-black uppercase tracking-[0.4em]">Trống lịch dạy</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-black/30 border-t border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
              <p className="text-[7px] font-black text-white/40 uppercase tracking-widest italic">Hệ thống AI đang giám sát lộ trình dạy học</p>
            </div>
            <button className="text-[7px] font-black text-blue-400/70 uppercase italic tracking-widest hover:text-blue-400 transition-all">CHI TIẾT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;