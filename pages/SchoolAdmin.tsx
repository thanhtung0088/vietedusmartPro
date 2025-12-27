import React, { useState, useEffect } from 'react';

interface AdminDoc { id: string; name: string; type: string; category: string; date: string; }
interface Staff { id: string; name: string; subject: string; quota: string; status: string; }
interface Asset { id: string; name: string; count: string; icon: string; status: string; }
interface FinanceRecord { id: string; title: string; amount: number; type: 'income' | 'expense'; date: string; }

const SchoolAdmin: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState('hr');
  
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([]);
  const [adminDocs, setAdminDocs] = useState<AdminDoc[]>([]);

  useEffect(() => {
    const staff = localStorage.getItem('vietedu_admin_staff');
    const finance = localStorage.getItem('vietedu_admin_finance');
    const assets = localStorage.getItem('vietedu_admin_assets');
    const docs = localStorage.getItem('vietedu_admin_docs');
    
    if (staff) setStaffList(JSON.parse(staff));
    if (finance) setFinanceRecords(JSON.parse(finance));
    if (assets) setAssetList(JSON.parse(assets));
    if (docs) setAdminDocs(JSON.parse(docs));
  }, []);

  const persistData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addStaff = () => {
    const name = prompt("Nhập họ tên giáo viên:");
    const sub = prompt("Nhập môn giảng dạy:");
    const quota = prompt("Định mức tiết (Ví dụ: 17/17):") || '17/17';
    if (name && sub) {
      const newStaff: Staff = { id: Date.now().toString(), name, subject: sub, quota, status: 'Đang dạy' };
      const updated = [newStaff, ...staffList];
      setStaffList(updated);
      persistData('vietedu_admin_staff', updated);
    }
  };

  const addFinanceRecord = () => {
    const title = prompt("Tên khoản chi:");
    const amountStr = prompt("Số tiền (VNĐ):");
    if (title && amountStr) {
      const amount = parseInt(amountStr.replace(/,/g, ''));
      const newRecord: FinanceRecord = { id: Date.now().toString(), title, amount, type: 'expense', date: new Date().toLocaleDateString('vi-VN') };
      const updated = [newRecord, ...financeRecords];
      setFinanceRecords(updated);
      persistData('vietedu_admin_finance', updated);
    }
  };

  const addAsset = () => {
    const name = prompt("Tên thiết bị:");
    const count = prompt("Số lượng:");
    if (name && count) {
      const newAsset: Asset = { id: Date.now().toString(), name, count, icon: 'fa-box-open', status: 'Tốt' };
      const updated = [newAsset, ...assetList];
      setAssetList(updated);
      persistData('vietedu_admin_assets', updated);
    }
  };

  const totalFinance = financeRecords.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10 pt-4">
        <div>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest italic mb-2 flex items-center gap-2 transition-all group">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> TRỞ VỀ TRANG CHỦ
          </button>
          <h1 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter flex items-center gap-4 leading-none">
            QUẢN TRỊ <span className="text-[#ff9800] drop-shadow-sm">NHÀ TRƯỜNG</span>
            <span className="text-[9px] bg-[#061631] text-white px-4 py-1.5 rounded-full ml-2 tracking-[0.3em] font-black border border-white/10">PRO LAB 4.0</span>
          </h1>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Hệ thống bảo mật AES-256</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {[
           { label: 'CÁN BỘ GIÁO VIÊN', value: staffList.length, icon: 'fa-users', bg: 'bg-gradient-to-br from-[#2563eb] to-[#1e40af]', shadow: 'shadow-[0_15px_40px_-10px_rgba(37,99,235,0.4)]' },
           { label: 'HỒ SƠ SỐ HÓA', value: adminDocs.length, icon: 'fa-file-shield', bg: 'bg-gradient-to-br from-[#00c292] to-[#047857]', shadow: 'shadow-[0_15px_40px_-10px_rgba(0,194,146,0.4)]' },
           { label: 'THIẾT BỊ DẠY HỌC', value: assetList.length, icon: 'fa-boxes-stacked', bg: 'bg-gradient-to-br from-[#9333ea] to-[#6b21a8]', shadow: 'shadow-[0_15px_40px_-10px_rgba(147,51,234,0.4)]' },
           { label: 'TỔNG NGÂN SÁCH (Đ)', value: totalFinance.toLocaleString(), icon: 'fa-money-bill-trend-up', bg: 'bg-gradient-to-br from-[#e11d48] to-[#9f1239]', shadow: 'shadow-[0_15px_40px_-10px_rgba(225,29,72,0.4)]' },
         ].map((s, i) => (
           <div key={i} className={`${s.bg} p-10 rounded-[2.5rem] shadow-2xl ${s.shadow} flex flex-col justify-between group h-[200px] relative overflow-hidden transition-all hover:-translate-y-2 duration-500 border border-white/10`}>
              <div className="absolute -right-10 -bottom-10 opacity-[0.08] group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000"><i className={`fas ${s.icon} text-[12rem] text-white`}></i></div>
              <div className="relative z-10">
                <p className="text-[13px] font-bold text-white/80 uppercase tracking-widest italic flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>{s.label}</p>
                <h3 className="text-6xl font-black text-white italic mt-3 tracking-tighter drop-shadow-2xl">{s.value}</h3>
              </div>
              <div className="relative z-10 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/10 shadow-lg group-hover:bg-white group-hover:text-slate-900 transition-all"><i className={`fas ${s.icon} text-xl`}></i></div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-[#061631] p-6 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-3 sticky top-24">
            <p className="px-4 py-3 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] italic">MENU QUẢN TRỊ</p>
            {[
              { id: 'hr', label: 'NHÂN SỰ CHUYÊN MÔN', icon: 'fa-user-tie', color: 'bg-blue-500' },
              { id: 'planning', label: 'CHIẾN LƯỢC PHÁT TRIỂN', icon: 'fa-compass-drafting', color: 'bg-emerald-500' },
              { id: 'finance', label: 'TÀI CHÍNH & THU CHI', icon: 'fa-file-invoice-dollar', color: 'bg-rose-500' },
              { id: 'assets', label: 'QUẢN LÝ TÀI SẢN CSVC', icon: 'fa-boxes-stacked', color: 'bg-amber-500' }
            ].map(mod => (
              <button key={mod.id} onClick={() => setActiveModule(mod.id)} className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 group ${activeModule === mod.id ? 'bg-gradient-to-r from-white/10 to-transparent border border-white/10 shadow-xl' : 'hover:bg-white/5 border border-transparent'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all ${activeModule === mod.id ? `${mod.color} text-white shadow-lg` : 'bg-white/5 text-slate-500 group-hover:bg-white/10'}`}><i className={`fas ${mod.icon}`}></i></div>
                <div><h4 className={`text-[10px] font-black uppercase tracking-widest leading-none ${activeModule === mod.id ? 'text-white italic' : 'text-slate-400'}`}>{mod.label}</h4></div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl min-h-[700px] flex flex-col relative overflow-hidden">
             {activeModule === 'hr' && (
                <div className="animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                   <div className="flex justify-between items-end mb-10">
                      <div><h2 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter leading-none mb-3">HỒ SƠ CÁN BỘ GIÁO VIÊN</h2><p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">HỆ THỐNG PHÂN CÔNG & ĐỊNH MỨC TIẾT DẠY</p></div>
                      <button onClick={addStaff} className="bg-[#061631] text-[#ff9800] px-12 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all italic flex items-center gap-3">+ THÊM CÁN BỘ</button>
                   </div>
                   <div className="flex-1 overflow-x-auto no-scrollbar">
                      <table className="w-full text-[11px] text-left">
                         <thead className="bg-slate-50/80 backdrop-blur-sm text-slate-400 border-b-2 border-slate-100">
                            <tr><th className="p-6 font-black uppercase italic tracking-widest">Họ tên giáo viên</th><th className="p-6 font-black uppercase italic tracking-widest">Môn giảng dạy</th><th className="p-6 font-black uppercase italic tracking-widest text-center">Định mức</th><th className="p-6 font-black uppercase italic tracking-widest">Trạng thái</th><th className="p-6 text-right">Tác vụ</th></tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {staffList.length > 0 ? staffList.map(gv => (
                               <tr key={gv.id} className="hover:bg-blue-50/40 transition-all group">
                                  <td className="p-6"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-[#061631] text-white flex items-center justify-center font-black italic shadow-lg">{gv.name.charAt(0)}</div><span className="font-black text-slate-800 uppercase italic text-[14px] tracking-tight">{gv.name}</span></div></td>
                                  <td className="p-6 font-bold text-slate-500 italic uppercase tracking-wider">{gv.subject}</td>
                                  <td className="p-6 text-center"><span className="font-black text-blue-600 bg-blue-50 px-5 py-2 rounded-xl border border-blue-100 italic">{gv.quota}</span></td>
                                  <td className="p-6"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="px-4 py-2 rounded-full text-[9px] font-black uppercase italic bg-emerald-50 text-emerald-600">{gv.status}</span></div></td>
                                  <td className="p-6 text-right opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => { const updated = staffList.filter(x => x.id !== gv.id); setStaffList(updated); persistData('vietedu_admin_staff', updated); }} className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><i className="fas fa-trash-can text-sm"></i></button></td>
                               </tr>
                            )) : (<tr><td colSpan={5} className="p-20 text-center"><i className="fas fa-users-slash text-6xl text-slate-100 mb-6"></i><p className="text-[12px] font-black text-slate-300 uppercase tracking-[0.5em] italic">Chưa có dữ liệu cán bộ giáo viên</p></td></tr>)}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}
             {activeModule === 'finance' && (
                <div className="animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                   <div className="flex justify-between items-center mb-10">
                      <div><h2 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter mb-3 leading-none">QUẢN TRỊ NGÂN SÁCH</h2><p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">BÁO CÁO THU CHI & QUYẾT TOÁN TÀI CHÍNH</p></div>
                      <button onClick={addFinanceRecord} className="bg-rose-600 text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all italic flex items-center gap-3"><i className="fas fa-receipt"></i> LẬP PHIẾU CHI</button>
                   </div>
                   <div className="bg-[#061631] p-12 rounded-[3.5rem] text-white mb-10 relative overflow-hidden group shadow-2xl border-b-8 border-rose-900">
                      <p className="text-[12px] font-black uppercase tracking-[0.5em] opacity-40 mb-3 italic">TỔNG CHI TIÊU HỆ THỐNG</p>
                      <h3 className="text-7xl font-black italic drop-shadow-2xl tracking-tighter">{totalFinance.toLocaleString()}đ</h3>
                      <i className="fas fa-vault absolute -right-10 -bottom-10 text-[15rem] opacity-5 group-hover:scale-110 transition-transform duration-1000"></i>
                   </div>
                   <div className="space-y-4 flex-1">
                      {financeRecords.length > 0 ? financeRecords.map(r => (
                        <div key={r.id} className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                           <div className="flex items-center gap-6"><div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-all"><i className="fas fa-file-invoice-dollar"></i></div><div><p className="text-[15px] font-black text-slate-800 uppercase italic tracking-tight">{r.title}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{r.date}</p></div></div>
                           <span className="text-[22px] font-black text-rose-600 italic tracking-tighter">-{r.amount.toLocaleString()}đ</span>
                        </div>
                      )) : (<div className="text-center py-20 text-slate-200 border-4 border-dashed border-slate-50 rounded-[4rem]"><i className="fas fa-coins text-8xl mb-8 opacity-5"></i><p className="text-[12px] font-black uppercase tracking-[0.5em] opacity-30 italic">Chưa có dữ liệu giao dịch</p></div>)}
                   </div>
                </div>
             )}
             {activeModule === 'assets' && (
                <div className="animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                   <div className="flex justify-between items-end mb-10">
                      <div><h2 className="text-4xl font-black text-[#061631] uppercase italic tracking-tighter mb-3 leading-none">TÀI SẢN & THIẾT BỊ</h2><p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">QUẢN LÝ CƠ SỞ VẬT CHẤT CHI TIẾT</p></div>
                      <button onClick={addAsset} className="bg-amber-600 text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all italic flex items-center gap-3"><i className="fas fa-plus"></i> THÊM THIẾT BỊ</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {assetList.length > 0 ? assetList.map(asset => (
                         <div key={asset.id} className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 group hover:bg-[#061631] transition-all duration-500 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8 relative z-10"><div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-600 text-3xl shadow-xl group-hover:bg-[#ff9800] group-hover:text-[#061631] transition-all"><i className={`fas ${asset.icon}`}></i></div><span className="px-4 py-2 rounded-full text-[9px] font-black uppercase italic bg-emerald-50 text-emerald-600">{asset.status}</span></div>
                            <div className="relative z-10"><h4 className="text-[18px] font-black text-slate-800 uppercase italic mb-2 group-hover:text-white transition-colors tracking-tight">{asset.name}</h4><p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/40 transition-colors">Số lượng: {asset.count}</p></div>
                            <button onClick={() => { const updated = assetList.filter(x => x.id !== asset.id); setAssetList(updated); persistData('vietedu_admin_assets', updated); }} className="mt-8 text-[10px] font-black text-red-400 uppercase tracking-widest group-hover:text-white opacity-0 group-hover:opacity-100 transition-all italic">XÓA THIẾT BỊ</button>
                         </div>
                      )) : (<div className="lg:col-span-3 py-32 text-center text-slate-100"><i className="fas fa-boxes-stacked text-8xl mb-8 opacity-5"></i><p className="text-[12px] font-black uppercase tracking-[0.5em] italic">Danh sách thiết bị trống</p></div>)}
                   </div>
                </div>
             )}
             {activeModule === 'planning' && (
                <div className="animate-in slide-in-from-right-4 duration-500 h-full flex flex-col items-center justify-center text-center p-20 relative overflow-hidden">
                   <div className="relative z-10 flex flex-col items-center">
                      <div className="w-28 h-28 bg-[#061631] rounded-3xl shadow-2xl flex items-center justify-center text-[#ff9800] mb-10 animate-bounce-slow"><i className="fas fa-compass-drafting text-4xl"></i></div>
                      <h2 className="text-5xl font-black text-[#061631] uppercase italic tracking-tighter mb-6 leading-none">LAB AI CHIẾN LƯỢC</h2>
                      <p className="text-base font-bold text-slate-400 uppercase tracking-widest italic max-w-xl leading-relaxed mb-12">Hệ thống AI đang được đồng bộ hóa để phân tích dữ liệu thực tế tại trường và đưa ra các kế hoạch chiến lược 2025-2030.</p>
                      <button className="bg-[#061631] text-white px-14 py-6 rounded-[2rem] font-black text-[14px] uppercase tracking-[0.2em] italic shadow-2xl hover:scale-105 transition-all">KÍCH HOẠT PHÂN TÍCH AI</button>
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none -rotate-12 scale-150"><i className="fas fa-graduation-cap text-[35rem] text-[#061631]"></i></div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdmin;