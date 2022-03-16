import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resendEmailOwnerNodes } from '../../../shared/redux-saga/onboard/actions';

const SubmitKYCSixthStep = () => {
  const router = useHistory();
  const ownerNodes = useSelector(state => state.onboardReducer.ownerNodes);
  const dispatch = useDispatch();

  const resendVerify = email => {
    dispatch(resendEmailOwnerNodes({ email }));
  };

  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Once all users have submitted and passed the KYC step, your organization
        will be eligible for membership.
      </p>
      <p className="text-sm text-dark1 mt-1 animate__animated animate__fadeInLeft animate__delay-4s">
        You can continue back to your dashboard for now.
      </p>
      <p className="mt-12 text-2.5xl">
        My status: <span className="text-success">Verified</span>
      </p>
      {ownerNodes?.data?.owner_node?.length > 0 && (
        <div className="flex flex-col pt-4 h-full">
          <div className="flex flex-col lg:pt-6 h-full">
            <div className="flex w-full">
              <p className="px-1 w-1/12 text-base font-medium">Owner #</p>
              <p className="px-1 w-3/12 text-base font-medium">Email Address</p>
              <p className="px-1 w-2/12 text-base font-medium">User Type</p>
              <p className="px-1 w-2/12 text-base font-medium">% Owner</p>
              <p className="px-1 w-2/12 text-base font-medium">Status</p>
              <p className="px-1 w-2/12 text-base font-medium">Action</p>
            </div>
            <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
              {ownerNodes?.data?.owner_node?.map((ownerNode, index) => (
                <div
                  key={index}
                  className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray"
                >
                  <p className="px-2 text-sm lg:w-1/12">{index + 1}</p>
                  <p className="px-2 text-sm lg:w-3/12 overflow-hidden overflow-ellipsis">
                    {ownerNode.email || 'None'}
                  </p>
                  <p className="px-2 text-sm lg:w-2/12">
                    {ownerNode.type || 'None'}
                  </p>
                  <p className="px-2 text-sm lg:w-2/12">
                    % {ownerNode.percent || 0}
                  </p>
                  <p
                    className={`px-2 text-sm lg:w-2/12 ${
                      !ownerNode.kyc_verified_at ? 'text-primary' : ''
                    }`}
                  >
                    {ownerNode.kyc_verified_at ? 'Verified' : 'Not Verified'}
                  </p>
                  <p className="px-2 text-sm lg:w-2/12">
                    <button
                      type="button"
                      onClick={() => resendVerify(ownerNode.email)}
                      disabled={ownerNode.kyc_verified_at}
                      className="text-lg text-white rounded-2xl bg-primary shadow-md focus:outline-none hover:opacity-40 w-24 h-7"
                    >
                      Resend
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="lg:flex lg:space-x-8 lg:items-center mt-12">
        <button
          type="button"
          className="lg:hidden my-5 text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={() => router.push('/dashboard')}
        >
          To Dashboard
        </button>
      </div>
    </div>
  );
};

export default SubmitKYCSixthStep;
