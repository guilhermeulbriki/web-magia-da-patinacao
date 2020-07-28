import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #00a3e4;
  height: 50px;
  width: 294px;
  border-radius: 16px;
  border: 0;
  box-shadow: 5px 4px 10px rgba(22, 33, 39, 0.25);
  padding: 16px;
  color: #f9f9f9;
  font-weight: 700;
  margin-top: 32px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.1, '#00A3E4')};
  }
`;
