import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from '../../public/images/ic_hamburger.svg';
import { logoutApp } from '../../shared/redux-saga/auth/actions';
import { Button } from '../partials';

const AppHeader = ({ className, theme, showExplorer }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo);

  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <Image
        className="animate__animated animate__fadeIn"
        src={`/images/casper_logo_${theme}.svg`}
        alt="casper logo"
        width={125}
        height={33}
      />
      {userInfo?.isLoggedIn && (
        <button
          className="animate__animated animate__fadeIn animate__delay-2s"
          type="button"
          onClick={async e => {
            e.preventDefault();
            dispatch(logoutApp());
          }}
        >
          <Hamburger
            width="2rem"
            height="1.25rem"
            className={`${theme === 'light' ? 'text-white' : 'text-dark2'}`}
          />
        </button>
      )}
      {showExplorer && (
        <Button
          primary
          className="animate__animated animate__fadeIn animate__delay-2s"
          type="button"
          onClick={() => {
            window.open('/member-viewer', '_blank').focus();
          }}
        >
          Node Explorer
        </Button>
      )}
    </div>
  );
};

export default AppHeader;
