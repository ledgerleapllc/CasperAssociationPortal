import Image from 'next/image';
import Hamburger from '../icons/hamburger';

const AppHeader = ({ theme }) => (
  <div className="flex items-center justify-between">
    <Image
      src={`/images/casper_logo_${theme}.svg`}
      alt="casper logo"
      width={125}
      height={33}
    />
    <button type="button">
      <Hamburger
        width={35}
        height={20}
        stroke={theme === 'light' ? '#fff' : '#1D1D1D'}
      />
    </button>
  </div>
);

export default AppHeader;
