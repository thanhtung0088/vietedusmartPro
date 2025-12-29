import VietEduSidebar from "./components/VietEduSidebar";
import Dashboard from "./pages/Dashboard";
import LessonPlanner from "./pages/LessonPlanner";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen">
      <VietEduSidebar />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson-planner" element={<LessonPlanner />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
