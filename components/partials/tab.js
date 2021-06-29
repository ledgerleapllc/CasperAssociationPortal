import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const getHash = url => {
  if (url.includes('#')) {
    return url.split('#').pop();
  }
  return null;
};

const Tab = ({ data, className }) => {
  const { asPath, pathname } = useRouter();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const hash = getHash(asPath);
    if (hash) {
      const ind = data.findIndex(x => x.id === hash);
      setCurrentTab(ind);
    } else {
      setCurrentTab(0);
    }
  }, [asPath]);

  const SubTab = ({ i }) => {
    const Temp = data[i].content;
    return <Temp />;
  };

  return (
    <div className={className}>
      {data && (
        <>
          <ul
            id="tabs"
            className="inline-flex w-full pb-3 justify-between md:justify-start"
          >
            {data.map((x, index) => (
              <li
                className={`${
                  currentTab === index
                    ? 'opacity-100 text-primary'
                    : 'opacity-40'
                } tab-header text-dark2 text-xl md:pr-32`}
                key={`tab-header-${index}`}
              >
                <Link href={`#${x.id}`}>{x.title}</Link>
              </li>
            ))}
          </ul>
          <div className="border-primary border-b-2 md:mr-24" />
          <div
            id="tab-contents"
            className={`${
              pathname === '/dashboard/votes' ? '' : 'overflow-y-scroll'
            }`}
            style={{ height: '90%' }}
          >
            {data.map((x, index) => (
              <div
                key={`tab-content-${index}`}
                className="md:pr-24 h-full"
                hidden={currentTab !== index}
              >
                <SubTab i={index} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Tab;
