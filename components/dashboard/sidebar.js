import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CasperLogoDark from '../../public/images/casper_logo_dark.svg';
import HomeIcon from '../../public/images/ic_home.svg';
import InfoIcon from '../../public/images/ic_infor.svg';
import ChatIcon from '../../public/images/ic_material_chat.svg';
import VoteIcon from '../../public/images/ic_awesome_vote.svg';
import UserIcon from '../../public/images/ic_feather_user_plus.svg';
import SettingIcon from '../../public/images/ic_feather_settings.svg';
import VerificationIcon from '../../public/images/ic_check_mark.svg';
import { ActiveLink } from '../partials';

const mainNavs = [
  {
    key: 'dashboard',
    icon: HomeIcon,
    label: 'dashboard',
    path: '/dashboard',
  },
  {
    key: 'info',
    icon: InfoIcon,
    label: 'nodes',
    path: '/dashboard/nodes',
  },
  {
    key: 'chat',
    icon: ChatIcon,
    label: 'discussions',
    path: '/dashboard/discussion',
  },
  {
    key: 'vote',
    icon: VoteIcon,
    label: 'votes',
    path: '/dashboard/votes',
  },
  {
    key: 'user',
    icon: UserIcon,
    label: 'perks',
    path: '/dashboard/perks',
  },
  {
    key: 'verification',
    icon: VerificationIcon,
    label: 'get verified',
    path: '/dashboard/verification',
  },
  {
    key: 'setting',
    icon: SettingIcon,
    label: 'settings',
    path: '/dashboard/settings',
  },
];

const adminNavs = [
  {
    key: 'admin',
    icon: HomeIcon,
    label: 'Admin',
    path: '/admin/dashboard',
  },
  {
    key: 'intake',
    icon: InfoIcon,
    label: 'Intake',
    path: '/admin/intake',
  },
  {
    key: 'users',
    icon: ChatIcon,
    label: 'users',
    path: '/admin/users',
  },
  {
    key: 'ballots',
    icon: VoteIcon,
    label: 'ballots',
    path: '/admin/ballots',
  },
  {
    key: 'perks',
    icon: UserIcon,
    label: 'perks',
    path: '/admin/perks',
  },
  {
    key: 'teams',
    icon: VerificationIcon,
    label: 'teams',
    path: '/admin/teams',
  },
  {
    key: 'setting',
    icon: SettingIcon,
    label: 'settings',
    path: '/admin/settings',
  },
];

const Sidebar = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApprovedProfile, setIsApprovedProfile] = useState(false);

  useEffect(() => {
    setIsAdmin(['admin', 'sub-admin'].includes(userInfo?.role));
    setIsApprovedProfile(userInfo?.profile?.status === 'approved');
  }, [userInfo]);

  const buildUrl = nav => {
    if (isAdmin && nav.key === 'dashboard') {
      return '/admin/dashboard';
    }
    if (isAdmin && nav.key === 'setting') {
      return '/admin/settings';
    }
    return nav.path;
  };
  return (
    <sidebar className="hidden lg:flex flex-col p-6.25 pr-3 z-10 block h-full w-200px bg-white shadow-light">
      <CasperLogoDark />
      <ul className="mt-14 flex flex-col">
        {mainNavs.map((nav, index) => (
          <>
            {(isAdmin || isApprovedProfile) && nav.key === 'verification' ? (
              <></>
            ) : (
              <li className="mb-6" key={index}>
                <ActiveLink
                  activeClassName="text-primary active-link"
                  href={`${buildUrl(nav)}`}
                >
                  <a className="relative flex text-base">
                    <div
                      className="line-hr hidden absolute w-1 -top-1 -bottom-1 bg-primary"
                      style={{ left: '-1.5625rem' }}
                    />
                    <nav.icon width="1.5rem" height="1.5rem" />
                    <span className="capitalize pl-5">{nav.label}</span>
                  </a>
                </ActiveLink>
              </li>
            )}
          </>
        ))}
      </ul>
      {isAdmin && (
        <ul className="flex flex-col">
          <div className="mb-5 border border-t-1 border-gray opacity-40" />
          {adminNavs.map((nav, index) => (
            <li className="mb-6" key={index}>
              <ActiveLink
                activeClassName="text-primary active-link"
                href={`${buildUrl(nav)}`}
              >
                <a className="relative flex text-base">
                  <div
                    className="line-hr hidden absolute w-1 -top-1 -bottom-1 bg-primary"
                    style={{ left: '-1.5625rem' }}
                  />
                  <nav.icon width="1.5rem" height="1.5rem" />
                  <span className="capitalize pl-5">{nav.label}</span>
                </a>
              </ActiveLink>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto text-xxs">© Casper Association Portal 2021</p>
    </sidebar>
  );
};

export default Sidebar;
