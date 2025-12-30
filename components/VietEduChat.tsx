
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';

const ROBOT_3D_AVATAR = "https://img.freepik.com/premium-photo/3d-robot-with-white-face-smile-is-wearing-blue-headphones_1029473-10020.jpg";

const VietEduChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Chào Thầy! Em đã sẵn sàng hỗ trợ soạn bài và kế hoạch giảng dạy ạ! 🤖🎧' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await chatWithAI(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response || 'Dữ liệu đang được xử lý ạ!' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Thầy vui lòng kiểm tra kết nối API ạ.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="glass-3d-premium w-[320px] h-[480px] rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] flex flex-col border border-white/80 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-[#061631] p-4 flex items-center justify-between text-white shadow-xl relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-3xl"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border-2 border-blue-400/50 overflow-hidden">
                <img src={ROBOT_3D_AVATAR} alt="AI" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <h3 className="font-black text-[9px] uppercase tracking-widest italic leading-none">TRỢ LÝ MINI</h3>
                <span className="text-[7px] font-bold text-emerald-400 uppercase italic">Online 24/7</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all opacity-40">
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-white/5 backdrop-blur-3xl no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-4 rounded-[1.8rem] text-[12px] font-bold leading-relaxed shadow-md ${
                  msg.role === 'user' ? 'bg-[#061631] text-white rounded-tr-none' : 'glass-3d-premium text-slate-800 rounded-tl-none italic border border-white/40'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="glass-3d-premium p-3 rounded-[1.5rem] rounded-tl-none flex gap-2 items-center border border-white">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 glass-3d-premium border-t border-white/50 flex gap-2 backdrop-blur-3xl bg-white/20 shrink-0">
            <input 
              value={input} onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Thầy cần em giúp gì ạ?" 
              className="flex-1 bg-white/60 rounded-[1.2rem] px-4 py-2.5 text-[11px] font-bold text-slate-700 outline-none placeholder-slate-400 italic border border-white shadow-inner focus:bg-white transition-all" 
            />
            <button onClick={handleSend} disabled={isLoading} className="w-10 h-10 bg-[#061631] text-blue-400 rounded-xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all">
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-[20px] opacity-20 group-hover:opacity-60 transition-opacity"></div>
          <div className="bg-[#061631] w-[70px] h-[70px] rounded-[1.8rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all relative z-10 border-4 border-white overflow-hidden animate-float-ui">
            <img src={ROBOT_3D_AVATAR} alt="AI" className="w-full h-full object-cover scale-125" />
            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default VietEduChat;
