
import React, { useState, useEffect, useMemo } from 'react';
import { generateAIComment } from '../services/geminiService';
import ZoomMeeting from './ZoomMeeting';
import { Student } from '../types';

const GradeBook: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelPasteData, setExcelPasteData] = useState('');
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const [grade, setGrade] = useState('Khối 6');
  const [className, setClassName] = useState('6.1');
  const [subject, setSubject] = useState('Toán học');
  const [semester, setSemester] = useState('Học kỳ 1');

  // Khối lớp từ 1 đến 12
  const gradeOptions = Array.from({ length: 12 }, (_, i) => `Khối ${i + 1}`);
  
  // Tên lớp định dạng X.Y (VD: 6.1, 10.5)
  const classOptions = useMemo(() => {
    const gradeNum = parseInt(grade.split(' ')[1]);
    return Array.from({ length: 12 }, (_, i) => `${gradeNum}.${i + 1}`);
  }, [grade]);

  // Môn học đầy đủ chương trình 2018
  const subjectOptions = [
    "Toán học", "Ngữ văn", "Tiếng Anh", "GDTC", "KHTN (Lý)", "KHTN (Hóa)", "KHTN (Sinh)", 
    "Lịch sử & Địa lý", "Tin học", "Công nghệ", "GD Kinh tế & Pháp luật", "Nghệ thuật", 
    "Trải nghiệm hướng nghiệp", "Nội dung giáo dục địa phương"
  ];

  useEffect(() => {
    const key = `vietedu_grades_v7_${grade}_${className}_${subject}_${semester}`;
    const saved = localStorage.getItem(key);
    if (saved) setStudents(JSON.parse(saved));
    else setStudents([]);
  }, [grade, className, subject, semester]);

  const calculateAvg = (s: any) => {
    const t1 = parseFloat(s.tx1) || 0;
    const t2 = parseFloat(s.tx2) || 0;
    const t3 = parseFloat(s.tx3) || 0;
    const t4 = parseFloat(s.tx4) || 0;
    const g = parseFloat(s.gk) || 0;
    const c = parseFloat(s.ck) || 0;
    const countTX = (s.tx1 ? 1 : 0) + (s.tx2 ? 1 : 0) + (s.tx3 ? 1 : 0) + (s.tx4 ? 1 : 0);
    const count = countTX + (s.gk ? 2 : 0) + (s.ck ? 3 : 0);
    if (count === 0) return '0.0';
    return ((t1 + t2 + t3 + t4 + (g * 2) + (c * 3)) / count).toFixed(1);
  };

  const handleUpdateGrade = (idx: number, field: string, value: string) => {
    const updated = [...students];
    updated[idx][field] = value;
    updated[idx].avg = calculateAvg(updated[idx]);
    setStudents(updated);
    localStorage.setItem(`vietedu_grades_v7_${grade}_${className}_${subject}_${semester}`, JSON.stringify(updated));
  };

  const handleAICommentBulk = async () => {
    if (students.length === 0) return alert("Vui lòng nạp dữ liệu học sinh!");
    setIsBulkGenerating(true);
    const updated = [...students];
    try {
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].avg && updated[i].avg !== '0.0') {
          updated[i].isGenerating = true;
          setStudents([...updated]);
          const comment = await generateAIComment(parseFloat(updated[i].avg), subject);
          updated[i].comment = comment || '"Em nỗ lực học tập tốt."';
          updated[i].isGenerating = false;
        }
      }
      setStudents([...updated]);
      localStorage.setItem(`vietedu_grades_v7_${grade}_${className}_${subject}_${semester}`, JSON.stringify(updated));
    } catch (e) { alert("Lỗi AI."); } finally { setIsBulkGenerating(false); }
  };

  const handleImportExcel = () => {
    const rows = excelPasteData.trim().split('\n');
    if (!rows[0]) return;
    const newStudents = rows.map((row, i) => {
      const cols = row.split('\t');
      const student: any = {
        id: Date.now().toString() + i,
        code: cols[0] || `HS${1000 + i}`,
        name: cols[1] || `Học sinh ${i + 1}`,
        tx1: cols[2] || '', tx2: cols[3] || '', tx3: cols[4] || '', tx4: cols[5] || '',
        gk: cols[6] || '', ck: cols[7] || '',
        avg: '0.0', comment: ''
      };
      student.avg = calculateAvg(student);
      return student;
    });
    setStudents(newStudents);
    localStorage.setItem(`vietedu_grades_v7_${grade}_${className}_${subject}_${semester}`, JSON.stringify(newStudents));
    setIsExcelModalOpen(false);
    setExcelPasteData('');
  };

  if (showZoom) return <ZoomMeeting onBack={() => setShowZoom(false)} />;

  return (
    <div className="bg-[#f1f5f9] min-h-screen flex flex-col font-sans overflow-hidden animate-in fade-in">
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-8 h-8 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><i className="fas fa-arrow-left"></i></button>
          <h1 className="text-blue-600 font-bold text-[13px] uppercase italic">SỔ ĐIỂM SỐ LAB 4.0 - CHƯƠNG TRÌNH 2018</h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => setIsExcelModalOpen(true)} className="bg-[#006899] text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic shadow-lg active:scale-95">Nhập từ excel</button>
           <button className="bg-slate-800 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic shadow-lg active:scale-95">Xuất báo cáo</button>
        </div>
      </div>

      <div className="bg-[#fdfdfd] border-b border-slate-200 p-4 shrink-0 flex items-center gap-6 text-[12px] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2"><span className="font-bold uppercase italic opacity-50">Khối:</span>
           <select value={grade} onChange={e => setGrade(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-1.5 bg-white font-bold">{gradeOptions.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="flex items-center gap-2"><span className="font-bold uppercase italic opacity-50">Lớp:</span>
           <select value={className} onChange={e => setClassName(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-1.5 bg-white font-bold">{classOptions.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="flex items-center gap-2"><span className="font-bold uppercase italic opacity-50">Môn:</span>
           <select value={subject} onChange={e => setSubject(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-1.5 bg-white font-bold">{subjectOptions.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <button onClick={handleAICommentBulk} disabled={isBulkGenerating} className="ml-auto bg-blue-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase italic shadow-lg flex items-center gap-3 active:scale-95">
           <i className="fas fa-robot"></i> {isBulkGenerating ? 'ĐANG PHÂN TÍCH...' : 'AI NHẬN XÉT ĐIỂM SỐ'}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-slate-300 shadow-xl overflow-hidden rounded-xl">
          <table className="w-full border-collapse text-[11px] min-w-[1800px]">
            <thead className="bg-[#006899] text-white">
              <tr className="font-bold text-center">
                <th rowSpan={2} className="p-4 border border-white/20 w-12">STT</th>
                <th rowSpan={2} className="p-4 border border-white/20 min-w-[250px]">Họ tên học sinh</th>
                <th colSpan={4} className="p-2 border border-white/20 uppercase bg-[#005a85]">ĐĐG Thường xuyên (HS1)</th>
                <th rowSpan={2} className="p-4 border border-white/20 w-24 uppercase bg-[#004a6b]">Giữa kỳ (HS2)</th>
                <th rowSpan={2} className="p-4 border border-white/20 w-24 uppercase bg-[#004a6b]">Cuối kỳ (HS3)</th>
                <th rowSpan={2} className="p-4 border border-white/20 w-24 bg-blue-900 italic">ĐTB mhk</th>
                <th rowSpan={2} className="p-4 border border-white/20">Nhận xét (AI phân tích)</th>
              </tr>
              <tr className="bg-[#005a85] text-white">
                <th className="p-2 border border-white/20 w-16">TX1</th>
                <th className="p-2 border border-white/20 w-16">TX2</th>
                <th className="p-2 border border-white/20 w-16">TX3</th>
                <th className="p-2 border border-white/20 w-16">TX4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length > 0 ? students.map((s, idx) => (
                <tr key={s.id} className="hover:bg-blue-50/50 h-12 transition-colors">
                  <td className="p-2 text-center border border-slate-200 bg-slate-50 font-bold">{idx + 1}</td>
                  <td className="p-2 border border-slate-200 font-black text-slate-800 uppercase italic px-6">{s.name}</td>
                  <td className="p-0 border border-slate-200"><input className="w-full h-12 text-center outline-none focus:bg-amber-50 font-black" value={s.tx1} onChange={e => handleUpdateGrade(idx, 'tx1', e.target.value)} /></td>
                  <td className="p-0 border border-slate-200"><input className="w-full h-12 text-center outline-none focus:bg-amber-50 font-black" value={s.tx2} onChange={e => handleUpdateGrade(idx, 'tx2', e.target.value)} /></td>
                  <td className="p-0 border border-slate-200"><input className="w-full h-12 text-center outline-none focus:bg-amber-50 font-black" value={s.tx3} onChange={e => handleUpdateGrade(idx, 'tx3', e.target.value)} /></td>
                  <td className="p-0 border border-slate-200"><input className="w-full h-12 text-center outline-none focus:bg-amber-50 font-black" value={s.tx4} onChange={e => handleUpdateGrade(idx, 'tx4', e.target.value)} /></td>
                  <td className="p-0 border border-slate-200 bg-blue-50/30"><input className="w-full h-12 text-center outline-none focus:bg-blue-100 font-black text-blue-700" value={s.gk} onChange={e => handleUpdateGrade(idx, 'gk', e.target.value)} /></td>
                  <td className="p-0 border border-slate-200 bg-blue-50/30"><input className="w-full h-12 text-center outline-none focus:bg-blue-100 font-black text-rose-700" value={s.ck} onChange={e => handleUpdateGrade(idx, 'ck', e.target.value)} /></td>
                  <td className="p-2 text-center border border-slate-200 font-black text-blue-900 bg-blue-50 text-[14px]">{s.avg}</td>
                  <td className="p-2 border border-slate-200 italic text-[11px] text-slate-600 px-6">
                     {s.isGenerating ? <i className="fas fa-spinner fa-spin text-blue-500"></i> : (s.comment || 'Chưa có nhận xét')}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={11} className="p-40 text-center opacity-20 font-black italic uppercase tracking-[0.3em]">Hệ thống đã sẵn sàng nạp dữ liệu số</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isExcelModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061631]/95 backdrop-blur-xl p-8 animate-in fade-in">
           <div className="bg-white w-full max-w-4xl rounded-xl shadow-3xl overflow-hidden">
              <div className="p-10 bg-[#006899] text-white flex justify-between items-center">
                 <div className="flex items-center gap-6"><i className="fas fa-file-excel text-3xl"></i><h3 className="text-xl font-black uppercase italic tracking-tighter">ĐỒNG BỘ ĐIỂM SỐ TỪ EXCEL</h3></div>
                 <button onClick={() => setIsExcelModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/10"><i className="fas fa-times"></i></button>
              </div>
              <div className="p-10 space-y-6">
                 <textarea value={excelPasteData} onChange={e => setExcelPasteData(e.target.value)} rows={12} className="w-full bg-slate-50 border-2 rounded-xl p-8 text-[11px] font-mono outline-none focus:border-blue-500 font-bold" placeholder="Dán các cột: MÃ HS - HỌ TÊN - TX1 - TX2 - TX3 - TX4 - GK - CK" />
                 <button onClick={handleImportExcel} className="w-full bg-[#006899] text-white font-black py-6 rounded-xl shadow-xl uppercase italic border-b-8 border-black active:translate-y-2 transition-all">HOÀN TẤT ĐỒNG BỘ DỮ LIỆU</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default GradeBook;
