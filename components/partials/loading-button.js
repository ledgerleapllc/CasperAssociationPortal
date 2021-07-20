import ReactLoading from 'react-loading';

export function LoadingButton(props) {
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
          className="mr-3"
          type="spinningBubbles"
          color={colorSpinner}
          width={props.size || 30}
          height={props.size || 30}
        />
      )}
      <span>{props.title}</span>
    </button>
  );
}
