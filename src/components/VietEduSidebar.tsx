import { NavLink } from "react-router-dom";

export default function VietEduSidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">VIETEDUMIDDLE</h1>

      <nav className="space-y-2">
        <NavLink to="/" className="block px-3 py-2 rounded hover:bg-blue-700">
          TỔNG QUAN
        </NavLink>

        <NavLink
          to="/lesson-planner"
          className="block px-3 py-2 rounded hover:bg-blue-700"
        >
          SOẠN BÀI AI
        </NavLink>
      </nav>
    </aside>
  );
}
