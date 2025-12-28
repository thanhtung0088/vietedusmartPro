import React, { useState } from 'react';
import { Pencil, Calendar, BookOpen, Gamepad2, ClipboardList, Star, FileText, Library } from 'lucide-react';

const Dashboard = () => {
  const [weeklyTasks, setWeeklyTasks] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });

  const handleTaskChange = (day: string, value: string) => {
    setWeeklyTasks(prev => ({ ...prev, [day]: value }));
  };

  const days = [
    { key: 'monday', label: 'Thứ 2' },
    { key: 'tuesday', label: 'Thứ 3' },
    { key: 'wednesday', label: 'Thứ 4' },
    { key: 'thursday', label: 'Thứ 5' },
    { key: 'friday', label: 'Thứ 6' },
    { key: 'saturday', label: 'Thứ 7' },
    { key: 'sunday', label: 'CN' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header chào mừng với glassmorphism */}
        <div className="relative mx-4 mt-6 mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-2 rounded-full bg-cyan-400 px-4 py-1.5 text-sm font-semibold text-white inline-block">
                VIETEDU SMART V16.4
              </div>
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                CHÀO THẦY TÙNG!
              </h1>
              <p className="mt-2 text-xl text-cyan-200">
                Kiến tạo tương lai giáo dục số!
              </p>
            </div>

            {/* Trợ lý AI 3D bên phải */}
            <div className="relative">
              <div className="h-48 w-48 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-1 shadow-2xl">
                <div className="h-full w-full rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src="https://i.imgur.com/0z0X9kZ.png" // Thay bằng link ảnh AI 3D đẹp của bạn
                    alt="Trợ lý AI"
                    className="h-40 w-40 object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Các chức năng chính */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tiêu đề phần giảng dạy */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                GIẢNG DẠY
              </h2>
              <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-3">
                <ClipboardList className="w-8 h-8 text-indigo-600" />
                QUẢN LÝ CHUYÊN MÔN
              </h2>
            </div>

            {/* Grid các card chức năng */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Pencil, label: 'SOẠN GIÁO ÁN AI', color: 'from-blue-500 to-blue-600' },
                { icon: BookOpen, label: 'BÀI GIẢNG ĐIỆN TỬ', color: 'from-indigo-500 to-purple-600' },
                { icon: Gamepad2, label: 'GAME CENTER', color: 'from-purple-500 to-pink-600' },
                { icon: ClipboardList, label: 'SỔ ĐIỂM THCS', color: 'from-cyan-500 to-teal-600' },
                { icon: Star, label: 'SỔ CHỦ NHIỆM', color: 'from-orange-500 to-amber-600' },
                { icon: FileText, label: 'BỘ RUBRICS', color: 'from-green-500 to-emerald-600' },
                { icon: Library, label: 'KH CHUYÊN MÔN', color: 'from-blue-600 to-indigo-700' },
                { icon: Library, label: 'KHO HỌC LIỆU', color: 'from-gray-500 to-gray-600' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl cursor-pointer`}
                >
                  <div className="text-white">
                    <item.icon className="w-12 h-12 mb-4 opacity-90" />
                    <p className="font-bold text-lg leading-tight">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lịch dạy hôm nay & Ghi chú nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  LỊCH DẠY HÔM NAY
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>01</span>
                    <span>CHƯA CẬP NHẬT NỘI DUNG TIẾT DẠY</span>
                    <span className="text-gray-400">--</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>02</span>
                    <span>CHƯA CẬP NHẬT NỘI DUNG TIẾT DẠY</span>
                    <span className="text-gray-400">--</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  GHI CHÚ NHANH
                </h3>
                <textarea
                  className="w-full h-32 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-4 text-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Ghi chú nhanh công việc hôm nay..."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Công việc trong tuần */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                Công việc trong tuần
              </h3>
              <div className="grid grid-cols-7 gap-3 text-center">
                {days.map(day => (
                  <div key={day.key} className="space-y-2">
                    <div className="font-semibold text-blue-800 text-sm">
                      {day.label}
                    </div>
                    <textarea
                      value={weeklyTasks[day.key as keyof typeof weeklyTasks]}
                      onChange={(e) => handleTaskChange(day.key, e.target.value)}
                      className="w-full h-24 rounded-lg border border-blue-200 bg-blue-50/70 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;