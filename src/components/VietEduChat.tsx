import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';

const VietEduChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, time: string}[]>([
    { 
      role: 'ai', 
      text: 'Xin chào Thầy Tùng! Trợ lý AI VietEdu đã sẵn sàng. Thầy cần soạn giáo án hay nhận xét học sinh ạ?', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    setMessages(prev => [...prev, { role: 'user', text: userMsg, time: now }]);
    setInput('');
    setIsLoading(true);

    try {
      const aiReply = await chatWithAI(userMsg);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiReply || 'AI đang suy nghĩ, Thầy đợi chút nhé.', 
        time: now 
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Lỗi kết nối. Thầy kiểm tra lại API Key trên Netlify nhé!', 
        time: now 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[300] font-sans">
      {isOpen ? (
        <div className="bg-[#f0f2f5] w-[400px] h-[600px] rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-20 duration-500">
          <div className="bg-[#0068ff] p-6 flex items-center justify-between text-white shrink-0 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 shadow-inner">
                <i className="fas fa-robot text-white text-2xl"></i>
              </div>
              <div>
                 <span className="text-[14px] font-black block leading-none italic uppercase tracking-tighter">TRỢ LÝ SƯ PHẠM AI</span>
                 <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                    <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest italic">GEMINI ONLINE</span>
                 </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-5 no-scrollbar bg-[#f0f2f5]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-[1.5rem] shadow-sm text-[13px] font-medium leading-relaxed italic ${
                  msg.role === 'user' ? 'bg-[#e7f3ff] text-slate-800 rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/50'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[8px] text-slate-400 mt-2 font-black uppercase tracking-widest px-2 opacity-50">{msg.time}</span>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none border border-slate-200/50 shadow-sm">
                     <div className="flex gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                     </div>
                  </div>
               </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-slate-200 flex flex-col gap-3 shrink-0">
            <div className="flex gap-4 items-center bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Nhập yêu cầu sư phạm..."
                className="flex-1 bg-transparent border-none outline-none text-[13px] py-2 font-bold italic"
              />
              <button onClick={handleSend} disabled={isLoading} className="text-[#0068ff] hover:scale-125 transition-all">
                <i className="fas fa-paper-plane text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-20 h-20 bg-[#0068ff] rounded-3xl shadow-[0_20px_50px_rgba(0,104,255,0.4)] flex items-center justify-center border-4 border-white hover:scale-110 transition-all group relative overflow-hidden transform rotate-6 hover:rotate-0">
          <i className="fas fa-comment-dots text-white text-3xl group-hover:scale-125 transition-transform"></i>
          <div className="absolute top-3 right-3 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
        </button>
      )}
    </div>
  );
};

export default VietEduChat;