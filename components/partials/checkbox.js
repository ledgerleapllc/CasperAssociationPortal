/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react';
import IconCheck from '../../public/images/ic_check.svg';
import IconUncheck from '../../public/images/ic_uncheck.svg';

const Checkbox = ({ value, labelText, onChange }) => {
  const [check, setCheck] = useState(false);

  const toggle = () => {
    setCheck(!check);
    onChange(!check);
  };

  useEffect(() => {
    setCheck(value);
  }, [value]);

  return (
    <label className="inline-flex items-center" onClick={() => toggle()}>
      <i>{check ? <IconCheck /> : <IconUncheck />}</i>
      <span className="pl-4">{labelText}</span>
    </label>
  );
};

export default Checkbox;
