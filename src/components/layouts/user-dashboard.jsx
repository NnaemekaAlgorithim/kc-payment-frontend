import UserNavbar from "./navbar/user-dashboard-nav";
import Sidebar from "./sidebar";

function UserDashboardLayout({ children }) {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden bg-offwhite">
      <UserNavbar />
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

export default UserDashboardLayout;
