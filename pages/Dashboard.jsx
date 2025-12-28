import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCards from "../components/DashboardCards";
import ScheduleTable from "../components/ScheduleTable";
import WeeklyTasks from "../components/WeeklyTasks";

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        <DashboardCards />
        <div className="grid-2">
          <ScheduleTable />
          <WeeklyTasks />
        </div>
      </main>
    </div>
  );
}
