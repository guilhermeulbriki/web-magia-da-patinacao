import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const girlAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(120px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const familyAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.main`
  padding: 16px;
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
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

  div + div {
    margin-top: 16px;
  }

  form {
    margin: auto 0;
    margin-left: 72px;
    max-width: 294px;

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
  position: relative;

  @media (max-width: 1050px) {
    display: none;
  }

  img {
    position: absolute;
  }

  .blueBackground {
    top: 290px;
    left: 110px;
  }

  .girl {
    top: 409px;
    left: 196px;

    animation: ${girlAnimation} 1s;
  }

  .familySkating {
    top: 244px;
    left: 328px;

    animation: ${familyAnimation} 1s;
  }
`;
