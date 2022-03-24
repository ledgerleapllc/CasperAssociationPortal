/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { LoadingScreen } from '../components/hoc/loading-screen';
import { contactUsFromGuest } from '../shared/redux-saga/auth/actions';
import { AppContext } from '../pages/_app';
import { useSnackBar } from '../components/partials/snack-bar';
import { EMAIL_PATTERN } from '../helpers/form-validation';

const Landing = () => {
  const aboutRef = useRef();
  const toolsRef = useRef();
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const { openSnack } = useSnackBar();
  const [showMenu, setShowMenu] = useState(false);
  const [isStickyMenu, setMenuSticky] = useState(false);

  const manageNav = () => {
    const $elem = document.documentElement;
    const limit = $elem.scrollTop;
    if (limit > 90) {
      setMenuSticky(true);
    } else {
      setMenuSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', manageNav, false);
    document.body.classList.add('bg-landing');
    return () => {
      document.body.classList.remove('bg-landing');
      return window.removeEventListener('scroll', manageNav);
    };
  }, []);

  const scrollToAnchor = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

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
          className={`relative w-full flex justify-center text-white text-center ${
            showMenu ? 'active' : ''
          } ${isStickyMenu ? 'sticky' : ''}`}
          id="custom-nav-bar"
        >
          <ul
            className="flex gap-24"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <li onClick={() => scrollToAnchor(aboutRef)}>
              <a>About</a>
            </li>
            <li onClick={() => scrollToAnchor(toolsRef)}>
              <a>Tools</a>
            </li>
            <li>
              <Link to="/node-explorer">Explore</Link>
            </li>
            <li>
              <Link to="/donate">Donate</Link>
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
      <section className="pt-52 flex flex-col justify-center">
        <div id="landing-page__hero" className="mb-32">
          <h1 className="text-center">Casper Association Portal</h1>
          <p className="text-center">
            Keep track of the status of your validator node(s) in one place. See
            rewards, uptime, stake amount, delegator count and much more.
            Available to all node operators.
          </p>
          <div id="landing-page__heroButtons" className="gap-10 mt-10">
            <button
              type="button"
              className="w-52 h-16 border-2 border-landing1"
              onClick={() => scrollToAnchor(aboutRef)}
            >
              Learn More
            </button>
            <Link to="/node-explorer">
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Node Explore
              </button>
            </Link>
          </div>
        </div>
        <div
          ref={aboutRef}
          className="relative pb-20 custom-container text-center"
        >
          <div
            className="absolute linear left-0 top-0 transform -translate-x-1/3 -translate-y-1/2"
            style={{ width: '40rem', height: '40rem', filter: 'blur(10rem)' }}
          />
          <img
            style={{ padding: 0, margin: '0 auto' }}
            className="relative z-40"
            src="images/comp-13.png"
            alt=""
          />
          <div
            className="absolute linear right-0 bottom-0 transform translate-x-1/3"
            style={{ width: '20rem', height: '20rem', filter: 'blur(5rem)' }}
          />
        </div>
      </section>
      <section className="custom-container flex flex-col items-center">
        <h2 className="text-center" id="landing-page__home__h2">
          “The Casper Member Portal offers me the ability to monitor and track
          the real-time stats of my node.”
        </h2>
        <span id="landing-page__home__span">- Jason Stone</span>
      </section>
      <section
        ref={toolsRef}
        className="custom-container flex flex-col items-center"
        id="landing-page__section"
      >
        <div className="flex flex-col" style={{ width: '100%' }}>
          <div
            className="flex items-center gap-16 custom-text-box"
            style={{ marginBottom: '300px' }}
          >
            <div className="custom-text-box__Placeholder">
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div className="custom-text-box__Text">
              <h2>Monitor your node status</h2>
              <p>
                For node operators, the Casper Association Portal is the premier
                tool for gathering insights and visualizing the performance of
                your node. Add all of the nodes you operate, and see where you
                rank against other operators. Closely monitor important metrics
                like:
              </p>
              <ul>
                <li>
                  <span />
                  <p>Uptime</p>
                </li>
                <li>
                  <span />
                  <p>Block Height</p>
                </li>
                <li>
                  <span />
                  <p>Peers</p>
                </li>
                <li>
                  <span />
                  <p>Update Responsiveness</p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="flex items-center flex-row-reverse gap-16 custom-text-box"
            style={{ marginBottom: '300px' }}
          >
            <div className="custom-text-box__Placeholder">
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div className="custom-text-box__Text">
              <h2>
                Trusted members receive
                <br />
                special perks
              </h2>
              <p>
                By verifying your information, you help make the Casper Network
                more transparent and trustworthy. Getting verified unlocks
                access to an assortment of different privileges and rewards. Get
                more tools to better manage your node and track earnings.
                Participate in votes and unlock perks that only verified members
                can get.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-16 custom-text-box">
            <div className="custom-text-box__Placeholder">
              <div
                className="bg-white"
                style={{ width: '32rem', height: '32rem' }}
              />
            </div>
            <div className="custom-text-box__Text">
              <h2>Create interesting discussions</h2>
              <p>
                Have something to say? Connect with other node operators by
                starting a forum discussion thread. Discussions are public and
                viewable by all members. Get verified to gain access and read
                through hundreds of different discussions created by node
                operators like yourself.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="custom-container text-center"
        id="landing-page__contactWrapper"
      >
        <h2>Let's talk</h2>
        <form
          id="landing-page__contact"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-6">
            <div className="flex-1">
              <input
                className="w-full px-8 placeholder-white text-white bg-landing2 border-2 border-landing1"
                placeholder="Name"
                name="name"
                {...register('name', {
                  required: 'Name is required',
                })}
                style={{
                  height: '70px',
                  fontSize: '20px',
                }}
              />
              {formState.errors?.name && (
                <p className="mt-2 text-primary text-left">
                  {formState.errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                className="w-full px-8 placeholder-white text-white bg-landing2 border-2 border-landing1"
                placeholder="Email Address"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    message: 'Email is invalid',
                    value: EMAIL_PATTERN,
                  },
                })}
                style={{
                  height: '70px',
                  fontSize: '20px',
                }}
              />
              {formState.errors?.email && (
                <p className="mt-2 text-primary text-left">
                  {formState.errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <textarea
              rows="10"
              className="px-8 py-5 w-full placeholder-white text-white bg-landing2 border-2 border-landing1"
              placeholder="Message"
              {...register('message', {
                required: 'Message is required',
              })}
              style={{ fontSize: '20px' }}
            />
            {formState.errors?.message && (
              <p className="mt-2 text-primary text-left">
                {formState.errors.message?.message}
              </p>
            )}
          </div>
          <button
            style={{ fontSize: '20px', maxWidth: '100%' }}
            type="submit"
            className="mt-12 w-60 h-18 bg-landing1"
          >
            Contact Us
          </button>
        </form>
      </section>
      <footer className="bg-landing2 relative w-full flex justify-center text-white text-center h-24">
        <ul className="flex items-center gap-24">
          <li onClick={() => scrollToAnchor(aboutRef)}>
            <a>About</a>
          </li>
          <li onClick={() => scrollToAnchor(toolsRef)}>
            <a>Tools</a>
          </li>
          <li>
            <Link to="/node-explorer">Explore</Link>
          </li>
          <li>
            <Link to="/donate">Donate</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default LoadingScreen(Landing, 'public');
