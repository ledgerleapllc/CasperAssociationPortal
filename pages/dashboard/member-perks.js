import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';

const DashboardMemberPerks = () => (
  <LayoutDashboard>
    <div className="bg-transparent h-full">
      <div className="h-3/5 w-full">
        <div className="lg:mr-24 lg:h-70px flex flex-col justify-center">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
            Member Perks
          </h3>
          <div className="border-primary border-b-2" />
        </div>
        <div className="pt-3 h-full lg:pr-24">
          <div className="flex pb-5 h-11/20">
            <div className="w-9/20 pr-2.5">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <div className="flex mb-10">
                  <p className="text-lg">Membership Status</p>
                  <img
                    className="pl-3 lg:pl-5"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <p className="text-xl">MEMBER</p>
              </Card>
            </div>
            <div className="w-9/20">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-row py-1">
                      <span className="text-lg">Uptime</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <div className="relative h-4 text-xs">
                      <div className="overflow-hidden w-full rounded-lg bg-gray flex bg-opacity-50">
                        <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
                          75%
                        </div>
                      </div>
                      <div className="transform -translate-y-2/4 absolute h-8 border-l-4 left-20 top-1/2" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row py-1">
                      <span className="text-lg">Peers</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <div className="relative h-4 text-xs">
                      <div className="overflow-hidden w-full rounded-lg bg-gray flex bg-opacity-50">
                        <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
                          75%
                        </div>
                      </div>
                      <div className="transform -translate-y-2/4 absolute h-8 border-l-4 left-60 top-1/2" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row py-1">
                      <span className="text-lg">Performance</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <div className="relative h-4 text-xs">
                      <div className="overflow-hidden w-full rounded-lg bg-gray flex bg-opacity-50">
                        <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
                          75%
                        </div>
                      </div>
                      <div className="transform -translate-y-2/4 absolute h-8 border-l-4 left-40 top-1/2" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="flex">
            <div className="w-4/6 pr-2.5">
              <Card className="p-6 lg:shadow-2xl flex" noShadow>
                <div className="flex flex-col w-1/2 px-5 lg:px-0 border-r border-gray lg:pl-20 justify-center">
                  <div className="flex flex-row">
                    <span className="text-lg">Daily Earnings</span>
                    <img
                      className="pl-3 lg:pl-5"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <div className="flex flex-row mt-3">
                    <img
                      width="18px"
                      height="18px"
                      src="/images/ic_logo_home.svg"
                      alt="Info"
                    />
                    <span className="text-base font-thin pl-3">0.0154</span>
                  </div>
                </div>
                <div className="flex flex-col px-5 lg:px-0 w-1/2 border-r border-gray lg:pl-20 justify-center">
                  <div className="flex flex-row">
                    <span className="text-lg">Total Earnings</span>
                    <img
                      className="pl-3 lg:pl-5"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <div className="flex flex-row mt-3">
                    <img
                      width="18px"
                      height="18px"
                      src="/images/ic_logo_home.svg"
                      alt="Info"
                    />
                    <span className="text-base font-thin pl-3">6.101297</span>
                  </div>
                </div>
                <div className="flex flex-col px-5 lg:px-0 w-1/2 lg:pl-20 justify-center">
                  <div className="flex flex-row">
                    <span className="text-lg">Total Earnings</span>
                    <img
                      className="pl-3 lg:pl-5"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <div className="flex flex-row mt-3">
                    <img
                      width="18px"
                      height="18px"
                      src="/images/ic_logo_home.svg"
                      alt="Info"
                    />
                    <span className="text-base font-thin pl-3">6.101297</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-2/5 w-full">
        <div className="lg:mr-24 lg:h-70px flex flex-col justify-center">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
            Member Perks
          </h3>
          <div className="border-primary border-b-2" />
        </div>
        <div className="pt-3 flex-grow">
          <div className="lg:pr-24 flex h-full">
            <div className="lg:w-60 pr-9 h-full">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <p className="text-xl">Discount tickets</p>
              </Card>
            </div>
            <div className="lg:w-60 pr-9 h-full">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <p className="text-xl">Discount tickets</p>
              </Card>
            </div>
            <div className="lg:w-60 pr-9 h-full">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <p className="text-xl">Discount tickets</p>
              </Card>
            </div>
            <div className="lg:w-60 pr-9 h-full">
              <Card className="p-6 lg:shadow-2xl h-full" noShadow>
                <p className="text-xl">Discount tickets</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutDashboard>
);

export default LoadingScreen(DashboardMemberPerks, 'final-all');
