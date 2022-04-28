import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

const SliderCom = props => {
  const [value, setValue] = useState(0);
  const checkMaxValue = val => {
    const temp = val < props.maxValue ? val : props.maxValue;
    setValue(temp);
    props.onChange(temp);
  };

  return (
    <Slider
      value={value}
      railStyle={{ height: '7px' }}
      onChange={checkMaxValue}
      trackStyle={{ height: '7px', backgroundColor: '#FF473E' }}
      handleStyle={{
        height: '15px',
        backgroundColor: '#FF473E',
        border: '0',
        boxShadow: 'none',
        width: '15px',
      }}
    />
  );
};
export default SliderCom;
