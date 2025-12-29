import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 p-5">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-wide">
          VietEdu Smart
        </h1>
        <p className="text-sm text-slate-400">Teacher Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarItem icon={<BookOpen size={18} />} label="Soạn bài AI" />
        <SidebarItem icon={<FileText size={18} />} label="Kiểm tra" />
        <SidebarItem icon={<Settings size={18} />} label="Cài đặt" />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
