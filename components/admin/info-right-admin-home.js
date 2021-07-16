import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutApp } from '../../shared/redux-saga/auth/actions';

const percenCPU = 61;
const percenPerformance = 83;
const InfoRightAdminHome = () => {
  const dispatch = useDispatch();
  const userAdmin = useSelector(state => state.authReducer.userInfo.fullInfo);

  return (
    <div className="flex flex-col mx-9 my-3 bg-white">
      <div
        className="
          flex flex-col border-b-2 border-gray
          pb-8
          xl:pb-4
          2xl:pb-8
        "
      >
        <div className="flex">
          <img
            className="pr-2"
            src="/images/ic_awesome_user_circle.svg"
            alt="User"
          />
          <span className="text-2.5xl">
            {userAdmin?.role === 'admin' ? 'Admin' : 'Member'}
          </span>
        </div>
        <span className="text-lg">{userAdmin?.email}</span>
        <button
          type="button"
          className="inline-flex text-xs text-primary underline focus:outline-none"
          onClick={async e => {
            e.preventDefault();
            dispatch(logoutApp());
          }}
        >
          Logout
        </button>
      </div>
      <div
        className="
          flex flex-col 
          pt-3 lg:pb-3
          2xl:pt-5
        "
      >
        <span className="text-2.5xl">Metrics</span>
        <div className="flex flex-col py-3 xl:py-1 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Total Users</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">2,1155</span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Member’s Stake</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">12,382,414</span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Total Delegators</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">19</span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Average Uptime</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
            <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
              75%
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 pb-9 xl:pb-6 2xl:pb-9 border-b-2 border-gray">
          <div className="flex flex-row">
            <span className="text-lg">Average Peers</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
            <div className="w-1/2 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
              49/88
            </div>
          </div>
        </div>
        <div className="flex justify-between py-9 xl:py-6 2xl:py-9">
          <div className="flex w-1/2 flex-col pr-4 justify-between">
            <div className="flex flex-row pb-4 items-baseline">
              <span className="text-sm font-medium h-12">Average CPU Load</span>
              <img
                className="pl-2"
                src="/images/ic_feather_info.svg"
                alt="Info"
              />
            </div>
            <div style={{ height: '100%', width: '100%' }}>
              <CircularProgressbar
                value={percenCPU}
                text={`${percenCPU}%`}
                styles={buildStyles({
                  pathColor: '#FF473E',
                  strokeLinecap: 'butt',
                  textColor: '#313131',
                  textSize: '26px',
                  trailColor: '#9A9A9A',
                })}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-col pl-4 justify-between">
            <div className="flex flex-row pb-4 items-baseline">
              <span className="text-sm font-medium h-12">Performance</span>
              <img
                className="pl-2"
                src="/images/ic_feather_info.svg"
                alt="Info"
              />
            </div>
            <div style={{ height: '100%', width: '100%' }}>
              <CircularProgressbar
                value={percenPerformance}
                text={`${percenPerformance}%`}
                styles={buildStyles({
                  pathColor: '#FF473E',
                  strokeLinecap: 'butt',
                  textColor: '#313131',
                  textSize: '26px',
                  trailColor: '#9A9A9A',
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoRightAdminHome;
