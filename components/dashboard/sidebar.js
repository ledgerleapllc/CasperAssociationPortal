/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormatIcon from '@material-ui/icons/FormatIndentDecrease';
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
import ContactIcon from '../../public/images/ic_contact.svg';
import VerificationIcon from '../../public/images/ic_check_mark.svg';
import ShuftiIcon from '../../public/images/shufti.svg';
import ListIcon from '../../public/images/ic_list.svg';
import QuestionMarkIcon from '../../public/images/question-circle.svg';
import ReinstatementIcon from '../../public/images/ic_refresh.svg';
import usePermissions from '../hooks/usePermissions';
import { setCollapsed } from '../../shared/redux-saga/auth/actions';

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
    key: 'my-eras',
    icon: ListIcon,
    label: 'My ERAs',
    path: '/dashboard/my-eras',
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
  {
    key: 'contact',
    icon: ContactIcon,
    label: 'contact us',
    path: '/dashboard/contact-us',
  },
  {
    key: 'question',
    icon: QuestionMarkIcon,
    label: 'get support',
    path: '#',
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
    key: 'reinstatement',
    icon: ReinstatementIcon,
    label: 'Reinstatement',
    path: '/admin/reinstatement',
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
    key: 'all-eras',
    icon: ListIcon,
    label: 'All ERAs',
    path: '/admin/all-eras',
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

const extraAdminNavs = [
  {
    key: 'backoffice',
    icon: ShuftiIcon,
    label: 'Backoffice',
    path: 'https://backoffice.shuftipro.com/reports',
    public: true,
  },
];

const Sidebar = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const isCollapsed = useSelector(
    state => state.authReducer.appInfo.isCollapsed
  );

  const [isAdmin, setIsAdmin] = useState(false);
  const [navs, setNavs] = useState([]);
  const [isApprovedProfile, setIsApprovedProfile] = useState(false);
  const { permissions, isSuperAdmin } = usePermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = ['admin', 'sub-admin'].includes(userInfo?.role);
    setIsAdmin(checkAdmin);
    setNavs(checkAdmin ? mainAdminNavs : mainUserNavs);
    setIsApprovedProfile(userInfo?.profile?.status === 'approved');
  }, [userInfo]);

  const clickIcon = () => {
    dispatch(
      setCollapsed({
        isCollapsed: !isCollapsed,
      })
    );
  };

  const getClassName = () => {
    if (isCollapsed) {
      return 'collapsed bg-white shadow-light';
    }
    return 'bg-white shadow-light';
  };

  const clickPath = path => {
    window.open(path, '_blank');
  };

  return (
    <div id="dashboard-layoutSidebar" className={getClassName()}>
      <div id="dashboard-layoutSidebar__inner" className="p-6.25 pr-3">
        <div id="dashboard-layoutSidebar__logo">
          <CasperLogoDark />
          <div onClick={clickIcon}>
            <FormatIcon />
          </div>
        </div>
        <ul className="mt-14 flex flex-col">
          {navs.map((nav, index) => (
            <Fragment key={index}>
              {(isAdmin || isApprovedProfile) && nav.key === 'verification' ? (
                <></>
              ) : (
                <li className="mb-6" key={index}>
                  <ActiveLink
                    activeClassName="text-primary active-link"
                    to={nav.path}
                  >
                    <div className="relative flex text-base">
                      <div
                        className="line-hr hidden absolute w-1 -top-1 -bottom-1 bg-primary"
                        style={{ left: '-1.5625rem' }}
                      />
                      <nav.icon width="1.5rem" height="1.5rem" />
                      <span className="capitalize pl-5">{nav.label}</span>
                    </div>
                  </ActiveLink>
                </li>
              )}
            </Fragment>
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
                  to={nav.path}
                >
                  <div className="relative flex text-base">
                    <div
                      className="line-hr hidden absolute w-1 -top-1 -bottom-1 bg-primary"
                      style={{ left: '-1.5625rem' }}
                    />
                    <nav.icon width="1.5rem" height="1.5rem" />
                    <span className="capitalize pl-5">{nav.label}</span>
                  </div>
                </ActiveLink>
              </li>
            ))}
          </ul>
        )}
        {isAdmin && (
          <ul className="flex flex-col">
            <div className="mb-5 border border-t-1 border-gray opacity-40" />
            {extraAdminNavs.map((nav, index) => (
              <li
                className="mb-6"
                key={index}
                hidden={!isSuperAdmin && !nav.public}
              >
                <a
                  className="relative flex text-base"
                  onClick={() => clickPath(nav.path)}
                >
                  <div
                    className="line-hr hidden absolute w-1 -top-1 -bottom-1 bg-primary"
                    style={{ left: '-1.5625rem' }}
                  />
                  <nav.icon width="1.5rem" height="1.5rem" />
                  <span className="capitalize pl-5">{nav.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xxs">
          ©{new Date().getFullYear()} Casper Association
        </p>
        <div className="sidebar-footer flex text-xxs items-center mt-1">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <a href="/terms-of-service.pdf" target="_blank">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
