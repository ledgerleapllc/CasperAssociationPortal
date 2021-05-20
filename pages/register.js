import { useState } from 'react';
import { useRouter } from 'next/router';
import AppFooter from '../components/Layouts/app-footer';
import AppHeader from '../components/Layouts/app-header';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forumName, setForumName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);

  const router = useRouter();

  const validateFields = () => {
    if (!firstName || firstName.trim() === '') {
      return false;
    }

    if (!lastName || lastName.trim() === '') {
      return false;
    }

    return true;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full md:w-9/12">
            <p className="text-2xl">New User</p>
            <p className="text-sm text-dark mt-2">
              Fill out the form to register.
            </p>
            <div className="md:flex mt-10 md:space-x-5">
              <input
                type="text"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="First Name *"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Last Name *"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Company/Organization *"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>
            <div className="md:flex mt-5 md:space-x-5">
              <input
                type="email"
                className="w-full md:w-auto flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="email"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Confirm Email *"
                value={confirmEmail}
                onChange={e => setConfirmEmail(e.target.value)}
              />
              <div className="flex-1 h-0 md:h-14 px-7" />
            </div>
            <div className="md:flex mt-5 md:space-x-5">
              <input
                type="password"
                className="w-full md:w-auto flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Password *"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <div className="flex-1 h-0 md:h-14 px-7" />
            </div>
            <div className="md:flex mt-5 md:space-x-5">
              <input
                type="text"
                className="w-full md:w-auto flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Forum Name / Pseudonym *"
                value={forumName}
                onChange={e => setForumName(e.target.value)}
              />
              <input
                type="text"
                className="w-full md:w-auto mt-2 md:mt-0 flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Telegram"
                value={telegram}
                onChange={e => setTelegram(e.target.value)}
              />
              <div className="flex-1 h-0 md:h-14 px-7" />
            </div>
            <div className="flex mt-10">
              <button
                type="button"
                className="flex items-baseline focus:outline-none"
                onClick={() => setAgreeChecked(!agreeChecked)}
              >
                <img
                  src={`/images/${
                    agreeChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                  }`}
                  alt="agree checkbox"
                  width={18}
                  height={18}
                />
              </button>
              <p className="flex-1 text-dark1 text-sm ml-4">
                I agree the Terms and Conditions, cookie policy, and privacy
                policy.
              </p>
            </div>
            <div className="flex mt-5">
              <button
                type="button"
                className="flex items-baseline focus:outline-none"
                onClick={() => setUnderstandChecked(!understandChecked)}
              >
                <img
                  src={`/images/${
                    understandChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                  }`}
                  alt="understand checkbox"
                  width={18}
                  height={18}
                />
              </button>
              <p className="flex-1 text-dark1 text-sm ml-4 break-words">
                I understand that this portal is only for Casper blockchain node
                operators and affirm that I do operate a node and understand
                that I will be required to prove I am a node operator.
              </p>
            </div>
            <div className="md:flex md:flex-row-reverse mt-10">
              <button
                type="button"
                className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
                disabled={!validateFields()}
                onClick={() => router.push('/welcome')}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default Register;
