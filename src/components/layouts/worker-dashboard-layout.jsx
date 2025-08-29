import UserNavbar from "./navbar/user-dashboard-nav";
import WorkerSidebar from "./worker-sidebard";

function WorkerDashboardLayout({ children }) {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden bg-offwhite">
      <UserNavbar />
      <WorkerSidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

export default WorkerDashboardLayout;
