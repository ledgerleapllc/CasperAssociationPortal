import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';
import IconX from '../../../public/images/ic_x.svg';
import IconCheckCircle from '../../../public/images/ic_check_circle.svg';
import { verifyFileCasperSigner } from '../../../shared/redux-saga/onboard/actions';

const VerifyNodeOwnershipThirdStep = ({
  newFile,
  onContinue,
  setMessageFileStatus,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    if (status === 'checking') {
      dispatch(
        verifyFileCasperSigner(
          {
            newFile,
          },
          () => {
            setStatus('succeed');
            setMessageFileStatus('succeed');
          },
          () => {
            setStatus('failed');
          }
        )
      );
    }
  }, [status]);

  return (
    <div className="pt-8">
      {status === 'checking' && (
        <>
          <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
            Thank you
          </p>
          <p className="text-sm mt-2 text-dark1 whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-4s">
            We are checking your message file. Do not exit this screen.
          </p>
          <div className="lg:relative mt-24 animate__animated animate__fadeIn animate__delay-6s">
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
          <IconCheckCircle className="text-6xl 2xl:text-5xl text-success" />
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
          <div className="text-5xl">
            <IconX className="text-primary" />
          </div>
          <p className="mt-12 text-2.5xl">
            Your node is: <span className="text-primary">Not Verified</span>
          </p>
          <p className="text-sm text-dark1 mt-1">
            Please go back and start the previous step again. If this has
            happened more than once, contact support.
          </p>
        </>
      )}
      <button
        type="button"
        className={`text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary focus:outline-none mt-12 disabled:opacity-30 lg:hidden ${
          status === 'succeed' ? 'block' : ''
        }`}
        disabled={status !== 'succeed'}
        onClick={() => {
          if (status === 'succeed') {
            onContinue();
          }
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default VerifyNodeOwnershipThirdStep;
