import Sidebar from "./components/VietEduSidebar"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
