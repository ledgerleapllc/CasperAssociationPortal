import { Card } from '../../../partials';
import ArrowIcon from '../../../../public/images/ic_arrow.svg';
import IconX from '../../../../public/images/ic_x.svg';

const BannerPreview = ({ notification }) => (
  <Card className="w-full flex bg-primary items-center justify-center px-5 h-26 items-center">
    <div className="text-3xl text-white focus:outline-none">
      <ArrowIcon />
    </div>
    <div
      className="flex items-center"
      style={{ width: 'calc(100% - 3.75rem)' }}
    >
      <div
        className="overflow-hidden px-2 text-white h-full block flex-grow w-full"
        style={{ width: 0 }}
      >
        <div className="h-full">
          <p className="text-base font-bold pb-1">{notification?.title}</p>
          <p className="text-xs">
            <span>{notification?.body}</span>
            {+notification?.allow_dismiss_btn === 1 && (
              <span className="text-white pl-2">
                <span>
                  <IconX className="text-xs inline" />
                </span>
                <span className="underline pl-1">Dismiss</span>
              </span>
            )}
          </p>
        </div>
      </div>
      {+notification?.have_action === 1 && (
        <div className="mr-2 text-lg text-primary w-48 h-12 rounded-full bg-white hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md flex items-center justify-center">
          Learn More
        </div>
      )}
    </div>
    <div className="text-3xl text-white focus:outline-none transform rotate-180">
      <ArrowIcon />
    </div>
  </Card>
);

const PopupPreview = ({ notification }) => (
  <div className="w-full shadow-2xl mx-4 relative bg-white">
    <div className="p-16">
      <div>
        <p className="text-4xl text-center mb-6">{notification?.title}</p>
        <p>
          <img
            src="/images/ic_decline.svg"
            className="absolute right-6 top-6"
            alt="Cancel"
          />
        </p>
        <div className="h-full w-full flex mb-6 flex-col items-center justify-between border-gray">
          <div className="h-full w-full flex flex-col items-center justify-between">
            {notification?.body}
          </div>
        </div>
      </div>
      {notification?.btn_text && (
        <div className="flex flex-row justify-center">
          <button
            type="button"
            className="mx-2 bottom-6 text-lg  text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
          >
            {notification?.btn_text}
          </button>
        </div>
      )}
    </div>
  </div>
);
export const NotificationPreview = ({ notification }) => (
  <div className="w-full p-5">
    {notification?.type === 'Banner' && (
      <BannerPreview notification={notification} />
    )}
    {notification?.type === 'Popup' && (
      <PopupPreview notification={notification} />
    )}
  </div>
);
