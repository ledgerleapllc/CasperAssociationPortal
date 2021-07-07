import { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Tab, Card, Table } from '../../../components/partials';
import { useTable } from '../../../components/partials/table';
import IconEye from '../../../public/images/ic_eye.svg';
import IconChatBox from '../../../public/images/ic_chatbox.svg';
import IconLike from '../../../public/images/ic_like.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import {
  getDiscussions,
  setDiscussionPin,
  setRemoveNewMark,
  getPinnedDiscussions,
  getMyDiscussions
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
const DashboardDiscusionContext = createContext();

const ChatBox = ({ data }) => {
  const { togglePinnedList, removeNewFromList, newsList, pinnedList } = useContext(DashboardDiscusionContext);

  const pin = item => {
    togglePinnedList(item);
  };

  const removeNew = item => {
    if (!item.is_new) return;
    removeNewFromList(item);
  }

  const isPinned = pinnedList ? pinnedList.findIndex(item => item.id === data.id) !== -1 : false;
  const isNew = newsList ? newsList.findIndex(item => item.id === data.id) !== -1 : false;

  return (
    <div className="py-2 ">
      <div className={`flex py-8 px-3 lg:py-8 flex-col lg:flex-row rounded-lg ${isNew ? 'bg-primary-highlight' : ''}`}
        onClick={() => removeNew(data)}>
        <div className="flex-none flex">
          <div className="w-24 h-24">
            <img
              className="h-full w-full object-cover rounded-lg shadow-lg"
              src="/images/img_signature.png"
              alt="avatar"
            />
          </div>
          <div className="px-6 pt-2 mt-auto lg:mt-0">
            <IconEye
              className={`cursor-pointer ${isPinned ? 'text-primary' : ''}`}
              onClick={() => pin(data)}
            />
          </div>
        </div>
        <div className="chat-content mt-5 lg:m-0">
          <div className="chat-content-body">
            <Link href={`/dashboard/discussion/${data.id}`}>
              <h2 className="cursor-pointer text-lg mb-2.5">{data.title}</h2>
            </Link>
            <p className="text-sm mb-5" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
          <div className="chat-content-footer flex text-sm flex-col lg:flex-row">
            <p>
              Posted by: <a className="text-primary">{data.user?.pseudonym}</a>
            </p>
            <ul className="ml-8 flex -ml-6 mt-5 lg:ml-0 lg:mt-0">
              <li className="flex px-6 items-center">
                <IconChatBox />
                <span className="pl-2.5">{data.comments || 0}</span>
              </li>
              <li className="flex px-6 items-center">
                <IconEye />
                <span className="pl-2.5">{data.read || 0}</span>
              </li>
              <li className="flex px-6 items-center">
                <IconLike />
                <span className="pl-2.5">{data.likes || 0}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Styles = styled.div`
  .active-ballot-table {
    .col-1 {
      width: 0%;
    }
    .col-2 {
      width: 100%;
    }
`;

const Tab1 = () => {
  const dispatch = useDispatch();
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage
  } = useTable();

  const fetchDiscussions = (pageValue = page) => {
    dispatch(
      getDiscussions(
        { page: pageValue },
        (results, isHasMore) => {
          appendData(results);
          setHasMore(isHasMore);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-ballot-table mr-5 h-full"
        onLoadMore={fetchDiscussions}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body>
          {
            data.map((row, index) => (
              <Table.BodyRow key={`b-${index}`}>
                <Table.BodyCell />
                <Table.BodyCell>
                  <ChatBox data={row} />
                </Table.BodyCell>
              </Table.BodyRow>
            ))
          }
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab3 = () => (

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

const Tab2 = () => (
  <ul className="pb-20">
    <DashboardDiscusionContext.Consumer>
      {({ myList }) =>
        myList.map((data, index) => (
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
    id: 'my-discussions',
    title: 'My Discussions',
  },
  {
    content: Tab3,
    id: 'pinned',
    title: 'Pinned',
  },
];

const DashboardDiscusion = () => {
  const dispatch = useDispatch();
  const [pinnedList, setPinnedList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  // const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  const fetchPinnedDiscussions = () => {
    dispatch(
      getPinnedDiscussions(
        (results) => {
          setPinnedList(results.pinned_discussions);
          setNewsList(results.new_discussions);
        }
      )
    );
  };

  const fetchMyDiscussions = () => {
    dispatch(
      getMyDiscussions(
        (results) => {
          setMyList(results);
        }
      )
    );
  };

  useEffect(() => {
    fetchPinnedDiscussions();
    fetchMyDiscussions();
  }, []);

  const togglePinnedList = item => {
    const isExistedInPinnedList = pinnedList.findIndex(x => x.id === item.id) >= 0;
    dispatch(
      setDiscussionPin(
        item.id,
        () => {
          if (!isExistedInPinnedList) {
            setPinnedList([...pinnedList, item]);
          } else {
            const newPinnedList = pinnedList.filter(x => x.id !== item.id);
            setPinnedList(newPinnedList);
          }
        }
      ),
    );
  };

  const removeNewFromList = item => {

    dispatch(
      setRemoveNewMark(
        item.id,
        () => {
          setNewsList(newsList.filter(x => x.id !== item.id));
        }
      )
    );
  }

  return (
    <LayoutDashboard>
      <DashboardDiscusionContext.Provider
        value={{ pinnedList, myList, newsList, togglePinnedList, removeNewFromList }}
      >
        <Card className="h-full lg:pl-24 lg:py-10 lg:shadow-2xl" noShadow>
          <div className="w-full h-full">
            <div className="flex justify-end lg:mr-24">
              <Link href="/dashboard/discussion/add">
                <button
                  type="button"
                  className="transition text-lg text-white w-full lg:w-56 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  + New Discussion
                </button>
              </Link>
            </div>
            <Tab
              className="w-full h-full pt-12 lg:pt-0 lg:-mt-7"
              data={tabsData}
            />
          </div>
        </Card>
      </DashboardDiscusionContext.Provider>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardDiscusion, 'final-all');