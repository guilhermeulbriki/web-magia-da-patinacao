import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

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
  const startRef = useRef<HTMLInputElement>(null);
  const finishRef = useRef<HTMLInputElement>(null);
  const { fieldName: fieldStart, registerField: registerStart } = useField(
    'start',
  );
  const { fieldName: fieldFinish, registerField: registerFinish } = useField(
    'finish',
  );

  useEffect(() => {
    registerStart({
      name: fieldStart,
      ref: startRef.current,
      path: 'value',
    });

    registerFinish({
      name: fieldFinish,
      ref: finishRef.current,
      path: 'value',
    });
  }, [fieldStart, fieldFinish, registerStart, registerFinish]);

  return (
    <Container style={containerStyle}>
      <input
        name="start"
        disabled={isDisabled}
        defaultValue={initialValue.start}
        ref={startRef}
      />
      <span>-</span>
      <input
        name="finish"
        disabled={isDisabled}
        defaultValue={initialValue.finish}
        ref={finishRef}
      />
    </Container>
  );
};

export default InputSchedule;
