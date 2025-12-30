
import React, { useState } from 'react';

const GameCenter: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'ready' | 'playing'>('lobby');

  const games = [
    { id: 1, title: 'TOÁN HỌC 4.0', level: 'KHỐI 6-9', type: 'LOGIC', icon: 'fa-plus-minus', color: 'from-emerald-500 to-emerald-700', desc: 'Thử thách giải toán nhanh đa cấp độ' },
    { id: 2, title: 'TỪ VỰNG ANH NGỮ', level: 'KHỐI 6-9', type: 'VĂN HÓA', icon: 'fa-language', color: 'from-blue-500 to-blue-700', desc: 'Xây dựng vốn từ vựng chuẩn Cambridge' },
    { id: 3, title: 'CHINH PHỤC LỊCH SỬ', level: 'KHỐI 6-9', type: 'KIẾN THỨC', icon: 'fa-landmark', color: 'from-amber-500 to-orange-700', desc: 'Hành trình xuyên không qua các thời đại' },
    { id: 4, title: 'BẢN ĐỒ SINH HỌC', level: 'KHỐI 6-9', type: 'KHÁM PHÁ', icon: 'fa-dna', color: 'from-rose-500 to-rose-700', desc: 'Khám phá thế giới tế bào & gen' }
  ];

  return (
    <div className="max-w-[1550px] mx-auto h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10 pt-4 shrink-0 px-4">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic mb-1 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i> QUAY LẠI
          </button>
          <h1 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">
            GAME <span className="text-emerald-600">HỌC TẬP</span>
          </h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic mt-2">HỌC MÀ CHƠI - KHƠI NGUỒN SÁNG TẠO</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 flex-1 min-h-0 px-4 mb-10">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-3d-extreme overflow-hidden flex flex-col group hover:-translate-y-3 transition-all duration-500">
            <div className={`h-[220px] bg-gradient-to-br ${game.color} flex items-center justify-center text-white relative overflow-hidden`}>
              <i className={`fas ${game.icon} text-8xl drop-shadow-2xl opacity-80 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700`}></i>
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20">
                {game.type}
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] italic block mb-3">{game.level}</span>
                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-4 leading-tight">{game.title}</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase italic tracking-widest leading-relaxed">{game.desc}</p>
              </div>
              <button 
                onClick={() => { setPlayingId(game.id); setGameState('ready'); }}
                className={`w-full bg-gradient-to-r ${game.color} text-white py-5 rounded-2xl font-black text-[10px] uppercase italic tracking-[0.3em] shadow-xl hover:scale-105 transition-all mt-8`}
              >
                KÍCH HOẠT TRÒ CHƠI
              </button>
            </div>
          </div>
        ))}
      </div>

      {playingId && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-10 animate-in fade-in">
          <div className="bg-white w-full max-w-6xl h-full rounded-[4rem] overflow-hidden flex flex-col shadow-2xl relative">
            <button onClick={() => setPlayingId(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all z-20"><i className="fas fa-times"></i></button>
            <div className="flex-1 bg-[#061631] flex flex-col items-center justify-center text-center p-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                </div>
                
                {gameState === 'ready' ? (
                    <div className="animate-in zoom-in-95 duration-700 relative z-10">
                        <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl mb-12 shadow-2xl animate-bounce shadow-emerald-500/50 mx-auto">
                            <i className="fas fa-play"></i>
                        </div>
                        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">SẴN SÀNG CHƯA?</h2>
                        <p className="text-blue-400 text-xs font-black uppercase tracking-[0.6em] mb-16 italic">THỬ THÁCH KIẾN THỨC LAB SỐ 4.0</p>
                        <button onClick={() => setGameState('playing')} className="bg-white text-[#061631] px-20 py-7 rounded-[2rem] font-black text-2xl uppercase italic shadow-2xl hover:scale-110 active:scale-95 transition-all">BẮT ĐẦU NGAY</button>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl animate-in fade-in duration-500 relative z-10">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-16 rounded-[3rem] shadow-2xl">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.8em] mb-10 italic">CÂU HỎI THỬ THÁCH SỐ 1</p>
                           <h3 className="text-4xl font-black text-white uppercase italic leading-tight tracking-tighter mb-16">Trong hệ điều hành, đâu là thành phần cốt lõi điều khiển toàn bộ phần cứng?</h3>
                           <div className="grid grid-cols-2 gap-8">
                               {['Kernel (Nhân)', 'Shell (Vỏ)', 'User Interface', 'Drivers'].map((opt, i) => (
                                   <button key={i} className="bg-white/5 border-2 border-white/10 py-8 rounded-[2rem] font-black text-white/70 text-xl uppercase italic hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all tracking-tight">{opt}</button>
                               ))}
                           </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCenter;
