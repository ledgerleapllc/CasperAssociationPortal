import Link from 'next/link';
import { Button, ClockBar } from '../../../partials';

export const PerkCard = ({ perk }) => (
  <div className="w-full h-56 flex p-5 pr-2 shadow-card gap-4 rounded-2xl">
    <div className="w-1/2">
      {perk?.image?.url ? (
        <img
          className="object-cover w-full h-full bg-gray1"
          src={perk?.image?.url || ''}
          alt=""
        />
      ) : (
        <div className="bg-gray1 w-full h-full" />
      )}
    </div>
    <div className="w-1/2">
      <div className="h-2/3 flex flex-col justify-between">
        <h4 className="text-base font-bold pt-4 line-clamp-2">{perk?.title}</h4>
        {perk?.start_date && perk?.end_date && (
          <div className="flex text-primary text-xs pb-6">
            <span className="pr-1">Time Remaining:</span>
            <ClockBar
              startTime={new Date(perk?.start_date)}
              endTime={new Date(perk?.end_date)}
              hideProgressBar
            />
          </div>
        )}
      </div>
      <div className="h-1/3">
        <Link href={`${perk?.id ? `/dashboard/perks/${perk.id}` : ''}`}>
          <a>
            <Button primary>More Information</Button>
          </a>
        </Link>
      </div>
    </div>
  </div>
);
