import React, { useState, useEffect } from 'react';

const ProfessionalPlan: React.FC = () => {
  // Trạng thái bật/tắt Modal dán Excel
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState('');
  const [tableRows, setTableRows] = useState<string[][]>([]);

  // Hàm xử lý dữ liệu dán từ Excel (Chuẩn Tab-Separated)
  const processExcelData = () => {
    if (!inputData.trim()) return;
    // Tách dòng và tách cột chuẩn xác tuyệt đối
    const rows = inputData.trim().split('\n').map(line => line.split('\t'));
    setTableRows(rows);
    setIsOpen(false);
    setInputData('');
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      
      {/* HEADER TRANG - TƯƠNG PHẢN MẠNH */}
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic italic">
              Nhân sự & <span className="text-blue-600">Tổ chức</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Trường THCS Bình Hòa • 2026</p>
          </div>

          {/* NÚT DÁN EXCEL - ĐÃ ĐƯỢC KÍCH HOẠT THỰC SỰ */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
              console.log("Nút đã được bấm!"); // Kiểm tra trong Console nếu cần
            }}
            className="group relative flex items-center gap-3 bg-[#107c41] hover:bg-[#1d5b38] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_15px_30px_-5px_rgba(16,124,65,0.4)] transition-all active:scale-90 z-50"
          >
            <i className="fas fa-file-excel text-xl animate-bounce"></i>
            Dán từ Excel ngay
          </button>
        </div>
      </div>

      {/* BẢNG HIỂN THỊ DỮ LIỆU - CỰC GỌN VÀ SÁNG */}
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">STT</th>
              <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-600">Dữ liệu từ Excel</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length > 0 ? (
              tableRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-blue-50/50 transition-all">
                  <td className="p-5 text-xs font-black text-slate-300 italic">{i + 1}</td>
                  {row.map((cell, j) => (
                    <td key={j} className="p-5 text-xs font-bold text-slate-700 uppercase">{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-20 text-center opacity-30">
                  <i className="fas fa-layer-group text-6xl mb-4 block"></i>
                  <span className="text-sm font-black uppercase tracking-widest">Đang chờ dán dữ liệu...</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* HỘP THOẠI MODAL - CẤP ĐỘ ƯU TIÊN CAO NHẤT (Z-INDEX 9999) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          {/* Lớp nền mờ */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Nội dung hộp thoại */}
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-8 border-t-8 border-emerald-500 animate-in zoom-in duration-150">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h3 className="text-xl font-black text-slate-800 italic uppercase">Nhập liệu nhanh</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-rose-500 transition-colors">
                <i className="fas fa-times-circle text-2xl"></i>
              </button>
            </div>

            <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase italic">* Copy từ Excel và dán vào ô dưới đây</p>

            <textarea
              autoFocus
              className="w-full h-48 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-semibold text-slate-700 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ctrl + V tại đây..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            ></textarea>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={processExcelData}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                Xác nhận dán
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalPlan;