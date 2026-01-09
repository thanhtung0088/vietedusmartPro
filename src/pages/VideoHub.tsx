
import React, { useState, useEffect } from 'react';

interface VideoFile {
  id: string;
  name: string;
  url: string;
  date: string;
  subject: string;
}

const VideoHub: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [activeVideo, setActiveVideo] = useState<VideoFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vietedu_videos_store_real');
    if (saved) setVideos(JSON.parse(saved));
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const newVid = {
          id: Date.now().toString(),
          name: file.name,
          url: url,
          date: new Date().toLocaleDateString('vi-VN'),
          subject: 'BÀI GIẢNG SỐ'
        };
        const updated = [newVid, ...videos];
        setVideos(updated);
        localStorage.setItem('vietedu_videos_store_real', JSON.stringify(updated));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteVideo = (id: string) => {
    if (confirm("Xóa video này?")) {
      const updated = videos.filter(v => v.id !== id);
      setVideos(updated);
      localStorage.setItem('vietedu_videos_store_real', JSON.stringify(updated));
      if (activeVideo?.id === id) setActiveVideo(null);
    }
  };

  return (
    <div className="max-w-[1580px] mx-auto h-[calc(100vh-48px)] flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-8 shrink-0 px-2">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic mb-1 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i> QUAY LẠI
          </button>
          <h1 className="text-3xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">TRÌNH PHÁT <span className="text-fuchsia-600">BÀI GIẢNG SỐ</span></h1>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] italic mt-1">XEM VÀ QUẢN LÝ VIDEO DẠY HỌC THỰC TẾ</p>
        </div>
        <label className="bg-fuchsia-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-xl cursor-pointer hover:scale-105 transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 border border-white/20 shrink-0">
          <input type="file" accept="video/*" className="hidden" onChange={handleUpload} />
          {isUploading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
          TẢI LÊN VIDEO BÀI GIẢNG
        </label>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 pb-6 px-2">
        {/* Player chính */}
        <div className="col-span-8 bg-[#061631] rounded-[3rem] overflow-hidden flex items-center justify-center relative shadow-3d-extreme border-4 border-white/5">
          {activeVideo ? (
            <video key={activeVideo.id} controls autoPlay className="w-full h-full object-contain">
              <source src={activeVideo.url} type="video/mp4" />
              Trình duyệt không hỗ trợ.
            </video>
          ) : (
            <div className="flex flex-col items-center opacity-20">
              <i className="fas fa-play-circle text-9xl text-white mb-6"></i>
              <p className="text-white font-black uppercase italic tracking-widest">Chọn một bài giảng để phát</p>
            </div>
          )}
        </div>

        {/* Danh sách Playlist */}
        <div className="col-span-4 flex flex-col h-full bg-white rounded-[2.5rem] shadow-3d-extreme border border-slate-200 overflow-hidden">
           <div className="p-6 bg-slate-50 border-b flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black text-slate-800 uppercase italic tracking-widest">DANH SÁCH BÀI GIẢNG</span>
              <span className="text-[10px] font-black text-blue-600 italic uppercase">{videos.length} VIDEO</span>
           </div>
           <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
              {videos.length > 0 ? videos.map((vid) => (
                <div key={vid.id} className={`p-4 rounded-[1.8rem] border flex items-center gap-4 transition-all group cursor-pointer ${activeVideo?.id === vid.id ? 'bg-blue-50 border-blue-400' : 'bg-white border-slate-100 hover:border-blue-200'}`} onClick={() => setActiveVideo(vid)}>
                   <div className="w-20 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg relative overflow-hidden">
                      <i className="fas fa-video text-xs opacity-50"></i>
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <i className="fas fa-play text-[10px]"></i>
                      </div>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-black text-slate-800 uppercase italic leading-tight truncate mb-1">{vid.name}</h4>
                      <p className="text-[8px] font-bold text-slate-400 uppercase italic">{vid.date}</p>
                   </div>
                   <button onClick={(e) => { e.stopPropagation(); deleteVideo(vid.id); }} className="w-8 h-8 rounded-full hover:bg-rose-50 hover:text-rose-500 text-slate-200 transition-all flex items-center justify-center">
                      <i className="fas fa-trash-alt text-[10px]"></i>
                   </button>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center py-20 opacity-10 text-center">
                   <i className="fas fa-film text-6xl mb-4"></i>
                   <p className="text-[10px] font-black uppercase italic tracking-widest">Thầy chưa có video nào</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHub;
