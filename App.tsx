import React, { useState } from 'react';
// Sửa thành Sidebar (bỏ chữ VietEdu đi cho khớp với file Thầy Cô đang có)
import Sidebar from './components/Sidebar'; 
// Gọi Dashboard từ thư mục pages (vì hình ảnh cho thấy Dashboard.tsx nằm ở đây)
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TỔNG QUAN');

  return (
    <div className="flex min-h-screen bg-[#0f172a] overflow-hidden text-white font-sans">
      <Sidebar activeMenu={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'TỔNG QUAN' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 italic">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              Đang phát triển: {currentPage}
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
