import ReactLoading from 'react-loading';

const VerifyNodeOwnershipThirdStep = ({ status, onContinue }) => (
  <div className="pt-8">
    {status === 'checking' && (
      <>
        <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
          Thank you
        </p>
        <p className="text-sm mt-2 text-dark1 whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-4s">
          We are checking your message file. Do not exit this screen.
        </p>
        <div className="md:relative mt-24 animate__animated animate__fadeIn animate__delay-6s">
          <ReactLoading
            type="spinningBubbles"
            color="#FF473E"
            width={137}
            height={141}
          />
        </div>
      </>
    )}
    {status === 'succeed' && (
      <>
        <img src="/images/ic_check_circle_purple.svg" alt="succss" />
        <p className="mt-12 text-2.5xl">
          Your node is: <span className="text-success">Verified</span>
        </p>
        <p className="text-sm text-dark1 mt-1">
          Way to go! Your signed message has verified your node. This step is
          complete.
        </p>
      </>
    )}
    {status === 'failed' && (
      <>
        <img src="/images/ic_x.svg" alt="fail" />
        <p className="mt-12 text-2.5xl">
          Your node is: <span className="text-primary">Not Verified</span>
        </p>
        <p className="text-sm text-dark1 mt-1">
          Please go back and start the previous step again. If this has happened
          more than once, contact support.
        </p>
      </>
    )}
    <button
      type="button"
      className={`text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary focus:outline-none mt-12 disabled:opacity-30 md:hidden ${
        status !== 'checking' ? 'block' : ''
      }`}
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

export default VerifyNodeOwnershipThirdStep;
