
import React, { useState, useEffect } from 'react';
import ZoomMeeting from './ZoomMeeting';

interface Student {
  id: number;
  name: string;
  gender: string;
  status: string;
  phone: string;
  score: number;
}

const ClassBook: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'students' | 'seating' | 'discipline' | 'plans'>('students');
  const [seatingData, setSeatingData] = useState<Record<number, string>>({});
  const [showZoom, setShowZoom] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [disciplineLog, setDisciplineLog] = useState<{name: string, type: 'plus' | 'minus', desc: string, time: string}[]>([]);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelPasteData, setExcelPasteData] = useState('');

  useEffect(() => {
    try {
      const savedS = localStorage.getItem('vietedu_cb_seating_v4');
      if (savedS) setSeatingData(JSON.parse(savedS));

      const savedStudents = localStorage.getItem('vietedu_cb_students_final');
      if (savedStudents) setStudents(JSON.parse(savedStudents));
    } catch(e) { console.error(e); }
  }, []);

  const saveStudents = (list: Student[]) => {
    setStudents(list);
    localStorage.setItem('vietedu_cb_students_final', JSON.stringify(list));
  };

  const handleImportExcel = () => {
    const rows = excelPasteData.trim().split('\n');
    const newStudents: Student[] = rows.map((row, i) => {
      const cols = row.split('\t');
      return { id: Date.now() + i, name: cols[1] || 'Học sinh mới', gender: cols[2] || 'Nam', status: 'Đang học', phone: cols[3] || '', score: 100 };
    });
    saveStudents([...students, ...newStudents]);
    setIsExcelModalOpen(false);
    setExcelPasteData('');
  };

  const handleScore = (id: number, delta: number) => {
    const updated = students.map(s => {
      if (s.id === id) {
        const newScore = s.score + delta;
        const logEntry = {
          name: s.name,
          type: (delta > 0 ? 'plus' : 'minus') as 'plus' | 'minus',
          desc: delta > 0 ? `Tuyên dương tích cực (+${delta}đ)` : `Nhắc nhở vi phạm (${delta}đ)`,
          time: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})
        };
        setDisciplineLog(prev => [logEntry, ...prev].slice(0, 10));
        return { ...s, score: newScore };
      }
      return s;
    });
    saveStudents(updated);
  };

  const updateSeating = (pos: number, name: string) => {
    const newData = { ...seatingData, [pos]: name };
    setSeatingData(newData);
    localStorage.setItem('vietedu_cb_seating_v4', JSON.stringify(newData));
  };

  // Hàm trả về màu tĩnh để tránh bị Tailwind Purge trên Netlify
  const getSeatColor = (day: number) => {
    if (day === 1) return "from-blue-100 to-blue-50 border-blue-200 text-blue-800";
    if (day === 2) return "from-emerald-100 to-emerald-50 border-emerald-200 text-emerald-800";
    if (day === 3) return "from-amber-100 to-amber-50 border-amber-200 text-amber-800";
    return "from-purple-100 to-purple-50 border-purple-200 text-purple-800";
  };

  if (showZoom) return <ZoomMeeting onBack={() => setShowZoom(false)} />;

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-500 font-sans bg-[#f8fafc]">
      <div className="flex justify-between items-center mb-6 shrink-0 px-10 mt-8">
        <div>
          <button onClick={onBack} className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase italic mb-2 flex items-center gap-2 transition-all group">
            <i className="fas fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> DASHBOARD
          </button>
          <h1 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">QUẢN LÝ LỚP CHỦ NHIỆM</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setShowZoom(true)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase shadow-xl italic border-b-8 border-blue-900 active:scale-95 transition-all">
             <i className="fas fa-video mr-3 text-lg"></i> HỌP PHỤ HUYNH
          </button>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-xl border border-slate-200">
            {[
              { id: 'students', label: 'HỒ SƠ HS', icon: 'fa-user-graduate' },
              { id: 'seating', label: 'SƠ ĐỒ LỚP', icon: 'fa-table-cells' },
              { id: 'discipline', label: 'THI ĐUA', icon: 'fa-medal' },
              { id: 'plans', label: 'KẾ HOẠCH', icon: 'fa-calendar-check' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-3 rounded-xl text-[9px] font-black transition-all uppercase tracking-widest flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#061631] text-white shadow-lg italic' : 'text-slate-400 hover:bg-slate-50'}`}>
                <i className={`fas ${tab.icon}`}></i> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-[2rem] shadow-3d-extreme border border-slate-200 p-10 flex flex-col overflow-hidden mb-8 mx-10 relative">
        {activeTab === 'students' && (
          <div className="flex-1 flex flex-col animate-in fade-in h-full overflow-hidden">
             <div className="flex justify-between items-center mb-8 shrink-0">
                <h2 className="text-2xl font-black text-[#061631] uppercase italic tracking-tighter">DANH SÁCH HỌC SINH LỚP</h2>
                <div className="flex gap-4">
                   <button onClick={() => setIsExcelModalOpen(true)} className="bg-[#12b76a] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase italic shadow-lg border-b-4 border-emerald-900 active:translate-y-1 flex items-center gap-3"><i className="fas fa-file-excel"></i> DÁN TỪ EXCEL</button>
                </div>
             </div>
             <div className="flex-1 overflow-auto border border-slate-100 rounded-[2rem] bg-slate-50 shadow-inner">
                <table className="w-full text-left text-[12px]">
                   <thead className="bg-[#061631] text-white font-black italic uppercase sticky top-0 z-10">
                      <tr><th className="p-5">STT</th><th className="p-5">HỌ VÀ TÊN</th><th className="p-5">GIỚI TÍNH</th><th className="p-5">TRẠNG THÁI</th><th className="p-5">PHỤ HUYNH</th><th className="p-5">THAO TÁC</th></tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200 bg-white">
                      {students.map((s, idx) => (
                         <tr key={s.id} className="hover:bg-blue-50 transition-colors font-bold text-slate-700">
                            <td className="p-5">{idx + 1}</td>
                            <td className="p-5 uppercase italic text-slate-900">{s.name}</td>
                            <td className="p-5">{s.gender}</td>
                            <td className="p-5"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[9px] uppercase font-black">{s.status}</span></td>
                            <td className="p-5 italic opacity-60">{s.phone}</td>
                            <td className="p-5 flex gap-4">
                               <button className="text-blue-600 hover:scale-125 transition-all"><i className="fas fa-edit"></i></button>
                               <button onClick={() => saveStudents(students.filter(x => x.id !== s.id))} className="text-rose-500 hover:scale-125 transition-all"><i className="fas fa-trash"></i></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'seating' && (
          <div className="flex-1 flex flex-col animate-in zoom-in-95 h-full overflow-hidden">
             <div className="mb-10 shrink-0 flex justify-between items-end border-l-4 border-blue-600 pl-6">
                <h2 className="text-3xl font-black text-[#061631] uppercase italic tracking-tighter">SƠ ĐỒ VỊ TRÍ LỚP HỌC</h2>
                <button onClick={() => alert("Đã lưu sơ đồ!")} className="bg-[#061631] text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase italic shadow-lg border-b-8 border-black">LƯU SƠ ĐỒ</button>
             </div>
             <div className="flex-1 overflow-auto no-scrollbar pb-24">
                <div className="grid grid-cols-4 gap-8 max-w-[1200px] mx-auto w-full">
                   {[1, 2, 3, 4].map(day => (
                      <div key={day} className="flex flex-col gap-4">
                         <div className={`text-center text-[10px] font-black uppercase italic bg-gradient-to-r ${getSeatColor(day)} py-3 rounded-xl border-2 shadow-sm`}>DÃY {day}</div>
                         {Array.from({ length: 6 }).map((_, i) => {
                            const posId = day * 10 + i;
                            return (
                               <div key={posId} className={`rounded-[1.5rem] border-2 h-16 bg-gradient-to-b ${getSeatColor(day)} flex items-center justify-center p-2 hover:scale-105 transition-all shadow-md`}>
                                  <input className="w-full h-full bg-transparent outline-none text-center text-[#061631] text-[12px] font-black uppercase italic placeholder:text-slate-400/40" placeholder="TRỐNG" value={seatingData[posId] || ''} onChange={(e) => updateSeating(posId, e.target.value)} />
                               </div>
                            );
                         })}
                      </div>
                   ))}
                </div>
             </div>
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[320px] h-14 bg-[#061631] rounded-2xl border-b-8 border-black flex items-center justify-center text-white text-[11px] font-black uppercase italic shadow-2xl z-20">BÀN GIÁO VIÊN</div>
          </div>
        )}

        {activeTab === 'discipline' && (
           <div className="flex-1 flex flex-col animate-in fade-in h-full overflow-hidden">
              <h2 className="text-2xl font-black text-[#061631] uppercase italic tracking-tighter mb-8">THEO DÕI THI ĐUA</h2>
              <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
                 <div className="col-span-7 overflow-auto border rounded-[2rem] bg-slate-50 shadow-inner">
                    <table className="w-full text-[12px] font-bold">
                       <thead className="bg-[#061631] text-white uppercase italic sticky top-0 z-10">
                          <tr><th className="p-5 text-left">HỌ TÊN</th><th className="p-5 text-center">ĐIỂM</th><th className="p-5 text-center">TƯƠNG TÁC</th></tr>
                       </thead>
                       <tbody className="bg-white divide-y">
                          {students.sort((a,b) => b.score - a.score).map((s) => (
                             <tr key={s.id} className="hover:bg-slate-50">
                                <td className="p-5 uppercase italic text-slate-900 font-black">{s.name}</td>
                                <td className={`p-5 text-center font-black text-xl ${s.score >= 100 ? 'text-emerald-600' : 'text-rose-600'}`}>{s.score}</td>
                                <td className="p-5 flex justify-center gap-4">
                                   <button onClick={() => handleScore(s.id, 5)} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl font-black hover:bg-emerald-600 hover:text-white border border-emerald-100 transition-all">+</button>
                                   <button onClick={() => handleScore(s.id, -5)} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl font-black hover:bg-rose-600 hover:text-white border border-rose-100 transition-all">-</button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="col-span-5 flex flex-col gap-6">
                    <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex-1 flex flex-col overflow-hidden shadow-inner">
                       <h4 className="text-[11px] font-black text-blue-600 uppercase italic mb-6 border-l-4 border-blue-600 pl-4">NHẬT KÝ THI ĐUA</h4>
                       <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                          {disciplineLog.map((log, i) => (
                             <div key={i} className={`p-5 bg-white rounded-2xl shadow-sm border-l-8 ${log.type === 'plus' ? 'border-emerald-500' : 'border-rose-500'}`}>
                                <div className="flex justify-between items-center mb-1"><span className="text-[12px] font-black uppercase italic text-[#061631]">{log.name}</span><span className="text-[9px] font-bold text-slate-400">{log.time}</span></div>
                                <p className="text-[11px] text-slate-500 italic">{log.desc}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>

      {isExcelModalOpen && (
        <div className="fixed inset-0 z-[1200] bg-[#061631]/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in">
           <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-3xl overflow-hidden animate-in zoom-in-95 border border-white/20">
              <div className="p-10 bg-[#061631] text-white flex justify-between items-center shrink-0 shadow-lg">
                 <div className="flex items-center gap-6 font-black italic uppercase text-2xl tracking-tighter"><i className="fas fa-file-excel text-emerald-400 text-4xl"></i> ĐỒNG BỘ DANH SÁCH</div>
                 <button onClick={() => setIsExcelModalOpen(false)} className="w-12 h-12 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"><i className="fas fa-times text-2xl"></i></button>
              </div>
              <div className="p-12 space-y-8">
                 <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic text-center">Copy các cột từ Excel theo đúng thứ tự mẫu để AI nạp dữ liệu chính xác nhất.</p>
                 <textarea value={excelPasteData} onChange={e => setExcelPasteData(e.target.value)} rows={10} className="w-full bg-slate-50 border-4 border-slate-200 rounded-[2rem] p-10 text-[12px] outline-none font-mono focus:border-blue-500 shadow-inner italic font-bold" placeholder="Dán dữ liệu học sinh tại đây..." />
                 <button onClick={handleImportExcel} className="w-full bg-blue-600 text-white font-black py-8 rounded-2xl shadow-2xl uppercase italic text-xl border-b-8 border-blue-900 active:scale-95 transition-all">HOÀN TẤT ĐỒNG BỘ</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClassBook;
