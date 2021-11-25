import { Button, ClockBar } from '../../../partials';

export const PerkPage = ({ perk, hideTime }) => (
  <div className="flex py-6 gap-8">
    <div className="w-full lg:w-1/4 h-48">
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
    <div className="w-full lg:w-3/4">
      <div className="flex text-primary text-xs mb-6">
        {hideTime && (
          <>
            {perk?.start_date &&
              perk?.end_date &&
              new Date(perk?.end_date) > new Date() && (
                <>
                  <span className="pr-1">Time Remaining:</span>
                  <ClockBar
                    startTime={new Date(perk?.start_date)}
                    endTime={new Date(perk?.end_date)}
                    hideProgressBar
                  />
                </>
              )}
            {perk?.end_date && new Date(perk?.end_date) <= new Date() && (
              <b>Ended</b>
            )}
          </>
        )}
        {!hideTime && perk?.start_date && perk?.end_date && (
          <>
            <span className="pr-1">Time Remaining:</span>
            <ClockBar
              startTime={new Date(perk?.start_date)}
              endTime={new Date(perk?.end_date)}
              hideProgressBar
            />
          </>
        )}
      </div>
      <h4 className="font-bold mb-4 line-clamp-2">{perk?.title}</h4>
      <p>{perk?.content}</p>
      {perk?.action_link &&
      perk?.end_date &&
      new Date(perk?.end_date) > new Date() ? (
        <div style={{ marginTop: '20px' }}>
          <a href={perk?.action_link} target="_blank" rel="noreferrer">
            <Button primary>Click To View</Button>
          </a>
        </div>
      ) : null}
    </div>
  </div>
);
