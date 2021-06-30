import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Common dialog Context
const DialogContext = React.createContext({
  setDialog: data => data,
});

// Create `useDialog` hook that using DialogContext
const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

// Dialog Component
const Dialog = ({ dialog, onClosed }) => {
  const settings = dialog.settings ? dialog.settings : {};
  const onCloseDialog = value => {
    // Close dialog on DialogProvider
    onClosed();

    // Execure afterClosed callback fn on Component
    if (dialog.afterClosed) {
      dialog.afterClosed(value);
    }
  };

  return createPortal(
    <div className="backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50">
      {dialog.type === 'Dialog' && (
        <div
          className="w-full max-w-2xl shadow-2xl mx-4 relative bg-white"
          style={settings.style}
        >
          <div>
            <p className="text-4xl text-center pt-4">{dialog.data.title}</p>
            <a onClick={() => onCloseDialog(false)}>
              <img
                src="/images/ic_decline.svg"
                className="absolute right-4 top-4"
                alt="Cancel"
              />
            </a>
            <div className="h-full w-full pt-16 pb-36 flex flex-col items-center justify-between border-gray">
              <div className="h-full w-full flex flex-col items-center justify-between">
                {dialog.data.content}
              </div>
            </div>
          </div>
          {!settings.hideButton && (
            <button
              type="button"
              className="transform -translate-x-1/2 absolute left-1/2 bottom-6 text-lg text-white w-1/2 lg:w-1/2 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              onClick={() => onCloseDialog(false)}
            >
              OK
            </button>
          )}
        </div>
      )}
      {dialog.type === 'DialogConfirm' && (
        <div
          className="w-full max-w-2xl shadow-2xl mx-4 relative bg-white p-16"
          style={settings.style}
        >
          {dialog.data.title && (
            <h3 className="text-4xl text-center mb-6">{dialog.data.title}</h3>
          )}
          <div className="h-full w-full flex mb-6 flex-col items-center justify-between border-gray">
            <div className="h-full w-full flex flex-col items-center justify-between">
              {dialog.data.content}
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              onClick={() => onCloseDialog(false)}
            >
              {dialog.data.cancel}
            </button>
            <button
              type="button"
              className="mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              onClick={() => onCloseDialog(true)}
            >
              {dialog.data.ok}
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

const DialogProvider = props => {
  const [dialog, setDialog] = useState(null);
  const onClosed = useCallback(() => {
    // Set null for DialogContext, that mean close Dialog Component on Provider
    setDialog(null);
  }, [setDialog]);

  return (
    <DialogContext.Provider value={{ dialog, onClosed, setDialog }} {...props}>
      {props.children}
      {dialog && <Dialog dialog={dialog} onClosed={onClosed} />}
    </DialogContext.Provider>
  );
};

export { DialogProvider, useDialog };
