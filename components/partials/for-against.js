const ForAgainst = props => (
  <p>
    <span
      className={`${+props.splitFor > +props.splitAgainst && 'text-green'}`}
    >
      {props.splitFor}
    </span>
    /
    <span
      className={`${+props.splitAgainst > +props.splitFor && 'text-primary'}`}
    >
      {props.splitAgainst}
    </span>
  </p>
);

export default ForAgainst;
