import React from 'react';

const ResourceHub: React.FC = () => {
  const sections = [
    {
      group: "HỆ THỐNG NGÀNH",
      color: "from-blue-600 to-cyan-400",
      items: [
        { title: "Bộ GD&ĐT", icon: "fa-globe", url: "https://moet.gov.vn/", bg: "bg-blue-600" },
        { title: "Tập huấn NXB", icon: "fa-chalkboard-teacher", url: "https://taphuan.nxbgd.vn/", bg: "bg-indigo-600" },
        { title: "Cổng PGD&ĐT", icon: "fa-landmark", url: "https://hochiminhcity.gov.vn/", bg: "bg-slate-700" },
        { title: "Kho iGiaoduc", icon: "fa-database", url: "https://igiaoduc.vn/", bg: "bg-cyan-500" },
      ]
    },
    {
      group: "HỌC LIỆU SỐ",
      color: "from-emerald-600 to-teal-400",
      items: [
        { title: "Hành trang số", icon: "fa-book-open", url: "https://hanhtrangso.nxbgd.vn/", bg: "bg-emerald-500" },
        { title: "Thư viện Violet", icon: "fa-play-circle", url: "https://baigiang.violet.vn/", bg: "bg-rose-500" },
        { title: "Truyền hình VTV7", icon: "fa-tv", url: "https://vtv.vn/truyen-hinh-truc-tuyen/vtv7.htm", bg: "bg-fuchsia-600" },
        { title: "Tri thức Việt", icon: "fa-brain", url: "https://ithuc.vn/", bg: "bg-teal-600" },
      ]
    },
    {
      group: "VĂN BẢN & TRA CỨU",
      color: "from-orange-600 to-yellow-400",
      items: [
        { title: "Công văn 5512", icon: "fa-file-pdf", url: "https://moet.gov.vn/", bg: "bg-red-500" },
        { title: "Công văn 7991", icon: "fa-file-invoice", url: "https://thuvienphapluat.vn/", bg: "bg-orange-500" },
        { title: "Học tập theo Bác", icon: "fa-star", url: "http://hoidongtotnghiep.edu.vn/", bg: "bg-amber-500" },
        { title: "Từ điển VDict", icon: "fa-search", url: "https://vdict.com/", bg: "bg-sky-500" },
      ]
    }
  ];

  return (
    <div className="h-screen w-full bg-[#E0F2FE] p-4 flex flex-col font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
        
        {/* Header Siêu Gọn */}
        <div className="flex justify-between items-center mb-4 p-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <i className="fas fa-th text-lg"></i>
            </div>
            <div>
                <h1 className="text-xl font-black text-blue-900 tracking-tighter italic uppercase leading-none">Resource Hub <span className="text-blue-600">4.0</span></h1>
                <p className="text-blue-400 text-[8px] font-bold tracking-[0.2em] uppercase">Smart Lab Ecosystem</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black rounded-full shadow-lg shadow-blue-200 uppercase tracking-widest cursor-default">
             Live Update
          </div>
        </div>

        {/* Vùng chứa có thanh cuộn (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid gap-4">
            {sections.map((sec, idx) => (
              <div key={idx} className="bg-white/40 border border-white rounded-[2rem] p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <div className={`h-4 w-1 rounded-full bg-gradient-to-b ${sec.color}`}></div>
                  <h2 className="text-[10px] font-black tracking-[0.2em] text-blue-800 uppercase italic">{sec.group}</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sec.items.map((item, i) => (
                    <div 
                      key={i}
                      onClick={() => window.open(item.url, '_blank')}
                      className="group bg-white border border-blue-50 rounded-2xl p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300"
                    >
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 shrink-0 rounded-xl ${item.bg} flex items-center justify-center text-white text-lg shadow-md group-hover:rotate-6 transition-all`}>
                              <i className={`fas ${item.icon}`}></i>
                          </div>
                          <div className="overflow-hidden">
                              <h3 className="text-[11px] font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors italic truncate">
                                  {item.title}
                              </h3>
                              <span className="text-[7px] font-black text-blue-300 uppercase tracking-tighter">Click to open</span>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="py-3 text-center">
             <p className="text-[8px] font-bold text-blue-400 tracking-[0.4em] uppercase opacity-60 italic">VietEdu Smart Lab • v2.0</p>
        </div>
      </div>

      {/* CSS Thanh cuộn mini */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #93C5FD; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3B82F6; }
      `}</style>
    </div>
  );
};

export default ResourceHub;