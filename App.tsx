import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import Dashboard from './pages/Dashboard'; // Gọi Dashboard từ thư mục pages

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TỔNG QUAN');

  return (
    <div className="flex min-h-screen bg-[#0f172a] overflow-hidden">
      <Sidebar activeMenu={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'TỔNG QUAN' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <div className="flex items-center justify-center h-full text-white italic opacity-30 uppercase font-black">
            Tính năng {currentPage} đang cập nhật
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
