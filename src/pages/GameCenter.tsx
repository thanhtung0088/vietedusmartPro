import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const GameCenter: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'ready' | 'playing' | 'result'>('lobby');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const games = [
    { id: 1, title: 'TOÁN HỌC 4.0', level: 'KHỐI 6-12', type: 'LOGIC', icon: 'fa-calculator', color: 'from-cyan-400 via-blue-500 to-indigo-600', shadow: 'shadow-cyan-500/50', accent: 'text-cyan-400', desc: 'Thử thách giải toán nhanh đa cấp độ ứng dụng tư duy máy tính.' },
    { id: 2, title: 'ANH NGỮ SỐ', level: 'KHỐI 6-12', type: 'VĂN HÓA', icon: 'fa-language', color: 'from-fuchsia-500 via-purple-600 to-violet-800', shadow: 'shadow-fuchsia-500/50', accent: 'text-fuchsia-400', desc: 'Xây dựng vốn từ vựng chuẩn Cambridge qua các tình huống thực tế.' },
    { id: 3, title: 'LỊCH SỬ VIỆT NAM', level: 'KHỐI 6-12', type: 'KIẾN THỨC', icon: 'fa-fort-awesome', color: 'from-orange-400 via-red-500 to-rose-700', shadow: 'shadow-orange-500/50', accent: 'text-orange-400', desc: 'Hành trình khám phá lịch sử hào hùng qua các thời đại hào kiệt.' },
    { id: 4, title: 'SINH HỌC DIỆU KỲ', level: 'KHỐI 6-12', type: 'KHÁM PHÁ', icon: 'fa-microscope', color: 'from-emerald-400 via-teal-500 to-green-700', shadow: 'shadow-emerald-500/50', accent: 'text-emerald-400', desc: 'Khám phá bí mật của sự sống, tế bào và di truyền học Lab Số.' }
  ];

  const quizData: Record<number, Question[]> = {
    1: [{ question: "Nếu 2x + 5 = 15, giá trị của x là bao nhiêu?", options: ["5", "10", "4", "2"], correct: 0 }, { question: "Số nào là số nguyên tố chẵn duy nhất?", options: ["0", "2", "4", "6"], correct: 1 }],
    2: [{ question: "What is the past tense of 'Go'?", options: ["Goed", "Went", "Gone", "Going"], correct: 1 }, { question: "Synonym for 'Intelligent'?", options: ["Smart", "Dull", "Slow", "Angry"], correct: 0 }],
    3: [{ question: "Ai là vị vua đầu tiên của nước ta?", options: ["Kinh Dương Vương", "Hùng Vương", "An Dương Vương", "Ngô Quyền"], correct: 0 }, { question: "Chiến thắng Điện Biên Phủ vào năm nào?", options: ["1945", "1954", "1975", "1968"], correct: 1 }],
    4: [{ question: "Đơn vị cơ bản của sự sống là gì?", options: ["Nguyên tử", "Tế bào", "Phân tử", "Mô"], correct: 1 }, { question: "DNA nằm ở đâu trong tế bào?", options: ["Ty thể", "Lưới nội chất", "Nhân tế bào", "Ribosome"], correct: 2 }]
  };

  const handleStartGame = (id: number) => {
    setPlayingId(id);
    setGameState('ready');
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback(null);
  };

  const handleAnswer = (index: number) => {
    if (feedback !== null) return;
    const isCorrect = index === quizData[playingId!][currentQuestionIndex].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < quizData[playingId!].length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
      else setGameState('result');
    }, 1000);
  };

  return (
    <div className="h-screen w-full bg-[#050816] flex flex-col overflow-hidden text-white selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-12 py-10 shrink-0">
        <div>
          <button onClick={onBack} className="group text-[11px] font-black text-slate-400 hover:text-white uppercase tracking-[0.3em] italic mb-3 flex items-center gap-2 transition-all">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO DASHBOARD
          </button>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
            GAME <span className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">CENTER</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Player</p>
            <p className="text-sm font-black italic text-indigo-400">THẦY TÙNG PRO</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-user text-white"></i>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-12 pb-12 overflow-y-auto no-scrollbar flex-1">
        {games.map(game => (
          <div key={game.id} className="group relative bg-[#0a0f20] rounded-[3.5rem] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-4 shadow-2xl">
            {/* Top Visual */}
            <div className={`h-56 bg-gradient-to-br ${game.color} relative flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <i className={`fas ${game.icon} text-7xl text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] z-10 group-hover:scale-125 transition-transform duration-700`}></i>
              <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/10">
                {game.type}
              </div>
            </div>

            {/* Info */}
            <div className="p-10 flex-1 flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 italic ${game.accent}`}>{game.level}</span>
              <h3 className="text-2xl font-black text-white uppercase italic mb-4 leading-tight group-hover:tracking-wide transition-all">{game.title}</h3>
              <p className="text-[13px] font-medium text-slate-400 italic mb-10 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">{game.desc}</p>
              
              <button 
                onClick={() => handleStartGame(game.id)}
                className={`mt-auto w-full bg-gradient-to-r ${game.color} ${game.shadow} text-white py-5 rounded-[2rem] font-black text-[14px] uppercase italic tracking-[0.2em] hover:brightness-125 active:scale-95 transition-all border-b-4 border-black/30 flex items-center justify-center gap-3`}
              >
                VÀO PHÒNG CHƠI <i className="fas fa-play text-[10px]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay Play Game */}
      {playingId && (
        <div className="fixed inset-0 z-[100] bg-[#050816]/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-[#0a0f20] w-full max-w-5xl h-[85vh] rounded-[4.5rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(79,70,229,0.25)] relative border border-white/10">
            <button onClick={() => setPlayingId(null)} className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:rotate-90 transition-all z-20 border border-white/10 text-xl font-light">×</button>
            
            <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
                {gameState === 'ready' && (
                    <div className="animate-in zoom-in-90 duration-500">
                        <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-[3rem] flex items-center justify-center text-white text-5xl mb-12 shadow-[0_0_50px_rgba(99,102,241,0.5)] animate-bounce mx-auto border-4 border-white/20">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h2 className="text-7xl font-black text-white uppercase italic mb-6 tracking-tighter drop-shadow-2xl">READY?</h2>
                        <p className="text-indigo-400 text-sm font-black uppercase tracking-[0.8em] mb-16 italic opacity-70">CHINH PHỤC THỬ THÁCH LAB 4.0</p>
                        <button onClick={() => setGameState('playing')} className="bg-white text-black px-24 py-7 rounded-[2.5rem] font-black text-2xl uppercase italic shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:scale-110 active:scale-95 transition-all">BẮT ĐẦU NGAY</button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full max-w-4xl animate-in slide-in-from-bottom-10 duration-700">
                        <div className="flex justify-center gap-4 mb-16">
                            {quizData[playingId!].map((_, i) => (
                                <div key={i} className={`h-2.5 rounded-full transition-all duration-700 ${i <= currentQuestionIndex ? 'w-16 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)]' : 'w-4 bg-white/10'}`}></div>
                            ))}
                        </div>
                        <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[1em] mb-6 italic">QUESTION {currentQuestionIndex + 1}</p>
                        <h3 className="text-5xl font-black text-white italic mb-20 leading-tight min-h-[160px] flex items-center justify-center drop-shadow-xl px-10">
                            {quizData[playingId!][currentQuestionIndex].question}
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            {quizData[playingId!][currentQuestionIndex].options.map((opt, i) => {
                                const isCorrect = i === quizData[playingId!][currentQuestionIndex].correct;
                                let btnStyle = "bg-white/5 border-2 border-white/10 text-white/80";
                                if (feedback !== null) {
                                    if (isCorrect) btnStyle = "bg-emerald-600 border-emerald-400 text-white scale-105 shadow-[0_0_40px_rgba(16,185,129,0.4)]";
                                    else btnStyle = "bg-rose-900/40 border-rose-800 text-white/20 opacity-40";
                                }
                                return (
                                    <button 
                                      key={i} onClick={() => handleAnswer(i)} disabled={feedback !== null}
                                      className={`p-10 rounded-[3rem] font-black text-2xl uppercase italic transition-all ${btnStyle} ${feedback === null ? 'hover:bg-indigo-600 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="animate-in zoom-in-95 duration-700">
                        <i className="fas fa-crown text-amber-400 text-9xl mb-10 drop-shadow-[0_0_50px_rgba(251,191,36,0.6)] animate-pulse"></i>
                        <h2 className="text-7xl font-black text-white uppercase italic mb-6 tracking-tighter leading-none">CHIẾN THẮNG!</h2>
                        <div className="text-[120px] font-black text-indigo-400 italic mb-12 leading-none drop-shadow-2xl">{score}/{quizData[playingId!].length}</div>
                        <div className="flex gap-8 justify-center">
                            <button onClick={() => handleStartGame(playingId!)} className="bg-white text-black px-16 py-6 rounded-[2.5rem] font-black text-xl uppercase italic shadow-2xl hover:scale-110 active:scale-95 transition-all">THỬ LẠI</button>
                            <button onClick={() => setPlayingId(null)} className="bg-white/10 text-white border border-white/20 px-16 py-6 rounded-[2.5rem] font-black text-xl uppercase italic hover:bg-white/20 transition-all">KẾT THÚC</button>
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