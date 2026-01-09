
import React, { useState, useRef } from 'react';
import { generateLessonPlan, generateTest7991 } from '../services/geminiService';
import { UserRole } from '../types';

const LessonPlanner: React.FC<{onBack: () => void, userPlan: string, userRole: UserRole}> = ({ onBack, userPlan, userRole }) => {
  const [activeTab, setActiveTab] = useState<'5512' | '7991'>('5512');
  const [formData, setFormData] = useState({ subject: 'Toán học', grade: '6', title: '', objectives: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  
  const handleGenerate = async () => {
    if (!formData.title) return alert('Vui lòng nhập tên bài dạy');
    setLoading(true);
    setResult(null);
    try {
      let res = "";
      if (activeTab === '5512') res = await generateLessonPlan(formData);
      else res = await generateTest7991(formData);
      setResult(res);
    } catch (e) {
      setResult("Lỗi kết nối máy chủ AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachments(prev => [...prev, file.name]);
      alert(`Đã gán tài liệu: ${file.name}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden animate-in fade-in">
      <input type="file" ref={fileRef} className="hidden" onChange={handleFile} />
      <div className="bg-white border-b border-slate-200 px-10 py-5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-8">
          <button onClick={onBack} className="w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm transition-all">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#061631] uppercase italic leading-none tracking-tighter">CHUYÊN GIA SOẠN BÀI AI PROFESSIONAL</h1>
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.4em] mt-2 italic">LAB SỐ v4.0 - SƯ PHẠM THÔNG MINH</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => fileRef.current?.click()} className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-lg border border-emerald-100">
             <i className="fas fa-plus text-xl"></i>
          </button>
          <button className="px-6 py-3 bg-rose-600 text-white text-[11px] font-black rounded-lg uppercase italic shadow-xl border-b-4 border-rose-900 active:translate-y-1 transition-all"><i className="fas fa-file-pdf mr-2 text-sm"></i> XUẤT PDF</button>
          <button className="px-6 py-3 bg-blue-600 text-white text-[11px] font-black rounded-lg uppercase italic shadow-xl border-b-4 border-blue-900 active:translate-y-1 transition-all"><i className="fas fa-file-word mr-2 text-sm"></i> XUẤT WORD</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[380px] border-r border-slate-200 bg-white p-10 overflow-y-auto no-scrollbar shrink-0 shadow-2xl z-10">
          <div className="space-y-8">
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-10 border border-slate-200 shadow-inner">
              <button onClick={() => setActiveTab('5512')} className={`flex-1 py-4 text-[11px] font-black rounded-lg uppercase italic transition-all ${activeTab === '5512' ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>KẾ HOẠCH 5512</button>
              <button onClick={() => setActiveTab('7991')} className={`flex-1 py-4 text-[11px] font-black rounded-lg uppercase italic transition-all ${activeTab === '7991' ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>ĐỀ KIỂM TRA 7991</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase italic mb-3 block tracking-[0.2em]">TÊN BÀI DẠY / CHỦ ĐỀ</label>
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-5 text-[14px] font-bold italic outline-none focus:border-blue-500 rounded-xl transition-all shadow-inner" placeholder="VD: Khái niệm số hữu tỉ..." />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase italic mb-3 block tracking-[0.2em]">KHỐI LỚP</label>
                  <select value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-5 text-[14px] font-bold italic outline-none rounded-xl">
                    {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>LỚP {g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase italic mb-3 block tracking-[0.2em]">MÔN HỌC</label>
                  <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-5 text-[14px] font-bold italic outline-none rounded-xl">
                    <option>Toán học</option><option>Ngữ văn</option><option>Tiếng Anh</option><option>KHTN</option><option>Lịch sử - Địa lý</option>
                  </select>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-[9px] font-black text-emerald-600 uppercase italic block mb-2">Tài liệu đã gán ({attachments.length}):</span>
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((a, i) => <span key={i} className="bg-white px-3 py-1 rounded-md text-[8px] font-bold border border-emerald-200">{a}</span>)}
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-xl font-black uppercase italic tracking-[0.2em] shadow-2xl hover:bg-[#061631] transition-all border-b-8 border-blue-900 active:translate-y-2">
              {loading ? <i className="fas fa-spinner fa-spin mr-4 text-xl"></i> : <i className="fas fa-magic mr-4 text-xl"></i>}
              {loading ? 'AI ĐANG SOẠN THẢO...' : 'BẮT ĐẦU SOẠN AI'}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-200 p-16 overflow-y-auto no-scrollbar flex flex-col items-center">
          <div className="w-full max-w-[850px] bg-white min-h-[1100px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-20 relative rounded-sm animate-in zoom-in-95 duration-700">
            {result ? (
              <>
                <div className="flex justify-between items-start mb-20 text-[14px] font-bold italic text-slate-800 uppercase tracking-tighter leading-relaxed">
                   <div className="text-center">
                      <p>Hệ sinh thái VietEdu Smart</p>
                      <p className="border-b-2 border-black pb-1 mt-1 font-black">TỔ: {formData.subject.toUpperCase()}</p>
                   </div>
                   <div className="text-center">
                      <p className="font-black">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                      <p className="italic border-b-2 border-black pb-1 mt-1">Độc lập - Tự do - Hạnh phúc</p>
                   </div>
                </div>

                <div className="text-center mb-20">
                   <h2 className="text-3xl font-black uppercase italic tracking-tighter">KẾ HOẠCH BÀI DẠY (GIÁO ÁN)</h2>
                   <p className="text-[18px] font-black uppercase italic mt-6 border-y-2 border-slate-100 py-4">BÀI: {formData.title}</p>
                   <p className="text-[14px] font-bold italic mt-4 text-slate-500 uppercase tracking-widest">Khối: {formData.grade} | Môn: {formData.subject}</p>
                </div>

                <div className="text-[17px] leading-[1.8] text-slate-800 space-y-10 font-serif italic text-justify px-4 whitespace-pre-wrap animate-in fade-in duration-1000">
                   {result}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[800px] text-center opacity-20">
                 <i className="fas fa-feather-pointed text-[180px] mb-12 animate-pulse"></i>
                 <h3 className="text-4xl font-black uppercase italic tracking-[0.5em] mb-4">PREVIEW GIÁO ÁN</h3>
                 <p className="text-xl font-bold italic">Vui lòng nhập tiêu đề bài dạy và bấm "BẮT ĐẦU SOẠN AI" để xem kết quả</p>
                 <div className="mt-12 w-32 h-1 bg-slate-300 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner;
