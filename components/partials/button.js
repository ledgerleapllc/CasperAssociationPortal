import ReactLoading from 'react-loading';

export function Button(props) {
  const btnClass = `flex items-center justify-center ${props.className || ''}`;
  const colorSpinner = props.colorSpinner ? props.colorSpinner : '#FFFFFF';
  const handleClick = () => {
    if (props.onClick && typeof props.onClick === 'function') {
      props.onClick();
    }
  };
  return (
    <button
      className={btnClass}
      type={props.type ? props.type : 'button'}
      disabled={props.isDisabled ? props.isDisabled : false}
      onClick={handleClick}
    >
      {props.isLoading && (
        <ReactLoading
          type="spinningBubbles"
          color={colorSpinner}
          width={30}
          height={30}
        />
      )}
      <span className="pl-3">{props.title}</span>
    </button>
  );
}
