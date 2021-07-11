/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { Card } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow.svg';

const Alert = ({ alerts }) => {
  const [currentAlert, setCurrentAlert] = useState(0);

  return (
    <Card className="lg:flex-grow bg-primary flex items-center justify-between px-5 h-70px items-center">
      <button
        type="button"
        className="text-3xl text-white focus:outline-none"
        onClick={() =>
          setCurrentAlert(pre => {
            if (pre < 1) {
              return alerts.length - 1;
            }
            return pre - 1;
          })
        }
      >
        <ArrowIcon />
      </button>
      <div
        role="button"
        className="flex flex-col flex-grow overflow-y-auto h-2/3 mx-2 text-white"
        onClick={() => {
          if (alerts?.[currentAlert]?.handler) {
            alerts[currentAlert].handler();
          }
        }}
      >
        <p className="text-xl font-bold">
          <span>
            Alert {currentAlert + 1} of {alerts?.length}:
          </span>
          <span> </span>
          <span>{alerts?.[currentAlert]?.title}</span>
        </p>
        <p className="text-md">{alerts?.[currentAlert]?.content}</p>
      </div>
      <button
        type="button"
        className="text-3xl text-white focus:outline-none transform rotate-180"
        onClick={() =>
          setCurrentAlert(pre => {
            if (+pre === alerts.length - 1) {
              return 0;
            }
            return pre + 1;
          })
        }
      >
        <ArrowIcon />
      </button>
    </Card>
  );
};

export default Alert;
