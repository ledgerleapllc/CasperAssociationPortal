/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Tab,
  Card,
  Table,
  Button,
  Tooltips,
} from '../../../components/partials';
import { useTable } from '../../../components/partials/table';
import IconPin from '../../../public/images/ic_pin.svg';
import IconChatBox from '../../../public/images/ic_chatbox.svg';
import IconLike from '../../../public/images/ic_like.svg';
import VerifiedIcon from '../../../public/images/ic_check_mark.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import { AppContext } from '../../_app';
import {
  getDiscussions,
  setDiscussionPin,
  setRemoveNewMark,
  getPinnedDiscussions,
  getMyDiscussions,
  getDraftDiscussions,
  deleteDraftDiscussion,
  publishDiscussion,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';

const DashboardDiscusionContext = createContext();

const ChatBox = ({
  data,
  togglePinCallback,
  hidePin,
  onPublishDraft,
  onDeleteDraft,
}) => {
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
        total_pinned: !discuss.is_pin
          ? discuss.total_pinned + 1
          : discuss.total_pinned - 1,
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

  const editDraft = item => {
    router.push(`/dashboard/discussion/edit/${item?.id}`);
  };

  const publishDraft = item => {
    if (onPublishDraft) {
      onPublishDraft(item);
    }
  };

  const deleteDraft = item => {
    if (onDeleteDraft) {
      onDeleteDraft(item);
    }
  };

  return (
    <div
      className={`py-3 ${
        discuss?.is_new && !discuss?.is_draft
          ? 'bg-primary-highlight rounded-lg'
          : ''
      }`}
    >
      <div
        className="w-full flex flex-col lg:flex-row pr-4"
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
          <div className="px-3 pt-2 mt-auto lg:mt-0">
            <Tooltips title="Pin this discussion" arrow>
              <p>
                <IconPin
                  className={`cursor-pointer ${
                    discuss?.is_pin ? 'text-primary' : ''
                  } text-4xl`}
                  onClick={() => pin(discuss)}
                  hidden={hidePin}
                />
              </p>
            </Tooltips>
          </div>
        </div>
        <div className="flex-1 chat-content mt-5 lg:m-0">
          <div className="chat-content-body">
            <div className="flex justify-between">
              <h2
                style={{ display: 'block', flex: 1 }}
                className="cursor-pointer text-base mb-2.5 font-medium line-clamp-2"
              >
                <Link href={`/dashboard/discussion/${discuss?.id}`}>
                  <a>{discuss?.title}</a>
                </Link>
              </h2>
              {!!discuss?.is_draft && (
                <button
                  className="text-primary"
                  type="button"
                  style={{ marginRight: '10px', textDecoration: 'underline' }}
                  onClick={() => editDraft(discuss)}
                >
                  Edit
                </button>
              )}
              {!!discuss?.is_draft && (
                <button
                  className="text-primary"
                  type="button"
                  style={{ marginRight: '10px', textDecoration: 'underline' }}
                  onClick={() => publishDraft(discuss)}
                >
                  Publish
                </button>
              )}
              {!!discuss?.is_draft && (
                <button
                  className="text-primary"
                  type="button"
                  style={{ textDecoration: 'underline' }}
                  onClick={() => deleteDraft(discuss)}
                >
                  Delete
                </button>
              )}
            </div>
            <Link href={`/dashboard/discussion/${discuss?.id}`}>
              <div
                style={{ cursor: 'pointer' }}
                className="text-sm mb-5 line-clamp-5"
                dangerouslySetInnerHTML={{ __html: discuss?.description }}
              />
            </Link>
          </div>
          <div className="w-full chat-content-footer flex text-sm justify-between flex-col lg:flex-row">
            <p>
              <span className="text-gray pr-2">Posted by:</span>
              <Link href={`/dashboard/profile/${discuss?.user?.id}`}>
                <a className="inline-flex gap-2 items-center text-primary font-medium">
                  {discuss?.user?.pseudonym ||
                    `${discuss?.user?.first_name} ${discuss?.user?.last_name}`}
                  {discuss?.user?.profile?.status === 'approved' && (
                    <VerifiedIcon className="text-primary" />
                  )}
                </a>
              </Link>
            </p>
            <ul className="ml-8 flex gap-12 -ml-6 mt-5 lg:ml-0 lg:mt-0">
              <li className="flex items-center">
                <Link href={`/dashboard/discussion/${discuss?.id}`}>
                  <a className="flex items-center">
                    <Tooltips title="Comments" arrow>
                      <p>
                        <IconChatBox />
                      </p>
                    </Tooltips>
                    <span className="pl-2.5">{discuss?.comments || 0}</span>
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <a className="flex items-center" onClick={() => pin(discuss)}>
                  <Tooltips title="Pins" arrow>
                    <p>
                      <IconPin
                        className={`cursor-pointer ${
                          discuss?.is_pin ? 'text-primary' : ''
                        } text-3xl`}
                      />
                    </p>
                  </Tooltips>
                  <span className="pl-0.5">{discuss?.total_pinned || 0}</span>
                </a>
              </li>
              <li className="flex items-center">
                <Link href={`/dashboard/discussion/${discuss?.id}`}>
                  <a className="flex items-center">
                    <Tooltips title="Likes" arrow>
                      <p>
                        <IconLike />
                      </p>
                    </Tooltips>
                    <span className="pl-2.5">{discuss?.likes || 0}</span>
                  </a>
                </Link>
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
      padding-right: 0 !important;
    }
    .col-2 {
      width: 100%;
      padding-right: 0 !important;
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
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell key="emptyBody1" />
              <Table.BodyCell key="emptyBody2">
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
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell key="emptyBody1" />
              <Table.BodyCell key="emptyBody2">
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
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell key="emptyBody1" />
              <Table.BodyCell key="emptyBody2">
                <ChatBox data={row} togglePinCallback={removePinDiscussion} />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab4 = () => {
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
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

  const fetchDraftDiscussions = (pageValue = page) => {
    dispatch(
      getDraftDiscussions({ page: pageValue }, (results, isHasMore) => {
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

  useEffect(() => {
    fetchDraftDiscussions();
  }, []);

  const publishDraft = item => {
    setLoading(true);
    dispatch(
      publishDiscussion(
        { id: item.id },
        () => {
          setLoading(false);
          const temp = data.filter(x => x.id !== item.id);
          setData(temp);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const deleteDraft = item => {
    setLoading(true);
    dispatch(
      deleteDraftDiscussion(
        { id: item.id },
        () => {
          setLoading(false);
          const temp = data.filter(x => x.id !== item.id);
          setData(temp);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="discussion-table h-full"
        onLoadMore={fetchDraftDiscussions}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell key="emptyBody1" />
              <Table.BodyCell key="emptyBody2">
                <ChatBox
                  data={row}
                  hidePin
                  onPublishDraft={publishDraft}
                  onDeleteDraft={deleteDraft}
                />
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
  {
    content: Tab4,
    id: 'draft',
    title: 'Draft',
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
        <Card
          className="h-full lg:pl-card lg:py-5 lg:shadow-2xl overflow-y-auto-1"
          noShadow
        >
          <div className="w-full h-full">
            <div className="flex justify-end lg:mr-card">
              <Link href="/dashboard/discussion/add">
                <a>
                  <Button className="relative z-40 px-5 py-2" primary>
                    + New Discussion
                  </Button>
                </a>
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

export default LoadingScreen(
  withPageRestricted(DashboardDiscusion, 'discussions'),
  'final-all'
);
