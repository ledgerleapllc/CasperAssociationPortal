import { useState } from 'react';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton } from '../../../components/partials';
import IconLike from '../../../public/images/ic_like.svg';
import IconDislike from '../../../public/images/ic_dislike.svg';
import IconEye from '../../../public/images/ic_eye.svg';
import IconChatBox from '../../../public/images/ic_chatbox.svg';

const chatBoxDetailFakeData = {
  desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  discussions: [
    {
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
      image: '/images/img_signature.png',
      postedBy: 'Username16448',
      reaction: {
        comments: 25,
        likes: 25,
        read: 25,
      },
      title: 'Title goes here for each discussion',
      user: {
        createdDate: '5/9/2021 - 10:40am',
        name: 'Username123',
        validatorId: '261689470949',
      },
    },
    {
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
      image: '/images/img_signature.png',
      postedBy: 'Username16448',
      reaction: {
        comments: 25,
        likes: 25,
        read: 25,
      },
      title: 'Title goes here for each discussion',
      user: {
        createdDate: '5/9/2021 - 10:40am',
        name: 'Username123',
        validatorId: '261689470949',
      },
    },
  ],
  image: '/images/img_signature.png',
  postedBy: 'Username16448',
  reaction: {
    comments: 25,
    likes: 25,
    read: 25,
  },
  title: 'Title goes here for each discussion',
  user: {
    createdDate: '5/9/2021 - 10:40am',
    name: 'Username123',
    validatorId: '261689470949',
  },
};

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
          src="/images/img_signature.png"
          alt="avatar"
        />
      </div>
      <div className="pt-2 pr-6 mt-auto lg:mt-0">
        <p className="text-sm font-bold py-1">{data.user.name}</p>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">Validator ID: {data.user.validatorId}</p>
        <div className="border-gray1 border-b" />
        <p className="text-xxs py-1">{data.user.createdDate}</p>
        <div className="border-gray1 border-b" />
      </div>
    </div>
    <div className="chat-content mt-5 lg:m-0">
      <div className="chat-content-body">
        <p className="text-sm mb-5">{data.desc}</p>
      </div>
    </div>
    <div className="block lg:hidden chat-content-footer flex text-sm flex-col md:flex-row">
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
);

const DashboardDiscusionDetail = () => {
  const [chatBoxDetail, setChatBoxDetail] = useState(chatBoxDetailFakeData);

  const ReactionBar = () => (
    <ul className="flex">
      <li className="flex px-6 items-center">
        <IconLike className="text-primary" />
        <span className="pl-2.5">{chatBoxDetail.reaction.comments || 0}</span>
      </li>
      <li className="flex px-6 items-center">
        <IconDislike />
        <span className="pl-2.5">{chatBoxDetail.reaction.read || 0}</span>
      </li>
    </ul>
  );

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
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
                {chatBoxDetail.title}
              </h3>
              <div className="hidden lg:inline-block">
                <ReactionBar />
              </div>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pb-40 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <ChatBox data={chatBoxDetail} noBorder />
              <div className="relative pt-4 mb-8 lg:mb-12 ck-editor-reverse">
                <Editor />
                <button
                  type="button"
                  className="my-5 h-16 lg:absolute lg:m-0 lg:bottom-4 lg:right-12 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Add Comment
                </button>
              </div>
              <div className="hidden lg:block border-primary border-b" />
              <ul className="pb-20">
                {chatBoxDetail.discussions.map((data, index) => (
                  <li key={index}>
                    <ChatBox data={data} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardDiscusionDetail;
