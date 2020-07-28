import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInImage from '../../assets/signin-image.png';

export const Container = styled.main`
  padding: 16px;
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const formAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.2);
  } 70% {
    opacity: 0.8;
    transform: scale(1.1);
  } 100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Content = styled.div`
  background: #eaeaea;
  padding: 32px;
  border-radius: 32px;
  border: 1px solid #cacaca;
  box-shadow: 2px 4px 16px #929292;
  width: 100%;
  max-width: 1120px;
  height: 680px;

  position: relative;

  display: flex;
  justify-content: space-between;

  > img {
    position: absolute;
    right: 32px;
    top: 32px;
  }

  form {
    margin: auto 0;
    margin-left: 72px;
    max-width: 294px;

    animation: ${formAnimation} 1s ease-in-out;

    h1 {
      font-size: 54px;
      font-weight: 700;
      line-height: 64px;
      color: #00a3ea;
      margin-bottom: 48px;
    }
  }

  @media (max-width: 1125px) {
    form {
      margin-left: 32px;
    }
  }

  @media (max-width: 1050px) {
    justify-content: center;

    form {
      margin-left: 0;
    }
  }
`;

export const SignUp = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  flex-direction: column;

  a {
    margin-top: 16px;
    font-size: 24px;
    color: #00a3ea;
    text-decoration: none;
    font-weight: 700;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.1, '#00A3E4')};
    }
  }
`;

export const SideBackground = styled.div`
  flex: 1;
  background: url(${signInImage}) no-repeat;
  background-position: 110px 264px;

  @media (max-width: 1125px) {
    background-position: 80px 264px;
  }

  @media (max-width: 1050px) {
    display: none;
  }
`;
