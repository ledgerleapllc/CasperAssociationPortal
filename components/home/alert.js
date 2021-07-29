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
            className="text-3xl text-white focus:outline-none"
            onClick={prev}
          >
            <ArrowIcon />
          </button>
          <div style={{ width: 'calc(100% - 3.75rem)' }}>
            <div
              className="overflow-hidden px-5 text-white h-full block min-w-full"
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
                  <div className="h-full">
                    <div className="flex items-center h-full">
                      <div
                        className="h-full flex-grow"
                        role="button"
                        onClick={() => {
                          if (alert?.handler) {
                            alert.handler();
                          }
                        }}
                      >
                        <p className="text-base font-bold pb-1">
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
                          className="ml-5 text-lg text-primary w-64 h-12 rounded-full bg-white cursor-pointer disabled:cursor-not-allowed focus:outline-none shadow-md flex items-center justify-center"
                          onClick={() => {
                            doUpdateClickCTA(alert?.id);
                            window.open(alert?.action_link, '_blank');
                          }}
                        >
                          Learn More
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
            className="text-3xl text-white focus:outline-none transform rotate-180"
            onClick={next}
          >
            <ArrowIcon />
          </button>
        </>
      )}
    </Card>
  );
};

export default Alert;
