import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const getHash = url => {
  if (url.includes('#')) {
    return url.split('#').pop();
  }
  return null;
};

const TabView = React.memo(({ data, currentTab }) => {
  const View = data[currentTab].content;
  return <View />;
});

const Tab = ({ data, className, scrollable, lazy }) => {
  const router = useHistory();
  const { location } = router;
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    // const hash = getHash(asPath);
    const hash = getHash(location.hash);
    if (hash) {
      const ind = data.findIndex(x => x.id === hash);
      setCurrentTab(ind);
    } else {
      setCurrentTab(0);
    }
  }, [location]);

  return (
    <div className={className}>
      {data && (
        <>
          <ul
            id="tabs"
            className="inline-flex w-full pb-3 justify-between lg:justify-start"
          >
            {data.map((x, index) => (
              <li
                className={`${
                  currentTab === index
                    ? 'opacity-100 text-primary'
                    : 'opacity-40'
                } tab-header text-lg font-medium lg:pr-14`}
                key={`tab-header-${index}`}
              >
                <Link to={`#${x.id}`}>
                  <span>{x.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-primary border-b-2 lg:mr-card" />
          <div
            id="tab-contents"
            className={`${scrollable ? 'overflow-y-auto-1' : ''}`}
            style={{ height: '90%' }}
          >
            {!lazy ? (
              data.map((x, index) => (
                <div
                  key={`tab-content-${index}`}
                  className="lg:pr-card h-full"
                  hidden={currentTab !== index}
                  style={{ overflowY: 'auto' }}
                >
                  {{ ...data[index].content() }}
                </div>
              ))
            ) : (
              <div className="lg:pr-card h-full" style={{ overflowY: 'auto' }}>
                <TabView data={data} currentTab={currentTab} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tab;
