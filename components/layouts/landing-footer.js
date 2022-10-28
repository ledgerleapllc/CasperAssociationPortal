/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, useHistory } from 'react-router-dom';

const LandingFooter = ({ isHome }) => {
  const router = useHistory();

  const scrollToAnchor = id => {
    const element = document.getElementById(`c-section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (!isHome) {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="bg-landing2 relative w-full flex justify-center text-white text-center h-auto md:h-24">
      <ul className="flex flex-col md:flex-row items-center md:gap-24 text-lg lg:text-xl">
        <li className="py-3 md:py-0" onClick={() => scrollToAnchor('about')}>
          <a>About</a>
        </li>
        <li className="py-3 md:py-0" onClick={() => scrollToAnchor('tools')}>
          <a>Tools</a>
        </li>
        <li className="py-3 md:py-0">
          <Link to="/validator-selection-tool">Validator Tool</Link>
        </li>
        <li className="py-3 md:py-0">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </footer>
  );
};

export default LandingFooter;
