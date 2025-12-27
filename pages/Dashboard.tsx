import React, { useState, useEffect } from 'react';

const Dashboard: React.FC<{onNavigate: (path: string), onOpenShare: () => void}> = ({ onNavigate }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('vietedu_quick_note');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem('vietedu_quick_note', e.target.value);
  };

  const teachingTools = [
    { id: 'lesson-planner', label: 'SOẠN GIÁO ÁN AI', icon: 'fa-wand-magic-sparkles', bg: 'bg-[#3b4cc4]' },
    { id: 'videos', label: 'BÀI GIẢNG ĐIỆN TỬ', icon: 'fa-desktop', bg: 'bg-[#8c3fc2]' },
    { id: 'game-center', label: 'GAME CENTER', icon: 'fa-gamepad', bg: 'bg-[#d11f42]' },
  ];

  const managementTools = [
    { id: 'grade-book', label: 'SỔ ĐIỂM THCS', icon: 'fa-table-list', bg: 'bg-[#009688]' },
    { id: 'class-book', label: 'SỔ CHỦ NHIỆM', icon: 'fa-book-open-reader', bg: 'bg-[#ff9800]' },
    { id: 'rubrics', label: 'BỘ RUBRICS', icon: 'fa-star-half-stroke', bg: 'bg-[#4caf50]' },
    { id: 'pro-plan', label: 'KH CHUYÊN MÔN', icon: 'fa-briefcase', bg: 'bg-[#3f51b5]' },
    { id: 'resources', label: 'KHO HỌC LIỆU', icon: 'fa-layer-group', bg: 'bg-[#607d8b]' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-4 animate-in fade-in duration-500 flex flex-col h-[calc(100vh-2rem)] overflow-hidden">
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl mb-6 bg-[#061631] h-[200px] flex items-center p-10 border-b-4 border-blue-900 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#061631] via-[#0a192f] to-transparent z-0"></div>
        <div className="relative z-10 flex-1">
          <div className="inline-block bg-[#ffc107] px-3 py-0.5 rounded-lg mb-3 shadow-lg"><span className="text-[8px] font-black text-slate-900 uppercase tracking-widest">VIETEDU SMART V16.4</span></div>
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-tight text-white">CHÀO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9800] to-[#ff5722] drop-shadow-[0_2px_10px_rgba(255,152,0,0.5)]">THẦY TÙNG!</span></h1>
          <p className="text-xs font-bold text-slate-400 uppercase italic tracking-[0.2em] mt-2">KIẾN TẠO TƯƠNG LAI GIÁO DỤC SỐ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 shrink-0">
        <div className="lg:col-span-5">
           <div className="flex items-center gap-2 mb-3 px-2"><i className="fas fa-wand-magic-sparkles text-blue-500 text-[10px]"></i><h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic">GIẢNG DẠY</h2></div>
           <div className="grid grid-cols-3 gap-3">
              {teachingTools.map(item => (
                <div key={item.id} onClick={() => onNavigate(item.id)} className={`${item.bg} p-4 rounded-3xl shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-[100px] flex flex-col justify-center items-center text-center`}>
                   <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white text-sm mb-2 backdrop-blur-md"><i className={`fas ${item.icon}`}></i></div>
                   <h3 className="text-[9px] font-black text-white uppercase italic tracking-tighter leading-none">{item.label}</h3>
                </div>
              ))}
           </div>
        </div>
        <div className="lg:col-span-7">
           <div className="flex items-center gap-2 mb-3 px-2"><i className="fas fa-folder-open text-blue-500 text-[10px]"></i><h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic">QUẢN LÝ CHUYÊN MÔN</h2></div>
           <div className="grid grid-cols-5 gap-3">
              {managementTools.map(item => (
                <div key={item.id} onClick={() => onNavigate(item.id)} className={`${item.bg} p-4 rounded-3xl shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-[100px] flex flex-col justify-center items-center text-center`}>
                   <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white text-sm mb-2 backdrop-blur-md"><i className={`fas ${item.icon}`}></i></div>
                   <h3 className="text-[8px] font-black text-white uppercase italic tracking-tighter leading-none">{item.label}</h3>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-8 flex flex-col">
           <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2"><i className="fas fa-calendar-day text-blue-500 text-[10px]"></i><h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic">LỊCH DẠY HÔM NAY</h2></div>
              <button onClick={() => onNavigate('schedule')} className="text-[8px] font-black text-blue-600 uppercase italic hover:underline">Xem chi tiết</button>
           </div>
           <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm flex-1 overflow-hidden flex flex-col">
              <div className="p-4 bg-slate-50/50 border-b flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest italic"><span>Tiết học</span><span>Nội dung bài dạy</span><span>Lớp</span></div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 {[1, 2, 3, 4, 5].map(p => (
                   <div key={p} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-4">
                         <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black italic text-[10px]">0{p}</span>
                         <span className="text-[11px] font-bold text-slate-700 uppercase italic">Chưa cập nhật nội dung tiết dạy</span>
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase italic">--</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
        <div className="lg:col-span-4 flex flex-col">
           <div className="flex items-center gap-2 mb-3 px-2"><i className="fas fa-edit text-blue-500 text-[10px]"></i><h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic">GHI CHÚ NHANH</h2></div>
           <div className="bg-[#fff9c4] rounded-[2rem] shadow-sm flex-1 p-6 relative flex flex-col border border-yellow-200/50">
              <textarea value={note} onChange={handleNoteChange} placeholder="Nhập việc cần làm ngay vào đây..." className="bg-transparent w-full h-full border-none outline-none resize-none text-xs font-bold text-yellow-900 placeholder-yellow-800/30 italic leading-relaxed" />
              <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none"><i className="fas fa-pencil text-6xl text-yellow-900"></i></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;