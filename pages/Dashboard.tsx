import React from 'react';

const Dashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
          Tổng quan hệ thống
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          Chào mừng thầy/cô trở lại VietEdu Smart Pro – Nền tảng hỗ trợ giảng dạy thông minh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
          <i className="fas fa-chalkboard-teacher text-5xl opacity-30 mb-6"></i>
          <p className="text-sm uppercase tracking-widest opacity-80 font-bold">Số tiết dạy hôm nay</p>
          <p className="text-5xl font-black mt-4">5</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
          <i className="fas fa-wand-magic-sparkles text-5xl opacity-30 mb-6"></i>
          <p className="text-sm uppercase tracking-widest opacity-80 font-bold">Giáo án đã soạn</p>
          <p className="text-5xl font-black mt-4">12</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
          <i className="fas fa-users text-5xl opacity-30 mb-6"></i>
          <p className="text-sm uppercase tracking-widest opacity-80 font-bold">Học sinh quản lý</p>
          <p className="text-5xl font-black mt-4">180</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-8 text-white shadow-2xl">
          <i className="fas fa-star text-5xl opacity-30 mb-6"></i>
          <p className="text-sm uppercase tracking-widest opacity-80 font-bold">Đánh giá hoàn thành</p>
          <p className="text-5xl font-black mt-4">94%</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic mb-8">
          Lịch sử hoạt động gần đây
        </h2>
        <div className="space-y-6">
          <div className="flex items-center gap-6 text-slate-600">
            <i className="fas fa-wand-magic-sparkles text-blue-600 text-xl"></i>
            <div>
              <p className="font-bold">Soạn giáo án môn Toán lớp 8</p>
              <p className="text-sm text-slate-400">2 giờ trước</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-slate-600">
            <i className="fas fa-table-list text-emerald-600 text-xl"></i>
            <div>
              <p className="font-bold">Nhập điểm kiểm tra Ngữ văn</p>
              <p className="text-sm text-slate-400">4 giờ trước</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-slate-600">
            <i className="fas fa-camera text-amber-600 text-xl"></i>
            <div>
              <p className="font-bold">Quét thời khóa biểu tuần mới</p>
              <p className="text-sm text-slate-400">Hôm qua</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">
          Hệ thống đang hoạt động ổn định • Phiên bản 1.0 • {new Date().toLocaleDateString('vi-VN')}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;