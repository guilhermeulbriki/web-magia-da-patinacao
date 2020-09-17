import styled from 'styled-components';

export const Container = styled.div`
  background: #f9f9f9;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  min-width: 159px;
  max-width: 240px;

  box-shadow: 5px 4px 10px rgba(22, 33, 39, 0.25);
  color: #929292;

  display: flex;
  align-items: center;

  select {
    width: 100%;
    max-width: 240px;
    background: transparent;
    border: 0;
    color: #4f4f4f;
    font-size: 16px;
  }
`;
