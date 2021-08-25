import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CasperLogoDark from '../../public/images/casper_logo_dark.svg';
import HomeIcon from '../../public/images/ic_home.svg';
import InfoIcon from '../../public/images/ic_infor.svg';
import ChatIcon from '../../public/images/ic_material_chat.svg';
import VoteIcon from '../../public/images/ic_awesome_vote.svg';
import UserIcon from '../../public/images/ic_users.svg';
import AddUserIcon from '../../public/images/ic_feather_user_plus.svg';
import PlusIcon from '../../public/images/ic_plus.svg';
import SettingIcon from '../../public/images/ic_settings.svg';
import IntakeIcon from '../../public/images/ic_intake.svg';
import VerificationIcon from '../../public/images/ic_check_mark.svg';
import ListIcon from '../../public/images/ic_list.svg';
import usePermissions from '../hooks/usePermissions';

import { ActiveLink } from '../partials';

const mainUserNavs = [
  {
    key: 'dashboard',
    icon: HomeIcon,
    label: 'dashboard',
    path: '/dashboard',
  },
  {
    key: 'verification',
    icon: VerificationIcon,
    label: 'get verified',
    path: '/dashboard/verification',
  },
  {
    key: 'membership',
    icon: UserIcon,
    label: 'membership',
    path: '/dashboard/membership',
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
    key: 'perks',
    icon: PlusIcon,
    label: 'perks',
    path: '/dashboard/perks',
  },
];

const mainAdminNavs = [
  {
    key: 'dashboard',
    icon: HomeIcon,
    label: 'dashboard',
    path: '/admin/dashboard',
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
];

const adminNavs = [
  {
    key: 'intake',
    icon: IntakeIcon,
    label: 'Intake',
    path: '/admin/intake',
  },
  {
    key: 'users',
    icon: UserIcon,
    label: 'users',
    path: '/admin/users',
  },
  {
    key: 'ballots',
    icon: ListIcon,
    label: 'ballots',
    path: '/admin/ballots',
  },
  {
    key: 'perks',
    icon: PlusIcon,
    label: 'perks',
    path: '/admin/perks',
  },
  {
    key: 'teams',
    icon: AddUserIcon,
    label: 'teams',
    path: '/admin/teams',
  },
  {
    key: 'setting',
    icon: SettingIcon,
    label: 'global settings',
    path: '/admin/settings',
    public: true,
  },
];

const Sidebar = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navs, setNavs] = useState([]);
  const [isApprovedProfile, setIsApprovedProfile] = useState(false);
  const { permissions, isSuperAdmin } = usePermissions();

  useEffect(() => {
    const checkAdmin = ['admin', 'sub-admin'].includes(userInfo?.role);
    setIsAdmin(checkAdmin);
    setNavs(checkAdmin ? mainAdminNavs : mainUserNavs);
    setIsApprovedProfile(userInfo?.profile?.status === 'approved');
  }, [userInfo]);

  return (
    <div className="hidden lg:flex flex-col p-6.25 pr-3 z-10 block h-full w-200px bg-white shadow-light">
      <CasperLogoDark />
      <ul className="mt-14 flex flex-col">
        {navs.map((nav, index) => (
          <>
            {(isAdmin || isApprovedProfile) && nav.key === 'verification' ? (
              <></>
            ) : (
              <li className="mb-6" key={index}>
                <ActiveLink
                  activeClassName="text-primary active-link"
                  href={nav.path}
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
            <li
              className="mb-6"
              key={index}
              hidden={!isSuperAdmin && !nav.public && !permissions[nav.key]}
            >
              <ActiveLink
                activeClassName="text-primary active-link"
                href={nav.path}
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
    </div>
  );
};

export default Sidebar;
