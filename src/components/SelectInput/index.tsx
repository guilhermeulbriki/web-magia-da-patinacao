import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  placeholder?: string;
  handleSelect: Function;
  defaultValue?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const SelectInput: React.FC<SelectProps> = ({
  placeholder = 'Selecione uma opção',
  name,
  options,
  handleSelect,
  defaultValue = '',
  ...rest
}) => {
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  const handleValueChange = useCallback(
    (value: string) => {
      handleSelect(value);
      setSelectedDay(value);
    },
    [handleSelect],
  );

  useEffect(() => {
    setSelectedDay(defaultValue);
  }, [defaultValue]);

  return (
    <Container>
      <select
        onChange={(e) => handleValueChange(e.target.value)}
        value={selectedDay}
        {...rest}
        id={name}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
