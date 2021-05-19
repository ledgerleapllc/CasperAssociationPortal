import Image from 'next/image';

const AppHeader = () => (
  <div className="flex items-center justify-between">
    <Image
      src="/images/casper_logo.svg"
      alt="casper logo"
      width={125}
      height={33}
    />
    <button type="button">
      <Image
        src="/images/hamburger.svg"
        alt="hamburger"
        width={35}
        height={20}
        onClick={() => {}}
      />
    </button>
  </div>
);

export default AppHeader;
