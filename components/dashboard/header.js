/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Avatar, Dropdown } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import { logoutApp } from '../../shared/redux-saga/auth/actions';

const Header = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const dispatch = useDispatch();

  return (
    <header className="hidden lg:flex w-full items-center justify-end bg-white shadow-light h-18 pr-5">
      <Dropdown
        trigger={
          <div
            className="flex items-center justify-end gap-2"
            style={{ minWidth: '120px' }}
          >
            <Avatar info={userInfo} />
            <span className="font-medium text-lg">
              {userInfo?.first_name} {userInfo?.last_name}
            </span>
            <ArrowIcon />
          </div>
        }
      >
        <ul>
          {!['admin', 'sub-admin'].includes(userInfo?.role) && (
            <>
              <li className="py-2 hover:text-primary cursor-pointer">
                <Link href="/dashboard/profile">
                  <a>My Profile</a>
                </Link>
              </li>
              <li className="py-2 hover:text-primary cursor-pointer">
                <Link href="/dashboard/settings">
                  <a>Settings</a>
                </Link>
              </li>
            </>
          )}
          {['admin', 'sub-admin'].includes(userInfo?.role) && (
            <>
              <li className="py-2 hover:text-primary cursor-pointer">
                <Link href="/dashboard/settings">
                  <a>Settings</a>
                </Link>
              </li>
            </>
          )}
          <li
            className="py-2 hover:text-primary cursor-pointer"
            onClick={async e => {
              e.preventDefault();
              dispatch(logoutApp());
            }}
          >
            Log out
          </li>
        </ul>
      </Dropdown>
    </header>
  );
};

export default Header;
