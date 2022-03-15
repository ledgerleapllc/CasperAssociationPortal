/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import { logoutApp } from '../../shared/redux-saga/auth/actions';

const Header = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const dispatch = useDispatch();

  return (
    <header
      id="dashboard-layoutContent__header"
      className="bg-white shadow-light pr-5"
    >
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
                <Link to="/dashboard/profile">
                  <span>My Profile</span>
                </Link>
              </li>
              <li className="py-2 hover:text-primary cursor-pointer">
                <Link to="/dashboard/settings">
                  <span>Settings</span>
                </Link>
              </li>
            </>
          )}
          {['admin', 'sub-admin'].includes(userInfo?.role) && (
            <>
              <li className="py-2 hover:text-primary cursor-pointer">
                <Link to="/dashboard/settings">
                  <span>Settings</span>
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
