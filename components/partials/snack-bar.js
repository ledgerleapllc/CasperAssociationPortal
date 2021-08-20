import React, { memo, useState } from 'react';
import classNames from 'classnames';

const SNACK_CLASS = {
  primary: 'bg-primary text-white',
};

const SnackBarContext = React.createContext({
  setDialog: data => data,
});

const useSnackBar = () => {
  const context = React.useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarProvider');
  }
  return context;
};

const SnackBar = ({ data }) => (
  <div
    className={classNames(
      'animate__animated animate__fadeInRight h-11 px-8 fixed right-5 bottom-20 rounded flex items-center z-50',
      SNACK_CLASS[data.type]
    )}
  >
    <p>{data.message}</p>
  </div>
);

const DEFAULT_CONFIG = {
  delay: 3000,
};

const ChildrenMemo = memo(({ children }) => children);

const SnackBarProvider = props => {
  const [snack, setSnack] = useState(null);

  const openSnack = (
    type = 'primary',
    message,
    config = {
      delay: 4000,
    }
  ) => {
    const configTemp = {
      ...DEFAULT_CONFIG,
      ...config,
    };
    setSnack({
      type,
      message,
    });
    setTimeout(() => {
      setSnack(null);
    }, configTemp.delay);
  };

  return (
    <SnackBarContext.Provider value={{ openSnack }}>
      <ChildrenMemo>{props.children}</ChildrenMemo>
      {snack && <SnackBar data={snack} />}
    </SnackBarContext.Provider>
  );
};

export { SnackBarProvider, useSnackBar };
