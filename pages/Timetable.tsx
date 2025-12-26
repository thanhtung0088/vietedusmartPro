
import React, { useState, useEffect } from 'react';
import { scanTimetableImage } from '../services/geminiService';

interface TimetableProps {
  onBack: () => void;
}

const Timetable: React.FC<TimetableProps> = ({ onBack }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vietedu_schedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
      setLastUpdated('Cập nhật từ bản lưu');
    }
  }, []);

  const saveSchedule = (data: any[]) => {
    setSchedule(data);
    localStorage.setItem('vietedu_schedule', JSON.stringify(data));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        try {
          const res = await scanTimetableImage(base64);
          const structuredRes = res.map((item: any) => ({
            ...item,
            period: item.period || 1,
            subject: item.subject || 'TIẾT TRỐNG',
            isMorning: item.isMorning !== undefined ? item.isMorning : true
          }));
          saveSchedule(structuredRes);
          setLastUpdated(new Date().toLocaleTimeString('vi-VN'));
        } catch (e) { alert('Lỗi quét AI, vui lòng thử lại ảnh rõ hơn'); } finally { setIsScanning(false); }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualInput = () => {
    const dummy = [
      { period: 1, subject: 'Toán học', isMorning: true },
      { period: 2, subject: 'Ngữ văn', isMorning: true },
      { period: 3, subject: 'TIẾT TRỐNG', isMorning: true },
      { period: 4, subject: 'GDCD', isMorning: true },
      { period: 5, subject: 'Tiếng Anh', isMorning: true }
    ];
    saveSchedule(dummy);
    alert('Đã nạp lịch dạy mẫu cho ngày hôm nay!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <button onClick={onBack} className="w-fit text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest">
              <i className="fas fa-arrow-left text-[10px]"></i> QUAY LẠI
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">Lịch dạy cá nhân</h2>
            <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em] mt-2 italic">Dữ liệu thật từ quét ảnh OCR hoặc nhập thủ công</p>
          </div>
        </div>
        <div className="flex gap-4">
          <label className="bg-white border-2 border-slate-200 text-slate-800 px-8 py-4 rounded-2xl font-black shadow-sm hover:border-amber-500 hover:text-amber-600 cursor-pointer transition-all flex items-center gap-4 uppercase tracking-widest text-xs">
            <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
            {isScanning ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-camera"></i>}
            {isScanning ? 'ĐANG QUÉT...' : 'QUÉT ẢNH TKB'}
          </label>
          <button onClick={handleManualInput} className="bg-[#0f172a] text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-black transition-all flex items-center gap-4 uppercase tracking-widest text-xs">
            <i className="fas fa-keyboard"></i> NHẬP THỦ CÔNG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-10 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-[11px] font-black uppercase tracking-widest italic">
             <div>
               <h3 className="text-slate-800">Bản đồ tiết dạy hôm nay</h3>
               {lastUpdated && <p className="text-emerald-500 mt-2">{lastUpdated}</p>}
             </div>
             <span className="text-slate-400">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })}</span>
          </div>
          
          <div className="flex-1 p-10 overflow-x-auto">
             {schedule.length > 0 ? (
               <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black text-slate-300 uppercase text-left tracking-[0.3em]">
                      <th className="pb-8 w-24">Tiết</th>
                      <th className="pb-8">Môn học</th>
                      <th className="pb-8 text-right">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3, 4, 5].map(p => {
                      const entry = schedule.find(s => s.period === p && s.isMorning);
                      const isFree = !entry || entry.subject === 'TIẾT TRỐNG';
                      return (
                          <tr key={p} className="group">
                            <td className="py-8 text-sm font-black text-slate-200 group-hover:text-blue-600 transition-all italic tracking-tighter">0{p}</td>
                            <td className="py-8 font-black text-slate-700 text-lg italic uppercase tracking-tighter">{isFree ? 'TIẾT TRỐNG' : entry.subject}</td>
                            <td className="py-8 text-right">
                                <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${isFree ? 'bg-slate-50 text-slate-300' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                  {isFree ? 'NGHỈ' : 'ĐANG DẠY'}
                                </span>
                            </td>
                          </tr>
                      );
                    })}
                  </tbody>
               </table>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-200 opacity-20 py-24">
                  <i className="fas fa-calendar-day text-7xl mb-8"></i>
                  <p className="text-sm font-black uppercase tracking-widest">Lịch dạy đang trống</p>
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-amber-600 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between h-72 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-black text-[9px] uppercase tracking-[0.4em] mb-8 opacity-70">BUỔI SÁNG</h3>
                <p className="text-4xl font-black italic tracking-tighter uppercase leading-tight">
                  {schedule.filter(s => s.subject !== 'TIẾT TRỐNG' && s.isMorning).length || 0} Tiết dạy
                </p>
              </div>
              <i className="fas fa-sun text-[12rem] absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700"></i>
           </div>
           
           <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between h-72 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-black text-[9px] uppercase tracking-[0.4em] mb-8 opacity-40">BUỔI CHIỀU</h3>
                <p className="text-4xl font-black italic tracking-tighter uppercase leading-tight">TIẾT TRỐNG</p>
              </div>
              <i className="fas fa-moon text-[10rem] absolute -bottom-5 -right-5 opacity-5 group-hover:-rotate-12 transition-transform duration-700"></i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
