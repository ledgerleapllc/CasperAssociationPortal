/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  getMyDiscussions,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';

const DashboardDiscusionContext = createContext();

const ChatBox = ({ data, togglePinCallback }) => {
  const { togglePinnedList, removeNewFromList } = useContext(
    DashboardDiscusionContext
  );
  const [discuss, setDiscuss] = useState();
  const [isPinning, setIsPinning] = useState(false);

  useEffect(() => {
    setDiscuss(data);
  }, [data]);

  const pin = item => {
    if (!isPinning) {
      setIsPinning(true);
      togglePinnedList(item);
      setDiscuss({
        ...discuss,
        is_pin: !discuss.is_pin,
      });
      setTimeout(() => {
        setIsPinning(false);
      }, 1500);
      if (togglePinCallback) togglePinCallback(item);
    }
  };

  const removeNew = item => {
    if (!discuss.is_new) return;
    removeNewFromList(item);
    setDiscuss({
      ...discuss,
      is_new: false,
    });
  };

  return (
    <div className="py-3">
      <div
        className={`w-full flex flex-col lg:flex-row rounded-lg ${
          discuss?.is_new ? 'bg-primary-highlight' : ''
        }`}
        onClick={() => removeNew(discuss)}
      >
        <div className="flex-none flex">
          <div className="w-24 h-24">
            <img
              className="h-full w-full object-cover rounded-lg shadow-lg"
              src={discuss?.user?.avatar_url || '/images/img_signature.png'}
              alt="avatar"
            />
          </div>
          <div className="px-6 pt-2 mt-auto lg:mt-0">
            <IconEye
              className={`cursor-pointer ${
                discuss?.is_pin ? 'text-primary' : ''
              }`}
              onClick={() => pin(discuss)}
            />
          </div>
        </div>
        <div className="flex-1 chat-content mt-5 lg:m-0">
          <div className="chat-content-body">
            <Link href={`/dashboard/discussion/${discuss?.id}`}>
              <h2 className="cursor-pointer text-base mb-2.5 font-medium line-clamp-2">
                {discuss?.title}
              </h2>
            </Link>
            <p
              className="text-sm mb-5 line-clamp-5"
              dangerouslySetInnerHTML={{ __html: discuss?.description }}
            />
          </div>
          <div className="w-full chat-content-footer flex text-sm justify-between flex-col lg:flex-row">
            <p>
              <span className="text-gray pr-2">Posted by:</span>
              <a className="text-primary font-medium">{discuss?.user?.email}</a>
            </p>
            <ul className="ml-8 flex gap-12 -ml-6 mt-5 lg:ml-0 lg:mt-0">
              <li className="flex items-center">
                <IconChatBox />
                <span className="pl-2.5">{discuss?.comments || 0}</span>
              </li>
              <li className="flex items-center">
                <IconEye />
                <span className="pl-2.5">{discuss?.read || 0}</span>
              </li>
              <li className="flex items-center">
                <IconLike />
                <span className="pl-2.5">{discuss?.likes || 0}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Styles = styled.div`
  .discussion-table {
    .col-1 {
      width: 0%;
      display: none;
    }
    .col-2 {
      width: 100%;
      padding-right: 0;
    }
`;

const Tab1 = () => {
  const dispatch = useDispatch();
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();

  const fetchDiscussions = (pageValue = page) => {
    dispatch(
      getDiscussions({ page: pageValue }, (results, isHasMore) => {
        appendData(results);
        setHasMore(isHasMore);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="discussion-table h-full"
        onLoadMore={fetchDiscussions}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body className="lg:-mr-card lg:pr-card">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell />
              <Table.BodyCell>
                <ChatBox data={row} />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab2 = () => {
  const dispatch = useDispatch();
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();

  const fetchMyDiscussions = (pageValue = page) => {
    dispatch(
      getMyDiscussions({ page: pageValue }, (results, isHasMore) => {
        appendData(results);
        setHasMore(isHasMore);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchMyDiscussions();
  }, []);

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="discussion-table h-full"
        onLoadMore={fetchMyDiscussions}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body className="lg:-mr-card lg:pr-card">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell />
              <Table.BodyCell>
                <ChatBox data={row} />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab3 = () => {
  const dispatch = useDispatch();
  const {
    data,
    setData,
    register,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();

  const fetchPinnedDiscussions = (pageValue = page) => {
    dispatch(
      getPinnedDiscussions({ page: pageValue }, (results, isHasMore) => {
        const temp = results.map(x => ({
          ...x,
          is_pin: true,
        }));
        appendData(temp);
        setHasMore(isHasMore);
        setPage(prev => prev + 1);
      })
    );
  };

  const removePinDiscussion = item => {
    const ind = data.findIndex(x => x.id === item.id);
    data.splice(ind, 1);
    setData([...data]);
  };

  useEffect(() => {
    fetchPinnedDiscussions();
  }, []);

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="discussion-table h-full"
        onLoadMore={fetchPinnedDiscussions}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body className="lg:-mr-card lg:pr-card">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell />
              <Table.BodyCell>
                <ChatBox data={row} togglePinCallback={removePinDiscussion} />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

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

  const togglePinnedList = item => {
    dispatch(setDiscussionPin(item.id));
  };

  const removeNewFromList = item => {
    dispatch(setRemoveNewMark(item.id));
  };

  return (
    <LayoutDashboard>
      <DashboardDiscusionContext.Provider
        value={{
          togglePinnedList,
          removeNewFromList,
        }}
      >
        <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
          <div className="w-full h-full">
            <div className="flex justify-end lg:mr-card">
              <Link href="/dashboard/discussion/add">
                <button
                  type="button"
                  className="z-40 transition text-lg text-white w-full lg:w-56 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  + New Discussion
                </button>
              </Link>
            </div>
            <Tab
              className="w-full h-full pt-12 lg:pt-0 lg:-mt-7"
              data={tabsData}
              lazy
            />
          </div>
        </Card>
      </DashboardDiscusionContext.Provider>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardDiscusion, 'final-all');
