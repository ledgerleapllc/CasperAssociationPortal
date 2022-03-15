import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IconCheckCircle from '../../public/images/ic_check_circle.svg';
import IconWaitingCircle from '../../public/images/ic-time.svg';
import { bypassOnboardStep } from '../../shared/redux-saga/onboard/actions';
import { updateUser } from '../../shared/redux-saga/auth/actions';

const OnboardItem = ({
  className,
  imageUrl,
  blurImageUrl,
  title,
  doneStep,
  waitingStep,
  description,
  onClick,
  stepType,
  userInfoKey,
  handleBypass,
  disabled,
}) => {
  const [onHover, setOnHover] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);
  const router = useHistory();

  useEffect(() => {
    if (
      user?.letter_verified_at &&
      user?.signature_request_id &&
      user?.node_verified_at
    ) {
      router.push('/dashboard');
      dispatch(
        updateUser({
          period: 'final',
        })
      );
    }
  }, [user]);

  const handleByPass = () => {
    handleBypass(true);
    dispatch(
      bypassOnboardStep({ type: stepType }, () => {
        dispatch(
          updateUser({
            [userInfoKey]: true,
          })
        );
        handleBypass(false);
      })
    );
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      {disabled ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        />
      ) : null}
      <div
        role="button"
        tabIndex="0"
        className="relative"
        onMouseLeave={() => setOnHover(false)}
        onKeyDown={onClick}
        onClick={onClick}
      >
        <div className="relative">
          <img src={imageUrl} alt="esign terms" className="object-cover z-4" />
          <div className="absolute left-0 bottom-0 p-4 z-3">
            <button
              type="button"
              className="text-xl text-white focus:outline-none"
              onClick={handleByPass}
            >
              Dev Clear
            </button>
          </div>
          <div
            className={`transition duration-300 ease-in-out absolute left-0 right-0 top-0 bottom-0 ${
              onHover ? 'opacity-100 z-4' : 'opacity-0 z-2'
            } bg-white`}
            style={{ backgroundImage: `url(${blurImageUrl})` }}
            onMouseEnter={() => setOnHover(true)}
          >
            <div
              className={`transition duration-300 ease-in-out transform absolute bottom-0 mx-5 my-10 ${
                onHover ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <p className="text-2xl">
                {title}
                {doneStep && (
                  <IconCheckCircle className="inline ml-2 mb-1 text-primary text-base" />
                )}
                {waitingStep && (
                  <IconWaitingCircle className="inline ml-2 mb-1 text-primary text-base" />
                )}
              </p>
              <div className="text-sm text-dark1 mt-2">{description}</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`transition transform duration-600 ease-in-out absolute z-4 ml-4 -mt-6 focus:outline-none ${
            onHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <img src="/images/ic_next_circle_gradient_large.svg" alt="next" />
        </button>
        <div
          className={`lg:mx-4 lg:my-6 transition transform duration-300 ease-in-out ${
            onHover ? 'opacity-0 -translate-y-20' : 'opacity-100'
          }`}
          onMouseEnter={() => setOnHover(true)}
        >
          <p className="text-2xl">
            {title}
            {doneStep && (
              <IconCheckCircle className="inline ml-2 mb-1 text-primary text-base" />
            )}
            {waitingStep && (
              <IconWaitingCircle className="inline ml-2 mb-1 text-primary text-base" />
            )}
          </p>
          <div className="text-sm text-dark1 mt-2">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardItem;
