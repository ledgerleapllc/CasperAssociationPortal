/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Hamburger from '../../public/images/ic_hamburger.svg';
import { logoutApp } from '../../shared/redux-saga/auth/actions';
import { Button, Dropdown } from '../partials';

const AppHeader = ({ className, theme, showExplorer }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo);

  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <Link href="/">
        <a>
          <Image
            className="animate__animated animate__fadeIn"
            src={`/images/casper_logo_${theme}.svg`}
            alt="casper logo"
            width={125}
            height={33}
          />
        </a>
      </Link>
      {userInfo?.isLoggedIn && (
        <Dropdown
          trigger={
            <div className="flex justify-end" style={{ width: '110px' }}>
              <Hamburger
                width="2rem"
                height="1.25rem"
                className={`${theme === 'light' ? 'text-white' : 'text-dark2'}`}
              />
            </div>
          }
        >
          <ul>
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
      )}
      {showExplorer && (
        <Button
          primary
          id="app-header-button"
          className="animate__animated animate__fadeIn animate__delay-2s"
          type="button"
          onClick={() => {
            window.open('/node-explorer', '_blank').focus();
          }}
        >
          Node Explorer
        </Button>
      )}
    </div>
  );
};

export default AppHeader;
