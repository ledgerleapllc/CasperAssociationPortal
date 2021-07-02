import ReactLoading from 'react-loading';

export function LoadingButton(props) {
  return (
    <button type="button" {...props}>
      <div className="flex items-center justify-center">
        {props.isLoading && (
          <ReactLoading
            className="mr-3"
            type="spinningBubbles"
            color={props.colorSpinner || '#FFFFFF'}
            width={props.sizeSpinner || 30}
            height={props.sizeSpinner || 30}
          />
        )}
        {props.children}
      </div>
    </button>
  );
}
