
import React, { useState, useEffect } from 'react';

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
    { id: 1, title: 'TOÁN HỌC 4.0', level: 'KHỐI 6-9', type: 'LOGIC', icon: 'fa-plus-minus', color: 'from-emerald-500 to-emerald-800', border: 'border-emerald-400/20', desc: 'Thử thách giải toán nhanh đa cấp độ ứng dụng tư duy máy tính.' },
    { id: 2, title: 'ANH NGỮ SỐ', level: 'KHỐI 6-9', type: 'VĂN HÓA', icon: 'fa-language', color: 'from-blue-600 to-blue-900', border: 'border-blue-400/20', desc: 'Xây dựng vốn từ vựng chuẩn Cambridge qua các tình huống thực tế.' },
    { id: 3, title: 'LỊCH SỬ VIỆT NAM', level: 'KHỐI 6-9', type: 'KIẾN THỨC', icon: 'fa-landmark', color: 'from-orange-500 to-orange-800', border: 'border-orange-400/20', desc: 'Hành trình khám phá lịch sử hào hùng qua các thời đại hào kiệt.' },
    { id: 4, title: 'SINH HỌC DIỆU KỲ', level: 'KHỐI 6-9', type: 'KHÁM PHÁ', icon: 'fa-dna', color: 'from-rose-500 to-rose-900', border: 'border-rose-400/20', desc: 'Khám phá bí mật của sự sống, tế bào và di truyền học Lab Số.' }
  ];

  const quizData: Record<number, Question[]> = {
    1: [
      { question: "Nếu 2x + 5 = 15, giá trị của x là bao nhiêu?", options: ["5", "10", "4", "2"], correct: 0 },
      { question: "Số nào là số nguyên tố chẵn duy nhất?", options: ["0", "2", "4", "6"], correct: 1 },
      { question: "Công thức tính diện tích hình tròn là gì?", options: ["2πr", "πr²", "πd", "4πr²"], correct: 1 }
    ],
    2: [
      { question: "What is the past tense of 'Go'?", options: ["Goed", "Went", "Gone", "Going"], correct: 1 },
      { question: "Which word is a synonym for 'Intelligent'?", options: ["Smart", "Dull", "Slow", "Angry"], correct: 0 },
      { question: "Complete: She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1 }
    ],
    3: [
      { question: "Ai là vị vua đầu tiên của nước ta?", options: ["Kinh Dương Vương", "Hùng Vương", "An Dương Vương", "Ngô Quyền"], correct: 0 },
      { question: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?", options: ["1945", "1954", "1975", "1968"], correct: 1 },
      { question: "Vị anh hùng dân tộc nào đã ba lần đánh thắng quân Nguyên Mông?", options: ["Lê Lợi", "Trần Hưng Đạo", "Quang Trung", "Ngô Quyền"], correct: 1 }
    ],
    4: [
      { question: "Đơn vị cơ bản nhất của sự sống là gì?", options: ["Nguyên tử", "Tế bào", "Phân tử", "Mô"], correct: 1 },
      { question: "DNA nằm ở đâu trong tế bào nhân thực?", options: ["Ty thể", "Lưới nội chất", "Nhân tế bào", "Ribosome"], correct: 2 },
      { question: "Quá trình thực vật tự tạo thức ăn nhờ ánh sáng gọi là gì?", options: ["Hô hấp", "Quang hợp", "Tiêu hóa", "Bài tiết"], correct: 1 }
    ]
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
    const currentQuiz = quizData[playingId!];
    const isCorrect = index === currentQuiz[currentQuestionIndex].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < currentQuiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameState('result');
      }
    }, 1200);
  };

  return (
    <div className="max-w-[1550px] mx-auto h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10 pt-4 shrink-0 px-4">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic mb-1 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i> QUAY LẠI TỔNG QUAN
          </button>
          <h1 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter leading-none">
            VIETEDU <span className="text-emerald-600">GAME CENTER</span>
          </h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic mt-2">NỀN TẢNG HỌC TẬP TRẢI NGHIỆM THẾ HỆ MỚI</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 flex-1 min-h-0 px-4 mb-10 overflow-y-auto no-scrollbar pb-10">
        {games.map(game => (
          <div key={game.id} className="bg-white rounded-[3.5rem] border border-slate-200 shadow-3d-extreme overflow-hidden flex flex-col group hover:-translate-y-4 transition-all duration-500 h-fit">
            <div className={`h-[240px] bg-gradient-to-br ${game.color} flex items-center justify-center text-white relative overflow-hidden`}>
              <i className={`fas ${game.icon} text-[100px] drop-shadow-2xl opacity-40 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700`}></i>
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-white/20">
                MODULE: {game.type}
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between bg-white relative">
              <div>
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] italic block mb-3">{game.level}</span>
                <h3 className="text-2xl font-black text-[#061631] uppercase italic tracking-tighter mb-4 leading-tight">{game.title}</h3>
                <p className="text-[12px] font-bold text-slate-400 uppercase italic tracking-widest leading-relaxed line-clamp-3">{game.desc}</p>
              </div>
              <button 
                onClick={() => handleStartGame(game.id)}
                className={`w-full bg-gradient-to-r ${game.color} text-white py-6 rounded-[1.8rem] font-black text-[11px] uppercase italic tracking-[0.3em] shadow-2xl hover:scale-105 transition-all mt-8 border-b-4 border-black/20`}
              >
                VÀO PHÒNG CHỜ
              </button>
            </div>
          </div>
        ))}
      </div>

      {playingId && (
        <div className="fixed inset-0 z-[100] bg-[#061631]/95 backdrop-blur-3xl flex items-center justify-center p-10 animate-in fade-in">
          <div className="bg-white w-full max-w-6xl h-full rounded-[4rem] overflow-hidden flex flex-col shadow-2xl relative border border-white/20">
            <button onClick={() => setPlayingId(null)} className="absolute top-10 right-10 w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-all z-20 shadow-lg"><i className="fas fa-times text-lg"></i></button>
            
            <div className="flex-1 bg-[#061631] flex flex-col items-center justify-center text-center p-10 relative overflow-hidden">
                {gameState === 'ready' && (
                    <div className="animate-in zoom-in-95 duration-700 relative z-10">
                        <div className="w-36 h-36 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-white text-6xl mb-12 shadow-[0_20px_50px_rgba(16,185,129,0.5)] animate-bounce mx-auto border-4 border-white/20">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">SẴN SÀNG CHƯA?</h2>
                        <p className="text-blue-400 text-sm font-black uppercase tracking-[0.8em] mb-16 italic opacity-60">CHINH PHỤC THỬ THÁCH TRÍ TUỆ VIETEDU</p>
                        <button onClick={() => setGameState('playing')} className="bg-white text-[#061631] px-24 py-8 rounded-[2.5rem] font-black text-2xl uppercase italic shadow-2xl hover:scale-110 active:scale-95 transition-all border-b-8 border-slate-200">BẮT ĐẦU NGAY</button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full max-w-4xl animate-in fade-in duration-500 relative z-10 px-6">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-20 rounded-[4rem] shadow-3xl relative overflow-hidden">
                           <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
                             {quizData[playingId!].map((_, i) => (
                               <div key={i} className={`w-4 h-4 rounded-full transition-all duration-500 ${i < currentQuestionIndex ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]' : i === currentQuestionIndex ? 'bg-blue-500 animate-pulse w-10' : 'bg-white/10'}`}></div>
                             ))}
                           </div>

                           <div className="mt-10">
                             <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.8em] mb-12 italic opacity-50">CÂU HỎI SỐ {currentQuestionIndex + 1}</p>
                             <h3 className="text-5xl font-black text-white uppercase italic leading-tight tracking-tighter mb-20 h-[140px] flex items-center justify-center drop-shadow-lg">
                               {quizData[playingId!][currentQuestionIndex].question}
                             </h3>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-8">
                               {quizData[playingId!][currentQuestionIndex].options.map((opt, i) => {
                                 const isCorrectBtn = i === quizData[playingId!][currentQuestionIndex].correct;
                                 let btnClass = "bg-white/5 border-2 border-white/10 text-white/70";
                                 if (feedback !== null) {
                                   if (isCorrectBtn) btnClass = "bg-emerald-600 border-emerald-400 text-white scale-105 shadow-[0_0_40px_rgba(16,185,129,0.5)]";
                                   else btnClass = "bg-rose-900/30 border-rose-800 text-white/10 opacity-30";
                                 }
                                 return (
                                   <button 
                                     key={i} 
                                     onClick={() => handleAnswer(i)}
                                     disabled={feedback !== null}
                                     className={`py-10 rounded-[2.5rem] font-black text-2xl uppercase italic transition-all tracking-tight ${btnClass} ${feedback === null ? 'hover:bg-blue-600 hover:text-white hover:border-blue-300 hover:scale-105 active:scale-95' : ''}`}
                                   >
                                     {opt}
                                   </button>
                                 );
                               })}
                           </div>
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                  <div className="animate-in zoom-in-95 duration-700 relative z-10 w-full max-w-2xl">
                    <div className="mb-14">
                       <i className="fas fa-crown text-amber-400 text-9xl mb-8 drop-shadow-[0_0_50px_rgba(251,191,36,0.8)] animate-bounce"></i>
                       <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">CHIẾN THẮNG!</h2>
                       <p className="text-blue-400 text-sm font-black uppercase tracking-[0.8em] italic opacity-60">BẠN ĐÃ HOÀN THÀNH THỬ THÁCH</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-16 mb-16 flex flex-col items-center shadow-3xl">
                       <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 italic">ĐIỂM SỐ KỶ LỤC</span>
                       <div className="text-[120px] font-black text-white italic leading-none drop-shadow-2xl">{score}/{quizData[playingId!].length}</div>
                       <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mt-12 border border-white/5">
                         <div 
                           className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full transition-all duration-1500" 
                           style={{ width: `${(score/quizData[playingId!].length) * 100}%` }}
                         ></div>
                       </div>
                    </div>

                    <div className="flex gap-8 justify-center">
                      <button 
                        onClick={() => handleStartGame(playingId!)}
                        className="bg-white text-[#061631] px-16 py-7 rounded-[2rem] font-black text-lg uppercase italic shadow-2xl hover:scale-110 active:scale-95 transition-all border-b-8 border-slate-200"
                      >
                        THỬ LẠI LẦN NỮA
                      </button>
                      <button 
                        onClick={() => setPlayingId(null)}
                        className="bg-white/10 text-white border border-white/20 px-16 py-7 rounded-[2rem] font-black text-lg uppercase italic shadow-2xl hover:bg-white/20 transition-all"
                      >
                        KẾT THÚC
                      </button>
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
