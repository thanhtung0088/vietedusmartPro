import React, { useState } from 'react';
// Sidebar nằm trong thư mục components
import Sidebar from './components/Sidebar'; 
// Dashboard nằm trong thư mục pages (theo hình image_b615f2.png)
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TỔNG QUAN');

  return (
    <div className="flex min-h-screen bg-[#0f172a] overflow-hidden text-white font-sans">
      {/* Thanh Menu bên trái */}
      <Sidebar activeMenu={currentPage} onNavigate={setCurrentPage} />
      
      {/* Nội dung hiển thị bên phải */}
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'TỔNG QUAN' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 italic">
            <h2 className="text-2xl font-black uppercase">Tính năng {currentPage} đang được cập nhật</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
