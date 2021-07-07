import { useDispatch, useSelector } from 'react-redux';
import { logoutApp } from '../../shared/redux-saga/auth/actions';
import NodeInfoHome from './node-info-home';

const InfoRightHome = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo?.fullInfo);

  return (
    <div className="flex flex-col mx-9 my-3 bg-white">
      <div className="flex flex-col pb-8 xl:pb-4 2xl:pb-8 border-b-2 border-gray">
        <div className="flex">
          <img
            className="pr-2"
            src="/images/ic_awesome_user_circle.svg"
            alt="User"
          />
          <span className="text-2xl truncate">{user?.full_name}</span>
        </div>
        <button
          type="button"
          className="mt-2 inline-flex text-xs text-primary underline"
          onClick={async e => {
            e.preventDefault();
            dispatch(logoutApp());
          }}
        >
          Logout
        </button>
      </div>
      <NodeInfoHome />
    </div>
  );
};

export default InfoRightHome;
