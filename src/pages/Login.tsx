import React, { useState } from 'react';

const Login: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const [loginType, setLoginType] = useState<'admin' | 'teacher'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    // Logic xác thực đơn giản để Thầy test
    if (username && password) {
      onLogin({ name: username, role: loginType });
    } else {
      alert("Vui lòng nhập đủ tài khoản và mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      {/* Container chính với hiệu ứng bo góc và đổ bóng */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[550px]">
        
        {/* CỘT TRÁI: Màu xanh đậm đặc trưng VietEdu */}
        <div className="md:w-2/5 bg-[#0a1d37] p-10 flex flex-col justify-between text-white relative">
          <div>
            <div className="w-16 h-16 bg-[#4a90e2] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-3xl">🎓</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter leading-none mb-2">
              VIETEDU <br /> <span className="text-[#4a90e2]">SMART OS</span>
            </h1>
            <p className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-8 uppercase">
              Lab Số 4.0 • Trường học thông minh
            </p>
          </div>

          {/* Khối trích dẫn bo góc */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[30px] backdrop-blur-sm">
            <p className="text-sm italic font-light leading-relaxed opacity-90">
              "Hệ thống quản trị và giảng dạy cá nhân hóa - Mỗi giáo viên một không gian số riêng biệt."
            </p>
          </div>

          {/* Nút chuyển đổi loại tài khoản */}
          <div className="flex gap-2 mt-8">
            <button 
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold transition-all ${loginType === 'admin' ? 'bg-[#4a1d2e] border border-red-500/50 shadow-lg' : 'bg-white/10 opacity-50'}`}
            >
              🛡️ ADMIN LOGIN
            </button>
            <button 
              onClick={() => setLoginType('teacher')}
              className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold transition-all ${loginType === 'teacher' ? 'bg-[#1d3557] border border-blue-500/50 shadow-lg' : 'bg-white/10 opacity-50'}`}
            >
              👤 TEACHER LOGIN
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: Form đăng nhập */}
        <div className="md:w-3/5 p-12 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h2 className="text-3xl font-black italic text-[#0a1d37] uppercase tracking-tight">
              Hệ thống công vụ
            </h2>
            <div className="h-1 w-12 bg-[#4a90e2] mt-2 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">
                Tài khoản công vụ
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">👤</span>
                <input 
                  type="text"
                  placeholder="Username..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">
                Mật khẩu bảo mật
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">🔒</span>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleAuth}
              className="w-full bg-[#0a1d37] hover:bg-[#162a45] text-white font-bold py-5 rounded-2xl shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
            >
              <span className="text-xs tracking-[0.2em]">XÁC THỰC DANH TÍNH</span>
              <span className="text-lg">→</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-black text-gray-300 tracking-[0.3em] uppercase">Dành cho khách</span></div>
            </div>

            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all">
              🏃 THAM QUAN LAB SỐ (GUEST)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;