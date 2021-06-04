import Link from 'next/link';
import IconArrowLeft from '../../public/images/ic_arrow_left.svg';
import IconArrowLeftCircle from '../../public/images/ic_arrow_left_circle.svg';

const BackButton = ({ href, text }) => (
  <Link href={href}>
    <a className="pb-2.5 flex items-center text-xs">
      <span className="hidden lg:inline">
        <IconArrowLeft className="mr-2.5 text-gray" />
      </span>
      <span className="inline lg:hidden">
        <IconArrowLeftCircle className="mr-2.5 text-primary" />
      </span>
      <span className="text-sm text-primary lg:text-gray lg:text-xs">
        {text}
      </span>
    </a>
  </Link>
);

export default BackButton;
