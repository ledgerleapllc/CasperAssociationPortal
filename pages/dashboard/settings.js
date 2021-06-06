import Link from 'next/link';
import { useState } from 'react';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, ToggleButton } from '../../components/partials';

const DashboardSetting = () => {
  const [disableInputs, setDisableInputs] = useState({
    '2fa': true,
    email: true,
    updatePassword: true,
    username: true,
  });

  const enableInput = field => {
    disableInputs[field] = false;
    setDisableInputs({ ...disableInputs });
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <div className="flex justify-between items-end mb-3.5">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                User Settings
              </h3>
              <Link href="/dashboard/discussion/add">
                <button
                  type="button"
                  className="transition text-lg text-white w-48 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Save Changes
                </button>
              </Link>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-x-hidden overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 pb-12">
                  <div className="form-group">
                    <div className="flex justify-between">
                      <label htmlFor="username">Username</label>
                      {disableInputs.username && (
                        <button
                          type="button"
                          className="inline lg:hidden text-primary focus:outline-none"
                          onClick={() => enableInput('username')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="mt-5 flex items-center">
                      <input
                        name="username"
                        type="text"
                        disabled={disableInputs.username}
                        className="w-full lg:w-3/4 md:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"
                      />
                      {disableInputs.username && (
                        <button
                          type="button"
                          className="pl-6 hidden lg:inline text-primary focus:outline-none"
                          onClick={() => enableInput('username')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 pb-12">
                  <div className="form-group">
                    <div className="flex justify-between">
                      <label htmlFor="email">Email Address</label>
                      {disableInputs.email && (
                        <button
                          type="button"
                          className="inline lg:hidden text-primary focus:outline-none"
                          onClick={() => enableInput('email')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="mt-5 flex items-center">
                      <input
                        name="email"
                        type="text"
                        disabled={disableInputs.email}
                        className="w-full lg:w-3/4 md:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"
                      />
                      {disableInputs.email && (
                        <button
                          type="button"
                          className="pl-6 hidden lg:inline text-primary focus:outline-none"
                          onClick={() => enableInput('email')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 pb-12">
                  <div className="form-group">
                    <div className="flex justify-between">
                      <label htmlFor="password">Update Password</label>
                      {disableInputs.updatePassword && (
                        <button
                          type="button"
                          className="inline lg:hidden text-primary focus:outline-none"
                          onClick={() => enableInput('updatePassword')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="mt-5 flex items-center">
                      <input
                        disabled={disableInputs.updatePassword}
                        name="password"
                        placeholder="Type Current Password"
                        type="text"
                        className="w-full lg:w-3/4 md:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"
                      />
                      {disableInputs.updatePassword && (
                        <button
                          type="button"
                          className="pl-6 hidden lg:inline text-primary focus:outline-none"
                          onClick={() => enableInput('updatePassword')}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="pt-8">
                      <input
                        disabled={disableInputs.updatePassword}
                        placeholder="New Password"
                        type="text"
                        className="w-full lg:w-3/4 mr-6 md:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"
                      />
                    </div>
                    <div className="pt-8">
                      <input
                        placeholder="Confirm New Password"
                        type="text"
                        disabled={disableInputs.updatePassword}
                        className="w-full lg:w-3/4 mr-6 md:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 pb-12">
                  <div className="form-group">
                    <label htmlFor="2fa">2FA toggle</label>
                    <div className="hidden lg:block pl-5 mt-5">
                      <label className="relative pl-8 inline-flex items-center mr-6">
                        <input
                          name="2fa"
                          disabled={disableInputs['2fa']}
                          type="radio"
                          className="text-primary"
                          value="on"
                        />
                        <span className="text-sm text-dark1">ON</span>
                      </label>
                      <label className="relative pl-8 pt-6 flex">
                        <input
                          name="2fa"
                          type="radio"
                          className="text-primary"
                          value="off"
                        />
                        <span className="text-sm text-dark1">OFF</span>
                      </label>
                    </div>
                    <div className="block lg:hidden pl-5 mt-5">
                      <ToggleButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardSetting;
