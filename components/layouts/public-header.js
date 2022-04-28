import { Link } from 'react-router-dom';
import React from 'react';
import CasperLogoDark from '../../public/images/casper_logo_dark.svg';
import { Button } from '../partials';
import PlusIcon from '../../public/images/ic_plus.svg';

const PublicHeader = React.memo(() => (
  <header className="hidden lg:flex w-full bg-white shadow-light h-18">
    <div className="flex justify-between items-center container mx-auto">
      <Link to="/">
        <span>
          <CasperLogoDark />
        </span>
      </Link>
      <div className="flex gap-8 items-center">
        <Link to="/register-type">
          <span>
            <Button className="flex items-center justify-center" primary>
              <PlusIcon className="text-xs" />
              <span className="pl-2">Become a Member</span>
            </Button>
          </span>
        </Link>
      </div>
    </div>
  </header>
));

export default PublicHeader;
