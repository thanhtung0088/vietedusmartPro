import { NavLink } from "react-router-dom"

const menu = [
  { to: "/", label: "TỔNG QUAN" },
  { to: "/lesson-ai", label: "SOẠN BÀI AI" },
  { to: "/gradebook", label: "SỔ ĐIỂM THÔNG MINH" },
  { to: "/rubrics", label: "RUBRICS ĐÁNH GIÁ" },
  { to: "/library", label: "KHO HỌC LIỆU" }
]

const VietEduSidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen">
      <div className="p-4 font-bold text-xl border-b border-blue-700">
        VIETEDU SMART
      </div>

      {menu.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block p-4 ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  )
}

export default VietEduSidebar
