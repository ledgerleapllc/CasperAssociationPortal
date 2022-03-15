/* eslint-disable react/no-danger */
/* eslint-disable no-use-before-define */
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import VerifiedIcon from '../../../public/images/ic_check_mark.svg';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Editor,
  BackButton,
  Button,
  LoadingButton,
  Table,
  Tooltips,
} from '../../../components/partials';
import { useTable } from '../../../components/partials/table';
import { useDialog } from '../../../components/partials/dialog';
import IconLike from '../../../public/images/ic_like.svg';
import IconLikeSolid from '../../../public/images/ic_like_solid.svg';
import IconDislike from '../../../public/images/ic_dislike.svg';
import IconDislikeSolid from '../../../public/images/ic_dislike_solid.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import { formatDate, getShortNodeAddress } from '../../../shared/core/utils';
import {
  getDiscussionDetail,
  postDiscussionComment,
  voteDiscussion,
  getDiscussionComments,
  publishDiscussion,
  deleteDraftDiscussion,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../../pages/_app';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';

const Styles = styled.div`
  .discussion-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 0%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 100%;
      padding-right: 0 !important;
    }
`;

const ChatBox = ({ data, noBorder }) => (
  <div
    className={`flex py-8 border-gray1 flex-col lg:flex-row ${
      noBorder ? '' : 'border-b'
    }`}
  >
    <div className="flex-none flex flex-row lg:flex-col lg:w-44">
      <div className="w-24 h-24 mr-5 lg:mr-12">
        <img
          className="h-full w-full object-cover rounded-lg shadow-lg"
          src={data?.user?.avatar_url || '/images/img_signature.png'}
          alt="avatar"
        />
      </div>
      <div className="pt-2 pr-6 mt-auto lg:mt-0">
        <Link to={`/dashboard/profile/${data?.user?.id}`}>
          <span className="w-full text-sm font-bold py-1 inline-flex gap-2 items-center font-medium">
            <span className="w-4/5 truncate">{data?.user?.pseudonym}</span>
            {data?.user?.profile?.status === 'approved' && (
              <VerifiedIcon className="text-primary" />
            )}
          </span>
        </Link>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">
          Public Key:{' '}
          <Tooltips
            placement="right"
            title={data.user?.public_address_node}
            arrow
          >
            <span>
              {getShortNodeAddress(data.user?.public_address_node, 6)}
            </span>
          </Tooltips>
        </p>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">
          {`${formatDate(data.user.created_at, 'dd/MM/yyyy - HH:mm aa')} EST`}
        </p>
        <div className="border-gray1 border-b" />
      </div>
    </div>
    <div className="chat-content mt-5 lg:m-0">
      <div className="chat-content-body">
        <p
          className="text-sm mb-5"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  </div>
);

const DashboardDiscusionDetail = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [discussion, setDiscussion] = useState(null);
  const { setDialog } = useDialog();
  const routerParams = useParams();
  const router = useHistory();
  const { id } = routerParams;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();

  const postComment = comment => {
    dispatch(
      postDiscussionComment(
        {
          comment_id: comment?.id || null,
          discussion_id: id,
          description: comment.description,
        },
        res => {
          const _comment = res.comment;
          const index = data?.findIndex(item => item.id === _comment.id);
          if (index !== -1) {
            data.splice(index, 1);
          }
          appendData([_comment], true);
          setIsSubmitting(false);
          setValue('description', '');
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  const vote = is_like => {
    if (
      (is_like && discussion.is_like) ||
      (!is_like && discussion.is_vote && !discussion.is_like) ||
      discussion.user.id === userInfo?.id
    ) {
      return;
    }

    setDialog({
      type: 'DialogConfirm',
      data: {
        title: `Are you sure you want to ${
          is_like ? 'upvote' : 'downvote'
        } this discussion post?`,
        ok: 'OK',
        cancel: 'Cancel',
      },
      afterClosed: value => {
        if (value)
          dispatch(
            voteDiscussion(
              {
                discussion_id: id,
                is_like,
              },
              res => {
                setDiscussion({
                  ...res.discussion,
                  ...{ is_vote: res?.vote?.id, is_like: res?.vote?.is_like },
                });
              }
            )
          );
      },
    });
  };

  useEffect(() => {
    if (id) {
      fetchDiscussionDetail();
      fetchComments();
    }
  }, [id]);

  const onSubmit = params => {
    setIsSubmitting(true);
    postComment(params);
  };

  const fetchDiscussionDetail = () => {
    setLoading(true);
    dispatch(
      getDiscussionDetail(
        id,
        res => {
          setDiscussion(res);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const fetchComments = (pageValue = page) => {
    dispatch(
      getDiscussionComments({ id, page: pageValue }, (results, isHasMore) => {
        appendData(results);
        setHasMore(isHasMore);
        setPage(prev => prev + 1);
      })
    );
  };

  const publish = () => {
    setLoading(true);
    dispatch(
      publishDiscussion(
        { id },
        () => {
          setLoading(false);
          discussion.is_draft = 0;
          setDiscussion({ ...discussion });
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const clickEdit = () => {
    router.push(`/dashboard/discussion/edit/${discussion?.id}`);
  };

  const remove = () => {
    setLoading(true);
    dispatch(
      deleteDraftDiscussion(
        { id },
        () => {
          setLoading(false);
          router.push('/dashboard/discussion#draft');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const ReactionBar = () => (
    <div className="flex">
      <button
        type="button"
        className="flex px-6 items-center focus:outline-none"
        onClick={() => vote(1)}
      >
        {discussion.is_vote && discussion.is_like ? (
          <IconLikeSolid className="text-primary" />
        ) : (
          <IconLike />
        )}
        <span className="pl-2.5">{discussion.likes || 0}</span>
      </button>
      <button
        type="button"
        className="flex px-6 items-center focus:outline-none"
        onClick={() => vote(0)}
      >
        {discussion.is_vote && !discussion.is_like ? (
          <IconDislikeSolid className="text-primary" />
        ) : (
          <IconDislike />
        )}
        <span className="pl-2.5">{discussion.dislikes || 0}</span>
      </button>
    </div>
  );

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        {discussion && (
          <div className="w-full h-full">
            <div className="card-header lg:mr-card border-primary border-b-2">
              <div className="h-11 mt-4 mb-3">
                <div className="flex justify-between items-center">
                  <BackButton
                    href={
                      !discussion.is_draft
                        ? `/dashboard/discussion`
                        : `/dashboard/discussion#draft`
                    }
                    text="Discussions"
                    force
                  />
                  <div className="inline-block lg:hidden pb-2.5">
                    <ReactionBar />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-dark2 text-lg lg:pr-32 font-medium line-clamp-1">
                    {discussion.title}
                  </h3>
                  <div className="hidden lg:flex">
                    {!!discussion.is_draft &&
                      userInfo.id === discussion.user_id && (
                        <div className="flex gap-2">
                          <Button
                            sizeSpinner={20}
                            primaryOutline
                            className="-mt-5 my-1 text-lg"
                            onClick={remove}
                          >
                            Delete
                          </Button>
                          <Button
                            sizeSpinner={20}
                            primary
                            className="-mt-5 my-1 text-lg"
                            onClick={clickEdit}
                          >
                            Edit
                          </Button>
                          <Button
                            sizeSpinner={20}
                            primary
                            className="-mt-5 my-1 text-lg"
                            onClick={publish}
                          >
                            Publish
                          </Button>
                        </div>
                      )}
                    {!discussion.is_draft && <ReactionBar />}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body overflow-y-auto lg:h-100%-70px">
              <div className="lg:pr-card">
                <ChatBox data={discussion} noBorder />
                {userInfo && (
                  <div className="relative pt-4 mb-8 lg:mb-12 ck-editor-reverse">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Editor
                            value={value}
                            onChange={e => {
                              setIsFormValid(() => !!e.length);
                              onChange(e);
                            }}
                          />
                        )}
                        rules={{
                          required: '',
                        }}
                      />
                      <LoadingButton
                        type="submit"
                        isDisabled={!isFormValid || isSubmitting}
                        isLoading={isSubmitting}
                        title="Add Comment"
                        className="tmy-5 h-16 lg:absolute lg:m-0 lg:bottom-4 lg:right-12 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-mdext-lg text-white w-full mt-10 lg:w-auto px-7 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                      />
                    </form>
                  </div>
                )}
                <div className="hidden lg:block border-primary border-b" />
                <div className="pb-20 h-500px">
                  <Styles className="h-full">
                    <Table
                      {...register}
                      className="discussion-table h-full"
                      onLoadMore={fetchComments}
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
                              <ChatBox data={row} noBorder />
                            </Table.BodyCell>
                          </Table.BodyRow>
                        ))}
                      </Table.Body>
                    </Table>
                  </Styles>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  withPageRestricted(DashboardDiscusionDetail, 'discussions'),
  'final-all'
);
