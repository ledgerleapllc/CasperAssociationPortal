/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

const Dropdown = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative dropdown z-50">
      <button type="button" onClick={() => setOpen(!open)}>
        {trigger}
      </button>
      {open && (
        <>
          <div className="animate__animated animate__fadeIn animate__fastest">
            <div className="absolute w-full -bottom-2 bg-white transform translate-y-full left-0 shadow-light p-4">
              {children}
            </div>
          </div>
          <div className="fixed inset-0 -z-1" onClick={() => setOpen(false)} />
        </>
      )}
    </div>
  );
};

export default Dropdown;
