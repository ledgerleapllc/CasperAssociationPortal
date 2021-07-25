import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

const BUTTON_STYLES = {
  primary: `text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md`,
  primaryOutline: `text-primary rounded-full bg-white border-2 border-primary disabled:opacity-40 disabled:cursor-not-allowed shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white`,
};

const BUTTON_SIZES = {
  default: `text-sm h-11 lg:w-52`,
  small: `text-xs h-8 min-w-20`,
  large: `text-lg h-16 w-52`,
};

export function Button(props) {
  const {
    primary,
    primaryOutline,
    className,
    size,
    sizeSpinner,
    isLoading,
    colorSpinner,
    ...otherProps
  } = props;
  const [groupClass, setGroupClass] = useState('');

  useEffect(() => {
    const group = !size ? BUTTON_SIZES.default : BUTTON_SIZES[size];
    if (primary) {
      setGroupClass(`${group} ${BUTTON_STYLES.primary}`);
    } else if (primaryOutline) {
      setGroupClass(`${group} ${BUTTON_STYLES.primaryOutline}`);
    }
  }, [props]);

  return (
    <button
      type="button"
      className={`${className || ''} ${groupClass}`}
      {...otherProps}
    >
      <div className="flex items-center justify-center">
        {isLoading && (
          <ReactLoading
            className="mr-3"
            type="spinningBubbles"
            color={colorSpinner || '#FFFFFF'}
            width={sizeSpinner || 30}
            height={sizeSpinner || 30}
          />
        )}
        {props.children}
      </div>
    </button>
  );
}
