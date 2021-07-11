import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ActiveLink, Card } from '../partials';
import AppHeader from '../layouts/app-header';
import HomeIcon from '../../public/images/ic_home.svg';
import InfoIcon from '../../public/images/ic_infor.svg';
import ChatIcon from '../../public/images/ic_material_chat.svg';
import VoteIcon from '../../public/images/ic_awesome_vote.svg';
import UserIcon from '../../public/images/ic_feather_user_plus.svg';
import SettingIcon from '../../public/images/ic_feather_settings.svg';
import VerificationIcon from '../../public/images/ic_check_mark.svg';

const mainNavs = [
  {
    key: 'dashboard',
    icon: HomeIcon,
    path: '/dashboard',
  },
  {
    key: 'info',
    icon: InfoIcon,
    path: '/dashboard/nodes',
  },
  {
    key: 'chat',
    icon: ChatIcon,
    path: '/dashboard/discussion',
  },
  {
    key: 'vote',
    icon: VoteIcon,
    path: '/dashboard/votes',
  },
  {
    key: 'user',
    icon: UserIcon,
    path: '/dashboard/member-perks',
  },
  {
    key: 'verification',
    icon: VerificationIcon,
    path: '/dashboard/verification',
  },
  {
    key: 'setting',
    icon: SettingIcon,
    path: '/dashboard/settings',
  },
];

const Navigation = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApprovedProfile, setIsApprovedProfile] = useState(false);
  useEffect(() => {
    setIsAdmin(userInfo?.role === 'admin');
    setIsApprovedProfile(userInfo?.profile?.status === 'approved');
  }, [userInfo]);

  return (
    <>
      <Card className="flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll">
        <img
          className="py-6 border-b-2 align-center border-primary"
          src="/images/ic_logo_home.svg"
          alt="Casper"
        />
        <ul
          className="
            mb-4 flex flex-col items-center
            xl:pt-8 2xl:pt-12
          "
        >
          {mainNavs.map((nav, index) => (
            <>
              {(isAdmin || isApprovedProfile) && nav.key === 'verification' ? (
                <></>
              ) : (
                <li
                  className={`${isAdmin ? 'xl:py-1 2xl:py-2' : 'py-3'}`}
                  key={index}
                >
                  <ActiveLink
                    activeClassName="shadow-activeLink"
                    href={`${
                      isAdmin && nav.key === 'dashboard'
                        ? '/admin/dashboard'
                        : nav.path
                    }`}
                  >
                    <a
                      className="
                        rounded-lg inline-block 
                        xl:p-2 2xl:p-3
                      "
                    >
                      <nav.icon
                        width={isAdmin ? '1.25rem' : '1.5rem'}
                        height={isAdmin ? '1.25rem' : '1.5rem'}
                      />
                    </a>
                  </ActiveLink>
                </li>
              )}
            </>
          ))}
        </ul>
        {isAdmin && (
          <ul className="flex flex-col py-4 border-t-2 border-primary">
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink
                activeClassName="text-primary"
                href="/admin/dashboard"
              >
                <p>Admin</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/intake">
                <p>Intake</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/users">
                <p>Users</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/ballots">
                <p>Ballots</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/perks">
                <p>Perks</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/teams">
                <p>Teams</p>
              </ActiveLink>
            </li>
            <li className="xl:py-1 2xl:py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/settings">
                <p>Settings</p>
              </ActiveLink>
            </li>
          </ul>
        )}
      </Card>
      <AppHeader className="py-4 lg:hidden" theme="dark" />
    </>
  );
};

export default Navigation;
