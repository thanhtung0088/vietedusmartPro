
import React, { useState, useRef } from 'react';

const ProfessionalPlan: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('school');
  const [files, setFiles] = useState<any[]>([]);
  const uploadRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'school', label: 'KH TRƯỜNG', icon: 'fa-building-columns' },
    { id: 'group', label: 'KH TỔ CM', icon: 'fa-people-group' },
    { id: 'personal', label: 'KH CÁ NHÂN', icon: 'fa-user-tie' },
    { id: 'program', label: 'PP CHƯƠNG TRÌNH', icon: 'fa-list-check' },
    { id: 'strategy', label: 'SỔ TAY CHIẾN LƯỢC', icon: 'fa-pen-nib' },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile = {
        name: file.name,
        date: new Date().toLocaleDateString('vi-VN'),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        tab: activeTab
      };
      setFiles([newFile, ...files]);
    }
  };

  const filteredFiles = files.filter(f => f.tab === activeTab);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#f0f4f9] animate-in fade-in duration-700 font-sans">
      <input type="file" ref={uploadRef} className="hidden" onChange={handleUpload} />
      
      {/* Header Section */}
      <div className="flex justify-between items-center px-12 py-8 shrink-0">
        <div>
          <button onClick={onBack} className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic flex items-center gap-2 mb-2 group">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> QUAY LẠI DASHBOARD
          </button>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            HỒ SƠ <span className="text-blue-600">CHUYÊN MÔN SỐ</span>
          </h1>
        </div>
        <button 
          onClick={() => uploadRef.current?.click()}
          className="bg-[#0f172a] text-white px-10 py-5 rounded-[2rem] text-[12px] font-black uppercase shadow-2xl italic flex items-center gap-3 border-b-8 border-black transition-all hover:scale-105 active:scale-95"
        >
          <i className="fas fa-cloud-arrow-up text-blue-400"></i> TẢI LÊN HỒ SƠ CHUYÊN MÔN
        </button>
      </div>

      {/* Tabs */}
      <div className="px-12 mb-8 shrink-0">
        <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-200 flex items-center justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 py-5 px-6 rounded-[1.8rem] transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xl font-black italic scale-[1.03]'
                  : 'text-slate-400 hover:bg-slate-50 font-bold'
              }`}
            >
              <i className={`fas ${tab.icon} text-sm`}></i>
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 mx-12 mb-12 bg-white rounded-[4rem] shadow-3d-extreme border border-white relative overflow-hidden flex flex-col p-12">
         <div className="flex justify-between items-center mb-10 shrink-0">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-[#061631]">{tabs.find(t => t.id === activeTab)?.label}</h2>
            <span className="bg-slate-50 px-5 py-2 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest italic">TỔNG CỘNG: {filteredFiles.length} TẬP TIN</span>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
            {filteredFiles.length > 0 ? filteredFiles.map((file, idx) => (
               <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 border border-slate-100">
                        <i className="fas fa-file-invoice text-2xl"></i>
                     </div>
                     <div>
                        <h4 className="text-[13px] font-black text-slate-800 uppercase italic tracking-tight">{file.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase italic">Ngày nạp: {file.date} | Dung lượng: {file.size}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 shadow-sm transition-all"><i className="fas fa-eye"></i></button>
                     <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-sm transition-all"><i className="fas fa-download"></i></button>
                  </div>
               </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 text-center">
                <i className="fas fa-folder-open text-[150px] mb-8"></i>
                <h4 className="text-[14px] font-black uppercase italic tracking-[0.5em]">KHO HỒ SƠ TRỐNG</h4>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ProfessionalPlan;
