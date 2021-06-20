import { useEffect, useState } from 'react';
import IconCheck from '../../public/images/ic_check.svg';
import IconUncheck from '../../public/images/ic_uncheck.svg';

const Checkbox = ({ labelText, onChange }) => {
  const [check, setCheck] = useState(false);

  const toggle = () => {
    setCheck(!check);
  };

  useEffect(() => {
    onChange(check);
  }, [check]);

  return (
    <label className="inline-flex items-center" onClick={() => toggle()}>
      <i>{check ? <IconCheck /> : <IconUncheck />}</i>
      <span className="pl-4">{labelText}</span>
    </label>
  );
};

export default Checkbox;
