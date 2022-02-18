/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import ReactLoading from 'react-loading';
import { Card } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow.svg';
import IconX from '../../public/images/ic_x.svg';

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Alert = ({
  alerts,
  isLoading,
  doDismiss,
  doUpdateClickCTA,
  doUpdateView,
}) => {
  const sliderRef = useRef(null);
  const [currentSlider, setCurrentSlider] = useState(0);
  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    if (alerts?.[currentSlider]) doUpdateView(alerts?.[currentSlider].id);
  }, [currentSlider]);

  return (
    <Card className="w-full flex bg-primary items-center h-full justify-between px-5 items-center">
      {isLoading ? (
        <div className="w-full">
          <ReactLoading
            className="mx-auto"
            type="spinningBubbles"
            color="white"
            width={25}
            height={25}
          />
        </div>
      ) : (
        <>
          <button
            type="button"
            className="text-3xl text-white focus:outline-none disabled:opacity-40"
            onClick={prev}
            disabled={alerts?.length === 1}
          >
            <ArrowIcon />
          </button>
          <div className="h-full" style={{ width: 'calc(100% - 3.75rem)' }}>
            <div
              className="overflow-hidden px-2 text-white h-full block min-w-full"
              style={{ width: 0 }}
            >
              <Slider
                ref={sliderRef}
                {...{
                  ...settings,
                  ...{
                    afterChange: current => setCurrentSlider(current),
                  },
                }}
              >
                {alerts.map((alert, ind) => (
                  <div className="h-full" key={ind}>
                    <div className="flex items-center h-full py-5">
                      <div
                        className="flex h-full"
                        role="button"
                        onClick={() => {
                          if (alert?.handler) {
                            alert.handler();
                          }
                        }}
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <p className="text-base font-bold pb-1 leading-tight">
                          <span>
                            Alert {ind + 1} of {alerts?.length}:
                          </span>
                          <span> </span>
                          <span>{alert?.title}</span>
                        </p>
                        <p className="text-xs line-clamp-3">
                          <span>{alert?.body}</span>
                          {+alert?.allow_dismiss_btn === 1 && (
                            <span
                              className="text-white pl-2"
                              onClick={() => doDismiss(ind, alert?.id)}
                            >
                              <span>
                                <IconX className="text-xs inline" />
                              </span>
                              <span className="underline pl-1">Dismiss</span>
                            </span>
                          )}
                        </p>
                      </div>
                      {+alert?.have_action === 1 && (
                        <button
                          type="button"
                          className="ml-2 text-lg text-primary w-80 h-12 rounded-full bg-white cursor-pointer disabled:cursor-not-allowed focus:outline-none shadow-md flex items-center justify-center"
                          onClick={() => {
                            doUpdateClickCTA(alert?.id);
                            window.open(alert?.action_link, '_blank');
                          }}
                        >
                          Learn More
                        </button>
                      )}
                      {alert?.custom_text && alert?.custom_action && (
                        <button
                          type="button"
                          className="ml-2 text-lg text-primary w-80 h-12 rounded-full bg-white cursor-pointer disabled:cursor-not-allowed focus:outline-none shadow-md flex items-center justify-center"
                          onClick={alert?.custom_action}
                        >
                          Get Verified
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <button
            type="button"
            className="text-3xl text-white focus:outline-none transform rotate-180 disabled:opacity-40"
            onClick={next}
            disabled={alerts?.length === 1}
          >
            <ArrowIcon />
          </button>
        </>
      )}
    </Card>
  );
};

export default Alert;
