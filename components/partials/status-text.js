const statusBallots = {
  pass: 'text-green',
  cancelled: '',
  fail: 'text-primary',
};

const directionText = {
  for: 'text-green',
  against: 'text-primary',
};

const perkStatus = {
  active: 'text-green uppercase',
  waiting: 'capitalize',
  expired: 'text-primary capitalize',
  inactive: 'text-primary uppercase',
  off: 'capitalize',
};

const StatusText = props => (
  <>
    {['pass', 'cancelled', 'fail'].includes(props.content) && (
      <span
        className={`${statusBallots[props.content?.toLowerCase()]} ${
          props.className
        }`}
      >
        {props.content}
      </span>
    )}
    {['for', 'against'].includes(props.content) && (
      <span
        className={`${directionText[props.content?.toLowerCase()]} ${
          props.className
        }`}
      >
        {props.content}
      </span>
    )}
    {['active', 'waiting', 'ended', 'inactive', 'OFF'].includes(
      props.content
    ) && (
      <span
        className={`${perkStatus[props.content?.toLowerCase()]} ${
          props.className
        }`}
      >
        {props.content}
      </span>
    )}
  </>
);

export default StatusText;
