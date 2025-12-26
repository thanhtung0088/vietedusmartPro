
import React, { useState, useEffect } from 'react';

interface GameCenterProps {
  onBack: () => void;
}

const GameCenter: React.FC<GameCenterProps> = ({ onBack }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'ready' | 'playing'>('lobby');

  const games = [
    { id: 1, title: 'Thử thách Toán học 6', level: 'Khối 6', type: 'Tính toán', icon: 'fa-plus-minus', color: 'bg-emerald-600', desc: 'Game giải toán nhanh theo CT 2018' },
    { id: 2, title: 'Đố vui Tiếng Anh', level: 'Khối 7', type: 'Từ vựng', icon: 'fa-language', color: 'bg-blue-600', desc: 'Mở rộng vốn từ Unit 1-5' },
    { id: 3, title: 'Hành trình Lịch sử', level: 'THCS', type: 'Nhận biết', icon: 'fa-landmark', color: 'bg-amber-600', desc: 'Ôn tập kiến thức lịch sử địa phương' },
    { id: 4, title: 'Giải mã Sinh học', level: 'Khối 8', type: 'Logic', icon: 'fa-microscope', color: 'bg-red-600', desc: 'Khám phá thế giới tế bào' }
  ];

  const startGame = () => {
    setGameState('playing');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest">
            <i className="fas fa-arrow-left text-[10px]"></i> QUAY LẠI
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Phòng Game học tập</h1>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-1 italic font-bold">Vui học - Sáng tạo - Kịch tính</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full hover:-translate-y-2 duration-500">
            <div className={`${game.color} h-56 flex items-center justify-center text-white text-8xl group-hover:scale-110 transition-transform relative overflow-hidden`}>
              <i className={`fas ${game.icon} drop-shadow-2xl relative z-10`}></i>
              <div className="absolute top-6 right-6 bg-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase border border-white/20 backdrop-blur-md z-10 tracking-widest">{game.type}</div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-300 uppercase block mb-3 tracking-[0.3em] italic">{game.level}</span>
                <h3 className="font-black text-slate-800 mb-6 uppercase italic leading-[1.2] text-lg tracking-tight">{game.title}</h3>
                <p className="text-[11px] text-slate-400 font-bold mb-10 leading-relaxed uppercase tracking-widest">{game.desc}</p>
              </div>
              <button onClick={() => { setPlayingId(game.id); setGameState('ready'); }} className="w-full bg-[#0f172a] text-white py-6 rounded-2xl text-[10px] font-black shadow-2xl shadow-slate-200 uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all italic">KÍCH HOẠT CHƠI NGAY</button>
            </div>
          </div>
        ))}
      </div>

      {playingId && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-5xl h-[750px] rounded-[4rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
            <div className="p-10 bg-white border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 ${games.find(g => g.id === playingId)?.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                  <i className={`fas ${games.find(g => g.id === playingId)?.icon} text-xl`}></i>
                </div>
                <div>
                   <h3 className="font-black text-slate-800 uppercase tracking-[0.2em] text-xs italic">{games.find(g => g.id === playingId)?.title}</h3>
                   <p className="text-[9px] font-black text-slate-300 uppercase mt-1 tracking-[0.3em]">Hệ thống game thực tế chuẩn hóa</p>
                </div>
              </div>
              <button onClick={() => setPlayingId(null)} className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all border border-slate-100"><i className="fas fa-times text-xl"></i></button>
            </div>
            
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-16 relative overflow-hidden">
               {gameState === 'ready' ? (
                 <div className="text-center relative z-10 animate-in fade-in slide-in-from-bottom-8">
                    <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto mb-12 animate-bounce border-[12px] border-slate-50">
                      <i className="fas fa-gamepad text-6xl text-blue-600"></i>
                    </div>
                    <h2 className="text-6xl font-black text-slate-800 mb-8 uppercase italic tracking-tighter">Sẵn sàng giáo viên?</h2>
                    <p className="text-slate-400 mb-16 max-w-md mx-auto text-xs font-black uppercase tracking-[0.4em] leading-relaxed italic">Nội dung game đã tối ưu <br/> theo chương trình GDPT 2018.</p>
                    <button onClick={startGame} className="bg-emerald-600 text-white px-20 py-7 rounded-[2.5rem] font-black shadow-2xl shadow-emerald-200 text-2xl uppercase tracking-[0.3em] transition-all hover:scale-110 active:scale-95 italic">BẮT ĐẦU VÒNG 1</button>
                 </div>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-1000">
                    <div className="bg-white p-16 rounded-[4rem] shadow-2xl border border-slate-100 max-w-3xl w-full text-center relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                       <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.6em] mb-12 italic">Câu hỏi thử thách số 1</p>
                       <h3 className="text-4xl font-black text-slate-800 mb-16 italic leading-[1.3] uppercase tracking-tighter">Phần tử nào sau đây thuộc về tập hợp các số tự nhiên N?</h3>
                       <div className="grid grid-cols-2 gap-8">
                          {['A. Số âm (-1)', 'B. Số không (0)', 'C. Số thập phân (1.5)', 'D. Phân số (2/3)'].map(opt => (
                            <button key={opt} className="bg-slate-50 border-4 border-slate-100 py-8 rounded-[2rem] font-black text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all text-xl uppercase italic tracking-tight">{opt}</button>
                          ))}
                       </div>
                    </div>
                 </div>
               )}
               
               {/* Decorative background elements */}
               <div className="absolute top-10 left-10 opacity-5 -rotate-12 pointer-events-none"><i className="fas fa-atom text-[20rem]"></i></div>
               <div className="absolute bottom-10 right-10 opacity-5 rotate-12 pointer-events-none"><i className="fas fa-brain text-[20rem]"></i></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCenter;
