
import React, { useState, useEffect } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  date: string;
  category: string;
}

const ProfessionalPlan: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('school');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [strategyNote, setStrategyNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('vietedu_proplan');
    if (saved) setFiles(JSON.parse(saved));
    const savedNote = localStorage.getItem('vietedu_quick_note');
    if (savedNote) setStrategyNote(savedNote);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        const newFile = { id: Date.now().toString(), name: file.name, date: new Date().toLocaleDateString('vi-VN'), category: activeTab };
        const updated = [newFile, ...files];
        setFiles(updated);
        localStorage.setItem('vietedu_proplan', JSON.stringify(updated));
        setIsUploading(false);
      }, 1000);
    }
  };

  const tabs = [
    { id: 'school', label: 'KH TRƯỜNG', icon: 'fa-school' },
    { id: 'dept', label: 'KH TỔ CM', icon: 'fa-users-gear' },
    { id: 'personal', label: 'KH CÁ NHÂN', icon: 'fa-user-tie' },
    { id: 'ppct', label: 'PHÂN PHỐI CT', icon: 'fa-list-check' },
    { id: 'strategy', label: 'CHIẾN LƯỢC TUẦN', icon: 'fa-pen-nib' }
  ];

  const filteredFiles = files.filter(f => f.category === activeTab);

  return (
    <div className="max-w-[1550px] mx-auto px-6 py-6 h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="flex justify-between items-center shrink-0 mb-8">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic flex items-center gap-2 mb-2">
              <i className="fas fa-arrow-left"></i> QUAY LẠI DASHBOARD
          </button>
          <h1 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">HỒ SƠ <span className="text-blue-600">CHUYÊN MÔN SỐ</span></h1>
        </div>
        <label className="bg-[#061631] text-white px-8 py-3.5 rounded-2xl font-black shadow-xl cursor-pointer hover:scale-105 transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 italic border border-white/10">
          <input type="file" className="hidden" onChange={handleUpload} />
          {isUploading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
          TẢI LÊN HỒ SƠ
        </label>
      </div>

      <div className="flex bg-white p-2 rounded-[1.8rem] shadow-sm border border-slate-200 gap-2 overflow-x-auto no-scrollbar shrink-0 mb-6">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex-1 min-w-[180px] py-4 rounded-[1.3rem] text-[9px] font-black transition-all uppercase tracking-widest flex items-center justify-center gap-3 ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg italic' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-3d-extreme overflow-hidden flex flex-col relative min-h-0">
         {activeTab === 'strategy' ? (
           <div className="h-full flex flex-col animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-10 shrink-0">
                 <h2 className="text-[10px] font-black text-[#061631] uppercase tracking-[0.4em] italic">SỔ TAY CHIẾN LƯỢC & NHIỆM VỤ TUẦN</h2>
                 <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Tự động lưu vào hệ thống</span>
              </div>
              <div className="flex-1 bg-slate-50 rounded-[2rem] p-10 shadow-inner relative">
                 <textarea 
                    value={strategyNote} 
                    onChange={(e) => { setStrategyNote(e.target.value); localStorage.setItem('vietedu_quick_note', e.target.value); }}
                    placeholder="Ghi chú các nhiệm vụ quan trọng trong tuần của Thầy tại đây..."
                    className="w-full h-full bg-transparent border-none outline-none resize-none text-[16px] font-bold text-slate-800 italic leading-[40px] overflow-y-auto no-scrollbar"
                    style={{ 
                      backgroundImage: 'linear-gradient(transparent, transparent 39px, #e2e8f0 39px)', 
                      backgroundSize: '100% 40px' 
                    }}
                 />
              </div>
           </div>
         ) : (
           <div className="h-full flex flex-col">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <i className="fas fa-folder-open text-[15rem]"></i>
              </div>
              
              {filteredFiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 overflow-y-auto no-scrollbar pb-10">
                   {filteredFiles.map(file => (
                     <div key={file.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200 flex items-center justify-between group hover:border-blue-400 hover:bg-white transition-all shadow-sm">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-md border border-slate-100">
                           <i className="fas fa-file-pdf text-xl"></i>
                         </div>
                         <div>
                           <p className="text-xs font-black text-slate-800 uppercase italic truncate max-w-[150px]">{file.name}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{file.date}</p>
                         </div>
                       </div>
                       <div className="flex gap-2">
                          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><i className="fas fa-download"></i></button>
                          <button onClick={() => {
                            const updated = files.filter(f => f.id !== file.id);
                            setFiles(updated);
                            localStorage.setItem('vietedu_proplan', JSON.stringify(updated));
                          }} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                            <i className="fas fa-trash-can"></i>
                          </button>
                       </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                   <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border border-slate-100 shadow-inner">
                      <i className="fas fa-archive text-3xl"></i>
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Danh mục hồ sơ hiện đang trống</p>
                   <p className="text-[8px] mt-4 font-bold uppercase text-blue-400 italic">Hãy tải lên PPCT hoặc Kế hoạch dạy học của Thầy</p>
                </div>
              )}
           </div>
         )}
      </div>
    </div>
  );
};

export default ProfessionalPlan;
