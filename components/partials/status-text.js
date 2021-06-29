const classText = {
  pass: 'text-green',
  cancelled: '',
  fail: 'text-primary',
};

const StatusText = props => (
  <span className={`${classText[props.content]} ${props.className}`}>
    {props.content}
  </span>
);

export default StatusText;
