import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../components/hoc/loading-screen';
import { contactUsFromGuest } from '../shared/redux-saga/auth/actions';
import { AppContext } from '../pages/_app';
import { useSnackBar } from '../components/partials/snack-bar';
import { EMAIL_PATTERN } from '../helpers/form-validation';
import LandingHeader from '../components/layouts/landing-header';
import LandingFooter from '../components/layouts/landing-footer';

const Landing = () => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const { openSnack } = useSnackBar();

  const scrollToAnchor = id => {
    const element = document.getElementById(`c-section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <div
      id="landing-page__home"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    >
      <LandingHeader isHome />
      <section className="pt-52 flex flex-col justify-center">
        <div id="landing-page__hero" className="mb-32">
          <h1 className="text-center">Casper Association Portal</h1>
          <p className="text-center">
            Trusted members of the Association will be able to participate in
            perks as a part of the Association Membership. By verifying your
            information, you help make the Casper Network more transparent and
            trustworthy. Get more tools to better manage and track your node.
            Once a member, validators can participate in votes and the
            governance of the Casper Association.
          </p>
          <div id="landing-page__heroButtons" className="gap-10 mt-10">
            <button
              type="button"
              className="w-52 h-16 border-2 border-landing1"
              onClick={() => scrollToAnchor('about')}
            >
              Learn More
            </button>
            <Link to="/validator-selection-tool">
              <button
                type="button"
                className="w-52 h-16 border-2 border-landing1"
              >
                Validator Tool
              </button>
            </Link>
          </div>
        </div>
        <div
          id="c-section-about"
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
      <section
        className="custom-container flex flex-col items-center text-center"
        id="landing-page__home__h3Section"
      >
        <h3>
          Any validator on the Casper Network can become a Member of the Casper
          Association.
        </h3>
        <span />
        <p>
          The Casper Association is a Swiss Association based in Zug responsible
          for the development of the Casper Ecosystem and the open source
          development of the Casper Network.
        </p>
      </section>
      <section
        className="custom-container flex flex-col items-center"
        id="c-section-tools"
      >
        <div className="flex flex-col" style={{ width: '100%' }}>
          <div
            className="flex items-center custom-text-box"
            style={{ marginBottom: '200px' }}
          >
            <div className="custom-text-box__SVG">
              <img src="/images/monitor.svg" alt="" />
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
                  <p>Update Responsiveness</p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="flex items-center flex-row-reverse custom-text-box"
            style={{ marginBottom: '200px' }}
          >
            <div className="custom-text-box__SVG">
              <img src="/images/perks.svg" alt="" />
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
          <div className="flex items-center custom-text-box">
            <div className="custom-text-box__SVG">
              <img src="/images/discussions.svg" alt="" />
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
        className="custom-container flex flex-col items-center"
        style={{ marginBottom: '300px' }}
      >
        <h2 className="text-center" id="landing-page__home__h2">
          “The Casper Member Portal offers me the ability to monitor and track
          the real-time stats of my node.”
        </h2>
        <span id="landing-page__home__span">- Jason Stone</span>
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
      <LandingFooter isHome />
    </div>
  );
};

export default LoadingScreen(Landing, 'public');
