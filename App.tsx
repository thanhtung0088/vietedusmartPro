import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TỔNG QUAN');

  return (
    <div className="flex min-h-screen bg-[#0f172a] overflow-hidden text-white">
      {/* Sidebar bên trái */}
      <Sidebar activeMenu={currentPage} onNavigate={setCurrentPage} />
      
      {/* Nội dung bên phải */}
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'TỔNG QUAN' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 italic">
            <h2 className="text-2xl font-black uppercase">Tính năng {currentPage} đang hoàn thiện</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
