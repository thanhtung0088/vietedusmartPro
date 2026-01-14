import React, { useState, useEffect } from 'react';

const Dashboard: React.FC<any> = ({ onNavigate }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [notes, setNotes] = useState(() => localStorage.getItem('weekNotes') || "");
  const [timetable, setTimetable] = useState<any[]>(() => {
    const saved = localStorage.getItem('fullTimetable');
    return saved ? JSON.parse(saved) : [];
  });

  const [tempData, setTempData] = useState<any[]>([]);

  useEffect(() => {
    if (showConfig) setTempData([...timetable]);
  }, [showConfig]);

  const handleInputChange = (day: string, ca: string, tiet: number, value: string) => {
    const newData = [...tempData];
    const index = newData.findIndex(i => i.thu === day && i.ca === ca && i.tiet === tiet);
    if (index > -1) newData[index] = { ...newData[index], info: value };
    else newData.push({ thu: day, ca: ca, tiet: tiet, info: value });
    setTempData(newData);
  };

  const saveTimetable = () => {
    const finalData = tempData.filter(i => i.info && i.info.trim() !== "");
    setTimetable(finalData);
    localStorage.setItem('fullTimetable', JSON.stringify(finalData));
    setShowConfig(false);
  };

  if (showConfig) {
    return (
      <div className="min-h-screen bg-[#0f172a] p-4 text-white font-sans overflow-auto">
        <div className="w-[98%] mx-auto space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 sticky top-0 bg-[#0f172a] z-50">
            <h2 className="text-xl font-black italic text-yellow-400 uppercase">THIẾT LẬP THỜI KHÓA BIỂU</h2>
            <div className="flex gap-3">
              <button onClick={() => setShowConfig(false)} className="bg-slate-700 px-6 py-2 rounded-xl font-bold uppercase text-xs">HỦY</button>
              <button onClick={saveTimetable} className="bg-blue-600 px-8 py-2 rounded-xl font-black uppercase text-xs shadow-lg">LƯU TẤT CẢ</button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'].map(day => (
              <div key={day} className="bg-[#1e293b] p-3 rounded-2xl border border-white/5 space-y-4 shadow-xl">
                <h4 className="text-center font-black text-blue-400 uppercase text-[12px] bg-slate-900/50 py-2 rounded-lg">{day}</h4>
                <div className="space-y-2">
                  <p className="text-[9px] font-bold text-yellow-500/50 text-center italic uppercase">-- Ca Sáng --</p>
                  {[1, 2, 3, 4, 5].map(t => (
                    <input key={`s-${t}`} type="text" placeholder={`Tiết ${t}`} className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-2 py-2 text-[11px] font-bold text-white outline-none" value={tempData.find(i => i.thu === day && i.ca === 'Sáng' && i.tiet === t)?.info || ""} onChange={(e) => handleInputChange(day, 'Sáng', t, e.target.value)} />
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <p className="text-[9px] font-bold text-purple-400/50 text-center italic uppercase">-- Ca Chiều --</p>
                  {[1, 2, 3, 4, 5].map(t => (
                    <input key={`c-${t}`} type="text" placeholder={`Tiết ${t}`} className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-2 py-2 text-[11px] font-bold text-white outline-none" value={tempData.find(i => i.thu === day && i.ca === 'Chiều' && i.tiet === t)?.info || ""} onChange={(e) => handleInputChange(day, 'Chiều', t, e.target.value)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderSlot = (ca: string, p: number) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = days[new Date().getDay()];
    const slot = timetable.find(s => s.thu === today && s.ca === ca && Number(s.tiet) === p);
    if (!slot) return null;
    const [mon, lop] = slot.info.split('-').map((s: string) => s.trim());
    return (
      <div className="h-[50px] mb-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 border border-blue-400/50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-white/40">T{p}</span>
          <span className="text-white font-black text-[13px] uppercase tracking-tight">{mon}</span>
        </div>
        {lop && <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-md text-[10px] font-black italic">LỚP {lop}</span>}
      </div>
    );
  };

  return (
    <div className="w-[98%] mx-auto h-[97vh] flex flex-col py-2 space-y-3 font-sans text-white overflow-hidden">
      {/* BANNER */}
      <div className="bg-[#0f172a] rounded-[2rem] p-5 flex items-center justify-between shadow-2xl border border-white/5 shrink-0">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-inner">
             <i className="fa-solid fa-graduation-cap text-3xl text-yellow-400"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">CHÀO MỪNG QUÝ THẦY CÔ !</h1>
            <p className="text-blue-400 font-bold italic text-[9px] mt-1 uppercase tracking-[0.2em] opacity-80">VIETEDU SMART SYSTEM</p>
          </div>
        </div>
        <button className="bg-[#ef4444] text-white px-8 py-3 rounded-2xl font-black italic text-[10px] uppercase shadow-[0_4px_0_0_#991b1b] active:shadow-none active:translate-y-1 transition-all">VÀO PHÒNG HỌP ONLINE</button>
      </div>

      {/* 9 THẺ MENU */}
      <div className="grid grid-cols-9 gap-3 shrink-0">
        {[
          { label: 'SOẠN BÀI AI', color: 'bg-[#818cf8]', icon: 'fa-wand-magic-sparkles' },
          { label: 'BÀI GIẢNG SỐ', color: 'bg-[#a855f7]', icon: 'fa-display' },
          { label: 'GAME CENTER', color: 'bg-[#f43f5e]', icon: 'fa-gamepad' },
          { label: 'SỐ ĐIỂM SỐ', color: 'bg-[#22d3ee]', icon: 'fa-list-check' },
          { label: 'SỐ CHỦ NHIỆM', color: 'bg-[#fbbf24]', icon: 'fa-user-graduate' },
          { label: 'HỌC LIỆU MỞ', color: 'bg-[#10b981]', icon: 'fa-book-open' },
          { label: 'VIDEO GIẢNG', color: 'bg-[#f87171]', icon: 'fa-circle-play' },
          { label: 'QUẢN TRỊ', color: 'bg-[#64748b]', icon: 'fa-gears' },
          { label: 'GIỚI THIỆU', color: 'bg-[#475569]', icon: 'fa-circle-info' },
        ].map((item, idx) => (
          <button key={idx} onClick={() => onNavigate(item.label)} className={`${item.color} h-[85px] rounded-[1.8rem] shadow-xl flex flex-col items-center justify-center border-b-4 border-black/20 hover:brightness-110 active:scale-95 transition-all`}>
            <i className={`fa-solid ${item.icon} text-2xl text-white mb-1`}></i>
            <span className="font-black italic text-[8.5px] uppercase text-white px-2 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* 3 CỘT CÂN XỨNG */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* CỘT 1: LỊCH DẠY */}
        <div className="col-span-3 bg-[#1e293b] rounded-[2.5rem] p-5 shadow-2xl flex flex-col border border-white/5">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-white font-black italic uppercase text-[11px] border-l-4 border-blue-500 pl-4">Lịch dạy hôm nay</h3>
            <button onClick={() => setShowConfig(true)} className="bg-[#3b82f6] text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase italic shadow-lg">CẬP NHẬT</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <p className="text-[9px] font-black text-blue-400/60 mb-3 italic uppercase text-center tracking-widest">-- Ca Sáng --</p>
            {[1, 2, 3, 4, 5].map(p => renderSlot('Sáng', p))}
            <p className="text-[9px] font-black text-purple-400/60 mt-4 mb-3 italic uppercase text-center tracking-widest">-- Ca Chiều --</p>
            {[1, 2, 3, 4, 5].map(p => renderSlot('Chiều', p))}
          </div>
        </div>

        {/* CỘT 2: TRÌNH CHIẾU PDF */}
        <div className="col-span-6 bg-[#1e293b] rounded-[2.5rem] p-3 shadow-2xl flex flex-col border border-white/5 relative">
           <iframe src={localStorage.getItem('savedPdf') || ""} className="w-full h-full rounded-[1.8rem] bg-slate-950 border-none shadow-inner" />
        </div>

        {/* CỘT 3: NHẮC VIỆC TRONG TUẦN */}
        <div className="col-span-3 bg-[#1e293b] rounded-[2.5rem] p-6 shadow-2xl flex flex-col border border-white/5">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></div>
            <h3 className="text-white font-black italic uppercase text-[11px]">Nhắc việc trong tuần</h3>
          </div>
          <textarea 
            className="flex-1 w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4 text-[12px] font-medium text-slate-300 focus:outline-none focus:border-yellow-500/30 resize-none leading-relaxed"
            placeholder="Ghi chú nhắc việc tại đây..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              localStorage.setItem('weekNotes', e.target.value);
            }}
          />
          <div className="mt-3 text-[8px] text-slate-500 italic font-bold text-right uppercase tracking-widest opacity-40 italic">Auto-Sync Active</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
