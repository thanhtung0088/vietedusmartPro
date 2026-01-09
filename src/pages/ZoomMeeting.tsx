
import React, { useState, useEffect, useRef } from 'react';

const ZoomMeeting: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [meetingTime, setMeetingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [requireLogin, setRequireLogin] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setMeetingTime(prev => prev + 1), 1000);
    return () => {
      clearInterval(timer);
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  useEffect(() => {
    if (videoOn && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoOn, stream]);

  const toggleVideo = async () => {
    if (videoOn) {
      if (stream) stream.getTracks().forEach(track => track.stop());
      setVideoOn(false);
      setStream(null);
    } else {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        setVideoOn(true);
        setMicOn(true);
      } catch (err) { alert("Thầy hãy cấp quyền camera cho trình duyệt để tham gia phòng họp."); }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#0a0a0a] flex flex-col font-sans overflow-hidden animate-in fade-in duration-500">
      <div className="h-24 bg-black flex items-center justify-between px-16 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-12">
          <h2 className="text-white text-[15px] font-black uppercase italic tracking-[0.2em] leading-none">PHÒNG HỌP SƯ PHẠM SỐ v4.0</h2>
          <div className="flex gap-5">
            <button onClick={() => setIsLocked(!isLocked)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all flex items-center gap-4 border ${isLocked ? 'bg-rose-600 text-white border-rose-500 shadow-2xl' : 'bg-white/5 text-emerald-400 border-emerald-400/30'}`}>
              <i className={`fas ${isLocked ? 'fa-lock' : 'fa-unlock-alt'}`}></i>{isLocked ? 'ĐÃ KHÓA PHÒNG' : 'PHÒNG ĐANG MỞ'}
            </button>
            <button onClick={() => setRequireLogin(!requireLogin)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all flex items-center gap-4 border ${requireLogin ? 'bg-blue-600 text-white border-blue-500 shadow-2xl' : 'bg-white/5 text-slate-400 border-slate-700'}`}>
              <i className={`fas ${requireLogin ? 'fa-shield-halved' : 'fa-door-open'}`}></i>{requireLogin ? 'YÊU CẦU ĐĂNG NHẬP' : 'TỰ DO THAM GIA'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-10">
           <div className="bg-white/10 px-10 py-4 rounded-full text-white font-mono text-2xl font-bold shadow-inner border border-white/5">{formatTime(meetingTime)}</div>
           <button onClick={onBack} className="bg-rose-600 text-white px-12 py-4 rounded-[1.8rem] text-[12px] font-black uppercase italic border-b-8 border-rose-900 active:scale-95 transition-all shadow-3xl">KẾT THÚC HỌP</button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-16 bg-[#0f0f0f] relative">
        <div className="w-full h-full max-w-[1400px] aspect-video bg-[#000] rounded-[5rem] border-4 border-white/5 shadow-[0_0_150px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden transition-all duration-1000">
            {videoOn ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover animate-in fade-in" 
                style={{ transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)' }}
              />
            ) : (
              <div className="flex flex-col items-center opacity-30 text-center animate-pulse px-20">
                <i className="fa-solid fa-video-slash text-[150px] text-slate-500 mb-12"></i>
                <h4 className="text-white text-xl font-black uppercase italic tracking-[0.5em] mb-12 leading-relaxed">SẴN SÀNG THAM GIA<br/>PHÒNG HỌP TRỰC TUYẾN</h4>
                <button onClick={toggleVideo} className="bg-blue-600 text-white px-16 py-6 rounded-[3rem] text-[15px] font-black uppercase italic shadow-3xl hover:scale-110 transition-all border-b-8 border-black/30">MỞ CAMERA & MICRO</button>
              </div>
            )}
            {videoOn && (
              <div className="absolute bottom-12 left-12 bg-black/60 backdrop-blur-2xl px-10 py-5 rounded-[2.5rem] text-white text-[13px] font-black uppercase italic border border-white/10 flex items-center gap-5 shadow-3xl">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,1)]"></div>BẠN (GIÁO VIÊN CHỦ TRÌ)
              </div>
            )}
        </div>
      </div>

      <div className="h-40 bg-black flex items-center justify-center gap-16 shrink-0 border-t border-white/5 relative z-10">
         <button onClick={() => setMicOn(!micOn)} className={`w-24 h-24 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 transition-all shadow-3xl ${micOn ? 'bg-blue-600 text-white scale-110 border-b-4 border-blue-900' : 'bg-rose-600 text-white border-b-8 border-rose-900 active:translate-y-2'}`}>
            <i className={`fa-solid ${micOn ? 'fa-microphone text-3xl' : 'fa-microphone-slash text-3xl'}`}></i>
         </button>
         <button onClick={toggleVideo} className={`w-24 h-24 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 transition-all shadow-3xl ${videoOn ? 'bg-blue-600 text-white scale-110 border-b-4 border-blue-900' : 'bg-rose-600 text-white border-b-8 border-rose-900 active:translate-y-2'}`}>
            <i className={`fa-solid ${videoOn ? 'fa-video text-3xl' : 'fa-video-slash text-3xl'}`}></i>
         </button>
         <div className="w-px h-24 bg-white/10 mx-8"></div>
         <button className="w-24 h-24 rounded-[2.5rem] bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-2xl border border-white/5 hover:scale-110"><i className="fa-solid fa-desktop text-3xl"></i></button>
         <button className="w-24 h-24 rounded-[2.5rem] bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-2xl border border-white/5 hover:scale-110"><i className="fa-solid fa-users text-3xl"></i></button>
         <button className="w-24 h-24 rounded-[2.5rem] bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center shadow-2xl border border-white/5 hover:scale-110"><i className="fa-solid fa-face-smile text-3xl"></i></button>
      </div>
    </div>
  );
};

export default ZoomMeeting;
