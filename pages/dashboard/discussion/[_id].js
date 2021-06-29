import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import moment from 'moment';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton } from '../../../components/partials';
import IconLike from '../../../public/images/ic_like.svg';
import IconDislike from '../../../public/images/ic_dislike.svg';
import IconEye from '../../../public/images/ic_eye.svg';
import IconChatBox from '../../../public/images/ic_chatbox.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import { ApiService } from '../../../helpers/api/api.service';

const http = new ApiService();

const ChatBox = ({ data, noBorder }) => (
  <div
    className={`flex py-8 border-gray1 flex-col lg:flex-row ${noBorder ? '' : 'border-b'
      }`}
  >
    <div className="flex-none flex flex-row lg:flex-col lg:w-44">
      <div className="w-24 h-24 mr-5 lg:mr-12">
        <img
          className="h-full w-full object-cover rounded-lg shadow-lg"
          src="/images/img_signature.png"
          alt="avatar"
        />
      </div>
      <div className="pt-2 pr-6 mt-auto lg:mt-0">
        <p className="text-sm font-bold py-1">{data.user.pseudonym}</p>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">Validator ID: {data.user.validatorId}</p>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">{moment(data.user.created_at).format('M/d/YYYY - hh:mma')}</p>
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
  const [commentId, setCommentId] = useState(-1);
  const [description, setDescription] = useState('');
  const { _id } = useRouter().query;

  const setCommentEntity = _comment => {
    setCommentId(_comment.id);
    setDescription(_comment.description);
  }

  const postComment = () => {
    http.doPost([`discussions/${_id}/comment`], {
      'comment_id': commentId,
      description
    })
      .then(res => {
        if (res.data.data && res.data.data.comment) {
          const _comment = res.data.data.comment;
          const comments = discussion.comments_list;
          if (commentId !== -1) {
            const index = comments.findIndex((item) => item.id === commentId);
            comments.splice(index, 1);
          }
          comments.push(_comment);
          setDiscussion({ ...discussion, comments_list: comments });
          setCommentEntity(_comment);
        }
      })
  }

  const vote = (is_like) => {
    http.doPost([`discussions/${_id}/vote`], { is_like })
      .then(res => {
        const _discussion = res.data.data.discussion;
        console.log(_discussion);
        setDiscussion(_discussion);
      })
  }

  useEffect(() => {
    http.doGet([`discussions/detail/${_id}`])
      .then(res => {
        const _discussion = res.data.data.discussion;
        const _comments = _discussion.comments_list.filter((item) => item.user.id === userInfo.id);
        if (_comments.length) {
          setCommentEntity(_comments[0]);
        }
        setDiscussion(_discussion);
      })
      .catch(err => console.log(err));
  }, []);

  const ReactionBar = () => (
    <ul className="flex">
      <li
        className="flex px-6 items-center"
        onClick={() => vote(true)}>
        <IconLike className="text-primary" />
        <span className="pl-2.5">{discussion.likes || 0}</span>
      </li>
      <li
        className="flex px-6 items-center"
        onClick={() => vote(false)}>
        <IconDislike />
        <span className="pl-2.5">{discussion.dislikes || 0}</span>
      </li>
    </ul>
  );

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        {discussion &&
          <div className="w-full h-full">
            <div className="card-header lg:mr-24 lg:h-70px">
              <div className="flex justify-between items-center">
                <BackButton href="/dashboard/discussion" text="Discussions" />
                <div className="inline-block lg:hidden pb-2.5">
                  <ReactionBar />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3.5">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                  {discussion.title}
                </h3>
                <div className="hidden lg:inline-block">
                  <ReactionBar />
                </div>
              </div>
              <div className="border-primary border-b-2" />
            </div>
            <div className="card-body pb-40 overflow-y-auto lg:h-100%-70px">
              <div className="lg:pr-24">
                <ChatBox data={discussion} noBorder />
                {userInfo && discussion.user.id !== userInfo.id &&
                  <div className="relative pt-4 mb-8 lg:mb-12 ck-editor-reverse">
                    <Editor
                      data={description}
                      onChange={(data) => setDescription(data)}
                    />
                    <button
                      type="button"
                      className="my-5 h-16 lg:absolute lg:m-0 lg:bottom-4 lg:right-12 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                      onClick={postComment}
                    >
                      Add Comment
                    </button>
                  </div>
                }
                <div className="hidden lg:block border-primary border-b" />
                <ul className="pb-20">
                  {discussion.comments_list && discussion.comments_list.map((data, index) => (
                    <li key={index}>
                      <ChatBox data={data} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        }
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardDiscusionDetail, 'final-all');
