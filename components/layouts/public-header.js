import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import CasperLogoDark from '../../public/images/casper_logo_dark.svg';
import { Button } from '../partials';
import PlusIcon from '../../public/images/ic_plus.svg';

const PublicHeader = React.memo(() => {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <header className="hidden lg:flex w-full bg-white shadow-light h-18">
      <div className="flex justify-between items-center container mx-auto">
        <Link href="/home">
          <a>
            <CasperLogoDark />
          </a>
        </Link>
        <div className="flex gap-8 items-center">
          {/*
          <Link href="/node-explorer">
            <a
              className={
                pathname === '/node-explorer' ? 'text-primary underline' : ''
              }
            >
              Explore
            </a>
          </Link>
          <Link href="/donate">
            <a
              className={pathname === '/donate' ? 'text-primary underline' : ''}
            >
              Donate
            </a>
          </Link>
          */}
          <Link href="/register-type">
            <a>
              <Button className="flex items-center justify-center" primary>
                <PlusIcon className="text-xs" />
                <span className="pl-2">Become a Member</span>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
});

export default PublicHeader;
