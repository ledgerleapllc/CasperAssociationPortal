import { useState } from 'react';

const ToggleButton = () => {
  const [isCheck, setIsCheck] = useState();

  return (
    <label
      htmlFor="toggleA"
      className="toggle-button flex items-center cursor-pointer off-tap-highlight"
    >
      <div className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            defaultChecked={isCheck}
            id="toggleA"
            className="sr-only"
            onChange={() => setIsCheck(!isCheck)}
          />
          <div className="block bg-pink w-14 h-7 rounded-full" />
          <div className="dot absolute left-0.5 top-0.5 bg-white w-6 h-6 rounded-full transition" />
        </div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">
        {isCheck ? 'Active' : 'Deactive'}
      </div>
    </label>
  );
};

export default ToggleButton;
