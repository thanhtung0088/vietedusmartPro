import React, { useState } from 'react';
import { generateLessonPlan, generatePPTLayout, generateTest7991 } from '../services/geminiService';

interface LessonPlannerProps {
  onBack: () => void;
}

const LessonPlanner: React.FC<LessonPlannerProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'5512' | 'PPT' | '7991'>('5512');
  const [formData, setFormData] = useState({ subject: 'Toán học', grade: '6', title: '', objectives: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGen5512 = async () => {
    if (!formData.title) return alert('Nhập tên bài học');
    setLoading(true);
    try { setResult(await generateLessonPlan(formData)); }
    catch { setResult('Lỗi AI'); }
    finally { setLoading(false); }
  };

  const handleGenPPT = async () => {
    if (!formData.title) return alert('Nhập chủ đề PPT');
    setLoading(true);
    try { setResult(await generatePPTLayout(formData.title)); }
    catch { setResult('Lỗi AI'); }
    finally { setLoading(false); }
  };

  const handleGen7991 = async () => {
    setLoading(true);
    try { setResult(await generateTest7991({ subject: formData.subject, grade: formData.grade, type: 'Kết hợp' })); }
    catch { setResult('Lỗi AI'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* UI giống code bạn gửi trước */}
    </div>
  );
};

export default LessonPlanner;
