import { ClockBar } from '../../../partials';

export const PerkPage = ({ perk }) => (
  <div className="flex py-6 gap-8">
    <div className="w-full lg:w-1/4 h-48">
      <img
        className="object-cover w-full h-full bg-gray1"
        src={perk?.image?.link || ''}
        alt=""
      />
    </div>
    <div className="w-full lg:w-3/4">
      <div className="flex text-primary text-xs mb-6">
        <span className="pr-1">Time Remaining:</span>
        <ClockBar endTime={new Date(perk?.end_date)} hideProgressBar />
      </div>
      <h4 className="font-bold mb-4 line-clamp-2">{perk?.title}</h4>
      <p>{perk?.content}</p>
    </div>
  </div>
);
