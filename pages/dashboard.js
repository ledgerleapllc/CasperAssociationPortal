import AppFooter from '../components/layouts/app-footer';
import NavigateLeft from '../components/Dashboard/navigate-left';
import InfoRight from '../components/Dashboard/info-right';

const Dashboard = () => (
  <div className="flex justify-center min-h-screen">
    <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
      <div className="flex justify-between mt-16 md:mt-0">
        <NavigateLeft />
        <div className="text-sm">aaaaaa</div>
        <InfoRight />
      </div>
      <AppFooter theme="dark" />
    </div>
  </div>
);

export default Dashboard;
