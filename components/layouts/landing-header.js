/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const LandingHeader = ({ isHome }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isStickyMenu, setMenuSticky] = useState(false);
  const router = useHistory();

  const manageNav = () => {
    const $elem = document.documentElement;
    const limit = $elem.scrollTop;
    if (limit > 90) {
      setMenuSticky(true);
    } else {
      setMenuSticky(false);
    }
  };

  const scrollToAnchor = id => {
    const element = document.getElementById(`c-section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (!isHome) {
      router.push(`/#${id}`);
    }
  };

  const manageHash = () => {
    window.scrollTo(0, 0);
    const { hash } = window.location;
    if (hash && hash !== '#/' && hash.startsWith('#')) {
      window.history.pushState(
        '',
        '',
        window.location.pathname + window.location.search
      );
      scrollToAnchor(hash.replace('#', ''));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', manageNav, false);
    document.body.classList.add('bg-landing');
    manageHash();
    return () => {
      document.body.classList.remove('bg-landing');
      window.removeEventListener('scroll', manageNav);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div id="custom-nav-wrap">
      <div id="custom-nav-burger">
        <div onClick={toggleMenu}>
          <MenuIcon />
        </div>
      </div>
      <nav
        className={`relative w-full flex justify-center text-white text-center ${
          showMenu ? 'active' : ''
        } ${isStickyMenu ? 'sticky' : ''}`}
        id="custom-nav-bar"
      >
        <ul className="flex gap-24" style={{ position: 'relative', zIndex: 1 }}>
          <li onClick={() => scrollToAnchor('about')}>
            <a>About</a>
          </li>
          <li onClick={() => scrollToAnchor('tools')}>
            <a>Tools</a>
          </li>
          <li>
            <Link to="/validator-selection-tool">Validator Tool</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
        </ul>
        <div
          className="absolute linear right-0 top-0 transform translate-x-1/2 -translate-y-1/2"
          style={{ width: '40rem', height: '40rem', filter: 'blur(10rem)' }}
        />
      </nav>
    </div>
  );
};

export default LandingHeader;
