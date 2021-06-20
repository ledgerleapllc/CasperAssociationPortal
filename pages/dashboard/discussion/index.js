import { createContext, useContext, useState } from 'react';
import Link from 'next/link';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Tab, Card } from '../../../components/partials';
import IconEye from '../../../public/images/ic_eye.svg';
import IconChatBox from '../../../public/images/ic_chatbox.svg';
import IconLike from '../../../public/images/ic_like.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';

const chatBoxFakeData = [
  {
    id: 1,
    desc: `Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum
    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,
    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus
    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum
    fermentum. Aliquam facilisis.`,
    image: '/images/img_signature.png',
    pinned: false,
    postedBy: 'Username16448',
    reaction: {
      comments: 25,
      likes: 25,
      read: 25,
    },
    title: 'Title goes here for each discussion',
  },
  {
    id: 2,
    desc: `Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum
    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,
    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus
    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum
    fermentum. Aliquam facilisis.`,
    image: '/images/img_signature.png',
    pinned: false,
    postedBy: 'Username16448',
    reaction: {
      comments: 35,
      likes: 2,
      read: 2,
    },
    title: 'Title goes here for each discussion',
  },
  {
    id: 3,
    desc: `Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum
    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,
    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus
    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum
    fermentum. Aliquam facilisis.`,
    image: '/images/img_signature.png',
    pinned: false,
    postedBy: 'Username16448',
    reaction: {
      comments: 25,
      likes: 25,
      read: 25,
    },
    title: 'Title goes here for each discussion',
  },
  {
    id: 4,
    desc: `Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum
    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,
    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus
    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum
    fermentum. Aliquam facilisis.`,
    image: '/images/img_signature.png',
    pinned: false,
    postedBy: 'Username16448',
    reaction: {
      comments: 25,
      likes: 25,
      read: 25,
    },
    title: 'Title goes here for each discussion',
  },
];

const DashboardDiscusionContext = createContext();

const ChatBox = ({ data }) => {
  const { togglePinnedList } = useContext(DashboardDiscusionContext);

  const pin = item => {
    togglePinnedList(item);
  };

  return (
    <div className="flex py-5 md:py-12 border-b border-gray1 flex-col md:flex-row">
      <div className="flex-none flex">
        <div className="w-24 h-24">
          <img
            className="h-full w-full object-cover rounded-lg shadow-lg"
            src="/images/img_signature.png"
            alt="avatar"
          />
        </div>
        <div className="px-6 pt-2 mt-auto md:mt-0">
          <IconEye
            className={`cursor-pointer ${data.pinned ? 'text-primary' : ''}`}
            onClick={() => pin(data)}
          />
        </div>
      </div>
      <div className="chat-content mt-5 md:m-0">
        <div className="chat-content-body">
          <Link href={`/dashboard/discussion/${data.id}`}>
            <h2 className="cursor-pointer text-lg mb-2.5">{data.title}</h2>
          </Link>
          <p className="text-sm mb-5">{data.desc}</p>
        </div>
        <div className="chat-content-footer flex text-sm flex-col md:flex-row">
          <p>
            Posted by: <a className="text-primary">{data.postedBy}</a>
          </p>
          <ul className="ml-8 flex -ml-6 mt-5 md:ml-0 md:mt-0">
            <li className="flex px-6 items-center">
              <IconChatBox />
              <span className="pl-2.5">{data.reaction.comments || 0}</span>
            </li>
            <li className="flex px-6 items-center">
              <IconEye />
              <span className="pl-2.5">{data.reaction.read || 0}</span>
            </li>
            <li className="flex px-6 items-center">
              <IconLike />
              <span className="pl-2.5">{data.reaction.likes || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Tab1 = () => (
  <ul className="pb-20">
    <DashboardDiscusionContext.Consumer>
      {({ discussionList }) =>
        discussionList.map((data, index) => (
          <li key={index}>
            <ChatBox data={data} />
          </li>
        ))
      }
    </DashboardDiscusionContext.Consumer>
  </ul>
);

const Tab2 = () => (
  <ul className="pb-20">
    <DashboardDiscusionContext.Consumer>
      {({ pinnedList }) =>
        pinnedList.map((data, index) => (
          <li key={index}>
            <ChatBox data={data} />
          </li>
        ))
      }
    </DashboardDiscusionContext.Consumer>
  </ul>
);

const tabsData = [
  {
    content: Tab1,
    id: 'discuss',
    title: 'All Discussions',
  },
  {
    content: Tab2,
    id: 'pinned',
    title: 'Pinned',
  },
];

const DashboardDiscusion = () => {
  const [pinnedList, setPinnedList] = useState([]);
  const [discussionList, setDiscussionList] = useState(chatBoxFakeData);

  const togglePinnedList = item => {
    const ind = discussionList.findIndex(x => x.id === item.id);
    const isExistedInPinnedList = pinnedList.findIndex(x => x.id === item.id) >= 0;
    if (!isExistedInPinnedList) {
      discussionList[ind].pinned = true;
      setPinnedList([...pinnedList, item]);
    } else {
      discussionList[ind].pinned = false;
      const newPinnedList = pinnedList.filter(x => x.id !== item.id);
      setPinnedList(newPinnedList);
    }
    setDiscussionList([...discussionList]);
  };

  return (
    <LayoutDashboard>
      <DashboardDiscusionContext.Provider
        value={{ discussionList, pinnedList, togglePinnedList }}
      >
        <Card className="h-full md:pl-24 md:py-10 md:shadow-2xl" noShadow>
          <div className="w-full h-full">
            <div className="flex justify-end md:mr-24">
              <Link href="/dashboard/discussion/add">
                <button
                  type="button"
                  className="transition text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  + New Discussion
                </button>
              </Link>
            </div>
            <Tab
              className="w-full h-full pt-12 md:pt-0 md:-mt-7"
              data={tabsData}
            />
          </div>
        </Card>
      </DashboardDiscusionContext.Provider>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardDiscusion, 'final-all');
