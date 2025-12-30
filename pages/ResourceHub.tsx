
import React, { useState } from 'react';

interface ResourceHubProps {
  onBack: () => void;
}

const ResourceHub: React.FC<ResourceHubProps> = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState('all');
  
  const resources = [
    { id: 1, name: 'Cổng thông tin điện tử Bộ Giáo dục và Đào tạo', type: 'link', cat: 'official', url: 'https://moet.gov.vn' },
    { id: 2, name: 'Hành trang số - NXB Giáo dục Việt Nam (SGK)', type: 'link', cat: 'sgk', url: 'https://hanhtrangso.nxbgd.vn' },
    { id: 3, name: 'Hệ thống Tập huấn Giáo viên - NXBGDVN', type: 'link', cat: 'sgk', url: 'https://taphuan.nxbgd.vn' },
    { id: 4, name: 'Công văn 5512/BGDĐT-GDTrH - Xây dựng KHBD', type: 'pdf', cat: 'legal', url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1374' },
    { id: 5, name: 'Công văn 7991/BGDĐT-GDTrH - Đánh giá học sinh', type: 'pdf', cat: 'legal', url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1402' },
    { id: 6, name: 'Thư viện Bài giảng điện tử - Violet.vn', type: 'link', cat: 'local', url: 'https://baigiang.violet.vn' },
    { id: 7, name: 'Hệ tri thức Việt số hóa - iThuc', type: 'link', cat: 'local', url: 'https://itrithuc.vn' },
    { id: 8, name: 'Phòng GD&ĐT - Cổng thông tin Thành phố', type: 'link', cat: 'local', url: 'https://hcm.edu.vn' }
  ];

  const filtered = activeCat === 'all' ? resources : resources.filter(r => r.cat === activeCat);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest">
            <i className="fas fa-arrow-left text-[10px]"></i> QUAY LẠI
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tighter italic text-right">Kho tài nguyên chuẩn hóa</h1>
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1 text-right italic font-bold">Dữ liệu thật - Kết nối tri thức giáo dục 4.0</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {[
          { id: 'all', label: 'TẤT CẢ', icon: 'fa-layer-group' },
          { id: 'sgk', label: 'SGK & TẬP HUẤN', icon: 'fa-book' },
          { id: 'legal', label: 'VĂN BẢN QUY ĐỊNH', icon: 'fa-gavel' },
          { id: 'local', label: 'HỌC LIỆU MỞ', icon: 'fa-map-location-dot' },
          { id: 'official', label: 'CỔNG THÔNG TIN BỘ', icon: 'fa-globe' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveCat(tab.id)}
            className={`flex-shrink-0 flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[10px] font-black transition-all shadow-sm uppercase tracking-widest ${activeCat === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 italic' : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'}`}
          >
            <i className={`fas ${tab.icon} text-sm`}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(res => (
          <div key={res.id} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between min-h-[300px] relative overflow-hidden border-b-8 border-b-slate-50 hover:border-b-blue-600">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-slate-100 ${res.type === 'pdf' ? 'bg-red-50 text-red-600' : res.type === 'word' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  <i className={`fas ${res.type === 'pdf' ? 'fa-file-pdf' : res.type === 'word' ? 'fa-file-word' : 'fa-link'} text-3xl`}></i>
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] border border-slate-100 px-4 py-2 rounded-full italic">Official</span>
              </div>
              <h3 className="font-black text-slate-800 line-clamp-2 mb-6 leading-relaxed uppercase italic text-sm tracking-tight">{res.name}</h3>
            </div>
            <div className="flex gap-4 relative z-10">
              <button 
                onClick={() => window.open(res.url, '_blank')}
                className="flex-1 bg-[#0f172a] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 italic"
              >
                 TRUY CẬP NGAY
              </button>
              <button className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 hover:bg-amber-100 hover:text-amber-600 transition-all border border-slate-100 shadow-inner"><i className="fas fa-bookmark text-lg"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;
