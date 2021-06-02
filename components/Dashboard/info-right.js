import NodeInfoHome from './node-info-home';

const InfoRight = () => (
  <div className="flex flex-col mx-9 my-3 bg-white">
    <div className="flex flex-col pb-10 border-b-2 border-gray">
      <div className="flex">
        <img
          className="pr-2"
          src="/images/ic_awesome_user_circle.svg"
          alt="User"
        />
        <span className="text-2.5xl">Jason Stone</span>
      </div>
      <span className="text-xs text-primary underline">Logout</span>
    </div>
    <NodeInfoHome />
  </div>
);

export default InfoRight;
