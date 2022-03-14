// /* eslint-disable no-console */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import Link from 'next/link';
// import { useContext, useEffect, useRef, useState } from 'react';
// import { useContext, useEffect, useState } from 'react';
import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import MenuIcon from '@material-ui/icons/Menu';
import { LoadingScreen } from '../components/hoc/loading-screen';
// import { useSnackBar } from '../components/partials/snack-bar';
// import { EMAIL_PATTERN } from '../helpers/form-validation';
// import { contactUsFromGuest } from '../shared/redux-saga/auth/actions';
// import { AppContext } from './_app';

const LandingPage = () => {
  // const aboutRef = useRef();
  // const toolsRef = useRef();
  /*
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  */
  // const dispatch = useDispatch();
  // const { setLoading } = useContext(AppContext);
  // const { openSnack } = useSnackBar();
  // const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.body.classList.add('bg-landing');
    return () => {
      document.body.classList.remove('bg-landing');
    };
  }, []);

  /*
  const scrollToAnchor = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  */

  /*
  const onSubmit = data => {
    setLoading(true);
    dispatch(
      contactUsFromGuest(
        data,
        () => {
          setLoading(false);
          reset();
          openSnack('primary', 'Submit successfully!');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  */

  return (
    <div
      id="landing-page__home"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    />
  );
  /*
  return (
    <div
      id="landing-page__home"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    >
      <div id="custom-nav-wrap">
        <div id="custom-nav-burger">
          <div onClick={toggleMenu}>
            <MenuIcon />
          </div>
        </div>
        <nav
          className={
            showMenu
              ? 'relative pt-9 w-full flex justify-center text-white text-center active'
              : 'relative pt-9 w-full flex justify-center text-white text-center'
          }
        >
          <ul
            className="text-lg flex gap-24"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <li onClick={() => scrollToAnchor(aboutRef)}>
              <a>About</a>
            </li>
            <li onClick={() => scrollToAnchor(toolsRef)}>
              <a>Tools</a>
            </li>
            <li>
              <Link href="/node-explorer">
                <a>Explore</a>
              </Link>
            </li>
            <li>
              <Link href="/donate">
                <a>Donate</a>
              </Link>
            </li>
            <li>
              <Link href="/home">
                <a>Login / Register</a>
              </Link>
            </li>
          </ul>
          <div
            className="absolute linear right-0 top-0 transform translate-x-1/2 -translate-y-1/2"
            style={{ width: '40rem', height: '40rem', filter: 'blur(10rem)' }}
          />
        </nav>
      </div>
      <section className="pt-52 flex flex-col justify-center items-center">
        <div id="landing-page__hero" className="z-40 mb-32">
          <h1 className="text-7xl text-center">Casper Association Portal</h1>
          <p className="mt-6 font-normal text-xl text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit{' '}
            amet aliquet dolor, sit amet malesuada risus. Quisque vitae justo{' '}
            gravida, lacinia neque vel, elementum leo.
          </p>
          <div className="flex gap-10 mt-10 justify-center">
            <button
              type="button"
              className="w-52 h-16 border-2 border-landing1"
              onClick={() => scrollToAnchor(aboutRef)}
            >
              Learn More
            </button>
            <Link href="/node-explorer">
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Node Explore
              </button>
            </Link>
          </div>
        </div>
        <div ref={aboutRef} className="relative pb-20 container-landing">
          <div
            className="absolute linear left-0 top-0 transform -translate-x-1/3 -translate-y-1/2"
            style={{ width: '40rem', height: '40rem', filter: 'blur(10rem)' }}
          />
          <img className="relative z-40" src="images/comp-13.png" alt="" />
          <div
            className="absolute linear right-0 bottom-0 transform translate-x-1/3"
            style={{ width: '20rem', height: '20rem', filter: 'blur(5rem)' }}
          />
        </div>
      </section>
      <section className="container-landing flex flex-col justify-center items-center">
        <p className="text-4xl font-light text-center leading-normal">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Aenean sed lectus imperdiet.
        </p>
        <span>- Jason Stone</span>
      </section>
      <section
        ref={toolsRef}
        className="container-landing flex flex-col justify-center items-center"
        id="landing-page__section"
      >
        <div className="flex flex-col gap-108" style={{ width: '100%' }}>
          <div className="flex items-center gap-16 custom-text-box">
            <div>
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div>
              <h2 className="text-4xl">Node Explorer</h2>
              <p className="text-base pt-10 pb-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
                amet aliquet dolor, sit amet malesuada risus. Quisque vitae{' '}
                justo gravida, lacinia neque vel, elementum leo.Lorem ipsum{' '}
                dolor sit amet, consectetur adipiscing elit. Nam sit amet{' '}
                aliquet dolor, sit amet malesuada risus. Quisque vitae justo{' '}
                gravida, lacinia neque vel, elementum leo.
              </p>
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="flex items-center flex-row-reverse gap-16 custom-text-box">
            <div>
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div>
              <h2 className="text-4xl">Node Explorer</h2>
              <p className="text-base pt-10 pb-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
                amet aliquet dolor, sit amet malesuada risus. Quisque vitae{' '}
                justo gravida, lacinia neque vel, elementum leo.Lorem ipsum{' '}
                dolor sit amet, consectetur adipiscing elit. Nam sit amet{' '}
                aliquet dolor, sit amet malesuada risus. Quisque vitae justo{' '}
                gravida, lacinia neque vel, elementum leo.
              </p>
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="flex items-center gap-16 custom-text-box">
            <div>
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div>
              <h2 className="text-4xl">Node Explorer</h2>
              <p className="text-base pt-10 pb-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
                amet aliquet dolor, sit amet malesuada risus. Quisque vitae{' '}
                justo gravida, lacinia neque vel, elementum leo.Lorem ipsum{' '}
                dolor sit amet, consectetur adipiscing elit. Nam sit amet{' '}
                aliquet dolor, sit amet malesuada risus. Quisque vitae justo{' '}
                gravida, lacinia neque vel, elementum leo.
              </p>
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container-landing text-center"
        style={{ paddingBottom: '27rem' }}
      >
        <h2 className="font-light text-5xl">Need to get in contact?</h2>
        <form
          id="landing-page__contact"
          className="pt-24 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-6">
            <div className="flex-1">
              <input
                className="w-full px-14 h-14 placeholder-white text-white bg-landing2 border-2 border-landing1"
                placeholder="Name"
                name="name"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              {formState.errors?.name && (
                <p className="mt-2 text-primary">
                  {formState.errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                className="w-full px-14 h-14 placeholder-white text-white bg-landing2 border-2 border-landing1"
                placeholder="Email Address"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    message: 'Email is invalid',
                    value: EMAIL_PATTERN,
                  },
                })}
              />
              {formState.errors?.email && (
                <p className="mt-2 text-primary">
                  {formState.errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <textarea
              rows="7"
              className="px-14 py-5 w-full placeholder-white text-white bg-landing2 border-2 border-landing1"
              placeholder="Message"
              {...register('message', {
                required: 'Message is required',
              })}
            />
            {formState.errors?.message && (
              <p className="mt-2 text-primary">
                {formState.errors.message?.message}
              </p>
            )}
          </div>
          <button type="submit" className="mt-12 w-52 h-16 bg-landing1">
            Contact Us
          </button>
        </form>
      </section>
      <footer className="bg-landing2 relative w-full flex justify-center text-white text-center h-24">
        <ul className="text-lg flex items-center gap-24">
          <li onClick={() => scrollToAnchor(aboutRef)}>
            <a>About</a>
          </li>
          <li onClick={() => scrollToAnchor(toolsRef)}>
            <a>Tools</a>
          </li>
          <li>
            <Link href="/node-explorer">
              <a>Explore</a>
            </Link>
          </li>
          <li>
            <Link href="/donate">
              <a>Donate</a>
            </Link>
          </li>
          <li>
            <Link href="/home">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
  */
};

export default LoadingScreen(LandingPage, 'public');
