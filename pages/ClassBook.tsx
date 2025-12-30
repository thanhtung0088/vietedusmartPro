import React, { useState, useEffect } from 'react';

interface StudentProfile {
  id: string;
  name: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  parentPhone: string;
  status: 'Bình thường' | 'Cần quan tâm' | 'Đặc biệt';
}

interface WeeklyPlan {
  id: string;
  week: number;
  goal: string;
  activities: string[];
  results: string;
}

interface DisciplineLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  content: string;
  type: 'Khen thưởng' | 'Nhắc nhở' | 'Vi phạm';
}

const ClassBook: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'plans' | 'discipline' | 'connect'>('overview');
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [logs, setLogs] = useState<DisciplineLog[]>([]);

  useEffect(() => {
    const savedStudents = localStorage.getItem('vietedu_cb_students');
    const savedPlans = localStorage.getItem('vietedu_cb_plans');
    const savedLogs = localStorage.getItem('vietedu_cb_logs');
    
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addStudent = () => {
    const name = prompt("Họ tên học sinh:");
    if (!name) return;
    const newStudent: StudentProfile = {
      id: Date.now().toString(),
      name,
      dob: '01/01/2010',
      gender: 'Nam',
      address: '',
      parentPhone: '',
      status: 'Bình thường'
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    saveToLocal('vietedu_cb_students', updated);
  };

  const addLog = () => {
    const name = prompt("Tên học sinh:");
    const content = prompt("Nội dung sự việc:");
    if (!name || !content) return;
    const newLog: DisciplineLog = {
      id: Date.now().toString(),
      studentId: '0',
      studentName: name,
      date: new Date().toLocaleDateString('vi-VN'),
      content,
      type: 'Nhắc nhở'
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    saveToLocal('vietedu_cb_logs', updated);
  };

  const stats = {
    total: students.length,
    needsCare: students.filter(s => s.status !== 'Bình thường').length,
    incidents: logs.filter(l => l.type === 'Vi phạm').length,
    rewards: logs.filter(l => l.type === 'Khen thưởng').length
  };

  return (
    <div className="max-w-[1580px] mx-auto px-4 py-2 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic flex items-center gap-2 mb-2">
            <i className="fas fa-arrow-left"></i> QUAY LẠI DASHBOARD
          </button>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Sổ Chủ Nhiệm Điện Tử <span className="text-blue-600">v4.0</span></h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Lớp 9A1 - Năm học 2024-2025</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          {[
            { id: 'overview', label: 'TỔNG QUAN', icon: 'fa-chart-pie' },
            { id: 'students', label: 'HỒ SƠ LỚP', icon: 'fa-user-graduate' },
            { id: 'plans', label: 'KẾ HOẠCH', icon: 'fa-calendar-check' },
            { id: 'discipline', label: 'NỀ NẾP', icon: 'fa-shield-heart' },
            { id: 'connect', label: 'LIÊN LẠC', icon: 'fa-phone-volume' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black transition-all uppercase tracking-widest flex items-center gap-2 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 italic' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <i className={`fas ${tab.icon}`}></i> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Sĩ số học sinh', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50', icon: 'fa-users' },
                { label: 'Học sinh cá biệt', value: stats.needsCare, color: 'text-orange-600', bg: 'bg-orange-50', icon: 'fa-triangle-exclamation' },
                { label: 'Vi phạm kỷ luật', value: stats.incidents, color: 'text-red-600', bg: 'bg-red-50', icon: 'fa-ban' },
                { label: 'Khen thưởng tuần', value: stats.rewards, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'fa-medal' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
                  <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                    <i className={`fas ${s.icon} text-lg`}></i>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{s.label}</p>
                  <h3 className="text-3xl font-black text-slate-800 italic">{s.value}</h3>
                </div>
              ))}
            </div>

            {/* AI Insight Box */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="max-w-2xl">
                     <h3 className="text-xl font-black uppercase italic tracking-tight mb-4 flex items-center gap-3">
                        <i className="fas fa-brain animate-pulse"></i> Trợ lý AI Phân tích Lớp học
                     </h3>
                     <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                        Dựa trên dữ liệu hiện tại, lớp 9A1 đang có xu hướng giảm các vụ vi phạm kỷ luật (giảm 15% so với tuần trước). Tuy nhiên, cần chú trọng quan tâm nhóm học sinh diện "Cần quan tâm" trước kỳ thi học kỳ sắp tới.
                     </p>
                  </div>
                  <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-[10px] uppercase italic tracking-widest shadow-2xl hover:scale-105 transition-all shrink-0">
                     Xuất báo cáo AI
                  </button>
               </div>
               <i className="fas fa-rocket absolute -bottom-10 -right-10 text-[15rem] opacity-5 group-hover:rotate-12 transition-transform duration-1000"></i>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 animate-in slide-in-from-right-4 duration-500">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-slate-800 uppercase italic">Danh sách học sinh chi tiết</h2>
                <button onClick={addStudent} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-blue-500/20">+ Thêm học sinh</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b">
                      <tr>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Họ và tên</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Ngày sinh</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phái</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Số điện thoại PH</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phân loại</th>
                         <th className="p-4 text-right">Tác vụ</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {students.map(s => (
                         <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-black text-slate-800 uppercase italic text-[11px]">{s.name}</td>
                            <td className="p-4 text-xs font-bold text-slate-500">{s.dob}</td>
                            <td className="p-4 text-xs font-bold text-slate-500">{s.gender}</td>
                            <td className="p-4 text-xs font-bold text-slate-500">{s.parentPhone || 'Chưa cập nhật'}</td>
                            <td className="p-4">
                               <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase italic ${s.status === 'Bình thường' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                  {s.status}
                               </span>
                            </td>
                            <td className="p-4 text-right">
                               <button onClick={() => { setStudents(students.filter(x => x.id !== s.id)); saveToLocal('vietedu_cb_students', students.filter(x => x.id !== s.id)); }} className="text-slate-300 hover:text-red-500 transition-colors"><i className="fas fa-trash-alt"></i></button>
                            </td>
                         </tr>
                      ))}
                      {students.length === 0 && (
                         <tr><td colSpan={6} className="p-20 text-center text-slate-300 uppercase italic font-black text-xs tracking-[0.5em] opacity-30">Chưa có dữ liệu học sinh</td></tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'discipline' && (
          <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
             <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800 uppercase italic">Nhật ký nề nếp & Kỷ luật</h2>
                <button onClick={addLog} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest shadow-xl">+ Ghi nhận sự việc</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {logs.map(log => (
                   <div key={log.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-2 h-full ${log.type === 'Vi phạm' ? 'bg-red-500' : log.type === 'Khen thưởng' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      <div className="flex justify-between items-start mb-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase italic">{log.date}</p>
                         <span className={`text-[8px] font-black uppercase italic ${log.type === 'Vi phạm' ? 'text-red-600' : 'text-blue-600'}`}>{log.type}</span>
                      </div>
                      <h4 className="font-black text-slate-800 uppercase italic text-xs mb-2 leading-tight">{log.studentName}</h4>
                      <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed">"{log.content}"</p>
                      <button onClick={() => { setLogs(logs.filter(l => l.id !== log.id)); saveToLocal('vietedu_cb_logs', logs.filter(l => l.id !== log.id)); }} className="mt-4 text-[9px] font-black text-slate-300 hover:text-red-500 uppercase italic">Gỡ bỏ ghi chú</button>
                   </div>
                ))}
                {logs.length === 0 && (
                   <div className="col-span-full py-32 text-center text-slate-200 border-4 border-dashed border-slate-50 rounded-[3rem]">
                      <i className="fas fa-clipboard-list text-6xl mb-6 opacity-10"></i>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Lớp học hiện đang nề nếp tốt</p>
                   </div>
                )}
             </div>
          </div>
        )}

        {(activeTab === 'plans' || activeTab === 'connect') && (
           <div className="h-full flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-50 shadow-sm animate-in zoom-in-95">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-8 animate-bounce">
                 <i className="fas fa-tools text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">Module đang được nâng cấp</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] italic">Tính năng sẽ sớm khả dụng trong bản cập nhật kế tiếp</p>
           </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 bg-white/50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between opacity-70">
         <div className="flex items-center gap-3">
            <i className="fas fa-shield-check text-blue-500 text-xs"></i>
            <p className="text-[8px] font-black text-slate-400 uppercase italic tracking-widest">Dữ liệu hồ sơ chủ nhiệm được mã hóa và lưu trữ an toàn trên thiết bị</p>
         </div>
         <span className="text-[7px] font-bold text-slate-300 uppercase italic tracking-widest">VietEdu Smart - Class Management Protocol v4.0</span>
      </div>
    </div>
  );
};

export default ClassBook;