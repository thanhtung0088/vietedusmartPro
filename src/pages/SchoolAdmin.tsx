
import React, { useState, useEffect, useRef } from 'react';
import ZoomMeeting from './ZoomMeeting';
import AdminOffice from './AdminOffice';
import VietEduChat from '../components/VietEduChat';

interface StaffMember {
  id: string;
  name: string;
  isFemale: boolean;
  isPermanent: boolean;
  isProbation: boolean;
  isContract: boolean;
  duty: string;
  subject: string;
  classes: string;
  teachingPeriods: number;
  classManager: string;
  concurrentDuty: string;
  totalPeriods: number;
  standardPeriods: number;
  overtime: number;
  notes: string;
}

const SchoolAdmin: React.FC<{onBack: () => void, initialTab?: string}> = ({ onBack, initialTab = 'hr' }) => {
  const [activeMenu, setActiveMenu] = useState(initialTab);
  const [showZoom, setShowZoom] = useState(false);
  const [showZalo, setShowZalo] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelPasteData, setExcelPasteData] = useState('');
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const sideMenus = [
    { id: 'hr', label: 'NHÂN SỰ & TỔ CHỨC', icon: 'fa-users' },
    { id: 'office', label: 'HÀNH CHÍNH VĂN PHÒNG', icon: 'fa-building-shield' },
    { id: 'reports', label: 'BÁO CÁO TỔNG HỢP', icon: 'fa-chart-pie' },
    { id: 'dang', label: 'PHÁT TRIỂN ĐẢNG', icon: 'fa-asterisk' },
    { id: 'union', label: 'CÔNG ĐOÀN - ĐOÀN THỂ', icon: 'fa-people-group' },
    { id: 'pro', label: 'CHỈ ĐẠO CHUYÊN MÔN', icon: 'fa-book' },
    { id: 'infra', label: 'CƠ SỞ VẬT CHẤT', icon: 'fa-landmark' },
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vietedu_staff_list_final_v6');
      if (saved) setStaffData(JSON.parse(saved));
      else setStaffData([]);
    } catch (e) { console.error(e); }
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (activeMenu === 'office') return <AdminOffice onBack={() => setActiveMenu('hr')} />;

  const renderContent = () => {
    if (activeMenu === 'hr') {
      return (
        <div className="w-full h-full overflow-auto border-t border-slate-300 bg-white shadow-inner relative animate-in fade-in duration-500">
          <table className="w-full border-collapse text-[11px] min-w-[2400px] bg-white">
            <thead className="bg-[#f1f5f9] text-[#061631] sticky top-0 z-20 font-black uppercase italic border-b-2 border-slate-300">
              <tr>
                <th rowSpan={2} className="p-5 border border-slate-300 w-12 text-center">TT</th>
                <th rowSpan={2} className="p-5 border border-slate-300 min-w-[300px] text-left">Họ và tên giáo viên</th>
                <th rowSpan={2} className="p-5 border border-slate-300 w-14 text-center">Nữ</th>
                <th colSpan={3} className="p-2 border border-slate-300 text-center bg-slate-100/50">Tình hình biên chế</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Công tác chính</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Môn dạy</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center min-w-[350px]">Lớp (khối) dạy</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Số tiết dạy</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Chủ nhiệm</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center min-w-[200px]">Công tác kiêm nhiệm</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Tổng tiết/tuần</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Tiết chuẩn</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Tiết phụ trội</th>
                <th rowSpan={2} className="p-5 border border-slate-300 text-center">Ghi chú</th>
              </tr>
              <tr className="bg-slate-50">
                <th className="p-3 border border-slate-300 text-center w-24 italic font-bold">Biên chế</th>
                <th className="p-3 border border-slate-300 text-center w-24 italic font-bold">Tập sự</th>
                <th className="p-3 border border-slate-300 text-center w-24 italic font-bold">Hợp đồng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {staffData.length > 0 ? staffData.map((s, idx) => (
                <tr key={s.id} className="h-16 font-bold text-slate-700 hover:bg-blue-50 transition-colors">
                  <td className="p-4 text-center border border-slate-200 bg-slate-50/50">{idx + 1}</td>
                  <td className="p-4 border border-slate-200 uppercase italic text-[#061631]">{s.name}</td>
                  <td className="p-4 text-center border border-slate-200">{s.isFemale ? 'x' : ''}</td>
                  <td className="p-4 text-center border border-slate-200">{s.isPermanent ? 'x' : ''}</td>
                  <td className="p-4 text-center border border-slate-200">{s.isProbation ? 'x' : ''}</td>
                  <td className="p-4 text-center border border-slate-200">{s.isContract ? 'x' : ''}</td>
                  <td className="p-4 text-center border border-slate-200">{s.duty}</td>
                  <td className="p-4 text-center border border-slate-200">{s.subject}</td>
                  <td className="p-4 text-center border border-slate-200">{s.classes}</td>
                  <td className="p-4 text-center border border-slate-200">{s.teachingPeriods}</td>
                  <td className="p-4 text-center border border-slate-200 font-black text-blue-600 italic">{s.classManager}</td>
                  <td className="p-4 text-center border border-slate-200 italic">{s.concurrentDuty}</td>
                  <td className="p-4 text-center border border-slate-200">{s.totalPeriods}</td>
                  <td className="p-4 text-center border border-slate-200">{s.standardPeriods}</td>
                  <td className="p-4 text-center border border-slate-200 text-rose-600 font-black">{s.overtime > 0 ? s.overtime : ''}</td>
                  <td className="p-4 border border-slate-200 italic">{s.notes}</td>
                </tr>
              )) : (
                <tr><td colSpan={16} className="p-60 text-center opacity-10 uppercase font-black tracking-[0.4em] text-3xl italic">Chưa có dữ liệu nhân sự nạp vào hệ thống</td></tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }
    
    if (activeMenu === 'reports') {
      return (
        <div className="p-16 space-y-12 h-full overflow-auto animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-3 gap-10">
              <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-[2.5rem] border border-blue-100 shadow-xl relative overflow-hidden group">
                 <h4 className="text-[12px] font-black text-blue-600 uppercase italic mb-4 tracking-widest">TỔNG NHÂN SỰ</h4>
                 <p className="text-6xl font-black text-[#061631] italic">{staffData.length}</p>
                 <i className="fas fa-users absolute -bottom-6 -right-6 text-8xl text-blue-100 opacity-50"></i>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-white p-12 rounded-[2.5rem] border border-emerald-100 shadow-xl relative overflow-hidden group">
                 <h4 className="text-[12px] font-black text-emerald-600 uppercase italic mb-4 tracking-widest">BIÊN CHẾ CHUẨN</h4>
                 <p className="text-6xl font-black text-[#061631] italic">{staffData.filter(s => s.isPermanent).length}</p>
                 <i className="fas fa-id-card absolute -bottom-6 -right-6 text-8xl text-emerald-100 opacity-50"></i>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-white p-12 rounded-[2.5rem] border border-rose-100 shadow-xl relative overflow-hidden group">
                 <h4 className="text-[12px] font-black text-rose-600 uppercase italic mb-4 tracking-widest">VƯỢT GIỜ / PHỤ TRỘI</h4>
                 <p className="text-6xl font-black text-[#061631] italic">{staffData.filter(s => s.overtime > 0).length}</p>
                 <i className="fas fa-clock absolute -bottom-6 -right-6 text-8xl text-rose-100 opacity-50"></i>
              </div>
           </div>
        </div>
      )
    }

    return <div className="h-full flex flex-col items-center justify-center opacity-5 grayscale"><i className="fas fa-folder-open text-[150px] mb-10"></i><p className="text-2xl font-black uppercase italic tracking-[0.5em]">PHÂN HỆ TRỐNG</p></div>;
  };

  return (
    <div className="flex flex-col h-full bg-[#f1f5f9] animate-in fade-in duration-700 font-sans overflow-hidden">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center px-12 py-10 bg-[#061631] text-white shrink-0 shadow-2xl relative z-10 rounded-b-[3rem]">
        <div className="flex items-center gap-10">
          <button onClick={onBack} className="text-[11px] font-black text-blue-400 hover:text-white flex items-center gap-3 uppercase tracking-widest italic group transition-all">
            <i className="fas fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> DASHBOARD
          </button>
          <div className="flex flex-col">
             <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-1">QUẢN TRỊ <span className="text-blue-500">NHÀ TRƯỜNG SỐ</span></h1>
             <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] italic">LAB SỐ 4.0 - PHÂN HỆ ĐIỀU HÀNH TỔNG THỂ</p>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
           <button onClick={() => setShowZalo(true)} className="bg-white/5 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase italic flex items-center gap-4 border border-white/10 hover:bg-[#0068ff] transition-all">
              <i className="fab fa-facebook-messenger text-2xl"></i> ZALO CHAT PRO
           </button>
           <button onClick={() => setShowZoom(true)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase shadow-3xl italic flex items-center gap-5 border-b-8 border-blue-900 active:scale-95 transition-all">
              <i className="fas fa-video text-2xl"></i> PHÒNG HỌP TRỰC TUYẾN
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 mt-8 mb-10 px-12 overflow-hidden">
        {/* Left Sidebar Menu */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-3d-extreme flex flex-col shrink-0 overflow-y-auto no-scrollbar border border-slate-200 w-[340px] animate-in slide-in-from-left-10 duration-700">
           <div className="space-y-2">
             {sideMenus.map(menu => (
               <button key={menu.id} onClick={() => setActiveMenu(menu.id)} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all group ${activeMenu === menu.id ? 'bg-[#061631] text-white shadow-xl italic font-black scale-[1.03] border-b-4 border-black/20' : 'text-slate-400 hover:text-[#061631] hover:bg-slate-50'}`}>
                 <i className={`fas ${menu.icon} text-xl w-8 text-center`}></i>
                 <span className="text-[10px] font-black uppercase italic tracking-widest leading-none">{menu.label}</span>
               </button>
             ))}
           </div>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 bg-white rounded-[3rem] shadow-3d-extreme border border-white flex flex-col relative overflow-hidden animate-in zoom-in-95">
           <div className="flex justify-between items-center px-12 py-8 shrink-0 border-b border-slate-100">
              <h2 className="text-3xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">{sideMenus.find(m => m.id === activeMenu)?.label}</h2>
              <div className="flex gap-4">
                 <button onClick={toggleFullscreen} className="bg-slate-100 text-[#061631] px-8 py-4 rounded-xl text-[11px] font-black uppercase italic shadow-md flex items-center gap-3 hover:bg-slate-200 transition-all active:scale-95">
                   <i className="fas fa-expand-arrows-alt text-lg"></i> TOÀN MÀN HÌNH
                 </button>
                 <button onClick={() => setIsExcelModalOpen(true)} className="bg-[#12b76a] text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase italic shadow-xl border-b-8 border-emerald-900 active:scale-95 transition-all flex items-center gap-3 hover:bg-emerald-600">
                   <i className="fas fa-file-excel text-lg"></i> ĐỒNG BỘ EXCEL (CHUẨN)
                 </button>
              </div>
           </div>
           <div className="flex-1 overflow-hidden relative">
              {renderContent()}
           </div>
        </div>
      </div>

      {isExcelModalOpen && (
        <div className="fixed inset-0 z-[1200] bg-[#061631]/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in">
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
              <div className="p-12 bg-[#061631] text-white flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-6 font-black italic uppercase text-2xl tracking-tighter"><i className="fas fa-file-excel text-emerald-400 text-4xl"></i> ĐỒNG BỘ NHÂN SỰ CHUẨN XÁC</div>
                 <button onClick={() => setIsExcelModalOpen(false)} className="w-12 h-12 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"><i className="fas fa-times text-2xl"></i></button>
              </div>
              <div className="p-12 space-y-8">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic text-center leading-relaxed">
                   Dán các cột từ Excel theo đúng thứ tự (Họ tên, Nữ, Biên chế, Tập sự, Hợp đồng, Công tác chính...)
                 </p>
                 <textarea 
                    value={excelPasteData} 
                    onChange={e => setExcelPasteData(e.target.value)} 
                    rows={10} 
                    className="w-full bg-slate-50 border-4 border-slate-200 rounded-[2rem] p-10 text-[12px] outline-none font-mono focus:border-blue-500 shadow-inner transition-all italic font-bold" 
                    placeholder="Dán dữ liệu Excel tại đây..." 
                 />
                 <button onClick={() => {
                     const rows = excelPasteData.trim().split('\n');
                     const newList = rows.map((row, i) => {
                       const cols = row.split('\t');
                       return { 
                         id: Date.now().toString() + i, 
                         name: cols[1] || 'GV mới', 
                         isFemale: cols[2]?.toLowerCase() === 'x', 
                         isPermanent: cols[3]?.toLowerCase() === 'x', 
                         isProbation: cols[4]?.toLowerCase() === 'x', 
                         isContract: cols[5]?.toLowerCase() === 'x', 
                         duty: cols[6] || 'Giáo viên', 
                         subject: cols[7] || '', 
                         classes: cols[8] || '',
                         teachingPeriods: parseInt(cols[9]) || 0,
                         classManager: cols[10] || '',
                         concurrentDuty: cols[11] || '',
                         totalPeriods: parseInt(cols[12]) || 0,
                         standardPeriods: parseInt(cols[13]) || 17,
                         overtime: parseInt(cols[14]) || 0,
                         notes: cols[15] || ''
                       };
                     });
                     setStaffData(newList);
                     localStorage.setItem('vietedu_staff_list_final_v6', JSON.stringify(newList));
                     setIsExcelModalOpen(false);
                     setExcelPasteData('');
                   }} className="w-full bg-blue-600 text-white font-black py-8 rounded-[1.5rem] shadow-3xl uppercase italic text-xl border-b-8 border-blue-900 active:scale-95 transition-all">HOÀN TẤT ĐỒNG BỘ</button>
              </div>
           </div>
        </div>
      )}

      {showZoom && <ZoomMeeting onBack={() => setShowZoom(false)} />}
      
      {showZalo && (
         <div className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-md flex items-center justify-center p-12">
            <div className="w-full max-w-5xl h-[85vh] relative animate-in zoom-in-95 duration-500">
               <button onClick={() => setShowZalo(false)} className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl z-50 text-rose-500 hover:scale-110 transition-all"><i className="fas fa-times text-2xl"></i></button>
               <VietEduChat isInline={true} />
            </div>
         </div>
      )}
    </div>
  );
};

export default SchoolAdmin;
