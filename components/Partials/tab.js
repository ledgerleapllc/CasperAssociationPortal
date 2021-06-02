import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const getHash = url => url.split('#').pop();

const Tab = ({ data, className }) => {
  const { asPath } = useRouter();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const hash = getHash(asPath);
    const ind = data.findIndex(x => x.id === hash);
    setCurrentTab(ind);
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
                  currentTab === index ? 'opacity-100' : 'opacity-40'
                } text-dark2 text-xl md:pr-32`}
                key={`a-${index}`}
              >
                <Link href={`#${x.id}`}>{x.title}</Link>
              </li>
            ))}
          </ul>
          <div className="border-primary border-b-2" />
          <div id="tab-contents">
            {data.map((x, index) => (
              <div
                key={`b-${index}`}
                className=""
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
