import Image from 'next/image';

const AppFooter = () => (
  <div className="flex items-center justify-between">
    <p className="text-white">©2021 CasperLabs.io</p>
    <div className="flex space-x-6">
      <div className="flex bottom-0">
        <Image
          src="/images/ic_facebook.svg"
          alt="facebook"
          width={8}
          height={16}
        />
      </div>
      <div className="flex bottom-0">
        <Image
          src="/images/ic_twitter.svg"
          alt="twitter"
          width={20}
          height={16}
          className="px"
        />
      </div>
      <div className="flex bottom-0">
        <Image
          src="/images/ic_youtube.svg"
          alt="youtube"
          width={22}
          height={16}
        />
      </div>
      <div className="flex bottom-0">
        <Image
          src="/images/ic_linkedin.svg"
          alt="linkedin"
          width={16}
          height={16}
        />
      </div>
      <div className="flex bottom-0">
        <Image src="/images/ic_m.svg" alt="m" width={20} height={16} />
      </div>
    </div>
  </div>
);

export default AppFooter;
