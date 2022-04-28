import { useSelector } from 'react-redux';
import Sidebar from '../dashboard/sidebar';
import Header from '../dashboard/header';

export default function LayoutDashboard({ children, bg }) {
  const isCollapsed = useSelector(
    state => state.authReducer.appInfo.isCollapsed
  );

  return (
    <div id="dashboard-layout">
      <Sidebar />
      <div
        id="dashboard-layoutContent"
        className={isCollapsed ? 'collapsedSidebar' : ''}
      >
        <Header />
        <div
          id="landing-page__dashboard"
          className={`${bg || ''} px-5 py-6.25`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
