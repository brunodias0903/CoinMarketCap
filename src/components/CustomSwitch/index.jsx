import React, { useState } from 'react';
import { Slider, SwitchContainer } from './styles';

const CustomSwitch = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <SwitchContainer isActive={isActive} onClick={handleToggle}>
      <Slider isActive={isActive} />
    </SwitchContainer>
  );
};

export default CustomSwitch;