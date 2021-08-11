import Sidebar from '../dashboard/sidebar';
import Header from '../dashboard/header';
import AppHeader from './app-header';

export default function LayoutDashboard({ children, bg }) {
  return (
    <div>
      <div className="dashboard-layout flex h-screen min-h-600px">
        <Sidebar />
        <div className="flex-1 h-full">
          <AppHeader className="px-5 py-4 lg:hidden" theme="dark" />
          <Header />
          <div
            className={`${
              bg || ''
            } px-5 py-6.25 dashboard-content flex-1 h-100%-18`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
