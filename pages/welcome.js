import { useState } from 'react';
import Image from 'next/image';
import AppFooter from '../components/Layouts/app-footer';
import AppHeader from '../components/Layouts/app-header';
import homeStyles from '../styles/home.module.scss';
import loginStyles from '../styles/login.module.scss';

const Welcome = () => {
  const [email, setEmail] = useState('');

  return (
    <div className={homeStyles.container}>
      <div className="md:w-9/12 p-9 flex flex-col">
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center justify-center">
          <div
            className={`${loginStyles.loginForm} px-28`}
            style={{ height: 742 }}
          >
            <p className="text-3xl text-center">Welcome to the Casper Portal</p>
            <p className="text-sm text-dark1 mt-2">
              A message from our director
            </p>
            <p className="text-sm text-dark1 mt-4">
              Node operator,
              <br />
              <br />
              First, thank you for being an essential part of Casper. Our node
              operators are the beating heart at the very core of our
              technology. Our Casper Association exists to serve not just the
              Casper Protocol, but also you, the smaller parts that comprise our
              greater whole. Never forget that as the world builds on Casper,
              their machinations live on your collective servers.
              <br />
              <br />
              As a node operator, you are eligible to become a member of the
              Casper Association where you will help determine the future of the
              Casper blockchain. Our members only portal allows you to discuss
              the Casper protocol or your needs as an operator, vote on major
              updates to the blockchain, and even propose new features and
              functions for the technology. Your success as a node operator is
              Casper’s success, so inside you will also find instrumental tools
              to help you as a node operator. Tools like node health monitoring,
              node status alerts, and network statistics and features not found
              elsewhere support you in your mission. As Casper grows, so will
              the features of the association portal, so get in here and help
              guide Casper alongside us through the 2020s.
            </p>
            <div className="flex mt-12 w-full">
              <Image src="/images/ic_signature.svg" width={16} height={14} />
              <p className="text-sm text-dark1 ml-5">
                Electronically sign the membership agreement.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <Image src="/images/ic_ownership.svg" width={16} height={14} />
              <p className="text-sm text-dark1 ml-5">
                Register your node and prove ownership.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <Image src="/images/ic_user.svg" width={16} height={14} />
              <p className="text-sm text-dark1 ml-5">
                Submit KYC details for your node.
              </p>
            </div>
            <button
              type="button"
              className="mt-12 text-lg text-white w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            >
              Begin
            </button>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default Welcome;
