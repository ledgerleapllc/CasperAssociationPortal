import { useState } from 'react';
import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import AppFooter from '../components/Layouts/app-footer';
import AppHeader from '../components/Layouts/app-header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const detectMobile = useMobileDetect();

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url('/images/bg_welcome${
          detectMobile.isMobile() ? '_mobile' : ''
        }.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center justify-center">
          <div
            className="bg-white w-full md:w-2/3 text-center px-4 py-12 md:p-44"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-4xl text-center">Sign In</p>
            <p className="text-xs text-center mt-2">
              {`Don’t have an account yet? `}
              <Link href="/register">
                <a className="text-primary underline font-medium">Register</a>
              </Link>
            </p>
            <input
              type="email"
              className="w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full h-16 text-xl mt-5 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="md:flex md:space-x-5 mt-14 md:justify-center">
              <button
                type="button"
                className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none"
              >
                Sign in
              </button>
              <button
                type="button"
                className="mt-2 md:mt-0 text-lg border-2 border-primary text-primary w-full md:w-64 h-16 rounded-full bg-white hover:bg-primary hover:bg-opacity-40 hover:text-white focus:outline-none"
              >
                Sign in as Guest
              </button>
            </div>
            <p className="text-xs text-center mt-5">
              {`Forgot your password? `}
              <Link href="/reset-password">
                <a className="text-primary underline font-medium">Reset</a>
              </Link>
            </p>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default Login;
