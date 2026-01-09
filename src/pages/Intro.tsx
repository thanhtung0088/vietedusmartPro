
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const Intro: React.FC<{onBack: () => void, userPlan: 'BASIC' | 'PRO', onUpgrade: () => void}> = ({ onBack, userPlan, onUpgrade }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [quotaError, setQuotaError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const heroSlides = [
    {
      title: "HỆ SINH THÁI VIETEDU SMART",
      subtitle: "KỶ NGUYÊN GIÁO DỤC SỐ 4.0",
      desc: "Nền tảng trợ lý AI toàn năng được thiết kế riêng cho đặc thù sư phạm và quy định của Bộ Giáo dục Việt Nam.",
      ttsPrompt: "Chào mừng quý Thầy Cô đến với hệ sinh thái VietEdu Smart, kỷ nguyên giáo dục số 4.0, nền tảng trợ lý AI toàn năng cho sư phạm Việt Nam.",
      img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop",
      tag: "OVERVIEW"
    },
    {
      title: "SOẠN GIẢNG AI CHUẨN 5512",
      subtitle: "GIẢM 90% THỜI GIAN SOẠN BÀI",
      desc: "Tự động tạo Kế hoạch bài dạy chuẩn cấu trúc Công văn 5512 chỉ với từ khóa tên bài học.",
      ttsPrompt: "Với VietEdu Smart, việc soạn giáo án chuẩn 5512 giờ đây chỉ còn tính bằng giây. Giảm ngay 90% thời gian lao động sư phạm vất vả.",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
      tag: "AI ASSISTANT"
    },
    {
      title: "THIẾT KẾ ĐỀ THI CHUẨN 7991",
      subtitle: "MA TRẬN ĐỀ TỰ ĐỘNG",
      desc: "Khởi tạo đề kiểm tra định kỳ kèm ma trận đặc tả chuẩn Thông tư 7991 một cách khoa học và chính xác.",
      ttsPrompt: "Hỗ trợ xây dựng ma trận đề và đặc tả chuẩn thông tư 7991 một cách tự động, đảm bảo tính khách quan và khoa học trong đánh giá.",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      tag: "ASSESSMENT"
    }
  ];

  useEffect(() => {
    let timer: any;
    if (isPlayingAudio && !quotaError) {
      timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 12000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, quotaError]);

  useEffect(() => {
    if (isPlayingAudio && !quotaError) {
      handleTTS(heroSlides[currentSlide].ttsPrompt);
    }
  }, [currentSlide, isPlayingAudio]);

  const stopAllAudio = () => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
        currentSourceRef.current.disconnect();
      } catch (e) {}
      currentSourceRef.current = null;
    }
  };

  const handleTTS = async (text: string) => {
    stopAllAudio();
    if (quotaError) return;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Đọc truyền cảm, ấm áp: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Duy nhất 1 giọng đọc Kore
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio && isPlayingAudio) {
        playPcmAudio(base64Audio);
      }
    } catch (e: any) {
      console.error("TTS Error details:", e);
      const errorStr = e.message || String(e);
      // Xử lý lỗi quota 429 Resource Exhausted
      if (errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("quota")) {
        setQuotaError("Hết hạn mức AI (Lỗi 429). Thầy hãy đổi API Key dự án trả phí (có bật Billing) để tiếp tục dùng TTS.");
        setIsPlayingAudio(false);
        if (bgMusicRef.current) bgMusicRef.current.pause();
      } else if (errorStr.includes("Requested entity was not found")) {
        setQuotaError("API Key hiện tại không hợp lệ. Thầy hãy chọn lại Key mới.");
        setIsPlayingAudio(false);
      }
    }
  };

  const playPcmAudio = async (base64: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();

      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      currentSourceRef.current = source;
      source.start();
    } catch (err) {
      console.error("Audio Play Error:", err);
    }
  };

  const startPresentation = () => {
    setQuotaError(null);
    setIsPlayingAudio(true);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.1;
      bgMusicRef.current.play().catch(console.error);
    }
    handleTTS(heroSlides[currentSlide].ttsPrompt);
  };

  const stopPresentation = () => {
    setIsPlayingAudio(false);
    stopAllAudio();
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  };

  const handleSelectNewKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setQuotaError(null); // Reset lỗi sau khi chọn key mới
      alert("Đã ghi nhận Key mới. Thầy có thể nhấn 'Bắt đầu thuyết trình' lại.");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-8 animate-in fade-in duration-1000 overflow-x-hidden relative bg-[#f8fafc]">
      <audio ref={bgMusicRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      
      <div className="flex justify-between items-center mb-16 relative z-50 px-2">
        <button onClick={onBack} className="text-sm font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest italic transition-all group bg-white px-8 py-4 rounded-3xl border border-slate-200 shadow-sm">
            <i className="fas fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> TRỞ VỀ DASHBOARD
        </button>
        <div className="flex items-center gap-6">
           {quotaError && (
             <div className="bg-rose-50 border border-rose-200 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl border-l-8 border-l-rose-500 animate-pulse">
                <i className="fas fa-exclamation-triangle text-rose-500"></i>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-rose-700 uppercase italic leading-tight">{quotaError}</p>
                  <p className="text-[8px] text-rose-400 font-bold uppercase tracking-widest mt-1 italic">Vui lòng kiểm tra lại cấu hình Billing tại ai.google.dev</p>
                </div>
                <button onClick={handleSelectNewKey} className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase italic shadow-lg shrink-0 hover:bg-rose-700 active:scale-95 transition-all">ĐỔI API KEY</button>
             </div>
           )}

           {isPlayingAudio ? (
              <button 
                onClick={stopPresentation}
                className="flex items-center gap-4 px-8 py-4 rounded-full font-black text-[11px] uppercase italic tracking-widest bg-rose-600 text-white shadow-xl hover:bg-rose-700 transition-all border border-rose-700"
              >
                <i className="fa-solid fa-stop"></i>
                NGẮT THUYẾT TRÌNH
              </button>
           ) : (
              <button 
                onClick={startPresentation}
                className="flex items-center gap-4 px-8 py-4 rounded-full font-black text-[11px] uppercase italic tracking-widest bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <i className="fa-solid fa-play"></i>
                BẮT ĐẦU THUYẾT TRÌNH AI
              </button>
           )}
           
           {userPlan === 'BASIC' && (
             <button 
              onClick={onUpgrade}
              className="bg-[#061631] text-blue-400 px-10 py-5 rounded-[2.5rem] font-black text-[12px] uppercase italic tracking-[0.3em] shadow-2xl border-b-8 border-black hover:bg-black hover:scale-105 transition-all flex items-center gap-4"
             >
              <i className="fas fa-crown text-amber-400"></i> KÍCH HOẠT PRO ACCESS
             </button>
           )}
        </div>
      </div>

      <div className="relative w-full h-[700px] rounded-[5rem] overflow-hidden shadow-3xl bg-black mb-32 border-[12px] border-white group/slider">
         {heroSlides.map((slide, idx) => (
           <div 
             key={idx} 
             className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out transform ${
               idx === currentSlide ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-1 pointer-events-none'
             }`}
           >
              <div className="absolute inset-0">
                 <img src={slide.img} className="w-full h-full object-cover" alt={slide.title} />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#061631] via-[#061631]/70 to-transparent"></div>
              </div>

              <div className="relative h-full flex flex-col justify-center px-32 max-w-5xl space-y-10">
                 <div className="animate-in slide-in-from-left-20 duration-1000 delay-300">
                    <span className="inline-block bg-blue-600 text-white px-10 py-3 rounded-full text-[13px] font-black uppercase tracking-[0.5em] italic mb-8 shadow-xl">
                       {slide.tag}
                    </span>
                    <h1 className="text-7xl font-black text-white uppercase italic leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
                       {slide.title}
                    </h1>
                    <h2 className="text-2xl font-black text-blue-200 uppercase italic tracking-widest mb-10 opacity-80">{slide.subtitle}</h2>
                    <p className="text-xl font-bold text-white/60 italic leading-relaxed border-l-8 border-blue-600 pl-10 max-w-2xl">
                       "{slide.desc}"
                    </p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div id="pricing-section" className="text-center mb-24">
         <h2 className="text-5xl font-black text-[#061631] uppercase italic tracking-tighter mb-16 leading-none">TỔNG QUAN <span className="text-blue-600">VIETEDU SMART</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="p-12 rounded-[4rem] bg-white border-2 border-slate-100 shadow-xl flex flex-col items-center">
               <i className="fas fa-magic text-4xl text-blue-600 mb-8"></i>
               <h3 className="text-xl font-black text-slate-800 uppercase italic mb-4">Soạn thảo 5512</h3>
               <p className="text-xs font-bold text-slate-400 italic">Tiết kiệm 90% thời gian lao động sư phạm thủ công.</p>
            </div>
            <div className="p-12 rounded-[4rem] bg-white border-2 border-slate-100 shadow-xl flex flex-col items-center">
               <i className="fas fa-chart-line text-4xl text-emerald-600 mb-8"></i>
               <h3 className="text-xl font-black text-slate-800 uppercase italic mb-4">Ma trận đề 7991</h3>
               <p className="text-xs font-bold text-slate-400 italic">Đánh giá chính xác, khách quan năng lực học sinh.</p>
            </div>
            <div className="p-12 rounded-[4rem] bg-white border-2 border-slate-100 shadow-xl flex flex-col items-center">
               <i className="fas fa-gamepad text-4xl text-rose-600 mb-8"></i>
               <h3 className="text-xl font-black text-slate-800 uppercase italic mb-4">Game Center Pro</h3>
               <p className="text-xs font-bold text-slate-400 italic">Tăng cường trải nghiệm học tập qua trò chơi trí tuệ.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Intro;
