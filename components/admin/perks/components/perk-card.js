import { Link } from 'react-router-dom';
import { Button, ClockBar } from '../../../partials';

export const PerkCard = ({ perk }) => {
  const renderTimeRemaining = () => {
    const end_date = new Date(perk?.end_date);
    if (end_date.getTime() > new Date().getTime()) {
      return (
        <div className="flex text-primary text-xs pb-6">
          <span className="pr-1">Time Remaining:</span>
          <ClockBar
            startTime={new Date(perk?.start_date)}
            endTime={new Date(perk?.end_date)}
            hideProgressBar
          />
        </div>
      );
    }

    return (
      <div className="flex text-primary text-xs pb-6">
        <b>Ended</b>
      </div>
    );
  };

  return (
    <div className="w-full h-56 flex p-5 pr-2 shadow-card gap-4 rounded-2xl">
      <div className="w-1/2">
        {perk?.image?.url ? (
          <img
            className="object-cover w-full h-full bg-gray1"
            src={perk?.image?.url}
            alt=""
          />
        ) : (
          <div className="bg-gray1 w-full h-full" />
        )}
      </div>
      <div className="w-1/2">
        <div className="h-2/3 flex flex-col justify-between">
          <h4 className="text-base font-bold pt-4 line-clamp-2">
            {perk?.title}
          </h4>
          {perk?.start_date && perk?.end_date && renderTimeRemaining()}
        </div>
        <div className="h-1/3">
          <Link to={`${perk?.id ? `/dashboard/perks/${perk.id}` : ''}`}>
            <span>
              <Button primary className="px-5 py-2">
                More Information
              </Button>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
