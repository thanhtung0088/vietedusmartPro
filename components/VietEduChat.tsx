import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';

const VietEduChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Chào Thầy Tùng! Tôi là Trợ lý AI VietEdu. Hôm nay Thầy cần tôi hỗ trợ soạn bài hay phân tích dữ liệu lớp học nào ạ?' }
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
      setMessages(prev => [...prev, { role: 'ai', text: response || 'Lỗi kết nối AI.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Vui lòng kiểm tra lại kết nối hoặc API Key.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-xl w-[400px] h-[600px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col border border-white overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div className="bg-[#061631] p-6 flex items-center justify-between text-white border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-sparkles text-lg animate-pulse"></i>
              </div>
              <div>
                <h3 className="font-black text-[11px] uppercase tracking-widest italic">TRỢ LÝ AI VIETEDU</h3>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sẵn sàng hỗ trợ</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <i className="fas fa-times text-xs opacity-50"></i>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[12px] font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-[#061631] text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none italic'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
            <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 flex items-center border border-transparent focus-within:border-blue-500/20 focus-within:bg-white transition-all">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Hỏi trợ lý về soạn giảng..." className="bg-transparent flex-1 text-[11px] font-bold text-slate-700 outline-none placeholder-slate-400" />
            </div>
            <button onClick={handleSend} disabled={isLoading} className="w-12 h-12 bg-[#061631] text-[#ff9800] rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
              <i className="fas fa-wand-magic-sparkles text-lg"></i>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="bg-[#061631] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative z-10 border border-white/10">
            <i className="fas fa-sparkles text-2xl text-[#ff9800]"></i>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
               <span className="text-[8px] font-black">AI</span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default VietEduChat;