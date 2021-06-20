import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Hamburger from '../../public/images/ic_hamburger.svg';
import { logoutApp } from '../../shared/redux-saga/auth/actions';

const AppHeader = ({ className, theme }) => {
  const dispatch = useDispatch();

  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <Image
        className="animate__animated animate__fadeIn"
        src={`/images/casper_logo_${theme}.svg`}
        alt="casper logo"
        width={125}
        height={33}
      />
      <button
        className="animate__animated animate__fadeIn animate__delay-2s"
        type="button"
        onClick={async e => {
          e.preventDefault();
          dispatch(logoutApp());
        }}
      >
        <Hamburger
          width={35}
          height={20}
          className={`${theme === 'light' ? 'text-white' : 'text-dark2'}`}
        />
      </button>
    </div>
  );
};

export default AppHeader;
