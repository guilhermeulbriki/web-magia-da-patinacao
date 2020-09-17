import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  haveIcon: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #F9F9F9;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  min-width: 159px;
  max-width: 240px;

  box-shadow: 5px 4px 10px rgba(22, 33, 39, 0.25);
  color: #929292;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isFocused &&
    css`
      color: #00a3e4;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #00a3e4;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      color: #eb5757;
    `}

  input {
    flex: 1;
    width: 100%;
    max-width: 240px;

    ${(props) =>
      props.haveIcon &&
      css`
        max-width: 190px;
      `}

    background: transparent;
    border: 0;
    color: #4F4F4F;
    font-size: 16px;

    &::placeholder {
      color: #929292;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0px;
  }

  span {
    background: #eb5757;
    color: #fff;

    &::before {
      border-color: #eb5757 transparent;
    }
  }
`;
