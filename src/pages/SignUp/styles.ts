import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.main`
  padding: 16px;
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const imageAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  } to {
    opacity: 1;
    transform: translateX(0px);
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

  .signup {
    position: absolute;
    right: 96px;
    top: 288px;

    animation: ${imageAnimation} 1s;
  }
`;

export const FormContent = styled.div`
  margin-left: 48px;

  h1 {
    font-size: 36px;
    font-weight: 700;
    line-height: 42px;
    color: #00a3ea;
    margin-bottom: 56px;
  }

  form {
    margin: auto 0;

    button {
      margin-top: 40px;
    }
  }
`;

export const Inputs = styled.section`
  display: flex;
  justify-content: space-around;

  article + article {
    margin-left: 32px;
  }
`;

export const SignIn = styled.div`
  margin-top: 48px;
  width: 294px;
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
