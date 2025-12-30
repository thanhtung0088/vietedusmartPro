
import React, { useState, useEffect } from 'react';
import { generateTimetableAI, runAIAnalysisService } from '../services/geminiService';

const SchoolAdmin: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState('hr');
  const [staffList, setStaffList] = useState<any[]>([]);
  const [teacherAssignments, setTeacherAssignments] = useState('');
  const [isGeneratingTT, setIsGeneratingTT] = useState(false);
  const [generatedTimetable, setGeneratedTimetable] = useState<any[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');

  useEffect(() => {
    const staff = localStorage.getItem('vietedu_admin_staff');
    if (staff) {
      setStaffList(JSON.parse(staff));
    } else {
      setStaffList([]); 
    }

    const savedAssign = localStorage.getItem('vietedu_admin_assignments');
    if (savedAssign) setTeacherAssignments(savedAssign);
    const savedTT = localStorage.getItem('vietedu_admin_tt_ai');
    if (savedTT) setGeneratedTimetable(JSON.parse(savedTT));
  }, []);

  const handleAddStaff = () => {
    const name = prompt("Nhập họ tên Cán bộ/Giáo viên:");
    const subject = prompt("Nhập môn chuyên môn:");
    if (name && subject) {
      const newList = [...staffList, { 
        id: Date.now().toString(), 
        name: name.trim(), 
        subject: subject.trim(), 
        status: 'Đang công tác' 
      }];
      setStaffList(newList);
      localStorage.setItem('vietedu_admin_staff', JSON.stringify(newList));
    }
  };

  const handleImportStaff = () => {
    if (!importText.trim()) return;
    const lines = importText.split('\n');
    const newStaff = lines.map(line => {
      const parts = line.split('\t'); 
      const name = parts[0] || parts[1];
      const subject = parts[1] || 'Tự do';
      if (!name) return null;
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        subject: subject.trim(),
        status: 'Đang công tác'
      };
    }).filter(Boolean);

    const updated = [...staffList, ...newStaff];
    setStaffList(updated);
    localStorage.setItem('vietedu_admin_staff', JSON.stringify(updated));
    setIsImportModalOpen(false);
    setImportText('');
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm("Thầy chắc chắn muốn xóa nhân sự này?")) {
      const newList = staffList.filter(s => s.id !== id);
      setStaffList(newList);
      localStorage.setItem('vietedu_admin_staff', JSON.stringify(newList));
    }
  };

  const handleGenerateTT = async () => {
    if (!teacherAssignments.trim()) return alert("Vui lòng nạp Bảng Phân Công Giáo Viên trước!");
    setIsGeneratingTT(true);
    try {
      const res = await generateTimetableAI(teacherAssignments || '');
      setGeneratedTimetable(res);
      localStorage.setItem('vietedu_admin_tt_ai', JSON.stringify(res));
    } catch (e) { alert("Lỗi AI."); } finally { setIsGeneratingTT(false); }
  };

  const runStrategyAI = async () => {
    setIsAnalysing(true);
    try {
      const res = await runAIAnalysisService();
      alert(res || "Hoàn tất phân tích chiến lược.");
    } catch (e) { alert("Lỗi Strategy AI."); } finally { setIsAnalysing(false); }
  };

  // --- LOGIC SAO LƯU & KHÔI PHỤC ---
  const handleExportData = () => {
    const allData: any = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('vietedu_')) {
        allData[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VietEdu_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    alert("Đã xuất tệp sao lưu thành công. Thầy hãy cất giữ tệp này an toàn nhé!");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          Object.keys(data).forEach(key => {
            if (key.startsWith('vietedu_')) {
              localStorage.setItem(key, data[key]);
            }
          });
          alert("Khôi phục dữ liệu thành công! Ứng dụng sẽ tự động tải lại.");
          window.location.reload();
        } catch (err) {
          alert("Tệp tin không hợp lệ.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-[1550px] mx-auto h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-6 pt-2 shrink-0 px-4">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic mb-1 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i> QUAY LẠI DASHBOARD
          </button>
          <h1 className="text-3xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">
            HÀNH CHÍNH <span className="text-blue-600">QUẢN TRỊ</span>
          </h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] italic mt-1">HỆ THỐNG ĐIỀU HÀNH LAB SỐ CHIẾN LƯỢC</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 px-4 mb-4">
        <div className="col-span-3 bg-[#061631] p-6 rounded-[2.5rem] shadow-2xl border border-white/5 space-y-2 overflow-y-auto no-scrollbar">
          <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.5em] mb-4 italic">MODULE ĐIỀU HÀNH</p>
          {[
            { id: 'hr', label: 'CÁN BỘ GIÁO VIÊN', icon: 'fa-users' },
            { id: 'timetable-ai', label: 'SOẠN TKB AI', icon: 'fa-calendar-plus' },
            { id: 'planning', label: 'AI CHIẾN LƯỢC', icon: 'fa-microchip' },
            { id: 'system', label: 'HỆ THỐNG & SAO LƯU', icon: 'fa-database' }
          ].map(mod => (
            <button key={mod.id} onClick={() => setActiveModule(mod.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-500 ${activeModule === mod.id ? 'bg-blue-600 text-white shadow-xl scale-105 italic font-black' : 'text-slate-400 hover:bg-white/5'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeModule === mod.id ? 'bg-white/20 shadow-lg' : 'bg-white/5'}`}><i className={`fas ${mod.icon} text-[10px]`}></i></div>
              <h4 className="text-[8px] font-black uppercase tracking-widest">{mod.label}</h4>
            </button>
          ))}
        </div>

        <div className="col-span-9 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-3d-extreme overflow-hidden flex flex-col min-h-0 relative">
             {activeModule === 'hr' && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-700">
                   <div className="flex justify-between items-center mb-8 shrink-0">
                      <h2 className="text-2xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">DANH SÁCH <span className="text-blue-600">NHÂN SỰ</span></h2>
                      <div className="flex gap-3">
                        <button onClick={() => setIsImportModalOpen(true)} className="bg-slate-100 text-slate-600 px-5 py-3 rounded-xl text-[9px] font-black uppercase italic tracking-widest hover:bg-slate-200 transition-all">
                          <i className="fas fa-file-import mr-2"></i> DÁN DỮ LIỆU
                        </button>
                        <button onClick={handleAddStaff} className="bg-[#061631] text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase shadow-xl italic hover:scale-105 transition-all tracking-widest">
                          <i className="fas fa-plus mr-2"></i> THÊM MỚI
                        </button>
                      </div>
                   </div>
                   <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50 rounded-[2rem] p-4 border border-slate-100">
                      <table className="w-full text-left text-[10px]">
                         <thead className="text-slate-400 font-black uppercase italic tracking-widest border-b border-slate-200">
                            <tr>
                              <th className="p-4">HỌ TÊN CÁN BỘ</th>
                              <th className="p-4">CHUYÊN MÔN</th>
                              <th className="p-4">TRẠNG THÁI</th>
                              <th className="p-4 text-right">TÁC VỤ</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 font-bold">
                            {staffList.length > 0 ? staffList.map((gv) => (
                               <tr key={gv.id} className="hover:bg-white hover:shadow-md transition-all group">
                                  <td className="p-4 font-black uppercase italic text-slate-800">{gv.name}</td>
                                  <td className="p-4 font-bold text-slate-500 uppercase italic">{gv.subject}</td>
                                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-[7px] font-black italic border ${gv.status === 'Nghỉ phép' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{gv.status || 'Đang công tác'}</span></td>
                                  <td className="p-4 text-right">
                                    <button onClick={() => handleDeleteStaff(gv.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
                                  </td>
                               </tr>
                            )) : (
                              <tr><td colSpan={4} className="p-16 text-center opacity-20 italic font-black text-xs tracking-widest uppercase">Trống danh sách</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}
             
             {activeModule === 'timetable-ai' && (
                <div className="flex flex-col h-full gap-6 animate-in slide-in-from-right-8 duration-700">
                   <div className="flex justify-between items-center shrink-0">
                      <h2 className="text-2xl font-black text-orange-600 uppercase italic tracking-tighter leading-none">TỐI ƯU TKB AI</h2>
                      <button onClick={handleGenerateTT} disabled={isGeneratingTT} className="bg-orange-600 text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase shadow-2xl hover:scale-105 transition-all italic disabled:opacity-30">
                        {isGeneratingTT ? 'AI ĐANG TÍNH TOÁN...' : 'KÍCH HOẠT SOẠN TKB'}
                      </button>
                   </div>
                   <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
                      <div className="bg-slate-900 rounded-[2.5rem] p-8 flex flex-col shadow-2xl border border-white/5">
                         <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[8px] font-black text-blue-400 uppercase tracking-widest italic mb-4">DỮ LIỆU PHÂN CÔNG</div>
                         <textarea value={teacherAssignments} onChange={e => setTeacherAssignments(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-white italic outline-none focus:ring-1 ring-blue-500/50 resize-none shadow-inner" />
                         <button onClick={() => localStorage.setItem('vietedu_admin_assignments', teacherAssignments)} className="mt-4 bg-white/10 py-3 rounded-lg text-[8px] font-black text-white uppercase tracking-widest italic">LƯU BẢN THẢO</button>
                      </div>
                      <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 flex flex-col shadow-inner overflow-hidden relative">
                         <div className="bg-[#061631] p-3 rounded-lg text-[8px] font-black text-orange-400 uppercase tracking-widest italic mb-4">DỰ THẢO AI TỐI ƯU</div>
                         <div className="flex-1 overflow-y-auto no-scrollbar font-mono text-[10px] text-slate-800 leading-relaxed bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                            {generatedTimetable.length > 0 ? (
                               <pre className="whitespace-pre-wrap italic font-bold">{JSON.stringify(generatedTimetable, null, 2)}</pre>
                            ) : (
                               <div className="h-full flex flex-col items-center justify-center opacity-20 text-center"><i className="fas fa-calendar-alt text-4xl mb-4"></i></div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {activeModule === 'planning' && (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-[3rem] border border-slate-100 animate-in zoom-in-95 duration-700">
                   <div className="w-20 h-20 bg-[#061631] rounded-2xl shadow-3d-extreme flex items-center justify-center text-blue-400 mb-8 animate-float-ui"><i className="fas fa-brain text-4xl"></i></div>
                   <h2 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter mb-4 leading-none">STRATEGY CENTER</h2>
                   <button onClick={runStrategyAI} disabled={isAnalysing} className="bg-[#061631] text-white px-12 py-5 rounded-[1.8rem] font-black text-[11px] uppercase italic shadow-2xl hover:scale-105 transition-all tracking-[0.3em] disabled:opacity-50">
                      {isAnalysing ? 'ĐANG PHÂN TÍCH...' : 'PHÂN TÍCH CHIẾN LƯỢC'}
                   </button>
                </div>
             )}

             {activeModule === 'system' && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-700">
                   <h2 className="text-2xl font-black text-[#061631] uppercase italic tracking-tighter leading-none mb-2">HỆ THỐNG & <span className="text-emerald-600">SAO LƯU</span></h2>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic mb-10">QUẢN LÝ VÀ BẢO MẬT DỮ LIỆU LAB SỐ 4.0</p>
                   
                   <div className="grid grid-cols-2 gap-8">
                      <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-emerald-500 transition-all">
                         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform"><i className="fas fa-file-export text-2xl"></i></div>
                         <h3 className="text-sm font-black text-slate-800 uppercase italic mb-3">Sao lưu dữ liệu</h3>
                         <p className="text-[10px] text-slate-400 font-bold uppercase italic leading-relaxed mb-8">Tải toàn bộ dữ liệu hiện tại về máy tính để cất giữ an toàn.</p>
                         <button onClick={handleExportData} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-[10px] uppercase italic tracking-widest shadow-xl shadow-emerald-900/20 hover:-translate-y-1 transition-all">XUẤT FILE SAO LƯU (.JSON)</button>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-blue-500 transition-all">
                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform"><i className="fas fa-file-import text-2xl"></i></div>
                         <h3 className="text-sm font-black text-slate-800 uppercase italic mb-3">Khôi phục dữ liệu</h3>
                         <p className="text-[10px] text-slate-400 font-bold uppercase italic leading-relaxed mb-8">Nạp dữ liệu từ tệp sao lưu đã có để tiếp tục làm việc ngay.</p>
                         <label className="w-full bg-[#061631] text-white py-4 rounded-xl font-black text-[10px] uppercase italic tracking-widest shadow-xl shadow-slate-900/20 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center">
                            <input type="file" className="hidden" accept=".json" onChange={handleImportData} />
                            NHẬP TỪ FILE SAO LƯU
                         </label>
                      </div>
                   </div>

                   <div className="mt-auto bg-slate-900 text-white p-6 rounded-[2rem] flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"><i className="fas fa-shield-halved text-blue-400"></i></div>
                      <div className="flex-1">
                         <p className="text-[10px] font-black uppercase italic tracking-widest mb-1">Giao thức bảo mật VietEdu v4.0</p>
                         <p className="text-[8px] font-bold text-white/40 uppercase italic">Dữ liệu được lưu trữ nội bộ (Local-First), không gửi ra máy chủ ngoài khi chưa có yêu cầu.</p>
                      </div>
                      <button onClick={() => { if(confirm("Xóa toàn bộ dữ liệu ứng dụng?")) { localStorage.clear(); window.location.reload(); }}} className="text-[8px] font-black text-red-400 hover:text-red-300 uppercase italic tracking-widest">XÓA TRẮNG DỮ LIỆU</button>
                   </div>
                </div>
             )}
        </div>
      </div>

      {isImportModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-10 animate-in fade-in">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
              <div className="p-6 bg-[#061631] text-white flex justify-between items-center">
                 <h3 className="text-lg font-black uppercase italic tracking-tighter">DÁN DỮ LIỆU NHÂN SỰ</h3>
                 <button onClick={() => setIsImportModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><i className="fas fa-times"></i></button>
              </div>
              <div className="p-8 space-y-4">
                 <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Nguyễn Văn A    Toán học..." className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] font-bold outline-none italic" />
                 <div className="flex gap-4">
                    <button onClick={() => setIsImportModalOpen(false)} className="flex-1 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">HỦY BỎ</button>
                    <button onClick={handleImportStaff} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black text-[9px] uppercase italic shadow-lg tracking-widest">BẮT ĐẦU NẠP</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdmin;
