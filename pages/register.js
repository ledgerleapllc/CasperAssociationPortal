import { useState } from 'react';
import AppFooter from '../components/Layouts/app-footer';
import AppHeader from '../components/Layouts/app-header';
import welcomeStyles from '../styles/welcome.module.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');

  return (
    <div className="flex justify-center min-h-screen">
      <div className="md:w-9/12 p-9 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow flex items-center justify-center">
          <div>
            <p className="text-2xl">New User</p>
            <p className="text-sm text-dark mt-2">
              Fill out the form to register.
            </p>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Register;
