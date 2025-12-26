
import React, { useState } from 'react';

interface VideoHubProps {
  onBack: () => void;
}

const VideoHub: React.FC<VideoHubProps> = ({ onBack }) => {
  const [videos, setVideos] = useState<{name: string, url: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const url = URL.createObjectURL(file);
      setTimeout(() => {
        setVideos([...videos, { name: file.name, url }]);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest">
            <i className="fas fa-arrow-left text-[10px]"></i> QUAY LẠI
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tighter italic">Video Bài giảng Thật</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1 font-bold italic leading-none">Học liệu số trực quan - Không dữ liệu ảo</p>
        </div>
      </div>

      <div className="bg-white p-16 rounded-[3.5rem] border border-gray-100 shadow-sm text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
        <label className="cursor-pointer group">
          {/* Fix: changed onChange={handleFile} to onChange={handleUpload} as handleFile was not defined */}
          <input type="file" accept="video/*" className="hidden" onChange={handleUpload} />
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-blue-100">
               {isUploading ? <i className="fas fa-spinner animate-spin text-3xl"></i> : <i className="fas fa-cloud-arrow-up text-3xl"></i>}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 uppercase italic tracking-tighter leading-none">Lưu trữ video bài giảng cá nhân</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto font-bold uppercase tracking-widest leading-relaxed">Hãy tải lên những bài giảng thực tế của Thầy/Cô <br/> để xây dựng kho học liệu số riêng biệt.</p>
            <span className="mt-10 inline-block bg-[#0f172a] text-white px-12 py-5 rounded-[1.5rem] font-black text-xs shadow-2xl uppercase tracking-[0.3em] italic hover:bg-blue-600 transition-all">CHỌN TỆP VIDEO NGAY</span>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((vid, idx) => (
          <div key={idx} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all border-b-8 border-b-slate-100 hover:border-b-blue-600">
            <div className="aspect-video bg-black relative">
              <video controls className="w-full h-full object-cover">
                <source src={vid.url} type="video/mp4" />
              </video>
            </div>
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-[0.2em] italic">Official Lecture</p>
                <p className="font-black text-slate-800 text-sm truncate max-w-[180px] uppercase tracking-tight">{vid.name}</p>
              </div>
              <a href={vid.url} download={vid.name} className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100">
                 <i className="fas fa-download text-lg"></i>
              </a>
            </div>
          </div>
        ))}
        {videos.length === 0 && !isUploading && (
           <div className="lg:col-span-3 py-32 flex flex-col items-center justify-center text-slate-200 border-4 border-dashed border-slate-100 rounded-[4rem]">
              <i className="fas fa-video-slash text-7xl mb-10 opacity-10"></i>
              <p className="text-xs font-black uppercase tracking-[0.5em] opacity-30">Kho video hiện đang an toàn</p>
              <p className="text-[10px] mt-4 font-bold italic uppercase opacity-20">Hãy bắt đầu tải lên bài giảng đầu tiên</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default VideoHub;
