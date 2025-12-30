
import React, { useState } from 'react';

const Rubrics: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const rubrics = [
    { id: 1, title: 'Đánh giá Năng lực Tự chủ', cat: 'Chung', criteria: ['Tự học', 'Giải quyết vấn đề', 'Quản lý thời gian'] },
    { id: 2, title: 'Đánh giá Kỹ năng Thuyết trình', cat: 'Bộ môn', criteria: ['Nội dung', 'Phong thái', 'Sử dụng CNTT'] },
    { id: 3, title: 'Đánh giá Hoạt động nhóm', cat: 'Phẩm chất', criteria: ['Hợp tác', 'Trách nhiệm', 'Lắng nghe'] }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-[#0269a4] flex items-center gap-2 uppercase tracking-widest">
            <i className="fas fa-arrow-left text-[10px]"></i> QUAY LẠI
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Bộ Tiêu chí Rubrics</h1>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mt-2 italic font-bold">Chuẩn hóa đánh giá năng lực 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rubrics.map(r => (
          <div key={r.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group border-b-8 border-b-slate-100 hover:border-b-[#0269a4]">
             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0269a4] mb-8 group-hover:bg-[#0269a4] group-hover:text-white transition-all shadow-inner">
                <i className="fas fa-star-half-stroke text-lg"></i>
             </div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 block">{r.cat}</span>
             <h3 className="text-lg font-black text-slate-800 uppercase italic mb-6 leading-tight">{r.title}</h3>
             <div className="space-y-3">
                {r.criteria.map(c => (
                  <div key={c} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    <span>{c}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-10 bg-slate-50 py-4 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-[#0269a4] hover:text-white transition-all">Sử dụng mẫu này</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rubrics;
