
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

  useEffect(() => {
    const saved = localStorage.getItem('vietedu_proplan');
    if (saved) setFiles(JSON.parse(saved));
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
    { id: 'personal', label: 'KH CÁ NHÂN', icon: 'fa-user-tie' },
    { id: 'ppct', label: 'PHÂN PHỐI CT', icon: 'fa-list-check' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest"><i className="fas fa-arrow-left mr-2"></i> Quay lại</button>
        <label className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black shadow-xl cursor-pointer hover:bg-black transition-all uppercase text-[10px] tracking-widest flex items-center gap-3">
          <input type="file" className="hidden" onChange={handleUpload} />
          {isUploading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
          Tải lên hồ sơ số
        </label>
      </div>

      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg italic' : 'text-slate-400 hover:bg-slate-50'}`}>
            <i className={`fas ${tab.icon} mr-2`}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl min-h-[500px] card-3d relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <i className="fas fa-folder-tree text-[15rem]"></i>
         </div>
         {files.filter(f => f.category === activeTab).length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {files.filter(f => f.category === activeTab).map(file => (
                <div key={file.id} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group hover:border-blue-200 hover:bg-white transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><i className="fas fa-file-contract"></i></div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase italic truncate max-w-[200px]">{file.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{file.date}</p>
                    </div>
                  </div>
                  <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50"><i className="fas fa-trash"></i></button>
                </div>
              ))}
           </div>
         ) : (
           <div className="h-full flex flex-col items-center justify-center py-24 text-center">
              <i className="fas fa-inbox text-7xl text-slate-100 mb-8"></i>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Hồ sơ lưu trữ trống</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default ProfessionalPlan;
