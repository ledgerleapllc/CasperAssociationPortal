import AppFooter from './app-footer';
import Navigation from '../dashboard/navigation';

export default function LayoutDashboard({ children }) {
  return (
    <div>
      <div className="dashboard-layout">
        <div
          className="
            relative h-screen h-px mx-auto flex flex-col max-w-404 px-4
            lg:py-4
            xl:py-20
            2xl:py-24 2xl:min-h-105"
        >
          <div className="flex h-full flex-col lg:flex-row">
            <div className="flex-none">
              <Navigation />
            </div>
            <div className="pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full">
              {children}
            </div>
          </div>
          <div className="absolute py-8 left-0 bottom-0 right-0">
            <AppFooter theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
