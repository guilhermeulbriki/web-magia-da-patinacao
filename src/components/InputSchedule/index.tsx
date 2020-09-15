import React, { InputHTMLAttributes, useRef } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  initialValue: {
    start: string;
    finish: string;
  };
  isDisabled: boolean;
}

const InputSchedule: React.FC<InputProps> = ({
  containerStyle = {},
  initialValue,
  isDisabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container style={containerStyle}>
      <input
        name="start"
        disabled={isDisabled}
        defaultValue={initialValue.start}
        ref={inputRef}
      />
      <span>-</span>
      <input
        name="finish"
        disabled={isDisabled}
        defaultValue={initialValue.finish}
        ref={inputRef}
      />
    </Container>
  );
};

export default InputSchedule;
