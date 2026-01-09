
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
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 px-2">
      <div className="flex justify-between items-center shrink-0">
        <button onClick={onBack} className="text-[10px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest italic">
            <i className="fas fa-arrow-left"></i> QUAY LẠI
        </button>
        <div className="text-right">
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">KHO TÀI NGUYÊN <span className="text-blue-600">THÔNG MINH</span></h1>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar shrink-0">
        {[
          { id: 'all', label: 'TẤT CẢ', icon: 'fa-layer-group' },
          { id: 'sgk', label: 'SGK & TẬP HUẤN', icon: 'fa-book' },
          { id: 'legal', label: 'VĂN BẢN', icon: 'fa-gavel' },
          { id: 'local', label: 'HỌC LIỆU', icon: 'fa-map-location-dot' },
          { id: 'official', label: 'BỘ GD&ĐT', icon: 'fa-globe' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveCat(tab.id)}
            className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl text-[9px] font-black transition-all shadow-sm uppercase tracking-widest ${activeCat === tab.id ? 'bg-blue-600 text-white shadow-lg italic' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
        {filtered.map(res => (
          <div key={res.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between min-h-[180px] relative overflow-hidden border-b-4 hover:border-b-blue-600">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${res.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  <i className={`fas ${res.type === 'pdf' ? 'fa-file-pdf' : 'fa-link'} text-xl`}></i>
                </div>
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest border border-slate-50 px-2 py-1 rounded-full italic">Official</span>
              </div>
              <h3 className="font-black text-slate-800 line-clamp-2 mb-4 leading-snug uppercase italic text-[11px] tracking-tight">{res.name}</h3>
            </div>
            <button 
              onClick={() => window.open(res.url, '_blank')}
              className="w-full bg-[#061631] text-white py-3 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all italic mt-2"
            >
               TRUY CẬP HỌC LIỆU
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;
