
import React, { useState } from 'react';
import { chatWithAI } from '../services/geminiService';

const AdminOffice: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<any | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiInput, setAiInput] = useState('lập báo cáo tổng kết năm học 2024-2025');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const officeModules = [
    { id: 'hoc-vu', label: 'HỌC VỤ & TUYỂN SINH', color: 'bg-gradient-to-br from-blue-400 to-blue-600', icon: 'fa-user-graduate', tasks: ['Hồ sơ HS', 'Tuyển sinh', 'Sổ điểm'] },
    { id: 'tai-vu', label: 'TÀI VỤ & KẾ TOÁN', color: 'bg-gradient-to-br from-emerald-400 to-emerald-600', icon: 'fa-money-bill-trend-up', hasAI: true, tasks: ['Bảng lương', 'Thu chi', 'Kế toán AI'] },
    { id: 'tu-van', label: 'TƯ VẤN HỌC ĐƯỜNG', color: 'bg-gradient-to-br from-purple-400 to-purple-600', icon: 'fa-comments', tasks: ['Tâm lý', 'Hướng nghiệp', 'Lịch hẹn'] },
    { id: 'thu-vien', label: 'THƯ VIỆN SỐ', color: 'bg-gradient-to-br from-amber-400 to-amber-600', icon: 'fa-book-open', tasks: ['Mượn trả', 'Kho sách', 'Học liệu'] },
    { id: 'it', label: 'CÔNG NGHỆ THÔNG TIN', color: 'bg-gradient-to-br from-slate-700 to-slate-900', icon: 'fa-microchip', tasks: ['Lab Số', 'Mạng nội bộ', 'Bảo trì'] },
    { id: 'y-te', label: 'Y TẾ HỌC ĐƯỜNG', color: 'bg-gradient-to-br from-rose-400 to-rose-600', icon: 'fa-briefcase-medical', tasks: ['Sức khỏe', 'Y bạ', 'Phòng dịch'] },
    { id: 'bao-ve', label: 'BẢO VỆ - PHỤC VỤ', color: 'bg-gradient-to-br from-indigo-400 to-indigo-600', icon: 'fa-shield-halved', tasks: ['An ninh', 'Vệ sinh', 'Trực ban'] },
    { id: 'van-thu', label: 'VĂN THƯ LƯU TRỮ', color: 'bg-gradient-to-br from-cyan-400 to-cyan-600', icon: 'fa-file-signature', tasks: ['Công văn đến', 'Công văn đi', 'Lưu trữ'] },
  ];

  const handleAccess = (mod: any) => {
    setActiveModule(mod);
  };

  const handleKichHoatAI = async () => {
    if (!aiInput.trim() || isLoading) return;
    setIsLoading(true);
    setAiResponse(null);
    try {
      const res = await chatWithAI(`Nghiệp vụ: ${activeModule.label}. Yêu cầu: ${aiInput}`);
      setAiResponse(res);
    } catch (error) {
      setAiResponse("Lỗi hệ thống AI. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (activeModule) {
    return (
      <div className="h-full flex flex-col overflow-hidden bg-white font-sans animate-in slide-in-from-right-10 duration-500">
         <div className={`${activeModule.color} p-12 text-white flex justify-between items-center shrink-0 shadow-2xl relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex items-center gap-10">
               <button onClick={() => setActiveModule(null)} className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center hover:bg-black/40 transition-all shadow-xl"><i className="fas fa-arrow-left text-2xl"></i></button>
               <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">{activeModule.label}</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70">PHÂN HỆ QUẢN TRỊ NỘI BỘ 4.0</p>
               </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => alert("Đang kích hoạt quy trình...")} className="bg-white text-blue-900 px-10 py-5 rounded-[2.5rem] text-[12px] font-black uppercase italic shadow-2xl flex items-center gap-4 hover:scale-105 transition-all">
                <i className="fas fa-bolt"></i> KÍCH HOẠT QUY TRÌNH
              </button>
              {activeModule.hasAI && (
                <button onClick={() => setShowAIAssistant(true)} className="bg-[#061631] text-emerald-400 px-10 py-5 rounded-[2.5rem] text-[12px] font-black uppercase italic shadow-2xl flex items-center gap-4 hover:scale-105 transition-all">
                  <i className="fas fa-robot"></i> TRỢ LÝ AI
                </button>
              )}
            </div>
         </div>

         <div className="flex-1 p-16 grid grid-cols-12 gap-10 overflow-y-auto no-scrollbar">
            <div className="col-span-8">
               <div className="bg-slate-50 p-12 rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center min-h-[500px]">
                  <i className="fas fa-folder-open text-[120px] text-slate-200 mb-8"></i>
                  <h4 className="text-xl font-black text-slate-400 uppercase italic">KHO DỮ LIỆU ĐANG TRỐNG</h4>
                  <div className="mt-12 flex gap-6">
                     <label className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-[12px] font-black uppercase italic cursor-pointer shadow-xl border-b-8 border-blue-900 transition-all hover:scale-105">
                        <input type="file" className="hidden" />
                        <i className="fas fa-cloud-upload-alt mr-3"></i> TẢI LÊN DỮ LIỆU
                     </label>
                  </div>
               </div>
            </div>
            <div className="col-span-4 space-y-8">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                  <h4 className="text-[13px] font-black text-[#061631] uppercase italic tracking-widest mb-8 border-l-4 border-blue-600 pl-4">THAO TÁC NHANH</h4>
                  <div className="space-y-4">
                     {activeModule.tasks.map((task: string) => (
                        <button key={task} onClick={() => alert(`Đang truy cập: ${task}`)} className="w-full text-left px-8 py-5 bg-slate-50 rounded-2xl text-[11px] font-black uppercase italic text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                           {task}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {showAIAssistant && (
            <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4">
               <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
                  <div className="bg-[#10b981] p-6 text-white flex justify-between items-center">
                     <span className="font-black italic uppercase">TRỢ LÝ KẾ TOÁN AI</span>
                     <button onClick={() => setShowAIAssistant(false)}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="p-8 space-y-6">
                     <textarea value={aiInput} onChange={(e) => setAiInput(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-[11px] font-bold h-32 outline-none" />
                     {aiResponse && <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl text-[10px] font-bold italic">{aiResponse}</div>}
                     <button onClick={handleKichHoatAI} disabled={isLoading} className="w-full py-5 bg-[#061631] text-[#10b981] font-black uppercase italic rounded-xl border-b-8 border-black">
                        {isLoading ? 'ĐANG XỬ LÝ...' : 'XỬ LÝ AI'}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col font-sans overflow-hidden animate-fade-in relative">
      <div className="flex justify-between items-start px-16 pt-12 pb-6 shrink-0">
        <div className="relative">
          <div className="absolute left-[-20px] top-0 bottom-0 w-1 bg-blue-600 rounded-full"></div>
          <h1 className="text-7xl font-black text-[#0f172a] uppercase italic tracking-tighter leading-none mb-3">
            HÀNH CHÍNH <span className="text-blue-600">VĂN PHÒNG</span>
          </h1>
          <p className="text-[12px] font-black text-blue-500/60 uppercase tracking-[0.5em] italic">PHÂN HỆ QUẢN TRỊ NỘI BỘ & LAB SỐ 4.0</p>
        </div>
        <button 
          onClick={onBack} 
          className="bg-slate-50 text-slate-400 px-10 py-4 rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100 shadow-sm"
        >
          QUAY LẠI DASHBOARD
        </button>
      </div>

      <div className="flex-1 p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 overflow-y-auto no-scrollbar pb-32">
        {officeModules.map((mod) => (
          <button 
            key={mod.id} 
            onClick={() => handleAccess(mod)}
            className="flex flex-col h-[320px] rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-4 transition-all duration-500 group bg-white border border-slate-50"
          >
            <div className={`flex-1 ${mod.color} transition-all duration-500 group-hover:brightness-110 relative flex items-center justify-center overflow-hidden`}>
                {/* 3D Glassy Icon chìm */}
                <i className={`fas ${mod.icon} text-white/10 text-[180px] absolute transition-all duration-1000 group-hover:scale-125 group-hover:rotate-12`}></i>
                <i className={`fas ${mod.icon} text-white text-6xl relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]`}></i>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="h-32 bg-white flex flex-col items-center justify-center border-t border-slate-50 relative z-10 p-4">
               <span className="text-[13px] font-black text-slate-800 uppercase italic tracking-widest group-hover:text-blue-600 transition-colors text-center leading-tight">
                 {mod.label}
               </span>
               <div className="mt-3 w-10 h-1 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500"></div>
            </div>
          </button>
        ))}
      </div>

      <div className="fixed bottom-12 right-12 w-20 h-20 bg-[#0068ff] rounded-3xl shadow-[0_15px_40px_rgba(0,104,255,0.4)] flex items-center justify-center text-white text-3xl border-4 border-white animate-bounce cursor-pointer hover:scale-110 transition-all z-50">
         <i className="fab fa-facebook-messenger"></i>
      </div>
    </div>
  );
};

export default AdminOffice;
