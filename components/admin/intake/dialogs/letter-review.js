import { useState } from 'react';

const ApproveUserView = ({ onApproveUser, onResetUser, onBanUser }) => (
  <div className="py-16 text-center w-96 mx-auto">
    <h3 className="text-xl text-center mb-2.5">Letter Review</h3>
    <p className="text-xs text-gray">
      Please click to review the provided letter and make a decision
    </p>
    <img
      className="mx-auto my-8"
      style={{ height: '100px' }}
      src="/images/img_pdf.png"
      alt="pdf"
    />
    <div className="flex gap-2.5 flex-col items-center">
      <button
        type="button"
        className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
        onClick={onApproveUser}
      >
        Approve User
      </button>
      <button
        type="button"
        className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
        onClick={onResetUser}
      >
        Deny & Reset
      </button>
      <button
        type="button"
        className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
        onClick={onBanUser}
      >
        Deny & Ban User
      </button>
    </div>
  </div>
);

const ResetUserView = ({ onResetUser, onBack }) => {
  const [message, setMessage] = useState('');
  return (
    <div className="py-16 text-center mx-auto" style={{ maxWidth: '37.5rem' }}>
      <h3 className="text-xl text-center mb-2.5">Reset User</h3>
      <p className="text-xs text-gray pb-5">
        This will reset the AML step and tell the user through email to submit
        again for the following reason:
      </p>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows="6"
        className="w-full border border-gray"
      />
      <div className="mt-8 mx-auto w-96 flex gap-2.5 flex-col items-center">
        <button
          type="button"
          className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
          onClick={() => onResetUser(message)}
        >
          Reset & Email User
        </button>
        <button
          type="button"
          className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={onBack}
        >
          Cancel & Go Back
        </button>
      </div>
    </div>
  );
};

const BanUserView = ({ onBanUser, onBack }) => (
  <div className="text-center mx-auto py-28" style={{ maxWidth: '26rem' }}>
    <h3 className="text-xl text-center mb-2.5">Ban User</h3>
    <p className="text-xs text-gray">
      Are you sure? This will change the user to banned status and prevent
      login.
    </p>
    <div className="w-96 flex gap-2.5 flex-col items-center mx-auto mt-8">
      <button
        type="button"
        className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
        onClick={onBanUser}
      >
        Yes, Ban This User
      </button>
      <button
        type="button"
        className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
        onClick={onBack}
      >
        Cancel & Go Back
      </button>
    </div>
  </div>
);

export const LetterReviewDialog = ({
  onApproveUser,
  onBanUser,
  onResetUser,
}) => {
  const [screen, setScreen] = useState('approve');
  return (
    <>
      {screen === 'approve' && (
        <ApproveUserView
          onApproveUser={onApproveUser}
          onResetUser={() => setScreen('reset')}
          onBanUser={() => setScreen('ban')}
        />
      )}
      {screen === 'ban' && (
        <BanUserView
          onBanUser={onBanUser}
          onBack={() => setScreen('approve')}
        />
      )}
      {screen === 'reset' && (
        <ResetUserView
          onResetUser={message => onResetUser(message)}
          onBack={() => setScreen('approve')}
        />
      )}
    </>
  );
};
