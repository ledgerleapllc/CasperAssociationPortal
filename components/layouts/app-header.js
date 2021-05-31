import Image from 'next/image';
import Hamburger from '../icons/hamburger';

const AppHeader = ({ theme }) => (
  <div className="flex items-center justify-between">
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
    >
      <Hamburger
        width={35}
        height={20}
        stroke={theme === 'light' ? '#fff' : '#1D1D1D'}
      />
    </button>
  </div>
);

export default AppHeader;
