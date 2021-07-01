const statusBallots = {
  pass: 'text-green',
  cancelled: '',
  fail: 'text-primary',
};

const directionText = {
  for: 'text-green',
  against: 'text-primary',
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
  </>
);

export default StatusText;
