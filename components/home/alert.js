/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useRef } from 'react';
import Slider from 'react-slick';
import ReactLoading from 'react-loading';
import { Card } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow.svg';

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Alert = ({ alerts, isLoading }) => {
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

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
              <Slider ref={sliderRef} {...settings}>
                {alerts.map((alert, ind) => (
                  <div
                    className="h-full"
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
                    <p className="text-xs line-clamp-2">{alert?.content}</p>
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
