import VietEduSidebar from "./components/VietEduSidebar"
import Dashboard from "./pages/Dashboard"
import LessonPlanner from "./pages/LessonPlanner"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="flex">
      <VietEduSidebar />

      <main className="flex-1 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson-ai" element={<LessonPlanner />} />
          <Route path="/gradebook" element={<div className="p-6">📊 Sổ điểm</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
